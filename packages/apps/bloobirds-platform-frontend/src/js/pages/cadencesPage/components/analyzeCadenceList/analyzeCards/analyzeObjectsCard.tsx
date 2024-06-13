import React from 'react';

import { ColorType, IconButton, Label, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import { addProtocolToURL } from '@bloobirds-it/utils';

import { EntityCardItem } from '../../../../../components/entityList/entityCard/entityCard';
import { useBobjectDetails } from '../../../../../hooks';
import useSalesforce from '../../../../../hooks/useSalesforce';
import { cadenceStatusColors } from '../analyzeCadenceList.constants';
import { AnalyzeObjectsTableRow, ObjectsInCadenceMetric } from '../analyzeCadenceList.typings';

const AnalyzeCardName = ({
  name,
  bobjectType,
  bobjectId,
  linkedInUrl,
  salesforceId,
}: {
  name: string;
  bobjectType: string;
  bobjectId: string;
  linkedInUrl: string;
  salesforceId: string;
}) => {
  const { openBobjectDetails } = useBobjectDetails();
  const { settings } = useActiveUserSettings();
  const parsedType = bobjectType?.charAt(0) + bobjectType?.slice(1)?.toLowerCase();

  const handleRedirect = (e: React.MouseEvent<HTMLElement, MouseEvent>, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(addProtocolToURL(url), '_blank');
  };
  const { salesforceIntegration } = useSalesforce();

  const salesforceUrl =
    salesforceId && salesforceIntegration
      ? `${salesforceIntegration?.instanceHost}/${salesforceId}`
      : undefined;

  return (
    <>
      <div
        onClick={() => {
          openBobjectDetails({
            id: `${settings?.account?.id}/${parsedType}/${bobjectId}`,
            showContactButton: true,
          });
        }}
        style={{ cursor: 'pointer' }}
      >
        <Text size="s" color="bloobirds" weight="bold">
          {name || ''}
        </Text>
      </div>
      {(linkedInUrl || salesforceUrl) && (
        <div>
          {linkedInUrl && (
            <IconButton
              name="linkedin"
              size={16}
              color="darkBloobirds"
              onClick={e => handleRedirect(e, linkedInUrl)}
            />
          )}
          {salesforceUrl && (
            <IconButton
              name="salesforceOutlined"
              size={16}
              onClick={e => handleRedirect(e, salesforceUrl)}
            />
          )}
        </div>
      )}
    </>
  );
};
export const AnalyzeObjectsCard = ({ row }: { row: AnalyzeObjectsTableRow }) => (
  <>
    {['LEAD', 'OPPORTUNITY'].includes(row?.bobjectType) && (
      <EntityCardItem>
        <AnalyzeCardName
          name={row?.name}
          bobjectType={row?.bobjectType}
          bobjectId={row?.bobjectId}
          salesforceId={row.objectSalesforceId}
          linkedInUrl={row.objectLinkedinUrl}
        />
      </EntityCardItem>
    )}
    <EntityCardItem size="medium">
      <AnalyzeCardName
        name={row?.companyName}
        bobjectType={BobjectTypes.Company}
        bobjectId={row?.companyId}
        salesforceId={row.companySalesforceId}
        linkedInUrl={row.companyLinkedinUrl}
      />
    </EntityCardItem>
    <EntityCardItem>
      <Label
        color={cadenceStatusColors[row?.status]?.backgroundColor as ColorType}
        textColor={cadenceStatusColors[row?.status]?.textColor as ColorType}
        uppercase={false}
        overrideStyle={{ width: '90px', fontWeight: 'bold' }}
      >
        {row?.status}
      </Label>
    </EntityCardItem>
    <EntityCardItem>
      {row?.startDate ? row?.startDate?.charAt(0) + row?.startDate?.slice(1)?.toLowerCase() : ''}
    </EntityCardItem>
    {row?.metrics?.map((metric: ObjectsInCadenceMetric) => (
      <EntityCardItem key={metric?.tooltip} align="center">
        <Tooltip title={metric?.tooltip} position="top">
          <Text size="s" color={metric?.color}>
            {metric?.value}
          </Text>
        </Tooltip>
      </EntityCardItem>
    ))}
  </>
);
