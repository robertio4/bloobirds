import React, { useEffect, useState } from 'react';

import {
  Icon,
  Input,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalHeader,
  ModalTitle,
  Text,
  Button,
  ModalFooter,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useEmailConnections } from '@bloobirds-it/hooks';

import { isEmail } from '../../misc/utils';
import { EmailConnection } from '../../typings/connections';
import { useUserSettings } from '../userPermissions/hooks';
import styles from './addAliasModal.module.css';

export const AddAliasModal = ({
  nylasAccount,
  onClose,
}: {
  nylasAccount: EmailConnection;
  onClose: () => void;
}) => {
  const { addAlias } = useEmailConnections();
  const settings = useUserSettings();
  const [emailAlias, setEmailAlias] = useState<string>();
  const [error, setError] = useState<boolean>(false);
  const { createToast } = useToasts();
  useEffect(() => {
    if (emailAlias?.length > 0 && !isEmail(emailAlias)) {
      setError(true);
    } else {
      setError(false);
    }
  }, [emailAlias]);
  const handleAddAlias = () => {
    addAlias({
      account: '/accounts/' + settings?.account?.id,
      emailAlias: emailAlias,
      nylasUserAccount: '/nylasUserAccounts/' + nylasAccount?.id,
    })
      .then(() => {
        onClose();
        createToast({ message: 'Alias created successfully!', type: 'success' });
      })
      .catch(() => {
        createToast({
          message: 'There was an error creating alias, please try again later.',
          type: 'error',
        });
      });
  };

  return (
    <Modal open onClose={onClose} width={640}>
      <ModalHeader size="small">
        <ModalTitle className={styles.modalTitle}>
          <Icon name="mail" size={16} />
          <Text size="m" htmlTag="span">
            Add email alias
          </Text>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <Text size="m" className={styles.text}>
          Enter a new email alias for the account{' '}
          <Text size="m" weight="bold" htmlTag="span">
            {nylasAccount?.email}
          </Text>
        </Text>
        <Text size="m" className={styles.text}>
          ⚠️ Be aware that you need to set up your aliases properly if you’re using a{' '}
          <a
            href="https://support.google.com/a/answer/33327?product_name=UnuFlow&hl=en&visit_id=637788702669262869-2616677116&rd=1&src=supportwidget0&hl=en"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Gmail
          </a>{' '}
          or{' '}
          <a
            href="https://support.microsoft.com/en-us/office/add-or-remove-an-email-alias-in-outlook-com-459b1989-356d-40fa-a689-8f285b13f1f2"
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            Outlook
          </a>{' '}
          account.
        </Text>
        <Input
          name="alias"
          placeholder="Email alias"
          width="100%"
          error={error && 'This is not a valid email'}
          onChange={setEmailAlias}
        />
        <Text size="xs" color="softPeanut" className={styles.text}>
          This email address will a new alias linked with your account.
        </Text>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={error || !emailAlias} onClick={handleAddAlias}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );
};
