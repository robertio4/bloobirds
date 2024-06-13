import React from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';

export const SalesforceStatusLoader = () => {
  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      {Array.from({ length: 3 }).map(() => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <div style={{ marginTop: '4px' }}>
              <Skeleton variant="circle" height={24} width={24} />
            </div>
            <Skeleton variant="text" height={46} width={172} />
          </div>
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={`status_${index}`} variant="rect" height={28} width={200} />
          ))}
        </div>
      ))}
    </div>
  );
};
