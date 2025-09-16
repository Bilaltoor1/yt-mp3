export const metadata = {
  title: "Audio Compressor - Reduce File Size | yttmp3.com",
  description: "Compress audio files to reduce size while maintaining quality. Free online audio compressor for MP3, M4A, WAV, FLAC files.",
  keywords: ["audio compressor", "compress audio", "reduce file size", "audio optimization", "mp3 compressor"],
}

export default function Compress() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Audio Compressor
            </span>
            <br />
            <span className="text-gray-900">Tool</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Reduce your audio file sizes while maintaining quality. Perfect for optimizing storage and sharing.
          </p>
        </div>

        <div className="bg-orange-50 rounded-xl p-8 mb-8 border border-orange-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              Our dedicated audio compressor tool is in development. Currently, you can compress audio by 
              converting to a lower bitrate using our main converter.
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Compression Options</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <span className="text-sm font-medium">64 kbps</span>
                <span className="text-xs text-red-600">Maximum Compression</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <span className="text-sm font-medium">128 kbps</span>
                <span className="text-xs text-yellow-600">Good Compression</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">192 kbps</span>
                <span className="text-xs text-green-600">Balanced Quality/Size</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits of Audio Compression</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Smaller file sizes for easier sharing</li>
              <li>• Faster upload and download times</li>
              <li>• Save storage space on devices</li>
              <li>• Optimize for streaming services</li>
              <li>• Better performance on mobile</li>
              <li>• Maintain acceptable audio quality</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Compress Audio Files</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Upload your audio file to our main converter</li>
            <li>Select the same output format as your input file</li>
            <li>Choose a lower bitrate (64kbps, 96kbps, or 128kbps)</li>
            <li>Convert the file to apply compression</li>
            <li>Download your compressed audio file</li>
          </ol>
          
          <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <h4 className="font-medium text-blue-800 mb-1">💡 Pro Tip</h4>
            <p className="text-blue-700 text-sm">
              For voice recordings and podcasts, 64-96 kbps provides excellent compression. 
              For music, stay above 128 kbps to maintain good quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}