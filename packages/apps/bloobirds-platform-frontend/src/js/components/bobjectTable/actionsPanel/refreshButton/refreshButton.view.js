import { Button, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import React from 'react';
import styles from './refreshButton.module.css';

const RefreshButton = ({ onClick, isLoading, shouldContractElements }) => {
  return (
    <div className={styles._button__container}>
      <Button
        dataTest="refreshButton"
        className={styles._button}
        variant="secondary"
        iconLeft="refresh"
        onClick={onClick}
      >
        {isLoading ? (
          <Spinner size={14} name="loadingCircle" />
        ) : (
          <>
            {!shouldContractElements && (
              <Text size="xs" color="bloobirds">
                Refresh
              </Text>
            )}
          </>
        )}
      </Button>
    </div>
  );
};

export default RefreshButton;
