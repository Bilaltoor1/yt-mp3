import { NextRequest } from 'next/server';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const pipelineAsync = promisify(pipeline);

// Supported format configurations
const QUALITY_SETTINGS = {
  low: '64k',
  medium: '128k', 
  high: '192k',
  highest: '320k'
};

const SUPPORTED_AUDIO_FORMATS = ['mp3', 'm4a', 'wav', 'flac', 'aac', 'ogg', 'wma'];
const SUPPORTED_VIDEO_FORMATS = ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'];
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

function getFFmpegArgs(inputPath, outputPath, options) {
  const { outputFormat, quality, compression } = options;
  let args = ['-i', inputPath, '-y']; // -y to overwrite output files
  
  // Audio encoding settings
  if (outputFormat === 'mp3') {
    args.push('-codec:a', 'libmp3lame', '-b:a', QUALITY_SETTINGS[quality]);
  } else if (outputFormat === 'm4a') {
    args.push('-codec:a', 'aac', '-b:a', QUALITY_SETTINGS[quality]);
  } else if (outputFormat === 'wav') {
    args.push('-codec:a', 'pcm_s16le');
  } else if (outputFormat === 'flac') {
    args.push('-codec:a', 'flac');
  } else if (outputFormat === 'aac') {
    args.push('-codec:a', 'aac', '-b:a', QUALITY_SETTINGS[quality]);
  } else if (outputFormat === 'ogg') {
    args.push('-codec:a', 'libvorbis', '-b:a', QUALITY_SETTINGS[quality]);
  }
  
  // Compression settings
  if (compression) {
    // Add compression flags for smaller file sizes
    args.push('-compression_level', '9');
    if (outputFormat === 'mp3') {
      args.push('-q:a', '9'); // Variable bitrate for better compression
    }
  }
  
  // Strip video for video-to-audio conversion
  args.push('-vn');
  
  args.push(outputPath);
  return args;
}

async function convertFile(inputPath, outputPath, options) {
  return new Promise((resolve, reject) => {
    const args = getFFmpegArgs(inputPath, outputPath, options);
    
    console.log('FFmpeg command:', 'ffmpeg', args.join(' '));
    
    const ffmpeg = spawn('ffmpeg', args, {
      stdio: ['ignore', 'pipe', 'pipe']
    });
    
    let stderr = '';
    
    ffmpeg.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    ffmpeg.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        console.error('FFmpeg error:', stderr);
        reject(new Error(`FFmpeg conversion failed: ${stderr}`));
      }
    });
    
    ffmpeg.on('error', (err) => {
      reject(new Error(`FFmpeg process error: ${err.message}`));
    });
  });
}

export async function POST(request) {
  let tempInputPath = null;
  let tempOutputPath = null;
  
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const outputFormat = formData.get('format') || formData.get('outputFormat') || 'mp3';
    const qualityInput = formData.get('quality') || '192';
    
    // Map quality values to our settings
    const qualityMap = {
      '64': 'low',
      '96': 'low', 
      '128': 'medium',
      '192': 'high',
      '256': 'high',
      '320': 'highest'
    };
    const quality = qualityMap[qualityInput] || 'high';
    
    const compression = formData.get('compression') === 'true';
    const type = formData.get('type') || 'audio';
    
    if (!file || !file.stream) {
      return new Response(JSON.stringify({ error: 'No file provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return new Response(JSON.stringify({ error: 'File size exceeds 500MB limit' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate file format
    const inputFileName = file.name || 'unknown';
    const inputExtension = inputFileName.split('.').pop().toLowerCase();
    
    const allSupportedFormats = [...SUPPORTED_AUDIO_FORMATS, ...SUPPORTED_VIDEO_FORMATS];
    if (!allSupportedFormats.includes(inputExtension)) {
      return new Response(JSON.stringify({ error: `Unsupported file format: ${inputExtension}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate output format
    if (!SUPPORTED_AUDIO_FORMATS.includes(outputFormat)) {
      return new Response(JSON.stringify({ error: `Unsupported output format: ${outputFormat}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create temporary file paths
    const tempDir = path.join(process.cwd(), 'temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    
    tempInputPath = path.join(tempDir, `input_${timestamp}_${randomId}.${inputExtension}`);
    tempOutputPath = path.join(tempDir, `output_${timestamp}_${randomId}.${outputFormat}`);
    
    // Save uploaded file to temporary path
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(tempInputPath, buffer);
    
    console.log(`Converting ${inputExtension} to ${outputFormat} with ${quality} quality`);
    
    // Convert file using FFmpeg
    await convertFile(tempInputPath, tempOutputPath, {
      outputFormat,
      quality,
      compression
    });
    
    // Check if output file exists and has content
    if (!fs.existsSync(tempOutputPath)) {
      throw new Error('Conversion failed: Output file not created');
    }
    
    const stats = fs.statSync(tempOutputPath);
    if (stats.size === 0) {
      throw new Error('Conversion failed: Output file is empty');
    }
    
    console.log(`Conversion successful. Output file size: ${stats.size} bytes`);
    
    // Read converted file
    const convertedBuffer = fs.readFileSync(tempOutputPath);
    
    // Set appropriate MIME type
    const mimeTypes = {
      mp3: 'audio/mpeg',
      m4a: 'audio/mp4',
      wav: 'audio/wav',
      flac: 'audio/flac',
      aac: 'audio/aac',
      ogg: 'audio/ogg'
    };
    
    const mimeType = mimeTypes[outputFormat] || 'application/octet-stream';
    const outputFileName = `converted.${outputFormat}`;
    
    return new Response(convertedBuffer, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${outputFileName}"`,
        'Content-Length': convertedBuffer.length.toString()
      }
    });
    
  } catch (error) {
    console.error('Conversion error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Conversion failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    // Clean up temporary files
    if (tempInputPath && fs.existsSync(tempInputPath)) {
      try {
        fs.unlinkSync(tempInputPath);
      } catch (e) {
        console.error('Error cleaning up input file:', e);
      }
    }
    
    if (tempOutputPath && fs.existsSync(tempOutputPath)) {
      try {
        fs.unlinkSync(tempOutputPath);
      } catch (e) {
        console.error('Error cleaning up output file:', e);
      }
    }
  }
}

export const runtime = 'nodejs';