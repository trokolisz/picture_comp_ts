import { NextResponse } from 'next/server';
import { get, ref } from 'firebase/database';
import { database } from '@/FirebaseConfig';

interface Photo {
  latitude: number;
  longitude: number;
  url: string;
  title: string;
  description: string;
  competition: string;
  team: string;
}

interface Team {
  name: string;
  photos?: Record<string, Photo>;
}

interface Competition {
  name: string;
  teams?: Record<string, Team>;
}

async function fetchLocations(): Promise<{ locations: Photo[], competitions: string[], teams: string[] }> {
  const competitionsRef = ref(database, 'competitions');
  const snapshot = await get(competitionsRef);

  if (!snapshot.exists()) {
    console.log('No competitions available');
    return { locations: [], competitions: [], teams: [] };
  }

  const data: Record<string, Competition> = snapshot.val();
  const locations: Photo[] = [];
  const competitionNames: string[] = [];
  const teamNames: string[] = [];

  console.log('Fetched competition data:', data);

  for (const competitionKey in data) {
    const competition = data[competitionKey];
    competitionNames.push(competition.name);

    if (competition.teams) {
      for (const teamKey in competition.teams) {
        const team: Team = competition.teams[teamKey];
        teamNames.push(team.name);

        if (team.photos) {
          for (const photoKey in team.photos) {
            const photo: Photo = team.photos[photoKey];
            
            if (photo.latitude !== undefined && photo.longitude !== undefined) {
              locations.push({
                latitude: photo.latitude,
                longitude: photo.longitude,
                url: photo.url || '',
                title: photo.title || 'N/A',
                description: photo.description || 'Nincs leírás',
                competition: competition.name,
                team: team.name,
              });
            } else {
              console.warn(`Invalid coordinates for photo: ${photo.title}`);
            }
          }
        }
      }
    }
  }

  console.log('Locations:', locations);
  console.log('Competitions:', competitionNames);
  console.log('Teams:', teamNames);

  return { locations, competitions: competitionNames, teams: teamNames };
}

export async function GET() {
  try {
    const { locations, competitions, teams } = await fetchLocations();
    return NextResponse.json(
      { success: true, data: { locations, competitions, teams } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
