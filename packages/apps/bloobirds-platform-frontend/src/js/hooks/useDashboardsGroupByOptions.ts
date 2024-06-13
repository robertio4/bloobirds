import { sortBy } from 'lodash';
import { useEntity } from './entities/useEntity';
import { useBobjectTypes } from './useBobjectTypes';
import { useNewDashboardEnabled } from './useFeatureFlags';
import { BobjectType } from '../typings/bobjects';
export interface BobjectFieldOption {
  id: string;
  bobjectGlobalPicklist: string;
  name: string;
  bobjectType: string;
}

export const useDashboardsGroupByOptions = ({
  bobjectType,
  excludedLogicRoles,
}: {
  bobjectType: BobjectType;
  excludedLogicRoles: string[];
}): BobjectFieldOption[] => {
  const isNewDashboardEnabled = useNewDashboardEnabled();
  const bobjectFields = useEntity('bobjectFields');
  const conditionalFields = useEntity('bobjectConditionalFields');
  const bobjectTypes = useBobjectTypes();
  const fieldType = useEntity('fieldTypes');

  const bobjectTypeId = bobjectTypes?.findBy('name')(bobjectType)?.id;
  const picklistFieldId = fieldType?.findBy('enumName')('PICKLIST')?.id;
  const globalPicklistFieldId = fieldType?.findBy('enumName')('GLOBAL_PICKLIST')?.id;
  const fields = bobjectFields?.filterBy('bobjectType', bobjectTypeId);

  if (fields && conditionalFields && !isNewDashboardEnabled) {
    return sortBy(
      fields.filter((field: any) => {
        const isPicklist =
          (picklistFieldId && field.fieldType === picklistFieldId) ||
          (globalPicklistFieldId && field.fieldType === globalPicklistFieldId);
        const isConditionalField = conditionalFields?.findBy('bobjectField')(field.id);
        return (
          !excludedLogicRoles.includes(field.logicRole) &&
          field.enabled === true &&
          field.bobjectFieldGroup !== null &&
          isPicklist &&
          field.reportingEnabled &&
          !isConditionalField
        );
      }),
      'reportingName',
    );
  }

  if (fields && conditionalFields && isNewDashboardEnabled) {
    return sortBy(
      fields.filter((field: any) => {
        const isPicklist =
          (picklistFieldId && field.fieldType === picklistFieldId) ||
          (globalPicklistFieldId && field.fieldType === globalPicklistFieldId);
        return (
          !excludedLogicRoles.includes(field.logicRole) && field.enabled === true && isPicklist
        );
      }),
      'name',
    );
  }
  return [];
};
