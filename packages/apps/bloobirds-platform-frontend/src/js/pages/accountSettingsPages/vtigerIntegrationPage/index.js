import GenericIntegrationLayout from '../../../layouts/genericIntegrationLayout';
import { CRM } from '../../../constants/integrations';
import React from 'react';

const VtigerIntegrationPage = () => (
  <GenericIntegrationLayout
    driver="vtiger"
    integrationName="Vtiger"
    syncDirections={['VTIGER']}
    crm={CRM.VTIGER}
  />
);

export default VtigerIntegrationPage;
