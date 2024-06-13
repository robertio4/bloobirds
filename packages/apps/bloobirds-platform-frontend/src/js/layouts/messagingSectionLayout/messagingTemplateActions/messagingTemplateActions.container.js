import React from 'react';

import MessagingTemplateActionsView from './messagingTemplateActions.view';

const MessagingTemplateActions = ({ creationConfig, rightActions, children }) => (
  <MessagingTemplateActionsView
    searchPlaceholder={creationConfig.searchPlaceholder}
    handleOnCreationClick={creationConfig.onClickAction}
    newEntityButtonName={creationConfig.actionName}
    rightActions={rightActions}
  >
    {children}
  </MessagingTemplateActionsView>
);

export default MessagingTemplateActions;
