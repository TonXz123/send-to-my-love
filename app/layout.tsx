import type { Metadata } from "next";
import { Geist, Geist_Mono, Kanit } from "next/font/google"; // Added Kanit
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const kanit = Kanit({
  weight: ["300", "400", "500", "700"],
  variable: "--font-kanit",
  subsets: ["thai", "latin"],
});

export const metadata: Metadata = {
  title: "For My Love 💖",
  description: "A special page for a special person",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-kanit antialiased">
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
