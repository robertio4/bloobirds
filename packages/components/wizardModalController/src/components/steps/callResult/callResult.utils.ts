import { ACTIVITY_FIELDS_LOGIC_ROLE, DataModelResponse } from '@bloobirds-it/types';

export const getPitchDonePicklistValues = (dataModel: DataModelResponse) => {
  const pitchDonePicklistValues = dataModel
    ?.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.PITCH_DONE)
    ?.sort((a, b) => (a.value < b.value ? -1 : 1));

  return {
    pitchDonePicklistValues,
  };
};

export const calculateFirstColumnSize = (elements: Array<any>) => {
  if (!elements) return;
  const calculateHalfNumber = (elements: Array<any>) => {
    const isExactHalf = elements.length % 2 === 0;
    return isExactHalf ? elements.length / 2 : Math.floor(elements.length / 2) + 1;
  };

  const halfNumber = calculateHalfNumber(elements);

  return halfNumber >= 6 ? halfNumber : 6;
};
