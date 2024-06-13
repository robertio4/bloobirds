import React, { useState } from 'react';
import styles from './Section.module.css';
import { Text, Collapsible, Tag } from '@bloobirds-it/flamingo-ui';

export const Section = ({ title, children, isNew, stats, isBeta }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className={styles.root}>
      <Collapsible
        onCollapsed={setIsCollapsed}
        overflow="visible"
        expanded={!isCollapsed}
        title={
          <div className={styles.title}>
            <Text size="regular" color="peanut">
              {title}
            </Text>
            {isNew && (
              <span className={styles.tag}>
                <Tag color="veryLightBloobirds">
                  <Text size="regular" color="peanut" uppercase>
                    New
                  </Text>
                </Tag>
              </span>
            )}
            {isBeta && (
              <span className={styles.tag}>
                <Tag color="veryLightBloobirds">
                  <Text size="regular" color="peanut" uppercase>
                    BETA
                  </Text>
                </Tag>
              </span>
            )}
          </div>
        }
        color="peanut"
      >
        {stats && <div className={styles.row}>{stats}</div>}
        <div className={styles.row}>
          {children.map((child, index) => (
            <div key={`${title}-panel-${index}`} className={styles.rowItem}>
              {child}
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  );
};
