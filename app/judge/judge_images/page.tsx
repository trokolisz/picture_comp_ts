'use client';

import React, { useState, useEffect } from 'react';
import { PhotoSubmission, PhotoSubmissions } from './PhotoSubmission';
import { ImageGradingCard } from './ImageGradingCard';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Head from "@/components/header";
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function JudgePage() {
  const [photos, setPhotos] = useState<PhotoSubmissions>({});
  const [currentJudge, setCurrentJudge] = useState('');
  const [photoKeys, setPhotoKeys] = useState<string[]>([]);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [gradedPhotos, setGradedPhotos] = useState<{[key: string]: { grade: number; judge: string; timestamp: string } }>({});
  const [skippedPhotos, setSkippedPhotos] = useState<string[]>([]);
  const [flaggedPhotos, setFlaggedPhotos] = useState<string[]>([]);

  // Mock fetch function - replace with actual API call
  const fetchPhotos = async () => {
    // Simulated data fetch - replace with actual API call
    
    const mockPhotos: PhotoSubmissions = {
      "photo_1": {
        name: "photo_1",
        description: "Work down future food Democrat.",
        url: "https://picsum.photos/485/358",
        latitude: 74.5713725,
        longitude: 154.657547,
        scores: {},
        timestamp: "2024-11-26T19:15:20.204269",
        title: "even",
        uploaded_by: "isims"
      },
      "photo_2": {
        name: "photo_2",
        description: "Beautiful sunset over the mountains.",
        url: "https://picsum.photos/485/359",
        latitude: 34.052235,
        longitude: -118.243683,
        scores: {},
        timestamp: "2024-11-27T19:15:20.204269",
        title: "sunset",
        uploaded_by: "john_doe"
      },
      "photo_3": {
        name: "photo_3",
        description: "A bustling city street at night.",
        url: "https://picsum.photos/485/360",
        latitude: 40.712776,
        longitude: -74.005974,
        scores: {},
        timestamp: "2024-11-28T19:15:20.204269",
        title: "city",
        uploaded_by: "jane_doe"
      },
      "photo_4": {
        name: "photo_4",
        description: "A serene beach with crystal clear water.",
        url: "https://picsum.photos/485/361",
        latitude: 25.761681,
        longitude: -80.191788,
        scores: {},
        timestamp: "2024-11-29T19:15:20.204269",
        title: "beach",
        uploaded_by: "alice"
      },
      "photo_5": {
        name: "photo_5",
        description: "A dense forest with tall trees.",
        url: "https://picsum.photos/485/362",
        latitude: 48.856613,
        longitude: 2.352222,
        scores: {},
        timestamp: "2024-11-30T19:15:20.204269",
        title: "forest",
        uploaded_by: "bob"
      }
    };
    setPhotos(mockPhotos);
    setPhotoKeys(Object.keys(mockPhotos));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleGrade = (photoKey: string, grade: number) => {
    setGradedPhotos(prev => ({ 
        ...prev, 
        [photoKey]: {
          grade,
          judge: currentJudge,
          timestamp: new Date().toISOString()
        }
      }));
    moveToNextPhoto();
  };

  const handleSkip = (photoKey: string) => {
    setSkippedPhotos(prev => [...prev, photoKey]);
    moveToNextPhoto();
  };

  const handleFlag = (photoKey: string) => {
    setFlaggedPhotos(prev => [...prev, photoKey]);
    moveToNextPhoto();
  };

  const moveToNextPhoto = () => {
    const nextIndex = currentPhotoIndex + 1;
    if (nextIndex < photoKeys.length) {
      setCurrentPhotoIndex(nextIndex);
    }
  };

  const resetGrading = () => {
    setCurrentPhotoIndex(0);
    setGradedPhotos({});
    setSkippedPhotos([]);
    setFlaggedPhotos([]);
  };

  

  if (photoKeys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-semibold mb-4">No more photos to grade</h1>
        <Button 
          onClick={resetGrading}
          className="px-6 py-2"
        >
          Reset Grading
        </Button>
      </div>
    );
  }

  const currentPhotoKey = photoKeys[currentPhotoIndex];
  const currentPhoto = photos[currentPhotoKey];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 shrink-0 items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Head data="judge" />
        </div>
      </header>
 
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Image Grading</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Progress:</span>
                  <span className="text-sm text-muted-foreground">
                    {currentPhotoIndex + 1} / {photoKeys.length}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">Graded</p>
                <p className="text-2xl font-semibold">{Object.keys(gradedPhotos).length}</p>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">Skipped</p>
                <p className="text-2xl font-semibold">{skippedPhotos.length}</p>
              </div>
              <div className="bg-background rounded-lg p-4 shadow-sm">
                <p className="text-sm text-muted-foreground">Flagged</p>
                <p className="text-2xl font-semibold">{flaggedPhotos.length}</p>
              </div>
            </div>
          </div>

          <ImageGradingCard 
            photoKey={currentPhotoKey}
            submission={currentPhoto} 
            currentJudge={currentJudge}
            onGrade={handleGrade}
            onSkip={handleSkip}
            onFlag={handleFlag}
          />
        </div>
      </main>
    </div>
  );
}