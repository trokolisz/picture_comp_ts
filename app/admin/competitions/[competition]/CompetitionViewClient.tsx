
"use client"
import React from 'react';
import CompetitionView from './CompetitionView';
import { toast } from "@/hooks/use-toast";

const CompetitionViewClient = ({ competition }: { competition: Competition }) => {
    console.log(competition);
  const handleUpdateCompetition = async (updatedCompetition: Competition) => {
    console.log(updatedCompetition);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
   
    const response = await fetch(`${baseUrl}/api/competitions/${updatedCompetition.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCompetition),
    });
    

    if (!response.ok) {
      toast({
        title: "Error updating competition",
        description: "There was a problem updating the competition. Please try again.",
        variant: "destructive"
      });
      throw new Error('Failed to update competition');
    }

    toast({
      title: "Competition updated",
      description: "The competition has been updated successfully.",
    });
  };

  return <CompetitionView competition={competition} onUpdate={handleUpdateCompetition} />;
};

export default CompetitionViewClient;