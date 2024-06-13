import React from 'react';
import { Button, Tooltip } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '../../../../typings/bobjects';
import useConfirmResyncModal from '../../../../hooks/useConfirmResyncModal';
import useSalesforce from '../../../../hooks/useSalesforce';
import useHubspot from '../../../../hooks/useHubspot';

export const BulkResync = ({
  bobjects,
  setRefresh,
  useEveryObject,
}: {
  bobjects: Bobject[];
  setRefresh: React.SetStateAction<boolean>;
  useEveryObject: boolean;
}) => {
  const { openResyncModal } = useConfirmResyncModal();
  const { salesforceIntegration } = useSalesforce();
  const { hubspotIntegration } = useHubspot();

  const availableToResync = salesforceIntegration?.id || hubspotIntegration?.id;

  const handleOnClick = () => {
    openResyncModal(bobjects, useEveryObject, setRefresh);
  };

  return (
    <>
      <Tooltip
        title={
          !availableToResync &&
          "You don't have any CRM connected. Connect it to be able to resync Companies and leads"
        }
        position={!availableToResync && 'top'}
      >
        <Button
          variant="clear"
          disabled={!availableToResync}
          iconLeft="refresh"
          uppercase={false}
          onClick={handleOnClick}
        >
          Resync in CRM
        </Button>
      </Tooltip>
    </>
  );
};
