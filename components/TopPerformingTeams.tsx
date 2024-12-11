'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from 'lucide-react';
import { Competition } from "@/lib/types";

interface TopPerformingTeamsProps {
  competitions: Record<string, Competition>;
}

export function TopPerformingTeams({ competitions }: TopPerformingTeamsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performing Teams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Object.values(competitions)
            .filter(comp => comp.teams)
            .flatMap(comp => 
              Object.entries(comp.teams)
                .map(([id, team]) => ({
                  ...team,
                  photoCount: team.photos ? Object.keys(team.photos).length : 0,
                  competitionName: comp.title
                }))
            )
            .sort((a, b) => b.photoCount - a.photoCount)
            .slice(0, 5)
            .map((team, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <div className="font-medium">{team.teamname}</div>
                    <div className="text-sm text-muted-foreground">
                      {team.competitionName}
                    </div>
                  </div>
                </div>
                <div className="text-sm">
                  {team.photoCount} photos
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
} 