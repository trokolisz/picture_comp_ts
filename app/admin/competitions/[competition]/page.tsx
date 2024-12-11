import { notFound } from 'next/navigation';
import React from 'react';
import Head from "@/components/header";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { getCompetition, getUsers } from '@/lib/db';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import CompetitionEditForm from '@/components/admin/CompetitionEditForm';

interface Props {
  params: Promise<{ competition: string }>
}

const CompetitionPage = async ({ params }: Props) => {
  const { competition } = await params;

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/competitions/${competition}`);
  const comp = await response.json();
  const this_competition = await getCompetition(competition);
  const users = await getUsers();
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
    <Suspense fallback={<LoadingSpinner />}>
      <CompetitionEditForm initialCompetition={this_competition} id={competition} users={users} />
    </Suspense>
    </>
  );
};

export default CompetitionPage;