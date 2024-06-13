import React from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import {
  Button,
  Input,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  useToasts,
  Text,
} from '@bloobirds-it/flamingo-ui';
// @ts-ignore
import { capitalize } from 'lodash/string';
import { atom, useRecoilState } from 'recoil';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
import { forceCacheRefresh } from '../../../../hooks/entities/useEntity.utils';
import useModalVisibility from '../../../../hooks/useModalVisibility';
import { api } from '../../../../utils/api';
import styles from './addCategoryModal.module.css';

const categoryModalState = atom({
  key: 'addCategoryModalState',
  default: {
    mode: 'create',
    category: null,
  },
});

export const useCategoryModal = () => {
  const [modalState, setModalState] = useRecoilState(categoryModalState);
  const { closeModal, isOpen, openModal } = useModalVisibility('addProductsCategory');
  const { id, name } = useEntity('bobjectFields').findByLogicRole('PRODUCT__CATEGORY');
  const { createToast } = useToasts();
  const settings = useUserSettings();

  const updateCategories = (data: { categoryName: any; }, categories: (Partial<{
    id:string;
    score: number;
    ordering: number;
    value: any;
    enabled: boolean;
    account: string
  }>)[]) => {
    const categoryToPush =
      modalState.mode === 'create'
        ? {
            value: data.categoryName,
            enabled: true,
            ordering: 1,
            score: 1,
            account: `/accounts/${settings.account.id}`,
          }
        : {
            ...modalState.category,
            value: data.categoryName,
          };

    let categoriesToUpdate;
    // Remove the category form the list if mode is delete
    if (modalState.mode === 'delete') {
      categoriesToUpdate = categories.filter(category => category.id !== modalState.category.id);
    } else {
      categoriesToUpdate = [...categories, categoryToPush];
    }

    const valuesToSave = {
      name,
      values: categoriesToUpdate,
    };

    api
      .put(`/utils/picklists/bobjectField/${id}`, valuesToSave)
      .then(() => {
        createToast({ message: `Category ${modalState.mode}d successfully!`, type: 'success' });
        forceCacheRefresh();
      })
      .catch(() => {
        createToast({
          message: 'There was an error with the category, please try again later.',
          type: 'error',
        });
      });
  };

  return {
    closeModal: () => {
      setModalState({
        mode: 'create',
        category: null,
      });
      closeModal();
    },
    isOpen,
    openCreationModal: openModal,
    openEditionModal: (category: any) => {
      setModalState({
        mode: 'edit',
        category,
      });
      openModal();
    },
    openDeleteModal: (category: any) => {
      setModalState({
        mode: 'delete',
        category,
      });
      openModal();
    },
    category: modalState.category,
    mode: modalState.mode,
    updateCategories,
  };
};

const AddCategoryModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { category, mode, updateCategories } = useCategoryModal();
  const methods = useForm({
    defaultValues: {
      categoryName: category?.value || '',
    },
  });
  const { formState } = methods;
  const { isSubmitting } = formState;
  const { id } = useEntity('bobjectFields').findByLogicRole('PRODUCT__CATEGORY');
  const categories = useEntity('bobjectPicklistFieldValues')?.filterBy('bobjectField')(id);
  const categoryName = methods.watch('categoryName');

  const handleCreateCategory = (data: any) => {
    updateCategories(data, categories);
    onClose();
  };

  const width = mode !== 'delete' ? 760 : 640;

  return (
    <Modal open onClose={onClose} width={width}>
      <ModalHeader size="small" color="verySoftPurple">
        <ModalTitle size="small" icon="tag">
          {capitalize(mode)} category
        </ModalTitle>
        <ModalCloseIcon size="small" onClick={onClose} color="peanut" />
      </ModalHeader>
      <ModalContent>
        {mode !== 'delete' ? (
          <ModalSection title="Category information" icon="assignBoard">
            <FormProvider {...methods}>
              <Controller
                name="categoryName"
                rules={{
                  required: 'This field is required',
                }}
                render={({ onChange, value }) => (
                  <Input
                    error={methods.errors.categoryName?.message}
                    value={value}
                    onChange={onChange}
                    placeholder="Name *"
                    width="100%"
                  />
                )}
              />
            </FormProvider>
          </ModalSection>
        ) : (
          <div>
            <Text size="m">
              Are you sure you want to delete this category: <strong>{category?.value}</strong>?{' '}
              <br />
              This action cannot be undone
            </Text>
            <Text className={styles.deleteInfo} size="s">
              👉 Products in this category will remain uncategorized.
            </Text>
          </div>
        )}
      </ModalContent>
      <ModalFooter>
        {mode !== 'delete' ? (
          <>
            <Button variant="clear" color="purple" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={
                isSubmitting ||
                !categoryName ||
                (mode === 'edit' && categoryName === category.value)
              }
              color="purple"
              onClick={methods.handleSubmit(handleCreateCategory)}
            >
              Save
            </Button>
          </>
        ) : (
          <>
            <div />
            <div className={styles.deleteButtons}>
              <Button variant="secondary" color="purple" onClick={onClose}>
                Back
              </Button>
              <Button
                disabled={isSubmitting}
                color="tomato"
                onClick={() => {
                  methods.handleSubmit(handleCreateCategory)();
                }}
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </ModalFooter>
    </Modal>
  );
};

export default AddCategoryModal;
