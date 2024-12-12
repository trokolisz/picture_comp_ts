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
import { Star, Flag } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RatedPhoto {
  id: string;
  teamId: string;
  photo: Photo;
  teamName: string;
}

export default function RatedPhotosPage() {
  const { id } = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratedPhotos, setRatedPhotos] = useState<RatedPhoto[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const loadCompetition = async () => {
      try {
        const competitionData = await getCompetition(id as string);
        setCompetition(competitionData);
        
        // Collect all rated photos
        const photos: RatedPhoto[] = [];
        if (competitionData.teams) {
          Object.entries(competitionData.teams).forEach(([teamId, team]) => {
            if (team.photos) {
              Object.entries(team.photos).forEach(([photoId, photo]) => {
                if (photo.scores) {
                  photos.push({
                    id: photoId,
                    teamId,
                    photo,
                    teamName: team.teamname
                  });
                }
              });
            }
          });
        }
        setRatedPhotos(photos);
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

  const handleUpdateRating = async (rating: number) => {
    const currentPhoto = ratedPhotos[currentPhotoIndex];
    if (!currentPhoto) return;

    try {
      const photoRef = ref(db, `competitions/${id}/teams/${currentPhoto.teamId}/photos/${currentPhoto.id}/scores`);
      await update(photoRef, { rating });

      // Update local state
      const updatedPhotos = [...ratedPhotos];
      updatedPhotos[currentPhotoIndex] = {
        ...currentPhoto,
        photo: {
          ...currentPhoto.photo,
          scores: { ...currentPhoto.photo.scores, rating }
        }
      };
      setRatedPhotos(updatedPhotos);

      toast({
        title: "Success",
        description: "Rating updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update rating",
        variant: "destructive",
      });
    }
  };

  const navigateToPhoto = (index: number) => {
    if (index >= 0 && index < ratedPhotos.length) {
      setCurrentPhotoIndex(index);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!competition || ratedPhotos.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <p>No rated photos found</p>
          <Button className="mt-4" onClick={() => router.push('/judge/competitions')}>
            Back to Competitions
          </Button>
        </CardContent>
      </Card>
    );
  }

  const currentPhoto = ratedPhotos[currentPhotoIndex];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Review Rated Photos - {competition.title}</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => navigateToPhoto(currentPhotoIndex - 1)}
          disabled={currentPhotoIndex === 0}
        >
          Previous
        </Button>
        <Select
          value={currentPhoto.id}
          onValueChange={(value) => {
            const index = ratedPhotos.findIndex(p => p.id === value);
            if (index !== -1) navigateToPhoto(index);
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select photo" />
          </SelectTrigger>
          <SelectContent>
            {ratedPhotos.map((photo, index) => (
              <SelectItem key={photo.id} value={photo.id}>
                Photo {index + 1} - {photo.teamName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => navigateToPhoto(currentPhotoIndex + 1)}
          disabled={currentPhotoIndex === ratedPhotos.length - 1}
        >
          Next
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentPhoto.photo.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <Image
              src={currentPhoto.photo.url}
              alt={currentPhoto.photo.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-4">
            <p className="text-muted-foreground">{currentPhoto.photo.description}</p>
            
            <div className="flex gap-2">
              <Badge variant="outline">
                Location: {currentPhoto.photo.latitude}, {currentPhoto.photo.longitude}
              </Badge>
              <Badge variant="outline">
                Team: {currentPhoto.teamName}
              </Badge>
              <Badge variant="outline">
                Current Rating: {currentPhoto.photo.scores?.rating || 0}
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
                    onClick={() => handleUpdateRating(rating)}
                  >
                    <Star className={`h-6 w-6 ${rating <= (currentPhoto.photo.scores?.rating || 0) ? 'fill-current' : ''}`} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}