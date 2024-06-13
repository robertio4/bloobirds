import React, { useState } from 'react';

import {
  Button,
  Checkbox,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';
import { mutate } from 'swr';

import styles from './createInboundMappingsModal.module.css';

const CreateInboundMappingsModal = () => {
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClose = () => {
    setConfirm(false);
    setOpen(false);
  };

  const handleSubmit = () => {
    api
      .get('/utils/service/salesforce/initMappings')
      .then(res => res?.data)
      .then(() => {
        mutate('/entity/accountIntegrationTriggers').then(() => setOpen(false));
      });
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} uppercase>
        activate salesforce inbound
      </Button>
      <Modal title={'Confirm change'} open={open} onClose={() => setOpen(false)}>
        <ModalContent>
          <div>
            <Text size="m">You are about to change your Salesforce inbound integration.</Text>
            <Text size="m" weight="bold">
              Are you sure you want to continue?
            </Text>
            <div className={styles._checkBox}>
              <Checkbox onClick={() => setConfirm(!confirm)} expand>
                <Text size="m"> {'Yes, activate the Salesforce inbound integration'} </Text>
              </Checkbox>
            </div>
            <div className={styles._textArea}>
              <Text size="s"> This action will perform the next changes:</Text>
              <ul>
                <li>
                  <Text size="s">Enable sync objects from SFDC to Bloobirds </Text>
                </li>
                <li>
                  <Text size="s">
                    Now you will be able to choose the direction of every field mapping
                  </Text>
                  <ul>
                    <li>
                      <Text size="s">Always use Bloobirds </Text>
                    </li>
                    <li>
                      <Text size="s">Two way</Text>
                    </li>
                    <li>
                      <Text size="s">Always use Salesforce</Text>
                    </li>
                  </ul>
                </li>

                <li>
                  <Text size="s">
                    Added new field mapping to sync companies from Salesforce leads
                  </Text>
                </li>
              </ul>
              <Text size="s">After the activation, it is recommended to check:</Text>
              <ul>
                <li>
                  <Text size="s">
                    New sync settings tab, Salesforce{' '}
                    <Icon name="arrowRight" color="softPeanut" size={16} /> Bloobirds, to configure
                    your inbound integration
                  </Text>
                </li>
                <li>
                  <Text size="s">Check the sync direction of your field mappings</Text>
                </li>
              </ul>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button variant="clear" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={!confirm} onClick={handleSubmit}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default CreateInboundMappingsModal;
