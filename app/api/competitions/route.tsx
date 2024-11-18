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
    judges?: string[];
    teams?: object;
    num_judges?: number;
    num_teams?: number;
}

async function fetchCompetitions(): Promise<Competition[]> {
    const competitionsRef = ref(database, 'competition');
    const snapshot = await get(competitionsRef);
    if (snapshot.exists()) {
        const data = snapshot.val();


        return Object.entries(data).map(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
                return {
                    name: (value as Competition).name,
                    description: (value as Competition).description,
                    start_date: (value as Competition).start_date,
                    end_date: (value as Competition).end_date,
                    is_active: (value as Competition).is_active,
                    num_judges: Array.isArray((value as Competition).judges) ? ((value as Competition).judges?.length ?? 0) : 0,
                    num_teams: (value as Competition).teams && typeof (value as Competition).teams === 'object' ? Object.keys((value as Competition).teams ?? {}).length : 0
                };
            }
            return value as Competition;
        });
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
        return NextResponse.json({success: true, data: competitions}, { status: 200 });
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
        is_active: false, 
    };

    try {
        await createCompetition(competition);
        return NextResponse.json( competition, { status: 201 });
    } catch (error) {
        console.error('Error creating competition:', error);
        return NextResponse.json('failed to create user', { status: 500 });
    }
}
