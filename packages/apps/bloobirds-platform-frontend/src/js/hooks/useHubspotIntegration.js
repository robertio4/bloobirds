import { useEffect, useMemo, useState } from 'react';

import { UserHelperKeys } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';
import useSWR, { mutate } from 'swr';

import { HUBSPOT_OBJECTS } from '../constants/integrations';
import { ApiHosts } from '../misc/api/ApiHosts';
import { request } from '../misc/api/utils';
import { useEntity } from './entities/useEntity';
import { useActiveUser } from './useActiveUser';
import { useUserHelpers } from './useUserHelpers';

const activeIntegrationAtom = atom({
  key: 'activeHubspotIntegration',
  default: {
    accountTriggers: {},
    dealPipelines: undefined,
    pipeArray: [],
    isLoaded: false,
    dealsLoaded: false,
    triggersLoaded: false,
    hasError: false,
  },
});

export const useHubspotIntegration = () => {
  const [activeIntegration, setActiveIntegration] = useRecoilState(activeIntegrationAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { activeAccount } = useActiveUser();
  const { save } = useUserHelpers();

  const integration = useEntity('integrationHubspots')?.all()[0];

  const getDealPipelines = url =>
    request({
      host: ApiHosts.webService.host(),
      includeAuth: true,
      url,
      method: 'GET',
    });

  const { data: dealPipelines } = useSWR(
    integration && !activeIntegration.dealsLoaded && '/hubspot/dealPipelines',
    getDealPipelines,
  );

  const standardTriggers = useEntity('standardTriggers')
    ?.all()
    ?.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.id]: curr.name,
      }),
      {},
    );

  const accountTriggers = useEntity('accountBobjectTriggers')?.all();

  const reducedAccountTriggers = useMemo(
    () =>
      standardTriggers &&
      accountTriggers
        ?.filter(trigger => standardTriggers[trigger.standardTrigger]?.includes('HUBSPOT'))
        .reduce(
          (acc, curr) => ({
            ...acc,
            [standardTriggers[curr.standardTrigger]]: {
              jsonConfig: JSON.parse(curr.jsonConfig),
              active: curr.active,
              id: curr.id,
            },
          }),
          {},
        ),

    [accountTriggers, standardTriggers],
  );
  const handleIntegration = integrationResponse => {
    setActiveIntegration({
      ...integrationResponse,
      ...activeIntegration,
      accountTriggers: reducedAccountTriggers,
      triggersLoaded: true,
      isLoaded: true,
      hasError: false,
    });
  };

  useEffect(() => {
    if (activeAccount && reducedAccountTriggers && integration) {
      handleIntegration(integration);
    }
  }, [activeAccount, integration]);

  useEffect(() => {
    if (Array.isArray(dealPipelines) && !activeIntegration.dealsLoaded) {
      setActiveIntegration({
        ...activeIntegration,
        dealPipelines: dealPipelines?.reduce(
          (acc, curr) => ({
            ...acc,
            [curr.pipelineId]: curr.stages,
          }),
          {},
        ),
        pipeArray: dealPipelines,
        dealsLoaded: dealPipelines !== undefined,
      });
    }
  }, [dealPipelines]);

  const createIntegration = (oauthCode, handleError) => {
    setIsSubmitting(true);
    api.post('/utils/hubspot/oauth', { code: oauthCode }).then(response => {
      if (response.status === 500) {
        handleError({ hasError: true });
        setActiveIntegration({
          ...activeIntegration,
          isLoaded: false,
          hasError: true,
        });
        setIsSubmitting(false);
      } else {
        createFieldsOnHubspot();
        handleIntegration(response?.data);
        handleError({ hasError: false });
        save(UserHelperKeys.CONNECT_CRM_TOUR);
      }
    });
  };
  const updateScopes = async () => {
    await api.patch('/entities/integrationHubspots/' + activeIntegration.id, {
      addedNewScopes: !activeIntegration.addedNewScopes,
    });
    mutate('/entities/integrationHubspots');
  };

  const createFieldsOnHubspot = () => {
    HUBSPOT_OBJECTS.map(objectType => {
      api.get(`/utils/hubspot/metadata/createFields/${objectType}`);
    });
  };
  const updateTriggers = triggers => {
    setActiveIntegration({
      ...activeIntegration,
      accountTriggers: triggers,
    });
  };

  const disconnectIntegration = () => {
    api
      .get('/utils/hubspot/disconnectIntegration')
      .then(() => setActiveIntegration(activeIntegrationAtom));
  };

  return {
    activeIntegration,
    createIntegration,
    createFieldsOnHubspot,
    isSubmitting,
    disconnectIntegration,
    updateTriggers,
    updateScopes,
  };
};
