import React from 'react';

import { Text } from '@bloobirds-it/flamingo-ui';

import styles from './messagingSectionLayout.module.css';
import MessagingTemplateActions from './messagingTemplateActions';
import MessagingFilters from './messagingTemplateFilters/messagingFilters/messagingFilters';

const MessagingSectionLayoutView = ({
  body,
  id,
  title,
  createConfig,
  dataIntercom,
  actions,
  rightActions,
  parentRef,
}) => (
  <div className={styles._container} id={id} data-intercom={dataIntercom} ref={parentRef}>
    <div className={styles._info__container}>
      <div className={styles._header}>
        <div className={styles._title}>
          <Text htmlTag="h3" size="xl" color="peanut">
            {title}
          </Text>
        </div>
        <MessagingTemplateActions creationConfig={createConfig} rightActions={rightActions}>
          {actions}
        </MessagingTemplateActions>
      </div>
      <MessagingFilters id={id} />
    </div>
    <div className={styles._content__container}>{body}</div>
  </div>
);

export default MessagingSectionLayoutView;
