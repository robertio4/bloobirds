import React from 'react';

import IntegrationLogs from '../../integrationLayout/integrationsLogsTableV2/integrationLogs';

const Status = ({ crm, syncDirections }) => {
  return <IntegrationLogs integration={crm} />;
};

export default Status;
