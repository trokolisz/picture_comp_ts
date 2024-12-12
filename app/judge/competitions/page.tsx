"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCompetitions } from '@/lib/db';
import { Competition } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

export default function JudgeCompetitionsPage() {
  const [competitions, setCompetitions] = useState<Record<string, Competition>>({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        const comps = await getCompetitions();
        setCompetitions(comps);
      } catch (error) {
        toast({
          title: "Error loading competitions",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, [toast]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Judge Competitions</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {Object.entries(competitions).map(([id, competition]) => {
          let totalPhotos = 0;
          let ratedPhotos = 0;

          if (competition.teams) {
            Object.values(competition.teams).forEach(team => {
              if (team.photos) {
                Object.values(team.photos).forEach(photo => {
                  totalPhotos++;
                  if (photo.scores) ratedPhotos++;
                });
              }
            });
          }

          const progress = totalPhotos > 0 ? (ratedPhotos / totalPhotos) * 100 : 0;

          return (
            <Card key={id}>
              <CardHeader>
                <CardTitle>{competition.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {competition.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {ratedPhotos} of {totalPhotos} photos rated
                  </div>
                  <div className="space-x-2">
                    <Button
                      onClick={() => router.push(`/judge/competitions/${id}/photos`)}
                      disabled={!competition.is_active}
                    >
                      {competition.is_active ? 'Judge Photos' : 'Competition Ended'}
                    </Button>
                    {ratedPhotos > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => router.push(`/judge/competitions/${id}/rated`)}
                      >
                        Review Rated
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}