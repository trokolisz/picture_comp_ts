import { NextResponse, NextRequest } from 'next/server';
import { database } from '@/FirebaseConfig';
import { ref, child, get, DatabaseReference, remove as firebaseRemove } from 'firebase/database';

interface Competition {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    judges?: string[];
    teams?: object;
}
interface Props {
    params: Promise<{ name: string; }>
  }

async function fetchCompetitionByName(name: string): Promise<Competition | null> {
    const compRef = ref(database, `competition/${name}/teams`);
    const snapshot = await get(compRef);

    if (snapshot.exists()) {
        const compData = snapshot.val() as Competition;
        return compData;
    }


    return null;
}

function remove(compRef: DatabaseReference) {
    return firebaseRemove(compRef);
}

export async function GET(request: NextRequest, { params }: Props){
    const name = (await params).name;
    ////console.log(name);
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