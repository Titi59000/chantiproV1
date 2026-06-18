import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LangueProvider } from "./LangueContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChantPro",
  description: "Gérez vos chantiers simplement",
  manifest: "/manifest.json",
  themeColor: "#16A34A",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "ChantPro",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LangueProvider>
          {children}
        </LangueProvider>
      </body>
    </html>
  );
}