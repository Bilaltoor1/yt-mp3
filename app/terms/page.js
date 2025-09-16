export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                By using our audio and video conversion service, you agree to be bound by these terms and conditions. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Description</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our service provides free audio and video file conversion capabilities. We support conversion between various audio formats (MP3, M4A, WAV, FLAC, AAC, OGG) and extraction of audio from video files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptable Use</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                You agree to use our service only for lawful purposes and in accordance with these terms. You may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                <li>Upload files that contain copyrighted material without proper authorization</li>
                <li>Upload files that contain malicious software, viruses, or harmful content</li>
                <li>Use the service to process illegal or inappropriate content</li>
                <li>Attempt to reverse engineer, hack, or exploit our service</li>
                <li>Exceed the 500MB file size limit or abuse our processing resources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">File Limitations</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our service has the following limitations:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mt-4">
                <li>Maximum file size: 500MB per file</li>
                <li>Supported formats: Listed on our main conversion page</li>
                <li>Processing time may vary based on file size and server load</li>
                <li>Files are automatically deleted after conversion</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                You retain all rights to your uploaded files. We do not claim ownership of any content you process through our service. However, you are responsible for ensuring you have the necessary rights to process and convert the files you upload.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Availability</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We strive to maintain high service availability, but we do not guarantee uninterrupted service. We reserve the right to temporarily suspend service for maintenance, updates, or technical issues.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our service is provided "as is" without any warranties, express or implied. We do not guarantee the accuracy, reliability, or quality of conversions. You use our service at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use of our service, including but not limited to data loss or service interruption.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Privacy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy to understand how we handle your data and files.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of our service after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If you have questions about these terms, please contact us through our official support channels.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}