import React, { useEffect, useMemo, useState } from 'react';

import { CRM } from '../../../constants/integrations';
import { useActiveUser, useEntity } from '../../../hooks';
import { useFullSalesEnabled, useInboundHubspotEnabled } from '../../../hooks/useFeatureFlags';
import { RestApi } from '../../../misc/api/rest';
import { changeActiveTrigger } from '../../../utils/integration.utils';
import FieldMapping from './fieldMappingTab.view';

const FieldMappingContainer = ({ mappings, initMapping, crm, link }) => {
  const [selectedMapping, setSelectedMapping] = useState(initMapping);
  const [fieldMappings, setFieldMappings] = useState(undefined);
  const [customMappings, setCustomMappings] = useState(undefined);
  const [systemMappings, setSystemMappings] = useState(undefined);
  const [refreshCustomMappings, setRefreshCustomMappings] = useState(true);
  const [refreshAccountTriggers, setRefreshAccountTriggers] = useState(true);
  const [refreshSystemMappings, setRefreshSystemMappings] = useState(true);
  const [renderFieldMapping, setRenderFieldMapping] = useState(false);
  const [accountTriggers, setAccountTriggers] = useState(undefined);
  const [searchValue, setSearchValue] = useState('');
  const { activeAccount } = useActiveUser();
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const isActiveHubspotInbound = useInboundHubspotEnabled();
  const isActiveSales = useFullSalesEnabled();
  useEffect(() => {
    if (searchValue) {
      setPage(0);
    }
  }, [searchValue]);

  const handleOnChangePage = newPage => {
    setRefreshCustomMappings(true);
    setPage(newPage);
  };

  const handleOnChangePowsPerPage = row => {
    setRefreshCustomMappings(true);
    setRowsPerPage(row);
  };

  const triggerMappings = useEntity('triggerMappings')?.all();
  const reducedTriggerMappings = useMemo(() => {
    return triggerMappings?.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.name]: {
          id: curr.id,
          ...(curr.triggerMappingRelatedObjects.length && {
            relatedObjects: curr.triggerMappingRelatedObjects,
          }),
        },
      };
    }, {});
  }, [triggerMappings, selectedMapping]);
  const bobjectFields = useEntity('bobjectFields')?.all();
  const fieldTypes = useEntity('fieldTypes');
  const referenceFieldType = fieldTypes?.findBy('enumName')('REFERENCE');
  const referenceEntityFieldType = fieldTypes?.findBy('enumName')('REFERENCE_ENTITY');

  const { reducedBobjectFieldsWithReferenced, reducedBobjectFields } = useMemo(
    () =>
      fieldTypes &&
      bobjectFields.reduce(
        (acc, curr) => {
          const newField = {
            [curr.id]: {
              name: curr.name,
              bobjectType: curr.bobjectType,
              logicRole: curr.logicRole,
            },
          };
          const matchesReference = ![referenceEntityFieldType.id, referenceFieldType.id].includes(
            curr.fieldType,
          );
          return {
            ...acc,
            ...(matchesReference
              ? {
                  reducedBobjectFieldsWithReferenced: {
                    ...acc.reducedBobjectFieldsWithReferenced,
                    ...newField,
                  },
                }
              : { reducedBobjectFieldsWithReferenced: acc.reducedBobjectFieldsWithReferenced }),
            reducedBobjectFields: {
              ...acc.reducedBobjectFields,
              ...newField,
            },
          };
        },
        { reducedBobjectFieldsWithReferenced: {}, reducedBobjectFields: {} },
      ),
    [bobjectFields, fieldTypes],
  );

  const standardTriggers = useEntity('standardTriggers')?.all();
  const reducedStandardTriggers = useMemo(
    () =>
      standardTriggers?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.name]: curr.id,
        }),
        {},
      ),
    [standardTriggers],
  );
  useEffect(() => {
    if (refreshCustomMappings && reducedTriggerMappings) {
      RestApi.search({
        entity: 'customMappings',
        query: {
          accountId: activeAccount.id,
          size: rowsPerPage,
          page,
          triggerMapping: reducedTriggerMappings[selectedMapping.name]?.id,
          'bobjectField.name': searchValue,
        },
      }).then(response => {
        setRefreshCustomMappings(false);
        setCustomMappings(response?._embedded?.customMappings);
        setTotalElements(response?.page?.totalElements ?? 0);
      });
    }
  }, [refreshCustomMappings, reducedTriggerMappings, page, rowsPerPage, searchValue]);

  useEffect(() => {
    if (refreshSystemMappings) {
      RestApi.search({
        entity: 'systemMappings',
        query: {
          accountId: activeAccount.id,
          size: 1000,
        },
      }).then(response => {
        setSystemMappings(response?._embedded.systemMappings);
        setRefreshSystemMappings(false);
      });
    }
  }, [crm, refreshSystemMappings]);

  useEffect(() => {
    if (refreshAccountTriggers) {
      RestApi.search({
        entity: 'accountBobjectTriggers',
        query: {
          accountId: activeAccount.id,
        },
      }).then(response => {
        setAccountTriggers(response?._embedded.accountBobjectTriggers);
        setRefreshAccountTriggers(false);
      });
    }
  }, [refreshAccountTriggers]);

  const reducedAccountTriggers = useMemo(
    () =>
      accountTriggers?.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.standardTrigger]: {
            active: curr.active,
            id: curr.id,
            jsonConfig: JSON.parse(curr.jsonConfig),
          },
        }),
        {},
      ),
    [accountTriggers],
  );
  const handleChangeActive = value => {
    RestApi.patch({
      entity: 'accountBobjectTriggers',
      id: reducedAccountTriggers[reducedStandardTriggers[selectedMapping.accountTrigger]].id,
      body: {
        active: value,
      },
    }).then(() => {
      setRefreshAccountTriggers(true);
    });
    changeActiveTrigger(selectedMapping.accountTrigger, value).then(() => {
      setRefreshAccountTriggers(true);
    });
  };

  const filteredSystemMappings = useMemo(
    () =>
      reducedTriggerMappings &&
      systemMappings?.filter(systemMapping => {
        if (systemMapping.name === 'COMPANY__PARENT') {
          return false;
        }
        return systemMapping.triggerMapping === reducedTriggerMappings[selectedMapping.name]?.id;
      }),
    [systemMappings, reducedTriggerMappings],
  );

  const mappingsWithFieldName = useMemo(
    () =>
      reducedBobjectFields &&
      customMappings?.map(customMapping => ({
        ...customMapping,
        fieldName: reducedBobjectFields[customMapping.bobjectField]?.name,
      })),
    [customMappings, reducedBobjectFields],
  );

  const onDeleteMapping = customMap => {
    RestApi.delete({
      entity: 'customMappings',
      id: customMap.id,
    }).then(() => {
      setRefreshCustomMappings(true);
    });
  };

  useEffect(() => {
    if (
      standardTriggers &&
      accountTriggers &&
      triggerMappings &&
      bobjectFields &&
      systemMappings &&
      customMappings &&
      fieldMappings
    ) {
      setRenderFieldMapping(true);
    }
  }, [
    standardTriggers,
    accountTriggers,
    triggerMappings,
    bobjectFields,
    systemMappings,
    customMappings,
    fieldMappings,
  ]);

  useEffect(() => {
    if (reducedAccountTriggers && reducedStandardTriggers) {
      mappings.forEach((value, index) => {
        if (
          (!isActiveHubspotInbound && value.name === 'HUBSPOT_FORM_SUBMISSIONS') ||
          (!isActiveSales && value.name.includes('OPPORTUNITY')) ||
          (isActiveSales && value.name === 'MEETING__HUBSPOT')
        ) {
          delete mappings[index];
        } else if (crm === CRM.SALESFORCE) {
          const jsonConfig =
            reducedAccountTriggers[reducedStandardTriggers.LEAD__SALESFORCE]?.jsonConfig;
          if (jsonConfig?.alwaysCreateContact && value.name.includes('LEAD__SALESFORCE')) {
            delete mappings[index];
          }
        }
      });
      setFieldMappings(mappings);
    }
  }, [reducedAccountTriggers, reducedStandardTriggers]);

  return (
    <>
      {renderFieldMapping && (
        <FieldMapping
          customMappings={mappingsWithFieldName}
          systemMappings={filteredSystemMappings}
          mappingName={selectedMapping}
          setMappingName={setSelectedMapping}
          bobjectFields={reducedBobjectFields}
          bobjectFieldsWithReferenced={reducedBobjectFieldsWithReferenced}
          triggerMappings={reducedTriggerMappings}
          deleteMapping={onDeleteMapping}
          searchValue={searchValue}
          handleChangeSearchValue={setSearchValue}
          handleRefreshCustomMappings={setRefreshCustomMappings}
          handleRefreshAccountTriggers={setRefreshAccountTriggers}
          onChangePage={handleOnChangePage}
          handleOnChangeRowsPerPage={handleOnChangePowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          count={totalElements}
          accountTriggers={
            reducedAccountTriggers[reducedStandardTriggers[selectedMapping.accountTrigger]]
          }
          handleChangeActive={handleChangeActive}
          crm={crm}
          mappings={fieldMappings}
          link={link}
          isSalesEnabled={isActiveSales}
          isHubspotInbound={isActiveHubspotInbound}
          handleSystemMappings={setRefreshSystemMappings}
        />
      )}
    </>
  );
};
export default FieldMappingContainer;
