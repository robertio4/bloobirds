import React from 'react';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import { Button } from '@bloobirds-it/flamingo-ui';
import { usePingVersion } from '../../hooks/usePingVersion';
import styles from './versionOutdated.module.css';

const VersionOutdated = () => {
  const { isOutdated } = usePingVersion();

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={isOutdated}
    >
      <SnackbarContent
        className={styles._container}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar">There is a new version of Bloobirds, please reload</span>
        }
        action={[
          <Button
            key="undo"
            size="small"
            variant="clear"
            color="banana"
            iconLeft="refresh"
            className={styles._button}
            onClick={() => {
              // eslint-disable-next-line no-restricted-globals
              location.reload();
            }}
          >
            RELOAD
          </Button>,
        ]}
      />
    </Snackbar>
  );
};

export default VersionOutdated;
