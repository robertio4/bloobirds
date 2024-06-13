import React from 'react';
import { Button, Snackbar, Text } from '@bloobirds-it/flamingo-ui';
import { useActivityDone } from '../../hooks/useActivity';

const BulkActionToast = () => {
  const { showToast, isOpen, markAsDone, activities } = useActivityDone();

  const onCloseAndMark = () => {
    showToast(false);
    markAsDone();
  };

  const onClose = () => {
    showToast(false);
  };

  return (
    <Snackbar variant="actions" visible={isOpen} position="bottom" onClose={onCloseAndMark}>
      <Text color="white" size="xs">
        {activities?.length} activities reported
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

export default BulkActionToast;
