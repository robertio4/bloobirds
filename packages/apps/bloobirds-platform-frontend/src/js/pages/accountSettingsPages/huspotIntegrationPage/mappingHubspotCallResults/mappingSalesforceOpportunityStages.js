import React, { useState } from 'react';
import { useEntity, usePicklistValues } from '../../../../hooks';
import {
  Icon,
  Item,
  Select,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from '@bloobirds-it/flamingo-ui';
import useSWR, { mutate } from 'swr';
import { api } from '../../../../utils/api';
import styles from './mappingHubpotCallResults.css';

const Row = ({ index, status, handleSaveConfig, oppTriggerConfig, salesforceValues }) => {
  return (
    <TableRow key={`row-status-${index}`}>
      <TableCell>
        <Text size="s">{status?.value}</Text>
      </TableCell>
      <TableCell>
        <Select
          placeholder="Select Salesforce stage"
          onChange={value => {
            handleSaveConfig(value, status?.logicRole || status?.id);
          }}
          value={oppTriggerConfig?.stagesMapping[status?.logicRole || status?.id]}
        >
          <Item value={''}> None </Item>
          {salesforceValues?.map(value => {
            return (
              <Item key={value?.label} value={value.value}>
                {value?.label}
              </Item>
            );
          })}
        </Select>
      </TableCell>
    </TableRow>
  );
};

const MappingSalesforceOpportunityStages = () => {
  const statuses = usePicklistValues({ picklistLogicRole: 'OPPORTUNITY__STATUS' });
  const [descending, setDescending] = useState(false);
  const standardTriggers = useEntity('standardTriggers');
  const accountTriggers = useEntity('accountBobjectTriggers');
  const opportunityTrigger = standardTriggers?.find(
    trigger => trigger?.name === 'OPPORTUNITY__SALESFORCE',
  );
  const accountOppTrigger =
    opportunityTrigger &&
    accountTriggers?.find(trigger => trigger?.standardTrigger === opportunityTrigger?.id);
  const { data } = useSWR('/utils/service/salesforce/metadata/Opportunity', key =>
    api.get(key).then(data => data?.data),
  );
  const parsedConfig = JSON.parse(accountOppTrigger?.jsonConfig);

  if (!data) {
    return <Spinner name="loadingCircle" size={24} />;
  }

  const stageField = data?.fields?.find(field => field?.name === 'StageName');
  const stageValues = stageField?.picklistValues;

  if (!parsedConfig && !stageValues) {
    return (
      <Text>
        There was an issue trying to get your Opp stages, please contact support if the problem
        persists.
      </Text>
    );
  }

  const handleSaveConfig = (salesforceKeyName, bloobirdsLogicRole) => {
    let newJsonConfigStagesMapping = parsedConfig?.stagesMapping;
    if (typeof newJsonConfigStagesMapping === 'string') newJsonConfigStagesMapping = {};
    if (!salesforceKeyName) {
      delete newJsonConfigStagesMapping[bloobirdsLogicRole];
    } else {
      newJsonConfigStagesMapping[bloobirdsLogicRole] = salesforceKeyName;
    }
    const jsonConfig = {
      ...parsedConfig,
      stagesMapping: { ...newJsonConfigStagesMapping },
    };
    api
      .patch(`/entities/accountBobjectTriggers/${accountOppTrigger?.id}`, {
        jsonConfig: JSON.stringify(jsonConfig),
      })
      .then(() => {
        mutate(`/entity/accountBobjectTriggers`);
      });
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableCell onClick={() => setDescending(!descending)}>
            <div className={styles._cell_header}>
              <Text size="xs" uppercase>
                Bloobirds status
              </Text>
              <Icon name={descending ? 'arrowDown' : 'arrowUp'} size="16" color="peanut" />
            </div>
          </TableCell>
          <TableCell>
            <Text size="xs" uppercase>
              Salesforce opportunity stages
            </Text>
          </TableCell>
        </TableHead>
        <TableBody>
          {statuses
            ?.sort((a, b) => {
              if (descending) {
                return a.value < b.value ? 1 : -1;
              }
              return a.value > b.value ? 1 : -1;
            })
            ?.map((status, index) => {
              return (
                <Row
                  key={index}
                  status={status}
                  index={index}
                  handleSaveConfig={handleSaveConfig}
                  oppTriggerConfig={parsedConfig}
                  salesforceValues={stageValues}
                />
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};
export default MappingSalesforceOpportunityStages;
