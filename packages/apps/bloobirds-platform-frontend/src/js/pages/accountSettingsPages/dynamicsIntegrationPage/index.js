import React from 'react';

import { CRM } from '../../../constants/integrations';
import GenericIntegrationLayout from '../../../layouts/genericIntegrationLayout';

const DynamicsIntegrationPage = () => {
  const fields = [
    {
      name: 'resource',
      defaultValue: '',
      placeholder: 'Dynamic Instance URL',
      inputName: 'resource',
      inputType: 'text',
    },
  ];

  return (
    <GenericIntegrationLayout
      driver="msndynamics"
      integrationName="Microsoft Dynamics"
      syncDirections={['DYNAMICS']}
      crm={CRM.DYNAMICS}
      fields={fields}
    />
  );
};

export default DynamicsIntegrationPage;
