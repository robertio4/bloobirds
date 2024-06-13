import React, { useState } from 'react';
import {
  Button,
  Chip,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import styles from './saveQuickFilterModal.module.css';
import { ellipsis } from '../../../../../../utils/strings.utils';

interface SaveQuickFilterProps {
  filters: any;
  mode: 'create' | 'edit';
  order?: number;
  quickFilter?: any;
  onSave: (data: any) => Promise<void>;
  onClose: () => void;
  callback?: () => void;
}

export const SaveQuickFilterModal = ({
  filters,
  mode,
  order,
  quickFilter,
  onSave,
  onClose,
  callback = () => {},
}: SaveQuickFilterProps) => {
  const { createToast } = useToasts();
  const [isLoading, setIsLoading] = useState();
  const isEditing = mode === 'edit';
  const methods = useForm({ defaultValues: quickFilter });
  const name = methods.watch('name');

  const handleSave = async (values: { name: string }) => {
    const data = {
      id: isEditing ? quickFilter?.id : null,
      filters,
      name: values?.name,
      order,
    };
    onClose();
    onSave(data)
      .then(() => {
        callback();
        createToast({
          type: 'success',
          message: `Quick filter ${values?.name} ${isEditing ? 'updated' : 'created'}`,
        });
      })
      .catch(() => {
        createToast({
          type: 'error',
          message: 'There was an error creating the quick filter, please try again later.',
        });
      });
  };

  return (
    <Modal width={640} title="Save as new quick filter" open onClose={onClose}>
      <FormProvider {...methods}>
        <ModalContent>
          <div className={styles.content}>
            <Text size="m" weight="bold">
              Select a name that is representative of this quick filter on its own
            </Text>
            <div className={styles.nameWrapper}>
              <Controller
                name="name"
                rules={{
                  required: 'This field is required',
                }}
                render={({ onChange, value }) => (
                  <Input
                    error={methods.errors.name?.message}
                    placeholder="Name*"
                    size="medium"
                    width="280px"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
              <div className={styles.quickFilterWrapper}>
                <Chip size="small">{ellipsis(name, 32) || 'Preview'}</Chip>
              </div>
            </div>
          </div>
        </ModalContent>
        <ModalFooter>
          <div>
            <Button onClick={onClose} variant="clear" color="tomato">
              CANCEL
            </Button>
          </div>
          <Button onClick={methods.handleSubmit(handleSave)} disabled={!name}>
            {isLoading ? <Spinner name="loadingCircle" color="white" /> : 'SAVE'}
          </Button>
        </ModalFooter>
      </FormProvider>
    </Modal>
  );
};
