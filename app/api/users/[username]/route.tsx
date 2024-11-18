import { NextResponse, NextRequest } from 'next/server';
import { database } from '../../../../FirebaseConfig';
import { ref, child, get, DatabaseReference, remove as firebaseRemove } from 'firebase/database';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from "@/components/ui/button"

interface User {
  username: string;
  full_name: string;
  email: string;
  is_active: boolean;
  password: string;
  role?: 'admin' | 'judge' | 'competitor';
  created_at: string;
  updated_at: string;
}
interface Props {
  params: Promise<{ username: string; }>
}

export async function fetchUserByUsername(username: string): Promise<User | null> {
  const userRef = ref(database, `users/${username}`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const userData = snapshot.val() as User;
    return userData;
  }

  return null;
}

function remove(userRef: DatabaseReference) {
  return firebaseRemove(userRef);
}

export async function GET(request: NextRequest, { params }: Props) {
  const username = (await params).username;

  if (!username) {
    return NextResponse.json({ 
      error: (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Username is required</AlertDescription>
        </Alert>
      ) 
    }, { status: 400 });
  }

  try {
    const user = await fetchUserByUsername(username);

    if (!user) {
      return NextResponse.json({ 
        error: (
          <Alert>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>User not found</AlertDescription>
          </Alert>
        ) 
      }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      error: (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Internal Server Error</AlertDescription>
        </Alert>
      ) 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const username = (await params).username;

  if (!username) {
    return NextResponse.json({ 
      error: (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Username is required</AlertDescription>
        </Alert>
      ) 
    }, { status: 400 });
  }

  try {
    const userRef = ref(database, `users/${username}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ 
        error: (
          <Alert>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>User not found</AlertDescription>
          </Alert>
        ) 
      }, { status: 404 });
    }

    await remove(userRef);
    return NextResponse.json({ 
      message: (
        <Alert>
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>User deleted successfully</AlertDescription>
        </Alert>
      ) 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      error: (
        <Alert>
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Internal Server Error</AlertDescription>
        </Alert>
      ) 
    }, { status: 500 });
  }
}


