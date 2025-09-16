import "./globals.css";
import Link from 'next/link';
import Header from '../components/Header';

export const metadata = {
  metadataBase: new URL('https://yttmp3.com'),
  title: {
    default: "yttmp3.com - Best Free Audio & Video Converter Online",
    template: "%s | yttmp3.com - Audio Converter"
  },
  description: "Convert audio and video files instantly with yttmp3.com. Free online converter supporting MP3, M4A, WAV, FLAC, AAC, OGG and more. High quality, fast conversion, no registration required.",
  keywords: [
    "audio converter",
    "video converter", 
    "mp3 converter",
    "m4a to mp3",
    "wav to mp3",
    "flac converter",
    "online audio converter",
    "free converter",
    "yttmp3",
    "audio format converter",
    "video to audio",
    "compress audio",
    "high quality converter"
  ],
  authors: [{ name: "yttmp3.com Team", url: "https://yttmp3.com" }],
  creator: "yttmp3.com",
  publisher: "yttmp3.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yttmp3.com',
    siteName: 'yttmp3.com - Audio & Video Converter',
    title: 'yttmp3.com - Best Free Audio & Video Converter Online',
    description: 'Convert audio and video files instantly. Support for MP3, M4A, WAV, FLAC, AAC and more. Fast, free, and high quality conversions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'yttmp3.com - Audio & Video Converter',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@yttmp3com',
    creator: '@yttmp3com',
    title: 'yttmp3.com - Best Free Audio & Video Converter',
    description: 'Convert audio and video files instantly. Support for MP3, M4A, WAV, FLAC and more formats.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://yttmp3.com',
    languages: {
      'en-US': 'https://yttmp3.com',
      'x-default': 'https://yttmp3.com',
    },
  },
  category: 'technology',
  classification: 'Audio & Video Conversion Tools',
};

export default function RootLayout({ children }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "yttmp3.com - Audio & Video Converter",
    "url": "https://yttmp3.com",
    "description": "Convert audio and video files instantly with yttmp3.com. Free online converter supporting MP3, M4A, WAV, FLAC, AAC, OGG and more.",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Audio format conversion",
      "Video to audio conversion",
      "Batch processing",
      "High quality output",
      "Fast processing",
      "No registration required"
    ],
    "browserRequirements": "Requires JavaScript"
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="theme-color" content="#f97316" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="yttmp3.com" />
        <link rel="dns-prefetch" href="https://yttmp3.com" />
      </head>
      <body className="antialiased bg-white text-gray-900 font-sans">
        <div className="flex flex-col min-h-screen">
          <Header />
          
          <main className="flex-grow">
            {children}
          </main>
          
          <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-4 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">
                      yttmp3.com
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    The most trusted free online audio and video converter. Convert between MP3, M4A, WAV, FLAC, AAC, OGG and many more formats with professional quality results.
                  </p>
                  <div className="flex space-x-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      100% Free
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      No Registration
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      High Quality
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link href="/converter" className="hover:text-orange-600 transition-colors">Audio Converter</Link></li>
                    <li><Link href="/video-to-audio" className="hover:text-orange-600 transition-colors">Video to Audio</Link></li>
                    <li><Link href="/compress" className="hover:text-orange-600 transition-colors">Audio Compressor</Link></li>
                    <li><Link href="/batch-convert" className="hover:text-orange-600 transition-colors">Batch Convert</Link></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li><Link href="/about" className="hover:text-orange-600 transition-colors">About Us</Link></li>
                    <li><Link href="/faq" className="hover:text-orange-600 transition-colors">FAQ</Link></li>
                    <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Contact</Link></li>
                    <li><Link href="/supported-formats" className="hover:text-orange-600 transition-colors">Supported Formats</Link></li>
                  </ul>
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-6">
                    <p className="text-sm text-gray-500">
                      © {new Date().getFullYear()} yttmp3.com. All rights reserved.
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <Link 
                      href="/privacy" 
                      className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      Privacy Policy
                    </Link>
                    <Link 
                      href="/terms" 
                      className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      Terms of Service
                    </Link>
                    <Link 
                      href="/sitemap.xml" 
                      className="text-sm text-gray-500 hover:text-orange-600 transition-colors"
                    >
                      Sitemap
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
