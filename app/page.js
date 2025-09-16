'use client'

import { useState, useRef } from 'react'
import { FiUpload, FiFile, FiDownload, FiX, FiLoader, FiCheck, FiMusic, FiVideo, FiSettings } from 'react-icons/fi'

export default function Home() {
  const [file, setFile] = useState(null)
  const [outputFormat, setOutputFormat] = useState('mp3')
  const [quality, setQuality] = useState('192')
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFile, setConvertedFile] = useState(null)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const supportedFormats = [
    { value: 'mp3', label: 'MP3', description: 'Most popular audio format' },
    { value: 'm4a', label: 'M4A', description: 'Apple audio format' },
    { value: 'wav', label: 'WAV', description: 'Uncompressed audio' },
    { value: 'flac', label: 'FLAC', description: 'Lossless audio' },
    { value: 'aac', label: 'AAC', description: 'Advanced audio codec' },
    { value: 'ogg', label: 'OGG', description: 'Open-source format' },
    { value: 'wma', label: 'WMA', description: 'Windows media audio' }
  ]

  const qualityOptions = [
    { value: '96', label: '96 kbps', description: 'Small file size' },
    { value: '128', label: '128 kbps', description: 'Good quality' },
    { value: '192', label: '192 kbps', description: 'High quality' },
    { value: '256', label: '256 kbps', description: 'Very high quality' },
    { value: '320', label: '320 kbps', description: 'Maximum quality' }
  ]

  const handleFileChange = (selectedFile) => {
    if (selectedFile && (selectedFile.type.startsWith('audio/') || selectedFile.type.startsWith('video/'))) {
      setFile(selectedFile)
      setConvertedFile(null)
    } else {
      alert('Please select a valid audio or video file')
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  const convertFile = async () => {
    if (!file) return

    setIsConverting(true)
    setConversionProgress(0)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', outputFormat)
    formData.append('quality', quality)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setConversionProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setConversionProgress(100)

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setConvertedFile({
          url,
          name: `converted.${outputFormat}`,
          size: blob.size
        })
      } else {
        throw new Error('Conversion failed')
      }
    } catch (error) {
      console.error('Conversion error:', error)
      alert('Conversion failed. Please try again.')
    } finally {
      setIsConverting(false)
      setConversionProgress(0)
    }
  }

  const removeFile = () => {
    setFile(null)
    setConvertedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-600 bg-clip-text text-transparent">
                Free Audio & Video
              </span>
              <br />
              <span className="text-gray-900">Converter Online</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Convert your audio and video files to any format instantly. Support for MP3, M4A, WAV, FLAC, AAC, OGG and more. 
              <span className="font-semibold text-orange-600"> 100% free, no registration required.</span>
            </p>
            
            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <FiCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">100% Free Forever</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <FiCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">No Registration</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <FiCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">High Quality Output</span>
              </div>
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-sm border border-gray-200">
                <FiCheck className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">Fast & Secure</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Converter Tool */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              {/* Upload Area */}
              <div className="p-8">
                <div
                  className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-orange-500 bg-orange-50'
                      : file
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:border-orange-400 hover:bg-orange-25'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {!file ? (
                    <>
                      <FiUpload className="mx-auto w-16 h-16 text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Drop your files here
                      </h3>
                      <p className="text-gray-500 mb-6">
                        or click to browse • Supports audio and video files up to 500MB
                      </p>
                      <input
                        ref={fileInputRef}
                        type="file"
                        onChange={(e) => handleFileChange(e.target.files[0])}
                        accept="audio/*,video/*"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        <FiUpload className="w-5 h-5 mr-2" />
                        Choose File
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center space-x-3">
                        <FiFile className="w-8 h-8 text-orange-500" />
                        <div className="text-left">
                          <p className="font-medium text-gray-900">{file.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={removeFile}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiX className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Format Selection */}
              {file && (
                <>
                  <div className="border-t border-gray-200 p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Output Format */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Output Format
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {supportedFormats.map((format) => (
                            <button
                              key={format.value}
                              onClick={() => setOutputFormat(format.value)}
                              className={`p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                                outputFormat === format.value
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="font-medium">{format.label}</div>
                              <div className="text-xs text-gray-500">{format.description}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quality Selection */}
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Quality Level
                        </label>
                        <div className="space-y-2">
                          {qualityOptions.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => setQuality(option.value)}
                              className={`w-full p-3 rounded-lg border-2 text-left transition-all duration-200 ${
                                quality === option.value
                                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                                  : 'border-gray-200 hover:border-gray-300 bg-white'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-medium">{option.label}</span>
                                <span className="text-xs text-gray-500">{option.description}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Convert Button */}
                    <div className="mt-8">
                      <button
                        onClick={convertFile}
                        disabled={isConverting}
                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        {isConverting ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FiLoader className="w-5 h-5 animate-spin" />
                            <span>Converting... {conversionProgress}%</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center space-x-2">
                            <FiSettings className="w-5 h-5" />
                            <span>Convert File</span>
                          </div>
                        )}
                      </button>
                    </div>

                    {/* Progress Bar */}
                    {isConverting && (
                      <div className="mt-4">
                        <div className="bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${conversionProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Download Area */}
              {convertedFile && (
                <div className="border-t border-gray-200 p-8 bg-green-50">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiCheck className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Conversion Complete!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Your file has been successfully converted to {outputFormat.toUpperCase()}
                    </p>
                    <a
                      href={convertedFile.url}
                      download={convertedFile.name}
                      className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <FiDownload className="w-5 h-5 mr-2" />
                      Download File ({formatFileSize(convertedFile.size)})
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose yttmp3.com?
            </h2>
            <p className="text-lg text-gray-600">
              Our audio and video converter offers professional-grade features with the simplicity you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                <FiMusic className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Universal Format Support</h3>
              <p className="text-gray-600">
                Convert between MP3, M4A, WAV, FLAC, AAC, OGG, WMA and many more audio and video formats with ease.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FiVideo className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Video to Audio</h3>
              <p className="text-gray-600">
                Extract audio from video files like MP4, AVI, MOV, MKV and convert to your preferred audio format.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                <FiSettings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Control</h3>
              <p className="text-gray-600">
                Choose from multiple quality levels from 96 kbps to 320 kbps to balance file size and audio quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Conversions */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Audio Conversions
            </h2>
            <p className="text-lg text-gray-600">
              Quick access to the most requested audio format conversions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { from: 'M4A', to: 'MP3', desc: 'Convert M4A to MP3' },
              { from: 'WAV', to: 'MP3', desc: 'Convert WAV to MP3' },
              { from: 'FLAC', to: 'MP3', desc: 'Convert FLAC to MP3' },
              { from: 'AAC', to: 'MP3', desc: 'Convert AAC to MP3' },
              { from: 'OGG', to: 'MP3', desc: 'Convert OGG to MP3' },
              { from: 'WMA', to: 'MP3', desc: 'Convert WMA to MP3' },
              { from: 'MP3', to: 'M4A', desc: 'Convert MP3 to M4A' },
              { from: 'MP3', to: 'WAV', desc: 'Convert MP3 to WAV' },
              { from: 'MP3', to: 'FLAC', desc: 'Convert MP3 to FLAC' },
              { from: 'MP3', to: 'AAC', desc: 'Convert MP3 to AAC' },
              { from: 'MP4', to: 'MP3', desc: 'Extract MP3 from MP4' },
              { from: 'AVI', to: 'MP3', desc: 'Extract MP3 from AVI' },
            ].map((conversion, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 group cursor-pointer hover:border-orange-300"
              >
                <div className="text-center">
                  <div className="text-sm font-bold text-orange-600 mb-1">
                    {conversion.from} → {conversion.to}
                  </div>
                  <div className="text-xs text-gray-500 group-hover:text-gray-700">
                    {conversion.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                The Ultimate Audio & Video Converter - yttmp3.com
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">What is yttmp3.com?</h3>
                  <p className="text-gray-600 mb-4">
                    yttmp3.com is a powerful, free online audio and video converter that supports over 20+ file formats. 
                    Whether you need to convert M4A to MP3, extract audio from video files, or compress audio files, 
                    our tool provides professional-grade results without any software installation.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Supported Formats</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <strong className="text-orange-600">Audio:</strong>
                      <ul className="text-gray-600 mt-1">
                        <li>• MP3</li>
                        <li>• M4A</li>
                        <li>• WAV</li>
                        <li>• FLAC</li>
                        <li>• AAC</li>
                        <li>• OGG</li>
                      </ul>
                    </div>
                    <div>
                      <strong className="text-orange-600">Video:</strong>
                      <ul className="text-gray-600 mt-1">
                        <li>• MP4</li>
                        <li>• AVI</li>
                        <li>• MOV</li>
                        <li>• MKV</li>
                        <li>• WMV</li>
                        <li>• FLV</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">How to Use yttmp3.com Converter</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600 mb-6">
                <li><strong>Upload your file:</strong> Drag and drop your audio or video file, or click to browse</li>
                <li><strong>Choose output format:</strong> Select from MP3, M4A, WAV, FLAC, AAC, OGG, and more</li>
                <li><strong>Select quality:</strong> Pick your preferred bitrate from 96 kbps to 320 kbps</li>
                <li><strong>Convert:</strong> Click the convert button and wait for processing to complete</li>
                <li><strong>Download:</strong> Save your converted file to your device</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Why Choose Our Audio Converter?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <ul className="space-y-2 text-gray-600">
                  <li>✅ <strong>100% Free:</strong> No hidden costs or premium plans</li>
                  <li>✅ <strong>No Registration:</strong> Start converting immediately</li>
                  <li>✅ <strong>High Quality:</strong> Professional-grade audio output</li>
                  <li>✅ <strong>Fast Processing:</strong> Quick conversion times</li>
                </ul>
                <ul className="space-y-2 text-gray-600">
                  <li>✅ <strong>Secure:</strong> Files deleted after conversion</li>
                  <li>✅ <strong>Universal Support:</strong> Works on all devices</li>
                  <li>✅ <strong>Batch Processing:</strong> Convert multiple files</li>
                  <li>✅ <strong>No Software:</strong> Browser-based solution</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Common Audio Format Conversions</h3>
              <p className="text-gray-600 mb-4">
                Our converter excels at handling the most popular audio format conversions:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-6">
                <li>• <strong>M4A to MP3:</strong> Convert Apple audio to universal format</li>
                <li>• <strong>WAV to MP3:</strong> Compress uncompressed audio files</li>
                <li>• <strong>FLAC to MP3:</strong> Convert lossless to compressed format</li>
                <li>• <strong>AAC to MP3:</strong> Transform advanced audio codec files</li>
                <li>• <strong>OGG to MP3:</strong> Convert open-source format to MP3</li>
                <li>• <strong>Video to MP3:</strong> Extract audio from video files</li>
              </ul>

              <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-800 mb-2">💡 Pro Tip</h4>
                <p className="text-orange-700 text-sm">
                  For the best quality results, use 192 kbps or higher for music files. For voice recordings, 
                  128 kbps is usually sufficient and creates smaller file sizes.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}