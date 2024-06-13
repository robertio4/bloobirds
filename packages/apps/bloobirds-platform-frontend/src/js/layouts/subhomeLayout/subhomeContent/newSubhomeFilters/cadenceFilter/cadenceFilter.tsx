import { BOBJECT_TYPES, BobjectTypes } from '@bloobirds-it/types';
import { Item, Section, Select } from '@bloobirds-it/flamingo-ui';
import { PROSPECTING_SLUGS } from '../../../../../pages/subhomePages/subhomes.constants';
import React, { useCallback, useState } from 'react';
import {
  getBobjectFromLogicRole,
  getFieldIdByLogicRole,
} from '../../../../../utils/bobjects.utils';

import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../../constants/company';
import { CadenceObject } from '../../../../../typings/cadence';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../../constants/opportunity';
import { useBobjectTypes } from '../../../../../hooks/useBobjectTypes';
import { useCadences } from '../../../../../hooks/useCadences';
import { useFullSalesEnabled } from '../../../../../hooks/useFeatureFlags';
import { useParams } from 'react-router-dom';
import { useSubhomeFilters } from '../../../../../hooks/useSubhomeFilters';

interface CadenceByBobjectType {
  [key: string]: Record<string, string>[];
}

const getAvailableBobjects = (conditionalBobject: string, slug: string) => {
  const isFullSalesEnabled = useFullSalesEnabled();
  const isProspectingTab = Object.values(PROSPECTING_SLUGS).includes(slug);

  if (conditionalBobject) {
    return [conditionalBobject];
  }
  if (!isProspectingTab && isFullSalesEnabled) {
    return [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD, BOBJECT_TYPES.OPPORTUNITY];
  } else {
    return [BOBJECT_TYPES.COMPANY, BOBJECT_TYPES.LEAD];
  }
};

const CadenceFilter = () => {
  const {
    filters: { conditions },
    setFilter,
    removeFilter,
    getFilterValue,
  } = useSubhomeFilters();

  const [filterFieldLR, setFilterFieldLR] = useState(COMPANY_FIELDS_LOGIC_ROLE.CADENCE);

  const { slug } = useParams();
  const availableBobjects = getAvailableBobjects(conditions?.relatedBobjectType, slug);
  const bobjectTypes = useBobjectTypes()
    ?.all()
    ?.filter(bobject => {
      return availableBobjects?.includes(bobject.name);
    });
  const bobjectTypesNames = bobjectTypes.map(type => type?.name);
  const { cadences } = useCadences(bobjectTypesNames);
  let cadencesByBobjectType: CadenceByBobjectType = {};
  cadences?.forEach((cadence: any) => {
    const cadenceBobjectType = cadence?.bobjectType;
    const newNode = cadencesByBobjectType[cadenceBobjectType]
      ? [...cadencesByBobjectType[cadenceBobjectType], cadence]
      : [cadence];
    cadencesByBobjectType = { ...cadencesByBobjectType, [cadenceBobjectType]: newNode };
  });
  const getBobjectTypeName = (bobjectTypeId: string) =>
    bobjectTypes?.find(bobjectType => bobjectType?.id === bobjectTypeId)?.name;

  const generateCadenceSelectItems = useCallback(() => {
    const items: Array<object> = [];

    Object.keys(cadencesByBobjectType)?.forEach(bobjectTypeId => {
      items.push(
        <Section key={bobjectTypeId} id={getBobjectTypeName(bobjectTypeId)}>
          {getBobjectTypeName(bobjectTypeId)}
        </Section>,
      );

      cadencesByBobjectType[bobjectTypeId]?.forEach((cadence: CadenceObject) => {
        items.push(
          <Item
            section={getBobjectTypeName(bobjectTypeId)}
            label={cadence?.name}
            key={cadence?.id}
            value={cadence?.id}
          >
            {cadence?.name}
          </Item>,
        );
      });
    });

    return items;
  }, [cadencesByBobjectType]);

  let cadenceLrByBobject: string;

  const handleOnChange = (value: string) => {
    cadences.forEach((cadence: CadenceObject) => {
      if (cadence.id === value) {
        switch (getBobjectTypeName(cadence?.bobjectType)) {
          case BobjectTypes.Lead:
            cadenceLrByBobject = LEAD_FIELDS_LOGIC_ROLE.CADENCE;
            break;
          case BobjectTypes.Opportunity:
            cadenceLrByBobject = OPPORTUNITY_FIELDS_LOGIC_ROLE.CADENCE;
            break;
          case BobjectTypes.Company:
            cadenceLrByBobject = COMPANY_FIELDS_LOGIC_ROLE.CADENCE;
            break;
        }
      }
    });
    setFilterFieldLR(cadenceLrByBobject);

    if (value === '') {
      removeFilter(getFieldIdByLogicRole(cadenceLrByBobject, cadenceLrByBobject));
    } else {
      setFilter(getBobjectFromLogicRole(cadenceLrByBobject), cadenceLrByBobject, value);
    }
  };
  const value = getFilterValue(filterFieldLR);

  return (
    <Select
      size="small"
      variant="filters"
      placeholder="Cadences"
      value={value ?? ''}
      onChange={handleOnChange}
      autocomplete
    >
      {generateCadenceSelectItems()}
    </Select>
  );
};

export default CadenceFilter;
