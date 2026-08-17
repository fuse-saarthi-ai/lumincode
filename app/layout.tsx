import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lumin.studio"),
  title: "Lumin Studio — We Design. We Build. We Ship.",
  description:
    "A digital studio crafting websites and applications that move business forward. Based in San Francisco, working globally.",
  openGraph: {
    title: "Lumin Studio — We Design. We Build. We Ship.",
    description:
      "A digital studio crafting websites and applications that move business forward.",
    url: "https://lumin.studio",
    siteName: "Lumin Studio",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Lumin Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumin Studio — We Design. We Build. We Ship.",
    description: "A digital studio crafting websites and applications that move business forward.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} scroll-smooth`}>
      <body className="bg-[#0a0a0a] font-sans antialiased">{children}</body>
    </html>
  );
}
