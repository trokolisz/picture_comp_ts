import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { PhotoSubmission } from './PhotoSubmission';

interface ImageGradingCardProps {
  photoKey: string;
  submission: PhotoSubmission;
  currentJudge: string;
  onGrade: (photoKey: string, grade: number) => void;
  onSkip: (photoKey: string) => void;
  onFlag: (photoKey: string) => void;
}

export const ImageGradingCard: React.FC<ImageGradingCardProps> = ({ 
  photoKey,
  submission, 
  currentJudge,
  onGrade, 
  onSkip, 
  onFlag 
}) => {
  const gradeButtons = [1, 2, 3, 4, 5];

  return (
    <Card className="w-full bg-background shadow-lg">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 border-b pb-4">
        <div>
          <CardTitle className="text-xl font-semibold">{submission.title}</CardTitle>
          <p className="text-sm text-muted-foreground">Uploaded by: {submission.uploaded_by}</p>
        </div>
        <Badge variant="secondary" className="px-2 py-1">
          {new Date(submission.timestamp).toLocaleDateString()}
        </Badge>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="relative w-full aspect-video mb-6 rounded-lg overflow-hidden border bg-muted">
          <Image 
            src={submission.url} 
            alt={submission.description} 
            fill 
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">{submission.description}</p>
            <p className="text-xs text-muted-foreground mt-2">
              Location: {submission.latitude.toFixed(4)}°, {submission.longitude.toFixed(4)}°
            </p>
          </div>
          
          {Object.entries(submission.scores).length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Previous Scores</p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(submission.scores).map(([judge, score]) => (
                  <Badge key={judge} variant="secondary" className="px-2 py-1">
                    {judge}: {score}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-6 border-t mt-6 pt-6">
        <div className="w-full">
          <p className="text-sm font-medium text-center mb-4">Grade this submission</p>
          <div className="flex justify-center gap-3">
            {gradeButtons.map((grade) => (
              <Button 
                key={grade} 
                variant={ "secondary"} 
                size="lg"
                onClick={() => onGrade(photoKey, grade)}
                className="w-12 h-12 text-lg font-medium"
              >
                {grade}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button 
            variant="secondary" 
            onClick={() => onSkip(photoKey)} 
            className="w-full"
          >
            Skip for Later
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Flag for Review
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Flag this submission?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will mark the image for review by moderators. This action can be reversed by an administrator.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onFlag(photoKey)}>
                  Flag Submission
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardFooter>
    </Card>
  );
};