import React from 'react';

import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, BobjectTypes } from '@bloobirds-it/types';

export interface AdminQSGInfoType {
  openedAdminBlocks: string[];
  contactableBobjects: ContactableBobjectsType;
}

export type ContactableBobjectsType =
  | Record<BobjectTypes.Company | BobjectTypes.Lead, { creationDateTime: string; url: string }>
  | Record<string, never>;

type SubStepProps = {
  label: string;
  key: UserHelperKeys;
  linkYoutube?: string;
  linkHowTo?: string;
  linkTour?: string;
  linkNavigation?: string;
};

interface SubStepPropsAdmin extends SubStepProps {
  skippable?: boolean;
  skippableText?: string;
}

export type StepProps = {
  goals: SubStepProps[];
  title: string;
  icon: IconType;
  iconColor: ColorType;
  defaultOpened?: boolean;
  onClick?: () => void;
  toggleFiltersVisible?: () => void;
};

export interface StepPropsAdmin extends StepProps {
  goals: SubStepPropsAdmin[];
  setTasksCompleted?: (tasksCompleted: (prevState: number) => number) => void;
  setSelectCRMModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
