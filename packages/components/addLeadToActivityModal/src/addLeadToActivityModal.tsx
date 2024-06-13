import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Callout,
  Checkbox,
  Modal,
  ModalCloseIcon,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { Bobject, BuyerPersona } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import AutoCompleteSearchLeads from './AutoCompleteSearchLeads';
import styles from './addLeadToActivityModal.module.css';

const AddLeadToActivityModal = ({
  activity,
  accountId,
  buyerPersonas,
  onClose,
  onSubmit,
  shouldAllowToAddPhone,
}: {
  activity: Bobject;
  accountId: string;
  buyerPersonas: BuyerPersona[];
  onClose: () => void;
  onSubmit: (leadId: string, shouldUpdatePhone: boolean) => void;
  shouldAllowToAddPhone: boolean;
}) => {
  const [leadId, setLeadId] = useState(null);
  const [shouldUpdatePhone, setShouldUpdatePhone] = useState(false);
  const { createToast } = useToasts();
  const { t } = useTranslation('translation', { keyPrefix: 'addLeadToActivityModal' });

  const handleAssign = () => {
    api
      .post(`/utils/service/activity/assign/${activity?.id?.objectId}`, { leadId })
      .then(() => {
        onSubmit?.(leadId, shouldUpdatePhone);
        createToast({
          message: t('toast.success'),
          type: 'success',
        });
      })
      .catch(() => {
        createToast({
          message: t('toast.error'),
          type: 'error',
        });
      });
  };

  return (
    <Modal onClose={onClose} open width={700}>
      <ModalHeader>
        <ModalTitle>{t('title')}</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <div className={styles._content__wraper}>
        <div className={styles._info__wrapper}>
          <Callout icon="info" width="100%">
            <Text size="m">
              <span role="img" aria-label="icon-label">
                💡
              </span>{' '}
              {t('callout')}
            </Text>
          </Callout>
        </div>
        <div className={styles._autocomplete__wrapper}>
          <AutoCompleteSearchLeads
            accountId={accountId}
            buyerPersonas={buyerPersonas}
            onLeadIdChange={setLeadId}
          />
          {shouldAllowToAddPhone && (
            <Checkbox checked={shouldUpdatePhone} onClick={setShouldUpdatePhone}>
              {t('checkbox')}
            </Checkbox>
          )}
        </div>
      </div>
      <ModalFooter>
        <div>
          <Button variant="clear" color="tomato" onClick={onClose}>
            {t('cancel')}
          </Button>
        </div>
        <div className={styles._confirm__button}>
          <Button
            disabled={!leadId}
            onClick={() => {
              handleAssign();
              onClose();
            }}
          >
            {t('assign')}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};
export default AddLeadToActivityModal;
