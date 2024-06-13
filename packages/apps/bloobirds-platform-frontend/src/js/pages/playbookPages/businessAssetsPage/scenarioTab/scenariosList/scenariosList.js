import React, { useEffect, useState } from 'react';

import { SortableList, Text } from '@bloobirds-it/flamingo-ui';
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
import { useOrdering } from '../../../../../hooks/useOrdering';
import { useScenariosList } from '../../../../../hooks/useScenariosList';
import styles from '../../businessAssetsPage.module.css';
import { ScenarioCard } from './scenarioCard/scenarioCard';
import { headerNames } from './scenariosList.constants';

export const ScenariosList = ({ searchValue }) => {
  const { scenarios } = useScenariosList();
  const { parseOrderingRequest, handleUpdateOrdering } = useOrdering();
  const [scenariosList, setScenariosList] = useState();
  useEffect(() => {
    if (searchValue) {
      const filteredList = scenarios?.filter(scenario =>
        scenario.name.toLowerCase().includes(searchValue?.toLowerCase()),
      );
      setScenariosList(filteredList);
    } else {
      setScenariosList(scenarios);
    }
  }, [searchValue, scenarios]);

  return (
    <>
      {scenarios?.length > 0 ? (
        <EntityList>
          {scenarios?.length > 0 ? (
            <>
              <EntityListHeader>
                <EntityHeaderItem />
                {headerNames.map(name => (
                  <EntityHeaderItem label={name?.label} key={name?.label} />
                ))}
              </EntityListHeader>
              <SortableList
                className={styles._tbody}
                disabled={searchValue?.length > 0}
                onReorder={v => {
                  setScenariosList(v);
                  const newOrdering = parseOrderingRequest({ list: v, takeIndex: true });
                  handleUpdateOrdering({
                    list: newOrdering,
                    entityName: 'useCases',
                    callback: () => {
                      mutate('/useCases');
                    },
                  });
                }}
                data={scenariosList}
                keyExtractor={sc => sc?.id}
                renderItem={({ item: sc, innerRef, containerProps, handleProps, isDragging }) => (
                  <EntityCard
                    ref={innerRef}
                    {...containerProps}
                    {...handleProps}
                    className={isDragging && styles._card__dragging}
                  >
                    <ScenarioCard sc={sc} />
                  </EntityCard>
                )}
              />
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                No scenarios for the following search
              </Text>
            </div>
          )}
        </EntityList>
      ) : (
        <div className={styles._no_results__contents}>
          <SearchLogs className={styles._no_results__img} />
          <Text size="xl" weight="bold" align="center" color="softPeanut">
            Still no scenarios have been created
          </Text>
        </div>
      )}
    </>
  );
};
