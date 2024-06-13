import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import styles from './deleteQuickFilterModal.module.css';
import { useFilterGroups } from '../../../../hooks/useFilterGroups';
import { useDeleteQuickFilterModal } from '../../../../hooks/useDeleteQuickFilter';

export const DeleteQuickFilterModal = ({
  tabName,
  handleCloseModal,
}: {
  tabName: string;
  handleCloseModal: () => void;
}) => {
  const { quickFilter } = useDeleteQuickFilterModal();
  const { handleRefresh, deleteFilterGroup } = useFilterGroups(tabName);
  const { createToast } = useToasts();
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleDelete = async () => {
    setIsLoading(true);
    await deleteFilterGroup(quickFilter.id);
    createToast({ type: 'success', message: `Quick filter ${quickFilter?.name} deleted` });
    handleRefresh();
    handleCloseModal();
  };

  return (
    <Modal width={600} title="Delete quick filter" open onClose={handleCloseModal}>
      <ModalContent>
        <div className={styles.text}>
          <Text size="m">
            Are you sure do you want to delete the &quot;<b>{quickFilter?.name}</b>&quot; Quick
            filter? <b>This action cannot be undone</b>
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <div>
          <Button onClick={handleCloseModal} variant="clear" color="tomato">
            CANCEL
          </Button>
        </div>
        <Button onClick={handleDelete} color="tomato">
          {isLoading ? <Spinner name="loadingCircle" color="white" /> : 'DELETE'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
