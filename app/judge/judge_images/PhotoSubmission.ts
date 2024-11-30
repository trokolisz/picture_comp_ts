export interface PhotoSubmission {
    name: string;
    description: string;
    url: string;
    latitude: number;
    longitude: number;
    scores: Record<string, number>;
    timestamp: string;
    title: string;
    uploaded_by: string;
  }
  
  export type PhotoSubmissions = Record<string, PhotoSubmission>;