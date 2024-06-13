import React, { FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Action,
  Button,
  Icon,
  IconButton,
  Item,
  Modal,
  ModalCloseIcon,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  SortableList,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { relatedPickableIcons } from '@bloobirds-it/utils';
import spacetime from 'spacetime';

import EmptyFieldsList from './emptyFieldsList';
import { RelatedField, RelatedObjectsTableProps } from './hooks/useCreateRelatedObject';
import { ConfirmDeleteModal } from './relatedConfirmCloseModal';
import styles from './relatedObjects.module.css';

export const RelatedObjectValuesModal = ({
  data,
  onClose,
  updateData,
}: {
  data: RelatedObjectsTableProps;
  onClose: () => void;
  updateData: (data: RelatedObjectsTableProps) => void;
}) => {
  const { icon, title, selectedFields, availableFields } = data;

  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects.fieldsModal',
  });
  const [openConfirmCloseModal, setOpenConfirmCloseModal] = useState(false);
  const [fieldsSelected, setFieldsSelected] = useState(selectedFields);

  // Delete the fields that are already selected
  const selectableFields =
    availableFields?.filter(field => !fieldsSelected?.find(f => f.apiName === field.apiName)) || [];
  const [fieldsAvailable, setFieldsAvailable] = useState(selectableFields);

  const isDirty = fieldsSelected.length !== selectedFields.length;

  const addFieldToSelected = (value: string) => {
    const field = fieldsAvailable.find(f => f?.apiName === value);
    setFieldsSelected([...fieldsSelected, { ...field, order: fieldsSelected.length }]);

    const newFields = fieldsAvailable.filter(f => f?.apiName !== value);
    setFieldsAvailable(newFields);
  };

  const handleRemove = (value: string) => {
    const field = fieldsSelected.find(f => f?.apiName === value);
    setFieldsAvailable([...fieldsAvailable, field]);

    const newFields = fieldsSelected.filter(f => f?.apiName !== value);
    // when remove a field, we need to update the order of the rest
    newFields.forEach((field, index) => {
      field.order = index;
    });
    setFieldsSelected(newFields);
  };

  const handleReorder = (data: RelatedField[]) => {
    data.forEach((field, index) => {
      field.order = index;
    });
    setFieldsSelected(data);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    updateData({ ...data, selectedFields: fieldsSelected });
    onClose();
  };

  const handleClose = () => {
    if (isDirty) {
      setOpenConfirmCloseModal(true);
    } else {
      onClose();
    }
  };

  const showInPreview = fieldsSelected?.slice(0, 10);
  const titleName = availableFields?.find(f => f.apiName === title)?.label;

  return (
    <>
      <Modal open onClose={handleClose} width={800}>
        <ModalHeader variant="primary">
          <ModalTitle variant="primary">
            <div className={styles._title__container}>
              <Icon name="hamburgerList" color="peanut" className={styles._icon} />
              <Text size="xl" inline color="peanut">
                {t('title')}
              </Text>
            </div>
          </ModalTitle>
          <ModalCloseIcon variant="primary" color="peanut" onClick={handleClose} />
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <div className={styles._modal__content}>
            <div className={styles._modal__section}>
              <Text size="m" color="softPeanut" uppercase>
                {t('fieldsToDisplay')}
              </Text>
              <div className={styles._search_wrapper}>
                <Select
                  placeholder={t('selectPlaceholder')}
                  width="100%"
                  autocomplete
                  onChange={value => addFieldToSelected(value)}
                  value=""
                >
                  {fieldsAvailable?.map(field => (
                    <Item key={field?.apiName} label={field?.label} value={field?.apiName}>
                      {field?.label}
                    </Item>
                  ))}
                </Select>
                <div className={styles.searchInfo}>
                  <Text size="xs" color="softPeanut">
                    {t('selectHelper')}
                  </Text>
                </div>
              </div>
              {fieldsSelected?.length > 0 ? (
                <SortableList
                  data={fieldsSelected}
                  onReorder={handleReorder}
                  className={styles._item_list}
                  keyExtractor={field => field.apiName}
                  renderItem={({ item: field, innerRef, handleProps, containerProps }) => (
                    <div ref={innerRef} {...containerProps} className={styles._item_card}>
                      <div className={styles._item_handler} {...handleProps}>
                        <Icon name="dragAndDrop" size={16} color="softPeanut" />
                      </div>
                      <div className={styles._item_wrapper}>
                        <Text size="s" color="peanut">
                          {field?.label}
                        </Text>
                      </div>
                      <IconButton
                        name="cross"
                        color="softPeanut"
                        size={20}
                        onClick={() => handleRemove(field?.apiName)}
                      />
                    </div>
                  )}
                />
              ) : (
                <EmptyFieldsList />
              )}
            </div>

            <div className={styles._modal__section}>
              <Text size="m" color="softPeanut" uppercase>
                {t('preview')}
              </Text>
              <div className={styles.previewCard}>
                <div className={styles.previewTitle}>
                  <Action
                    icon={icon ?? 'salesforce'}
                    color={relatedPickableIcons.find(p => p.name === (icon ?? 'salesforce'))?.color}
                    size="s"
                  />
                  <Text size="s" color="peanut" weight="bold">
                    {titleName}
                  </Text>
                  <div className={styles.rightSide}>
                    <Button variant="secondary" size="small">
                      <Icon name="salesforceOutlined" size={16} color="bloobirds" />
                    </Button>
                    <Text size="xs" color="peanut">
                      {spacetime.now().format('{day-pad} {month-short}')}
                    </Text>
                  </div>
                </div>
                {showInPreview?.length > 0 && (
                  <div className={styles.previewBody}>
                    {showInPreview.map(field => (
                      <div key={field.apiName} className={styles.previewField}>
                        <Text size="xs" color="peanut">
                          {field?.label}
                        </Text>
                        <Text size="xs">-</Text>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Text size="xs" color="softPeanut" className={styles.previewHelper}>
                <Icon name="infoFilled" color={'softPeanut'} size={16} />
                {t('previewHelper')}
              </Text>
            </div>
          </div>
          <ModalFooter>
            <Button onClick={handleClose} variant="clear">
              {t('cancel')}
            </Button>
            <Button variant={'primary'} type="submit">
              {t('save')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
      {openConfirmCloseModal && (
        <ConfirmDeleteModal setOpen={setOpenConfirmCloseModal} onClose={onClose} />
      )}
    </>
  );
};
