export const metadata = {
  title: "About yttmp3.com - Professional Audio & Video Converter",
  description: "Learn about yttmp3.com, the leading free online audio and video converter. Our mission is to provide high-quality, secure, and fast file conversion services.",
  keywords: ["about yttmp3", "audio converter company", "video conversion service", "free converter about"],
  openGraph: {
    title: "About yttmp3.com - Professional Audio & Video Converter",
    description: "Learn about yttmp3.com, the leading free online audio and video converter service.",
    type: "website",
  },
}

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">yttmp3.com</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Your trusted partner for professional-grade audio and video conversion
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              At yttmp3.com, we believe that high-quality audio and video conversion should be accessible to everyone, 
              without the need for expensive software or technical expertise. Our mission is to provide a fast, 
              secure, and completely free platform that delivers professional-grade results for all your media conversion needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 What We Do</h3>
              <p className="text-gray-600 text-sm">
                We specialize in converting audio and video files between various formats including MP3, M4A, WAV, 
                FLAC, AAC, OGG, MP4, AVI, and many more. Our advanced conversion algorithms ensure optimal quality 
                while maintaining fast processing speeds.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ Why Choose Us</h3>
              <p className="text-gray-600 text-sm">
                Unlike other services, we offer completely free conversions with no registration required, 
                no watermarks, and no file size restrictions. Your privacy is our priority - files are 
                automatically deleted after conversion.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Free</h3>
              <p className="text-gray-600 text-sm">No hidden costs, premium plans, or subscription fees. Everything is completely free forever.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">High Quality</h3>
              <p className="text-gray-600 text-sm">Professional-grade conversion with customizable quality settings from 96 kbps to 320 kbps.</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
              <p className="text-gray-600 text-sm">All files are processed securely and automatically deleted after conversion. No data is stored or shared.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Supported Formats</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Audio Formats</h4>
                <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                  <li>• MP3 (MPEG Audio)</li>
                  <li>• M4A (Apple Audio)</li>
                  <li>• WAV (Waveform Audio)</li>
                  <li>• FLAC (Free Lossless)</li>
                  <li>• AAC (Advanced Audio Codec)</li>
                  <li>• OGG (Ogg Vorbis)</li>
                  <li>• WMA (Windows Media)</li>
                  <li>• OPUS (Internet Audio)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-600 mb-2">Video Formats (Audio Extraction)</h4>
                <ul className="grid grid-cols-2 gap-1 text-sm text-gray-600">
                  <li>• MP4 (MPEG-4)</li>
                  <li>• AVI (Audio Video Interleave)</li>
                  <li>• MOV (QuickTime)</li>
                  <li>• MKV (Matroska Video)</li>
                  <li>• WMV (Windows Media)</li>
                  <li>• FLV (Flash Video)</li>
                  <li>• WEBM (Web Media)</li>
                  <li>• 3GP (3rd Generation)</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Technology</h2>
          <p className="text-gray-600 mb-6">
            yttmp3.com is built using cutting-edge web technologies and powered by FFmpeg, the industry standard 
            for multimedia processing. Our servers are optimized for fast conversion speeds while maintaining 
            the highest quality output. We use advanced algorithms to automatically detect the best conversion 
            settings for your files.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">Privacy & Security</h2>
          <p className="text-gray-600 mb-4">
            We take your privacy seriously. All uploaded files are:
          </p>
          <ul className="list-disc pl-6 text-gray-600 mb-6 space-y-1">
            <li>Processed on secure servers with SSL encryption</li>
            <li>Automatically deleted after conversion completion</li>
            <li>Never stored, shared, or used for any other purpose</li>
            <li>Processed locally without any third-party involvement</li>
          </ul>

          <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
            <h3 className="font-semibold text-orange-800 mb-2">Get Started Today</h3>
            <p className="text-orange-700 text-sm mb-4">
              Ready to convert your audio and video files? Our converter is ready to use right now - 
              no registration, no downloads, no hassle.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              Start Converting Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}