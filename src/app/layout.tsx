import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "TrustTrace",
  description: "Community-driven crypto risk intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} font-sans antialiased bg-[#050511] text-slate-200 selection:bg-cyan-500/30`}
        style={{ backgroundColor: '#050511' }} // Failsafe for CSS loading lag
      >
        {children}
      </body>
    </html>
  );
}
