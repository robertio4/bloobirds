import React from 'react';

import { Button, Snackbar, Text } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useTaskDone } from '../../hooks';
import { useUserHelpers } from '../../hooks/useUserHelpers';

const UndoToast = () => {
  const { showToast, isOpen, markAsDone, taskCount } = useTaskDone();
  const helpers = useUserHelpers();

  const onCloseAndMark = () => {
    showToast(false);
    markAsDone();
    helpers.save(UserHelperKeys.MARK_AS_DONE_ATTEMPT);
  };

  const onClose = () => {
    showToast(false);
  };

  return (
    <Snackbar variant="actions" visible={isOpen} position="bottom" onClose={onCloseAndMark}>
      <Text color="white" size="xs">
        {taskCount} task{taskCount > 1 ? 's' : ''} completed
      </Text>
      <Button variant="clear" color="tomato" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="clear" color="verySoftPeanut" onClick={onCloseAndMark}>
        Complete
      </Button>
    </Snackbar>
  );
};

export default UndoToast;
