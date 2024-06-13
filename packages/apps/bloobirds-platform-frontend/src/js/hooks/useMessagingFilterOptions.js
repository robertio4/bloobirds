import { useSegmentation } from './useSegmentation';
import { useEntity } from './entities/useEntity';
import { sortBy } from 'lodash';
import { useBobjectTypes } from './useBobjectTypes';

export const useMessagingFilterOptions = stage => {
  const { segmentations } = useSegmentation(stage);
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const bobjectTypes = useBobjectTypes();

  const fieldType = useEntity('fieldTypes');

  const globalPicklistFieldId = fieldType?.findBy('enumName')('GLOBAL_PICKLIST')?.id;

  if (
    !bobjectFields ||
    !bobjectPicklistFieldValues ||
    segmentations.length === 0 ||
    !bobjectTypes
  ) {
    return [];
  }

  const bobjectFieldIds = Object.values(segmentations)
    .filter(value => value.bobjectFieldId)
    .map(key => key.bobjectFieldId);

  return bobjectFieldIds?.map(bobjectFieldsId => {
    const bobjectField = bobjectFields.findBy('id', bobjectFieldsId);
    const bobjectType = bobjectField?.bobjectType;
    const isGlobalPicklist = bobjectField?.fieldType === globalPicklistFieldId;

    const picklistValues = isGlobalPicklist
      ? bobjectPicklistFieldValues.filterBy(
          'bobjectGlobalPicklist',
          bobjectField?.bobjectGlobalPicklist,
        )
      : bobjectPicklistFieldValues.filterBy('bobjectField', bobjectFieldsId);

    const values = picklistValues.map(picklistValue => ({
      id: picklistValue.id,
      name: picklistValue.value,
      enabled: picklistValue.enabled,
    }));

    return {
      id: bobjectFieldsId,
      label: bobjectField?.name !== 'ICP' ? bobjectField?.name : 'Buyer Persona',
      values: sortBy(values, 'name'),
      bobjectType: bobjectTypes.findBy('id')(bobjectType)?.name,
    };
  });
};
