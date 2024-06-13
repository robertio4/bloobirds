import React from 'react';
import { Button, Callout, Modal, ModalContent, ModalFooter, Text } from '@bloobirds-it/flamingo-ui';
import styles from './saveModal.module.css';

const SaveModal = ({ open, onSave, onClose, changedFields }) => (
  <Modal open={open} title="Edit criteria" onClose={onClose}>
    <ModalContent>
      <Text size="m" color="peanut">
        You are about to change an existing segmentation criteria.
      </Text>
      <Text size="m">
        <b>This action cannot be undone</b>, are you sure you want to continue?
      </Text>
      <div className={styles._modal_warning__content}>
        <Callout variant="negative">
          This change
          <b>
            {' '}
            will remove all the categorization from &quot;
            {changedFields.join('" and "')}&quot;
          </b>{' '}
          already done in existing templates.
        </Callout>
      </div>
    </ModalContent>
    <ModalFooter>
      <Button variant="tertiary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSave}>
        Confirm
      </Button>
    </ModalFooter>
  </Modal>
);

export default SaveModal;
