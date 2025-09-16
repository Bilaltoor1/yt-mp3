export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We do not collect, store, or process any personal information from our users. Our audio and video conversion service is designed to be completely private and anonymous.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">File Processing</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                When you upload files to our service:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2 mt-4">
                <li>Files are processed temporarily on our servers</li>
                <li>All uploaded files are automatically deleted after conversion</li>
                <li>We do not store, backup, or retain any user files</li>
                <li>Conversions are processed in secure, isolated environments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We implement industry-standard security measures to protect your files during processing. All file transfers use HTTPS encryption, and temporary files are securely deleted immediately after conversion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our service does not use cookies, analytics, or any tracking technologies. We believe in complete user privacy and do not monitor or track user behavior.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Third-Party Services</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Our service operates independently and does not integrate with or share data with any third-party services, social media platforms, or advertising networks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                If you have any questions about this privacy policy, please contact us through our support channels.
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