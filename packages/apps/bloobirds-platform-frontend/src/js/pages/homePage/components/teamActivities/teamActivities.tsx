import React from 'react';

import { BarChart, Icon, Text, toRgba } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { ACTIVITY_TYPES } from '../../../../constants/activity';
import { DataScope } from '../../../dashboardPages/v1/panels/shared/DataScope';
import styles from '../../homePage.module.css';
import { useTeamActivitiesChart } from '../../hooks/useTeamActivitiesChart';
import { TIME_WINDOW } from '../../typings/home';

export const TeamActivities = ({ timeWindow }: { timeWindow: TIME_WINDOW }) => {
  const { data, chartData } = useTeamActivitiesChart(timeWindow);
  const settings = useUserSettings();
  const dataKeys = [
    ...new Set(chartData?.flatMap(x => Object.keys(x)).filter(y => y !== 'groupKey' && y !== 'id')),
  ];
  const { customTasks } = useCustomTasks({ disabled: true });

  return (
    <>
      {data?.length > 0 ? (
        <div className={styles.chart_container}>
          <DataScope max={8} data={chartData}>
            {({ visibleData }: any) => {
              const getDataKeyColor = (dataKey: any, index: number) => {
                const myUser = visibleData[index]?.id;
                const customTask = customTasks?.find(ct => dataKey === ct.name);

                switch (dataKey) {
                  case ACTIVITY_TYPES.EMAIL:
                    return myUser === settings?.user?.id
                      ? 'var(--tangerine)'
                      : 'var(--verySoftTangerine)';
                  case ACTIVITY_TYPES.CALL:
                    return myUser === settings?.user?.id
                      ? 'var(--extraCall)'
                      : 'var(--verySoftMelon)';
                  case ACTIVITY_TYPES.LINKEDIN:
                    return myUser === settings?.user?.id
                      ? 'var(--bloobirds)'
                      : 'var(--verySoftBloobirds)';
                  default:
                    if (customTask) {
                      return myUser === settings?.user.id
                        ? toRgba(customTask.iconColor, 1)
                        : toRgba(customTask.iconColor, 0.4);
                    }
                    return myUser === settings?.user?.id
                      ? 'var(--bloobirds)'
                      : 'var(--verySoftBloobirds)';
                }
              };
              return (
                <BarChart
                  dataKeys={dataKeys}
                  groupKey="groupKey"
                  onBarClick={undefined}
                  points={visibleData}
                  getDataKeyColor={getDataKeyColor}
                  showTooltip={true}
                />
              );
            }}
          </DataScope>
        </div>
      ) : (
        <div className={styles.noData}>
          <Icon name="search" color="softPeanut" />
          <Text size="s" color="softPeanut">
            No data
          </Text>
        </div>
      )}
    </>
  );
};
