import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount, useIsOTOAccount } from '@bloobirds-it/hooks';
import mixpanel from 'mixpanel-browser';

import { TabBarTooltip } from '../../../../components/discoveryTooltips/welcomeTooltips/tabBarTooltip';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import { useMediaQuery } from '../../../../hooks';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { FilterDropdown } from '../../components/filterDropdown/filterDropdown';
import IconOpenAppCalendar from '../../components/openAppCalendar/openAppCalendar';
import { StartTask } from '../../components/startTask/startTask';
import { TaskList } from '../../components/taskList/taskList';
import { TaskListSales } from '../../components/taskListSales/taskListSales';
import styles from '../../homePage.module.css';
import { useUserHomepageSettings } from '../../hooks/useUserHomepageSettings';
import { ConfigType, UserHomeConfig } from '../../typings/home';
import { getAvailableUserConfig, getUserSettingConfigType } from '../../utils/homepage';
import { defaultFilters, Filters, isStatus, Stages } from './utils/utils';

const LeftContent = () => {
  const isNoStatusPlan = useIsNoStatusPlanAccount();
  const { isMediumDesktop, isSmallDesktop } = useMediaQuery();
  const { availableSettings, userSettings, updateHomeSettings } = useUserHomepageSettings();
  const isOTOAccount = useIsOTOAccount();
  const listRef = useRef<HTMLDivElement>(null);
  const hasSalesEnabled = useFullSalesEnabled();
  const [selectedStage, setSelectedStage] = useState<Stages>('ALL');
  const [selectedFilters, setSelectedFilters] = useState(defaultFilters);
  const [isAnyFilterSelected, setIsAnyFilterSelected] = useState(false);
  const [importantSelected, setImportantSelected] = useState(false);
  const { t } = useTranslation();
  /*** save config to BE ***/
  const availableStages = useMemo(
    () => getAvailableUserConfig(availableSettings, ConfigType.TASKS_SECTION_SELECTOR),
    [availableSettings],
  );
  const userStageConfig = useMemo(
    () => getUserSettingConfigType(userSettings, ConfigType.TASKS_SECTION_SELECTOR),
    [userSettings],
  );

  useEffect(() => {
    if (userStageConfig) {
      const prospect = userStageConfig.find(stage => stage.enumName === 'PROSPECTING')?.enabled;
      const sales = userStageConfig.find(stage => stage.enumName === 'SALES')?.enabled;

      if (hasSalesEnabled) {
        if ((prospect && sales) || (!prospect && !sales)) {
          if (selectedStage !== 'ALL') setSelectedStage('ALL');
        } else if (prospect) {
          if (selectedStage !== 'PROSPECT') setSelectedStage('PROSPECT');
        } else if (sales) {
          if (selectedStage !== 'SALES') setSelectedStage('SALES');
        }
      } else {
        setSelectedStage('PROSPECT');
      }
    } else {
      if (hasSalesEnabled) {
        setSelectedStage('ALL');
      } else {
        setSelectedStage('PROSPECT');
      }
    }
  }, [hasSalesEnabled, userStageConfig]);

  const updateSelector = (stage: Stages) => {
    let config: UserHomeConfig[];
    if (stage === 'ALL') {
      config = availableStages.map(availableStage => {
        return { ...availableStage, enabled: true };
      });
    } else if (stage === 'SALES') {
      config = availableStages.map(availableStage => {
        if (availableStage.enumName === 'SALES') {
          return { ...availableStage, enabled: true };
        } else return { ...availableStage, enabled: false };
      });
    } else {
      config = availableStages.map(availableStage => {
        if (availableStage.enumName === 'PROSPECTING') {
          return { ...availableStage, enabled: true };
        } else return { ...availableStage, enabled: false };
      });
    }
    updateHomeSettings(config, ConfigType.TASKS_SECTION_SELECTOR);
  };

  const updateStage = (stage: Stages) => {
    mixpanel.track(MIXPANEL_EVENTS.HOME_TASKS_SELECTOR_CHANGED);
    setSelectedStage(stage);
    updateSelector(stage);
  };

  const updateFilters = (filters: Filters) => {
    setSelectedFilters(filters);
    if (hasSalesEnabled) {
      if (selectedStage === 'ALL') {
        setIsAnyFilterSelected(
          !!filters.PROSPECT.find(f => !isStatus(f.enumName) && f.enabled) ||
            !!filters.SALES.find(f => !isStatus(f.enumName) && f.enabled),
        );
      } else {
        setIsAnyFilterSelected(
          !!filters[selectedStage].find(f => !isStatus(f.enumName) && f.enabled),
        );
      }
    } else {
      setIsAnyFilterSelected(!!filters.PROSPECT.find(f => !isStatus(f.enumName) && f.enabled));
    }
  };

  if (!selectedStage) {
    return null;
  }
  return (
    <div className={styles.leftContent__container}>
      <div className={styles.column__header}>
        <div className={styles.column__title}>
          {!isOTOAccount && <TabBarTooltip defaultTooltipVisible />}
          {!(isMediumDesktop || isSmallDesktop) && (
            <Text size="m" color="softPeanut" className={styles.title_text}>
              {t('home.leftContent.todayTasks')}
            </Text>
          )}
          {!isNoStatusPlan && hasSalesEnabled && (
            <Select size="small" onChange={updateStage} value={selectedStage}>
              <Item value="ALL" key="home-left-stage-all">
                {t('common.all')}
              </Item>
              <Item value="PROSPECT" key="home-left-stage-prospecting">
                {t('common.prospecting')}
              </Item>
              <Item value="SALES" key="home-left-stage-sales">
                {t('common.sales')}
              </Item>
            </Select>
          )}
          <IconButton
            size={20}
            name={importantSelected ? 'flagFilled' : 'flag'}
            color={importantSelected ? 'softTomato' : 'softPeanut'}
            onClick={() => setImportantSelected(!importantSelected)}
          />
          <div className={styles.sliderRotate}>
            <FilterDropdown stage={selectedStage} updateFilters={updateFilters} />
          </div>
          <IconOpenAppCalendar />
        </div>
        <div className={styles.column__title}>
          {!isOTOAccount && (
            <StartTask
              isSales={selectedStage === 'SALES'}
              disabled={!isAnyFilterSelected}
              withSales={hasSalesEnabled}
            />
          )}
        </div>
      </div>
      <div className={styles.task_list} ref={listRef}>
        {!hasSalesEnabled ? (
          <TaskList
            filters={selectedFilters.PROSPECT}
            parentRef={listRef}
            importantSelected={importantSelected}
          />
        ) : (
          <TaskListSales
            stage={selectedStage}
            taskFilters={selectedFilters}
            parentRef={listRef}
            importantSelected={importantSelected}
          />
        )}
      </div>
    </div>
  );
};

export default LeftContent;
