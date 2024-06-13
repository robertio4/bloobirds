import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, SortableList, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { CrmStatusMapping, CrmStatusResponse } from '@bloobirds-it/types';

import { SearchLogs } from '../../../../../assets/svg';
import { EntityCard } from '../../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../components/entityList/entityList';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { api } from '../../../../utils/api';
import { useCrmStatusFieldModal } from '../addCrmStatusFieldModal/addCrmStatusFieldModal';
import { headerNames } from '../crmStatus.constants';
import { CrmStatusCard } from '../crmStatusCard/crmStatusCard';
import styles from './crmStatusList.module.css';

export const CrmStatusList = ({
  crmStatus,
  mutateList,
}: {
  crmStatus: CrmStatusResponse;
  mutateList: () => void;
}) => {
  const crmStatusMapping = crmStatus?.crmStatusMappingList;
  const { t } = useTranslation('translation', { keyPrefix: 'accountSettings.crmStatus' });
  const { openCrmStatusFieldModal } = useCrmStatusFieldModal();
  const [crmStatusList, setCrmStatusList] = useState<CrmStatusMapping[]>([]);
  const salesforceStatusTypePicklistValues = useGlobalPicklistValues({
    logicRole: 'SALESFORCE_STATUS_TYPE',
  })
    ?.filter(statusType => statusType.enabled)
    ?.sort((a, b) => (a.ordering < b.ordering ? -1 : 1));
  const handleReorder = async (values: CrmStatusMapping[]) => {
    if (values && values.length > 0) {
      const valuesData = [...values];
      const valuesToSave = {
        crmStatusId: crmStatus?.id,
        reorderedMappings: valuesData?.map((v: CrmStatusMapping, i: number) => ({
          id: v.id,
          ordering: i,
        })),
      };
      await api.post('/utils/crmStatus/reorderCrmStatusMapping', valuesToSave).then(() => {
        mutateList();
      });
    }
  };

  useEffect(() => {
    if (crmStatusMapping) {
      const crmStatusList = [...crmStatusMapping];
      setCrmStatusList(crmStatusList?.sort((a, b) => (a.ordering < b.ordering ? -1 : 1)));
    }
  }, [crmStatusMapping]);

  return (
    <>
      {crmStatusList ? (
        <EntityList>
          {crmStatusList?.length > 0 ? (
            <>
              <EntityListHeader>
                {headerNames.map(name => (
                  <EntityHeaderItem label={name?.label} key={name?.label} />
                ))}
              </EntityListHeader>
              <SortableList
                className={styles._tbody}
                onReorder={data => {
                  setCrmStatusList(data);
                  handleReorder(data);
                }}
                data={crmStatusList}
                renderItem={({
                  innerRef,
                  item: mappingItem,
                  containerProps,
                  handleProps,
                  isDragging,
                }) => (
                  <EntityCard
                    ref={innerRef}
                    {...containerProps}
                    {...handleProps}
                    className={isDragging && styles._card__dragging}
                  >
                    <CrmStatusCard
                      crmStatusMappingItem={mappingItem}
                      crmStatusTypes={salesforceStatusTypePicklistValues}
                      mutateList={mutateList}
                    />
                  </EntityCard>
                )}
                keyExtractor={mappingItem => mappingItem.id}
              />
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                {t('noSalesforceFieldSelected')}
              </Text>
              <Text
                size="l"
                align="center"
                color="softPeanut"
                className={styles._no_field_subtitle}
              >
                {t('chooseSalesforceField')}
              </Text>
              <Button
                variant="primary"
                iconLeft="plus"
                size="medium"
                className={styles._select_field__button}
                onClick={() => {
                  openCrmStatusFieldModal(crmStatus);
                }}
              >
                {t('selectSalesforceField')}
              </Button>
            </div>
          )}
        </EntityList>
      ) : (
        <Spinner name="loadingCircle" />
      )}
    </>
  );
};
