import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';
import { Dictionary } from '@bloobirds-it/types';

export type SuggestionStatus = 'accepted' | 'discarded' | 'changed' | 'base';

export interface ActivityInfo {
  icon: IconType | React.ReactNode;
  color: ColorType;
  iconColor?: ColorType;
  subject: string;
  subtitle?: string;
  extraSubtitle?: React.ReactNode;
  description?: React.ReactNode;
  ellipsisOnSubject?: boolean;
  date?: string;
  backgroundColor?: ColorType;
  rightIcon?: React.ReactNode;
  syncName?: string;
}

export interface ObjectWithUpdates {
  updates: SuggestedFieldUpdate[];
  name: string;
  objectId: string;
}

export interface ConfiguredCRMField {
  name: string;
  entity: string;
}

export interface EntityUpdates {
  objects?: Dictionary<ObjectWithUpdates>;
  loaded: boolean;
}
export interface SuggestedFieldUpdate {
  name: string;
  label: string;
  currentValue: string;
  suggestedValue: string;
  values: { name: string; label: string }[];
  acceptedValue: string | undefined;
  status: SuggestionStatus;
  objectId: string;
  entity: string;
}

export interface AcceptedObject {
  entityName: string;
  fields: SuggestedFieldUpdate[];
  objectName: string;
  objectId: string;
}
