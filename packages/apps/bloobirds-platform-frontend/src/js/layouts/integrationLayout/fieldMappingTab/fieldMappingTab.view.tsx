import React, { useEffect, useMemo, useState } from 'react';

import {
  Body,
  Button,
  Divider,
  Head,
  Icon,
  Item,
  Pagination,
  Row,
  Select,
  Skeleton,
  Switch,
  Table,
  TableCell,
  TableRow,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useNoStatusOppSetting } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { formatDate, api } from '@bloobirds-it/utils';
import { Mapping } from 'classnames';
import { capitalize } from 'lodash/string';
import PropTypes from 'prop-types';
import { mutate } from 'swr';

import { SearchLogs } from '../../../../assets/svg';
import SearchBar from '../../../components/searchBar';
import { CRM, CRM_DISPLAY_NAME } from '../../../constants/integrations';
import { useActiveUser, useMediaQuery } from '../../../hooks';
import { useBobjectTypes } from '../../../hooks/useBobjectTypes';
import MappingHubspotCallResultsContainer from '../../../pages/accountSettingsPages/huspotIntegrationPage/mappingHubspotCallResults/mappingHubspotCallResults.container';
import MappingHubspotOpportunityStatus from '../../../pages/accountSettingsPages/huspotIntegrationPage/mappingHubspotCallResults/mappingHubspotOpportuityStatus';
import MappingMeetingResults from '../../../pages/accountSettingsPages/huspotIntegrationPage/mappingHubspotCallResults/mappingMeetingResults';
import MappingSalesforceContactRoles from '../../../pages/accountSettingsPages/huspotIntegrationPage/mappingHubspotCallResults/mappingSalesforceContactRoles';
import MappingSalesforceOpportunityStages from '../../../pages/accountSettingsPages/huspotIntegrationPage/mappingHubspotCallResults/mappingSalesforceOpportunityStages';
import NewFieldMapping, { CRMOptions } from './addNewFieldMappingModal/newFieldMapping';
import CustomMappingRow from './customMappingRow/customMappingRow.js';
import styles from './fieldMappingTab.module.css';
import SystemVarTable from './systemVarTable/systemVarTable';

interface FieldMappingsProps {
  customMappings: Mapping;
  setMappingName: any;
  systemMappings: any;
  mappingName: any;
  bobjectFields: any;
  bobjectFieldsWithReferenced: any;
  triggerMappings: any;
  deleteMapping: any;
  handleChangeSearchValue: any;
  searchValue: any;
  handleRefreshCustomMappings: any;
  accountTriggers: any;
  handleChangeActive: any;
  onChangePage: any;
  handleOnChangeRowsPerPage: any;
  page: any;
  rowsPerPage: any;
  count: any;
  mappings: any;
  crm: keyof typeof CRM;
  link: any;
  isSalesEnabled: any;
  handleRefreshAccountTriggers: any;
  handleSystemMappings: any;
}
const ROWS_PER_PAGE_OPTIONS = [10, 25, 50];

const CustomMappingTableSkeletonRow = () => (
  <TableRow>
    <TableCell>
      <div>
        <Skeleton variant="text" height={16} width={80} />
        <Skeleton variant="text" height={16} width={30} />
      </div>
    </TableCell>
    <TableCell>
      <div>
        <Skeleton variant="text" height={16} width={80} />
        <Skeleton variant="text" height={16} width={30} />
      </div>
    </TableCell>
    <TableCell>
      <Skeleton variant="text" height={16} width={80} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" height={16} width={50} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" height={16} width={50} />
    </TableCell>
    <TableCell>
      <Skeleton variant="text" height={16} width={50} />
    </TableCell>
  </TableRow>
);
const NoResults = () => (
  <TableRow>
    <TableCell />
    <TableCell />
    <TableCell>
      <div className={styles._no_results_content}>
        <SearchLogs className={styles._no_results_content_img} />
        <Text size="xl" weight="bold" align="center" color="softPeanut">
          No field mappings found
        </Text>
        <Text size="m" align="center" weight="regular" color="softPeanut">
          Your search result doesn&apos;t match any Custom field mappings
        </Text>
      </div>
    </TableCell>
    <TableCell />
    <TableCell />
    <TableCell />
  </TableRow>
);

interface SystemMappingProps {
  crmObjectFields: any;
  systemMapping: {
    replaceWith: string;
    syncRule: string;
    maxLength: number;
    creationDatetime: string;
    updateDatetime: string;
  };
  crm: keyof typeof CRM;
}
const SystemMappingRow = (props: SystemMappingProps) => {
  const salesforceField = props.crmObjectFields?.find(
    f => f.name === props.systemMapping.replaceWith,
  )?.label;

  const syncRuleText = (rule: CRMOptions) => {
    switch (rule) {
      case 'BLOOBIRDS':
        return 'Always use Bloobirds';
      case 'CRM_BUT_BLOOBIRDS_CREATE':
      case 'CRM_BUT_BLOOBIRDS_UPDATE':
      case 'CRM':
        return `Always use ${CRM_DISPLAY_NAME[props.crm]}`;
      case 'BOTH':
        return 'Two-way';
      case 'NO_SYNC':
        return "Don't sync";
      default:
        return "Don't sync";
    }
  };
  return (
    <Row>
      <TableCell>
        <Text size="s" color="peanut">
          {props.systemMapping.name}
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color="peanut">
          {salesforceField || props.systemMapping.replaceWith}
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color="peanut">
          {syncRuleText(props.systemMapping.syncRule)}
        </Text>
      </TableCell>
      {props.crm === CRM.HUBSPOT ? (
        <TableCell>
          <Text size="s" color="peanut">
            System
          </Text>
        </TableCell>
      ) : (
        <TableCell>
          <Text size="s" color="peanut">
            {props.systemMapping.maxLength === 0 ? '-' : props.systemMapping.maxLength}
          </Text>
        </TableCell>
      )}
      <TableCell>
        <Text size="s" color="peanut">
          {formatDate(new Date(props.systemMapping.creationDatetime), 'MMM d, yyyy')}
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color="peanut">
          {formatDate(new Date(props.systemMapping.updateDatetime), 'MMM d, yyyy')}
        </Text>
      </TableCell>
    </Row>
  );
};

SystemMappingRow.propTypes = { systemMapping: PropTypes.any };

const CreateMappings = props => (
  <div className={styles._no_custom_mapping_container}>
    <span className={styles._no_custom_mapping_warning}>
      <Icon name="alertTriangle" size={48} color="banana" />
    </span>
    <Text size="xxl" weight="medium" color="peanut" align="center">
      {'There are no field mappings created...'}
    </Text>
    <Text size={'m'} weight="regular" color="softPeanut">
      {`In order to sync your Bloobirds objects with ${capitalize(
        props.crm,
      )} those field mappings are needed.`}
    </Text>
    <Text size={'m'} weight="regular" color="softPeanut" align={'center'}>
      {'would you like to create it now?'}
    </Text>
    <Button onClick={props.onClick}>Create mappings</Button>
  </div>
);

CreateMappings.propTypes = {
  crm: PropTypes.string,
  onClick: PropTypes.func,
};

const getIsSpecialMapping = name =>
  [
    'CALL__RESULTS',
    'MEETING__RESULTS',
    'OPPORTUNITY__MAPPING',
    'OPPORTUNITY__CONTACT_ROLE',
    'OPPORTUNITY__STAGES',
  ].includes(name);

const FieldMapping = ({
  customMappings,
  setMappingName,
  systemMappings,
  mappingName,
  bobjectFields,
  bobjectFieldsWithReferenced,
  triggerMappings,
  deleteMapping,
  handleChangeSearchValue,
  searchValue,
  handleRefreshCustomMappings,
  accountTriggers,
  handleChangeActive,
  onChangePage,
  handleOnChangeRowsPerPage,
  page,
  rowsPerPage,
  count,
  mappings,
  crm,
  link,
  isSalesEnabled,
  handleRefreshAccountTriggers,
  handleSystemMappings,
}: FieldMappingsProps) => {
  const isSpecialMapping = getIsSpecialMapping(mappingName.name);
  const { isSmallDesktop } = useMediaQuery();
  const { activeAccount } = useActiveUser();
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const bobjectTypes = useBobjectTypes()?.all();
  const [crmObjectFields, setCrmObjectFields] = useState(undefined);
  const [isFetching, setIsfetching] = useState(false);
  const isHubspot = crm === CRM.HUBSPOT;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const reducedBobjectTypes = useMemo(
    () =>
      bobjectTypes?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.name]: curr.id,
        }),
        {},
      ),
    [bobjectTypes],
  );

  const CustomMappingTableSkeleton = () => {
    const skeletonCustomMappings: Array<React.ReactElement> = [];
    Object.entries(customMappings).forEach(() =>
      skeletonCustomMappings.push(<CustomMappingTableSkeletonRow />),
    );
    return skeletonCustomMappings;
  };
  const [open, setOpen] = useState(false);
  const [map, setMap] = useState(undefined);
  const [descendingCustomMaps, isDescendingCustomMaps] = useState({
    value: true,
    column: 'fieldName',
  });
  const initialStateIconCustomMappings = {
    fieldName: 'arrowDown',
    keyName: 'arrowDown',
    creationDatetime: 'arrowDown',
    updateDatetime: 'arrowDown',
  };
  const initialStateIconSystemMappings = {
    name: 'arrowUp',
    replaceWith: 'arrowUp',
    creationDatetime: 'arrowUp',
    updateDatetime: 'arrowUp',
  };
  const [descendingSystemVars, isDescendingSystemVars] = useState({
    value: true,
    column: 'name',
  });
  const [iconName, setIconName] = useState(initialStateIconCustomMappings);
  const [iconNameSystemVars, setIconNameSystemVars] = useState(initialStateIconSystemMappings);
  const filteredCustomMappings = useMemo(
    () =>
      customMappings?.filter(
        customMapping => customMapping.triggerMapping === triggerMappings[mappingName.name]?.id,
      ),
    [customMappings],
  );

  useEffect(() => {
    const hubspotUrl = `/hubspot/metadata/${mappingName.hubsject}`;
    const salesforceUrl = `/service/salesforce/metadata/${mappingName.sobjectType}`;
    setIsfetching(true);
    api
      .get(`/utils${isHubspot ? hubspotUrl : salesforceUrl}`)
      .then(response => response?.data)
      .then(response => {
        setCrmObjectFields(isHubspot ? response.results : response.fields);
        setIsfetching(false);
      });
  }, [mappingName.name]);

  const handleCreateMapping = () => {
    api
      .post(
        `/utils/service/mappings/${crm.toLowerCase()}/${activeAccount.id}/create/${
          mappingName.paramName
        }`,
      )
      .then(() => {
        handleRefreshAccountTriggers(true);
        handleRefreshCustomMappings(true);
        handleSystemMappings(true);

        mutate('/entity/triggerMappings');
        mutate('/entity/customMappings');
        mutate('/entity/systemMappings');
      });
  };
  const sortedCustomMappings = useMemo(
    () =>
      filteredCustomMappings?.length > 0 &&
      filteredCustomMappings
        .sort((a, b) => {
          if (descendingCustomMaps.value) {
            return a[descendingCustomMaps.column] > b[descendingCustomMaps.column] ? 1 : -1;
          }
          return a[descendingCustomMaps.column] < b[descendingCustomMaps.column] ? 1 : -1;
        })
        .map((customMap, index) => (
          <CustomMappingRow
            key={`custom-map-${index}`}
            customMap={customMap}
            handleOpen={setOpen}
            deleteMapping={deleteMapping}
            bobjectFields={bobjectFields}
            bobjectTypes={reducedBobjectTypes}
            selectedMapping={mappingName}
            setMap={setMap}
            crm={crm}
            crmFields={crmObjectFields}
          />
        )),
    [
      customMappings,
      triggerMappings,
      filteredCustomMappings,
      crmObjectFields,
      descendingCustomMaps,
    ],
  );
  const mappedItems = useMemo(
    () =>
      mappings?.map(mapping => (
        <Item key={mapping?.title} value={mapping}>
          {mapping?.title}
        </Item>
      )),
    [mappings],
  );

  const sortedSystemMappings = useMemo(
    () =>
      systemMappings
        ?.sort((a, b) => {
          if (descendingSystemVars.value) {
            return a[descendingSystemVars.column] > b[descendingSystemVars.column] ? 1 : -1;
          }
          return a[descendingSystemVars.column] < b[descendingSystemVars.column] ? 1 : -1;
        })
        .map((systemMapping, index) => (
          <SystemMappingRow
            key={`system-mapping-${index}`}
            crmObjectFields={crmObjectFields}
            systemMapping={systemMapping}
            crm={crm}
          />
        )),
    [descendingSystemVars, crmObjectFields, systemMappings],
  );
  useEffect(() => {
    setIconName(
      descendingCustomMaps.value
        ? { ...initialStateIconCustomMappings, [descendingCustomMaps.column]: 'arrowDown' }
        : { ...initialStateIconCustomMappings, [descendingCustomMaps.column]: 'arrowUp' },
    );
  }, [descendingCustomMaps]);
  useEffect(() => {
    setIconNameSystemVars(
      descendingSystemVars.value
        ? { ...initialStateIconSystemMappings, [descendingSystemVars.column]: 'arrowDown' }
        : { ...initialStateIconSystemMappings, [descendingSystemVars.column]: 'arrowUp' },
    );
  }, [descendingSystemVars]);

  const noCustomMappings =
    !isSpecialMapping &&
    !accountTriggers &&
    !isFetching &&
    filteredCustomMappings.length === 0 &&
    !sortedCustomMappings &&
    searchValue === '';
  const canRenderNewFieldMapping =
    customMappings && bobjectFields && triggerMappings && bobjectTypes && !isSpecialMapping;

  return (
    <div>
      <div className={styles._header}>
        <div className={styles._header_left}>
          <Select
            value={mappingName}
            onChange={value => {
              setMappingName(value);
              handleRefreshCustomMappings(true);
              handleChangeSearchValue('');
            }}
          >
            {mappedItems}
            {(crm === CRM.HUBSPOT || (crm === CRM.SALESFORCE && isSalesEnabled)) && <Divider />}
            {crm === CRM.HUBSPOT && (
              <Item
                value={{
                  name: 'CALL__RESULTS',
                  bobjectType: '',
                  accountTrigger: '',
                  text: '',
                  title: 'Call results mapping',
                }}
              >
                Call results mapping
              </Item>
            )}
            {crm === CRM.HUBSPOT && (
              <Item
                value={{
                  name: 'MEETING__RESULTS',
                  bobjectType: 'meeting',
                  accountTrigger: '',
                  text: '',
                  title: 'Meeting results mapping',
                  hubsject: 'meeting',
                }}
              >
                Meeting results mapping
              </Item>
            )}
            {crm === CRM.HUBSPOT && isSalesEnabled && (
              <Item
                value={{
                  name: 'OPPORTUNITY__MAPPING',
                  bobjectType: '',
                  accountTrigger: '',
                  text: '',
                  title: 'Opportunity status mapping',
                  hubsject: 'deal',
                }}
              >
                Opportunity status mapping
              </Item>
            )}

            {crm === CRM.SALESFORCE && isSalesEnabled && !isNoStatusOppSetting && (
              <Item
                value={{
                  name: 'OPPORTUNITY__STAGES',
                  bobjectType: 'Opportunity',
                  accountTrigger: '',
                  text: '',
                  sobjectType: 'Opportunity',
                  title: 'Opportunity stages mapping',
                }}
              >
                Opportunity stages mapping
              </Item>
            )}
            {crm === CRM.SALESFORCE && isSalesEnabled && (
              <Item
                value={{
                  name: 'OPPORTUNITY__CONTACT_ROLE',
                  bobjectType: 'Opportunity',
                  accountTrigger: '',
                  text: '',
                  sobjectType: 'OpportunityContactRole',
                  title: 'Opportunity contact role mapping',
                }}
              >
                Opportunity contact role mapping
              </Item>
            )}
          </Select>
          {!isSpecialMapping && (
            <div className={styles._header_switch}>
              {mappingName.name === 'MEETING__HUBSPOT' ? (
                <>
                  <Icon name="infoFilled" size="24" color="darkBloobirds" />
                  <Text size="s" color="darkBloobirds">
                    These are only used for creation and not to update existing deals
                  </Text>
                </>
              ) : (
                <>
                  {mappingName.name !== 'HUBSPOT_FORM_SUBMISSIONS' &&
                    accountTriggers &&
                    !noCustomMappings && (
                      <Switch
                        checked={accountTriggers.active}
                        onChange={value => handleChangeActive(value)}
                      />
                    )}
                  {!noCustomMappings && (
                    <Text color="peanut" size="xs" weight="medium" inline>
                      {mappingName.text}
                    </Text>
                  )}
                </>
              )}
            </div>
          )}
        </div>
        {!isSpecialMapping && !noCustomMappings && (
          <div className={styles._header_search_bar}>
            <div className={styles._search_bar}>
              <SearchBar
                handleChange={value => {
                  handleRefreshCustomMappings(true);
                  handleChangeSearchValue(value);
                }}
                value={searchValue}
                placeholder="Search mapping..."
              />
            </div>
            {isSmallDesktop ? (
              <Button
                onClick={() => {
                  setOpen(true);
                  setMap(undefined);
                }}
                size="medium"
                uppercase
              >
                <Icon name="plus" color="white" size="18" />
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setOpen(true);
                  setMap(undefined);
                }}
                iconLeft="plus"
                size="medium"
                uppercase
              >
                add new field mapping
              </Button>
            )}
          </div>
        )}
      </div>
      {mappingName.name !== 'CALL__RESULTS' && (
        <div className={styles._text}>
          <Text size="xs" color="softPeanut">
            Field mappings are the link between Bloobirds fields and {displayCrm} fields and make
            synchronisation possible.
          </Text>
          <a href={link}>
            <Text size="xs" color="bloobirds" inline>
              {' '}
              Read how to configure them.
            </Text>
          </a>
        </div>
      )}
      {!noCustomMappings && (
        <div className={styles._table}>
          {!isSpecialMapping && (
            <Table>
              <Head>
                <TableCell>
                  {customMappings && (
                    <div
                      className={styles._table_ordering}
                      onClick={() => {
                        isDescendingCustomMaps({
                          value: !descendingCustomMaps.value,
                          column: 'fieldName',
                        });
                      }}
                    >
                      <Text size="xs" color="peanut" uppercase>
                        bloobirds field
                      </Text>
                      {descendingCustomMaps.column === 'fieldName' && (
                        <Icon name={iconName.fieldName} size="16" color="peanut" />
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div
                    className={styles._table_ordering}
                    onClick={() => {
                      isDescendingCustomMaps({
                        value: !descendingCustomMaps.value,
                        column: 'keyName',
                      });
                    }}
                  >
                    <Text size="xs" color="peanut" uppercase ellipsis={isSmallDesktop && 10}>
                      {displayCrm} field
                    </Text>
                    {descendingCustomMaps.column === 'keyName' && (
                      <Icon name={iconName.keyName} size="16" color="peanut" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className={styles._tooltip}>
                    <Text size="xs" color="peanut" uppercase>
                      sync rule
                    </Text>
                    <Tooltip title={'The sync rule determines the system of record'} position="top">
                      <Icon name="infoFilled" color="darkBloobirds" size="16" />
                    </Tooltip>
                  </div>
                </TableCell>
                {crm === CRM.HUBSPOT ? (
                  <TableCell>
                    <Text size="xs" color="peanut" uppercase>
                      mapping type
                    </Text>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Text size="xs" color="peanut" uppercase>
                      max length
                    </Text>
                  </TableCell>
                )}
                <TableCell>
                  <div
                    className={styles._table_ordering}
                    onClick={() => {
                      isDescendingCustomMaps({
                        value: !descendingCustomMaps.value,
                        column: 'updateDatetime',
                      });
                    }}
                  >
                    <Text size="xs" color="peanut" uppercase>
                      last modified
                    </Text>
                    {descendingCustomMaps.column === 'updateDatetime' && (
                      <Icon name={iconName.updateDatetime} size="16" color="peanut" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={styles._table_ordering}
                    onClick={() => {
                      isDescendingCustomMaps({
                        value: !descendingCustomMaps.value,
                        column: 'creationDatetime',
                      });
                    }}
                  >
                    <Text size="xs" color="peanut" uppercase>
                      create date
                    </Text>
                    {descendingCustomMaps.column === 'creationDatetime' && (
                      <Icon name={iconName.creationDatetime} size="16" color="peanut" />
                    )}
                  </div>
                </TableCell>
              </Head>
              <Body>
                {sortedCustomMappings.length > 0 &&
                (crm === CRM.SALESFORCE ? crmObjectFields : true) ? (
                  sortedCustomMappings
                ) : (
                  <CustomMappingTableSkeleton />
                )}
                {customMappings && customMappings.length === 0 && <NoResults />}
              </Body>
            </Table>
          )}
          {!isSpecialMapping && (
            <div className={styles._pagination}>
              <Pagination
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={onChangePage}
                onChangeRowsPerPage={handleOnChangeRowsPerPage}
                rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
              />
            </div>
          )}
          {mappingName.name === 'CALL__RESULTS' && <MappingHubspotCallResultsContainer />}
          {mappingName.name === 'MEETING__RESULTS' && (
            <MappingMeetingResults meetingMetadata={crmObjectFields} />
          )}
          {mappingName.name === 'OPPORTUNITY__MAPPING' && isSalesEnabled && (
            <MappingHubspotOpportunityStatus />
          )}
          {mappingName.name === 'OPPORTUNITY__STAGES' &&
            isSalesEnabled &&
            !isFetching &&
            crmObjectFields && (
              <MappingSalesforceOpportunityStages sfdcOppStages={crmObjectFields} />
            )}
          {mappingName.name === 'OPPORTUNITY__CONTACT_ROLE' && isSalesEnabled && (
            <MappingSalesforceContactRoles
              oppFields={Object.values(bobjectFieldsWithReferenced).filter(
                bobjectField =>
                  reducedBobjectTypes[BOBJECT_TYPES.OPPORTUNITY] === bobjectField.bobjectType,
              )}
            />
          )}
        </div>
      )}
      {noCustomMappings && <CreateMappings crm={crm} onClick={handleCreateMapping} />}
      {!isSpecialMapping && !noCustomMappings && systemMappings.length > 0 && (
        <>
          <Text size="l" color="peanut">
            System{' '}
            {mappingName.name === 'CONTACT__SALESFORCE' ? 'Contact' : mappingName.bobjectType}{' '}
            mappings
          </Text>
          <div className={styles._text}>
            <Text size="xs" color="softPeanut">
              These are field mappings that are preconfigured and you cannot customise.
            </Text>
          </div>
          <SystemVarTable
            crm={crm}
            onClick={() =>
              isDescendingSystemVars({
                value: !descendingSystemVars.value,
                column: 'name',
              })
            }
            smallDesktop={isSmallDesktop}
            descendingSystemVars={descendingSystemVars}
            iconNameSystemVars={iconNameSystemVars}
            onClick1={() =>
              isDescendingSystemVars({
                value: !descendingSystemVars.value,
                column: 'replaceWith',
              })
            }
            onClick2={() =>
              isDescendingSystemVars({
                value: !descendingSystemVars.value,
                column: 'updateDatetime',
              })
            }
            onClick3={() =>
              isDescendingSystemVars({
                value: !descendingSystemVars.value,
                column: 'creationDatetime',
              })
            }
            systemMappings={systemMappings}
            sortedSystemMappings={sortedSystemMappings}
            crmObjectFields={crmObjectFields}
          />
        </>
      )}
      {canRenderNewFieldMapping && (
        <NewFieldMapping
          bobjectFields={bobjectFields}
          customMappings={filteredCustomMappings}
          bobjectTypes={reducedBobjectTypes}
          open={open}
          handleOpen={setOpen}
          customMap={map}
          handleRefreshMappings={handleRefreshCustomMappings}
          crm={crm}
          triggerMapping={triggerMappings[mappingName.name]?.id}
          mapping={mappingName}
          crmObject={mappingName.sobjectType}
          isFetching={isFetching}
          crmObjectFields={crmObjectFields}
          setOrderingCustomMap={isDescendingCustomMaps}
        />
      )}
    </div>
  );
};

FieldMapping.propTypes = {
  accountTriggers: PropTypes.object,
  bobjectFields: PropTypes.object,
  customMappings: PropTypes.object,
  deleteMapping: PropTypes.func,
  handleChangeActive: PropTypes.func,
  handleChangeSearchValue: PropTypes.func,
  handleRefreshCustomMappings: PropTypes.func,
  mappingName: PropTypes.object,
  searchValue: PropTypes.string,
  setMappingName: PropTypes.func,
  systemMappings: PropTypes.func,
  triggerMappings: PropTypes.object,
};
export default FieldMapping;
