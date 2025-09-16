'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FiMusic, FiVideo, FiSettings, FiInfo, FiMenu, FiX } from 'react-icons/fi'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/80">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 flex items-center justify-center shadow-lg group-hover:shadow-orange-300/50 transition-all duration-300">
                <FiMusic className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">
                yttmp3.com
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Audio Converter</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/converter"
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <FiMusic className="w-4 h-4" />
              <span>Audio Converter</span>
            </Link>
            <Link
              href="/video-to-audio"
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <FiVideo className="w-4 h-4" />
              <span>Video to Audio</span>
            </Link>
            <Link
              href="/compress"
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <FiSettings className="w-4 h-4" />
              <span>Compress</span>
            </Link>
            <Link
              href="/batch-convert"
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <FiSettings className="w-4 h-4" />
              <span>Batch Convert</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors duration-200"
            >
              <FiInfo className="w-4 h-4" />
              <span>About</span>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FiX className="w-6 h-6 text-gray-700" />
            ) : (
              <FiMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen 
            ? 'max-h-96 opacity-100 mt-4 pt-4 border-t border-gray-200' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="grid grid-cols-1 gap-2">
            <Link
              href="/converter"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiMusic className="w-5 h-5" />
              <span className="text-sm font-medium">Audio Converter</span>
            </Link>
            <Link
              href="/video-to-audio"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiVideo className="w-5 h-5" />
              <span className="text-sm font-medium">Video to Audio</span>
            </Link>
            <Link
              href="/compress"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiSettings className="w-5 h-5" />
              <span className="text-sm font-medium">Compress</span>
            </Link>
            <Link
              href="/batch-convert"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiSettings className="w-5 h-5" />
              <span className="text-sm font-medium">Batch Convert</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiInfo className="w-5 h-5" />
              <span className="text-sm font-medium">About</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}