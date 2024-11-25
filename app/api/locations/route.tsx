import { NextRequest, NextResponse } from 'next/server';
import { get, ref, set, remove } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import schema from './schema';

interface Photo {
  description: string;
  latitude: number;
  longitude: number;
  scores: { [judge: string]: number };
  timestamp?: string;
  title: string;
  name: string;
  uploaded_by: string;
  url: string;
}

async function fetchPhotos(): Promise<Photo[]> {
  const photosRef = ref(database, 'photos');
  const snapshot = await get(photosRef);

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.entries(data).map(([key, value]) => {
    const photo = value as Photo;
    return {
      name: key,
      title: photo.title,
      description: photo.description,
      latitude: photo.latitude,
      longitude: photo.longitude,
      scores: photo.scores,
      timestamp: photo.timestamp,
      uploaded_by: photo.uploaded_by,
      url: photo.url,
    };
  });
}

async function createPhoto(data: Photo) {
  const newPhotoRef = ref(database, `photos/${data.name}`);
  await set(newPhotoRef, data);
}

export async function GET() {
  try {
    const photos = await fetchPhotos();
    return NextResponse.json({ success: true, data: photos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
  }

  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json({ success: false, message: validation.error.errors }, { status: 400 });
  }

  const photo: Photo = {
    name: validation.data.name,
    title: validation.data.title,
    description: validation.data.description,
    latitude: validation.data.latitude,
    longitude: validation.data.longitude,
    url: validation.data.url,
    uploaded_by: validation.data.uploaded_by,
    timestamp: validation.data.timestamp,
    scores: validation.data.scores || {},
  };

  try {
    await createPhoto(photo);
    return NextResponse.json({ success: true, data: photo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create photo' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = params;

  if (!name) {
    return NextResponse.json(
      { success: false, message: 'Photo name is required' },
      { status: 400 }
    );
  }

  try {
    const photoRef = ref(database, `photos/${name}`);
    await remove(photoRef);

    return NextResponse.json({
      success: true,
      message: `Photo ${name} deleted successfully`,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to delete photo' },
      { status: 500 }
    );
  }
}
