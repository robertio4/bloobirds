import React, { useEffect, useState } from 'react';
import { CheckItem, MultiSelect } from '@bloobirds-it/flamingo-ui';
import { MainBobjectTypes, useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';
import { subhomeAvailableBobjectTypes } from '../../../../../utils/subhomeFilters.utils';
import { useBobjectTypes } from '../../../../../hooks/useBobjectTypes';
import { useFullSalesEnabled } from '../../../../../hooks/useFeatureFlags';

const selectableBobjectsItems = (hasSalesEnabled: boolean) => {
  const itemComponents: JSX.Element[] = [];
  const availableBobjects = subhomeAvailableBobjectTypes(hasSalesEnabled);
  const bobjectTypesObj = useBobjectTypes();
  const bobjectTypes = bobjectTypesObj?.all()?.filter(bobject => {
    return availableBobjects.includes(bobject?.name);
  });
  bobjectTypes?.forEach(bobjectType => {
    itemComponents.push(
      <CheckItem key={bobjectType.id} value={bobjectType?.name}>
        {bobjectType.name}
      </CheckItem>,
    );
  });

  return itemComponents;
};

export const RelatedBobjectFilter = () => {
  const {
    filters,
    setFilterConditions,
    setHaveFiltersBeenChanged,
    setSubqueryBobjectType,
  } = useSubhomeFilters();
  const hasSalesEnabled = useFullSalesEnabled();
  const relatedBobjectType = filters?.conditions?.relatedBobjectType;
  const [value, setValue] = useState(relatedBobjectType);
  const children = selectableBobjectsItems(hasSalesEnabled);

  const handleOnChange = (value: MainBobjectTypes | MainBobjectTypes[]) => {
    setFilterConditions('relatedBobjectType', value);
    setHaveFiltersBeenChanged(true);

    if (setSubqueryBobjectType) setSubqueryBobjectType(value);
  };

  useEffect(() => {
    setValue(relatedBobjectType);

    if (!relatedBobjectType && setSubqueryBobjectType) setSubqueryBobjectType([]);
  }, [relatedBobjectType]);

  return (
    <MultiSelect
      size="small"
      variant="filters"
      selectAllOption
      placeholder="Tasks"
      onChange={handleOnChange}
      value={value ?? []}
    >
      {children}
    </MultiSelect>
  );
};
