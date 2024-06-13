import React, { useEffect, useState } from 'react';

import { SearchInput } from '@bloobirds-it/flamingo-ui';
import { BobjectTypes } from '@bloobirds-it/types';

import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/opportunity';
import { useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';

export const NameSearchFilter = () => {
  const { setFilter, getFilterValue } = useSubhomeFilters();

  const [nameValue, setNameValue] = useState<string>(
    getFilterValue(OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
  );

  function resetNameFilter() {
    setNameValue('');
  }

  const controlValue = getFilterValue(OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);

  useEffect(() => {
    if (!controlValue) setNameValue('');
  }, [controlValue]);
  const handleOnSubmit = (nameValue: string) => {
    setFilter(BobjectTypes.Opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME, nameValue);
  };
  return (
    <SearchInput
      size="small"
      width="160px"
      onChange={setNameValue}
      onKeyPress={e => {
        if (e.key === 'Enter' && nameValue !== '') {
          handleOnSubmit(nameValue);
        } else if (e.key === 'Enter' && nameValue === '') {
          resetNameFilter();
        }
      }}
      value={nameValue}
      placeholder="Opportunity name..."
    />
  );
};
