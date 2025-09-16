import { NextResponse } from 'next/server'
import { spawn } from 'child_process'

async function testFFmpegCodecs() {
  return new Promise((resolve) => {
    const ffmpeg = spawn('ffmpeg', ['-codecs']);
    let output = '';
    
    ffmpeg.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        const codecs = {
          mp3: output.includes('libmp3lame') || output.includes('mp3'),
          aac: output.includes('aac'),
          vorbis: output.includes('libvorbis') || output.includes('vorbis'),
          flac: output.includes('flac'),
          pcm: output.includes('pcm_s16le')
        };
        resolve({ success: true, codecs, output: output.split('\n').slice(0, 10) });
      } else {
        resolve({ success: false, error: 'Failed to get codecs', output });
      }
    });
    
    ffmpeg.on('error', (err) => {
      resolve({ success: false, error: err.message });
    });
  });
}

async function testSimpleConversion() {
  return new Promise((resolve) => {
    // Test with a simple sine wave generation
    const ffmpeg = spawn('ffmpeg', [
      '-f', 'lavfi',
      '-i', 'sine=frequency=1000:duration=1',
      '-c:a', 'libmp3lame',
      '-t', '1',
      '/tmp/test.mp3',
      '-y'
    ]);
    
    let stderr = '';
    
    ffmpeg.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    ffmpeg.on('close', (code) => {
      resolve({
        success: code === 0,
        exitCode: code,
        error: code !== 0 ? stderr : null
      });
    });
    
    ffmpeg.on('error', (err) => {
      resolve({
        success: false,
        error: `Process error: ${err.message}`
      });
    });
  });
}

export async function GET() {
  try {
    const [codecTest, conversionTest] = await Promise.all([
      testFFmpegCodecs(),
      testSimpleConversion()
    ]);
    
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      platform: process.platform,
      node_version: process.version,
      ffmpeg: {
        codecs: codecTest,
        simpleConversion: conversionTest
      },
      paths: {
        temp_dir: process.cwd() + '/temp',
        working_dir: process.cwd()
      }
    };

    return NextResponse.json(diagnostics, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}