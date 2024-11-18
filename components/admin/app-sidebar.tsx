"use client"
import * as React from "react"
import {
  AudioWaveform,
  Scale,
  Users,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Globe,
  SquareTerminal,
  Trophy,
  ArrowBigLeftDash,
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
      icon: Trophy,
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
      icon: Users,
      items: [
        {
          title: "Felhasználók Megtekintése",
          url: "/admin/users",
        },
        
      ],
    },
    {
      title: "Bírók",
      url: "#",
      icon: Scale,
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
      icon: Globe,
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
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
