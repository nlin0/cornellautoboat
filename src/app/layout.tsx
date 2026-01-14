import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// CHANGE METADATA/IMAGES HERE
export const metadata: Metadata = {
  title: "Cornell AutoBoat Team",
  description: "Official website of the Cornell University AutoBoat Team",
  openGraph: {
    title: "Cornell AutoBoat Team",
    description: "Official website of the Cornell University AutoBoat Team",
    url: "https://www.cornellautoboat.com/",
    siteName: "Cornell AutoBoat Team",
    images: [
      {
        url: "https://www.cornellautoboat.com/CUAB_Logo.png",
        width: 1200,
        height: 1200,
        alt: "Cornell AutoBoat Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cornell AutoBoat Team",
    description: "Official website of the Cornell University AutoBoat Team",
    images: ["https://www.cornellautoboat.com/CUAB_Logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
