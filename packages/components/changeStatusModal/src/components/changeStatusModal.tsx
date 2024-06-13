import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { recoverScrollOfBox, removeScrollOfBox } from '@bloobirds-it/utils';

import { ModalProps, ProviderType } from '../types/changeStatusModalTypes';
import {
  isStatusWithReason,
  showStopCadenceWarning,
  showUnassignedWarning,
} from '../utils/changeStatus.utils';
import { AditionalInfoSelect } from './aditionalInfoSelect/aditionalInfoSelect';
import styles from './changeStatusModal.module.css';
import { StatusSelector } from './statusSelector/statusSelector';
import {
  ChangeStatusModalProvider,
  useChangeStatusContext,
  useChangeStatusData,
} from './useChangeStatus';

const withProvider = Component => ({ children, ...props }: ProviderType) => {
  const { onSave, handleClose, ...providerProps } = props;

  return (
    <ChangeStatusModalProvider {...providerProps}>
      <Component onSave={onSave} handleClose={handleClose} />
    </ChangeStatusModalProvider>
  );
};

const ChangeStatusModalComponent = ({ handleClose, onSave }: ModalProps) => {
  const {
    bobject,
    bobjectType,
    icon,
    handleSelectedStatus: [selectedStatus],
    handleSelectedReason: [selectedReason],
    handleSelectedUser: [selectedUser],
    availableReasons,
    isAssigned,
    isSales,
  } = useChangeStatusContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSave } = useChangeStatusData();
  const canSave =
    !isStatusWithReason(selectedStatus) ||
    !availableReasons?.isRequired ||
    (isStatusWithReason(selectedStatus) && selectedReason);
  const { t } = useTranslation();
  const { t: bobjectT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });

  useEffect(() => {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);

  function handleSubmit() {
    setIsSubmitting(true);
    const data = {
      bobject,
      bobjectType,
      selectedStatus,
      selectedReason,
      selectedUser,
      isSales,
      isAssigned,
    };
    handleSave(data, setIsSubmitting).then(onSave);
  }

  return (
    <>
      <Modal open onClose={handleClose}>
        <div onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>
              {t('changeStatusModal.modalTitle', {
                bobjectType: bobjectT(bobjectType?.toLowerCase()),
              })}
            </ModalTitle>
          </ModalHeader>
          {showUnassignedWarning(selectedStatus, isAssigned) && (
            <div className={styles._warning__banner}>
              <Icon name="person" color="banana" />
              <Text size="s" color="peanut">
                <Trans
                  i18nKey={`changeStatusModal.stopCadenceWarning`}
                  values={{ bobjectType: bobjectType.toLowerCase() }}
                />
              </Text>
            </div>
          )}
          {showStopCadenceWarning(selectedStatus) && (
            <div className={styles._warning__banner}>
              <Icon name="cadence" color="banana" />
              <Text size="s" color="peanut">
                <Trans i18nKey={`changeStatusModal.stopCadenceWarning`} />
              </Text>
            </div>
          )}

          <ModalContent>
            <ModalSection size="l" title={t(`changeStatusModal.title.${bobjectType}`)} icon={icon}>
              <div className={styles._section__wrapper}>
                <div className={styles._content__wrapper}>
                  <div className={styles._change_status__wrapper}>
                    <div className={styles._name__wrapper}>
                      <Icon color="verySoftPeanut" name={icon} />
                      <Text dataTest="Modal-StatusUpdate" size="m" color="peanut">
                        {bobject.name}
                      </Text>
                    </div>
                    <StatusSelector />
                  </div>
                </div>
              </div>
              <AditionalInfoSelect />
            </ModalSection>
          </ModalContent>
          <ModalFooter>
            <div className={styles._buttons__wrapper}>
              <Button variant="clear" color="tomato" onClick={handleClose}>
                {t('common.cancel')}
              </Button>
              <Button
                dataTest="ChangeStatus-Save"
                disabled={isSubmitting || !canSave}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <Spinner name="loadingCircle" size={14} color="white" />
                ) : (
                  t('common.save').toUpperCase()
                )}
              </Button>
            </div>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
};

export const ChangeStatusModal = withProvider(ChangeStatusModalComponent);
