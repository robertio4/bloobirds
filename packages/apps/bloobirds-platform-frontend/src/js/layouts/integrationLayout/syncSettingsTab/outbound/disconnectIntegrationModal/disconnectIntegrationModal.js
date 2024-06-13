import React, { useState } from 'react';
import styles from './disconnectIntegration.module.css';
import {
  Button,
  Callout,
  Checkbox,
  Modal,
  ModalContent,
  ModalFooter,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { CRM, CRM_DISPLAY_NAME } from '../../../../../constants/integrations';

const DisconnectIntegrationModal = ({ crm, disconnectIntegration, appDisconnected }) => {
  const [open, setOpen] = useState(false);
  const [checked, isChecked] = useState(false);
  const handleToggle = () => setOpen(!open);
  const handleClose = () => setOpen(false);
  const handleDisconnectIntegration = () => {
    disconnectIntegration();
    window.location.reload(false);
  };

  const isHubspot = crm === CRM.HUBSPOT;
  const displayCrm = CRM_DISPLAY_NAME[crm];
  return (
    <>
      <Button
        iconLeft="disconnectOutline"
        onClick={handleToggle}
        variant={!appDisconnected ? 'clear' : 'secondary'}
        color="tomato"
        expand={appDisconnected}
        uppercase
      >
        disconnect {displayCrm}
      </Button>
      <Modal title="Disconnecting" open={open} onClose={handleClose}>
        <ModalContent>
          <Text size="m" weight="bold" color="peanut">
            Are you sure you want to disconnect your {displayCrm} integration?
          </Text>
          <div className={styles._check_box}>
            <Checkbox onClick={value => isChecked(value)}>
              Yes, disconnect the {displayCrm} Integration
            </Checkbox>
          </div>
          <div className={styles._call_out}>
            <Callout variant="alert">
              <span role="img" aria-label="icon-label">
                👉
              </span>{' '}
              By disconnecting {displayCrm}&apos;s integration your {displayCrm} data will no longer
              be syncing with your Bloobirds data.{' '}
              <p className={styles._call_out_text}>
                You will lose your field mappings configuration, your customization of all settings,
                and your Sync logs history.
              </p>
            </Callout>
            {isHubspot && !appDisconnected && (
              <Callout variant="negative">
                <Text size={'m'} color="peanut">
                  <span role="img" aria-label="icon-label">
                    ✋
                  </span>{' '}
                  Be sure you&apos;ve already uninstalled Bloobirds app within your Hubspot account,{' '}
                  <Text size="m" color="peanut" inline weight={'bold'}>
                    otherwise we will still be getting updates.{' '}
                  </Text>
                </Text>
                <Text size="m" color="bloobirds">
                  Learn how to do it.
                </Text>
              </Callout>
            )}
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="clear" color="bloobirds" onClick={handleClose} uppercase>
            cancel
          </Button>
          <Button onClick={handleDisconnectIntegration} disabled={!checked} uppercase>
            confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default DisconnectIntegrationModal;
