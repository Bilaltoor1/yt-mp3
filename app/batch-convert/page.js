export const metadata = {
  title: "Batch Audio Converter - Convert Multiple Files | yttmp3.com",
  description: "Convert multiple audio files simultaneously. Batch convert MP3, M4A, WAV, FLAC and more formats with our efficient bulk converter tool.",
  keywords: ["batch converter", "bulk audio converter", "multiple file converter", "mass audio conversion"],
}

export default function BatchConvert() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">
              Batch Converter
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Convert multiple audio files at once. Save time with our efficient batch processing system.
          </p>
        </div>

        <div className="bg-orange-50 rounded-xl p-8 mb-8 border border-orange-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              Our batch conversion feature is under development. For now, you can use our main converter 
              to process files one by one with the same high quality results.
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
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Planned Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Convert up to 50 files simultaneously</li>
              <li>• Same format conversion for all files</li>
              <li>• Progress tracking for each file</li>
              <li>• Batch quality settings</li>
              <li>• ZIP download for converted files</li>
              <li>• Resume interrupted conversions</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Benefits</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Save time on multiple conversions</li>
              <li>• Consistent quality across all files</li>
              <li>• Automatic file organization</li>
              <li>• Efficient server resource usage</li>
              <li>• Perfect for music libraries</li>
              <li>• Ideal for podcast processing</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How Batch Conversion Will Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Select Files</h4>
              <p className="text-gray-600 text-sm">Choose multiple audio files to convert</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Set Options</h4>
              <p className="text-gray-600 text-sm">Choose format and quality for all files</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Convert</h4>
              <p className="text-gray-600 text-sm">Process all files simultaneously</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Download</h4>
              <p className="text-gray-600 text-sm">Get all converted files in a ZIP</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}