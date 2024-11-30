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

interface PhotoStatistics {
  totalPhotosUploaded: number;
  totalPhotosUploadedInLast7Days: number;
}

async function fetchPhotoStatistics(): Promise<PhotoStatistics> {
  const competitionsRef = ref(database, 'competitions');
  const snapshot = await get(competitionsRef);

  if (!snapshot.exists()) {
    console.log('No competitions available');
    return { totalPhotosUploaded: 0, totalPhotosUploadedInLast7Days: 0 };
  }

  const data: Record<string, Competition> = snapshot.val();
  let totalPhotosUploaded = 0;
  let totalPhotosUploadedInLast7Days = 0;

  const today = new Date();
  const past7Days = new Date(today.setDate(today.getDate() - 7));

  // Iterate through competitions
  for (const competitionKey in data) {
    const competition = data[competitionKey];

    // Iterate through teams
    if (competition.teams) {
      for (const teamKey in competition.teams) {
        const team = competition.teams[teamKey];

        // Iterate through photos
        if (team.photos) {
          for (const photoKey in team.photos) {
            const photo = team.photos[photoKey];
            const uploadTimestamp = new Date(photo.timestamp);

            totalPhotosUploaded++;

            if (uploadTimestamp >= past7Days) {
              totalPhotosUploadedInLast7Days++;
            }
          }
        }
      }
    }
  }

  return { totalPhotosUploaded, totalPhotosUploadedInLast7Days };
}

export async function GET() {
  try {
    const statistics = await fetchPhotoStatistics();
    return NextResponse.json(
      { success: true, data: statistics },
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
