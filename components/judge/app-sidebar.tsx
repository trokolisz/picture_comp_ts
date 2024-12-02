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
    name: "judge",
    role: "judge",
    avatar: "/images/avatars/R.jpg",
  },
  navMain: [
    {
      title: "Feltöltések",
      url: "/judge/judge_images",
      // Kell új logo
      icon: Globe,
      items: [
        {
          title: "Képek bírálása",
          url: "/judge/judge_images",
        },
      ],
    },
    // Csak minta -> kell saját / nem is kell mind?
    {
      title: "Statisztika",
      url: "/judge",
      // Kell új logo
      icon: Trophy,
      items: [
        {
          title: "bla",
          url: "/judge/",
        },
      ],
    },
    {
      title: "Térkép",
      url: "/judge",
      // Kell új logo
      icon: Trophy,
      items: [
        {
          title: "bla",
          url: "/judge",
        },
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
