import React from 'react';
import { BulkEditProperties } from './subComponents/editProperties';
import { BulkAssign } from './subComponents/assign';
import { BulkChangeStatus } from './subComponents/changeStatus';
import { BulkDelete } from './subComponents/delete';
import { BulkResync } from './subComponents/resync';

export const getComponentFromId = (action: BulkActionsPanelTypes): React.ReactNode => {
  switch (action) {
    case 'assign':
      return <BulkAssign />;
    case 'editProperties':
      return <BulkEditProperties />;
    case 'changeStatus':
      return <BulkChangeStatus />;
    case 'editTargetMarket':
      return <BulkEditProperties propertyToEdit={'targetMarket'} />;
    case 'editBuyerPersonas':
      return <BulkEditProperties propertyToEdit={'buyerPersona'} />;
    case 'delete':
      return <BulkDelete />;
    case 'resync':
      return <BulkResync />;
  }
};
