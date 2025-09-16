# YouTube Bot Detection Fix - Cookie Setup Guide

## Problem
YouTube has enhanced bot detection that blocks automated requests. Error: "Sign in to confirm you're not a bot"

## Solutions (Choose One)

### 🎯 **Method 1: Browser Extension (Recommended)**

1. **Install Extension**
   - Chrome: [Get cookies.txt LOCALLY](https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc)
   - Firefox: [cookies.txt](https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/)

2. **Export Cookies**
   ```bash
   # Go to youtube.com in your browser
   # Log in to your Google account
   # Click the extension icon
   # Copy the cookies.txt content
   ```

3. **Set Environment Variable**
   ```bash
   # On your VPS, encode cookies to base64
   echo "your_cookies_txt_content" | base64 -w 0
   
   # Copy the base64 string and set environment variable
   export YTDLP_COOKIES_BASE64="your_base64_cookies"
   
   # Or add to .env.local file
   echo "YTDLP_COOKIES_BASE64=your_base64_cookies" >> .env.local
   ```

4. **Restart Docker Container**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

### 🔧 **Method 2: Manual Cookie Export**

1. **Open Browser Developer Tools**
   - Go to youtube.com and log in
   - Press F12 → Application/Storage → Cookies
   - Copy important cookies: `VISITOR_INFO1_LIVE`, `YSC`, `PREF`

2. **Create cookies.txt File**
   ```
   # Netscape HTTP Cookie File
   .youtube.com	TRUE	/	TRUE	1234567890	VISITOR_INFO1_LIVE	your_value
   .youtube.com	TRUE	/	FALSE	1234567890	YSC	your_value
   .youtube.com	TRUE	/	TRUE	1234567890	PREF	your_value
   ```

3. **Encode and Set**
   ```bash
   cat cookies.txt | base64 -w 0
   export YTDLP_COOKIES_BASE64="encoded_result"
   ```

### 🚀 **Method 3: Production Deployment**

For your VPS deployment:

1. **Create .env.local**
   ```bash
   cd /opt/yt-mp3
   cp .env.example .env.local
   nano .env.local
   # Add your YTDLP_COOKIES_BASE64 value
   ```

2. **Update Docker Compose**
   ```bash
   # Ensure your docker-compose.yml includes:
   env_file:
     - .env.local
   ```

### 🔑 **Method 4: PO Token (Advanced - Best for Production)**

PO Tokens are session-based tokens that YouTube uses to verify legitimate browser sessions. They're more reliable than cookies alone.

1. **Get PO Token**
   - Open YouTube in Chrome/Firefox
   - Press F12 → Network tab
   - Play any video and look for requests to `youtubei/v1/player`
   - Find the `po_token` parameter in the request payload
   - Copy the value (looks like `mweb.gvs+...`)

2. **Set Environment Variable**
   ```bash
   # Add to your .env.local file
   PO_TOKEN=mweb.gvs+your_po_token_here
   
   # Or export directly
   export PO_TOKEN="mweb.gvs+your_po_token_here"
   ```

3. **Restart Container**
   ```bash
   docker-compose down
   docker-compose up -d
   ```

**Note**: PO Tokens expire quickly (hours/days) and are tied to your browser session. For production, consider using a PO Token provider service or automated browser session management.

- **Never commit** cookies to git repositories
- **Rotate cookies** regularly (they expire)
- **Use minimal permissions** - don't use admin accounts
- **Monitor usage** - YouTube may still rate limit

## 🧪 **Testing**

Test if cookies work:
```bash
# Test with curl
curl -X POST https://yttmp3.com/api/info \
  -H "Content-Type: application/json" \
  -H "x-ytdlp-cookies-b64: YOUR_BASE64_COOKIES" \
  -d '{"url": "https://www.youtube.com/watch?v=test_video_id"}'
```

## ⚠️ **Important Notes**

1. **Cookie Expiration**: Cookies expire, usually within 1-6 months
2. **Geographic Restrictions**: Some videos may still be blocked by location
3. **Rate Limiting**: YouTube still applies rate limits even with cookies  
4. **Account Safety**: Use a dedicated account, not your personal one
5. **Legal Compliance**: Ensure you comply with YouTube's Terms of Service

## 🆘 **If Still Blocked**

Try these additional measures:

1. **Use Different Player Clients**
   - The code already tries `android,web`
   - You can also try `ios`, `mweb`

2. **Add Delays Between Requests**
   ```javascript
   // Add to your rate limiter
   const delay = Math.random() * 2000 + 1000; // 1-3 second delay
   await new Promise(resolve => setTimeout(resolve, delay));
   ```

3. **Use Proxy/VPN** (Advanced)
   - Configure through `--proxy` option in yt-dlp
   - Rotate IP addresses

4. **Alternative Extractors**
   - Try different YouTube extractors
   - Use `--extractor-args` variations