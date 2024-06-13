import React, { Fragment } from 'react';
import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { range } from 'lodash';
import styles from './qualifiyingQuestionsPlaceholder.css';
import Transition from '../../transition';

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
          <Fragment key={number}>
            <QualifiyingQuestionSkeleton width={width} />
          </Fragment>
        ))}
      </div>
    </Transition>
  );
};

export default QualifiyingQuestionsPlaceholder;
