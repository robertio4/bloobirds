import { useActiveUserId } from '@bloobirds-it/hooks';

import { CRM } from '../constants/integrations';
import { useEntity } from './entities/useEntity';

const useUserSalesforceIntegration = () => {
  const activeUserId = useActiveUserId();
  const salesforceIntegration = useEntity('integrationSalesforces')?.findBy('bloobirdsUser')(
    activeUserId,
  );

  return {
    salesforceIntegration: {
      ...salesforceIntegration,
      type: CRM.SALESFORCE,
      creationDatetime: salesforceIntegration?.creationDatetime,
      bloobirdsUser: activeUserId,
      active: !!salesforceIntegration,
    },
  };
};

export default useUserSalesforceIntegration;
