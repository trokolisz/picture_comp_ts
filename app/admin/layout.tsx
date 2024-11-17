/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Metadata } from "next";
import "../globals.css";

import { Suspense } from 'react'


import { AppSidebar } from "@/components/admin/app-sidebar"

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

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