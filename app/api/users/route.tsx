import { NextRequest, NextResponse } from 'next/server';
import { get, ref, set } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import schema from "./schema";

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

// Function to create a new user in Firebase
async function createUser(user: User): Promise<void> {
    const userRef = ref(database, `users/${user.username}`);
    await set(userRef, user);
}

// Function to check if a user exists in Firebase
async function userExists(username: string): Promise<boolean> {
    const userRef = ref(database, `users/${username}`);
    const snapshot = await get(userRef);
    return snapshot.exists();
}



// API route handler for GET request
export async function GET() {
    try {
        const users = await fetchUsers();
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
    }
}

// API route handler for POST request
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

    const username = validation.data.username;
    if (await userExists(username)) {
        return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 400 });
    }

    const user = {
        username: validation.data.username,
        full_name: validation.data.full_name,
        email: validation.data.email,
        is_active: true,
        password: validation.data.password, 
        role: validation.data.role ? validation.data.role : 'competitor',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    }

    try {
        await createUser(user);
        return NextResponse.json({ success: true, message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
    }   
}