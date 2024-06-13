import React from 'react';

import { Button } from '@bloobirds-it/flamingo-ui';

import useAssignUser from '../../../../hooks/useAssignUser';
import AssignUserModal from '../../../assignUserModal/assignUserModal';
import { Bobject } from "@bloobirds-it/types";

export const BulkAssign = ({
  bobjects,
  setRefresh,
  useEveryObject,
}: {
  bobjects: Bobject[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  useEveryObject: boolean;
}) => {
  const { openAssignUserModal, isOpen } = useAssignUser();

  return (
    <>
      <Button
        variant="clear"
        iconLeft="deliver"
        uppercase={false}
        onClick={() => openAssignUserModal({ bobject: bobjects })}
      >
        Assign
      </Button>
      {isOpen && <AssignUserModal isQueuedBulk={useEveryObject} onSave={() => setRefresh(true)} />}
    </>
  );
};
