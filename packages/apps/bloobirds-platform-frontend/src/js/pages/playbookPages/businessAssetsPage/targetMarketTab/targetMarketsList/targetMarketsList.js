import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, SortableList, Text } from '@bloobirds-it/flamingo-ui';
import { isEqual } from 'lodash';
import { mutate } from 'swr';

import { SearchLogs } from '../../../../../../assets/svg';
import { EntityCard } from '../../../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import { useOrdering } from '../../../../../hooks/useOrdering';
import { useTargetMarketsList } from '../../../../../hooks/useTargetMarketsList';
import styles from '../../businessAssetsPage.module.css';
import { TargetMarketCard } from './targetMarketCard/targetMarketCard';

export const TargetMarketsList = ({ searchValue, setShowExamplePage, showDisabled }) => {
  const { targetMarkets } = useTargetMarketsList(showDisabled);
  const { parseOrderingRequest, handleUpdateOrdering } = useOrdering();
  const [targetMarketsList, setTargetMarketsList] = useState(targetMarkets);
  const { t } = useTranslation();

  useEffect(() => {
    if (searchValue) {
      const filteredList = targetMarkets.filter(targetMarket =>
        targetMarket.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      if (!isEqual(targetMarketsList, filteredList)) {
        setTargetMarketsList(filteredList);
      }
    } else {
      setTargetMarketsList(targetMarkets);
    }
  }, [searchValue, targetMarkets?.length]);

  const headerNames = [
    {
      label: t('common.name'),
    },
    {
      label: t('common.cadenceByDefault'),
    },
    {
      label: t('common.description'),
    },
    {
      label: t('common.segmentation'),
    },
    {
      label: t('common.status'),
    },
  ];

  return (
    <>
      {targetMarketsList?.length > 0 ? (
        <EntityList>
          {targetMarketsList?.length > 0 ? (
            <>
              <EntityListHeader>
                <EntityHeaderItem />
                {headerNames.map(name => (
                  <EntityHeaderItem label={name?.label} key={name?.label} />
                ))}
              </EntityListHeader>
              <SortableList
                className={styles._tbody}
                onReorder={v => {
                  setTargetMarketsList(v);
                  const newOrdering = parseOrderingRequest({ list: v, takeIndex: true });
                  handleUpdateOrdering({
                    list: newOrdering,
                    entityName: 'targetMarkets',
                    callback: () => {
                      mutate('/targetMarket');
                    },
                  });
                }}
                disabled={searchValue?.length > 0}
                data={targetMarketsList}
                keyExtractor={tm => tm?.id}
                renderItem={({ item: tm, innerRef, containerProps, handleProps, isDragging }) => (
                  <EntityCard
                    ref={innerRef}
                    {...containerProps}
                    {...handleProps}
                    className={isDragging && styles._card__dragging}
                  >
                    <TargetMarketCard tm={tm} />
                  </EntityCard>
                )}
              />
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                {t('playbook.noTargetMarkets')}
              </Text>
            </div>
          )}
        </EntityList>
      ) : (
        <div className={styles._no_results__contents}>
          <SearchLogs className={styles._no_results__img} />
          <Text size="xl" weight="bold" align="center" color="softPeanut">
            {t('playbook.stillNoTargets')}
          </Text>
          <Text size="m" align="center" weight="regular" color="softPeanut">
            {t('playbook.seeHowTargetsHelper')}
          </Text>
          <span onClick={() => setShowExamplePage(true)}>
            <Icon name="eye" color="purple" size={16} />
            <Text htmlTag="span" size="xs" color="purple" className={styles._link}>
              {t('playbook.seeSomeExamples')}
            </Text>
          </span>
        </div>
      )}
    </>
  );
};
