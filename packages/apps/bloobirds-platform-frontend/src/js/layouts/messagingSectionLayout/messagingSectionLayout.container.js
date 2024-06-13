import React from 'react';

import PropTypes from 'prop-types';

import MessagingSectionLayoutView from './messagingSectionLayout.view';

const MessagingSectionLayoutContainer = ({
  actions,
  body,
  id,
  title,
  dataIntercom,
  createConfig,
  pluralEntityName,
  parentRef,
  rightActions,
}) => (
  <MessagingSectionLayoutView
    actions={actions}
    dataIntercom={dataIntercom}
    body={body}
    createConfig={createConfig}
    id={id}
    pluralEntityName={pluralEntityName}
    title={title}
    parentRef={parentRef}
    rightActions={rightActions}
  />
);

MessagingSectionLayoutContainer.defaultProps = {
  active: true,
  actions: PropTypes.node,
};

export default MessagingSectionLayoutContainer;
