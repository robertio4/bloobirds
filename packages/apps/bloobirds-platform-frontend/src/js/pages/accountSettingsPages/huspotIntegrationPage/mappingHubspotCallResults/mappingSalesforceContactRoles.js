import React, { useEffect, useMemo, useState } from 'react';
import { api } from '../../../../utils/api';
import { Item, Select, TableCell, TableRow, Text } from '@bloobirds-it/flamingo-ui';
import MappingHubspotCallResultsView from './mappingHubspotCallResults.view';
import useSWR, { mutate } from 'swr';
import { useSalesforceIntegration } from '../../../../hooks/useSalesforceIntegration';

const MappingSalesforceContactRoles = ({ oppFields }) => {
  const [descending, setDescending] = useState(false);
  const { activeIntegration } = useSalesforceIntegration();

  const [oppTriggerConfig, setOppTriggerConfig] = useState(
    activeIntegration?.accountTriggers?.OPPORTUNITY__SALESFORCE.jsonConfig,
  );

  useEffect(() => {
    setOppTriggerConfig(activeIntegration?.accountTriggers?.OPPORTUNITY__SALESFORCE.jsonConfig);
  }, [activeIntegration?.accountTriggers]);

  const { data: sfdcContactRoles } = useSWR(
    `/utils/service/salesforce/metadata/OpportunityContactRole`,
    async () =>
      await api
        .get(`/utils/service/salesforce/metadata/OpportunityContactRole`, {
          headers: { 'Content-Type': 'application/json' },
          data: {},
        })
        .then(res => res.data),
  );

  const sfdcContactRolesValues = useMemo(
    () =>
      sfdcContactRoles?.fields
        ?.filter(field => field.picklistValues.length > 0 && field.name === 'Role')
        .map(field =>
          field.picklistValues
            ?.filter(picklistValue => picklistValue.active)
            .reduce((acc, curr) => [...acc, { name: curr.value, label: curr.label }], []),
        )[0],
  );

  const reducedOppContactRole = useMemo(
    () =>
      oppFields &&
      Object.entries(oppTriggerConfig?.contactRolesMapping || {})
        ?.sort((a, b) => {
          if (descending) {
            return a[0] < b[0] ? 1 : -1;
          }
          return a[0] > b[0] ? 1 : -1;
        })
        .reduce(
          (acc, curr) => ({
            ...acc,
            [curr[0]]: {
              contactRole: curr[1],
              bobjectFieldName: oppFields?.find(oppField => oppField.logicRole === curr[0])?.name,
            },
          }),
          {},
        ),
    [oppTriggerConfig, descending],
  );
  const handleSaveConfig = (config, logicRole) => {
    const opportunityTrigger = activeIntegration?.accountTriggers?.OPPORTUNITY__SALESFORCE;
    const contactRolesMapping = { ...oppTriggerConfig?.contactRolesMapping, [logicRole]: config };
    const jsonConfig = { ...oppTriggerConfig, contactRolesMapping };
    api
      .patch(`/entities/accountBobjectTriggers/${opportunityTrigger.id}`, {
        ...opportunityTrigger,
        jsonConfig: JSON.stringify(jsonConfig),
      })
      .then(() => {
        setOppTriggerConfig({ ...oppTriggerConfig, contactRolesMapping });
        mutate(`/entity/accountBobjectTriggers`);
      });
  };

  const contactRoleRow = useMemo(() => {
    const selectedValues = Object.values(oppTriggerConfig?.contactRolesMapping || {}).filter(
      value => value,
    );
    return (
      activeIntegration?.accountTriggers &&
      Object.entries(reducedOppContactRole || {})?.map(
        (contactRole, index) => {
          const items =
            sfdcContactRolesValues?.filter(role => !selectedValues.includes(role.name)) || [];
          if (oppTriggerConfig?.contactRolesMapping[contactRole[0]]) {
            items.push({
              name: oppTriggerConfig?.contactRolesMapping[contactRole[0]],
              label: oppTriggerConfig?.contactRolesMapping[contactRole[0]],
            });
          }
          return (
            <TableRow key={`row-status-${index}`}>
              <TableCell>
                <Text size="s">{contactRole[1].bobjectFieldName}</Text>
              </TableCell>
              <TableCell>
                {activeIntegration && (
                  <Select
                    placeholder="Select contact role"
                    onChange={value => {
                      handleSaveConfig(value, contactRole[0]);
                      selectedValues.push(value);
                    }}
                    value={oppTriggerConfig?.contactRolesMapping[contactRole[0]]}
                  >
                    <Item value={''}>None</Item>
                    {items.map((mapping, i) => (
                      <Item key={mapping?.label} value={mapping?.name}>
                        {mapping?.label}
                      </Item>
                    ))}
                  </Select>
                )}
              </TableCell>
            </TableRow>
          );
        },
        [sfdcContactRolesValues, reducedOppContactRole, activeIntegration, oppTriggerConfig],
      )
    );
  });
  return (
    <>
      <MappingHubspotCallResultsView
        titleColumns={['Bloobirds contact role', 'Salesforce contact role']}
        handleSorting={setDescending}
        descending={descending}
        row={contactRoleRow}
      />
    </>
  );
};
export default MappingSalesforceContactRoles;
