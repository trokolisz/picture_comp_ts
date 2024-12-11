import type { Metadata } from "next";
import { Inter, Montserrat } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import NavMenu from "@/components/navbar"; 

// const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-montserrat" });
// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Picture Competition",
  description: "Picture Competition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen"> 
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
