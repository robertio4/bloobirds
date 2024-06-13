import React from 'react';
import { IconButton, Text } from '@bloobirds-it/flamingo-ui';
import styles from './resetButton.module.css';
import WithTooltip from '../../../withTooltip/withTooltip';
import { useTableContext } from '../../context/bobjectTable.context';
import { useBobjectTable } from '../../useBobjectTable';

const ResetButton = ({ shouldContractElements }) => {
  const { isModified, resetToInitialState } = useBobjectTable();
  const {
    stageHandler: [_, setStage],
  } = useTableContext();

  function handleReset() {
    resetToInitialState();
    setStage('All');
  }

  return isModified ? (
    <div className={styles._reset_button_container}>
      <WithTooltip isDisabled={shouldContractElements} title={'Reset'}>
        <IconButton name="undoRevert" onClick={handleReset} size={16}>
          {!shouldContractElements && (
            <Text size="s" color="peanut">
              Reset
            </Text>
          )}
        </IconButton>
      </WithTooltip>
    </div>
  ) : null;
};

export default ResetButton;
