import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/FirebaseConfig';
import { ref, child, get, DatabaseReference, remove as firebaseRemove } from 'firebase/database';

interface Competition {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    judges: string[];
    teams: Team[];
}

interface Team {
    name: string;
    captain: string;    
    members?: string[];
    photos?: object;
    num_members?: number;
    num_photos?: number;
}
interface Props {
    params: Promise<{ name: string; }>
  }

async function fetchCompetitionByName(name: string): Promise<Competition | null> {
    const compRef = ref(database, `competitions/${name}`);
    const snapshot = await get(compRef);

    if (snapshot.exists()) {
        const compData = snapshot.val() as Competition;

        return {
            name: compData.name,
            description: compData.description,
            start_date: compData.start_date,
            end_date: compData.end_date,
            judges: compData.judges || [],
            is_active: compData.is_active ?? false,
            teams: compData.teams ? Object.values(compData.teams).map(team => ({
                ...team,
                members: team.members || [],
                photos: team.photos || {},
            })) : []
        };
    }

    return null;
}

function remove(compRef: DatabaseReference) {
    return firebaseRemove(compRef);
}

export async function GET(request: NextRequest, { params }: Props){
    const name = (await params).name;
    //console.log(name);
    if (!name) {
        return NextResponse.json({
            error: "Competition name is required"
        }, { status: 400 });
    }

    try {
        const competition = await fetchCompetitionByName(name);

        if (!competition) {
            return NextResponse.json({ message: "Competition not found" }, { status: 404 });
        }

        return NextResponse.json(competition, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error: "Internal Server Error"
        }, { status: 500 });
    }
}   