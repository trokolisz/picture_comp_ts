
import { NextRequest, NextResponse } from 'next/server';
import { get, ref, set } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import schema from "./schema"; 

interface Location {
  description: string;
  latitude: number;
  longitude: number;
  scores: { [key: string]: number };
  timestamp: string;
  title: string;
  uploaded_by: string;
  url: string;
}


async function fetchLocations(): Promise<Location[]> {
  const locationsRef = ref(database, 'locations');
  const snapshot = await get(locationsRef);
  let locationsArray: Location[] = [];

  if (snapshot.exists()) {
    locationsArray = Object.entries(snapshot.val()).map(([id, data]) => {
      const locationData = data as Location;
      return { ...locationData };
    });
  }

  return locationsArray;
}


async function createLocation(location: Location): Promise<void> {
  const locationRef = ref(database, `locations/${location.title}`);
  await set(locationRef, location);
}


async function locationExists(title: string): Promise<boolean> {
  const locationRef = ref(database, `locations/${title}`);
  const snapshot = await get(locationRef);
  return snapshot.exists();
}

export async function GET() {
  try {
    const locations = await fetchLocations();
    return NextResponse.json({ success: true, data: locations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch locations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  let body;
  try {
    if (!request.body) {
      return NextResponse.json({ success: false, message: 'Request body is null' }, { status: 400 });
    }
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
  }

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ success: false, message: validation.error.errors }, { status: 400 });
  }

  const title = validation.data.title;
  if (await locationExists(title)) {
    return NextResponse.json({ success: false, message: 'Location with this title already exists' }, { status: 400 });
  }

  const location: Location = {
    description: validation.data.description,
    latitude: validation.data.latitude,
    longitude: validation.data.longitude,
    scores: validation.data.scores || {},
    timestamp: new Date().toISOString(),
    title: validation.data.title,
    uploaded_by: validation.data.uploaded_by,
    url: validation.data.url,
  };

  try {
    await createLocation(location);
    return NextResponse.json({ success: true, message: 'Location created successfully' });
  } catch (error) {
    console.error('Error creating location:', error);
    return NextResponse.json({ success: false, message: 'Failed to create location' }, { status: 500 });
  }
}
