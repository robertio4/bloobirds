import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  IconType,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@bloobirds-it/flamingo-ui';

export const SignatureModal = ({
  title,
  icon,
  onClose,
  onContinue,
  children,
}: {
  title: string;
  icon: IconType;
  onClose: () => void;
  onContinue: () => void;
  children: React.ReactNode;
}) => {
  const { t } = useTranslation();

  return (
    <Modal open onClose={onClose} width={585}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon={icon}>
          {title}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <span style={{ marginBottom: '22px' }}>{children}</span>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={onClose}>
          {t('userSetings.email.signature.modal.cancel')}
        </Button>
        <Button onClick={onContinue}>
          {icon === 'save'
            ? t('userSetings.email.signature.modal.continue')
            : t('userSetings.email.signature.modal.confirm')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SignatureModal;
