"use client";

import type { Metadata } from "next";
import "../globals.css";
import { Inter } from "next/font/google";

import { Suspense } from "react";

import { useRole } from "@/hooks/use-role";
import { AppSidebar } from "@/components/judge/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthorized = useRole(["judge"]); 

  if (!isAuthorized) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <h1 className="text-xl font-bold">Access Denied</h1>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Suspense
          fallback={
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <div className="loader"></div>
            </div>
          }
        >
          {children}
        </Suspense>
      </SidebarInset>
    </SidebarProvider>
  );
}
