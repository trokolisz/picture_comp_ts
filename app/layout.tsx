/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat } from 'next/font/google'

import { Suspense } from 'react'

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-montserrat" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });


export const metadata: Metadata = {
  title: "Picture Competition",
  description: "Picture Competition",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="bg-blue-00 font-sans">
        <Suspense fallback={
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
            <div className="loader"></div>
          </div>
        }>
          {children}
        </Suspense>
      </body>
    </html>
  )
}