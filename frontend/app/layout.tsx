import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CropGuard | Crop Health Intelligence & Advisory Platform",
  description: "Detect early. Act wisely. Protect every crop.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F7FAF7] text-[#172017]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
