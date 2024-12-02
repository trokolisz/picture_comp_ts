/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "../globals.css";
import { Inter } from 'next/font/google'

import { Suspense } from 'react'


import { AppSidebar } from "@/components/judge/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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

      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>   
          <Suspense fallback={<div>Loading...</div>}>
            {children}
          </Suspense>
       
        </SidebarInset>
        </SidebarProvider>
  )
}