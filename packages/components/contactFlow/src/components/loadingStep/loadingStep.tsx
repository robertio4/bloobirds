import React from 'react';

import { ModalContent, Spinner } from '@bloobirds-it/flamingo-ui';

import styles from './loadingStep.module.css';

const LoadingStep = () => (
  <>
    <ModalContent>
      <div className={styles.content}>
        <Spinner name="loadingCircle" />
      </div>
    </ModalContent>
  </>
);

export default LoadingStep;
