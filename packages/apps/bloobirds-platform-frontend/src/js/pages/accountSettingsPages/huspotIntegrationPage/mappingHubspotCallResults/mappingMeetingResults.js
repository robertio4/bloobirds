import React, { useMemo, useState } from 'react';
import { usePicklistValues } from '../../../../hooks';
import { useHubspotIntegration } from '../../../../hooks/useHubspotIntegration';
import { Item, Select, TableCell, TableRow, Text } from '@bloobirds-it/flamingo-ui';
import MappingHubspotCallResultsView from './mappingHubspotCallResults.view';
import { RestApi } from '../../../../misc/api/rest';
import { saveTriggerSetting } from '../../../../utils/integration.utils';
import { TRIGGER_MAPPING_NAMES } from '../../../../constants/integrations';
import { mutate } from 'swr';

const MappingMeetingResults = ({ meetingMetadata }) => {
  const meetingResults = usePicklistValues({ picklistLogicRole: 'ACTIVITY__MEETING_RESULT' });
  const [descending, setDescending] = useState(false);
  const { activeIntegration, updateTriggers } = useHubspotIntegration();
  const meetingResultsMapping =
    activeIntegration?.accountTriggers?.MEETING__HUBSPOT?.jsonConfig?.meetingResultsMapping;
  const reducedMeetingResults = useMemo(
    () =>
      meetingResults
        ?.filter(result => result.enabled)
        .sort((a, b) => {
          if (descending) {
            return a.value < b.value ? 1 : -1;
          }
          return a.value > b.value ? 1 : -1;
        })
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr.value]: { name: curr.value, id: curr.id },
          }),
          {},
        ),
    [meetingResults, descending],
  );
  const resultsMapping = useMemo(
    () =>
      activeIntegration.accountTriggers &&
      activeIntegration?.accountTriggers['MEETING__HUBSPOT']?.jsonConfig.meetingResultsMapping,
    [activeIntegration.accountTriggers],
  );

  const handleSaveConfig = (config, logicRole) => {
    const triggers = JSON.parse(JSON.stringify(activeIntegration.accountTriggers));
    const meetingTrigger = triggers.MEETING__HUBSPOT;
    config === ''
      ? delete meetingTrigger.jsonConfig.meetingResultsMapping[logicRole]
      : (meetingTrigger.jsonConfig.meetingResultsMapping[logicRole] = config);
    RestApi.patch({
      entity: 'accountBobjectTriggers',
      id: meetingTrigger.id,
      body: {
        jsonConfig: JSON.stringify(meetingTrigger.jsonConfig),
      },
    }).then(() => {
      mutate('/entity/accountBobjectTriggers');
      updateTriggers(triggers);
    });
    saveTriggerSetting(TRIGGER_MAPPING_NAMES.MEETING__HUBSPOT, meetingTrigger.jsonConfig, '');
  };
  const hubspotMeetingResults = meetingMetadata
    ?.find(field => field.name === 'hs_meeting_outcome')
    ?.options?.reduce(
      (acc, curr) => [
        ...acc,
        {
          label: curr.label,
          value: curr.value,
        },
      ],
      [],
    );
  const meetingRow = useMemo(
    () =>
      activeIntegration.accountTriggers &&
      Object.entries(reducedMeetingResults)?.map((status, index) => (
        <TableRow key={`row-status-${index}`}>
          <TableCell>
            <Text size="s">{status[0]}</Text>
          </TableCell>
          <TableCell>
            <Select
              placeholder="Select meeting outcome"
              onChange={value => {
                handleSaveConfig(value, status[1].id);
              }}
              value={
                meetingResultsMapping[status[1].name]
                  ? meetingResultsMapping[status[1].name]
                  : meetingResultsMapping[status[1].id]
              }
            >
              <Item value={''}> None </Item>
              {hubspotMeetingResults?.map(mapping => (
                <Item key={mapping?.value} value={mapping?.value}>
                  {mapping?.label}
                </Item>
              ))}
            </Select>
          </TableCell>
        </TableRow>
      )),
    [resultsMapping, reducedMeetingResults, activeIntegration.accountTriggers],
  );

  return (
    <MappingHubspotCallResultsView
      titleColumns={['Bloobirds Meeting Results', 'HubSpot meeting outcome']}
      handleSorting={setDescending}
      descending={descending}
      row={meetingRow}
    />
  );
};
export default MappingMeetingResults;
