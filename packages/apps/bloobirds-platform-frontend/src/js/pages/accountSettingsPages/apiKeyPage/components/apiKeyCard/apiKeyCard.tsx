import React, { useState } from 'react';

import { IconButton, Text, Tooltip, useToasts } from '@bloobirds-it/flamingo-ui';

import useModalVisibility from '../../../../../hooks/useModalVisibility';
import { ConfirmDeleteModalLayout } from '../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { ApiKey, useApiKeys } from '../../hooks/useApiKeys';
import styles from './apiKeyCard.module.css';

export const ApiKeyCard = ({ apiKey }: { apiKey: ApiKey }) => {
  const [seeKey, setSeeKey] = useState<boolean>(false);
  const { isOpen, openModal, closeModal } = useModalVisibility(
    'confirmDeleteModalApiKey' + apiKey.id,
  );
  const { deleteApiKey } = useApiKeys();
  const { createToast } = useToasts();

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <div>
          <Text size="l" color="bloobirds" weight="bold" ellipsis={100}>
            {apiKey.name}
          </Text>
        </div>
        <div>
          <Text size="m" color={seeKey ? 'softPeanut' : 'bloobirds'} weight="bold" ellipsis={50}>
            {seeKey ? apiKey.apiKey : '**********************'}
          </Text>
        </div>
        <div>
          <IconButton name={seeKey ? 'eye' : 'eyeOff'} onClick={() => setSeeKey(!seeKey)} />
        </div>
        <div>
          <Tooltip title="Copy key" position="top">
            <IconButton
              name="copy"
              onClick={() => {
                navigator.clipboard.writeText(apiKey?.apiKey).then(() => {
                  createToast({ message: 'Api key copied!', type: 'info' });
                });
              }}
            />
          </Tooltip>
        </div>
      </div>
      <div className={styles.cardDelete}>
        <IconButton name="trashFull" onClick={openModal} />
      </div>
      {isOpen && (
        <ConfirmDeleteModalLayout
          assetLabel="API key"
          handleDelete={() =>
            deleteApiKey(apiKey?.id, () => {
              closeModal();
            })
          }
          handleClose={closeModal}
          colorSchema={{
            verySoft: 'veryLightBloobirds',
            light: 'bloobirds',
          }}
          variant="primary"
          icon={undefined}
          isDeleting={undefined}
        >
          <div className={styles.confirmation_body}>
            <Text size="s" className={styles.confirmation_info}>
              You are going to delete permanently this<b> API key</b>
            </Text>
            <Text size="s" weight="bold">
              Are you sure you want to continue?
            </Text>
          </div>
        </ConfirmDeleteModalLayout>
      )}
    </div>
  );
};
