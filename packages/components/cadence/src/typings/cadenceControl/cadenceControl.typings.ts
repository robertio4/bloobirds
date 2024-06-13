import React, { SetStateAction } from 'react';

import { BobjectTypes, BulkActions } from '@bloobirds-it/types';

import { STEPS } from '../../components/cadenceControlModal/cadenceControlModal.machine';

export interface ProviderProps {
  children?: React.ReactElement;
  bobject: any;
  initialStep?: StepInfo;
}

export interface StepInfo {
  step: STEPS;
  hadStartedCadence: boolean;
}

export interface ContextProps extends ProviderProps {
  isOpportunity: boolean;
  isLead: boolean;
  isCompany: boolean;
  bobjectName: string;
  stepInfo: StepInfo;
  setStepInfo: React.Dispatch<SetStateAction<StepInfo>>;
  cadenceManagement: any;
  cadenceWasStarted: boolean;
}

export interface QueuedBulkProps {
  action: BulkActions;
  total: number;
  bobjectType: BobjectTypes;
  bobjectIds?: string[];
  contents: { [x: string]: string };
  query?: {
    query: any;
    sort: string[];
    formFields: boolean;
    page: number;
    pageSize: number;
    injectReferences: boolean;
  };
  params?: { startCadenceDate: string; cadenceId: string };
}
