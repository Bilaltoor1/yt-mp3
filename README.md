# YouTube to MP3 Converter

A modern web application for converting YouTube videos to MP3 files using Next.js and Docker microservices.

## Features

- 🎵 Convert YouTube videos to MP3 format
- 🎛️ Multiple audio quality options (64k, 128k, 320k)
- 🎨 Modern, responsive UI with Tailwind CSS
- 🐳 Dockerized microservices architecture
- ⚡ Fast and efficient processing

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS 4
- **Backend**: YouTube-DL microservice (mikenye/youtube-dl)
- **Containerization**: Docker & Docker Compose

## Quick Start

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository:
```bash
git clone <your-repo-url>
cd yt-mp3
```

2. Build and start the services:
```bash
docker-compose up --build
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

1. **Enter YouTube URL**: Paste any YouTube video URL in the input field
2. **Convert**: Click the "Convert" button to fetch video information
3. **Select Quality**: Choose your preferred audio quality (64k, 128k, or 320k)
4. **Download**: Click "Download MP3" to get your audio file

## API Endpoints

### Frontend APIs

- `POST /api/video-info` - Get video information
- `POST /api/download` - Download MP3 file

### YouTube-DL Service APIs

- `POST http://localhost:8080/info` - Get video metadata
- `POST http://localhost:8080/download` - Download and convert video
- `GET http://localhost:8080/health` - Health check

## Docker Services

### Frontend Service
- **Port**: 3000
- **Image**: Built from local Dockerfile
- **Framework**: Next.js with standalone output

### YouTube-DL Service
- **Port**: 8080
- **Image**: mikenye/youtube-dl
- **Features**: Flask API wrapper around youtube-dl

## Development

To run in development mode:

```bash
npm install
npm run dev
```

## Production Deployment

The application is production-ready with:
- Optimized Docker images
- Standalone Next.js build
- Health checks
- Restart policies
- Volume persistence

## License

For personal use only. Please respect YouTube's Terms of Service and copyright laws.

## Disclaimer

This tool is for educational purposes only. Users are responsible for complying with YouTube's Terms of Service and applicable copyright laws.
