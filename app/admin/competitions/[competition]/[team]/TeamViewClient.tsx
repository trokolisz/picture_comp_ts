'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Camera, Users, ArrowLeft, MapPin, Star, Plus, Trash2, Crown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TeamViewProps {
  teamData: Team;
  onUpdate: (updatedCompetition: Team) => Promise<void>;
}

export default function TeamView({ teamData, onUpdate }: TeamViewProps) {
  const router = useRouter();

  const team = teamData;
  const [newMember, setNewMember] = useState('');
  const [isAddingMember, setIsAddingMember] = useState(false);
  
  if (!team) {
    return (
      <div className="p-6">
        <h1>Team not found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const calculateAverageScore = (photo: Photo) => {
    const scores = Object.values(photo.scores);
    return scores.length > 0 
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) 
      : 'N/A';
  };

  const handleAddMember = async () => {
    if (!newMember.trim()) return;
    
    const updatedTeam = {
      ...team,
      members: [...team.members, newMember.trim()]
    };

    try {
      await onUpdate(updatedTeam);
      setNewMember('');
      setIsAddingMember(false);
      toast({
        title: "Member added",
        description: `${newMember} has been added to the team.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add member",
        variant: "destructive"
      });
    }
  };

  const handleRemoveMember = async (memberToRemove: string) => {
    if (memberToRemove === team.captain) {
      toast({
        title: "Error",
        description: "Cannot remove team captain",
        variant: "destructive"
      });
      return;
    }

    const updatedTeam = {      
      ...team,
      members: team.members.filter(member => member !== memberToRemove)
    };

    try {
      await onUpdate(updatedTeam);
      toast({
        title: "Member removed",
        description: `${memberToRemove} has been removed from the team.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove member",
        variant: "destructive"
      });
    }
  };

  const handleSetCaptain = async (newCaptain: string) => {
    const updatedTeam = {
      
          ...team,
          captain: newCaptain
        
     
    };

    try {
      await onUpdate(updatedTeam);
      toast({
        title: "Captain updated",
        description: `${newCaptain} is now the team captain.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update team captain",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header with navigation */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Competition
        </Button>
        <h1 className="text-2xl font-bold">{team.name}</h1>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{(team.members ?? []).length} Members</span>
                </div>
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-muted-foreground" />
                  <span>{Object.keys(team.photos ?? {}).length} Photos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-muted-foreground" />
                  <span>Captain: {team.captain || 'None'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Team Members</CardTitle>
              <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Member ID"
                      value={newMember}
                      onChange={(e) => setNewMember(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddingMember(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddMember}>Add Member</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member ID</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(team.members ?? []).map((member) => (
                    <TableRow key={member}>
                      <TableCell>{member}</TableCell>
                      <TableCell>
                        {member === team.captain ? (
                          <Badge>Captain</Badge>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetCaptain(member)}
                          >
                            Make Captain
                          </Button>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveMember(member)}
                          disabled={member === team.captain}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Photos Tab */}
        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Object.entries(team.photos ?? {}).map(([photoId, photo]) => (
                    <TableRow key={photoId}>
                      <TableCell>{photo.title}</TableCell>
                      <TableCell>{photo.description}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {photo.latitude.toFixed(2)}, {photo.longitude.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          {calculateAverageScore(photo)}
                        </div>
                      </TableCell>
                      <TableCell>{photo.uploaded_by}</TableCell>
                      <TableCell>{new Date(photo.timestamp).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}