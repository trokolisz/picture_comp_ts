export interface Competition {
  name: string;
  title: string;
  description: string;
  created_at: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  judges: string[];
  teams: Record<string, Team>;
  updated_at: string;
  public: boolean;
}

export interface Team {
  teamname: string;
  captain: string;
  members: string[];
  photos: Record<string, Photo>;
}

export interface Photo {
  name: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  uploaded_by: string;
  url: string;
  scores: Record<string, number>;
}

export interface User {
  username: string;
  approved: boolean;
  created_at: string;
  updated_at: string;
  email: string;
  name: string;
  password: string;
  role: 'judge' | 'competitor' | 'admin';
  competitions: Record<string, string>;
  teams: Record<string, string>;
  uid: string;
}