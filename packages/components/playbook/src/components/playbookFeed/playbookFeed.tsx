import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Icon, IconButton, Input, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import {
  usePlaybook,
  useSnippetsEnabled,
  useWhatsappEnabled,
  useUserHelpers,
} from '@bloobirds-it/hooks';
import {
  ExtensionHelperKeys,
  MIXPANEL_EVENTS,
  PlaybookTab,
  TemplateStage,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { Environment } from '../../types/playbook';
import { PlaybookTabs } from '../playbookTabs/playbookTabs';
import { TabContent } from './components/tabContent';
import styles from './playbookFeed.module.css';
import { PlaybookFeedProps } from './playbookFeed.types';
import { PlaybookFeedProvider, usePlaybookFeed } from './usePlaybookFeed';

interface TemplateSearchProps {
  setSearchValue: (value: string) => void;
  defaultOpen?: boolean;
}

const TemplateSearch = ({ setSearchValue, defaultOpen }: TemplateSearchProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  return isOpen ? (
    <Input
      icon="search"
      size="small"
      onChange={setSearchValue}
      color="verySoftPurple"
      placeholder={t('playbook.searchTemplates')}
      className={styles.noBorder}
    />
  ) : (
    <IconButton color="purple" onClick={() => setIsOpen(true)} name="search" size={20} />
  );
};

const withProvider = (Component: any) => (props: PlaybookFeedProps) => (
  <PlaybookFeedProvider
    props={{ isSmartEmail: props.environment === Environment.SMART_EMAIL, ...props }}
  >
    <Component />
  </PlaybookFeedProvider>
);

export const PlaybookFeedComponent = () => {
  const {
    accountId,
    activeBobject,
    isMainBobjectSalesStage,
    company,
    environment,
    selectedTab = PlaybookTab.PITCHES,
    setSelectedTab = () => {},
    isFilterViewOpen,
    toggleFilterView,
    stage,
    segmentationFields,
    segmentationValues,
    visibilityFilters,
    setFiltersContext,
    sidePeekEnabled = false,
    setSearchValue,
    headerComponent,
  } = usePlaybookFeed();
  const hasSnippetsEnabled = useSnippetsEnabled(accountId);
  const hasWhatsappEnabled = useWhatsappEnabled(accountId);
  const isSmartEmail = environment === Environment.SMART_EMAIL;
  const { has } = useUserHelpers();
  const { t } = useTranslation();
  const snippetsBlockHidden = has(ExtensionHelperKeys.SNIPPETS_TOOLTIP_BLOCK_HIDDEN);
  const handleChangeTab = (tab: PlaybookTab) => {
    setSelectedTab(tab);
    setFiltersContext({
      segmentationData: segmentationValues || activeBobjectSegmentationValues,
      stage: stage,
      isFilterViewOpen,
      visibilityFilters,
      shouldShowBattlecards: [PlaybookTab.PITCHES, PlaybookTab.SNIPPETS].includes(tab),
      shouldShowVisibilityFilters: tab !== PlaybookTab.QQS,
    });
  };

  const getPlaybookStage: () => TemplateStage = () => {
    if (stage) {
      return stage;
    } else {
      return isMainBobjectSalesStage ? TemplateStage.Sales : TemplateStage.Prospecting;
    }
  };

  const { activeBobjectSegmentationValues } = usePlaybook({
    stage: getPlaybookStage(),
    bobjectData: { company, activeBobject },
  });

  const haveDefaultSegmentationLoaded =
    activeBobjectSegmentationValues && Object.keys(activeBobjectSegmentationValues).length > 0;

  const headerText = !isSmartEmail
    ? t('playbook.playbook')
    : hasSnippetsEnabled
    ? t('playbook.templatesAndSnippets')
    : t('playbook.playbookTemplates');

  useEffect(() => {
    if (
      haveDefaultSegmentationLoaded &&
      isMainBobjectSalesStage === [TemplateStage.Sales, TemplateStage.All].includes(stage) &&
      !segmentationValues
    ) {
      setFiltersContext({
        segmentationData: activeBobjectSegmentationValues,
        stage,
        isFilterViewOpen,
        visibilityFilters,
        shouldShowBattlecards: [PlaybookTab.PITCHES, PlaybookTab.SNIPPETS].includes(selectedTab),
        shouldShowVisibilityFilters: selectedTab !== PlaybookTab.QQS,
      });
    }
  }, [haveDefaultSegmentationLoaded]);

  const selectedValuesNames = useMemo(() => {
    if (!segmentationValues) {
      return [];
    }
    return Object.entries(segmentationValues).reduce((acc: [string], [fieldId, itemValues]): Array<
      string
    > => {
      // @ts-ignore
      if (itemValues?.length === 0) return acc;

      const segmentationFieldsToSearch =
        stage === TemplateStage.All
          ? [
              ...segmentationFields[TemplateStage.Prospecting],
              ...segmentationFields[TemplateStage.Sales],
            ]
          : segmentationFields?.[stage];
      const segmentationField = segmentationFieldsToSearch?.find(
        segmentation => segmentation.id === fieldId,
      );

      if (!itemValues)
        return [...acc, t('playbook.allAssets', { segmentationName: segmentationField?.name })];
      // @ts-ignore
      const valuesNames = itemValues?.reduce((accField: [string], itemValue: string): Array<
        string
      > => {
        const field = segmentationField?.values?.find(segValue => segValue.id === itemValue);
        if (field) return [...accField, field?.name];
        return accField;
      }, []);

      return [...acc, ...valuesNames];
    }, []);
  }, [segmentationValues]);

  return (
    <div className={styles.container}>
      {headerComponent}
      <div className={styles.header_container}>
        <div
          className={styles.headerTitle}
          style={isSmartEmail ? { marginBottom: '24px' } : undefined}
        >
          <span className={styles.title_container}>
            <Icon name="magic" size={24} color="purple" />
            <Text color="purple" weight="bold">
              {headerText}
            </Text>
          </span>
          {selectedTab !== PlaybookTab.QQS && (
            <TemplateSearch
              setSearchValue={setSearchValue}
              defaultOpen={isSmartEmail || sidePeekEnabled}
            />
          )}
          {snippetsBlockHidden && selectedTab === PlaybookTab.SNIPPETS && isSmartEmail && (
            <IconButton
              onClick={() => {
                mixpanel.track(MIXPANEL_EVENTS.SNIPPETS_BUTTON_TIP_CLICKED);
                window.open(
                  'https://support.bloobirds.com/hc/en-us/articles/9198098513948-10-snippets-that-will-save-you-a-lot-of-time',
                  '_blank',
                );
              }}
              size={18}
              className={styles.suggestionsButton}
              name="suggestions"
              color="bloobirds"
            />
          )}
        </div>
        {/*extract this*/}
        <div className={styles.contentWrapper}>
          <Button
            size="small"
            color={isFilterViewOpen ? 'purple' : 'lightPurple'}
            uppercase={false}
            onClick={() => {
              toggleFilterView(!isFilterViewOpen, selectedTab);
            }}
          >
            <div className={styles.buttonContent}>
              <div className={styles.buttonText}>
                {selectedValuesNames?.length !== 0 ? (
                  <>
                    <Text size="xs" color="white" weight="bold" className={styles.segmentedFor}>
                      {t('playbook.selectedFilters', { count: selectedValuesNames?.length || 0 })}{' '}
                    </Text>
                    <Text size="xs" color="white" className={styles.selectedValuesNames}>
                      {selectedValuesNames?.join(', ')}
                    </Text>
                  </>
                ) : (
                  <Text size="xs" color="white" weight="bold" className={styles.segmentedFor}>
                    {t('playbook.selectSegmentationCriteria')}
                  </Text>
                )}
              </div>
              <div className={styles.buttonButtons}>
                <Icon name="sliders" color="white" size={16} />
                <IconButton
                  name="cross"
                  color="white"
                  size={16}
                  onClick={e => {
                    e.stopPropagation();
                    setFiltersContext({
                      segmentationData: undefined,
                      isFilterViewOpen,
                      stage,
                    });
                  }}
                />
              </div>
            </div>
          </Button>
        </div>
        <PlaybookTabs
          environment={environment}
          hasSnippetsEnabled={hasSnippetsEnabled}
          hasWhatsappEnabled={hasWhatsappEnabled}
          tabSelected={selectedTab}
          handleChangeTab={handleChangeTab}
          sidePeekEnabled={sidePeekEnabled}
        />
      </div>
      {segmentationFields ? (
        <TabContent />
      ) : (
        <div className={styles.spinner}>
          <Spinner name="loadingCircle" color="purple" />
        </div>
      )}
    </div>
  );
};

export const PlaybookFeed = withProvider(PlaybookFeedComponent);
