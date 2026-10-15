import type { Metadata } from "next";
import { Geist, Geist_Mono, Kode_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const kodoMono = Kode_Mono({
  variable: "--font-kodo-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-genes.vercel.app"),

  title: {
    default: "Gene | Fullstack Developer & Web Designer",
    template: "%s | Gene",
  },

  description:
    "Web developer specializing in modern web experiences, front-end and back-end development, WordPress solutions, API integrations, and digital projects.",

  verification: {
    google: "cqWiggGIl18Pzgg-3KIJoC3Zn1-KssdGo-3yQ_O2bLE",
  },

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Gene | Web Development Portfolio",
    description:
      "Explore my web development portfolio featuring interactive interfaces, custom websites, development projects, and digital solutions.",
    url: "https://portfolio-genes.vercel.app",
    siteName: "Gene — Portfolio",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/bs2vsg8c/image/upload/v1792041138/92dd5833-fac8-46c4-8473-0fbad64c2570.png",
        width: 1200,
        height: 630,
        alt: "Gene's web development portfolio",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kodoMono.variable} antialiased`}>
        {children} <GoogleAnalytics gaId="G-7JC10G4KL0"></GoogleAnalytics>
      </body>
    </html>
  );
}
