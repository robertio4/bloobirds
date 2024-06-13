import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';

import { TemplateStage } from './templates';

export interface SegmentationFieldValue {
  id: string;
  name: string;
  logicRole: string;
  backgroundColor: ColorType;
  outlineColor: ColorType;
  textColor: ColorType;
  isNurturing: boolean;
  isEnabled: boolean;
  ordering: number;
}

export interface SegmentationEntity {
  id: string;
  name: string;
  logicRole: string;
  reportingColumnName: string;
  fieldType: string;
  layoutIcon: IconType;
  values: [SegmentationFieldValue];
  referencesTo: any;
  required: boolean;
  inboundField: boolean;
  isTemplateVariable: boolean;
  ordering: number;
}

export interface SegmentationData {
  [TemplateStage.Prospecting]: SegmentationEntity[];
  [TemplateStage.Sales]: SegmentationEntity[];
}
