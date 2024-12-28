import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sfProDisplay = localFont({
  src: [
    {
      path: "./fonts/SFPRODISPLAYBLACKITALIC.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "./fonts/SFProDisplay-Semibold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "kiwi",
  description: "Kiwi-AES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sfProDisplay.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
