import { useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';

export const ConfirmMarkAsDoneModal = ({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: () => void;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'taskFeed.confirmMarkAsDoneModal' });
  return (
    <Modal open onClose={onClose} width={585}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon="checkDouble">
          {t('title')}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <span style={{ marginBottom: '16px' }}>
          <Text size="m">{t('description')}</Text>
        </span>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button onClick={onSave}>{t('confirm')}</Button>
      </ModalFooter>
    </Modal>
  );
};
