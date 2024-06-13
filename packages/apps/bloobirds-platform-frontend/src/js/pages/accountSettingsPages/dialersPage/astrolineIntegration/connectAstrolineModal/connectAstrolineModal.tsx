import React, { useState } from 'react';

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

import { api } from '../../../../../utils/api';
import styles from './connectAstrolineModal.module.css';
import {useUserSettingsReload} from "../../../../../components/userPermissions/hooks";

const ConnectAstrolineModal = ({ onClose }: { onClose: () => void }) => {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const reloadUserSettings = useUserSettingsReload();
  const { createToast } = useToasts();

  const handleSubmit = () => {
    setError(false);
    setLoading(true);
    api
      .post('/calls/astroline/sync', {
        email: username,
        token: btoa(`${username}:${password}`),
      })
      .then(() => {
        createToast({ message: 'Astroline connected successfully', type: 'success' });
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
        <ModalTitle>Connect your Astroline account</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalSection title="Log into Astroline" icon="link">
          <div className={styles.input_container}>
            <Input
              type="email"
              onChange={setUsername}
              placeholder="Email"
              value={username}
              width="300px"
            />
            <Input
              type="password"
              onChange={setPassword}
              placeholder="Password"
              value={password}
              width="300px"
            />
            {error && (
              <Text color="tomato" size="s">
                User or password is incorrect or you are not and Admin User.
              </Text>
            )}
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose}>
          CLOSE
        </Button>
        <Button onClick={handleSubmit} disabled={!username || !password || loading}>
          {loading ? <Spinner name="loadingCircle" size={16} color="bloobirds" /> : 'SUBMIT'}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConnectAstrolineModal;
