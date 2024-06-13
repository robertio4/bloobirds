import React from 'react';

import { BOBJECT_TYPES } from '@bloobirds-it/types';

import {
  APP_CL_LEADS,
  APP_TASKS_ADD_QC,
  APP_TASKS_INBOUND,
} from '../../../../app/_constants/routes';
import { useBobjectFormCreation } from '../../../../hooks';
import AddButton from './addButton.view';

const AddButtonContainer = ({ bobjectType }) => {
  const { openAddCompany, openAddLead, openAddLeadWithoutCompany } = useBobjectFormCreation();

  const handleAddNew = (bobjectTypeName, location) => {
    const pathname = location.pathname;

    if (bobjectTypeName === BOBJECT_TYPES.COMPANY) {
      return openAddCompany();
    }
    if (
      pathname === APP_CL_LEADS ||
      pathname?.startsWith(APP_TASKS_INBOUND) ||
      pathname?.startsWith(APP_TASKS_ADD_QC)
    ) {
      return openAddLeadWithoutCompany();
    }
    return openAddLead();
  };
  return <AddButton handleAddNew={handleAddNew} bobjectType={bobjectType} />;
};

export default AddButtonContainer;
