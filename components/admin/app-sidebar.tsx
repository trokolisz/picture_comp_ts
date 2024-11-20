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
          title: "Összes verseny",
          url: "/admin/competitions",
        },
        {
          title: "Jelenleg futó versenyek",
          url: "/admin/currently_running_competitions",
        },
        {
          title: "Archivált versenyek",
          url: "/admin/archived_competitions",
        },
        {
          title: "Verseny létrehozása",
          url: "/admin/make_competitions",
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
          url: "/admin/judges",
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
