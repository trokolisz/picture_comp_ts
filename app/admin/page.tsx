"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Gavel, Trophy, Settings } from "lucide-react"


import Head from "@/components/header";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function Page() {
  const [isUsersHovered, setIsUsersHovered] = useState(false)
  const [isJudgesHovered, setIsJudgesHovered] = useState(false)
  const [isCompetitionsHovered, setIsCompetitionsHovered] = useState(false)
  const [isSettingsHovered, setIsSettingsHovered] = useState(false)

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Head data="Admin" />
        </div>
      </header>

      <div className="flex justify-center items-center py-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="flex flex-col justify-center items-center min-h-screen p-4 gap-4">
        <div className="grid auto-rows-min gap-4 sm:grid-cols-2 md:grid-cols-4"> 

          {/* Users Card */}
          <Link href="/admin/users">
            <div
              onMouseEnter={() => setIsUsersHovered(true)}
              onMouseLeave={() => setIsUsersHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
              ${isUsersHovered ? "bg-[#52be80] scale-105" : "bg-muted/50"}`}
            >
              <Users className="text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Manage Users</h3>
              <p className="text-sm text-muted-foreground">Add, edit, or remove users</p>
              <Button variant="outline" className="mt-4">Go</Button>
            </div>
          </Link>

          {/* Judges Card */}
          <Link href="/admin/judges">
            <div
              onMouseEnter={() => setIsJudgesHovered(true)}
              onMouseLeave={() => setIsJudgesHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
              ${isJudgesHovered ? "bg-[#52be80] scale-105" : "bg-muted/50"}`}
            >
              <Gavel className="text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Manage Judges</h3>
              <p className="text-sm text-muted-foreground">Add, edit, or remove judges</p>
              <Button variant="outline" className="mt-4">Go</Button>
            </div>
          </Link>

          {/* Competitions Card */}
          <Link href="/admin/competitions">
            <div
              onMouseEnter={() => setIsCompetitionsHovered(true)}
              onMouseLeave={() => setIsCompetitionsHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
              ${isCompetitionsHovered ? "bg-[#52be80] scale-105" : "bg-muted/50"}`}
            >
              <Trophy className="text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Manage Competitions</h3>
              <p className="text-sm text-muted-foreground">Create and manage competitions</p>
              <Button variant="outline" className="mt-4">Go</Button>
            </div>
          </Link>

          {/* Settings Card */}
          <Link href="/admin/settings">
            <div
              onMouseEnter={() => setIsSettingsHovered(true)}
              onMouseLeave={() => setIsSettingsHovered(false)}
              className={`aspect-video rounded-xl flex flex-col items-center justify-center p-4 text-center transition-all transform 
              ${isSettingsHovered ? "bg-[#52be80] scale-105" : "bg-muted/50"}`}
            >
              <Settings className="text-4xl mb-2" />
              <h3 className="text-xl font-semibold">Settings</h3>
              <p className="text-sm text-muted-foreground">Configure application settings</p>
              <Button variant="outline" className="mt-4">Go</Button>
            </div>
          </Link>

        </div>
      </div>
    </>
  )
}
