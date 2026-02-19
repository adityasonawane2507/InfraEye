
export type ReportStatus = 'Pending' | 'In Progress' | 'Fixed' | 'Rejected';

export interface RoadReport {
  id: string;
  timestamp: number;
  latitude: number;
  longitude: number;
  photoUrl?: string;
  voiceUrl?: string;
  note?: string;
  status: ReportStatus;
  locationName?: string;
}

export interface UserState {
  reports: RoadReport[];
}
