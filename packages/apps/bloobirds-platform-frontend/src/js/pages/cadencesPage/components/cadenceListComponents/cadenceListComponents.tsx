import { Skeleton, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from '../analyzeCadenceList/analyzeCadenceList.module.css';
import { SearchLogs } from '../../../../../assets/svg';

export const CadenceListSkeleton = ({ rows = 7 }: { rows?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: '16px' }}>
    {Array.from({ length: rows }, (_, index) => (
      <Skeleton key={index} variant="rect" width="100%" height="42px" />
    ))}
  </div>
);

export const CadenceErrorPage = () => (
  <div className={styles._no_results__contents}>
    <SearchLogs className={styles._no_results__img} />
    <Text size="xl" weight="bold" align="center" color="softPeanut">
      Something went wrong
    </Text>
    <Text size="m" align="center" weight="regular" color="softPeanut">
      Please try again later.
    </Text>
  </div>
);

export const CadenceListNoResults = ({ table = 'Manage' }: { table?: 'Manage' | 'Analytics' }) => (
  <div className={styles._no_results__contents}>
    <SearchLogs className={styles._no_results__img} />
    <Text size="xl" weight="bold" align="center" color="softPeanut">
      {table === 'Manage'
        ? 'Still no cadences have been created'
        : 'No cadences for the current search'}
    </Text>
    <Text size="m" align="center" weight="regular" color="softPeanut">
      {table === 'Manage'
        ? 'See how setting up your playbook correctly can help you in your sales process! See some examples to inspire you, then click the Create Target Market button to get started.'
        : 'Try modifying your filter criteria'}
      .
    </Text>
  </div>
);
