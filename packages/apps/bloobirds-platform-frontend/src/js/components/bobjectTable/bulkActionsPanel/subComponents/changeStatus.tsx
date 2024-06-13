import React from 'react';

import { Button, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';
import { useSelectAll } from '@bloobirds-it/hooks';
import { Bobject, PluralBobjectTypes, BobjectTypes } from '@bloobirds-it/types';

import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import ChangeStatusModal from '../../../changeStatusModal/changeStatusModal';
import useChangeStatus from '../../../changeStatusModal/useChangeStatus';

export const BulkChangeStatus = ({
  bobjects,
  bulkStage,
  useEveryObject,
}: {
  bobjects: Bobject[];
  bulkStage: string;
  useEveryObject: boolean;
}) => {
  const { createToast } = useToasts();
  const bobjectType = bobjects[0]?.id?.typeName;
  const isOpportunity = bobjectType === BobjectTypes.Opportunity;
  const isStageAll = bulkStage === 'All';
  const hasSalesEnabled = useFullSalesEnabled();
  const { isChangeStatusModalOpen, openChangeStatusModal } = useChangeStatus();
  const { resetSelectedItems } = useSelectAll();
  const shouldBeEnabled =
    (!isStageAll && hasSalesEnabled) ||
    bobjectType === BobjectTypes.Opportunity ||
    !hasSalesEnabled;

  const handleClick = () => {
    openChangeStatusModal(bobjects);
  };

  const handleSave = () => {
    createToast({
      type: 'success',
      message: `${bobjects?.length > 1 ? PluralBobjectTypes[bobjectType] : bobjectType} ${
        isOpportunity ? 'stage' : 'status'
      } updated successfully`,
    });
    resetSelectedItems();
  };

  return (
    <>
      <Tooltip
        title={
          !shouldBeEnabled
            ? `This action cannot be performed because it encompasses ${PluralBobjectTypes[
                bobjectType
              ].toLowerCase()} in prospecting and sales stage`
            : ''
        }
        position="top"
      >
        <Button
          variant="clear"
          disabled={!shouldBeEnabled}
          iconLeft="edit"
          onClick={handleClick}
          uppercase={false}
        >
          Change {isOpportunity ? 'stage' : 'status'}
        </Button>
      </Tooltip>
      {isChangeStatusModalOpen && (
        <ChangeStatusModal onSave={handleSave} isQueuedBulk={useEveryObject} />
      )}
    </>
  );
};
