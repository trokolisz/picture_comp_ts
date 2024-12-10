import { NextRequest, NextResponse } from 'next/server';
import { get, ref } from 'firebase/database';
import { database } from '../../../FirebaseConfig';

interface Photo {
  latitude: number;
  longitude: number;
  url: string;
  title: string;
  description: string;
}

interface Team {
  photos?: Record<string, Photo>;
}

interface Competition {
  teams?: Record<string, Team>;
}

async function fetchLocations(): Promise<Photo[]> {
  const competitionsRef = ref(database, 'competitions');
  const snapshot = await get(competitionsRef);
  if (snapshot.exists()) {
    const data = snapshot.val() as Record<string, Competition>;

    const locations: Photo[] = [];

    Object.values(data).forEach((competition) => {
      if (competition.teams) {
        Object.values(competition.teams).forEach((team) => {
          if (team.photos) {
            Object.values(team.photos).forEach((photo) => {
              if (photo.latitude && photo.longitude) {
                locations.push({
                  latitude: photo.latitude,
                  longitude: photo.longitude,
                  url: photo.url,
                  title: photo.title,
                  description: photo.description
                });
              }
            });
          }
        });
      }
    });

    return locations;
  } else {
    console.log('No locations available');
    return [];
  }
}

export async function GET() {
  try {
    const locations = await fetchLocations();
    return NextResponse.json({ success: true, data: locations }, { status: 200 });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch locations' }, { status: 500 });
  }
}
