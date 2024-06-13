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
import { QuickFilter } from '../../../../../../typings/quickFilters';

export const DeleteQuickFilterModal = ({
  quickFilter,
  onDelete,
  onClose,
}: {
  quickFilter: QuickFilter;
  onDelete: (quickFilterId: string) => void;
  onClose: () => void;
}) => {
  const { createToast } = useToasts();
  const [isLoading, setIsLoading] = useState<boolean>();

  const handleDelete = async (quickFilterId: string) => {
    setIsLoading(true);
    await onDelete(quickFilterId);
    createToast({ type: 'success', message: `Quick filter ${quickFilter?.name} deleted` });
    onClose();
  };

  return (
    <Modal width={640} title="Delete quick filter" open onClose={onClose}>
      <ModalContent>
        <div className={styles.content}>
          <Text size="m">
            Are you sure do you want to delete the &quot;<b>{quickFilter?.name}</b>&quot; Quick
            filter? <b>This action cannot be undone</b>
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <div>
          <Button onClick={onClose} variant="clear" color="tomato">
            CANCEL
          </Button>
        </div>
        <Button onClick={() => handleDelete(quickFilter.id)} color="tomato">
          {isLoading ? <Spinner name="loadingCircle" color="white" /> : 'DELETE'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
