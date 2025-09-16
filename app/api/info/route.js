export const runtime = 'nodejs';
import { spawn } from 'node:child_process';
import { rateLimit } from '../../../lib/rateLimiter.js';

function pickUserAgent() {
  const list = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36',
  ];
  return list[Math.floor(Math.random() * list.length)];
}

export async function POST(request) {
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
    const ua = pickUserAgent();
    const args = [
      '-J',
      '--no-warnings',
      '--no-check-certificate',
      '--no-playlist',
      '--add-header', 'Accept-Language: en-US,en;q=0.9',
      '--user-agent', ua,
      '--extractor-args', 'youtube:player_client=android',
      url,
    ];
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
  }
}
