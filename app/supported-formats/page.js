export const metadata = {
  title: "Supported Audio & Video Formats - yttmp3.com Converter",
  description: "Complete list of supported audio and video formats for yttmp3.com converter. Convert between MP3, M4A, WAV, FLAC, AAC, OGG, MP4, AVI, MOV and more.",
  keywords: ["supported formats", "audio formats", "video formats", "mp3 converter", "m4a converter", "wav converter"],
  openGraph: {
    title: "Supported Audio & Video Formats - yttmp3.com",
    description: "Complete list of supported audio and video formats for conversion.",
    type: "website",
  },
}

export default function SupportedFormats() {
  const audioFormats = [
    {
      format: "MP3",
      fullName: "MPEG Audio Layer III",
      description: "Most popular audio format, widely supported across all devices and platforms.",
      fileExtension: ".mp3",
      compression: "Lossy",
      quality: "Good to Excellent",
      useCase: "Music, podcasts, general audio"
    },
    {
      format: "M4A",
      fullName: "MPEG-4 Audio",
      description: "Apple's preferred audio format, offering better quality than MP3 at similar bitrates.",
      fileExtension: ".m4a",
      compression: "Lossy",
      quality: "Very Good",
      useCase: "iTunes, Apple devices, high-quality audio"
    },
    {
      format: "WAV",
      fullName: "Waveform Audio File Format",
      description: "Uncompressed audio format providing the highest quality but larger file sizes.",
      fileExtension: ".wav",
      compression: "Uncompressed",
      quality: "Lossless",
      useCase: "Professional audio, mastering, archival"
    },
    {
      format: "FLAC",
      fullName: "Free Lossless Audio Codec",
      description: "Open-source lossless compression that maintains original quality while reducing file size.",
      fileExtension: ".flac",
      compression: "Lossless",
      quality: "Perfect",
      useCase: "Audiophiles, music archival, high-end audio"
    },
    {
      format: "AAC",
      fullName: "Advanced Audio Coding",
      description: "Successor to MP3 with better sound quality at lower bitrates.",
      fileExtension: ".aac",
      compression: "Lossy",
      quality: "Very Good",
      useCase: "Streaming, mobile devices, broadcast"
    },
    {
      format: "OGG",
      fullName: "Ogg Vorbis",
      description: "Open-source audio format offering superior quality compared to MP3.",
      fileExtension: ".ogg",
      compression: "Lossy",
      quality: "Excellent",
      useCase: "Open-source projects, gaming, web audio"
    },
    {
      format: "WMA",
      fullName: "Windows Media Audio",
      description: "Microsoft's audio format with good compression and quality.",
      fileExtension: ".wma",
      compression: "Lossy",
      quality: "Good",
      useCase: "Windows Media Player, Microsoft ecosystem"
    },
    {
      format: "OPUS",
      fullName: "Opus Audio Codec",
      description: "Modern codec optimized for internet transmission with excellent quality.",
      fileExtension: ".opus",
      compression: "Lossy",
      quality: "Excellent",
      useCase: "VoIP, streaming, real-time audio"
    }
  ]

  const videoFormats = [
    {
      format: "MP4",
      fullName: "MPEG-4 Part 14",
      description: "Most widely supported video format across all devices and platforms.",
      fileExtension: ".mp4",
      videoCodec: "H.264, H.265",
      audioCodec: "AAC, MP3",
      useCase: "Web videos, mobile devices, streaming"
    },
    {
      format: "AVI",
      fullName: "Audio Video Interleave",
      description: "Legacy Microsoft format still widely used for video storage.",
      fileExtension: ".avi",
      videoCodec: "Various",
      audioCodec: "Various",
      useCase: "Older systems, video editing, archival"
    },
    {
      format: "MOV",
      fullName: "QuickTime File Format",
      description: "Apple's video format offering high quality and professional features.",
      fileExtension: ".mov",
      videoCodec: "H.264, ProRes",
      audioCodec: "AAC, PCM",
      useCase: "Mac systems, professional video, editing"
    },
    {
      format: "MKV",
      fullName: "Matroska Video",
      description: "Open-source container supporting multiple video and audio streams.",
      fileExtension: ".mkv",
      videoCodec: "H.264, H.265, VP9",
      audioCodec: "Various",
      useCase: "High-quality video, multiple audio tracks"
    },
    {
      format: "WMV",
      fullName: "Windows Media Video",
      description: "Microsoft's video format optimized for Windows systems.",
      fileExtension: ".wmv",
      videoCodec: "WMV, VC-1",
      audioCodec: "WMA, AAC",
      useCase: "Windows Media Player, Microsoft services"
    },
    {
      format: "FLV",
      fullName: "Flash Video",
      description: "Adobe Flash video format, commonly used for web streaming.",
      fileExtension: ".flv",
      videoCodec: "H.264, VP6",
      audioCodec: "AAC, MP3",
      useCase: "Web streaming, legacy flash content"
    },
    {
      format: "WEBM",
      fullName: "WebM Video",
      description: "Open web video format optimized for HTML5 video streaming.",
      fileExtension: ".webm",
      videoCodec: "VP8, VP9, AV1",
      audioCodec: "Vorbis, Opus",
      useCase: "Web browsers, YouTube, streaming"
    },
    {
      format: "3GP",
      fullName: "3rd Generation Partnership Project",
      description: "Mobile video format designed for smartphones and mobile devices.",
      fileExtension: ".3gp",
      videoCodec: "H.264, MPEG-4",
      audioCodec: "AAC, AMR",
      useCase: "Mobile devices, MMS, basic video"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Supported <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">Formats</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            yttmp3.com supports a comprehensive range of audio and video formats for conversion. 
            Choose from professional-grade codecs to ensure optimal quality for your specific needs.
          </p>
        </div>

        {/* Audio Formats Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Audio Formats</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {audioFormats.map((format, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{format.format}</h3>
                    <p className="text-sm text-gray-500">{format.fullName}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    {format.fileExtension}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{format.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">Compression:</span>
                    <p className="text-gray-600">{format.compression}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Quality:</span>
                    <p className="text-gray-600">{format.quality}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="font-medium text-gray-700 text-xs">Best for:</span>
                  <p className="text-gray-600 text-xs">{format.useCase}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Formats Section */}
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Video Formats <span className="text-lg font-normal text-gray-500">(Audio Extraction)</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {videoFormats.map((format, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{format.format}</h3>
                    <p className="text-sm text-gray-500">{format.fullName}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {format.fileExtension}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{format.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="font-medium text-gray-700">Video Codec:</span>
                    <p className="text-gray-600">{format.videoCodec}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Audio Codec:</span>
                    <p className="text-gray-600">{format.audioCodec}</p>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <span className="font-medium text-gray-700 text-xs">Best for:</span>
                  <p className="text-gray-600 text-xs">{format.useCase}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Conversion Matrix */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Conversion Paths</h2>
          
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-orange-600 mb-4">To MP3 (Most Popular)</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    M4A → MP3
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    WAV → MP3
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    FLAC → MP3
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    AAC → MP3
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    OGG → MP3
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-blue-600 mb-4">High Quality Formats</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    MP3 → FLAC
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    M4A → WAV
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    MP3 → M4A
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    AAC → FLAC
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    WAV → FLAC
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-green-600 mb-4">Video to Audio</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    MP4 → MP3
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    AVI → MP3
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    MOV → M4A
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    MKV → FLAC
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    WEBM → OGG
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Recommendations */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Quality Recommendations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
              <h3 className="font-semibold text-red-800 mb-2">96 kbps</h3>
              <p className="text-red-700 text-sm">Voice recordings, podcasts, speech. Smallest file sizes.</p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
              <h3 className="font-semibold text-yellow-800 mb-2">128 kbps</h3>
              <p className="text-yellow-700 text-sm">Good quality music, streaming, mobile devices. Balanced quality/size.</p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="font-semibold text-blue-800 mb-2">192 kbps</h3>
              <p className="text-blue-700 text-sm">High quality music, near-CD quality. Recommended for most users.</p>
            </div>
            
            <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
              <h3 className="font-semibold text-green-800 mb-2">320 kbps</h3>
              <p className="text-green-700 text-sm">Maximum quality, audiophile grade. Large file sizes.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}