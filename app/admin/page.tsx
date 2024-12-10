"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Gavel, Trophy, Settings } from "lucide-react"
import { useRole } from '@/hooks/use-role';

import Head from "@/components/header";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
    // Kommentet töröld ki!!!
   // Kommentet töröld ki!!!
  //useRole('admin');
  
  const [isUsersHovered, setIsUsersHovered] = useState(false)
  const [isJudgesHovered, setIsJudgesHovered] = useState(false)
  const [isCompetitionsHovered, setIsCompetitionsHovered] = useState(false)
  const [isSettingsHovered, setIsSettingsHovered] = useState(false)

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Head data="admin" />
        </div>
      </header>

      <div className="flex flex-col justify-center items-center py-4">
        <h1 className="text-3xl font-bold font-montserrat">Admin Dashboard</h1>
        <br/>
        <h1 className="text-2xl font-semibold">Welcome Admin!</h1>
      </div>

      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-4"> 

          {/* Users Card */}
          <Link href="/admin/users">
            <div
              onMouseEnter={() => setIsUsersHovered(true)}
              onMouseLeave={() => setIsUsersHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
                ${isUsersHovered ? "dark:bg-primary bg-primary/80 dark:text-primary-foreground text-primary-foreground scale-105 shadow-lg" : "dark:bg-muted bg-muted/80 dark:text-muted-foreground text-muted-foreground shadow-md"}`}
                >
              <Users className="text-4xl mb- " />
              <h3 className="text-xl font-semibold ">Manage Users</h3>
              <p className="text-sm">Add, edit, or remove users</p>
              <Button variant="outline" className="mt-4 text-black">Go</Button>
            </div>
          </Link>

          {/* Judges Card */}
          <Link href="/admin/judges">
            <div
              onMouseEnter={() => setIsJudgesHovered(true)}
              onMouseLeave={() => setIsJudgesHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
              ${isJudgesHovered ?  "dark:bg-primary bg-primary/80 dark:text-primary-foreground text-primary-foreground scale-105 shadow-lg" : "dark:bg-muted bg-muted/80 dark:text-muted-foreground text-muted-foreground shadow-md"}`}
            >
              <Gavel className="text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Manage Judges</h3>
              <p className="text-sm ">Add, edit, or remove judges</p>
              <Button variant="outline" className="mt-4 text-black">Go</Button>
            </div>
          </Link>

          {/* Competitions Card */}
          <Link href="/admin/competitions">
            <div
              onMouseEnter={() => setIsCompetitionsHovered(true)}
              onMouseLeave={() => setIsCompetitionsHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
              ${isCompetitionsHovered ? "dark:bg-primary bg-primary/80 dark:text-primary-foreground text-primary-foreground scale-105 shadow-lg" : "dark:bg-muted bg-muted/80 dark:text-muted-foreground text-muted-foreground shadow-md"}`}
            >
              <Trophy className="text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Manage Competitions</h3>
              <p className="text-sm ">Create and manage competitions</p>
              <Button variant="outline" className="mt-4 text-black">Go</Button>
            </div>
          </Link>

          {/* Settings Card */}
          <Link href="/admin/settings">
            <div
              onMouseEnter={() => setIsSettingsHovered(true)}
              onMouseLeave={() => setIsSettingsHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
              ${isSettingsHovered ? "dark:bg-primary bg-primary/80 dark:text-primary-foreground text-primary-foreground scale-105 shadow-lg" : "dark:bg-muted bg-muted/80 dark:text-muted-foreground text-muted-foreground shadow-md"}`}
            >
              <Settings className="text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Settings</h3>
              <p className="text-sm ">Configure application settings</p>
              <Button variant="outline" className="mt-4 text-black">Go</Button>
            </div>
          </Link>

        </div>
      </div>
    </>
  )
}
