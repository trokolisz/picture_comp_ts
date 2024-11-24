import { NextRequest, NextResponse } from 'next/server';
import { get, ref, set, remove } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import schema from './schema';  // Ha van validációs sémád

// Lokációs típus
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
  const locationsRef = ref(database, 'locations'); // Lokációk közvetlen elérése
  const snapshot = await get(locationsRef);
  let locationsArray: Location[] = [];

  if (snapshot.exists()) {
    const data = snapshot.val() as Record<string, Location>; // Explicit type casting here

    locationsArray = Object.entries(data).map(([title, data]) => ({
      title,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      scores: data.scores,
      timestamp: data.timestamp,
      uploaded_by: data.uploaded_by,
      url: data.url,
    }));
  }

  return locationsArray;
}

// Lokáció létrehozása
async function createLocation(location: Location): Promise<void> {
  const locationRef = ref(database, `locations/${location.title}`);
  await set(locationRef, location);
}

// Lokáció létezése
async function locationExists(title: string): Promise<boolean> {
  const locationRef = ref(database, `locations/${title}`);
  const snapshot = await get(locationRef);
  return snapshot.exists();
}

// `GET` kérés
export async function GET() {
  try {
    const locations = await fetchLocations();
    return NextResponse.json({ success: true, data: locations });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to fetch locations' }, { status: 500 });
  }
}

// `POST` kérés
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

  // Lokációs validáció
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
    return NextResponse.json({ success: false, message: 'Failed to create location' }, { status: 500 });
  }
}

// `DELETE` kérés
export async function DELETE(request: NextRequest, { params }: { params: { title: string } }) {
  const { title } = params;

  if (!title) {
    return NextResponse.json({ success: false, message: 'Location title is required' }, { status: 400 });
  }

  try {
    const locationRef = ref(database, `locations/${title}`);
    await remove(locationRef);

    return NextResponse.json({ success: true, message: `Location ${title} deleted successfully` });
  } catch (error) {
    console.error('Error deleting location:', error);
    return NextResponse.json({ success: false, message: 'Failed to delete location' }, { status: 500 });
  }
}
