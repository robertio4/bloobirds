import React, { useState } from 'react';
import { CustomTask } from '@bloobirds-it/types';
import {
  Button,
  Icon,
  IconButton,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './disableCustomTaskModal.module.css';
interface DisableCustomTaskModalProps {
  open: boolean;
  onClose: () => void;
  cadences: string[];
  onDisable: () => void;
}

export const DisableCustomTaskModal = ({
  open,
  onClose,
  cadences,
  onDisable,
}: DisableCustomTaskModalProps) => {
  return (
    <Modal open={open} onClose={onClose} width={720}>
      <ModalHeader className={styles.header}>
        <div className={styles.title}>
          <Text size="xl">Disable custom task</Text>
        </div>
        <IconButton name="cross" color="bloobirds" size={40} onClick={onClose} />
      </ModalHeader>
      <ModalContent className={styles.content}>
        <Text size="m">This custom task is being used in n cadence(s).</Text>
        <ul>
          {cadences.map(cadence => (
            <li key={cadence}>
              <Text size="m">{cadence}</Text>
            </li>
          ))}
        </ul>
        <Text size="m">If you disable it, the steps in the cadences will be deleted.</Text>
        <Text size="m">
          <strong>This action cannot be undone</strong>, are you sure you want to continue?
        </Text>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" color="bloobirds" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={onDisable}>Disable Task</Button>
      </ModalFooter>
    </Modal>
  );
};
