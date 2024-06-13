import { useTranslation } from 'react-i18next';

import { Item, Select } from '@bloobirds-it/flamingo-ui';
import { MessagesEvents, TemplateStage } from '@bloobirds-it/types';
import clsx from 'clsx';

import styles from '../segmentationFilter.module.css';
import { useSegmentationFilter } from '../useSegmentationFilter';

export const StageSelector = () => {
  const {
    stageSelector: [stage, setSelectedStage],
    isSmartEmail,
    defaultStage,
  } = useSegmentationFilter();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.segmentationFilter' });

  const updateStage = (stage: TemplateStage) => {
    setSelectedStage(stage);
    window.dispatchEvent(new CustomEvent(MessagesEvents.PlaybookFeed));
  };

  const renderStage = (stage: TemplateStage) => {
    switch (stage) {
      case TemplateStage.All:
        return t('prospectAndSalesStages');
      case TemplateStage.Prospecting:
        return t('prospectStage');
      case TemplateStage.Sales:
        return t('salesStage');
    }
  };

  return (
    <div className={clsx(styles.stageSelector, { [styles.smartStageSelector]: isSmartEmail })}>
      <Select
        size="small"
        placeholder={t('stage')}
        width="100%"
        borderless={false}
        renderDisplayValue={renderStage}
        onChange={updateStage}
        value={stage ? stage : defaultStage}
      >
        <Item value={TemplateStage.All}>{t('all')}</Item>
        <Item value={TemplateStage.Prospecting}>{t('prospectStage')}</Item>
        <Item value={TemplateStage.Sales}>{t('salesStage')}</Item>
      </Select>
    </div>
  );
};
