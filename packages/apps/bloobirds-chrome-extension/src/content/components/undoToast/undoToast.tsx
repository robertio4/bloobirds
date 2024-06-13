import { useTranslation } from 'react-i18next';

import { Button, Snackbar, Text } from '@bloobirds-it/flamingo-ui';

import { useTaskDone } from '../../../hooks/useTaskDone';

const UndoToast = () => {
  const { showToast, isOpen, markAsDone, taskCount } = useTaskDone();
  const { t } = useTranslation();
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
        {t('leftBar.undoToast.title', { count: taskCount })}
      </Text>
      <Button variant="clear" color="tomato" onClick={onClose}>
        {t('common.cancel')}
      </Button>
      <Button variant="clear" color="verySoftPeanut" onClick={onCloseAndMark}>
        {t('common.complete')}
      </Button>
    </Snackbar>
  );
};

export default UndoToast;
