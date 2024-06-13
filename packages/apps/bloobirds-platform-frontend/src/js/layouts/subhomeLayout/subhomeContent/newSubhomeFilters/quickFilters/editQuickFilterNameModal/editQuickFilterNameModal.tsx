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
import styles from './editQuickFilterNameModal.module.css';
import { QuickFilter } from '../../../../../../typings/quickFilters';
import { ellipsis } from '../../../../../../utils/strings.utils';

interface EditQuickFilterNameProps {
  quickFilter: QuickFilter;
  onSave: (data: any) => void;
  onClose: () => void;
}

export const EditQuickFilterNameModal = ({
  quickFilter,
  onSave,
  onClose,
}: EditQuickFilterNameProps) => {
  const { createToast } = useToasts();
  const [isLoading, setIsLoading] = useState();
  const methods = useForm({ defaultValues: quickFilter });
  const name = methods.watch('name');

  const handleSave = async (values: { name: string }) => {
    await onSave({ ...quickFilter, name });
    createToast({
      type: 'success',
      message: `Quick filter ${values?.name} updated`,
    });
    onClose();
  };

  return (
    <Modal width={640} title="Edit quick filter name" open onClose={onClose}>
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

          <Button onClick={methods.handleSubmit(handleSave)}>
            {isLoading ? <Spinner name="loadingCircle" color="white" /> : 'SAVE'}
          </Button>
        </ModalFooter>
      </FormProvider>
    </Modal>
  );
};
