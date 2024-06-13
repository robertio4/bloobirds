import React, { Suspense } from 'react';

import { Text, Skeleton } from '@bloobirds-it/flamingo-ui';

import styles from './accountSettingsLayout.module.css';

const AccountSettingsLayout = ({ title, subtitle, children, actionChildren = null }) => (
  <Suspense fallback={<Skeleton variant="rect" height={300} width="100%" />}>
    <div className={styles._container}>
      <div className={styles._title}>
        <Text htmlTag="h3" size="xl" weight="medium" color="peanut">
          {title}
        </Text>
        {actionChildren && <span>{actionChildren}</span>}
      </div>
      {subtitle && (
        <div className={styles._subtitle}>
          <Text htmlTag="h4" size="s" color="softPeanut">
            {subtitle}
          </Text>
        </div>
      )}
      {children}
    </div>
  </Suspense>
);

export default AccountSettingsLayout;
