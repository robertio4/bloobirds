import React from 'react';

import { Icon, IconType, Spinner, Text } from '@bloobirds-it/flamingo-ui';

export const ColumnHeader = ({
  icon,
  text,
  subtext,
  loading,
  children,
}: {
  icon: IconType;
  text: string;
  subtext?: string;
  loading?: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          <Icon name={icon} color="softPeanut" />
          <Text size="m" color="peanut">
            {text}
          </Text>
        </div>
        {loading ? <Spinner name="loadingCircle" size={16} color="softPeanut" /> : children}
      </div>
      <Text size="s" color="softPeanut">
        {subtext}
      </Text>
    </div>
  );
};
