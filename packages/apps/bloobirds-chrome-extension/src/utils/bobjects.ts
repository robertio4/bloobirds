import {
  ExtensionBobject,
  ExtensionCompany,
  ExtensionOpportunity,
  LinkedInLead,
  MainBobjectTypes,
} from '@bloobirds-it/types';

import { ContextBobjectsResponse } from '../content/components/contactView/hooks/useContextBobjects';

export const isCompany = (bobject: ExtensionBobject): bobject is ExtensionCompany => {
  return bobject.id.typeName === 'Company';
};

export const isLead = (bobject: ExtensionBobject): bobject is LinkedInLead => {
  return bobject.id.typeName === 'Lead';
};

export const isOpportunity = (bobject: ExtensionBobject): bobject is ExtensionOpportunity => {
  return bobject?.id && bobject?.id?.typeName === 'Opportunity';
};

export function getNewActiveBobject(res: ContextBobjectsResponse, activeBobject: ExtensionBobject) {
  const activeBobjectId = activeBobject?.id?.objectId;
  const activeBobjectType = activeBobject?.id?.typeName as MainBobjectTypes;
  switch (activeBobjectType) {
    case 'Company':
      return res?.data?.company;
    case 'Lead':
      return res?.data?.leads?.find(bobject => bobject.id?.objectId === activeBobjectId);
    case 'Opportunity':
      return res?.data?.opportunities.find(bobject => bobject.id?.objectId === activeBobjectId);
  }
}
