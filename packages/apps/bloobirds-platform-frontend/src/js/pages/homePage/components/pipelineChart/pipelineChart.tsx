import React from 'react';
import { BarChart, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { usePipelineChart } from '../../hooks/usePipelineChart';
import styles from './../../homePage.module.css';

export const PipelineChart = (props: { selectedValue?: string }) => {
  const { chartData, data } = usePipelineChart({ filter: props.selectedValue });
  const getDataKeyColor = (dataKey: any, index: string | number) => {
    const possibleColor = chartData[index]?.color;
    return possibleColor ? possibleColor : 'var(--bloobirdsSoft)';
  };

  return (
    <>
      {data?.length > 0 ? (
        <BarChart
          dataKeys={['value']}
          groupKey="group"
          onBarClick={undefined}
          points={chartData}
          getDataKeyColor={getDataKeyColor}
        />
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
