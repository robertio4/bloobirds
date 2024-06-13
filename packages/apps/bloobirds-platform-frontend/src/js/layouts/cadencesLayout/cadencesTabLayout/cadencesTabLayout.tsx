import React from 'react';
import { TableContainer, Text } from '@bloobirds-it/flamingo-ui';
import styles from './cadencesTabLayout.module.css';
import { SearchLogs } from '../../../../assets/svg';

export const CadencesTab = ({ children }: { children: JSX.Element }) => (
  <div className={styles._wrapper}>{children}</div>
);

export const CadencesTabHeader = ({ children }: { children: JSX.Element[] }) => (
  <header className={styles._header__container}>{children}</header>
);

export const CadencesTabHeaderLeft = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className={styles._left__header__container}>{children}</div>
);

export const CadencesTabHeaderRight = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className={styles._right__header__container}>{children}</div>
);

export const CadencesTabContent = ({ children }: { children: JSX.Element }) => (
  <main className={styles._content}>{children}</main>
);

export const CadencesTableContainer = ({ children }: { children: JSX.Element }) => (
  <div className={styles.table}>
    <TableContainer>{children}</TableContainer>
  </div>
);

export const CadencesTabFooter = ({ children }: { children: JSX.Element }) => (
  <header className={styles._footer__container}>{children}</header>
);

export const CadencesTabEmptyContent = ({ children }: { children: JSX.Element }) => (
  <div className={styles._no_results__contents}>
    <SearchLogs className={styles._no_results__img} />
    <Text size="xl" weight="bold" align="center" color="softPeanut">
      {children}
    </Text>
  </div>
);
