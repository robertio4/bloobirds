import React from 'react';
import { ModalContent, Modal, ModalFooter, Button, Text } from '@bloobirds-it/flamingo-ui';
import styles from './confirmDeleteTwilioModal.module.css';

export const ConfirmDeleteTwilioModal = ({
  confirmModalOpen,
  setConfirmModalOpen,
  handleDeleteTwilio,
}) => (
  <Modal
    title="Are you sure?"
    open={confirmModalOpen}
    onClose={() => setConfirmModalOpen(false)}
    width={500}
  >
    <ModalContent>
      <Text className={styles._modal_text} size="m">
        Are you sure you want to delete your Twilio Account?
      </Text>
    </ModalContent>
    <ModalFooter>
      <Button variant="clear" onClick={() => setConfirmModalOpen(false)}>
        CANCEL
      </Button>
      <Button variant="tertiary" color="tomato" onClick={handleDeleteTwilio}>
        DELETE
      </Button>
    </ModalFooter>
  </Modal>
);
