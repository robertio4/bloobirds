import React, { Suspense } from 'react';
import { Skeleton, Text } from '@bloobirds-it/flamingo-ui';
import styles from './cadencesLayout.module.css';
import clsx from 'clsx';
import useMediaQuery from '../../hooks/useMediaQuery';

export interface CadenceLayoutProps {
  title?: string;
  leftAction?: JSX.Element;
  children: JSX.Element;
}

const CadencesLayout = ({ title, leftAction, children }: CadenceLayoutProps) => {
  const { isSmallDesktop, isMediumDesktop } = useMediaQuery();
  return (
    <Suspense fallback={<Skeleton variant="rect" height={300} width="100%" />}>
      <div
        className={clsx(styles._container, {
          [styles._container_small_desktop]: isSmallDesktop || isMediumDesktop,
        })}
      >
        <div className={styles._header}>
          <Text htmlTag="h3" size="xl" weight="medium" color="peanut" className={styles._title}>
            {title}
          </Text>
          {leftAction && <>{leftAction}</>}
        </div>
        {children}
      </div>
    </Suspense>
  );
};

export default CadencesLayout;
