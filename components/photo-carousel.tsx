import { Photo } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

import { getFeaturedPhotos } from '@/lib/db';
import Image from 'next/image';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RatedPhoto extends Photo {
  competitionTitle: string;
  teamName: string;
}

export async function PhotoCarousel() {
  const photos = await getFeaturedPhotos();
  console.log(photos);  
  if (photos.length === 0) {
    return  <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">No photos found</p>
        </CardContent>
      </Card>
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {photos.map((photo, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="space-y-2">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={photo.photo.url}
                      alt={photo.photo.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">{photo.photo.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {photo.competitionTitle} - {photo.teamName}
                    </p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (photo.photo.scores?.rating || 0)
                              ? "fill-primary text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </CardContent>
    </Card>
  );
}