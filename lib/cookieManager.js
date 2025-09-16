// Stub cookie manager for build compatibility// Cookie management for YouTube bot detection bypass

export function getCookiesFromRequest() {import fs from 'node:fs';

  return null;import path from 'node:path';

}import os from 'node:os';



export function createCookieFile() {/**

  return null; * Generate a temporary cookie file from base64 encoded cookies

} * @param {string} cookiesBase64 - Base64 encoded cookies.txt content
 * @param {string} tmpDir - Temporary directory path
 * @returns {string|null} - Path to cookie file or null if no cookies
 */
export function createCookieFile(cookiesBase64, tmpDir) {
  if (!cookiesBase64) return null;
  
  try {
    const cookieContent = Buffer.from(cookiesBase64, 'base64').toString('utf-8');
    const cookiePath = path.join(tmpDir, 'youtube_cookies.txt');
    fs.writeFileSync(cookiePath, cookieContent);
    return cookiePath;
  } catch (error) {
    console.warn('Failed to create cookie file:', error.message);
    return null;
  }
}

/**
 * Get cookies from environment or request headers
 * @param {Request} request - The incoming request
 * @returns {string|null} - Base64 encoded cookies or null
 */
export function getCookiesFromRequest(request) {
  // Priority order: header -> environment variable
  const headerCookies = request.headers.get('x-ytdlp-cookies-b64');
  const envCookies = process.env.YTDLP_COOKIES_BASE64;
  
  return headerCookies || envCookies || null;
}

/**
 * Sample cookies.txt content for YouTube (users need to replace with real cookies)
 * This is just for reference - users need to export their own cookies
 */
export const SAMPLE_COOKIES = `# Netscape HTTP Cookie File
# This file contains cookies for YouTube.com
# To get real cookies, use a browser extension like "Get cookies.txt LOCALLY"
# or use browser developer tools
#
# Format: domain	flag	path	secure	expiration	name	value
#
# Replace this with your actual YouTube cookies:
# .youtube.com	TRUE	/	TRUE	1234567890	VISITOR_INFO1_LIVE	sample_value
# .youtube.com	TRUE	/	FALSE	1234567890	YSC	sample_value
# .youtube.com	TRUE	/	TRUE	1234567890	PREF	sample_value
`;

/**
 * Instructions for users to get cookies
 */
export const COOKIE_INSTRUCTIONS = {
  method1: {
    name: "Browser Extension (Recommended)",
    steps: [
      "1. Install 'Get cookies.txt LOCALLY' extension in Chrome/Firefox",
      "2. Go to youtube.com and log in",
      "3. Click the extension icon",
      "4. Copy the cookies.txt content",
      "5. Base64 encode it and set as YTDLP_COOKIES_BASE64 environment variable"
    ]
  },
  method2: {
    name: "Browser Developer Tools",
    steps: [
      "1. Open youtube.com and log in",
      "2. Press F12 to open developer tools",
      "3. Go to Application/Storage tab > Cookies",
      "4. Copy important cookies (VISITOR_INFO1_LIVE, YSC, PREF, etc.)",
      "5. Format as cookies.txt and base64 encode"
    ]
  }
};