import React from 'react';

import { Tooltip } from '@bloobirds-it/flamingo-ui';

const WithTooltip = ({
  children,
  isDisabled,
  title,
  position = 'top',
}: {
  children: any;
  isDisabled: boolean;
  title: string;
  position?: any;
}) =>
  isDisabled ? (
    <Tooltip title={title} position={position}>
      {children}
    </Tooltip>
  ) : (
    children
  );

export default WithTooltip;
