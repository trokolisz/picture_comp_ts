import { NextRequest, NextResponse } from 'next/server';
import { get, ref, set } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import schema from './schema';

interface User {
    username: string;
    full_name: string;
    email: string;
    is_active: boolean;
    isJudgePending?: boolean;
    password: string;
    role?: 'admin' | 'judge' | 'competitor';
    created_at: string;
    updated_at: string;
}

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

async function createUserInAuth(email: string, password: string): Promise<void> {
    const auth = getAuth();
    try {
        await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error("Error creating user in Firebase Auth:", error);
        throw error;
    }
}

async function createUser(user: User): Promise<void> {
    const userRef = ref(database, `users/${user.username}`);
    await set(userRef, user);
}

async function emailExists(email: string): Promise<boolean> {
    const auth = getAuth();
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    return signInMethods.length > 0;
}

async function userExists(username: string): Promise<boolean> {
    const userRef = ref(database, `users/${username}`);
    const snapshot = await get(userRef);
    return snapshot.exists();
}

export async function GET() {
    try {
        const users = await fetchUsers();
        return NextResponse.json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch users' }, { status: 500 });
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

    const { username, email, password, full_name, role, isJudgePending } = validation.data;

    if (await emailExists(email)) {
        //console.log(`Email ${email} already exists.`);
        return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
    }

    if (await userExists(username)) {
        return NextResponse.json({ success: false, message: 'Username already exists' }, { status: 400 });
    }

    const user: User = {
        username,
        full_name,
        email,
        is_active: true,
        password,
        role: role || 'competitor',
        isJudgePending: isJudgePending || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };

    try {
        await createUserInAuth(user.email, user.password);
        await createUser(user);
        return NextResponse.json({ success: true, message: 'User created successfully' });
    } catch (error: unknown) {
        console.error('Error creating user:', error);

        if (error instanceof FirebaseError) {
            if (error.code === 'auth/email-already-in-use') {
                return NextResponse.json({ success: false, message: 'Email already exists' }, { status: 400 });
            }
        }

        return NextResponse.json({ success: false, message: 'Failed to create user' }, { status: 500 });
    }
}
