import { Trans, useTranslation } from 'react-i18next';

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

export const ConfirmationModal = ({
  onClose,
  onSave,
  sobjectType,
  assignedName,
}: {
  onClose: () => void;
  onSave: () => void;
  sobjectType: string;
  assignedName?: string;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'captureSalesforce.confirmationModal' });
  return (
    <Modal open onClose={onClose} width={585}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon="redoReload">
          {t('sync')}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <span style={{ marginBottom: '8px' }}>
          <Text size="m">
            <Trans
              i18nKey="captureSalesforce.confirmationModal.contentText"
              values={{
                sobjectType: sobjectType?.toLowerCase() || t('object'),
                assignedName,
              }}
            />
          </Text>
        </span>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button onClick={onSave}>{t('continue')}</Button>
      </ModalFooter>
    </Modal>
  );
};
