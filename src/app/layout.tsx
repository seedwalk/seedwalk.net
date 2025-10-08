import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Federico Caramelli | Full-Stack Developer",
  description: "Full-stack developer with strong experience in NestJS, React/TypeScript, AWS, PostgreSQL & microservices. Open to new opportunities",
  keywords: [
    "Full-Stack Developer",
    "NestJS",
    "React",
    "TypeScript",
    "AWS",
    "PostgreSQL",
    "Microservices",
    "Node.js",
    "Next.js",
    "Federico Caramelli"
  ],
  authors: [{ name: "Federico Caramelli" }],
  creator: "Federico Caramelli",
  publisher: "Federico Caramelli",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://seedwalk.net",
    title: "Federico Caramelli | Full-Stack Developer",
    description: "Full-stack developer with strong experience in NestJS, React/TypeScript, AWS, PostgreSQL & microservices. Open to new opportunities",
    siteName: "Federico Caramelli Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Federico Caramelli | Full-Stack Developer",
    description: "Full-stack developer with strong experience in NestJS, React/TypeScript, AWS, PostgreSQL & microservices. Open to new opportunities",
    creator: "@federicocaramelli",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://seedwalk.net",
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
        className={`${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
