import { NextResponse } from 'next/server';
import { get, ref } from 'firebase/database';
import { database } from '@/FirebaseConfig';

interface Photo {
  timestamp: string;
}

interface Team {
  photos?: Record<string, Photo>;
}

interface Competition {
  teams?: Record<string, Team>;
}

interface DailyPhotoStatistics {
  [date: string]: number; 
}

interface PhotoStatistics {
  totalPhotosUploaded: number;
  totalPhotosUploadedInLast7Days: number;
  dailyPhotoUploads: DailyPhotoStatistics;
}

async function fetchPhotoStatistics(): Promise<PhotoStatistics> {
  const competitionsRef = ref(database, 'competitions');
  const snapshot = await get(competitionsRef);

  if (!snapshot.exists()) {
    console.log('No competitions available');
    return {
      totalPhotosUploaded: 0,
      totalPhotosUploadedInLast7Days: 0,
      dailyPhotoUploads: {},
    };
  }

  const data: Record<string, Competition> = snapshot.val();
  let totalPhotosUploaded = 0;
  let totalPhotosUploadedInLast7Days = 0;

  const today = new Date();
  const past7Days = new Date(today.setDate(today.getDate() - 7));
  const dailyPhotoUploads: DailyPhotoStatistics = {};

  console.log('Fetched competition data:', data);

  for (const competitionKey in data) {
    const competition = data[competitionKey];

    if (competition.teams) {
      for (const teamKey in competition.teams) {
        const team: Team = competition.teams[teamKey];

        if (team.photos) {
          for (const photoKey in team.photos) {
            const photo: Photo = team.photos[photoKey];
            const uploadTimestamp: Date = new Date(photo.timestamp);

            console.log(`Processing photo from team ${teamKey} with timestamp: ${photo.timestamp}`);

            if (isNaN(uploadTimestamp.getTime())) {
              console.error('Invalid timestamp:', photo.timestamp);
              continue; 
            }

            totalPhotosUploaded++;

            if (uploadTimestamp >= past7Days) {
              totalPhotosUploadedInLast7Days++;
            }

            const uploadDate = uploadTimestamp.toISOString().split('T')[0];
            dailyPhotoUploads[uploadDate] =
              (dailyPhotoUploads[uploadDate] || 0) + 1;
          }
        }
      }
    }
  }

  console.log('Total Photos Uploaded:', totalPhotosUploaded);
  console.log('Total Photos Uploaded in Last 7 Days:', totalPhotosUploadedInLast7Days);
  console.log('Daily Photo Uploads:', dailyPhotoUploads);

  return {
    totalPhotosUploaded,
    totalPhotosUploadedInLast7Days,
    dailyPhotoUploads,
  };
}

export async function GET() {
  try {
    const statistics = await fetchPhotoStatistics();
    return NextResponse.json(
      { success: true, data: statistics || [] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching photo statistics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch photo statistics' },
      { status: 500 }
    );
  }
}
