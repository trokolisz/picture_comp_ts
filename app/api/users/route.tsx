import { NextResponse } from 'next/server';
import { get, ref } from 'firebase/database';
import { database } from '../../../FirebaseConfig';

interface User {
  username: string;
  full_name: string;
  email: string;
  is_active: boolean;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
}

// Function to fetch users from Firebase
async function fetchUsers(): Promise<User[]> {
  const userRef = ref(database, 'users');
  const snapshot = await get(userRef);
  let usersArray: User[] = [];

  if (snapshot.exists()) {
    const uniqueUsername = new Set<string>();
    usersArray = Object.entries(snapshot.val()).map(([id, data]) => {
      const userData = data as User;
      return { ...userData };
    }).filter(user => {
      if (user.username && !uniqueUsername.has(user.username)) {
        uniqueUsername.add(user.username);
        return true;
      }
      return false;
    });
  }

  return usersArray;
}

// API route handler
export async function GET() {
  try {
    const users = await fetchUsers();
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
  }
}
