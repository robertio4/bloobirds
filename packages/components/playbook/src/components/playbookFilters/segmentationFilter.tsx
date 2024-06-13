import React from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { SegmentationData, TemplateStage } from '@bloobirds-it/types';
import { baseUrls, toSentenceCase } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { CategoryBlock } from './components/categoryBlock';
import { StageSelector } from './components/stageSelector';
import { VisibilityFiltersGroup } from './components/visibilityFiltersGroup';
import styles from './segmentationFilter.module.css';
import {
  SegmentationFilterProvider,
  useSegmentationFilter,
  VisibilityFilters,
} from './useSegmentationFilter';

export interface SegmentationFilters {
  segmentationData: any;
  stage: TemplateStage;
  isFilterViewOpen?: boolean;
  visibilityFilters?: VisibilityFilters;
  shouldShowBattlecards?: boolean;
  shouldShowVisibilityFilters?: boolean;
}

interface SegmentationFilterProps {
  activeBobjectSegmentationValues: { [id: string]: string };
  segmentationFields: SegmentationData;
  filterValues: { [key: string]: Array<string> };
  visibilityFilters: VisibilityFilters;
  setVisibilityFilters?: (x: VisibilityFilters) => void;
  setFiltersContext: React.Dispatch<React.SetStateAction<SegmentationFilters>>;
  stage: TemplateStage;
  defaultStage: TemplateStage;
  isSmartEmail: boolean;
  isSalesEnabled: boolean;
  shouldShowBattlecards: boolean;
  shouldShowVisibilityFilters: boolean;
}

const withProvider = Component => ({ ...props }: SegmentationFilterProps) => {
  return (
    <SegmentationFilterProvider {...props}>
      <Component {...props} />
    </SegmentationFilterProvider>
  );
};

const SegmentationFiltersView = ({ segmentationFields, isSalesEnabled }) => {
  const {
    selectedSegmentation,
    setSelectedSegmentation,
    isSmartEmail,
    shouldShowVisibilityFilters,
  } = useSegmentationFilter();
  const { t } = useTranslation();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  return (
    <div className={styles.wrapper}>
      {shouldShowVisibilityFilters && (
        <>
          <div
            className={clsx(styles.header, {
              [styles.smartHeader]: isSmartEmail,
            })}
          >
            <Text weight="bold">{t('playbook.segmentationFilter.segmentationAndFilters')}</Text>
          </div>
          <VisibilityFiltersGroup />
        </>
      )}
      <div
        className={clsx(styles.segmentationHeader, {
          [styles.smartSegmentationHeader]: isSmartEmail,
        })}
      >
        <Text weight="bold" size={shouldShowVisibilityFilters ? 's' : 'l'}>
          {t('playbook.segmentationFilter.segmentation')}
        </Text>
        <IconButton
          name="settings"
          color="purple"
          onClick={() =>
            window.open(
              `${baseUrls[process.env.NODE_ENV]}/app/playbook/messaging-segmentation`,
              '_blank',
            )
          }
        />
      </div>
      {isSalesEnabled && !isNoStatusPlanAccount && <StageSelector />}
      {[
        { stage: TemplateStage.Prospecting, key: 'playbook.segmentationFilter.prospect' },
        { stage: TemplateStage.Sales, key: 'playbook.segmentationFilter.sales' },
      ].map(
        ({ stage, key }) =>
          segmentationFields?.[stage]?.length > 0 && (
            <div
              className={clsx(styles.selectorsWrapper, {
                [styles.smartSelectorsWrapper]: isSmartEmail,
              })}
              key={stage}
            >
              {!isNoStatusPlanAccount && (
                <Text size="xs" color="purple" weight="bold" className={styles.segmentationTitle}>
                  {t(key)}
                </Text>
              )}
              {segmentationFields?.[stage]?.map(segmentation => (
                <CategoryBlock
                  key={segmentation.id}
                  segmentationField={segmentation}
                  selectedValues={selectedSegmentation?.[segmentation.id]}
                  onChange={value =>
                    setSelectedSegmentation({
                      ...selectedSegmentation,
                      ...(value?.length > 0 ? { [segmentation.id]: value } : {}),
                    })
                  }
                />
              ))}
            </div>
          ),
      )}
    </div>
  );
};

export const SegmentationFilter = withProvider(SegmentationFiltersView);
