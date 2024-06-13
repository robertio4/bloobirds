import { useEntity } from './entities/useEntity';
import { CRM } from '../constants/integrations';

const useHubspot = () => {
  const hubspotIntegration = useEntity('integrationHubspots')?.all()[0];

  return {
    hubspotIntegration: { ...hubspotIntegration, type: CRM.HUBSPOT, active: !!hubspotIntegration },
  };
};

export default useHubspot;
