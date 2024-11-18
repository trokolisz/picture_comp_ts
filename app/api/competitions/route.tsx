import { NextRequest, NextResponse } from 'next/server';
import { get, ref, set } from 'firebase/database';
import { database } from '../../../FirebaseConfig';
import { any } from 'zod';
import schema from "./schema";

interface Competition {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    judges: string[];
    teams: string[];

}

async function fetchCompetitions(): Promise<Competition[]> {
    const competitionsRef = ref(database, 'competition');
    const snapshot = await get(competitionsRef);
    if (snapshot.exists()) {
        return snapshot.val() as Competition[];
    } else {
        console.log('No competitions available');
        return [];
    }
}

async function createCompetition(data: Competition) {
    const newCompetitionRef = ref(database, `competition/${data.name}`);
    await set(newCompetitionRef, data);
}

export async function GET() {
    try {
        const competitions = await fetchCompetitions();
        return NextResponse.json({ success: true, data: competitions });
    } catch (error) {
        console.error('Error fetching competitions:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch competitions' }, { status: 500 });
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

    const competition: Competition = {
        name: validation.data.name,
        description: validation.data.description,
        start_date: validation.data.start_date,
        end_date: validation.data.end_date,
        is_active: validation.data.is_active,
 
    };

    try {
        await createCompetition(competition);
        return NextResponse.json({ success: true, message: 'Competition created successfully' });
    } catch (error) {
        console.error('Error creating competition:', error);
        return NextResponse.json({ success: false, message: 'Failed to create competition' }, { status: 500 });
    }
}
