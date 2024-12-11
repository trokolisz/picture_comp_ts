import {
  ref,
  query,
  orderByChild,
  get,
  set,
  update,
  remove,
} from "firebase/database";
import { database as db } from "@/FirebaseConfig";
import { Competition, Team, Photo, User } from './types';

// Competition queries
export async function getCompetitions() {
  const competitionsRef = ref(db, "competitions");
  const snapshot = await get(competitionsRef);
  return snapshot.val() as Record<string, Competition>;
}

export async function getUpcomingCompetitions() {
  const competitionsRef = ref(db, "competitions");
  const competitionsQuery = query(competitionsRef, orderByChild("start_date"));
  const snapshot = await get(competitionsQuery);
  const competitions: Record<string, Competition> = {};

  snapshot.forEach((child) => {
    const competition = child.val();
    if (new Date(competition.start_date) > new Date()) {
      competitions[child.key!] = competition;
    }
  });

  return competitions;
}

export async function getRecentCompetitions(limit = 5) {
  const competitionsRef = ref(db, "competitions");
  const snapshot = await get(competitionsRef);
  const competitions: Competition[] = [];

  snapshot.forEach((child) => {
    const competition = child.val();
    if (new Date(competition.end_date) < new Date()) {
      competitions.push({
        ...competition,
        id: child.key as string,
      });
    }
  });

  return competitions
    .sort(
      (a, b) => new Date(b.end_date).getTime() - new Date(a.end_date).getTime()
    )
    .slice(0, limit);
}

export async function getFeaturedPhotos(limit = 10) {
  const competitions = await getCompetitions();

  const photos: Array<{
    photo: Photo;
    competitionTitle: string;
    teamName: string;
  }> = [];

  Object.values(competitions).forEach((competition) => {
    if (competition.teams) {
      Object.values(competition.teams).forEach((team) => {
        if (team.photos) {
          //console.log(team.photos);
          Object.values(team.photos).forEach((photo) => {
            if (photo.scores) {
              const ratings = Object.values(photo.scores);
              const averageRating =
                ratings.length > 0
                  ? ratings.reduce((sum, score) => sum + score, 0) /
                    ratings.length
                  : 0;

              if (averageRating > 0) {
                photos.push({
                  photo: {
                    ...photo,
                    scores: {
                      ...photo.scores,
                      rating: averageRating,
                    },
                  },
                  competitionTitle: competition.title,
                  teamName: team.teamname,
                });
              }
            }
          });
        }
      });
    }
  });

  // Shuffle array and take first n items
  return photos.sort(() => 0.5 - Math.random()).slice(0, limit);
}

export async function getCompetitionStats(id: string) {
  const competition = await getCompetition(id);
  if (!competition) return null;

  let totalTeams = 0;
  let totalPhotos = 0;
  let teamsWithScores: Array<{
    id: string;
    totalScore: number;
    averageScore: number;
    photoCount: number;
  }> = [];

  if (competition.teams) {
    totalTeams = Object.keys(competition.teams).length;
    teamsWithScores = Object.entries(competition.teams)
      .map(([teamId, team]) => {
        let totalScore = 0;
        let ratedPhotos = 0;
        let photoCount = 0;

        if (team.photos) {
          Object.values(team.photos).forEach((photo) => {
            photoCount++;
            totalPhotos++;
            if (photo.scores?.rating) {
              totalScore += photo.scores.rating;
              ratedPhotos++;
            }
          });
        }

        return {
          ...team,
          id: teamId,
          totalScore,
          averageScore: ratedPhotos > 0 ? totalScore / ratedPhotos : 0,
          photoCount,
        };
      })
      .sort((a, b) => b.averageScore - a.averageScore);
  }

  return {
    competition,
    stats: {
      totalTeams,
      totalPhotos,
      teams: teamsWithScores,
    },
  };
}

export async function getUsers() {
  const usersRef = ref(db, "users");
  const snapshot = await get(usersRef);
  return snapshot.val() as Record<string, User>;
}

export async function getCompetition(id: string) {
  const competitionRef = ref(db, `competitions/${id}`);
  const snapshot = await get(competitionRef);
  return snapshot.val() as Competition;
}

// Team queries
export async function getTeam(competitionId: string, teamId: string) {
  const teamRef = ref(db, `competitions/${competitionId}/teams/${teamId}`);
  const snapshot = await get(teamRef);
  return snapshot.val() as Team;
}

// Photo queries
export async function getPhoto(
  competitionId: string,
  teamId: string,
  photoId: string
) {
  const photoRef = ref(
    db,
    `competitions/${competitionId}/teams/${teamId}/photos/${photoId}`
  );
  const snapshot = await get(photoRef);
  return snapshot.val() as Photo;
}

// User queries
export async function getUser(userId: string) {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  return snapshot.val() as User;
}

export async function getUsersByRole(role: string) {
  const usersRef = ref(db, "users");
  const usersQuery = query(usersRef, orderByChild("role"));
  const snapshot = await get(usersQuery);
  const users: Record<string, User> = {};

  snapshot.forEach((child) => {
    const user = child.val();
    if (user.role === role) {
      users[child.key!] = user;
    }
  });

  return users;
}

// Update functions
export async function updateCompetition(
  id: string,
  data: Partial<Competition>
) {
  const competitionRef = ref(db, `competitions/${id}`);
  await update(competitionRef, data);
}

export async function updateUser(id: string, data: Partial<User>) {
  const userRef = ref(db, `users/${id}`);
  await update(userRef, data);
}

export async function updatePhotoRating(
  competitionId: string,
  teamId: string,
  photoId: string,
  rating: number
) {
  const photoRef = ref(
    db,
    `competitions/${competitionId}/teams/${teamId}/photos/${photoId}/scores`
  );
  await update(photoRef, { rating });
}

export async function disqualifyPhoto(
  competitionId: string,
  teamId: string,
  photoId: string
) {
  const photoRef = ref(
    db,
    `competitions/${competitionId}/teams/${teamId}/photos/${photoId}`
  );
  await update(photoRef, { disqualified: true });
}


