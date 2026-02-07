import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import LenisProvider from "./lenis-provider";

export const metadata = {
  title: {
    default: "Jeremy Su's Portfolio",
    template: "%s | Jeremy Su's Portfolio",
  },
  description:
    "An interactive personal portfolio with a playful investigation theme.",
  openGraph: {
    title: "Jeremy Su's Portfolio",
    description:
      "An interactive personal portfolio with a playful investigation theme.",
    images: [
      {
        url: "/mona_lisa.webp",
        width: 1200,
        height: 630,
        alt: "Jeremy Su's Portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeremy Su's Portfolio",
    description:
      "An interactive personal portfolio with a playful investigation theme.",
    images: ["/mona_lisa.webp"],
  },
};

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${newsreader.variable} antialiased`}
        suppressHydrationWarning
      >
        <LenisProvider>{children}</LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
