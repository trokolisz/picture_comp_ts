
import { Competition } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { getCompetitions} from '@/lib/db';


interface CompetitionListProps {
  type: 'upcoming' | 'recent';
}

export async function CompetitionList({ type }: CompetitionListProps) {
  
  const competitions = await getCompetitions();
  

  const now = new Date();
  const filtered = type === 'upcoming'
    ? Object.values(competitions).filter((c: Competition) => new Date(c.start_date) > now)
    : Object.values(competitions).filter((c: Competition) => new Date(c.end_date) < now);

  if (filtered.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">No {type} competitions found</p>
        </CardContent>
      </Card>
    );
  }
  const sortedAndLimited = filtered
    .sort((a, b) => {
      const dateA = new Date(type === 'upcoming' ? a.start_date : a.end_date);
      const dateB = new Date(type === 'upcoming' ? b.start_date : b.end_date);
      return type === 'upcoming' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
    })
    .slice(0, 5);  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedAndLimited.map((competition: Competition) => (
        <Card key={competition.name}>
          <CardHeader>
            <CardTitle>{competition.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{competition.description}</p>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              <span>
                {type === 'upcoming' ? 'Starts: ' : 'Ended: '}
                {new Date(
                  type === 'upcoming' ? competition.start_date : competition.end_date
                ).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}