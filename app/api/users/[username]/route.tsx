
import { NextResponse, NextRequest } from 'next/server';
import { database } from '../../../../FirebaseConfig';
import { ref, child, get } from 'firebase/database';

export async function GET(request: NextRequest, { params }: { params: { username: string } }) {
  const { username } = params;
  const userRef = ref(database, `users`);
  const snapshot = await get(child(userRef, username));

  if (snapshot.exists()) {
    const userData = snapshot.val();
    return NextResponse.json(userData, { status: 200 });
  }

  return NextResponse.json({ error: 'User not found' }, { status: 404 });
}