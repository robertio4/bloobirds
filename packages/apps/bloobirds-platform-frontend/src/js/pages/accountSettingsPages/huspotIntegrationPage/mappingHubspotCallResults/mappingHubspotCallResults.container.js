import React, { useEffect, useMemo, useState } from 'react';
import { useActiveUser, useEntity, usePicklistValues } from '../../../../hooks';
import MappingHubspotCallResultsView from './mappingHubspotCallResults.view';
import { Item, Select, TableCell, TableRow, Text } from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';
import { RestApi } from '../../../../misc/api/rest';
import { saveTriggerSetting } from '../../../../utils/integration.utils';
import { TRIGGER_MAPPING_NAMES } from '../../../../constants/integrations';

const MappingHubspotCallResultsContainer = () => {
  const [hubspotCallResults, setHubspotCallResults] = useState([]);
  const [accountTriggers, setAccountTriggers] = useState(undefined);
  const [refreshTriggers, setRefreshTriggers] = useState(true);
  const [descending, setDescending] = useState(false);
  const { activeAccount } = useActiveUser();

  const standardTriggers = useEntity('standardTriggers')
    ?.all()
    .reduce(
      (acc, curr) => ({
        ...acc,
        [curr.name]: curr.id,
      }),
      {},
    );

  const callResults = usePicklistValues({ picklistLogicRole: 'ACTIVITY__CALL_RESULT' });

  const reducedCallResults = useMemo(
    () =>
      callResults
        ?.sort((a, b) => {
          if (descending) {
            return a.value < b.value ? 1 : -1;
          }
          return a.value > b.value ? 1 : -1;
        })
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr.value]: { name: curr.value, logicRole: curr.logicRole },
          }),
          {},
        ),
    [callResults, descending],
  );
  useEffect(() => {
    api
      .get('/utils/hubspot/callResults')
      .then(res => res?.data)
      .then(response => {
        response.map(hubspotCallResult => delete hubspotCallResult.deleted);
        setHubspotCallResults(response);
      });
    if (refreshTriggers) {
      RestApi.search({
        entity: 'accountBobjectTriggers',
        query: {
          accountId: activeAccount.id,
        },
      }).then(response => {
        setAccountTriggers(
          response?._embedded.accountBobjectTriggers.reduce(
            (acc, curr) => ({
              ...acc,
              [curr.standardTrigger]: {
                jsonConfig: JSON.parse(curr.jsonConfig),
                id: curr.id,
              },
            }),
            {},
          ),
        );
        setRefreshTriggers(false);
      });
    }
  }, [refreshTriggers]);

  const activityTrigger = useMemo(
    () => accountTriggers && accountTriggers[standardTriggers.ACTIVITY__HUBSPOT],
    [accountTriggers, standardTriggers],
  );
  const leadTrigger = useMemo(
    () => accountTriggers && accountTriggers[standardTriggers.LEAD__HUBSPOT],
    [accountTriggers, standardTriggers],
  );

  const handleSaveConfig = (config, logicRole) => {
    if (config === '') {
      delete leadTrigger.jsonConfig.hubspotCallResultsMapping[logicRole];
      delete activityTrigger.jsonConfig.hubspotCallResultsMapping[logicRole];
    } else {
      if (leadTrigger.jsonConfig.hubspotCallResultsMapping) {
        leadTrigger.jsonConfig.hubspotCallResultsMapping[logicRole] = config;
      } else {
        leadTrigger.jsonConfig['hubspotCallResultsMapping'] = {
          [logicRole]: config,
        };
      }
      if (activityTrigger.jsonConfig.hubspotCallResultsMapping) {
        activityTrigger.jsonConfig.hubspotCallResultsMapping[logicRole] = config;
      } else {
        activityTrigger.jsonConfig['hubspotCallResultsMapping'] = {
          [logicRole]: config,
        };
      }
    }
    RestApi.patch({
      entity: 'accountBobjectTriggers',
      id: leadTrigger.id,
      body: {
        jsonConfig: JSON.stringify(leadTrigger.jsonConfig),
      },
    }).then(() => {
      RestApi.patch({
        entity: 'accountBobjectTriggers',
        id: activityTrigger.id,
        body: {
          jsonConfig: JSON.stringify(activityTrigger.jsonConfig),
        },
      }).then(() => {
        setRefreshTriggers(true);
      });
    });
    saveTriggerSetting(
      TRIGGER_MAPPING_NAMES.ACTIVITY__SALESFORCE,
      activityTrigger.jsonConfig,
      'HUBSPOT',
    );
    saveTriggerSetting(TRIGGER_MAPPING_NAMES.LEAD__HUBSPOT, leadTrigger.jsonConfig, 'HUBSPOT');
  };

  const callResultsMapping = useMemo(
    () => activityTrigger && activityTrigger.jsonConfig.hubspotCallResultsMapping,
    [activityTrigger],
  );

  const row = useMemo(
    () =>
      callResultsMapping &&
      hubspotCallResults &&
      Object.entries(reducedCallResults)?.map((callResult, index) => (
        <TableRow key={`row-callResult-${index}`}>
          <TableCell>
            <Text size="s">{callResult[0]}</Text>
          </TableCell>
          <TableCell>
            <Select
              placeholder="Select call result"
              onChange={value => handleSaveConfig(value, callResult[1].logicRole)}
              defaultValue={callResultsMapping[callResult[1].logicRole]}
            >
              <Item value={''}> None </Item>
              {hubspotCallResults?.map(hubspotCallResult => (
                <Item value={hubspotCallResult} key={hubspotCallResult?.label}>
                  {hubspotCallResult?.label}
                </Item>
              ))}
            </Select>
          </TableCell>
        </TableRow>
      )),
    [callResults, hubspotCallResults],
  );

  return (
    <>
      {standardTriggers && accountTriggers && hubspotCallResults && (
        <MappingHubspotCallResultsView
          titleColumns={['Bloobirds Call Result', 'HubSpot Call Result']}
          handleSorting={setDescending}
          descending={descending}
          row={row}
        />
      )}
    </>
  );
};
export default MappingHubspotCallResultsContainer;
