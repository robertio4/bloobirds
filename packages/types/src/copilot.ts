export interface TranscriptFragment {
  speaker: string;
  start: number;
  end: number;
  text: string;
  isLead: boolean;
}

export type TranscriptStatus =
  | 'CANT_GENERATE'
  | 'NOT_GENERATED'
  | 'GENERATED'
  | 'GENERATING'
  | 'NOT_FINISHED'
  | 'ERROR';

export interface ActivityTranscript {
  accountId: string;
  transcript: TranscriptFragment[];
  activityId: string;
  status: TranscriptStatus;
  error: string;
}

export interface ActivityAnalysis {
  accountId: string;
  activityId: string;
  transcriptId: string;
  questions: string[];
  competitors: string[];
  summary: string;
  value_fit: {
    positive_points: string[];
    negative_points: string[];
  };
  status: TranscriptStatus;
}

export type InsightType = 'GENERATION' | 'EXTRACTION' | 'DECISION';

export interface CoreInsightDefinition {
  id: string;
  accountId: string;
  insightType: InsightType;
  title: string;
  searchWords: string;
  activityField: string;
  versionIdentifier: string;
}

export interface PicklistField {
  name: string;
  values: { id: string; value: string }[];
  id: string;
  type: string;
}

export interface Insight {
  pk: string;
  insightId: string;
  accountId: string;
  activityId: string;
  transcriptId: string;
  insight_type: InsightType;
  extracted_values?: string[];
  generated_text?: string;
  choices?: string[];
}

export interface ActivityInsights {
  accountId: string;
  activityId: string;
  transcriptId: string;
  insights: Insight[];
  summary: string;
  status: TranscriptStatus;
}

export interface CRMFieldUpdate {
  name: string;
  value: string;
  entity: string;
}

export interface CRMUpdates {
  accountId: string;
  activityId: string;
  transcriptId: string;
  updates: CRMFieldUpdate[];
  status: TranscriptStatus;
}
