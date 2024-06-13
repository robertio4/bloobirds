import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  useToasts,
  Text,
  Item,
  Select,
} from '@bloobirds-it/flamingo-ui';
import { useSalesforceDataModel } from '@bloobirds-it/hooks';
import {
  FieldsEntity,
  SalesforceDataModelResponse,
  TaskOrContactOrOpportunityOrEventOrLeadOrAccount,
  Types,
} from '@bloobirds-it/types';
import { atom, useRecoilState } from 'recoil';

import useModalVisibility from '../../../../hooks/useModalVisibility';
import { api } from '../../../../utils/api';
import { CrmStatusResponse } from '../types/crmStatusTypes';
import styles from './addCrmStatusFieldModal.module.css';
import { ConfirmEditSalesforceField } from './confirmEditSalesforceField';

const crmStatusModalState = atom({
  key: 'addCrmStatusModalState',
  default: {
    crmStatus: null,
  },
});

export const useCrmStatusFieldModal = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'accountSettings.crmStatus' });
  const [modalState, setModalState] = useRecoilState(crmStatusModalState);
  const { closeModal, isOpen, openModal } = useModalVisibility('addCrmStatusField');
  const { createToast } = useToasts();
  const updateCrmField = (crmField: string, mutateList: () => void) => {
    api
      .patch('/utils/crmStatus/updateCrmStatusField/', {
        id: modalState?.crmStatus?.id,
        crmField: crmField,
      })
      .then(() => {
        createToast({ message: t('updateFieldSuccess'), type: 'success' });
        mutateList();
      })
      .catch(() => {
        createToast({
          message: t('updateFieldFailed'),
          type: 'error',
        });
      });
  };

  return {
    closeModal: () => {
      setModalState({
        crmStatus: null,
      });
      closeModal();
    },
    isOpen,
    openCrmStatusFieldModal: (crmStatus: CrmStatusResponse) => {
      setModalState({
        crmStatus,
      });
      openModal();
    },
    crmObject: modalState.crmStatus?.crmObjectType,
    crmField: modalState.crmStatus?.crmField,
    updateCrmField,
  };
};

const AddCrmStatusFieldModal = ({
  open,
  onClose,
  mutateList,
}: {
  open: boolean;
  onClose: () => void;
  mutateList: () => void;
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'accountSettings.crmStatus' });
  const { crmObject, crmField, updateCrmField } = useCrmStatusFieldModal();
  const formCrmField = useForm({
    defaultValues: {
      crmStatusFieldSelected: crmField || '',
    },
  });
  const {
    formState: { isSubmitting, isDirty },
  } = formCrmField;
  const [search, setSearch] = useState<string>();
  const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleCrmFieldUpdate = (data: any) => {
    updateCrmField(data?.crmStatusFieldSelected, mutateList);
    onClose();
  };

  const handleEditConfirm = () => {
    setIsDeleting(false);
    setConfirmModalOpen(true);
  };
  const handleEditContinue = () => {
    return formCrmField.handleSubmit(handleCrmFieldUpdate);
  };

  const handleRemoveContinue = () => {
    formCrmField.setValue('crmStatusFieldSelected', null);
    return formCrmField.handleSubmit(handleCrmFieldUpdate);
  };

  const salesforceDataModel: SalesforceDataModelResponse = useSalesforceDataModel();
  const objectType = crmObject?.toLowerCase() as
    | 'task'
    | 'contact'
    | 'opportunity'
    | 'event'
    | 'lead'
    | 'account';
  const salesforceDataModelFields = ((salesforceDataModel.types as Types)?.[
    objectType
  ] as TaskOrContactOrOpportunityOrEventOrLeadOrAccount)?.fields
    ?.filter(field => field?.type == 'picklist')
    .sort((a: FieldsEntity, b: FieldsEntity) => (a.label < b.label ? -1 : 1));

  return (
    <Modal open onClose={onClose} width={410}>
      <ModalHeader size="small" color="white">
        <ModalTitle size="medium">Salesforce Field</ModalTitle>
        <ModalCloseIcon size="small" onClick={onClose} />
      </ModalHeader>
      <ModalContent className={styles._modal_content}>
        <>
          <Text size="m">
            <Trans i18nKey="accountSettings.crmStatus.modalSelectField" />
          </Text>
          <div className={styles._search_content}>
            <FormProvider {...formCrmField}>
              <Controller
                name="crmStatusFieldSelected"
                render={({ onChange, value }) => (
                  <Select
                    error={formCrmField.errors.crmStatusFieldSelected?.message}
                    placeholder={t('modalSelectSearch')}
                    onChange={onChange}
                    removePlaceholder={true}
                    autocomplete={true}
                    onSearch={v => setSearch(v)}
                    value={value}
                    width="100%"
                  >
                    <Item value={null}> </Item>
                    {salesforceDataModelFields?.map((salesforceField: FieldsEntity) => {
                      if (
                        search &&
                        !salesforceField?.label?.toLowerCase().includes(search?.toLowerCase())
                      ) {
                        return null;
                      }
                      return (
                        <Item key={salesforceField?.name} value={salesforceField.name}>
                          {salesforceField?.label}
                        </Item>
                      );
                    })}
                  </Select>
                )}
              />
            </FormProvider>
          </div>
        </>
      </ModalContent>
      <ModalFooter className={styles._modal_footer}>
        <div className={styles._footer_buttons}>
          {crmField && (
            <Button
              variant="clear"
              color="extraMeeting"
              uppercase={false}
              onClick={() => {
                setIsDeleting(true);
                setConfirmModalOpen(true);
              }}
              size="small"
              className={styles._remove_button}
            >
              {t('removeRelationButton')}
            </Button>
          )}
          <Button
            onClick={crmField && isDirty ? handleEditConfirm : handleEditContinue()}
            variant="primary"
            size="small"
            uppercase={false}
            className={styles._save_button}
          >
            {t('saveButton')}
          </Button>
        </div>
      </ModalFooter>
      {confirmModalOpen && (
        <ConfirmEditSalesforceField
          assetLabel={'Salesforce Field'}
          isLoading={isSubmitting}
          isDeleting={isDeleting}
          handleContinue={isDeleting ? handleRemoveContinue() : handleEditContinue()}
          handleClose={() => {
            setConfirmModalOpen(false);
            setIsDeleting(false);
          }}
          variant="primary"
        >
          {isDeleting ? (
            <>
              <Text size="m">{t('confirmDeleteField')}</Text>
              <Text size="m">{t('confirmContinue')}</Text>
            </>
          ) : (
            <>
              <Text size="m">{t('confirmEditField')}</Text>
              <Text size="m">{t('confirmContinue')}</Text>
            </>
          )}
        </ConfirmEditSalesforceField>
      )}
    </Modal>
  );
};

export default AddCrmStatusFieldModal;
