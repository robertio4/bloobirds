import React, { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalSection,
  ModalContent,
  ModalTitle,
  ModalCloseIcon,
  ModalFooter,
  Input,
  Button,
} from '@bloobirds-it/flamingo-ui';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import styles from '../../pages/apiKeyPage.module.css';
import { ApiKey, useApiKeys } from '../../hooks/useApiKeys';
import { isEmail } from '../../../../../misc/utils';

export const GenerateApiKeyModal = ({
  onClose,
  apiKey,
}: {
  onClose: () => void;
  apiKey: ApiKey;
}) => {
  const defaultValues = { ...apiKey };
  const { createApiKey } = useApiKeys();
  const [isSaving, setIsSaving] = useState<boolean>();
  const methods = useForm({ defaultValues });
  const onSave = (data: ApiKey) => {
    setIsSaving(true);
    createApiKey(
      data,
      () => {
        onClose();
        setIsSaving(false);
      },
      () => {
        setIsSaving(false);
      },
    );
  };

  return (
    <Modal open onClose={onClose}>
      <ModalHeader>
        <ModalTitle>Generate Api Key</ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        <ModalSection title="Api Key Details" icon="tag">
          <FormProvider {...methods}>
            <Controller
              name="name"
              control={methods.control}
              rules={{
                required: 'This field is required',
                validate: v =>
                  v?.length <= 191 || 'Name too long, you can add 191 characters maximum',
              }}
              render={({ onChange }) => {
                return (
                  <Input
                    error={methods.errors.name?.message}
                    name="apiKey"
                    placeholder="API Key name"
                    onChange={onChange}
                    className={styles.nameInput}
                  />
                );
              }}
            />
          </FormProvider>
        </ModalSection>
      </ModalContent>
      <ModalFooter>
        <div>
          <Button variant="clear" onClick={onClose}>
            Cancel
          </Button>
        </div>
        <Button disabled={isSaving} onClick={methods.handleSubmit(onSave)}>
          New Api key
        </Button>
      </ModalFooter>
    </Modal>
  );
};
