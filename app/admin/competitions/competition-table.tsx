'use client'
import { Competition } from '@/lib/types';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { format } from 'date-fns';
import { Suspense } from 'react';
import AdminHeader from './AdminHeader';

function CompetitionTableContent({
  initialCompetitions,
}: {
  initialCompetitions: Record<string, Competition>;
}) {
  return (
    <div className="space-y-6">
      
      <AdminHeader />
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Competitions</h1>
        <Link href={"/admin/make_competitions"}>
          <Button>Create Competition</Button>
        </Link>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Teams</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(initialCompetitions).map(([id, competition]) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{competition.title}</TableCell>
              <TableCell>
                {format(new Date(competition.start_date), 'PPP')}
              </TableCell>
              <TableCell>
                {format(new Date(competition.end_date), 'PPP')}
              </TableCell>
              <TableCell>
                <Badge
                  variant={competition.is_active ? 'default' : 'secondary'}
                >
                  {competition.is_active ? 'Active' : 'Inactive'}
                </Badge>
              </TableCell>
              <TableCell>
                {competition.teams ? Object.keys(competition.teams).length : 0}{' '}
                teams
              </TableCell>
              <TableCell>
                <Link href={"/admin/competitions/"+competition.name}>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
                </Link>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function CompetitionTable({
  initialCompetitions,
}: {
  initialCompetitions: Record<string, Competition>;
}) {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      }
    >
      <CompetitionTableContent initialCompetitions={initialCompetitions} />
    </Suspense>
  );
}
