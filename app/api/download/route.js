export const runtime = 'nodejs';

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { rateLimit } from '../../../lib/rateLimiter.js';
import { getCookiesFromRequest, createCookieFile } from '../../../lib/cookieManager.js';

function pickUserAgent() {
  const agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:124.0) Gecko/20100101 Firefox/124.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3 Safari/605.1.15'
  ];
  return agents[Math.floor(Math.random() * agents.length)];
}

function qualityFromBitrate(b) {
  const map = { '64k': '64K', '128k': '128K', '320k': '320K' };
  return map[b] || '128K';
}

export async function POST(request) {
  try {
    const { url, bitrate } = await request.json();
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
    const rl = rateLimit({ key: `dl:${ip}`, limit: 10, windowMs: 60_000 });
    if (!rl.allowed) {
      return Response.json({ error: 'Rate limit exceeded. Try later.' }, { status: 429 });
    }
    if (!url) {
      return Response.json({ error: 'Missing url' }, { status: 400 });
    }

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ytmp3-'));
    const outTpl = path.join(tmpDir, '%(title)s.%(ext)s');
    const ua = pickUserAgent();
    const aqual = qualityFromBitrate(bitrate);

    // Get cookies and create cookie file if available
    const cookiesBase64 = getCookiesFromRequest(request);
    const cookiePath = createCookieFile(cookiesBase64, tmpDir);

    const args = [
      '-f', 'bestaudio/best',
      '-x', '--audio-format', 'mp3', '--audio-quality', aqual,
      '-o', outTpl,
      '--no-warnings', '--no-playlist',
      '--user-agent', ua,
      '--add-header', 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      '--add-header', 'Accept-Language: en-US,en;q=0.9',
      '--add-header', 'Accept-Encoding: gzip, deflate, br',
      '--add-header', 'DNT: 1',
      '--add-header', 'Connection: keep-alive',
      '--add-header', 'Upgrade-Insecure-Requests: 1',
      '--extractor-args', 'youtube:player_client=android,web',
      '--extractor-args', 'youtube:player_skip=configs',
      '--extractor-args', 'youtube:skip=hls,dash',
    ];
    
    // Add cookies if available
    if (cookiePath) {
      args.push('--cookies', cookiePath);
    }
    
    args.push(url);

    let child;
    try {
      child = spawn('yt-dlp', args, { stdio: ['ignore', 'inherit', 'inherit'] });
    } catch (err) {
      // yt-dlp binary not found
      return Response.json({ error: 'yt-dlp not found. Install python3 and yt-dlp or run via Docker.' }, { status: 500 });
    }
    const code = await new Promise((resolve) => child.on('close', resolve));
    if (code !== 0) {
      return Response.json({ error: 'yt-dlp failed to download' }, { status: 500 });
    }

    // Pick first mp3 file
    const files = fs.readdirSync(tmpDir).filter((f) => f.endsWith('.mp3'));
    if (files.length === 0) {
      return Response.json({ error: 'No MP3 produced' }, { status: 500 });
    }
    const filePath = path.join(tmpDir, files[0]);

    const nodeStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(nodeStream);
    
    // Clean up temp files after stream ends
    nodeStream.on('close', () => {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        console.warn('Failed to cleanup temp dir:', e);
      }
    });
    
    const headers = {
      'Content-Type': 'audio/mpeg',
      'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`,
      'Cache-Control': 'no-store',
    };
    return new Response(webStream, { status: 200, headers });
  } catch (e) {
    // Clean up temp dir on error
    try {
      if (typeof tmpDir !== 'undefined') {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    } catch {}
    return Response.json({ error: String(e) }, { status: 500 });
  }
}
