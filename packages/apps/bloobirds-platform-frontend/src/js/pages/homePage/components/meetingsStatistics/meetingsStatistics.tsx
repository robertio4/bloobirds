import React from 'react';

import { Icon, Skeleton, Text } from '@bloobirds-it/flamingo-ui';

import { StatsItem } from '../../../../components/statsItem/statsItem';
import { useMediaQuery } from '../../../../hooks';
import { useMeetingsChart } from '../../hooks/useMeetingsChart';
import { TIME_WINDOW } from '../../typings/home';
import styles from './../../homePage.module.css';

export type MeetingsProps = {
  timeWindow: TIME_WINDOW;
  selectedValue?: string[];
};

export const MeetingsStatistics = ({ timeWindow, selectedValue }: MeetingsProps) => {
  const { data, previousPeriodData, values } = useMeetingsChart({ timeWindow, selectedValue });

  const { isSmallDesktop } = useMediaQuery();

  return (
    <div className={styles.statisticsContainer}>
      {!data ? (
        <div className={styles.skeleton}>
          <Skeleton height={50} width={isSmallDesktop ? 300 : 600} variant="rect" />
        </div>
      ) : data.length > 0 ? (
        <>
          {data.map(
            ({ fieldDataList, value }: { fieldDataList: any; value: number }, idx: number) => {
              const previousValue = previousPeriodData?.find(
                ({ fieldDataList: previousField }: { fieldDataList: any; value: number }) =>
                  fieldDataList?.id === previousField?.id,
              )?.value;
              const change = ((value - previousValue) / 100) * 100;

              return (
                <StatsItem
                  key={idx}
                  value={value}
                  percentage={change}
                  name={values?.[idx]?.text?.toUpperCase()}
                  size="small"
                />
              );
            },
          )}
        </>
      ) : (
        <div className={styles.noData}>
          <Icon name="search" color="softPeanut" />
          <Text size="s" color="softPeanut">
            No data
          </Text>
        </div>
      )}
    </div>
  );
};
