"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
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
} from "lucide-react";

import { NavMain } from "@/components/admin/nav-main";
import { NavUser } from "@/components/admin/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "admin",
    role: "admin",
    avatar: "/images/avatars/R.jpg",
  },
  navMain: [
    {
      title: "Versenyek",
      url: "/admin/competitions",
      icon: Trophy,
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
      url: "/admin/users",
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
      url: "/admin/judges",
      icon: Scale,
      items: [
        {
          title: "Bírók Megtekintése",
          url: "/admin/judges",
        },
        {
          title: "Bíró Jelentkezések",
          url: "/admin/judge_applications",
        },
      ],
    },
        {
      title: "Publikus oldal",
      url: "/admin/public",
      icon: Globe,
      items: [
        {
          title: "Szerkeszés",
          url: "/admin/public/edit",
        },
        {
          title: "Verseny Hozzáadás",
          url: "/admin/public/add_competition",
        },
      ],
    },
    {
      title: "Térkép",
      url: "/admin/map",
      /*Kell új logo talán Map-pin*/     
      icon: Globe, 
      items: [
        {
          title: "Térkép",
          url: "/admin/map",
        }
      ],
    },
    {
      title: "Statisztika",
      url: "/admin/stat",
      /*Kell új logo */     
      icon: Globe,       
      items: [
        {
          title: "Statisztika",
          url: "/admin/stat",
        }
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const isActive = (menuUrl: string, subItems: { url: string }[] = []) => {
    return (
      pathname.startsWith(menuUrl) ||
      subItems.some((subItem) => pathname.startsWith(subItem.url))
    );
  };

  const modifiedNavMain = data.navMain.map((menu) => ({
    ...menu,
    isActive: isActive(menu.url, menu.items),
    items: menu.items.map((item) => ({
      ...item,
      isActive: pathname.startsWith(item.url),
    })),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={modifiedNavMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
