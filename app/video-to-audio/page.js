export const metadata = {
  title: "Video to Audio Converter - Extract Audio from Video Files | yttmp3.com",
  description: "Convert video files to audio formats. Extract MP3, M4A, WAV from MP4, AVI, MOV, MKV and more. Free online video to audio converter.",
  keywords: ["video to audio", "extract audio", "mp4 to mp3", "avi to mp3", "mov to mp3", "video converter"],
}

export default function VideoToAudio() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Video to Audio
            </span>
            <br />
            <span className="text-gray-900">Converter</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Extract high-quality audio from your video files. Support for MP4, AVI, MOV, MKV and more.
          </p>
        </div>

        <div className="bg-orange-50 rounded-xl p-8 mb-8 border border-orange-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              Our dedicated video to audio converter is under development. For now, you can use our main converter 
              which supports video files and extracts audio automatically.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors"
            >
              Use Main Converter
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Supported Video Formats</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• MP4 (MPEG-4 Video)</li>
              <li>• AVI (Audio Video Interleave)</li>
              <li>• MOV (QuickTime Movie)</li>
              <li>• MKV (Matroska Video)</li>
              <li>• WMV (Windows Media Video)</li>
              <li>• FLV (Flash Video)</li>
              <li>• WEBM (Web Media)</li>
              <li>• 3GP (3rd Generation)</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Output Audio Formats</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• MP3 (Most Popular)</li>
              <li>• M4A (Apple Format)</li>
              <li>• WAV (Uncompressed)</li>
              <li>• FLAC (Lossless)</li>
              <li>• AAC (Advanced Audio)</li>
              <li>• OGG (Open Source)</li>
              <li>• WMA (Windows Media)</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How Video to Audio Conversion Works</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Upload your video file (MP4, AVI, MOV, etc.)</li>
            <li>Choose your preferred audio output format</li>
            <li>Select quality level (64kbps to 320kbps)</li>
            <li>Our system extracts and converts the audio track</li>
            <li>Download your high-quality audio file</li>
          </ol>
        </div>
      </div>
    </div>
  )
}