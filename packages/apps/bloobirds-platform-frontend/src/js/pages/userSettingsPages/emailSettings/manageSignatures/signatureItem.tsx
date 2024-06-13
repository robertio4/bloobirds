import React, { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { IconButton, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { SignatureProps } from '@bloobirds-it/hooks';

import styles from './manageSignatures.module.css';
import ConfirmationModal from './signatureModal';

export const SignatureItem = ({
  signature,
  isSelected,
  onClick,
  onDelete,
  onSetAsDefault,
}: {
  signature: SignatureProps;
  isSelected: boolean;
  onClick: (signature: SignatureProps) => void;
  onDelete: (signature: SignatureProps) => void;
  onSetAsDefault: (id: string) => void;
}) => {
  const { id, name, default: defaultSignature } = signature;
  const [hover, setHover] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <div
        className={styles.signatureItem}
        onClick={() => onClick(signature)}
        style={{ backgroundColor: isSelected ? 'var(--veryLightPeanut)' : 'var(--white)' }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Text size="s" color="peanut" inline>
          {name}
        </Text>
        <div className={styles.actionsItem}>
          {hover || isSelected || defaultSignature ? (
            <Tooltip position="top" title={t('userSetings.email.signature.tooltips.setAsDefault')}>
              <IconButton
                className={styles.startIcon}
                name={defaultSignature ? 'starChecked' : 'starUnchecked'}
                color="banana"
                size={20}
                onClick={e => {
                  e.stopPropagation();
                  onSetAsDefault(id);
                }}
              />
            </Tooltip>
          ) : null}
          {!defaultSignature && (hover || isSelected) ? (
            <Tooltip position="top" title={t('userSetings.email.signature.tooltips.delete')}>
              <IconButton
                className={styles.trashIcon}
                name="trashFull"
                color="softPeanut"
                size={20}
                onClick={e => {
                  e.stopPropagation();
                  setOpenConfirmationModal(true);
                }}
              />
            </Tooltip>
          ) : null}
        </div>
      </div>
      {openConfirmationModal && (
        <ConfirmationModal
          title={t('userSetings.email.signature.confirmationModal.question')}
          icon={'trashFull'}
          onClose={() => setOpenConfirmationModal(false)}
          onContinue={() => {
            setOpenConfirmationModal(false);
            onDelete(signature);
            if (isSelected) {
              onClick(null);
            }
          }}
        >
          <>
            <Text size="m" align="center">
              <Trans i18nKey="userSetings.email.signature.confirmationModal.text" />
            </Text>
            <Text size="m" align="center">
              <b>{t('userSetings.email.signature.confirmationModal.question')}</b>
            </Text>
          </>
        </ConfirmationModal>
      )}
    </>
  );
};
