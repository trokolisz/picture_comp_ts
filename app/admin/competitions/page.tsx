import { get, ref } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import Link from 'next/link';
import { Competition } from "./columns"
import { DataTable } from "./data-table"
import Head from "@/components/header";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"

async function getCompetitionsFromApi() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/competitions`);
  try {
   
    const data = await response.json();
    
    if (data.success) {
      return data.data;
    } else {
      console.error('Failed to fetch competitions:', data.message || 'Unknown error');
      return [];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Failed to fetch competitions:', error.message || 'Unknown error');
    } else {
      console.error('Failed to fetch competitions:', 'Unknown error');
    }
    return [];
  }
}

export default async function Home() {
  const competitions = await getCompetitionsFromApi();

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Head data={`admin/competitions`} />
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-1">
          <div className="aspect-video rounded-xl bg-muted/50">
            <DataTable data={competitions} />
          </div>

        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>



    </>
  );
}
