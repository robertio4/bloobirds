import React from 'react';
import { Button } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '../../../../typings/bobjects';
import { useConfirmDeleteModal } from '@bloobirds-it/bobjects';
import { UseAllItemsType } from '../bulkActionsPanel';
import { useTableContext } from '../../context/bobjectTable.context';

export const BulkDelete = ({
  bobjects,
  setRefresh,
  useEveryObject,
}: {
  bobjects: Bobject[];
  setRefresh: React.SetStateAction<boolean>;
  useEveryObject: UseAllItemsType;
}) => {
  const { openDeleteModal } = useConfirmDeleteModal();

  const {
    selectFunctions: { setSelectedItems },
  } = useTableContext();

  const handleOnClick = () => {
    openDeleteModal(
      bobjects,
      useEveryObject,
      setRefresh,
      () => setSelectedItems([]),
      useEveryObject?.totalItems || null,
    );
  };

  return (
    <Button
      variant="clear"
      iconLeft="trashEmpty"
      color="tomato"
      uppercase={false}
      onClick={handleOnClick}
    >
      Delete
    </Button>
  );
};
