import "./globals.css";

export const metadata = {
  title: "YouTube MP3 Converter",
  description: "Convert YouTube videos to MP3 format",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
