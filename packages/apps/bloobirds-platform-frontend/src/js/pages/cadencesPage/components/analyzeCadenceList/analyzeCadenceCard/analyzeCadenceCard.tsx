import React from 'react';

import { Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';

import { EntityCardItem } from '../../../../../components/entityList/entityCard/entityCard';
import { CadenceTableKPI } from '../analyzeCadenceList.typings';

export const AnalyzeCadenceCard = ({ cadence }: { cadence: any }) => {
  return (
    <>
      <EntityCardItem size="medium">
        <div style={{ cursor: 'pointer' }}>
          <Text size="s" color="bloobirds" weight="bold">
            {cadence?.name}
          </Text>
        </div>
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title="Default Cadence" position="top">
          {cadence.defaultCadence && <Icon name="starChecked" color="softBanana" size={16} />}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem size="medium">
        {cadence.type.charAt(0) + cadence.type.slice(1).toLowerCase()}
      </EntityCardItem>
      {cadence.kpis.map((kpi: CadenceTableKPI) => (
        <EntityCardItem key={kpi.label} align="center">
          {kpi.value + (kpi.type === 'PERCENTAGE' && '%')}
        </EntityCardItem>
      ))}
    </>
  );
};
