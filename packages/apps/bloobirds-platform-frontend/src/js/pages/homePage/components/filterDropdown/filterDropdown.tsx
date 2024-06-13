import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, IconButton, Item, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import clsx from 'clsx';

import { useHasBeenVisible } from '../../../../hooks/useHasBeenVisible';
import styles from '../../homePage.module.css';
import { useUserHomepageSettings } from '../../hooks/useUserHomepageSettings';
import {
  CONFIG_TYPE_BY_STAGE,
  defaultFilters,
  Filters,
  Stage,
} from '../../pages/leftContent/utils/utils';
import { ConfigType, UserHomeConfig } from '../../typings/home';
import { getAvailableUserConfig, getUserSettingConfigType } from '../../utils/homepage';

  //TODO this needs a deep refactor if we're gonna use it with no status
export const FilterDropdown = ({
  stage,
  updateFilters,
  saveEnabled = true,
  isInCalendar = false,
}: {
  stage: string;
  updateFilters: (param: Filters) => void;
  saveEnabled?: boolean;
  isInCalendar?: boolean;
}) => {
  const isNoStatusAccount = useIsNoStatusPlanAccount();
  const { t } = useTranslation();
  const { ref, visible, setVisible } = useVisible();
  const hasBeenVisible = useHasBeenVisible(visible);
  const { availableSettings, userSettings, updateHomeSettings } = useUserHomepageSettings();
  const [filters, setFilters] = React.useState<Filters>(defaultFilters);

  const availableFilters = useMemo(() => {
    return {
      prospect: getAvailableUserConfig(availableSettings, ConfigType.TASKS_SECTION_FILTERS),
      sales: getAvailableUserConfig(availableSettings, ConfigType.TASKS_SECTION_FILTERS_SALES),
    };
  }, [availableSettings]);

  const userFilters = useMemo(() => {
    return {
      prospect: getUserSettingConfigType(userSettings, ConfigType.TASKS_SECTION_FILTERS),
      sales: getUserSettingConfigType(userSettings, ConfigType.TASKS_SECTION_FILTERS_SALES),
    };
  }, [userSettings]);

  useEffect(() => {
    const PROSPECT = userFilters.prospect ?? availableFilters.prospect;
    const SALES = userFilters.sales ?? availableFilters.sales;
    if (PROSPECT && SALES) {
      const initFilters: Filters = { PROSPECT, SALES };
      setFilters(initFilters);
      updateFilters(initFilters);
    }
  }, [availableSettings, userSettings]);

  const isProspectStage = stage === 'PROSPECT';
  const isSalesStage = stage === 'SALES';
  const isAllStage = stage === 'ALL';

  const updateFilterEnabled = (stage: Stage, filter: UserHomeConfig, enabled: boolean) => {
    const newFilters = (isNoStatusAccount
      ? Object.fromEntries(
          Object.entries(filters).map(([stage, stageFilters]) => {
            return [
              stage as 'PROSPECT' | 'SALES',
              stageFilters.map(filterValue => {
                if (filterValue.name === filter.name) {
                  filterValue = { ...filterValue, enabled: enabled };
                }
                return filterValue;
              }),
            ];
          }),
        )
      : {
          ...filters,
          [stage]: filters[stage].map(f => {
            let ret = f;
            if (f.enumName === filter.enumName) {
              ret = { ...f, enabled: enabled };
            }
            return ret;
          }),
        }) as Filters;
    setFilters(newFilters);
    updateFilters(newFilters);
  };

  useEffect(() => {
    if (saveEnabled) {
      if (hasBeenVisible && !visible) {
        switch (stage) {
          case 'PROSPECT':
            updateHomeSettings(filters.PROSPECT, CONFIG_TYPE_BY_STAGE.PROSPECT);
            break;
          case 'SALES':
            updateHomeSettings(filters.SALES, CONFIG_TYPE_BY_STAGE.SALES);
            break;
          case 'ALL':
            updateHomeSettings(filters.PROSPECT, CONFIG_TYPE_BY_STAGE.PROSPECT);
            updateHomeSettings(filters.SALES, CONFIG_TYPE_BY_STAGE.SALES);
        }
      }
    }
  }, [visible, hasBeenVisible]);

  if (!availableSettings || !filters || !filters.PROSPECT || !filters.SALES) {
    return <></>;
  }

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      anchor={
        <IconButton
          size={isInCalendar ? 24 : 20}
          onClick={() => setVisible(!visible)}
          name="sliders"
          color="bloobirds"
        />
      }
    >
      {isAllStage && !isNoStatusAccount && (
        <div className={styles._tasks_dropdown_title}>
          <Text size="s" color="peanut" className={styles.title_text}>
            {t('common.prospecting')}
          </Text>
        </div>
      )}
      {(isProspectStage || isAllStage || isNoStatusAccount) && (
        <div>
          {availableFilters?.prospect?.map(filter => {
            const enabled = filters.PROSPECT.find(f => f.enumName === filter.enumName)?.enabled;
            if (isNoStatusAccount && !['Overdue', 'Completed'].includes(filter.name)) return null;
            return (
              <Item
                value={filter.id}
                key={'dropdown-home-left-filter-prospecting-' + filter.id}
                className={clsx(styles._tasks_item, {
                  [styles.overdue_item]: !isNoStatusAccount && filter?.enumName.includes('OVERDUE'),
                })}
                onClick={() => updateFilterEnabled('PROSPECT', filter, !enabled)}
              >
                <Text size="s" htmlTag="span" color={enabled ? 'bloobirds' : 'softPeanut'}>
                  {filter.name}
                </Text>
                <Icon name={enabled ? 'eye' : 'eyeOff'} size={16} />
              </Item>
            );
          })}
        </div>
      )}
      {isAllStage && !isNoStatusAccount && (
        <div className={clsx(styles._tasks_dropdown_title, styles._tasks_dropdown_title_sales)}>
          <Text size="s" color="peanut" className={styles.title_text}>
            {t('common.sales')}
          </Text>
        </div>
      )}
      {(isSalesStage || isAllStage) && !isNoStatusAccount && (
        <div>
          {availableFilters?.sales?.map(filter => {
            const enabled = filters.SALES.find(f => f.enumName === filter.enumName)?.enabled;
            if (isNoStatusAccount && !['Overdue', 'Completed'].includes(filter.name)) return null;
            return (
              <Item
                value={filter.id}
                key={'dropdown-home-left-filter-sales-' + filter.id}
                className={clsx(styles._tasks_item, {
                  [styles.overdue_item]: !isNoStatusAccount && filter?.enumName.includes('OVERDUE'),
                })}
                onClick={() => updateFilterEnabled('SALES', filter, !enabled)}
              >
                <Text size="s" htmlTag="span" color={enabled ? 'bloobirds' : 'softPeanut'}>
                  {filter.name}
                </Text>
                <Icon name={enabled ? 'eye' : 'eyeOff'} size={16} />
              </Item>
            );
          })}
        </div>
      )}
    </Dropdown>
  );
};
