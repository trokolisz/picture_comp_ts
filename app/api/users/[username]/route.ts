import { NextResponse, NextRequest } from 'next/server';
import { database } from '../../../../FirebaseConfig';
import { ref, child, get, DatabaseReference, remove as firebaseRemove } from 'firebase/database';

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

async function fetchUserByUsername(username: string): Promise<User | null> {
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
      error: "Username is required" 
    }, { status: 400 });
  }

  try {
    const user = await fetchUserByUsername(username);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      error: "Internal Server Error" 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const username = (await params).username;

  if (!username) {
    return NextResponse.json({ 
      error: "Username is required" 
    }, { status: 400 });
  }

  try {
    const userRef = ref(database, `users/${username}`);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      return NextResponse.json({ 
        error: "User not found" 
      }, { status: 404 });
    }

    await remove(userRef);
    return NextResponse.json({ 
      message: "User deleted successfully" 
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ 
      error: "Internal Server Error" 
    }, { status: 500 });
  }
}

