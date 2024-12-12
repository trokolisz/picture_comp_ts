"use client";

import "../globals.css";

import { Suspense } from "react";
import { useRole } from "@/hooks/use-role";
import { AppSidebar } from "@/components/admin/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthorized = useRole(["admin"]);

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
