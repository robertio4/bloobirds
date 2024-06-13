import React from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  IconType,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';

import styles from './addCrmStatusFieldModal.module.css';

interface ModalProps {
  assetLabel: string;
  handleContinue: () => void;
  variant?: 'primary' | 'gradient';
  handleClose: () => void;
  icon?: IconType;
  isDeleting?: boolean;
  isLoading?: boolean;
  children?: React.ReactElement | React.ReactElement[] | string;
  colorSchema?: any;
}

export const ConfirmEditSalesforceField = ({
  assetLabel,
  handleContinue,
  variant,
  handleClose,
  icon,
  isDeleting,
  children,
  colorSchema,
  isLoading,
}: ModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal width={600} open onClose={handleClose}>
      <ModalHeader
        variant={variant || 'primary'}
        {...(colorSchema ? { color: colorSchema.verySoft } : {})}
      >
        <ModalTitle
          variant={variant || 'primary'}
          {...(colorSchema ? { color: colorSchema.verySoft } : {})}
        >
          <div className={styles._title__container}>
            {icon && (
              <Icon
                name="compass"
                className={styles._icon}
                color={colorSchema?.light || 'bloobirds'}
              />
            )}
            <Text size="m" inline>
              {assetLabel}
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon color="black" size="small" onClick={handleClose} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.content}>{children}</div>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={handleClose} color={colorSchema?.light || 'bloobirds'}>
          {t('accountSettings.crmStatus.goBackButton')}
        </Button>
        <Button
          variant="primary"
          color={isDeleting ? 'tomato' : 'bloobirds'}
          dataTest="deleteModalDeleteButton"
          onClick={handleContinue}
        >
          {isLoading ? (
            <Spinner name="loadingCircle" color="white" size={16} />
          ) : isDeleting ? (
            t('common.remove')
          ) : (
            t('common.continue')
          )}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
