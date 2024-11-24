"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarDays, Users, Camera, Plus, Power, Edit, PlusCircle } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export default function CompetitionView({
    competition,
    onUpdate
}: {
    competition: Competition;
    onUpdate: (updatedCompetition: Competition) => Promise<void>;
}) {
    const router = useRouter();
    const [isEditingDates, setIsEditingDates] = useState(false);
    const [newJudge, setNewJudge] = useState('');
    const [dateRange, setDateRange] = useState({
        from: new Date(competition.start_date),
        to: new Date(competition.end_date)
    });

    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleAddJudge = async () => {
        if (!newJudge.trim()) return;

        const updatedCompetition = {
            ...competition,
            judges: [...competition.judges, newJudge.trim()]
        };

        try {
            await onUpdate(updatedCompetition);
            setNewJudge('');
            toast({
                title: "Judge added successfully",
                description: `${newJudge} has been added as a judge.`
            });
        } catch (error) {
            toast({
                title: "Error adding judge",
                description: "There was a problem adding the judge. Please try again.",
                variant: "destructive"
            });
        }
    };

    const handleDateRangeUpdate = async () => {
        if (!dateRange.from || !dateRange.to) return;

        const updatedCompetition = {
            ...competition,
            start_date: dateRange.from.toISOString().split('T')[0],
            end_date: dateRange.to.toISOString().split('T')[0]
        };

        try {
            await onUpdate(updatedCompetition);
            setIsEditingDates(false);
            toast({
                title: "Dates updated successfully",
                description: "The competition dates have been updated."
            });
        } catch (error) {
            toast({
                title: "Error updating dates",
                description: "There was a problem updating the dates. Please try again.",
                variant: "destructive"
            });
        }
    };

    const toggleCompetitionStatus = async () => {
        const updatedCompetition = {
            ...competition,
            is_active: !competition.is_active
        };

        try {
            await onUpdate(updatedCompetition);
            toast({
                title: "Status updated",
                description: `Competition is now ${updatedCompetition.is_active ? 'active' : 'inactive'}.`
            });
        } catch (error) {
            toast({
                title: "Error updating status",
                description: "There was a problem updating the competition status.",
                variant: "destructive"
            });
        }
    };

    const handleDeleteTeam = async (teamName: string) => {
        const updatedTeams = Object.fromEntries(
            Object.entries(competition.teams).filter(([key, team]) => team.name !== teamName)
        );

        const updatedCompetition = {
            ...competition,
            teams: updatedTeams
        };

        try {
            await onUpdate(updatedCompetition);
            toast({
                title: "Team deleted",
                description: `${teamName} has been removed from the competition.`
            });
        } catch (error) {
            toast({
                title: "Error deleting team",
                description: "There was a problem deleting the team. Please try again.",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="p-6 space-y-6 max-w-6xl mx-auto">
            {/* Competition Header */}
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl mb-2">{competition.name}</CardTitle>
                            <CardDescription className="text-lg">{competition.description}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={toggleCompetitionStatus}
                            >
                                <Power className="h-4 w-4 mr-2" />
                                {competition.is_active ? 'Deactivate' : 'Activate'}
                            </Button>
                            {competition.is_active && (
                                <Badge variant="default" className="bg-green-600">
                                    Active
                                </Badge>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Popover open={isEditingDates} onOpenChange={setIsEditingDates}>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" className="h-auto p-0">
                                    <CalendarDays className="h-4 w-4 mr-2" />
                                    <span>{formatDate(competition.start_date)} - {formatDate(competition.end_date)}</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <div className="p-4">
                                    <DatePickerWithRange
                                        date={dateRange}
                                        onChange={(newDateRange) => newDateRange && setDateRange({
                                            from: newDateRange.from ?? dateRange.from,
                                            to: newDateRange.to ?? dateRange.to
                                        })}
                                    />
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button variant="outline" size="sm" onClick={() => setIsEditingDates(false)}>
                                            Cancel
                                        </Button>
                                        <Button size="sm" onClick={handleDateRangeUpdate}>
                                            Update Dates
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Separator orientation="vertical" className="h-4" />
                        {competition.judges.length > 0 && (
                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <Button variant="ghost" className="h-auto p-0">
                                        <Users className="h-4 w-4 mr-2" />
                                        <span>{competition.judges.length} Judge{competition.judges.length > 1 ? 's' : ''}</span>
                                    </Button>
                                </HoverCardTrigger>
                                <HoverCardContent className="w-80">
                                    <div className="space-y-4">
                                        <h4 className="text-sm font-semibold">Judges</h4>
                                        <ul className="text-sm space-y-1">
                                            {competition.judges.map((judge, index) => (
                                                <li key={index}>{judge}</li>
                                            ))}
                                        </ul>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Add new judge..."
                                                value={newJudge}
                                                onChange={(e) => setNewJudge(e.target.value)}
                                                className="text-sm"
                                            />
                                            <Button size="sm" onClick={handleAddJudge}>
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.values(competition.teams).map((team) => (
                    <Card key={team.name} className="flex flex-col h-full hover:shadow-lg transition-shadow relative group">
                        <Link
                            href={`/admin/competitions/${competition.name}/${team.name}`}
                            className="flex-1"
                        >
                            <CardHeader>
                                <CardTitle>{team.name}</CardTitle>
                                <CardDescription>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4" />
                                        {(team.members ?? []).length} Member{(team.members ?? []).length > 1 ? 's' : ''}
                                    </div>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Camera className="h-4 w-4" />
                                    <span>{Object.keys(team.photos ?? {}).length} Photo{Object.keys(team.photos ?? {}).length !== 1 ? 's' : ''}</span>
                                </div>
                            </CardContent>
                            <CardFooter className="mt-auto">
                                {team.captain ? (
                                    <span className="text-sm text-muted-foreground">Captain: {team.captain}</span>
                                ) : (
                                    <span className="text-sm text-muted-foreground">No captain assigned</span>
                                )}
                            </CardFooter>
                        </Link>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This will permanently delete the team "{team.name}" and all its data.
                                        This action cannot be undone.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={() => handleDeleteTeam(team.name)}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Delete
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </Card>
                ))}



                <Popover>
                    <PopoverTrigger asChild>
                        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow items-center justify-center cursor-pointer">
                            <CardHeader>
                            </CardHeader>
                            <CardContent className='w-full h-full flex justify-center items-center'>
                                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                    <PlusCircle className="h-10 w-10" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                Add team
                            </CardFooter>
                        </Card>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Add New Team</h4>
                                <p className="text-sm text-muted-foreground">Enter the details for the new team</p>
                            </div>
                            <div className="grid gap-2">
                                <Input id="teamName" placeholder="Team name" />
                                <Input id="captain" placeholder="Captain's username" />
                                <Button className="w-full">Create Team</Button>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>

            </div>
        </div>
    );
}