import useSWR from 'swr';

import { useUserSettings } from '../components/userPermissions/hooks';
import { RestApi } from '../misc/api/rest';

export const fetchScenarios = (accountId: string, showDisabled: boolean) =>
  RestApi.get({
    path: `useCases?account.id=${accountId}&page=0&size=1000&sort=ordering%2CASC${
      showDisabled ? '' : '&enabled=true'
    }`,
  });

// Use this hook in case you want to sort your request, if not use useEntity
export const useScenariosList = (disabled?: true) => {
  const settings = useUserSettings();
  const { data: scenarios } = useSWR([`useCases${disabled ? '' : '?enabled=true'}`], () =>
    fetchScenarios(settings.account.id, disabled),
  );

  return {
    scenarios: scenarios?._embedded?.useCases,
  };
};
