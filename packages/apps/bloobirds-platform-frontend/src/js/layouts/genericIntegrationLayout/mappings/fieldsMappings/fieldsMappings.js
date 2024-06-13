import React, { useMemo, useState } from 'react';

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
import useSWR, { mutate } from 'swr';

import { SearchLogs } from '../../../../../assets/svg';
import { DYANAMICS } from '../../../../constants/integrations';
import { useEntity } from '../../../../hooks';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { api } from '../../../../utils/api';
import { toTitleCase } from '../../../../utils/strings.utils';
import AccountSettingsTab from '../../../accountSettingsLayout/accountSettingsTab';
import {
  AccountSettingsTabContent,
  AccountSettingsTabHeader,
  AccountSettingsTabHeaderLeft,
  AccountSettingsTabHeaderRight,
  AccountSettingsTabSubtitle,
} from '../../../accountSettingsLayout/accountSettingsTab/accountSettingsTab';
import { FieldsSelector } from '../components/fieldsSelector';
import styles from '../mappings.module.css';

export const BloobirdsFieldCell = React.memo(({ bloobirdsField }) => {
  const bobjectFields = useEntity('bobjectFields');
  const fieldTypes = useEntity('fieldTypes');
  const bobjectTypes = useBobjectTypes();
  const cellField = bobjectFields?.findBy('id', bloobirdsField);
  const fieldType = fieldTypes?.findBy('id', cellField?.fieldType);
  const bobjectType = bobjectTypes?.findBy('id')(cellField?.bobjectType);
  return (
    <TableCell>
      <div>
        <Text size="s" color="bloobirds" weight="regular">
          {cellField?.name} ({fieldType?.name})
        </Text>
        <Text size="xs" color="softPeanut" weight="regular">
          {bobjectType?.name}
        </Text>
      </div>
    </TableCell>
  );
});

export const IntegrationFieldCell = React.memo(({ integrationField, fields }) => {
  const entity = fields?.find(field => field.id === integrationField.id);
  return (
    <TableCell>
      <div className={styles.dynamicsName}>
        {entity?.requiredLevel === 'REQUIRED' && (
          <Text inline size="s" color="tomato">
            *
          </Text>
        )}
        <Text inline size="s" color="peanut" weight="regular">
          {entity?.name} ({entity?.type || integrationField?.type})
        </Text>
      </div>
    </TableCell>
  );
});

const CreateFieldMappingModal = ({
  setOpenCreateFieldMapping,
  driver,
  entityName,
  fields,
  integrationName,
}) => {
  const [newMapping, setNewMapping] = useState({
    driverName: driver,
    entityName,
    bobjectType: null,
    bobjectFieldId: null,
    integrationFieldUID: null,
    integrationFieldType: null,
  });
  const { createToast } = useToasts();

  const sendRequest = async () => {
    const response = await api.post(
      `/integrations/manager/drivers/${driver}/mappings/fields`,
      newMapping,
    );
    if (response.status === 201) {
      createToast({
        type: 'success',
        message: 'The mapping was created successfully!',
      });
      mutate(`/integrations/manager/drivers/${driver}/mappings/fields`);
      setOpenCreateFieldMapping(false);
    } else {
      createToast({
        type: 'error',
        message: 'There was an error creating the mapping',
      });
    }
  };

  return (
    <Modal open onClose={() => setOpenCreateFieldMapping(false)}>
      <ModalHeader variant="primary">
        <ModalTitle variant="primary">
          <Text size={16} inline>
            Create field mapping
          </Text>
        </ModalTitle>
        <ModalCloseIcon variant="primary" onClick={() => setOpenCreateFieldMapping(false)} />
      </ModalHeader>
      <ModalContent>
        <div className={styles._modal_title}>
          <Icon color="bloobirds" name="settings" size={35} className={styles._modal_title__icon} />
          <Text color="peanut">Map Bloobirds field to {integrationName} field</Text>
        </div>
        <div className={styles._modal_section__content}>
          <div className={styles._modal_section}>
            <FieldsSelector
              value={null}
              onChange={value =>
                setNewMapping(old => ({
                  ...old,
                  bobjectType: value?.bobjectType,
                  bobjectFieldId: value?.bobjectFieldId,
                }))
              }
              showLeadFields
              showActivityFields
              showOpportunityFields
            />
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
              placeholder={`${integrationName} field`}
              renderDisplayValue={value => `${integrationName} Field - ${value}`}
              defaultValue=""
              autocomplete
              onChange={value => setNewMapping(old => ({ ...old, integrationFieldUID: value }))}
            >
              {fields?.map(field => (
                <Item key={field?.id} value={field?.id} label={field?.name}>
                  {field?.name}
                </Item>
              ))}
            </Select>
            <Select
              width={260}
              size="small"
              borderless={false}
              placeholder={`${integrationName} Type`}
              renderDisplayValue={value => `${integrationName} - ${value}`}
              defaultValue=""
              autocomplete
              onChange={value => setNewMapping(old => ({ ...old, integrationFieldType: value }))}
            >
              {DYANAMICS.FIELD_TYPES.map(field => (
                <Item key={field} value={field}>
                  {field}
                </Item>
              ))}
            </Select>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button
          variant="clear"
          onClick={() => {
            setOpenCreateFieldMapping(false);
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={!Object.values(newMapping).every(value => !!value)}
          size="small"
          onClick={sendRequest}
        >
          Create
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const FieldsMappings = ({ driver, integrationName }) => {
  const { data: fieldMappings } = useSWR(
    `/integrations/manager/drivers/${driver}/mappings/fields`,
    () => api.get(`/integrations/manager/drivers/${driver}/mappings/fields`).then(res => res.data),
  );
  const { data: entities } = useSWR(`/integrations/manager/drivers/${driver}/entities`, () =>
    api.get(`/integrations/manager/drivers/${driver}/entities`).then(res => res.data),
  );

  const [openCreateFieldMapping, setOpenCreateFieldMapping] = useState(false);
  const [selectedEntityName, setSelectedEntityName] = useState('account');
  const { createToast } = useToasts();

  const fieldsForEntity = useMemo(
    () =>
      entities?.reduce((requiredFields, entity) => {
        requiredFields[entity.entity] = JSON.parse(entity.serializedFields);
        return requiredFields;
      }, {}),
    [entities],
  );

  async function removePicklistMapping(entity, bobjectFieldId) {
    const response = await api.delete(
      `/integrations/manager/drivers/${driver}/mappings/fields/${entity}/${bobjectFieldId}`,
      {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        data: {},
      },
    );
    if (response.status === 204) {
      createToast({
        type: 'success',
        message: 'The mapping was deleted successfully!',
      });
      mutate(`/integrations/manager/drivers/${driver}/mappings/fields`);
    } else {
      createToast({
        type: 'error',
        message: 'There was an error deleting the mapping',
      });
    }
  }

  return (
    <AccountSettingsTab>
      <AccountSettingsTabHeader>
        <AccountSettingsTabHeaderLeft>
          <div className={styles.header}>
            <Icon name="disconnectOutline" />
            <Text htmlTag="h4" size="l" color="peanut">
              Select the CRM entity:{' '}
            </Text>
            <Select
              dataTest={'mappingsBobjectTypeSelector'}
              onChange={setSelectedEntityName}
              value={selectedEntityName}
            >
              {entities &&
                entities.map(({ entity }) => (
                  <Item dataTest={entity} value={entity} key={entity}>
                    {toTitleCase(entity)}
                  </Item>
                ))}
            </Select>
          </div>
          <AccountSettingsTabSubtitle>
            Manage here the field mappings of the selected entity of {integrationName}
          </AccountSettingsTabSubtitle>
        </AccountSettingsTabHeaderLeft>
        <AccountSettingsTabHeaderRight>
          <Button iconLeft="plus" onClick={() => setOpenCreateFieldMapping(true)}>
            Add new field mapping
          </Button>
        </AccountSettingsTabHeaderRight>
      </AccountSettingsTabHeader>
      <AccountSettingsTabContent>
        {fieldMappings?.mappings[selectedEntityName] ? (
          <div className={styles._dynamics__fields__table}>
            <Table>
              <TableHead>
                <TableCell>Bloobirds Field</TableCell>
                <TableCell>{integrationName} Field</TableCell>
                <TableCell>Actions</TableCell>
              </TableHead>
              <TableBody>
                {fieldMappings &&
                  fieldsForEntity &&
                  map(
                    fieldMappings.mappings[selectedEntityName],
                    (integrationField, bloobirdsField) => (
                      <TableRow key={bloobirdsField}>
                        <BloobirdsFieldCell bloobirdsField={bloobirdsField} />
                        <IntegrationFieldCell
                          integrationField={integrationField}
                          fields={fieldsForEntity[selectedEntityName]}
                        />
                        <TableCell>
                          <IconButton
                            name="trashFull"
                            onClick={() =>
                              removePicklistMapping(selectedEntityName, bloobirdsField)
                            }
                            disabled={integrationField?.type === 'ID'}
                          />
                        </TableCell>
                      </TableRow>
                    ),
                  )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className={styles._no_results__contents}>
            <SearchLogs className={styles._no_results__img} />
            <Text size="xl" weight="bold" align="center" color="softPeanut">
              No mappings match the current criteria
            </Text>
            <Text size="m" align="center" weight="regular" color="softPeanut">
              Change the settings to view other available mappings.
            </Text>
          </div>
        )}

        {openCreateFieldMapping && (
          <CreateFieldMappingModal
            setOpenCreateFieldMapping={setOpenCreateFieldMapping}
            entityName={selectedEntityName}
            fields={fieldsForEntity && fieldsForEntity[selectedEntityName]}
            driver={driver}
            integrationName={integrationName}
          />
        )}
      </AccountSettingsTabContent>
    </AccountSettingsTab>
  );
};

export default FieldsMappings;
