import { useForm } from 'react-hook-form';

import { useStatus } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import { WizardsModalParams } from '@bloobirds-it/wizard-modal-context';
import { TFunction } from 'i18next';

import { useNoteData } from '../hooks/useNoteData';
import { getIsAnyEmailOrWhatsappOrToday } from '../hooks/useStatusNoteActions.utils';

export enum TASK_STATE {
  IDLE,
  COMPLETING,
  COMPLETED,
}
export interface StatusNoteActionContextType
  extends ReturnType<typeof useStatus>,
    WizardsModalParams,
    ReturnType<typeof useNoteData>,
    ReturnType<typeof getIsAnyEmailOrWhatsappOrToday> {
  activity: Bobject<BobjectTypes.Activity>;
  bobject;
  bobjectType;
  formMethods: ReturnType<typeof useForm>;
  handleSelectedReason: [any, (value: any) => void];
  handleSelectedUser: [any, (value: any) => void];
  handleSelectedStatus: [any, (value: any) => void];
  handleErrors: [any, () => void];
  isAssigned;
  hasStartedCadence;
  handleUpdateStatus: (values: any) => Promise<any>;
  isInactive: boolean;
  t: TFunction;
  hasNoStatusPlanEnabled: boolean;
  activityLead: Bobject<BobjectTypes.Lead>;
  activityCompany: Bobject<BobjectTypes.Company>;
  setLoading: (value: boolean) => void;
}
