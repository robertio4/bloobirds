import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, SalesforceTabs, UseEveryBobjectType } from '@bloobirds-it/types';

import { useCadenceControlData } from '../cadenceControlModal/useCadenceControlModal';
import styles from './stopCadenceModal.module.css';

export const StopCadenceModal = ({
  bobject,
  handleClose,
  handleSave,
  useEveryBobject,
  subhomeTab,
  size = 'medium',
}: {
  bobject: Bobject;
  handleClose: () => void;
  handleSave?: () => void;
  useEveryBobject?: UseEveryBobjectType;
  subhomeTab?: SalesforceTabs;
  size?: 'small' | 'medium';
}) => {
  const { isSaving, stopCadence } = useCadenceControlData(bobject);
  const isBulkAction = Array.isArray(bobject);
  const sampleBobject = isBulkAction ? bobject[0] : bobject;
  const bobjectType = sampleBobject?.id?.typeName;
  const { t } = useTranslation('translation', { keyPrefix: 'cadence.stopCadenceModal' });
  const { t: bobjectTypeT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });

  return (
    <Modal open onClose={handleClose} width={640}>
      <ModalHeader size={size}>
        <ModalTitle size={size}>
          {t('stopCadence', { count: isBulkAction ? bobject?.length : 1 })}
        </ModalTitle>
        <ModalCloseIcon onClick={handleClose} size={size} />
      </ModalHeader>
      <ModalContent>
        <div className={styles.text}>
          {isBulkAction ? (
            <Text size="m" align="center">
              <Trans
                i18nKey="cadence.stopCadenceModal.messageBulk"
                values={{
                  count: bobject?.length,
                  bobjectTypes: bobjectTypeT(bobjectType?.toLowerCase(), {
                    count: bobject?.length,
                  }),
                }}
              />
            </Text>
          ) : (
            <Text size="m" align="center">
              <Trans
                i18nKey="cadence.stopCadenceModal.message"
                values={{ bobjectTypes: bobjectTypeT(bobjectType?.toLowerCase()) }}
              />
            </Text>
          )}
        </div>
      </ModalContent>
      <ModalFooter>
        <Button variant="clear" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button
          color="tomato"
          onClick={() => {
            stopCadence(
              () => {
                handleSave?.();
                handleClose();
              },
              useEveryBobject,
              subhomeTab,
            );
          }}
        >
          {isSaving ? <Spinner color="white" size={14} name="loadingCircle" /> : t('stopCadence')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
