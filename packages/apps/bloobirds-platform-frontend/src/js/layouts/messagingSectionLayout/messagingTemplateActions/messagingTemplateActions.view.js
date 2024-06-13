import React from 'react';

import { Button, Checkbox } from '@bloobirds-it/flamingo-ui';

import MessagingSearchBar from '../../../components/messagingTemplates/messagingSearchBar/messagingSearchBar';
import styles from './messagingTemplateActions.module.css';

const MessagingTemplateActionsView = ({
  handleOnCreationClick,
  newEntityButtonName,
  searchPlaceholder,
  rightActions,
  children,
}) => (
  <div className={styles._container}>
    <div className={styles._switchAction__container}>{children}</div>
    <div>
      <div className={styles._rightActions__container}>
        {rightActions}
        <MessagingSearchBar placeholder={searchPlaceholder} />
        <Button iconLeft="add" onClick={handleOnCreationClick} color="purple">
          {newEntityButtonName}
        </Button>
      </div>
    </div>
  </div>
);

export default MessagingTemplateActionsView;
