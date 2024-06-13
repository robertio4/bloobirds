import { BobjectPicklistValueEntity, PITCH_DONE_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { api, getFieldsByType } from '@bloobirds-it/utils';
import { useWizardContext } from '@bloobirds-it/wizard-modal-context';
import useSWR from 'swr';

import {getPitchDonePicklistValues} from '../callResult.utils';
import { UseCallResultInterface } from '../types/callResultTypes';

const fetcher = (url: string) =>
  api
    .post(`${url}?sort=name%2Casc`, {
      type: 'PITCH',
      segmentationValues: {},
    })
    .then(response => response?.data);

export const useCallResult = (dataModel): UseCallResultInterface => {
  const { data: availablePitches } = useSWR<BobjectPicklistValueEntity[]>(
    `/messaging/messagingTemplates/search`,
    fetcher,
  );

  const picklistValues = getPitchDonePicklistValues(dataModel);

  const findPitchDoneNo = (pitches: BobjectPicklistValueEntity[]) =>
    pitches.find(pitch => pitch.logicRole === PITCH_DONE_VALUES_LOGIC_ROLE.NO);

  const isPitchNo = pitch =>
    findPitchDoneNo(picklistValues?.pitchDonePicklistValues)?.id === pitch?.id;

  return {
    ...picklistValues,
    availablePitches,
    isPitchNo,
    findPitchDoneNo,
  };
};

export const useAvailablePhoneFields = (wizardKey, activityLead, activityCompany) => {
  const { getWizardProperties, addMetaToWizardProperties } = useWizardContext();
  let { leadAvailablePhoneFields, companyAvailablePhoneFields } = getWizardProperties(wizardKey);

  leadAvailablePhoneFields = leadAvailablePhoneFields || getFieldsByType(activityLead, 'PHONE');

  companyAvailablePhoneFields =
    companyAvailablePhoneFields || getFieldsByType(activityCompany, 'PHONE');

  addMetaToWizardProperties(wizardKey, { leadAvailablePhoneFields, companyAvailablePhoneFields });
  return { leadAvailablePhoneFields, companyAvailablePhoneFields };
};
