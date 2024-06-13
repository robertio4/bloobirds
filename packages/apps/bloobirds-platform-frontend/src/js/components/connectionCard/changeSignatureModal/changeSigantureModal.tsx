import React, { useState } from 'react';

import {
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Button,
  ModalFooter,
  Select,
  Item,
} from '@bloobirds-it/flamingo-ui';
import { useSignatures, SignatureProps } from '@bloobirds-it/hooks';

import styles from './changeSignatureModal.module.css';

export const ChangeSignatureModal = ({
  connectionId,
  onClose,
}: {
  connectionId: string;
  onClose: () => void;
}) => {
  const { data: signatures, signature, changeSignatureConnection } = useSignatures(connectionId);
  const [signatureId, setSignatureId] = useState(signature?.id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeSignature = async () => {
    if (signatureId) {
      setIsSubmitting(true);
      changeSignatureConnection(signatureId);
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Modal open onClose={onClose} width={500}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon={'signature'}>
          Change Signature
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <Select
          width="100%"
          placeholder="Select a signature"
          value={signatureId}
          onChange={setSignatureId}
        >
          {signatures?.map((s: SignatureProps) => (
            <Item key={s.id} value={s.id}>
              {s.name}
            </Item>
          ))}
        </Select>
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <Button variant="clear" color="tomato" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={!signatureId || isSubmitting} onClick={handleChangeSignature}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
