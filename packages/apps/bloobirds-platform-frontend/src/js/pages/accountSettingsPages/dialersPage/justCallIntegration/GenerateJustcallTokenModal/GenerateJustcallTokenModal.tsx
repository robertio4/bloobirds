import React, { useEffect, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalContent,
  Input,
  ModalFooter,
  Button,
  Spinner,
  ModalCloseIcon,
  ModalSection,
  Text,
  IconButton,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import styles from './GenerateJustcallTokenModal.module.css';
import { api } from '../../../../../utils/api';
import CopyToClipboard from '../../../../../components/CopyToClipboard';

const GenerateJustcallTokenModal = ({ onClose }: { onClose: () => void }) => {
  const [apiKey, setApiKey] = useState<string>();
  const [data, setData] = useState();

  useEffect(() => {
    api
      .post('/utils/service/api/key/search', {
        keyType: 'JUST_CALL',
      })
      .then(res => {
        if (res?.data?.apiKeyList?.length > 0) {
          setData(res);
          setApiKey(res?.data?.apiKeyList[0]?.apiKey);
        } else {
          api
            .post('/utils/service/api/key', {
              keyType: 'JUST_CALL',
              name: 'justCallWebApp',
            })
            .then(res => {
              if (res?.data?.apiKey) {
                setData(res);
                setApiKey(res?.data?.apiKey);
              } else {
                setData(res);
              }
            });
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Modal open onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Api key for Just Call integration</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalSection title="Api key" icon="link">
          <Text size="m" color="softPeanut" className={styles.subtitle}>
            Remember to copy this token on Just Call to setup the integration.
          </Text>
          <div className={styles.input_container}>
            {data?.status === 200 ? (
              <>
                <Input disabled value={apiKey} width="400px" />
                <Tooltip position="top" title="Copy api key">
                  <CopyToClipboard dataToCopy={apiKey}>
                    <IconButton name="copy" size={24} />
                  </CopyToClipboard>
                </Tooltip>
              </>
            ) : (
              <Spinner size={24} />
            )}
            {data?.status > 400 && (
              <Text color="tomato" size="m">
                There was an error getting the token
              </Text>
            )}
          </div>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose}>
          CLOSE
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default GenerateJustcallTokenModal;
