import React, { useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';
import {
  Button,
  Icon,
  IconButton,
  Item,
  Label,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import styles from '../mappings.module.css';
import { BloobirdsFieldCell } from '../fieldsMappings/fieldsMappings';
import { useEntity } from '../../../../hooks';
import { api } from '../../../../utils/api';
import { FieldsSelector } from '../components/fieldsSelector';
import AccountSettingsTab from '../../../accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTabSubtitle,
  AccountSettingsTabTitle,
} from '../../../accountSettingsLayout/accountSettingsTab/accountSettingsTab';

const CreatePicklistMappingModal = ({
  setOpenCreatePicklistMapping,
  driver,
  picklists,
  integrationName,
}) => {
  const [newMapping, setNewMapping] = useState({
    driverName: driver,
    picklistId: null,
    picklistValueId: null,
    integrationPicklistValue: null,
    integrationPicklistName: null,
    integrationPicklistEntity: null,
  });
  const fieldTypes = useEntity('fieldTypes');
  const bobjectFields = useEntity('bobjectFields');
  const bobjectPicklistValues = useEntity('bobjectPicklistFieldValues');
  const { createToast } = useToasts();

  const sendRequest = async () => {
    const response = await api.post(
      `/integrations/manager/drivers/${driver}/mappings/picklists`,
      newMapping,
    );
    if (response.status === 201) {
      createToast({
        type: 'success',
        message: 'The mapping was created successfully!',
      });
      mutate(`/integrations/manager/drivers/${driver}/mappings/picklists`);
      setOpenCreatePicklistMapping(false);
    } else {
      createToast({
        type: 'error',
        message: 'There was an error creating the mapping',
      });
    }
  };

  const picklistValues = useMemo(() => {
    if (newMapping.picklistId) {
      const bobjectField = bobjectFields.get(newMapping.picklistId);
      if (bobjectField && bobjectField.bobjectGlobalPicklist) {
        return bobjectPicklistValues.filterBy(
          'bobjectGlobalPicklist',
          bobjectField.bobjectGlobalPicklist,
        );
      }
      return bobjectPicklistValues.filterBy('bobjectField', newMapping.picklistId);
    }
    return null;
  }, [newMapping.picklistId]);

  const picklistFields = fieldTypes
    .all()
    .filter(type => type.enumName === 'PICKLIST' || type.enumName === 'GLOBAL_PICKLIST')
    .map(type => type.id);

  return (
    <Modal open onClose={() => setOpenCreatePicklistMapping(false)}>
      <ModalHeader>
        <ModalTitle>
          <Text size={16} inline>
            Create picklist mapping
          </Text>
        </ModalTitle>
        <ModalCloseIcon onClick={() => setOpenCreatePicklistMapping(false)} />
      </ModalHeader>
      <ModalContent>
        <div className={styles._modal_title}>
          <Icon name="settings" size={35} className={styles._modal_title__icon} />
          <Text>Map Bloobirds picklist to {integrationName} picklist</Text>
        </div>
        <div className={styles._modal_section__content}>
          <div className={styles._modal_section}>
            <FieldsSelector
              width={260}
              size="small"
              borderless={false}
              value={null}
              autocomplete
              onChange={value =>
                setNewMapping(old => ({
                  ...old,
                  picklistId: value?.bobjectFieldId,
                }))
              }
              filter={field => Array.isArray(field) && picklistFields.includes(field[1]?.fieldType)}
              showLeadFields
              showActivityFields
              showOpportunityFields
            />
            {newMapping?.picklistId && (
              <Select
                width={260}
                size="small"
                placeholder="Value"
                borderless={false}
                disabled={!picklistValues}
                autocomplete
                onChange={value =>
                  setNewMapping(old => ({
                    ...old,
                    picklistValueId: value,
                  }))
                }
              >
                {picklistValues?.map(picklistValueField => (
                  <Item key={picklistValueField?.id} value={picklistValueField?.id}>
                    {picklistValueField?.value}
                  </Item>
                ))}
              </Select>
            )}
          </div>
          <div className={styles._modal_section}>
            <Label
              overrideStyle={{ cursor: 'default' }}
              color="veryLightBloobirds"
              size="small"
              textColor="bloobirds"
              uppercase={false}
            >
              map to
            </Label>
          </div>
          <div className={styles._modal_section}>
            <Select
              width={260}
              size="small"
              borderless={false}
              autocomplete
              renderDisplayValue={value => (value ? `${integrationName} Entity - ${value}` : '')}
              placeholder={`${integrationName} Entity`}
              onChange={value =>
                setNewMapping(old => ({
                  ...old,
                  integrationPicklistEntity: value,
                }))
              }
            >
              {picklists &&
                Object.keys(picklists).map(entity => (
                  <Item key={entity} value={entity}>
                    {entity}
                  </Item>
                ))}
            </Select>
          </div>
          {newMapping?.integrationPicklistEntity && (
            <div className={styles._modal_section}>
              <Select
                width={260}
                size="small"
                borderless={false}
                placeholder={`${integrationName} Picklist`}
                renderDisplayValue={value => `${integrationName} Picklist - ${value}`}
                defaultValue=""
                autocomplete
                onChange={value =>
                  setNewMapping(old => ({ ...old, integrationPicklistName: value }))
                }
              >
                {picklists &&
                  picklists[newMapping?.integrationPicklistEntity] &&
                  Object.keys(picklists[newMapping?.integrationPicklistEntity]).map(
                    integrationPicklist => (
                      <Item
                        key={integrationPicklist}
                        value={integrationPicklist}
                        label={integrationPicklist}
                      >
                        {integrationPicklist}
                      </Item>
                    ),
                  )}
              </Select>
              {newMapping?.integrationPicklistName && (
                <Select
                  width={260}
                  size="small"
                  borderless={false}
                  autocomplete
                  placeholder={`${integrationName} Picklist value`}
                  onChange={value =>
                    setNewMapping(old => ({ ...old, integrationPicklistValue: value }))
                  }
                >
                  {newMapping?.integrationPicklistName &&
                    Array.isArray(
                      picklists[newMapping?.integrationPicklistEntity][
                        newMapping?.integrationPicklistName
                      ],
                    ) &&
                    picklists[newMapping?.integrationPicklistEntity][
                      newMapping?.integrationPicklistName
                    ].map(integrationPicklistValue => (
                      <Item
                        key={integrationPicklistValue?.id}
                        value={integrationPicklistValue?.id}
                        label={integrationPicklistValue?.name}
                      >
                        {integrationPicklistValue?.name}
                      </Item>
                    ))}
                </Select>
              )}
            </div>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          variant="clear"
          onClick={() => {
            setOpenCreatePicklistMapping(false);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={!Object.entries(newMapping).every(mapping => !!mapping)}
          size="small"
          onClick={sendRequest}
        >
          Add Picklist Mapping
        </Button>
      </ModalFooter>
    </Modal>
  );
};

function IntegrationPicklistValueCell({ integrationPicklist, integrationValue }) {
  const entity = Object.values(integrationPicklist)
    .flat()
    .find(field => field.id === integrationValue);
  return (
    <TableCell>
      <div>
        <Text size="s">{entity.name}</Text>
        <Text size="xs" color="softPeanut">
          {entity.id}
        </Text>
      </div>
    </TableCell>
  );
}

export const BloobirdsPicklistValueCell = React.memo(({ bloobirdsPicklistValueId }) => {
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const picklistValue = bobjectPicklistFieldValues.get(bloobirdsPicklistValueId);
  return (
    <TableCell>
      <div>
        <Text size="s">{picklistValue?.value}</Text>
        <Text size="xs" color="softPeanut">
          {picklistValue?.id}
        </Text>
      </div>
    </TableCell>
  );
});

const IntegrationPicklistCell = ({ integrationEntity, integrationPicklist }) => (
  <TableCell>
    <div>
      <Text size="s" color="bloobirds">
        {integrationPicklist}
      </Text>
      <Text size="xs" color="softPeanut">
        {integrationEntity}
      </Text>
    </div>
  </TableCell>
);

const PicklistsMappings = ({ driver, integrationName }) => {
  const [openCreatePicklistMapping, setOpenCreatePicklistMapping] = useState(false);
  const { data: picklistsMappings } = useSWR(
    `/integrations/manager/drivers/${driver}/mappings/picklists`,
    async () =>
      await api
        .get(`/integrations/manager/drivers/${driver}/mappings/picklists/expanded`)
        .then(response => response.data),
  );

  const { data: entities } = useSWR(
    `/integrations/manager/drivers/${driver}/entities`,
    async () => {
      const fetchData = await api.get(`/integrations/manager/drivers/${driver}/entities`);
      return fetchData?.data;
    },
  );

  const { createToast } = useToasts();

  const picklistsForEntity = useMemo(
    () =>
      entities?.reduce((fields, entity) => {
        fields[entity.entity] = JSON.parse(entity.serializedPicklists);
        return fields;
      }, {}),
    [entities],
  );

  const groupedPicklists = useMemo(() => groupBy(picklistsMappings, 'picklistId'), [
    picklistsMappings,
  ]);

  async function removePicklistMapping(picklistValueId) {
    const response = await api.delete(
      `/integrations/manager/drivers/${driver}}/mappings/picklists/${picklistValueId}`,
    );
    if (response.status === 204) {
      createToast({
        type: 'success',
        message: 'The mapping was deleted successfully!',
      });
      mutate(`/integrations/manager/drivers/${driver}/mappings/picklists`);
    } else {
      createToast({
        type: 'error',
        message: 'There was an error deleting the mapping',
      });
    }
  }
  const integrationFieldNames = useMemo(
    () =>
      entities?.reduce((acc, entity) => {
        const fields = JSON.parse(entity?.serializedFields);
        fields?.forEach(field => (acc[field.id] = field.name));
        return acc;
      }, {}),
    entities,
  );
  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <AccountSettingsTabTitle icon="link">
            {integrationName} picklists mappings
          </AccountSettingsTabTitle>
          <AccountSettingsTabSubtitle>
            Manage here the picklist mappings of the selected entity of {integrationName}
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <Button iconLeft="plus" onClick={() => setOpenCreatePicklistMapping(true)}>
            Add new mapping
          </Button>
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        <div className={styles._dynamics__fields__table}>
          <Table>
            <TableHead>
              <TableCell>Bloobirds Picklist</TableCell>
              <TableCell>Bloobirds Picklist Value</TableCell>
              <TableCell>{integrationName} Picklist</TableCell>
              <TableCell>{integrationName} Picklist Value</TableCell>
              <TableCell>Actions</TableCell>
            </TableHead>
            <TableBody>
              {groupedPicklists &&
                picklistsForEntity &&
                map(groupedPicklists, (values, bloobirdsField) =>
                  values.map(picklistValue => (
                    <TableRow key={picklistValue.picklistValueId}>
                      <BloobirdsFieldCell bloobirdsField={bloobirdsField} />
                      <BloobirdsPicklistValueCell
                        bloobirdsPicklistValueId={picklistValue.picklistValueId}
                      />
                      <IntegrationPicklistCell
                        integrationEntity={picklistValue.integrationPicklistEntity}
                        integrationPicklist={
                          integrationFieldNames[picklistValue?.integrationPicklistName]
                        }
                      />
                      <IntegrationPicklistValueCell
                        integrationValue={picklistValue.integrationPicklistValue}
                        integrationPicklist={
                          picklistsForEntity[picklistValue.integrationPicklistEntity][
                            picklistValue.integrationPicklistName
                          ]
                        }
                      />
                      <TableCell>
                        <IconButton
                          name="trashFull"
                          onClick={() => removePicklistMapping(picklistValue.picklistValueId)}
                        />
                      </TableCell>
                    </TableRow>
                  )),
                )}
            </TableBody>
          </Table>
        </div>
        {openCreatePicklistMapping && (
          <CreatePicklistMappingModal
            setOpenCreatePicklistMapping={setOpenCreatePicklistMapping}
            picklists={picklistsForEntity}
            driver={driver}
            integrationName={integrationName}
          />
        )}
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default PicklistsMappings;
