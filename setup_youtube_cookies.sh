#!/bin/bash

# Complete YouTube Cookie Setup Script for yttmp3.com
# This script sets up YouTube cookies to bypass bot detection
# Run this in your /root/yt-mp3 directory

set -e

echo "🍪 Complete YouTube Cookie Setup for yttmp3.com"
echo "=================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if we're in the right directory
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ Error: docker-compose.yml not found. Please run this script from your yt-mp3 project directory."
    exit 1
fi

echo "📍 Working directory: $(pwd)"

# Create the cookies file with the provided cookies
echo "📄 Creating youtube_cookies.txt..."
cat > youtube_cookies.txt << 'EOF'
# Netscape HTTP Cookie File
# http://curl.haxx.se/rfc/cookie_spec.html
# This is a generated file!  Do not edit.

.google.com	TRUE	/	FALSE	1773160784	SEARCH_SAMESITE	CgQI9p4B
.google.com	TRUE	/	FALSE	1792473712	SID	g.a0001QhJ34Zv5bo84dtneHwfHoYSGUM30b2XGftb3haIpLnmKolKLGgBgmpUPrzbh2tCUIKjLwACgYKAWISARISFQHGX2MiG_5ukbYSzGpew-H-4A_5ZRoVAUF8yKpWbZeBoPv8nAnHVk5qQQRJ0076
.google.com	TRUE	/	TRUE	1792473712	__Secure-1PSID	g.a0001QhJ34Zv5bo84dtneHwfHoYSGUM30b2XGftb3haIpLnmKolKZgE65-3rsxE6cKh_L9vd6QACgYKAUESARISFQHGX2Mipq7yGHZF5aM82PUi3C7OaRoVAUF8yKrOfIh8WbuFFzol3ILMaz5I0076
.google.com	TRUE	/	TRUE	1792473712	__Secure-3PSID	g.a0001QhJ34Zv5bo84dtneHwfHoYSGUM30b2XGftb3haIpLnmKolKV1xUOK9ngevKzvrdp8l5iAACgYKAZ0SARISFQHGX2MicqBvZcBAqzbQYFQtWTvThBoVAUF8yKqWdJpl4txGrUwpnFfGpUQX0076
.google.com	TRUE	/	FALSE	1792473712	HSID	AeyB0X0Y_NsjMpnZQ
.google.com	TRUE	/	TRUE	1792473712	SSID	AJr7oTiH70r92ZhCn
.google.com	TRUE	/	FALSE	1792473712	APISID	NT4I3WML48e8CR9I/AqgPH51d7WD99sLuT
.google.com	TRUE	/	TRUE	1792473712	SAPISID	cpmXxSVti_86o2gO/ABHSgfsmgLoQPVTYr
.google.com	TRUE	/	TRUE	1792473712	__Secure-1PAPISID	cpmXxSVti_86o2gO/ABHSgfsmgLoQPVTYr
.google.com	TRUE	/	TRUE	1792473712	__Secure-3PAPISID	cpmXxSVti_86o2gO/ABHSgfsmgLoQPVTYr
.google.com	TRUE	/	TRUE	1772563287	AEC	AVh_V2jPpwESeG67hM6SbzvDaMXfyX62DzZHkid_QPvZChf7k-rei1VhtQ
.google.com	TRUE	/	TRUE	1773724823	NID	525=Nwf4VzoLiPs2X3A1MPuslY2s0tl14h09XECiTb7rvWLTj_j84YqQiaCOX3bovOdP0EIbT4SYOgYei5cwXhiV4OwPQg69chXYle6HYkco_sL6DnMBlmqYVvfPtVF2s7Jv91gL_jU6Tb9YpjHukP_3MDffGhRmNaBGhYu--JRVcukkWeX4UpE9OQfPPVHextwwQfGVFNTEE6zEclLH93SQWkyk8-iy7syP5pDJWl_BL-wEzLzWwQzhflveZGdUdIpCy3zuzLZ7doqDdwajOyZ0OuOtdbsgq9qbsY_fie6ud42Xyfl_1QC7y-AnNb5CSj278EYaF6CuL49MytuXRVf-saH2JL_zRoNp-XbCXlz7t4XQRrEWr8m_fdGlwRu0qtNe9hherBiqtsPeG-h9wJ9_4CjetqoOUhrC1LBmq6SzLFgdfXt-4Q5iq9Lf9UGvcJ1OEG8-SftuvW5td9zCmmoWUEsfuNNAnWwOYmO0bnscb7WbJmYiGeM24koy-Ykt1Fj9JgVOO97JQGV30rGp-PyDEObgWIvxWcyAk5K7nY4K3_eu2erL2gd82LqY2Uer_dN8JA8dS3ykqZDwSek6TcIoqbkR0ZLmNx2NCK7zp4_mnEYSg_AfQRCTJq7iEjF7PcKE-QedwF2JQ1X1MocYOBn1RQRCzdol0nX6stcZZgJQAm1g-URS46IPg8_VfpzGMYiMYRgp20Lm0Ad-e6X2ylECtK4RWbsxiyzg4ZPXwouK61uCr74luRLpErSqH3YofQeJ2PqnVBfuXsnYE4Whochshz6fCwik0bK3nDjyK2WxGXDt6Ms7XKTkaPR-AXFQ8D9RuFS_FM746IURzS9G8l4pqEflrloRDFArOJP8vZB-oyPtKTX7RY9PXzYhKBjVPmhO_N76d8D6TOBY8OmbeioHMyeeiVB8T0NBikj5kMWiKPm_dKcYWGi1_PcmZiENKFu8nuI4wtvk1WqN6yM6_H2oewJgHj7cdpN2UrvHUEao2tBOk-SpCIJ3Ox7ms-4KpGzeJHFr2YO79fqSTY1ZzTriy_Gh
.google.com	TRUE	/	TRUE	1789538542	__Secure-1PSIDTS	sidts-CjEB5H03P0LH7GhwpQ2AVITXg8MOURN4aI0Vw4LjsPb6RPNsYMzw7Rd8dxrgRqvlK7HxEAA
.google.com	TRUE	/	TRUE	1789538542	__Secure-3PSIDTS	sidts-CjEB5H03P0LH7GhwpQ2AVITXg8MOURN4aI0Vw4LjsPb6RPNsYMzw7Rd8dxrgRqvlK7HxEAA
chromewebstore.google.com	FALSE	/	TRUE	1792562997	OSID	g.a0001QhJ32kMfw8uSD1QqWCfSMHBZUnk7Ix8bFYRz6G7xTOhwZiRW_2xkjGPS0K-93dy9NDPtQACgYKASkSARISFQHGX2Mi6q6TdhZCeZTes-8YXsjnIxoVAUF8yKqybPZk9Vmg3A4c98426nTI0076
chromewebstore.google.com	FALSE	/	TRUE	1792562997	__Secure-OSID	g.a0001QhJ32kMfw8uSD1QqWCfSMHBZUnk7Ix8bFYRz6G7xTOhwZiRyrBO9xHxmjYIcHgkxMOOCgACgYKARsSARISFQHGX2MiTEe1P8gnlORpAunsV-tuvRoVAUF8yKobEoG3QBzxeWV-zp6V_Fwv0076
.chromewebstore.google.com	TRUE	/	FALSE	1792563084	_ga	GA1.1.1253935969.1758003000
chromewebstore.google.com	FALSE	/	TRUE	1760595001	OTZ	8261650_36_36__36_
.chromewebstore.google.com	TRUE	/	FALSE	1792563084	_ga_KHZNC1Q6K0	GS2.1.s1758003000$o1$g1$t1758003084$j60$l0$h0
.google.com	TRUE	/	FALSE	1789539133	SIDCC	AKEyXzUhTGuh8SJeEBfBJoo1p1PLm_y3c4byrw5rD21rm8Wh4BWz70_qEdY-OVdWye4wqWVGkQ
.google.com	TRUE	/	TRUE	1789539133	__Secure-1PSIDCC	AKEyXzXs0SLmGrQXeUdFRsR3SysvAMyfhOWk9-N9RAN6ZthvLMOJGwZL1NJLucLS5X_BIOT1Gg
.google.com	TRUE	/	TRUE	1789539133	__Secure-3PSIDCC	AKEyXzVQt1uh-wnwdwi578tFqjUmz0J95E_A2NG-_49MXDg6fRy1hE6ZG-CKEJ_BaaPXZQ_t8YY
EOF

echo "✅ Created youtube_cookies.txt with $(wc -l < youtube_cookies.txt) lines"

# Encode cookies to base64
echo "🔐 Encoding cookies to base64..."
COOKIES_BASE64=$(cat youtube_cookies.txt | base64 -w 0)
echo "📏 Encoded to $(echo $COOKIES_BASE64 | wc -c) characters"

# Create .env.local file
echo "📝 Creating .env.local with environment variable..."
echo "YTDLP_COOKIES_BASE64=$COOKIES_BASE64" > .env.local
echo "✅ Created .env.local ($(wc -c < .env.local) bytes)"

# Set proper permissions
echo "🔒 Setting secure permissions..."
chmod 600 .env.local youtube_cookies.txt
echo "✅ Set permissions: 600 (owner read/write only)"

# Backup existing containers if any
echo "💾 Checking for existing containers..."
if docker-compose ps | grep -q "Up"; then
    echo "🐳 Stopping existing containers..."
    docker-compose down
else
    echo "ℹ️  No running containers found"
fi

# Start Docker containers
echo "🚀 Starting Docker containers with new cookies..."
docker-compose up -d

# Wait for containers to be ready
echo "⏳ Waiting for containers to start (15 seconds)..."
sleep 15

# Check container status
echo "📊 Container status:"
docker-compose ps

# Test the setup
echo "🧪 Testing YouTube cookie setup..."

# Test 1: Local API test
echo "🔍 Testing local API endpoint..."
LOCAL_TEST=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST http://localhost:3000/api/info \
  -H "Content-Type: application/json" \
  -d '{"url": "https://www.youtube.com/watch?v=kUf1puaJeaI"}')

LOCAL_STATUS=$(echo "$LOCAL_TEST" | grep "HTTP_STATUS:" | cut -d: -f2)
LOCAL_RESPONSE=$(echo "$LOCAL_TEST" | sed '/HTTP_STATUS:/d')

if [ "$LOCAL_STATUS" = "200" ] && ! echo "$LOCAL_RESPONSE" | grep -q "error"; then
    echo "✅ Local API test: SUCCESS"
    echo "📄 Response preview:"
    echo "$LOCAL_RESPONSE" | head -3
else
    echo "❌ Local API test: FAILED (HTTP $LOCAL_STATUS)"
    echo "📄 Error response:"
    echo "$LOCAL_RESPONSE" | head -5
fi

# Test 2: HTTPS test (if domain is configured)
if command_exists curl && curl -s --head https://yttmp3.com > /dev/null 2>&1; then
    echo "🔍 Testing HTTPS endpoint..."
    HTTPS_TEST=$(curl -s -w "\nHTTP_STATUS:%{http_code}" -X POST https://yttmp3.com/api/info \
      -H "Content-Type: application/json" \
      -d '{"url": "https://www.youtube.com/watch?v=kUf1puaJeaI"}')

    HTTPS_STATUS=$(echo "$HTTPS_TEST" | grep "HTTP_STATUS:" | cut -d: -f2)
    HTTPS_RESPONSE=$(echo "$HTTPS_TEST" | sed '/HTTP_STATUS:/d')

    if [ "$HTTPS_STATUS" = "200" ] && ! echo "$HTTPS_RESPONSE" | grep -q "error"; then
        echo "✅ HTTPS API test: SUCCESS"
    else
        echo "❌ HTTPS API test: FAILED (HTTP $HTTPS_STATUS)"
    fi
else
    echo "ℹ️  HTTPS test skipped (domain not configured or unreachable)"
fi

# Check if cookies are loaded in container
echo "🔍 Checking if cookies are loaded in container..."
CONTAINER_ENV=$(docker-compose exec -T frontend env 2>/dev/null | grep YTDLP_COOKIES_BASE64 || echo "NOT_FOUND")
if echo "$CONTAINER_ENV" | grep -q "YTDLP_COOKIES_BASE64"; then
    echo "✅ Environment variable loaded in container"
else
    echo "❌ Environment variable NOT found in container"
fi

# Final summary
echo ""
echo "🎉 YouTube Cookie Setup Complete!"
echo "=================================="
echo "📋 Summary:"
echo "  • Cookies file: youtube_cookies.txt ($(wc -l < youtube_cookies.txt) lines)"
echo "  • Environment file: .env.local ($(wc -c < .env.local) bytes)"
echo "  • Docker containers: $(docker-compose ps | grep -c "Up") running"
echo "  • Cookie environment: $([ -n "$CONTAINER_ENV" ] && echo "Loaded" || echo "Not loaded")"
echo ""
echo "🔄 To update cookies later:"
echo "  1. Export new cookies from browser"
echo "  2. Replace content in youtube_cookies.txt"
echo "  3. Run: ./setup_youtube_cookies.sh"
echo ""
echo "🧪 Test commands:"
echo "  curl -X POST http://localhost:3000/api/info -H 'Content-Type: application/json' -d '{\"url\": \"https://www.youtube.com/watch?v=kUf1puaJeaI\"}'"
echo "  curl -X POST https://yttmp3.com/api/info -H 'Content-Type: application/json' -d '{\"url\": \"https://www.youtube.com/watch?v=kUf1puaJeaI\"}'"
echo ""
echo "📊 Debug commands:"
echo "  docker-compose logs frontend -f"
echo "  docker-compose exec frontend env | grep YTDLP"
echo "  docker-compose exec frontend yt-dlp --version"

# Success check
if [ "$LOCAL_STATUS" = "200" ] && ! echo "$LOCAL_RESPONSE" | grep -q "error"; then
    echo ""
    echo "🎊 SUCCESS: YouTube bot detection has been bypassed!"
    echo "   Your yttmp3.com service should now work with YouTube videos."
else
    echo ""
    echo "⚠️  SETUP COMPLETED but API test failed."
    echo "   Check the debug output above and ensure:"
    echo "   1. Docker containers are running: docker-compose ps"
    echo "   2. Check logs: docker-compose logs frontend"
    echo "   3. Verify cookies are loaded: docker-compose exec frontend env | grep YTDLP"
fi