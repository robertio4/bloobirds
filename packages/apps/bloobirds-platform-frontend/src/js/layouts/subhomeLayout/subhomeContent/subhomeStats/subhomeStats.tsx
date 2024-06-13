import React, { useEffect, useState } from 'react';
import { CheckItem, Item, MultiSelect, Select, Skeleton } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';
import { StatsItem } from '../../../../components/statsItem/statsItem';
import { toTitleCase } from '../../../../utils/strings.utils';
import styles from './subhomeStats.module.css';
import {
  StatsTab,
  timeWindowInterface,
  timeWindowsByTab,
  trackMixpanel,
  useStatsMetrics,
} from './useStats';
import { useSubhome } from '../../subhomeLayout';
import { useGlobalPicklistValues } from '../../../../hooks/usePicklistValues';
import { UserObject } from '../../../../typings/user';
import { useUserSettings } from '../../../../components/userPermissions/hooks';

export interface Metric {
  label: string;
  value: number;
  change: number;
  type: 'CURRENCY' | 'NUMBER';
}

/**
 * Stats component for subhome pages.
 *
 * To add a tab go to useStats.ts and follow:
 *    1. Add a new tab to the statsURLs object with the name of the tab and the url to fetch the data
 (You can choose the name you want, just be consistent)
 *    2. Add the corresponding Mixpanel event in mixpanelEvent
 *    3. Add the tab to the timeWindowsByTab object
 *          (if needed, Create a new time window list and use it in the timeWindowsByTab object)
 *
 * To use the component you can just use it on the tab. Make sure to check the toggleStatsButton.tsx
 *
 * @param tab - name of the tab used only for internal purposes of the component
 * @param thereAreItemsSelected - true when we want to hide the stats
 * @param showAssignedToFilter - true when we want to show the assigned to filter
 * @constructor
 *
 * @example
 * <SubhomeStats tab={'prospectCompanyDelivered'} thereAreItemsSelected={selectedItems.length > 0} />
 *
 */
const SubhomeStats = ({
  tab,
  thereAreItemsSelected = false,
  showAssignedToFilter = false,
}: {
  tab: StatsTab;
  thereAreItemsSelected?: boolean;
  showAssignedToFilter?: boolean;
}) => {
  const timeWindows = timeWindowsByTab[tab];
  const [timeWindow, setTimeWindow] = useState(timeWindows.default);
  const [assignedToFilter, setAssignedToFilter] = useState<string[]>();
  const metrics = useStatsMetrics(tab, timeWindow, assignedToFilter);
  const { showStats } = useSubhome();

  return (
    <div
      className={clsx(styles._stats_container, {
        [styles._transition]: !showStats || thereAreItemsSelected,
      })}
    >
      {showStats && !!metrics ? (
        <div className={styles.statsContent}>
          <div className={styles.selectorWrapper}>
            <TimeWindowFilter tab={tab} timeWindows={timeWindows} setTimeWindow={setTimeWindow} />
            {showAssignedToFilter && <AssignedToFilter setAssignedToFilter={setAssignedToFilter} />}
          </div>
          <StatsMetrics metrics={metrics} />
        </div>
      ) : (
        <Skeleton width="100%" variant="rect" height={100} />
      )}
    </div>
  );
};

/*** Sub-Components ***/

const StatsMetrics = ({ metrics }: { metrics: Metric[] }) => {
  return (
    <>
      {metrics?.map(metric => (
        <StatsItem
          key={metric?.label}
          name={typeof metric?.label === 'string' ? toTitleCase(metric.label) : 'Metric'}
          value={metric?.value}
          type={metric?.type}
          percentage={metric?.change}
        />
      ))}
    </>
  );
};

interface TimeWindowFilterProps {
  tab: StatsTab;
  timeWindows: timeWindowInterface;
  setTimeWindow: (window: string) => void;
}
const TimeWindowFilter = ({ tab, timeWindows, setTimeWindow }: TimeWindowFilterProps) => {
  const handleTimeWindow = (value: string) => {
    trackMixpanel(tab, value);
    setTimeWindow(value);
  };
  return (
    <Select defaultValue={timeWindows.default} size="small" onChange={handleTimeWindow}>
      {timeWindows.windows.map(window => (
        <Item key={`stats-time-window-${window.logicRole}`} value={window.logicRole}>
          {window.label}
        </Item>
      ))}
    </Select>
  );
};

interface AssignedToFilterProps {
  setAssignedToFilter: (value: string[]) => void;
}
const AssignedToFilter = ({ setAssignedToFilter }: AssignedToFilterProps) => {
  const settings = useUserSettings();
  const defaultUserId = settings?.user.id;
  const users = useGlobalPicklistValues({ logicRole: 'USER' })?.filter(
    (user: UserObject) => user?.enabled,
  );
  useEffect(() => {
    setAssignedToFilter([defaultUserId]);
  }, []);
  const getDisplayName = (selectedUserIds: string[]) => {
    if (selectedUserIds.length === 1 && selectedUserIds[0] === defaultUserId) {
      return 'Me';
    } else if (selectedUserIds.length === users.length) {
      return 'All selected';
    }
    return 'Assigned to';
  };
  return (
    <MultiSelect
      placeholder={'Me'}
      size="small"
      onChange={setAssignedToFilter}
      borderless
      selectAllOption
      defaultValue={[defaultUserId]}
      renderDisplayValue={getDisplayName}
    >
      {users.map(user => (
        <CheckItem key={user.id} value={user.id}>
          {user.value}
        </CheckItem>
      ))}
    </MultiSelect>
  );
};

export default SubhomeStats;
