import { useEntity } from './entities/useEntity';
import { BobjectPicklistValueEntity } from '../typings/entities.js';

export const usePicklistValues = ({
  picklistLogicRole,
}: {
  picklistLogicRole: string;
}): BobjectPicklistValueEntity[] => {
  const fields = useEntity('bobjectFields');
  const values = useEntity('bobjectPicklistFieldValues');

  if (!fields || !values) {
    return [];
  }

  return values.filterBy('bobjectField', fields.findByLogicRole(picklistLogicRole)?.id);
};

export const useGlobalPicklistValues = ({
  logicRole,
}: {
  logicRole: string;
}): BobjectPicklistValueEntity[] => {
  const bobjectGlobalPicklist = useEntity('bobjectGlobalPicklists');
  const values = useEntity('bobjectPicklistFieldValues');

  if (!bobjectGlobalPicklist || !values) {
    return [];
  }
  const globalPicklist = bobjectGlobalPicklist?.findByLogicRole(logicRole);
  return values.filterBy('bobjectGlobalPicklist', globalPicklist?.id);
};
