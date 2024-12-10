import { NextResponse } from 'next/server';
import { get, ref } from 'firebase/database';
import { database } from '@/FirebaseConfig';

interface JudgingRecord {
  timestamp: string;
}

interface Team {
  photos?: Record<string, { timestamp: string; scores?: number[] }>;
}

interface Competition {
  is_active: boolean;
  judges?: string[]; 
  teams?: Record<string, Team>;
}

interface DailyJudgingStatistics {
  [date: string]: number;
}

interface JudgeStatistics {
  totalCompetitions: number;
  activeCompetitions: number;
  totalPhotosJudged: number;
  photosPendingReview: number;  
  totalJudges: number;          
  dailyJudgingActivity: DailyJudgingStatistics;
}

async function fetchJudgeStatistics(): Promise<JudgeStatistics> {
  try {
    console.log("Fetching competitions data...");

    const competitionsRef = ref(database, 'competitions');
    const snapshot = await get(competitionsRef);

    if (!snapshot.exists()) {
      console.log('No competitions available');
      return {
        totalCompetitions: 0,
        activeCompetitions: 0,
        totalPhotosJudged: 0,
        photosPendingReview: 0,  
        totalJudges: 0,         
        dailyJudgingActivity: {},
      };
    }

    console.log("Fetched snapshot data:", snapshot.val());

    const data: Record<string, Competition> = snapshot.val();
    let totalCompetitions = 0;
    let activeCompetitions = 0;
    let totalPhotosJudged = 0;
    let photosPendingReview = 0;
    let totalJudges = new Set<string>();  
    const dailyJudgingCounts: DailyJudgingStatistics = {};

    for (const competitionKey in data) {
      const competition = data[competitionKey];

      totalCompetitions++;
      if (competition.is_active) activeCompetitions++;

      if (competition.judges) {
        competition.judges.forEach((judge) => totalJudges.add(judge));
      }

      const teams = competition.teams || {};
      for (const teamKey in teams) {
        const team = teams[teamKey];
        if (team.photos) {
          for (const photoKey in team.photos) {
            const photo: { timestamp: string; scores?: number[] } = team.photos[photoKey];
            if (!photo?.timestamp) continue; 

            if (photo.scores) {
              totalPhotosJudged++;

              const judgingDate = new Date(photo.timestamp).toISOString().split('T')[0];
              dailyJudgingCounts[judgingDate] = (dailyJudgingCounts[judgingDate] || 0) + 1;
            } else {
              photosPendingReview++;
            }
          }
        }
      }
    }

    return {
      totalCompetitions,
      activeCompetitions,
      totalPhotosJudged,
      photosPendingReview,
      totalJudges: totalJudges.size,  
      dailyJudgingActivity: dailyJudgingCounts,
    };
  } catch (error) {
    console.error("Error in fetchJudgeStatistics:", error);
    throw error;  
  }
}

export async function GET() {
  try {
    const statistics = await fetchJudgeStatistics();
    console.log("Returning statistics:", statistics);
    return NextResponse.json({ success: true, data: statistics }, { status: 200 });
  } catch (error) {
    console.error('Error fetching judge statistics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch judge statistics' },
      { status: 500 }
    );
  }
}
