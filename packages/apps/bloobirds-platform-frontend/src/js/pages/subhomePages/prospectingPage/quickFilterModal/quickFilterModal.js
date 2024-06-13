import React, { useMemo, useState } from 'react';
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
import styles from './quickFilterModal.module.css';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useFilterGroups } from '../../../../hooks/useFilterGroups';
import { useEntity } from '../../../../hooks';
import { useQuickFilterModal } from '../../../../hooks/useQuickFilterModal';
import { filtersToRequest, getModalTitle } from './quickFilterModal.utils';
import { ellipsis } from '../../../../utils/strings.utils';
import { clearTypeKeysFromFilters } from '../../../../utils/bobjects.utils';

export const QuickFilterModal = ({ filters: filterToSave, tabName, resetAllFilters }) => {
  const filters = clearTypeKeysFromFilters(filterToSave || {});
  const { quickFilter, closeQuickFiltersModal: handleClose, isEditName } = useQuickFilterModal();
  const { saveFilterGroup, handleRefresh, filterGroups } = useFilterGroups(tabName);
  const { createToast } = useToasts();
  const [isLoading, setIsLoading] = useState();
  const bobjectFields = useEntity('bobjectFields');
  const methods = useForm({ defaultValues: quickFilter });

  const [isEdit, setIsEdit] = useState(!!quickFilter?.id);
  const [isCreation, setIsCreation] = useState(!quickFilter?.id);

  const name = methods.watch('name');

  const handleReset = () => {
    methods.setValue('name', '');
  };

  const handleCloseModal = () => {
    setIsCreation(false);
    handleReset();
    handleRefresh();
    setIsLoading(false);
    handleClose();
  };

  const handleSave = async values => {
    const data = {
      id: isEdit ? quickFilter?.id : null,
      filters: filtersToRequest({ filters, bobjectFields }),
      tabName,
      filterName: values?.name,
      order: isEdit ? undefined : filterGroups.length + 1,
    };
    await saveFilterGroup(data);
    createToast({
      type: 'success',
      message: `Quick filter ${values?.name} ${isEdit ? 'updated' : 'created'}`,
    });
    resetAllFilters();
    handleCloseModal();
  };

  const modalTitle = useMemo(() => getModalTitle({ isEdit, isCreation, isEditName }), [
    isEdit,
    isCreation,
    isEditName,
  ]);

  return (
    <Modal width={600} title={modalTitle} open onClose={handleClose}>
      <FormProvider {...methods}>
        {isEdit && !isCreation && !isEditName && (
          <ModalContent>
            <div className={styles._text_save}>
              <Text size="m">
                Do you want to update the {quickFilter.name} Quick filter? or Create as New Quick
                Filter?
              </Text>
            </div>
          </ModalContent>
        )}
        {(isCreation || isEditName) && (
          <ModalContent>
            <div className={styles._text_save}>
              <Text size="m">
                Select a name that is representative of this quick filter on its own
              </Text>
            </div>
            <div className={styles._name_wrapper}>
              <div className={styles._inputs_groups}>
                <Controller
                  name="name"
                  rules={{
                    required: 'This field is required',
                  }}
                  render={({ onChange, value }) => (
                    <div className={styles._name_group}>
                      <Input
                        error={methods.errors.name?.message}
                        placeholder="Name*"
                        size="medium"
                        width="100%"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  )}
                />
              </div>
              <div className={styles._quick_filter_wrapper}>
                <Chip size="small">{ellipsis(name, 40) || 'Preview'}</Chip>
              </div>
            </div>
          </ModalContent>
        )}
        <ModalFooter>
          <div>
            <Button onClick={handleCloseModal} variant="clear" color="tomato">
              CANCEL
            </Button>
          </div>
          {(isCreation || isEditName) && (
            <Button onClick={methods.handleSubmit(handleSave)}>
              {isLoading ? <Spinner color="white" /> : 'SAVE'}
            </Button>
          )}
          {isEdit && !isCreation && !isEditName && (
            <>
              <Button
                onClick={() => {
                  setIsCreation(true);
                  setIsEdit(false);
                }}
                variant="secondary"
              >
                {isLoading ? <Spinner color="white" /> : 'CREATE NEW QUICK FILTER'}
              </Button>
              <Button onClick={() => setIsCreation(true)}>
                {isLoading ? <Spinner color="white" /> : 'UPDATE'}
              </Button>
            </>
          )}
        </ModalFooter>
      </FormProvider>
    </Modal>
  );
};
