import { getCompetitions } from '@/lib/db';
import CompetitionTable from './competition-table';

export default async function CompetitionsPage() {
  const competitions = await getCompetitions();

  return <CompetitionTable initialCompetitions={competitions} />;
}
