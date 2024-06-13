import React from 'react';
import { Icon, Modal, ModalContent, ModalFooter, Text, Button } from '@bloobirds-it/flamingo-ui';
import { useUserSettings } from '../userPermissions/hooks';
import { useBobjectsDownload } from '../../hooks/useBobjectsDownload';
import styles from './downloadConfirmationModal.module.css';

const DownloadConfirmationModal = () => {
  const settings = useUserSettings();
  const { setModalOpen, downloadFormat } = useBobjectsDownload();

  return (
    <Modal
      title="Your download is in progress"
      open
      onClose={() => setModalOpen(false)}
      width={500}
    >
      <ModalContent>
        <div className={styles._content__container}>
          <div>
            <Icon name="mail" size={80} color="bloobirds" />
          </div>
          <div>
            <Text weight="bold">Your list in {downloadFormat} is on its way!</Text>
          </div>
          <div className={styles._bottom__text}>
            <Text color="softPeanut" inline align="center" size={15}>
              The exported file will be emailed to{' '}
              <Text inline align="center" size={15}>
                {settings.user.email}
              </Text>{' '}
              in a few minutes
            </Text>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div />
        <Button onClick={() => setModalOpen(false)}>Accept</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DownloadConfirmationModal;
