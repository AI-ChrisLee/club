import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Build What You Need Club",
  description: "Cancel the SaaS. Build what you need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <div className="flex flex-col min-h-screen">
          <header className="border-b-4 border-black">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold hover:underline">
                  BUILD WHAT YOU NEED
                </Link>
                <div className="flex gap-6">
                  <Link href="/vault" className="hover:underline">VAULT</Link>
                  <Link href="/threads" className="hover:underline">THREADS</Link>
                  <Link href="/live" className="hover:underline">LIVE</Link>
                  <Link href="/classroom" className="hover:underline">LEARN</Link>
                  <Link href="/auth/login" className="border-2 border-black px-4 py-1 hover:bg-black hover:text-white">
                    MEMBER LOGIN
                  </Link>
                </div>
              </div>
            </nav>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="border-t-4 border-black">
            <div className="container mx-auto px-4 py-4 text-center">
              <p className="text-sm">
                BUILD WHAT YOU NEED. CANCEL THE REST. 
                <span className="mx-2">|</span>
                BUILT IN 4 HOURS TO REPLACE $419/MONTH SOFTWARE.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
