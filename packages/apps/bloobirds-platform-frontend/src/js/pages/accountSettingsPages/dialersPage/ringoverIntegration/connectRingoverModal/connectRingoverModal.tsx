import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  ModalFooter,
  Button,
  ModalCloseIcon,
  ModalSection,
  Input,
  Text,
  useToasts,
  Spinner,
} from '@bloobirds-it/flamingo-ui';

import { useUserSettingsReload } from '../../../../../components/userPermissions/hooks';
import { api } from '../../../../../utils/api';
import styles from './connectRingoverModal.module.css';

const ConnectRingoverModal = ({ onClose }: { onClose: () => void }) => {
  const [apiKey, setApiKey] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const reloadUserSettings = useUserSettingsReload();
  const { createToast } = useToasts();
  const { t } = useTranslation();

  const handleSubmit = () => {
    setError(false);
    setLoading(true);
    api
      .get(`/calls/ringover/sync/${apiKey}`)
      .then(() => {
        createToast({
          message: t('accountSettings.dialers.ringover.status.successfullyConntected'),
          type: 'success',
        });
        setLoading(false);
        onClose();
        reloadUserSettings();
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };

  return (
    <Modal open onClose={onClose} width={550}>
      <ModalHeader>
        <ModalTitle>{t('accountSettings.dialers.ringover.status.connect')}</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalSection title={t('accountSettings.dialers.ringover.status.logInTitle')} icon="link">
          <div className={styles.input_container}>
            <Input
              type="text"
              onChange={setApiKey}
              placeholder="ApiKey"
              value={apiKey}
              width="300px"
            />
            {error && (
              <Text color="tomato" size="s">
                {t('accountSettings.dialers.ringover.status.errorConnecting')}
              </Text>
            )}
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose}>
          {t('common.close')}
        </Button>
        <Button onClick={handleSubmit} disabled={!apiKey || loading}>
          {loading ? (
            <Spinner name="loadingCircle" size={16} color="bloobirds" />
          ) : (
            t('common.save')
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConnectRingoverModal;
