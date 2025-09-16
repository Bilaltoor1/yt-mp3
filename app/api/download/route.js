export const runtime = 'nodejs';

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { Readable } from 'node:stream';
import { rateLimit } from '../../../lib/rateLimiter.js';

function pickUserAgent() {
  const list = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
  ];
  return list[Math.floor(Math.random() * list.length)];
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

    // Optional cookies via env or header
    let cookiesPath = '';
    try {
      const headers = request.headers;
      const b64 = headers.get('x-ytdlp-cookies-b64') || process.env.YTDLP_COOKIES_BASE64 || '';
      if (b64) {
        const buf = Buffer.from(b64, 'base64');
        cookiesPath = path.join(tmpDir, 'cookies.txt');
        fs.writeFileSync(cookiesPath, buf);
      }
    } catch {}

    const args = [
      '-f', 'bestaudio/best',
      '-x', '--audio-format', 'mp3', '--audio-quality', aqual,
      '-o', outTpl,
      '--no-warnings', '--no-playlist',
      '--add-header', 'Accept-Language: en-US,en;q=0.9',
      '--user-agent', ua,
      '--extractor-args', 'youtube:player_client=android',
    ];
    if (cookiesPath) {
      args.push('--cookies', cookiesPath);
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
