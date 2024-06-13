import React from 'react';

import {
  Button,
  Callout,
  Checkbox,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys } from '@bloobirds-it/types';

import { useUserHelpers } from '../../../../../hooks/useUserHelpers';
import styles from '../../styles/usersPage.module.css';

export const UserCreatedModal = ({ onClose }) => {
  const { save } = useUserHelpers();
  return (
    <Modal open onClose={onClose} width={760}>
      <ModalHeader>
        <ModalTitle>Invitation sent</ModalTitle>
      </ModalHeader>
      <ModalContent>
        <div className={styles._section}>
          <div className={styles._header__container}>
            <div className={styles._icon__container}>
              <div className={styles._extra__email__wrapper}>
                <div className={styles._extra__email__icon__line__1} />
                <div className={styles._extra__email__icon__line__2} />
                <div className={styles._extra__email__icon__line__1} />
              </div>
              <Icon name="mail" size={48} color="tangerine" />
            </div>
            <div className={styles._divider} />
          </div>
          <div className={styles._text__section}>
            <Text align="center" size="xl" data-test="Invitation-succesfully-sent">
              Your invitation was succesfully sent
            </Text>
            <div className={styles._callout}>
              <Callout icon="alertTriangle" variant="alert">
                <Text size="s">
                  The email will expire in{' '}
                  <Text size="s" weight="bold" htmlTag="span">
                    3 days
                  </Text>
                  , so we highly recommend to check it fast!
                </Text>
              </Callout>
            </div>
            <Text align="center" color="softPeanut" size="s">
              Remember that if the invitation expires, you can send another one to this user from
              the “Sales Team” tab in account settings.
            </Text>
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div />
        <div className={styles._footer_section}>
          <div>
            <Checkbox
              onClick={() => save(UserHelperKeys.DONT_SHOW_AGAIN_CREATED_USER_MODAL)}
              size="small"
            />
            <Text size="s">Do not show this again</Text>
          </div>
          <Button onClick={onClose} dataTest="continue-user-invitation">
            Continue
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
