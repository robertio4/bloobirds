import { useMemo } from 'react';

import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { sortBy } from 'lodash';

import { LEAD_FIELDS_LOGIC_ROLE } from '../constants/lead';
import { useEntity } from './entities/useEntity';
import { useBobjectTypes } from './useBobjectTypes';

export const useSegmentationValues = bobjectType => {
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const fieldType = useEntity('fieldTypes');

  const bobjectTypeIds = bobjectTypes.all()?.filter(type => bobjectType.includes(type.name));
  const picklistFieldId = fieldType?.findBy('enumName')('PICKLIST')?.id;
  const leadIcp = bobjectFields?.findBy('logicRole')(LEAD_FIELDS_LOGIC_ROLE.ICP);
  const globalPicklistFieldId = fieldType?.findBy('enumName')('GLOBAL_PICKLIST')?.id;

  const parsedFields = useMemo(() => {
    const fields = {};
    if (typeof bobjectType === 'string') {
      fields[bobjectType] = bobjectFields
        ?.filterBy('bobjectType', bobjectTypeIds.id)
        .filter(field => field?.enabled);
      if (bobjectType === BOBJECT_TYPES.COMPANY) {
        fields?.push(leadIcp);
      }
    } else {
      bobjectTypeIds.forEach(type => {
        fields[type.name] = bobjectFields
          ?.filterBy('bobjectType', type.id)
          .filter(field => field?.enabled);
        if (type.name === BOBJECT_TYPES.COMPANY) {
          fields[type.name]?.push(leadIcp);
        }
      });
    }
    return fields;
  }, [bobjectType]);

  return useMemo(() => {
    Object.keys(parsedFields).forEach(bobjectToParse => {
      parsedFields[bobjectToParse] = sortBy(
        parsedFields[bobjectToParse].filter(
          field =>
            field.enabled && [picklistFieldId, globalPicklistFieldId].includes(field?.fieldType),
        ),
        'name',
      );
    });
    return parsedFields;
  }, [parsedFields]);
};
