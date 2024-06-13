import React, { useMemo, useState } from 'react';
import { usePicklistValues } from '../../../../hooks';
import { useHubspotIntegration } from '../../../../hooks/useHubspotIntegration';
import { Item, Select, TableCell, TableRow, Text } from '@bloobirds-it/flamingo-ui';
import MappingHubspotCallResultsView from './mappingHubspotCallResults.view';
import { RestApi } from '../../../../misc/api/rest';
import { saveTriggerSetting } from '../../../../utils/integration.utils';
import { TRIGGER_MAPPING_NAMES } from '../../../../constants/integrations';

const MappingHubspotOpportunityStatus = () => {
  const statuses = usePicklistValues({ picklistLogicRole: 'OPPORTUNITY__STATUS' });
  const [descending, setDescending] = useState(false);
  const { activeIntegration, updateTriggers } = useHubspotIntegration();
  const [accountTriggers, setAccountTriggers] = useState(activeIntegration?.accountTriggers);
  const reducedStatuses = useMemo(
    () =>
      statuses
        ?.sort((a, b) => {
          if (descending) {
            return a.value < b.value ? 1 : -1;
          }
          return a.value > b.value ? 1 : -1;
        })
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr.id]: { name: curr.value, logicRole: curr.logicRole },
          }),
          {},
        ),
    [statuses, descending],
  );

  const statusMapping = useMemo(
    () =>
      activeIntegration.accountTriggers &&
      activeIntegration?.dealPipelines[
        activeIntegration.accountTriggers.OPPORTUNITY__HUBSPOT?.jsonConfig.dealPipeline
      ],
    [activeIntegration],
  );

  const handleSaveConfig = (config, logicRole) => {
    const triggers = JSON.parse(JSON.stringify(accountTriggers));
    const opportunityTrigger = triggers.OPPORTUNITY__HUBSPOT;
    config === ''
      ? delete opportunityTrigger.jsonConfig.dealStageMapping[logicRole]
      : (opportunityTrigger.jsonConfig.dealStageMapping[logicRole] = config);
    RestApi.patch({
      entity: 'accountBobjectTriggers',
      id: opportunityTrigger.id,
      body: {
        jsonConfig: opportunityTrigger.jsonConfig,
      },
    }).then(() => {
      setAccountTriggers(triggers);
      updateTriggers(triggers);
    });
    saveTriggerSetting(
      TRIGGER_MAPPING_NAMES.OPPORTUNITY__HUBSPOT,
      opportunityTrigger.jsonConghubspotfig,
      'HUBSPOT',
    );
  };

  const statusRow = useMemo(
    () =>
      activeIntegration?.accountTriggers &&
      Object.entries(reducedStatuses)?.map((status, index) => {
        const defaultValue = accountTriggers.OPPORTUNITY__HUBSPOT?.jsonConfig.dealStageMapping[
          status[1].name
        ]
          ? accountTriggers.OPPORTUNITY__HUBSPOT?.jsonConfig.dealStageMapping[status[1].name]
          : accountTriggers.OPPORTUNITY__HUBSPOT?.jsonConfig.dealStageMapping[status[0]];
        return (
          <TableRow key={`row-status-${index}`}>
            <TableCell>
              <Text size="s">{status[1].name}</Text>
            </TableCell>
            <TableCell>
              {activeIntegration && (
                <Select
                  placeholder="Select Hubspot deal stage"
                  onChange={value => {
                    handleSaveConfig(value, status[0]);
                  }}
                  defaultValue={defaultValue}
                >
                  <Item value={''}> None </Item>
                  {statusMapping?.map(mapping => (
                    <Item key={mapping?.label} value={mapping}>
                      {mapping?.label}
                    </Item>
                  ))}
                </Select>
              )}
            </TableCell>
          </TableRow>
        );
      }),
    [statusMapping, reducedStatuses, accountTriggers, activeIntegration],
  );

  return (
    <>
      <MappingHubspotCallResultsView
        titleColumns={['Bloobirds status', 'HubSpot deal stage']}
        handleSorting={setDescending}
        descending={descending}
        row={statusRow}
      />
    </>
  );
};
export default MappingHubspotOpportunityStatus;
