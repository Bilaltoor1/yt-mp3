"use client";
import { useState, useRef } from 'react';

async function fetchWithRetry(url, options = {}, attempts = 3, backoffMs = 700) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      // Fetch without client abort to allow server processing time
      const res = await fetch(url, options);
      if (!res.ok) {
        if (res.status >= 500 && i < attempts - 1) {
          await new Promise(r => setTimeout(r, backoffMs * (i + 1)));
          continue;
        }
      }
      return res;
    } catch (e) {
      lastErr = e;
      if (i < attempts - 1) {
        await new Promise(r => setTimeout(r, backoffMs * (i + 1)));
        continue;
      }
    }
  }
  throw lastErr || new Error('Network error');
}

export default function Page() {
  const [url, setUrl] = useState("");
  const [bitrate, setBitrate] = useState("128k");
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const [meta, setMeta] = useState(null);
  const lastUrl = useRef("");

  async function handleInfo() {
    setError("");
    setMeta(null);
    setLoadingInfo(true);
    lastUrl.current = url;
    try {
      const res = await fetchWithRetry('/api/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch info');
      const raw = data.raw ? JSON.parse(data.raw) : null;
      if (!raw) throw new Error('Invalid metadata');
      setMeta({
        title: raw.title || 'Unknown Title',
        thumbnail: raw.thumbnail || (raw.thumbnails && raw.thumbnails[0]?.url) || null,
        duration: raw.duration,
      });
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setLoadingInfo(false);
    }
  }

  async function handleDownload() {
    setError("");
    setDownloading(true);
    try {
      // Use a much longer timeout for downloads (5 minutes)
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5 * 60 * 1000);
      
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, bitrate }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Download failed');
      }
      const blob = await res.blob();
      const filename = (meta?.title || 'audio') + '.mp3';
      const href = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(href);
    } catch (e) {
      setError(String(e.message || e));
    } finally {
      setDownloading(false);
    }
  }

  return (
    <main className="min-h-screen p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl space-y-6">
        <h1 className="text-2xl font-semibold">YouTube → MP3 Converter</h1>
        <div className="space-y-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube video URL"
            className="w-full border rounded px-3 py-2"
          />
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={bitrate}
              onChange={(e) => setBitrate(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="64k">64 kbps</option>
              <option value="128k">128 kbps (default)</option>
              <option value="320k">320 kbps</option>
            </select>
            <button
              onClick={handleInfo}
              disabled={!url || loadingInfo}
              className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
            >
              {loadingInfo ? 'Fetching…' : 'Get Info'}
            </button>
            <button
              onClick={handleDownload}
              disabled={!meta || downloading}
              className="px-4 py-2 rounded border disabled:opacity-50"
            >
              {downloading ? 'Downloading…' : 'Download MP3'}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
        {meta && (
          <div className="flex gap-4 border rounded p-3 items-center">
            {meta.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={meta.thumbnail} alt="thumb" className="w-28 h-28 object-cover rounded" />
            )}
            <div>
              <p className="font-medium break-all">{meta.title}</p>
              <p className="text-sm text-gray-500">Bitrate: {bitrate}</p>
              {meta.duration && <p className="text-xs text-gray-500">Duration: {meta.duration}s</p>}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}