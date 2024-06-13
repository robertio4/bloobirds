import React, { useMemo } from 'react';

import { BarChart, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useDataModel, usePicklist } from '@bloobirds-it/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { softColors } from '@bloobirds-it/utils';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { DataScope } from '../../../dashboardPages/v1/panels/shared/DataScope';
import styles from '../../homePage.module.css';
import { useTeamMeetingsChart } from '../../hooks/useTeamMeetingsChart';
import { TIME_WINDOW } from '../../typings/home';

export type TeamMeetingsProps = {
  timeWindow: TIME_WINDOW;
  selectedValue?: string[];
  secondarySelectedValue?: string[];
};

export const TeamMeetings = (props: TeamMeetingsProps) => {
  const { data, chartData, groupedByType } = useTeamMeetingsChart(props);

  const dataKeys: string[] = [
    ...new Set(chartData?.flatMap(x => Object.keys(x)).filter(y => y !== 'groupKey' && y !== 'id')),
  ];
  const settings = useUserSettings();
  const dataModel = useDataModel();
  const mainTypeField = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  );
  const { data: meetingTypes } = usePicklist(mainTypeField?.id);
  const types = meetingTypes?.filter(i => i.enabled)?.sort((a, b) => a.ordering - b.ordering);
  const randomColors = useMemo(() => {
    return types?.reduce(
      (acc, type, idx) => ({
        ...acc,
        [type?.value]: softColors[Object.keys(softColors)[idx]],
      }),
      {},
    );
  }, [types]);

  return (
    <>
      {data?.length > 0 ? (
        <div className={styles.chart_container}>
          <DataScope max={8} data={chartData}>
            {({ visibleData }: any) => {
              const getDataKeyColor = (dataKey: any, index: string | number) => {
                const myUser = visibleData[index]?.id;

                return myUser === settings?.user?.id || randomColors?.[dataKey]
                  ? randomColors?.[dataKey] ?? 'var(--bloobirds)'
                  : 'var(--verySoftBloobirds)';
              };
              return (
                <BarChart
                  dataKeys={dataKeys}
                  groupKey="groupKey"
                  onBarClick={undefined}
                  points={visibleData}
                  getDataKeyColor={getDataKeyColor}
                  showTooltip={groupedByType}
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
