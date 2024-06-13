import React, { useEffect } from 'react';

import { Item, Select, Switch, Text } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { TemplateStage } from '@bloobirds-it/types';

import { useMessagingFilterOptions } from '../../../../hooks';
import {
  useActiveMessagingCadenceFilter,
  useActiveMessagingSegmentationValuesFilter,
  useActiveMessagingStageFilter,
  useActiveMessagingVisibilityFilter,
} from '../../../../hooks/useActiveMessagingFilters';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { TEMPLATE_TYPES } from '../../../../utils/templates.utils';
import styles from './messagingFilters.module.css';

const MessagingFilters = ({ id }: { id: string }) => {
  const [stage, setStage] = useActiveMessagingStageFilter();
  const [showCadenceTemplates, setShowCadenceTemplates] = useActiveMessagingCadenceFilter();
  const [visibility, setVisibility] = useActiveMessagingVisibilityFilter();
  const {
    setOneSegmentationValue,
    resetActiveMessagingFilters,
  } = useActiveMessagingSegmentationValuesFilter();
  const messagingFilters = useMessagingFilterOptions(stage);
  const isFullSalesEnabled = useFullSalesEnabled();
  const isEmailTemplates = id.includes(TEMPLATE_TYPES.EMAIL);
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  useEffect(() => {
    resetActiveMessagingFilters();
    setStage(isNoStatusPlanAccount ? TemplateStage.Sales : TemplateStage.Prospecting);
  }, []);

  return (
    <div className={styles._container}>
      {isFullSalesEnabled && (
        <>
          <Select
            width="130px"
            size="small"
            value={stage}
            onChange={newState => {
              setStage(newState);
              resetActiveMessagingFilters();
            }}
          >
            <Item value="ALL" key="all">
              All
            </Item>
            <Item value="PROSPECT" key="prospect">
              Prospect stage
            </Item>
            <Item value="SALES" key="sales">
              Sales stage
            </Item>
          </Select>
          <div className={styles._separator} />
        </>
      )}
      <Select
        width="130px"
        size="small"
        placeholder="Visibility"
        value={visibility}
        className={styles._visibility_select}
        onChange={newState => {
          setVisibility(newState);
        }}
      >
        <Item value={null} key="ALL">
          All
        </Item>
        <Item value="PUBLIC" key="PUBLIC">
          Public
        </Item>
        <Item value="PRIVATE" key="PRIVATE">
          Private
        </Item>
      </Select>
      {messagingFilters.map(filter => (
        <div key={filter.id} className={styles._filter__container}>
          <Select
            width="120px"
            placeholder={filter.label}
            size="small"
            onChange={value => setOneSegmentationValue(filter.id, value)}
          >
            <Item value="" key={filter.id}>
              All {filter.label}
            </Item>
            {filter.values?.map(filterValue => (
              <Item value={filterValue.id} key={filterValue.id}>
                {filterValue.name}
              </Item>
            ))}
          </Select>
        </div>
      ))}
      {isEmailTemplates && (
        <div className={styles._show_cadences_templates}>
          <Text size="xs">Show just templates used in cadences</Text>
          <Switch
            checked={showCadenceTemplates}
            color="purple"
            onChange={value => setShowCadenceTemplates(value || null)}
          />
        </div>
      )}
    </div>
  );
};

export default MessagingFilters;
