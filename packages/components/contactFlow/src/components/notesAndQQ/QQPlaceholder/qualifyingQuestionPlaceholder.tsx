import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import range from 'lodash/range';

import styles from './qualifyingQuestionPlaceholder.module.css';

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

const Transition = ({ children, visible, type }) => (
  <CSSTransition appear in={visible} unmountOnExit timeout={300} classNames={classNames[type]}>
    {children}
  </CSSTransition>
);

const QualifiyingQuestionSkeleton = ({ width }: { width: number }) => (
  <div className={styles.question}>
    <header className={styles.questionTitle}>
      <Skeleton variant="text" width={250} height={24} />
    </header>
    <Skeleton variant="rect" width={width} height={50} />
  </div>
);

const QualifiyingQuestionsPlaceholder = ({ width = 480 }: { width: number }) => {
  return (
    <Transition type="fade" visible>
      <div className={styles.list}>
        {range(10).map(number => (
          <React.Fragment key={number}>
            <QualifiyingQuestionSkeleton width={width} />
          </React.Fragment>
        ))}
      </div>
    </Transition>
  );
};

export default QualifiyingQuestionsPlaceholder;
