import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, createToast, IconButton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useHasNewTaskFeed, useIsB2CAccount } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES, PluralBobjectTypes, SalesforceTabs } from '@bloobirds-it/types';
import clsx from 'clsx';
import { mutate } from 'swr';

import CreateTaskButton from '../../../../../../createTaskButton/createTaskButton';
import { useExtensionLeftBarContext } from '../../../../../extensionLeftBarContext';
import { TasksTabFilters } from '../../../../views/newTasksView/filters/tasksTabFilters';
import { useTaskFeedContext } from '../../../../views/newTasksView/hooks/useTasksTab';
import { useSubhomeContext } from '../../subhomeLayout';
import styles from './subhomeHeader.module.css';
import SubhomeTab from './subhomeTabs/subhomeTab/subhomeTab';
import SubhomeTabs from './subhomeTabs/subhomeTabs';

function FiltersIcon(props: { onClick: () => void }) {
  const { t } = useTranslation();
  const { useTaskFeedFilterValues } = useTaskFeedContext();
  const { filterValuesTouched, resetFilterValues } = useTaskFeedFilterValues();
  const filtersIconClass = clsx({
    [styles._filtersTouched]: filterValuesTouched,
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const mutateList = () => {
    mutate(
      key => typeof key === 'string' && key.includes('task-feed') && !key.includes('configuration'),
    ).then(() => {
      setIsLoading(false);
      createToast({ message: t('taskFeed.reload'), type: 'success' });
    });
  };

  return (
    <div className={styles._filters_handling_wrapper}>
      <div className={styles._filtersIcon}>
        <IconButton
          name="slidersHor"
          size={16}
          color="bloobirds"
          onClick={props.onClick}
          className={filtersIconClass}
        />
      </div>
      {filterValuesTouched && (
        <Button
          uppercase={false}
          variant="clear"
          iconLeft="cross"
          onClick={resetFilterValues}
          size="small"
          className={styles._clear_button}
        >
          {t('common.clear')}
        </Button>
      )}
      <RefreshIcon isLoading={isLoading} onClick={mutateList} />
      <CreateTaskButton location="leftBar" className={styles._create_task_button} />
    </div>
  );
}

const RefreshIcon = ({ isLoading, onClick }: { isLoading: boolean; onClick: () => void }) => {
  return (
    <div className={styles._refresh_icon}>
      {isLoading ? (
        <Spinner name="loadingCircle" size={10} />
      ) : (
        <IconButton name="redoReload" size={16} color="bloobirds" onClick={onClick} />
      )}
    </div>
  );
};

const SubhomeHeader = () => {
  const { t } = useTranslation();
  const { updateLastVisitedPipeline, pipelineCounters } = useExtensionLeftBarContext();
  const isB2CAccount = useIsB2CAccount();
  const accountId = useActiveAccountId();
  const hasNewTaskFeed = useHasNewTaskFeed(accountId);

  const [showFilters, setShowFilters] = React.useState(false);

  const {
    selectedTab,
    selectedSubhomeTab,
    setSelectedSubhomeTab,
    tabBobject,
  } = useSubhomeContext();

  const isPageWithTabs = [SalesforceTabs.PIPELINE, SalesforceTabs.INACTIVE].includes(selectedTab);
  const isPipelinePage = selectedTab === SalesforceTabs.PIPELINE;
  const isTasksPage = selectedTab === SalesforceTabs.TASKS;

  useEffect(() => {
    return () => {
      if (isPipelinePage) {
        updateLastVisitedPipeline(tabBobject);
      }
    };
  }, [tabBobject]);

  //If the selected subhome tab is Company but the account is B2C, then we set the selected subhome tab to Lead
  useEffect(() => {
    if (isB2CAccount && selectedSubhomeTab === PluralBobjectTypes.Company) {
      setSelectedSubhomeTab(PluralBobjectTypes.Lead);
    }
  }, [selectedSubhomeTab]);

  return (
    <>
      <div className={styles._header} id="subhomeHeader">
        <div className={styles._subhomeHeaderTitle}>
          <Text className={styles._tittle} size="l" color="softPeanut" weight="medium">
            {t(`leftBar.${selectedTab}`)}
          </Text>
          {isTasksPage && hasNewTaskFeed && (
            <FiltersIcon onClick={() => setShowFilters(!showFilters)} />
          )}
        </div>
        {isPageWithTabs && (
          <SubhomeTabs>
            {!isB2CAccount && (
              <SubhomeTab
                icon="company"
                active={selectedSubhomeTab === PluralBobjectTypes.Company}
                onClick={() => {
                  setSelectedSubhomeTab(PluralBobjectTypes.Company);
                }}
                counter={
                  isPipelinePage && pipelineCounters[BOBJECT_TYPES.COMPANY] > 0
                    ? pipelineCounters[BOBJECT_TYPES.COMPANY]
                    : undefined
                }
              >
                {t('common.company_other')}
              </SubhomeTab>
            )}
            <SubhomeTab
              icon="person"
              active={selectedSubhomeTab === PluralBobjectTypes.Lead}
              onClick={() => setSelectedSubhomeTab(PluralBobjectTypes.Lead)}
              counter={
                isPipelinePage && pipelineCounters[BOBJECT_TYPES.LEAD] > 0
                  ? pipelineCounters[BOBJECT_TYPES.LEAD]
                  : undefined
              }
            >
              {t('common.lead_other')}
            </SubhomeTab>
            <SubhomeTab
              icon="fileOpportunity"
              active={selectedSubhomeTab === PluralBobjectTypes.Opportunity}
              onClick={() => setSelectedSubhomeTab(PluralBobjectTypes.Opportunity)}
              counter={
                isPipelinePage && pipelineCounters[BOBJECT_TYPES.OPPORTUNITY] > 0
                  ? pipelineCounters[BOBJECT_TYPES.OPPORTUNITY]
                  : undefined
              }
            >
              {t('common.opportunity_other')}
            </SubhomeTab>
          </SubhomeTabs>
        )}
      </div>
      {isTasksPage && hasNewTaskFeed && <TasksTabFilters filtersVisible={showFilters} />}
    </>
  );
};

export default SubhomeHeader;
