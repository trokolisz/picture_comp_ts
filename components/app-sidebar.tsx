"use client"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/admin/nav-main"

import { NavUser } from "@/components/admin/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "admin",
    role: "admin",
    avatar: "/images/avatars/R.jpg", // Updated path
  },
  navMain: [
    {
      title: "Versenyek",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Versenyek Megtekintése",
          url: "#",
        },
        {
          title: "Archivált Versenyek",
          url: "#",
        },
        {
          title: "Verseny létrehozása",
          url: "#",
        },
      ],
    },
    {
      title: "Felhasználók",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Felhasználók Megtekintése",
          url: "#",
        },
        
      ],
    },
    {
      title: "Bírók",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Bírók Megtekintése",
          url: "#",
        },
        {
          title: "Bíró Jelentkezések",
          url: "#",
        }
      ],
    },
    {
      title: "Publikus oldal",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Szerkeszés",
          url: "#",
        },
        {
          title: "Verseny Hozzáadás",
          url: "#",
        },
        
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="max-w-full">
      <SidebarHeader className="max-w-full">
      <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

      </SidebarContent>
      <SidebarFooter>
       
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
