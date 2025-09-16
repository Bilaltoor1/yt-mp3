export const runtime = 'nodejs';
import { spawn } from 'node:child_process';
import { rateLimit } from '../../../lib/rateLimiter.js';
import { getCookiesFromRequest, createCookieFile } from '../../../lib/cookieManager.js';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

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

export async function POST(request) {
  let tmpDir;
  try {
    const { url } = await request.json();
    if (!url) {
      return Response.json({ error: 'Missing url' }, { status: 400 });
    }
    // Rate limit per IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local';
    const rl = rateLimit({ key: `info:${ip}`, limit: 20, windowMs: 60_000 });
    if (!rl.allowed) {
      return Response.json({ error: 'Rate limit exceeded. Try later.' }, { status: 429 });
    }

    // Create temporary directory for cookies
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ytdl-info-'));
    
    // Get cookies and create cookie file if available
    const cookiesBase64 = getCookiesFromRequest(request);
    const cookiePath = createCookieFile(cookiesBase64, tmpDir);

    const ua = pickUserAgent();
    const args = [
      '-J',
      '--no-warnings',
      '--no-check-certificate',
      '--no-playlist',
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
    const child = spawn('yt-dlp', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = '';
    let stderr = '';
    try {
      const code = await new Promise((resolve, reject) => {
        child.stdout.on('data', d => { stdout += d.toString(); });
        child.stderr.on('data', d => { stderr += d.toString(); });
        child.on('error', err => reject(err));
        child.on('close', code => resolve(code));
      });
      if (code !== 0) {
        return Response.json({ error: stderr || 'yt-dlp failed' }, { status: 500 });
      }
    } catch (err) {
      return Response.json({ error: String(err) }, { status: 500 });
    }
    return new Response(JSON.stringify({ raw: stdout }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    return Response.json({ error: String(e) }, { status: 500 });
  } finally {
    // Cleanup temporary directory
    if (tmpDir) {
      try {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      } catch (e) {
        console.warn('Failed to cleanup temp dir:', e.message);
      }
    }
  }
}
