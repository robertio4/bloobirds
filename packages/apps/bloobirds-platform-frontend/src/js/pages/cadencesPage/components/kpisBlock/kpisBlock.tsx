import React from 'react';

import { Button, Skeleton } from '@bloobirds-it/flamingo-ui';

import { CadenceTableKPI } from '../analyzeCadenceList/analyzeCadenceList.typings';
import KpiPanelItem from './kpiPanelItem/kpiPanelItem';
import styles from './kpisBlock.module.css';
import { KpisError } from './kpisError/kpisError';

export const KpisBlock = ({
  kpis,
  isKpisLoading,
  kpiError,
}: {
  kpis: CadenceTableKPI[][];
  isKpisLoading: boolean;
  kpiError: boolean;
}) => {
  const kpisWithValue = kpis?.map(list => list.filter(kpi => kpi?.value !== null));

  const goToKnowledge = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    window.open('https://support.bloobirds.com/hc/en-us/articles/8341560959260', '_blank');
  };

  return !isKpisLoading ? (
    <div className={styles._stats_content}>
      <div className={styles._external_link}>
        <Button
          iconRight="externalLink"
          variant="clear"
          uppercase={false}
          size="small"
          onClick={goToKnowledge}
        >
          More about KPIs
        </Button>
      </div>
      {kpiError && <KpisError />}
      {!kpiError && (
        <div className={styles.stats_row}>
          {kpisWithValue?.slice(0, 1).map((list, i) => (
            <div key={`group-${i}`} className={styles.stats_group}>
              {list.map(metric => (
                <KpiPanelItem
                  key={metric.icon}
                  icon={metric.icon}
                  iconColor={metric.iconColor}
                  tooltip={metric.tooltip}
                  value={metric.value}
                  valueIsPercentage={metric.type === 'PERCENTAGE'}
                />
              ))}
            </div>
          ))}
        </div>
      )}
      {!kpiError && (
        <div className={styles.stats_row}>
          {kpisWithValue?.slice(1).map((list, i) => (
            <div key={`group-${i}`} className={styles.stats_group}>
              {list.map(metric => (
                <KpiPanelItem
                  key={metric.icon}
                  icon={metric.icon}
                  iconColor={metric.iconColor}
                  tooltip={metric.tooltip}
                  value={metric.value}
                  valueIsPercentage={metric.type === 'PERCENTAGE'}
                />
              ))}
              {i < kpisWithValue.length - 2 && <span className={styles.separator} />}
            </div>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div className={styles._stats_skeleton_content}>
      <Skeleton width="100%" variant="rect" height={120} />
    </div>
  );
};
