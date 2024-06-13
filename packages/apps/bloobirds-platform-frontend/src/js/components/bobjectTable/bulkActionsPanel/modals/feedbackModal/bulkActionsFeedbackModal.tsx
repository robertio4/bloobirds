import React from 'react';
import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useBulkActionsFeedbackModal } from './useBulkActionsFeedbackModal';
import styles from './bulkActionsFeedbackModal.module.css';
import { useRouter } from '../../../../../hooks';
import { useTableContext } from '../../../context/bobjectTable.context';

export const BulkActionsFeedbackModal = ({ onClose }) => {
  const { history } = useRouter();
  const { isOpen, toggleModalVisibility } = useBulkActionsFeedbackModal();
  const {
    selectFunctions: { setSelectedItems, setSelectAllCheckedState },
  } = useTableContext();

  const handleCheckProgress = () => {
    toggleModalVisibility();
    history.push('/app/cl/import/history');
  };

  function handleCloseModal() {
    toggleModalVisibility();
    setSelectedItems([]);
    setSelectAllCheckedState(false);
    onClose();
  }

  return (
    <Modal open={isOpen} onClose={handleCloseModal} width={512}>
      <ModalHeader variant={'primary'}>
        <ModalTitle variant={'primary'}>
          <div className={styles._title__container}>
            <Text size="xl" inline weight="regular">
              Your Bulk Action is in progress
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon color="bloobirds" onClick={handleCloseModal} />
      </ModalHeader>
      <ModalContent>
        <div className={styles._spinner_wrapper}>
          <Spinner name="loadingCircle" size={50} />
        </div>
        <Text size="m" align="center" weight="bold" className={styles._modal_message_title}>
          Your Bulk Action is on its way!
        </Text>
        <Text size="m" align="center" color="softPeanut" className={styles._modal_message_subtitle}>
          You may close this modal. We will send you a notification you when your actions are
          completed.
        </Text>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={handleCloseModal} color="tomato">
          Close
        </Button>
        <Button variant="primary" onClick={handleCheckProgress}>
          Check the progress
        </Button>
      </ModalFooter>
    </Modal>
  );
};
