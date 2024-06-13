import React from 'react';
import { Button } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '../../../../typings/bobjects';
import useUpdatePropertyModal from '../modals/updatePropertyModal/useUpdatePropertyModal';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';

const getProps = (propertyToEdit: EditableProperties) => {
  switch (propertyToEdit) {
    case 'targetMarket':
      return { iconLeft: 'target', children: 'Edit Target Market' };
    case 'buyerPersona':
      return { iconLeft: 'target', children: 'Edit Buyer Persona' };
    default:
      return { children: 'Edit properties' };
  }
};

type EditableProperties = 'targetMarket' | 'buyerPersona';
const EDITABLE_LR: Record<EditableProperties, string> = {
  targetMarket: COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET,
  buyerPersona: LEAD_FIELDS_LOGIC_ROLE.ICP,
};
export const BulkEditProperties = ({
  bobjects,
  propertyToEdit,
  bulkStage,
  useEveryObject,
}: {
  bobjects?: Bobject[];
  propertyToEdit?: EditableProperties;
  bulkStage: string;
}) => {
  const props = getProps(propertyToEdit);
  const { setBobjectsAndOpenUpdatePropertyModal } = useUpdatePropertyModal();

  return (
    <Button
      variant="clear"
      iconLeft="noteAction"
      uppercase={false}
      {...props}
      onClick={() =>
        setBobjectsAndOpenUpdatePropertyModal(
          bobjects,
          bulkStage,
          EDITABLE_LR[propertyToEdit],
          useEveryObject,
        )
      }
    />
  );
};
