import React from 'react';
import { APP_TASKS_DONE } from '../../../../../../_constants/routes';
import { Button } from '@bloobirds-it/flamingo-ui';
import { useRouter } from '../../../../../../../hooks';

export const CompleteButton = props => {
  const { children, disabled = false, onClick = () => {} } = {
    ...props,
  };
  const { history } = useRouter();
  const manageClick = () => {
    if (!disabled) {
      onClick();
      history.push(APP_TASKS_DONE);
    }
  };

  return (
    <Button iconLeft="send" disabled={disabled} onClick={manageClick}>
      {children}
    </Button>
  );
};
