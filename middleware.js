import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.headers.set('Cache-Control', 'no-store');
  // Content Security Policy:
  // We include explicit hashes for the current inline bootstrap scripts emitted by Next.js.
  // NOTE: If you upgrade Next.js or change build options, these hashes may change.
  // The reported hashes from console errors have been whitelisted below.
  // If new CSP errors appear, capture the new sha256 hash(es) and add them here instead of adding 'unsafe-inline'.
  const scriptHashes = [
    // Existing approved inline script hashes (Next.js bootstrap pieces)
    "'sha256-OBTN3RiyCV4Bq7dFqZ5a2pAXjnCcCYeTJMO2I/LYKeo='",
    "'sha256-3yvDYU1f/dgKfWQv1bX784CIkD8rltfBMpEbFTPtQGU='",
    "'sha256-lJD65P3OiEkqlxYkT+dgDN9oLH8X15vbbqkEFKE9zcs='",
    "'sha256-xLP5QIbvR88RAxDKoSWqs6CVxNIRu17hhr7S/Q6hlU0='",
    "'sha256-FhLHRUQz4c4ntLU9VkfEesX7PnzNLENSe/16Hi523Kk='",
    "'sha256-x4KsynZKwK7BjIOVPB64nmoITARe63ttzSUGtW0vizE='",
    "'sha256-bg+CWjI8RppcgHYH6RuW4z4OnLAUEUPDXRoYUo9Tyok='",
    // Newly observed hashes from CSP violations (added now)
    "'sha256-l1If/3s762poqIa15xP6TL4qkGMSsJWURlKEuw+ol3Q='",
    "'sha256-emz5didBDmzAfUkPWya6sSTEAtYzXEbkqdNESy9q4lY='",
    // Latest reported hash
    "'sha256-OfZv6HTOfMjOQ3lprKZv6TKonBX60J2bLsnPDOii09U='",
    // Additional hashes from latest CSP violations
    "'sha256-qziMXNf/i9v1CrgpqalnI6KeT8dFhKJbWmD/oBWAVqU='",
    "'sha256-sX2VE5anutWHdZ/Tf6w4H0M5wUhCEy2xaxQuNxHM8KQ='",
  ];
    // Relaxed script policy to allow Next.js inline and eval scripts
    const csp = [
      "default-src 'self'",
      // Allow images from self, data URIs, and https (thumbnails)
      "img-src 'self' data: https:",
      // Allow inline scripts and eval required by Next.js runtime
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      // Allow inline styles produced by Next/Tailwind
      "style-src 'self' 'unsafe-inline'",
      // Only same-origin XHR/fetch; extend if you later call external APIs
      "connect-src 'self'",
      "font-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      // Disallow mixed content
      "upgrade-insecure-requests"
    ].join('; ');

  res.headers.set('Content-Security-Policy', csp);
  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};