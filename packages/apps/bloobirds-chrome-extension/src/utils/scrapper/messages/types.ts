export interface OldLinkedInMessage {
  body: string;
  profile: string;
  lead: string;
  time: string;
  name: string;
  date: string;
  leadId: string;
  bloobirdsId?: string;
}

export interface LinkedInMessage {
  body: string;
  leadLinkedInUrl: string;
  leadLinkedInId: string;
  dateTimeMinutes: string;
  dateTimeSeconds: string;
  threadPathname: string;
  incoming: boolean;
  oldHash: string;
  leadId?: string;
  bloobirdsId?: string;
  fullName?: string;
}
