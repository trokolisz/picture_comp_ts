import { notFound } from 'next/navigation';
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import Head from "@/components/header";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
interface Competition {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  judges?: string[];
  teams?: object;
  num_judges?: number;
  num_teams?: number;
}



interface Props {
  params: Promise<{ competition: string }>
}


const CompetitionPage = async ({ params }: Props) => {
  const { competition } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/competitions/${competition}`);
  const comp = await response.json();

  if (!response.ok) {
    notFound();
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 w-full">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Head data={`admin/competitions/${competition}`} />
        </div>
      </header>
      <div className="container mx-auto p-4">
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 ">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3 ">
            <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80]">
              Doboz 1
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80]" >
              Doboz 2
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 hover:bg-[#52be80]" >
              Doboz 3
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </div>
    </>

  );
};

export default CompetitionPage;