import React from 'react';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../../cadenceEditionPage.module.css';

const EmptyCadenceContent = ({
  canEditCadence,
  handleAddStep,
}: {
  canEditCadence: boolean;
  handleAddStep: () => void;
}) => (
  <div className={styles._steps__container}>
    {!canEditCadence && <div className={styles._disabled_overlay} />}
    <Icon name="plusSquare" color="softPeanut" />
    <Text size="l" color="peanut">
      You haven&apos;t configured any cadence step yet
    </Text>
    <Text size="s" color="softPeanut">
      Learn more about{' '}
      <a
        href="https://support.bloobirds.com/hc/en-us/articles/9851568010012"
        target="_blank"
        className={styles._knowledge_link}
        rel="noreferrer"
      >
        how to create engaging cadences
      </a>
    </Text>
    <Button
      className={styles._add_step_button}
      disabled={!canEditCadence}
      variant="clear"
      iconLeft="plus"
      size="small"
      color={canEditCadence ? 'bloobirds' : 'lightBloobirds'}
      onClick={handleAddStep}
    >
      Add step
    </Button>
  </div>
);

export default EmptyCadenceContent;
