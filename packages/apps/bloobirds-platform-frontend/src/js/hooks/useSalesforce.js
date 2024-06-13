import { CRM } from '../constants/integrations';
import { useEntity } from './entities/useEntity';

const useSalesforce = () => {
  const salesforceIntegration = useEntity('integrationSalesforces')?.all()[0];

  return {
    salesforceIntegration: {
      ...salesforceIntegration,
      instanceHost: salesforceIntegration?.instanceHost,
      type: CRM.SALESFORCE,
      active: !!salesforceIntegration,
    },
  };
};

export default useSalesforce;
