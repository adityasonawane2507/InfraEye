
export type ReportStatus = 'Pending' | 'In Progress' | 'Fixed' | 'Rejected' | 'Queued';

export interface RoadReport {
  id: string;
  tempId?: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  voiceUrl?: string;
  note?: string;
  status: ReportStatus;
  locationName?: string;
}

export interface User {
  uid: string;
  email: string | null;
  name?: string;
  roadGuardianStats?: {
    score: number;
    rank: number;
  };
}
