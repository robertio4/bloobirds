import React from 'react';

import { ColorType, Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useRouter } from '@bloobirds-it/hooks';
import { APP_CADENCES_ANALYZE, BobjectTypes } from '@bloobirds-it/types';

import { EntityCardItem } from '../../../../../components/entityList/entityCard/entityCard';
import { AnalyzeCadenceTableRow, CadenceTableKPI } from '../analyzeCadenceList.typings';

export const AnalyzeCadenceCard = ({ row }: { row: AnalyzeCadenceTableRow }) => {
  const { history, location } = useRouter();
  const bobjectType = (row?.type?.charAt(0) + row?.type?.slice(1)?.toLowerCase()) as BobjectTypes;

  const getObjectsSearchParams = (row: AnalyzeCadenceTableRow) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('cadence', encodeURIComponent(row.cadenceId));
    urlParams.set('name', encodeURIComponent(row.name));
    urlParams.set('bobjectType', encodeURIComponent(bobjectType));

    return urlParams.toString();
  };

  return (
    <>
      <EntityCardItem>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() =>
            history.push({
              pathname: APP_CADENCES_ANALYZE,
              search: getObjectsSearchParams(row),
            })
          }
        >
          <Text size="s" color="bloobirds" weight="bold">
            {row?.name}
          </Text>
        </div>
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title="Default Cadence" position="top">
          {row?.defaultCadence && <Icon name="starChecked" color="softBanana" size={16} />}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem>{bobjectType}</EntityCardItem>
      {row?.kpis?.map((kpi: CadenceTableKPI) => (
        <EntityCardItem key={kpi.label} align="center">
          <Text size="s" weight="bold" color={kpi.iconColor as ColorType} align="center">
            {kpi?.value + (kpi?.type === 'PERCENTAGE' && '%')}
          </Text>
        </EntityCardItem>
      ))}
    </>
  );
};
