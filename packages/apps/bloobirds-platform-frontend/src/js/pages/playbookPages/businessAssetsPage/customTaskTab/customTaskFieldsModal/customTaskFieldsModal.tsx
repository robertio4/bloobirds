import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Dropdown,
  Icon,
  IconButton,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  SearchInput,
  SortableList,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import { DataModelResponse, CustomTaskField } from '@bloobirds-it/types';
import { bottom } from '@popperjs/core';
import classNames from 'clsx';

import { useEntity } from '../../../../../hooks';
import { RawEntity } from '../../../../../hooks/entities/useEntityTypes';
import styles from '../../businessAssetsPage.module.css';

export interface CustomTaskFieldsModalProps {
  onClose: () => void;
  customTaskFields: CustomTaskField[];
  onSave: (fields: CustomTaskField[]) => void;
}

interface CustomTaskFieldCardProps {
  field: CustomTaskField;
  dataModel: DataModelResponse;
  onRequired: (value: boolean) => void;
  onRemove: () => void;
}
const CustomTaskFieldCard = ({
  field,
  dataModel,
  onRequired,
  onRemove,
}: CustomTaskFieldCardProps) => {
  const [required, setRequired] = useState<boolean>(field.required);
  const bobjectField = dataModel?.findFieldById(field.bobjectFieldId);
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.customTasks' });

  const handleChangeRequired = () => {
    const current = required;
    onRequired(!current);
    setRequired(!current);
  };
  return (
    <div className={styles.taskFieldCard_content}>
      <div className={styles.taskFieldCard_contentLeft}>
        <Icon
          name="dragAndDrop"
          size={22}
          color="lightBloobirds"
          className={styles.taskFieldCard_dragIcon}
        />
        <Text>{bobjectField?.name}</Text>
      </div>
      <div className={styles.taskFieldCard_contentRight}>
        <Tooltip title={required ? t('unmarkRequired') : t('markRequired')} position="top">
          <IconButton
            name={required ? 'required' : 'noRequired'}
            size={16}
            className={required ? undefined : styles.taskFieldCard_noRequired}
            onClick={handleChangeRequired}
          />
        </Tooltip>

        <IconButton name="cross" size={16} color="softPeanut" onClick={onRemove} />
      </div>
    </div>
  );
};

export const CustomTaskFieldsModal = ({
  onClose,
  customTaskFields,
  onSave,
}: CustomTaskFieldsModalProps) => {
  const [fields, setFields] = useState<CustomTaskField[]>(
    customTaskFields?.sort((a, b) => b.ordering - a.ordering),
  );

  const { ref, visible, setVisible } = useVisible(false);

  const [searchFields, setSearchFields] = useState<RawEntity[]>([]);

  const bobjectFields = useEntity('bobjectFields');
  const activityType = useEntity('bobjectTypes')?.findBy('name')('Activity');
  const forbiddenTypes = useEntity('fieldTypes')
    ?.all()
    .filter(t => ['REFERENCE', 'REFERENCE_ENTITY', 'REFERENCE_LIST'].includes(t.enumName))
    .map(t => t.id);
  const [fieldSearch, setFieldSearch] = useState<string>();

  useEffect(() => {
    if (!fieldSearch) {
      setSearchFields([]);
    } else {
      setSearchFields(
        bobjectFields
          .filterBy('bobjectType', activityType.id)
          .filter(
            bobjectField =>
              bobjectField.name.toLowerCase().includes(fieldSearch.toLowerCase()) &&
              !fields?.find(field => field.bobjectFieldId === bobjectField.id) &&
              !forbiddenTypes.includes(bobjectField.fieldType) &&
              bobjectField?.enabled,
          ),
      );
    }
  }, [fieldSearch]);

  useEffect(() => {
    setVisible(searchFields.length > 0);
  }, [searchFields]);

  const handleSelectFieldOption = (bobjectFieldId: string) => {
    setFields([{ bobjectFieldId, required: false, ordering: 0 }, ...fields]);
    setFieldSearch('');
  };

  const handleSave = () => {
    onSave(fields);
    onClose();
  };
  const dataModel = useDataModel();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.customTasks' });

  return (
    <Modal open onClose={onClose} variant="primary" width={342}>
      <ModalHeader size="small" color="veryLightBloobirds">
        <ModalTitle>
          <div className={styles._title__container}>
            <Icon size={24} color="peanut" name="taskAction" className={styles._icon} />
            <Text size="m" color="peanut">
              {t('addFields')}
            </Text>
          </div>
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} size="small" color="bloobirds" />
      </ModalHeader>
      <ModalContent className={styles.taskFieldsModal_content}>
        <Text weight="bold" size="m">
          {t('fieldsToDisplay')}
        </Text>
        <Text size="xs" color="softPeanut">
          {t('fieldsToDisplayExplanation')}
        </Text>
        <Text size="xs" color="softPeanut">
          {t('fieldsToDisplayRequired')}
        </Text>
        <div className={styles.taskFieldsSelect_container}>
          <Dropdown
            ref={ref}
            width="100%"
            visible={visible}
            position={bottom}
            arrow={false}
            anchor={
              <SearchInput
                height="24px"
                width="294px"
                size="small"
                value={fieldSearch}
                onChange={value => setFieldSearch(value)}
                placeholder={t('selectFieldsHere')}
              />
            }
          >
            <div
              className={styles.taskFieldModal_optionsWrapper}
              style={{
                width: 294,
              }}
            >
              {searchFields &&
                searchFields.map(field => (
                  <Item key={field.id} onClick={() => handleSelectFieldOption(field.id)}>
                    {field.name}
                  </Item>
                ))}
            </div>
          </Dropdown>
        </div>
        {fields?.length > 0 && (
          <SortableList
            data={fields}
            onReorder={data => setFields([...data])}
            renderItem={({ item, innerRef, containerProps, handleProps, isDragging }) => (
              <div
                className={classNames(
                  styles.taskFieldCard,
                  isDragging && styles.taskFieldCard_dragging,
                )}
                ref={innerRef}
                {...containerProps}
                {...handleProps}
              >
                <CustomTaskFieldCard
                  field={item}
                  dataModel={dataModel}
                  onRequired={value =>
                    setFields([
                      ...fields.map(f => ({
                        ...f,
                        required: f.bobjectFieldId === item.bobjectFieldId ? value : f.required,
                      })),
                    ])
                  }
                  onRemove={() =>
                    setFields([...fields.filter(f => f.bobjectFieldId !== item.bobjectFieldId)])
                  }
                />
              </div>
            )}
            keyExtractor={field => field.bobjectFieldId}
          ></SortableList>
        )}
        {(!fields || fields?.length === 0) && (
          <div className={styles.taskFieldsSelect_noFields}>
            <Text
              size="m"
              color="peanut"
              weight={'bold'}
              className={styles.taskFieldsModal_text_bold}
            >
              {t('noFieldsSelected')}
            </Text>
            <Text
              size="xs"
              color="softPeanut"
              align="center"
              className={styles.taskFieldsModal_text}
            >
              {t('clickOnSearchBar')}
            </Text>
            <Text
              size="xs"
              color="softPeanut"
              align="center"
              className={styles.taskFieldsModal_text}
            >
              {t('fieldsRearrangementExplanation')}
            </Text>
          </div>
        )}
      </ModalContent>
      <ModalFooter>
        <Button uppercase={false} color="tomato" variant="clear" size="small" onClick={onClose}>
          Cancel
        </Button>
        <Button uppercase={false} size="small" onClick={handleSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};
