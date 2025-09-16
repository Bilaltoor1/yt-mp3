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
  
  // Add error handling and verbose output for debugging
  args.push('-loglevel', 'error', '-stats');
  
  // Audio encoding settings with fallback codecs
  if (outputFormat === 'mp3') {
    // Check if libmp3lame is available, fallback to mp3 if not
    args.push('-codec:a', 'libmp3lame');
    args.push('-b:a', QUALITY_SETTINGS[quality]);
    args.push('-joint_stereo', '1'); // Better compatibility
  } else if (outputFormat === 'm4a') {
    // Use AAC codec for M4A
    args.push('-codec:a', 'aac');
    args.push('-b:a', QUALITY_SETTINGS[quality]);
    args.push('-movflags', '+faststart'); // Optimize for web
  } else if (outputFormat === 'wav') {
    // PCM 16-bit for WAV (uncompressed)
    args.push('-codec:a', 'pcm_s16le');
    args.push('-ar', '44100'); // Sample rate
  } else if (outputFormat === 'flac') {
    // FLAC lossless compression
    args.push('-codec:a', 'flac');
    args.push('-compression_level', '5'); // Balanced compression
  } else if (outputFormat === 'aac') {
    // AAC codec
    args.push('-codec:a', 'aac');
    args.push('-b:a', QUALITY_SETTINGS[quality]);
    args.push('-profile:a', 'aac_low'); // Better compatibility
  } else if (outputFormat === 'ogg') {
    // Vorbis codec for OGG
    args.push('-codec:a', 'libvorbis');
    args.push('-b:a', QUALITY_SETTINGS[quality]);
    args.push('-q:a', '4'); // Quality setting
  } else if (outputFormat === 'wma') {
    // Windows Media Audio
    args.push('-codec:a', 'wmav2');
    args.push('-b:a', QUALITY_SETTINGS[quality]);
  }
  
  // Additional compression settings
  if (compression) {
    args.push('-compression_level', '6');
    if (outputFormat === 'mp3') {
      args.push('-q:a', '2'); // Variable bitrate quality
    }
  }
  
  // Strip video for video-to-audio conversion
  args.push('-vn');
  
  // Audio channel and sample rate normalization
  args.push('-ac', '2'); // Stereo
  if (outputFormat !== 'wav') {
    args.push('-ar', '44100'); // 44.1kHz sample rate
  }
  
  args.push(outputPath);
  return args;
}

async function convertFile(inputPath, outputPath, options) {
  return new Promise((resolve, reject) => {
    const args = getFFmpegArgs(inputPath, outputPath, options);
    
    console.log('FFmpeg command:', 'ffmpeg', args.join(' '));
    
    // Check if FFmpeg is available
    const ffmpeg = spawn('ffmpeg', ['-version'], { stdio: 'pipe' });
    ffmpeg.on('error', (err) => {
      reject(new Error(`FFmpeg not found: ${err.message}. Please ensure FFmpeg is installed.`));
      return;
    });
    
    ffmpeg.on('close', (code) => {
      if (code !== 0) {
        reject(new Error('FFmpeg is not working properly. Please check installation.'));
        return;
      }
      
      // FFmpeg is available, proceed with conversion
      const conversion = spawn('ffmpeg', args, {
        stdio: ['ignore', 'pipe', 'pipe']
      });
      
      let stderr = '';
      let stdout = '';
      
      conversion.stdout.on('data', (data) => {
        stdout += data.toString();
      });
      
      conversion.stderr.on('data', (data) => {
        stderr += data.toString();
      });
      
      conversion.on('close', (code) => {
        if (code === 0) {
          console.log('FFmpeg conversion successful');
          resolve();
        } else {
          console.error('FFmpeg error code:', code);
          console.error('FFmpeg stderr:', stderr);
          console.error('FFmpeg stdout:', stdout);
          reject(new Error(`FFmpeg conversion failed with exit code ${code}: ${stderr || 'Unknown error'}`));
        }
      });
      
      conversion.on('error', (err) => {
        console.error('FFmpeg process error:', err);
        reject(new Error(`FFmpeg process error: ${err.message}`));
      });
      
      // Set timeout for conversion (5 minutes)
      const timeout = setTimeout(() => {
        conversion.kill('SIGKILL');
        reject(new Error('Conversion timeout: Process took too long'));
      }, 300000);
      
      conversion.on('close', () => {
        clearTimeout(timeout);
      });
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
    
    console.log('Temp directory:', tempDir);
    console.log('Current working directory:', process.cwd());
    
    // Ensure temp directory exists with proper permissions
    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true, mode: 0o755 });
        console.log('Created temp directory:', tempDir);
      }
      
      // Test write permissions
      const testFile = path.join(tempDir, 'test-write');
      fs.writeFileSync(testFile, 'test');
      fs.unlinkSync(testFile);
      console.log('Temp directory write test passed');
    } catch (permError) {
      console.error('Temp directory permission error:', permError);
      throw new Error(`Cannot access temp directory: ${permError.message}`);
    }    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(7);
    
    tempInputPath = path.join(tempDir, `input_${timestamp}_${randomId}.${inputExtension}`);
    tempOutputPath = path.join(tempDir, `output_${timestamp}_${randomId}.${outputFormat}`);
    
    // Save uploaded file to temporary path
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(tempInputPath, buffer);
    
    console.log(`Converting ${inputExtension} to ${outputFormat} with ${quality} quality`);
    console.log(`Input file size: ${buffer.length} bytes`);
    
    // Validate input file
    if (buffer.length === 0) {
      throw new Error('Input file is empty');
    }
    
    if (buffer.length > MAX_FILE_SIZE) {
      throw new Error(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
    }
    
    // Convert file using FFmpeg
    try {
      await convertFile(tempInputPath, tempOutputPath, {
        outputFormat,
        quality,
        compression
      });
    } catch (ffmpegError) {
      console.error('FFmpeg conversion error:', ffmpegError.message);
      
      // Check if it's a missing codec error
      if (ffmpegError.message.includes('Unknown encoder') || 
          ffmpegError.message.includes('Encoder not found')) {
        throw new Error(`Audio codec not available for ${outputFormat} format. Please try a different format.`);
      }
      
      // Check if it's a corrupted file error
      if (ffmpegError.message.includes('Invalid data found') || 
          ffmpegError.message.includes('moov atom not found')) {
        throw new Error('Input file appears to be corrupted or invalid. Please try a different file.');
      }
      
      // Re-throw with original error message
      throw ffmpegError;
    }
    
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