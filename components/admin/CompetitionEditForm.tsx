"use client";

import { useRouter } from 'next/navigation';
import { Competition, User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ref, update } from 'firebase/database';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, X } from 'lucide-react';
import { updateCompetition} from "@/lib/db";

export default function CompetitionEditForm({
  initialCompetition,
  id,
  users,
}: {
  initialCompetition: Competition;
  id: string;
  users: Record<string, User>;
}) {

  const router = useRouter();
  const { toast } = useToast();
  const competition = initialCompetition;
  
  const handleUpdateCompetition = async (updatedData: Partial<Competition>) => {
    try {
      updateCompetition(id, updatedData);  
      toast({
        title: "Success",
        description: "Competition updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update competition",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Edit Competition</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Competition Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={competition.title}
              onChange={(e) => handleUpdateCompetition({ title: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={competition.description}
              onChange={(e) => handleUpdateCompetition({ description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(new Date(competition.start_date), 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(competition.start_date)}
                  onSelect={(date) => date && handleUpdateCompetition({ start_date: date.toISOString() })}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(new Date(competition.end_date), 'PPP')}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={new Date(competition.end_date)}
                  onSelect={(date) => date && handleUpdateCompetition({ end_date: date.toISOString() })}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="is_active">Active</Label>
            <Switch
              id="is_active"
              checked={competition.is_active}
              onCheckedChange={(checked) => handleUpdateCompetition({ is_active: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="public">Public</Label>
            <Switch
              id="public"
              checked={competition.public}
              onCheckedChange={(checked) => handleUpdateCompetition({ public: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Judges</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {competition.judges.map((judge, index) => (
              <div key={index} className="flex items-center justify-between gap-2">
                <span className="flex-1">{judge}</span>
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    const newJudges = competition.judges.filter(
                      (_, i) => i !== index
                    );
                    handleUpdateCompetition({ judges: newJudges });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Popover>
              <PopoverTrigger asChild>
                <Button className="w-full">Add Judge</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
               <div className="space-y-2">
                 {Object.entries(users)
                   .filter(([_, user]) => user.role === 'judge')
                   .map(([id, user]) => (
                     <Button 
                       key={id} 
                       variant="ghost" 
                       className="w-full justify-start"
                       onClick={() => {
                         const newJudges = [...competition.judges, user.username];
                         handleUpdateCompetition({ judges: newJudges });
                       }}
                     >
                       {user.username}
                     </Button>
                   ))
                 }
               </div>
 

              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}