interface Photo {
    description: string;
    latitude: number;
    longitude: number;
    scores: Record<string, number>;
    timestamp: string;
    title: string;
    uploaded_by: string;
    url: string;
  }
  
  interface Team {
    captain: string;
    members: string[];
    name: string;
    photos: Record<string, Photo>;
  }
  
  interface Competition {
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    judges: string[];
    is_active: boolean;
    teams: Record<string, Team>;
  }