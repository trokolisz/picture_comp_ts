/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "./globals.css";
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
    <html data-theme="winter" lang="en">
      <body className={inter.className}>
        <NavBar />
        <main className='p-5'>
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
        </main>

      </body>
    </html>
  )
}