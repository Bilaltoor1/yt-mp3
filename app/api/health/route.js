import { NextResponse } from 'next/server'
import { spawn } from 'child_process'

async function checkFFmpeg() {
  return new Promise((resolve) => {
    const ffmpeg = spawn('ffmpeg', ['-version']);
    let output = '';
    
    ffmpeg.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    ffmpeg.on('close', (code) => {
      resolve({
        available: code === 0,
        version: code === 0 ? output.split('\n')[0] : 'Not available',
        error: code !== 0 ? 'FFmpeg not found or not working' : null
      });
    });
    
    ffmpeg.on('error', () => {
      resolve({
        available: false,
        version: 'Not available',
        error: 'FFmpeg not found'
      });
    });
  });
}

export async function GET() {
  try {
    const ffmpegStatus = await checkFFmpeg();
    
    // Basic health check
    const status = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
      services: {
        ffmpeg: ffmpegStatus,
        nodejs: {
          version: process.version,
          platform: process.platform,
          arch: process.arch
        },
        memory: {
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
        }
      }
    }

    const httpStatus = ffmpegStatus.available ? 200 : 503;
    
    return NextResponse.json(status, { status: httpStatus })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: error.message,
        timestamp: new Date().toISOString(),
        services: {
          ffmpeg: { available: false, error: 'Check failed' }
        }
      }, 
      { status: 500 }
    )
  }
}