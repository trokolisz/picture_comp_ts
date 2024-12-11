import { Overview } from "@/components/admin/Overview";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminHeader from "./AdminHeader";
import { getCompetitions, getUsers} from '@/lib/db';
import { Competition, Team } from '@/lib/types';

import { StatsCards } from '@/components/StatsCards';
import { TopPerformingTeams } from '@/components/TopPerformingTeams';
import { UserDistribution } from '@/components/UserDistribution';
import { DashboardHeader } from '@/components/DashboardHeader';

export default async function Page() {
  const competitions = await getCompetitions();
  const users = await getUsers();

  const stats = {
    activeCompetitions: Object.values(competitions).filter((comp: Competition) => comp.is_active).length,
    totalTeams: Object.values(competitions).reduce((acc: number, comp: Competition) => acc + (comp.teams ? Object.keys(comp.teams).length : 0), 0),
    totalPhotos: Object.values(competitions).reduce((acc: number, comp: Competition) => acc + (comp.teams ? Object.values(comp.teams).reduce((teamAcc: number, team: Team) => teamAcc + (team.photos ? Object.keys(team.photos).length : 0), 0) : 0), 0),
    numberOfUsers: users ? Object.keys(users).length : 0
  }
  
  return (
    <>
    <div className="space-y-8">

      <AdminHeader />
      <DashboardHeader key="header" lastUpdated={new Date().toLocaleString()} />
      
      <StatsCards key="stats" stats={stats} />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card key="competition-activity" className="col-span-4">
          <CardHeader>
            <CardTitle>Competition Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview />
          </CardContent>
        </Card>
        <Card key="recent-activity" className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity key={JSON.stringify(competitions)} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TopPerformingTeams key="top-teams" competitions={competitions} />
        <UserDistribution key={JSON.stringify(users)} users={users} />
      </div>
    </div>

      
    </>
  )
}
