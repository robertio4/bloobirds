import React, { Fragment } from 'react';
import { CSSTransition } from 'react-transition-group';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import range from 'lodash/range';

import styles from './activitySkeleton.module.css';

export const ActivitySkeleton = ({ visible }: { visible: boolean }) => (
  <Transition type="fade" visible={visible}>
    <div className={styles._list}>
      {range(12).map(number => (
        <Fragment key={number}>
          <div className={styles._card}>
            <Skeleton variant="rect" width="100%" height={48} />
          </div>
        </Fragment>
      ))}
    </div>
  </Transition>
);

const classNames = {
  fade: {
    appear: styles._fade_enter,
    appearActive: styles._fade_enter_active,
    enter: styles._fade_enter,
    enterActive: styles._fade_enter_active,
    exit: styles._fade_exit,
    exitActive: styles._fade_exit_active,
  },
};

interface TransitionProps {
  children: React.ReactNode;
  visible: boolean;
  type: string;
}

const Transition = ({ children, visible, type }: TransitionProps) => (
  // @ts-ignore
  <CSSTransition appear in={visible} unmountOnExit timeout={300} classNames={classNames[type]}>
    {children}
  </CSSTransition>
);
