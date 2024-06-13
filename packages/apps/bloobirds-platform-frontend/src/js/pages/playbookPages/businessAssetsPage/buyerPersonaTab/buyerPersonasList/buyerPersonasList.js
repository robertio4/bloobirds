import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, SortableList, Text } from '@bloobirds-it/flamingo-ui';
import { isEqual } from 'lodash';
import { mutate } from 'swr';

import { SearchLogs } from '../../../../../../assets/svg';
import {
  AnimatedCardGroup,
  EntityCard,
} from '../../../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../../components/entityList/entityList';
import { useBuyerPersonasList } from '../../../../../hooks/useBuyerPersonasList';
import { useOrdering } from '../../../../../hooks/useOrdering';
import styles from '../../businessAssetsPage.module.css';
import { BuyerPersonaCard } from './buyerPersonaCard/buyerPersonaCard';

export const BuyerPersonasList = ({ searchValue, setShowExamplePage, showDisabled }) => {
  const { buyerPersonas } = useBuyerPersonasList(showDisabled);
  const { parseOrderingRequest, handleUpdateOrdering } = useOrdering();
  const [buyerPersonasList, setBuyerPersonasList] = useState(buyerPersonas);
  const { t } = useTranslation();
  useEffect(() => {
    if (searchValue) {
      const filteredList = buyerPersonas?.filter(buyerPersona =>
        buyerPersona?.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      if (!isEqual(buyerPersonasList, filteredList)) {
        setBuyerPersonasList(filteredList);
      }
    } else {
      setBuyerPersonasList(buyerPersonas);
    }
  }, [searchValue, buyerPersonas?.length]);

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
      {buyerPersonas?.length > 0 ? (
        <EntityList>
          {buyerPersonasList?.length > 0 ? (
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
                  setBuyerPersonasList(v);
                  const newOrdering = parseOrderingRequest({ list: v, takeIndex: true });
                  handleUpdateOrdering({
                    list: newOrdering,
                    entityName: 'idealCustomerProfiles',
                    callback: () => {
                      mutate('/idealCustomerProfiles');
                    },
                  });
                }}
                disabled={searchValue?.length > 0}
                data={buyerPersonasList}
                keyExtractor={sc => sc?.id}
                renderItem={({ item: icp, innerRef, containerProps, handleProps, isDragging }) => (
                  <EntityCard
                    ref={innerRef}
                    {...containerProps}
                    {...handleProps}
                    className={isDragging && styles._card__dragging}
                  >
                    <BuyerPersonaCard icp={icp} />
                  </EntityCard>
                )}
              />
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                {t('playbook.noBuyerPersonas')}
              </Text>
            </div>
          )}
        </EntityList>
      ) : (
        <div className={styles._no_results__contents}>
          <SearchLogs className={styles._no_results__img} />
          <Text size="xl" weight="bold" align="center" color="softPeanut">
            {t('playbook.stillNoBuyerPersonas')}
          </Text>
          <Text size="m" align="center" weight="regular" color="softPeanut">
            {t('playbook.seeHowPersonasHelper')}
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
