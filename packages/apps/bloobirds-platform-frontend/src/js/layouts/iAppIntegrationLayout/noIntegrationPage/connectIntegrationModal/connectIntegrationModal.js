import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Callout,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  ModalSection,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import styles from './connectIntegration.module.css';
import { CRM, CRM_DISPLAY_NAME } from '../../../../constants/integrations';

const ConnectIntegrationModal = ({ children, handleError, error, crm, isSubmitting, onSubmit }) => {
  const displayCrm = CRM_DISPLAY_NAME[crm];
  const actions = ['testing connection...', 'Creating fields...', 'Finishing...'];
  const [open, setOpen] = useState(false);
  const [startInterval, setStartInterval] = useState(false);
  const [action, setAction] = useState(actions[0]);

  let i = 0;
  const shuffle = useCallback(() => {
    if (startInterval) {
      setAction(actions[i]);
      i = i === 2 ? 2 : i + 1;
    }
  }, [startInterval]);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle]);
  const modalTitle = `Connect your ${displayCrm}`;
  const modalSectionTitle = `Add your ${displayCrm} details`;
  const handleToggle = () => setOpen(!open);
  const handleClose = () => {
    setOpen(false);
    handleError(false);
  };

  const handleConnect = () => {
    setStartInterval(true);
    onSubmit();
  };

  return (
    <>
      <Button
        variant="primary"
        color="bloobirds"
        iconLeft="settings"
        onClick={handleToggle}
        uppercase
      >
        connect {displayCrm}
      </Button>

      <Modal title={modalTitle} open={open} variant="gradient" onClose={handleClose}>
        {!isSubmitting && (
          <ModalContent>
            <ModalSection title={modalSectionTitle} icon="tag">
              <div className={styles._text_area}>{children}</div>
              {error ? (
                <div className={styles._callout}>
                  <Callout variant="negative">
                    <span role="img" aria-label="icon-label">
                      👉
                    </span>
                    {displayCrm} could not be connected.{error}
                  </Callout>
                </div>
              ) : (
                <div className={styles._callout}>
                  <Callout variant="alert">
                    <span role="img" aria-label="icon-label">
                      👉
                    </span>
                    Salesforce user must be System Administrator profile to set up the integration
                    correctly
                  </Callout>
                </div>
              )}
            </ModalSection>
          </ModalContent>
        )}
        {isSubmitting && (
          <ModalContent>
            <div className={styles._modal_content}>
              <span className={styles._clock}>
                <Icon name="clock" size={48} />
              </span>
              <Text size="xl" weight="medium" color="peanut">
                Starting integration...
              </Text>
              <Spinner name="dots" size={50} />
              <Text size={'m'} weight="medium" color="softPeanut">
                {action}
              </Text>
            </div>
          </ModalContent>
        )}
        <ModalFooter>
          <Button variant="clear" onClick={handleClose}>
            Cancel
          </Button>

          {!isSubmitting && (
            <Button disabled={isSubmitting} onClick={handleConnect}>
              Connect
            </Button>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};
export default ConnectIntegrationModal;
