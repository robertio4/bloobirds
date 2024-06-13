import React from 'react';
import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalFooterButtons,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './cadenceFeedbackModal.module.css';
import { CadenceFeedback } from '../../../assets/svg';

const CadenceFeedbackModal = ({ onClose }: { onClose: () => void }) => (
  <Modal open dataTest="CadenceFeedback" width={512} onClose={onClose}>
    <ModalHeader>
      <ModalTitle>Your cadences are being scheduled</ModalTitle>
      <ModalCloseIcon onClick={onClose} color="bloobirds" />
    </ModalHeader>
    <ModalContent>
      <div className={styles.content}>
        <CadenceFeedback />
        <Text size="m" weight="bold">
          The cadence tasks will appear in the next few minutes in the on cadence tab.
        </Text>

        <Text size="m">
          🕒 This process may take several minutes, close this window while the process is being
          completed.
        </Text>
      </div>
    </ModalContent>
    <ModalFooter className={styles.footer}>
      <Button onClick={onClose}>Accept</Button>
    </ModalFooter>
  </Modal>
);

export default CadenceFeedbackModal;
