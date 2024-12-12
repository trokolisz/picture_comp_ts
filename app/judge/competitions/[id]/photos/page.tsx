"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCompetition } from '@/lib/db';
import { Competition, Photo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import { ref, update } from 'firebase/database';
import { db } from '@/lib/firebase';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Star, Flag } from 'lucide-react';

export default function JudgePhotosPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentTeamId, setCurrentTeamId] = useState<string | null>(null);
  const [currentPhotoId, setCurrentPhotoId] = useState<string | null>(null);

  useEffect(() => {
    const loadCompetition = async () => {
      try {
        const competitionData = await getCompetition(id as string);
        setCompetition(competitionData);
        
        // Find first unrated photo
        if (competitionData.teams) {
          for (const [teamId, team] of Object.entries(competitionData.teams)) {
            if (team.photos) {
              for (const [photoId, photo] of Object.entries(team.photos)) {
                if (!photo.scores) {
                  setCurrentTeamId(teamId);
                  setCurrentPhotoId(photoId);
                  break;
                }
              }
              if (currentTeamId && currentPhotoId) break;
            }
          }
        }
      } catch (error) {
        toast({
          title: "Error loading competition",
          description: "Could not load competition details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadCompetition();
  }, [id, toast]);

  const handleRate = async (rating: number) => {
    if (!currentTeamId || !currentPhotoId) return;

    try {
      const photoRef = ref(db, `competitions/${id}/teams/${currentTeamId}/photos/${currentPhotoId}/scores`);
      await update(photoRef, { rating });

      toast({
        title: "Success",
        description: "Photo rated successfully",
      });

      // Find next unrated photo
      let foundNext = false;
      if (competition?.teams) {
        let passedCurrent = false;
        for (const [teamId, team] of Object.entries(competition.teams)) {
          if (team.photos) {
            for (const [photoId, photo] of Object.entries(team.photos)) {
              if (passedCurrent && !photo.scores) {
                setCurrentTeamId(teamId);
                setCurrentPhotoId(photoId);
                foundNext = true;
                break;
              }
              if (teamId === currentTeamId && photoId === currentPhotoId) {
                passedCurrent = true;
              }
            }
          }
          if (foundNext) break;
        }
      }

      if (!foundNext) {
        toast({
          title: "All Done!",
          description: "You've rated all photos in this competition",
        });
        router.push('/judge/competitions');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to rate photo",
        variant: "destructive",
      });
    }
  };

  const handleDisqualify = async () => {
    if (!currentTeamId || !currentPhotoId) return;

    try {
      const photoRef = ref(db, `competitions/${id}/teams/${currentTeamId}/photos/${currentPhotoId}`);
      await update(photoRef, { disqualified: true });

      toast({
        title: "Photo Disqualified",
        description: "The photo has been disqualified from the competition",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to disqualify photo",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!competition || !currentTeamId || !currentPhotoId) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p>No photos left to judge</p>
          <Button className="mt-4" onClick={() => router.push('/judge/competitions')}>
            Back to Competitions
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentPhoto = competition.teams[currentTeamId].photos[currentPhotoId];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Judge Photos - {competition.title}</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentPhoto.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={currentPhoto.url}
              alt={currentPhoto.title}
              layout="fill"
              className="object-cover"
            />
            </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">{currentPhoto.description}</p>
            
            <div className="flex gap-2">
              <Badge variant="outline">
                Location: {currentPhoto.latitude}, {currentPhoto.longitude}
              </Badge>
              <Badge variant="outline">
                Team: {competition.teams[currentTeamId].teamname}
              </Badge>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Button
                    key={rating}
                    variant="outline"
                    size="lg"
                    className="w-12 h-12"
                    onClick={() => handleRate(rating)}
                  >
                    
                    <Star className={`h-6 w-6 ${rating <= (currentPhoto.scores?.rating || 0) ? 'fill-current' : ''}`} />
                  </Button>
                ))}
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Flag className="mr-2 h-4 w-4" />
                    Disqualify
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Disqualify Photo</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to disqualify this photo? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDisqualify}>
                      Disqualify
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}