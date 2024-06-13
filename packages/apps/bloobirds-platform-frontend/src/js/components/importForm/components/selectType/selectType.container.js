import React from 'react';
import SelectTypeView from './selectType.view';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';

const transformResponse = data => {
  const importableBobjectTypes = {
    Company: 0,
    Lead: 1,
    Activity: 2,
    Opportunity: 3,
    Task: 4,
  };

  return data
    ?.reduce((prev, curr) => [...prev, { id: curr.id, name: curr.name }], [])
    .filter(o => Object.keys(importableBobjectTypes).includes(o.name))
    .sort((a, b) => (importableBobjectTypes[a.name] > importableBobjectTypes[b.name] ? 1 : -1));
};

const SelectTypeContainer = () => {
  const salesFeatureEnabled = useFullSalesEnabled();
  const bobjectTypes = useBobjectTypes()?.all();

  return (
    <SelectTypeView
      bobjectTypes={transformResponse(
        bobjectTypes?.filter(type =>
          !salesFeatureEnabled ? !type.name.includes('Opportunity') : true,
        ),
      )}
    />
  );
};

export default SelectTypeContainer;
