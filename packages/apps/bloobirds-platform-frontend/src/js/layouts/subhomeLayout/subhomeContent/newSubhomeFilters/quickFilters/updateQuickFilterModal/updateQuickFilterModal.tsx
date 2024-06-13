import React from 'react';
import { Button, Modal, ModalContent, ModalFooter, Text } from '@bloobirds-it/flamingo-ui';
import styles from './updateQuickFilterModal.module.css';
import useModalVisibility from '../../../../../../hooks/useModalVisibility';

interface UpdateQuickFilterProps {
  quickFilter?: any;
  onClose: () => void;
}

export const UpdateQuickFilterModal = ({ quickFilter, onClose }: UpdateQuickFilterProps) => {
  const { openModal: openCreateModal } = useModalVisibility('createQuickFilterModal');
  const { openModal: openEditModal } = useModalVisibility('editQuickFilterModal');

  return (
    <Modal width={640} title="Update quick filter" open onClose={onClose}>
      <ModalContent>
        <div className={styles.content}>
          <Text size="m">
            Do you want to update the <b>{quickFilter.name}</b> Quick filter? or Create as New Quick
            Filter?
          </Text>
        </div>
      </ModalContent>
      <ModalFooter>
        <Button onClick={onClose} variant="clear" color="tomato">
          CANCEL
        </Button>
        <div className={styles.buttons}>
          <Button
            onClick={() => {
              openCreateModal();
              onClose();
            }}
            variant="secondary"
          >
            CREATE NEW QUICK FILTER
          </Button>
          <Button
            onClick={() => {
              openEditModal();
              onClose();
            }}
          >
            UPDATE
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
