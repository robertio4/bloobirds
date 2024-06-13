import { BobjectPicklistValueEntity, PITCH_DONE_VALUES_LOGIC_ROLE } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { getCallResultPicklistValues } from '../components/callResult/callResult.utils';
import { UseCallResultInterface } from '../types/contactFlowTypes';

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

  const picklistValues = getCallResultPicklistValues(dataModel);

  const findPitchDoneNo = (pitches: BobjectPicklistValueEntity[]) =>
    pitches.find(pitch => pitch.logicRole === PITCH_DONE_VALUES_LOGIC_ROLE.NO);

  const isPitchNo = pitch =>
    findPitchDoneNo(picklistValues?.pitchDonePicklistValues)?.id === pitch?.id;

  return { ...picklistValues, availablePitches, isPitchNo, findPitchDoneNo };
};
