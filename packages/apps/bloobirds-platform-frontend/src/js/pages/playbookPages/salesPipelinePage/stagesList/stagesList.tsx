import React, { useState } from 'react';

import { SortableList, Spinner, Text } from '@bloobirds-it/flamingo-ui';

import { SearchLogs } from '../../../../../assets/svg';
import { EntityCard } from '../../../../components/entityList/entityCard/entityCard';
import {
  EntityHeaderItem,
  EntityList,
  EntityListHeader,
} from '../../../../components/entityList/entityList';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import { useEntity, usePicklistValues } from '../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import { BobjectPicklistValueEntity } from '../../../../typings/entities.js';
import { api } from '../../../../utils/api';
import { useStageCreation } from '../hooks/useStageCreation';
import { NewStageCard } from '../newStageCard/newStageCard';
import { StageCard } from '../stageCard/stageCard';
import { headerNames } from './stagesList.constants';
import styles from './stagesList.module.css';

export const StagesList = () => {
  const values = usePicklistValues({ picklistLogicRole: OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS });
  const settings = useUserSettings();
  const [picklistValues, setPicklistValues] = useState<BobjectPicklistValueEntity[]>(
    values?.sort((a, b) => a.ordering - b.ordering),
  );
  const bobjectFields = useEntity('bobjectFields');
  const stageField = bobjectFields?.findByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
  const { stageCreation } = useStageCreation();
  const handleSave = async (valuesData: BobjectPicklistValueEntity[]) => {
    if (values[0]?.bobjectField) {
      const valuesToSave = {
        values: valuesData?.map((v: BobjectPicklistValueEntity, i: number) => ({
          value: v.value,
          enabled: v.enabled,
          id: v.id,
          ordering: i,
          score: v.score,
          account: `/accounts/${settings.account.id}`,
        })),
      };
      await api
        .put(`/utils/picklists/bobjectField/${values[0]?.bobjectField}`, valuesToSave)
        .then(() => {
          forceSelectedEntitiesCacheRefresh(['bobjectPicklistFieldValues']);
        });
    }
  };

  const handleTemporaryDeleteStage = (id: string) => {
    setPicklistValues(picklistValues?.filter(value => value?.id !== id));
  };

  const handleTemporaryAddStage = (stage: any) => {
    setPicklistValues([stage, ...picklistValues]);
  };

  return (
    <>
      {values ? (
        <EntityList className={undefined}>
          {values?.length > 0 ? (
            <>
              <EntityListHeader className={undefined}>
                <EntityHeaderItem order={undefined} />
                {headerNames.map(name => (
                  <EntityHeaderItem
                    label={name?.label}
                    key={name?.labelg}
                    order={undefined}
                    onClick={undefined}
                  />
                ))}
              </EntityListHeader>
              {stageCreation && (
                <NewStageCard bobjectFieldId={stageField?.id} addStage={handleTemporaryAddStage} />
              )}
              <SortableList
                className={styles._tbody}
                onReorder={data => {
                  setPicklistValues(data);
                  handleSave(data);
                }}
                data={picklistValues}
                renderItem={({
                  innerRef,
                  item: stage,
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
                    <StageCard stage={stage} handleDelete={handleTemporaryDeleteStage} />
                  </EntityCard>
                )}
                keyExtractor={stage => stage.id}
              />
            </>
          ) : (
            <div className={styles._no_results__contents}>
              <SearchLogs className={styles._no_results__img} />
              <Text size="xl" weight="bold" align="center" color="softPeanut">
                Still no stages have been created
              </Text>
            </div>
          )}
        </EntityList>
      ) : (
        <Spinner name="dots" />
      )}
    </>
  );
};
