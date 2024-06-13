import { useEffect, useMemo, useState } from 'react';

import { useNoStatusOppSetting } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';
import useSWR from 'swr';
import useSWRImmutable from 'swr/immutable';

import { RestApi } from '../misc/api/rest';
import { api } from '../utils/api';
import { useEntity } from './entities/useEntity';
import { useActiveUser } from './useActiveUser';
import { useUserHelpers } from './useUserHelpers';

const activeIntegrationAtom = atom({
  key: 'activeSalesforceIntegration',
  default: {
    id: '',
    clientId: '',
    instanceHost: '',
    salesforceUser: '',
    integrationId: '',
    creationDatetime: '',
    accountTriggers: {},
    hasError: false,
    isLoaded: false,
  },
});

export const useSalesforceIntegration = () => {
  const [activeIntegration, setActiveIntegration] = useRecoilState(activeIntegrationAtom);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isNoStatusOppActive = useNoStatusOppSetting();

  const { activeAccount } = useActiveUser();
  const integration = useEntity('integrationSalesforces')?.all()[0];
  const standardSalesforceTriggers = useEntity('standardTriggers')?.all();
  const accountTriggers = useEntity('accountBobjectTriggers')?.all();
  const reducedStandardTriggers = useMemo(
    () =>
      standardSalesforceTriggers?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr.name,
        }),
        {},
      ),
    [standardSalesforceTriggers],
  );

  const { save } = useUserHelpers();

  const reducedAccountTriggers = useMemo(
    () =>
      standardSalesforceTriggers &&
      accountTriggers
        ?.filter(trigger =>
          reducedStandardTriggers[trigger.standardTrigger]?.includes('SALESFORCE'),
        )
        .reduce(
          (acc, curr) => ({
            ...acc,
            [reducedStandardTriggers[curr.standardTrigger]]: {
              jsonConfig: JSON.parse(curr.jsonConfig),
              active: curr.active,
              id: curr.id,
            },
          }),
          {},
        ),
    [accountTriggers, standardSalesforceTriggers],
  );

  useEffect(() => {
    if (integration && activeAccount) {
      setActiveIntegration({
        ...activeIntegration,
        id: integration.id,
        clientId: integration.clientId,
        instanceHost: integration.instanceHost,
        salesforceUser: integration.salesforceUser,
        creationDatetime: integration.creationDatetime,
        model: integration.model,
        accountTriggers: reducedAccountTriggers,
        isLoaded: true,
        hasError: false,
      });
    }
  }, [activeAccount, integration]);

  const getSalesforceUsers = async () => {
    await api.post('/utils/service/salesforceUsers/getUsers', {});
  };

  const setUpIntegration = async () => {
    await api.get('/utils/service/salesforce/initMappings');
    await api.post('/utils/service/salesforceUsers/updateUsers?pageSize=25', {});
    api.get('/utils/service/salesforce/createCrmFields');
  };

  const createOauthIntegration = async bodyRequest => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      await api.post(`/utils/service/salesforce/oauthIntegration`, bodyRequest);
      setUpIntegration();
    }
    setIsSubmitting(false);
  };

  const createIntegration = (
    { inputClientId, inputInstanceHost, inputSalesforceUser },
    handleError,
  ) => {
    setIsSubmitting(true);
    const bodyRequest = {
      clientId: inputClientId,
      instanceHost: inputInstanceHost,
      salesforceUser: inputSalesforceUser,
    };
    return api.post(`/utils/service/salesforce/testIntegration`, bodyRequest).then(response => {
      if (response.status === 200) {
        api.get('/utils/service/salesforce/initMappings').then(r => {
          if (r.status === 200) {
            //TODO: we should await for each of these calls
            api.get('/utils/service/salesforce/createAccountFields');
            api.get('/utils/service/salesforce/createLeadFields');
            api.get('/utils/service/salesforce/createActivityFields');
            api.get('/utils/service/salesforce/createOpportunityFields').then(({ status }) => {
              if (status === 200) {
                setIsSubmitting(false);
                getSalesforceUsers();
                setActiveIntegration({
                  clientId: inputClientId,
                  instanceHost: inputInstanceHost,
                  salesforceUser: inputSalesforceUser,
                  accountTriggers: reducedAccountTriggers,
                  hasError: false,
                  isLoaded: true,
                });
                handleError({ hasError: false });
              }
            });
            save(UserHelperKeys.CONNECT_CRM_TOUR);
          }
        });
      } else {
        setIsSubmitting(false);
        setActiveIntegration({
          ...activeIntegration,
          isLoaded: false,
          hasError: true,
        });
        if (response.status === 400) {
          handleError({
            hasError: true,
            message: ' Salesforce user profile is not System Administrator',
          });
        } else {
          handleError({
            hasError: true,
            message: ' Are you sure you filled all the fields correctly?',
          });
        }
      }
      return response;
    });
  };

  const updateIntegration = newIntegration =>
    RestApi.patch({
      entity: 'integrationSalesforces',
      id: activeIntegration.id,
      body: newIntegration,
    }).then(() => setActiveIntegration({ ...activeIntegration, newIntegration }));

  const updateAccountTriggers = actTrigger => {
    setActiveIntegration({
      ...activeIntegration,
      accountTriggers: actTrigger,
    });
  };

  const disconnectIntegration = () => {
    api.get('/utils/service/salesforce/disconnectIntegration').then(() => setActiveIntegration({}));
  };

  const { data: recordTypes } = useSWRImmutable(
    isNoStatusOppActive && '/utils/service/salesforce/getRecordTypes',
  );

  return {
    activeIntegration,
    createIntegration,
    isSubmitting,
    disconnectIntegration,
    updateAccountTriggers,
    updateIntegration,
    createOauthIntegration,
    getSalesforceUsers,
    setActiveIntegration,
    recordTypes,
  };
};

const getOppStages = url => {
  api.get(url).then(r => r);
};
const useSalesforceOpportuntiyStages = recordTypeId => {
  const isNoStatusOppActive = useNoStatusOppSetting();
  const { data: opportunityStages } = useSWR(
    isNoStatusOppActive && `/utils/service/salesforce/opportunityStages/${recordTypeId}`,
    getOppStages,
  );
  return opportunityStages;
};
