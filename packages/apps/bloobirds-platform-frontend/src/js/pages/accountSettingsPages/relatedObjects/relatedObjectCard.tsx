import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  IconButton,
  Item,
  Select,
  Switch,
  Text,
  Tooltip,
  MultiSelect,
  CheckItem,
} from '@bloobirds-it/flamingo-ui';
import { relatedPickableIcons } from '@bloobirds-it/utils';

import { EntityCard, EntityCardItem } from '../../../components/entityList/entityCard/entityCard';
import { IconPicker } from '../../../components/iconPicker/iconPicker';
import { RelatedObjectsTableProps, useCreateRelatedObjects } from './hooks/useCreateRelatedObject';
import { RelatedObjectValuesModal } from './relatedObjectValuesModal';
import styles from './relatedObjects.module.css';
import { RelatedBobjectSkeleton } from './relatedObjectsTable';

export const RelatedObjectCard = ({ data: relatedObject }: { data: RelatedObjectsTableProps }) => {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    ...relatedObject,
    objectTypeFieldRelated:
      relatedObject?.objectTypeFieldRelated ??
      (relatedObject?.availableObjectTypeFieldRelated?.length === 1
        ? [relatedObject?.availableObjectTypeFieldRelated[0]]
        : []),
    availableObjectTypeFieldRelated: [
      ...(relatedObject?.availableObjectTypeFieldRelated ?? []),
      ...(relatedObject?.objectTypeFieldRelated ?? []),
    ],
    availableFields: relatedObject?.availableFields ?? [],
    selectedFields: relatedObject?.selectedFields ?? [],
    display: relatedObject.display ?? false,
    icon: relatedObject.icon ?? 'salesforce',
  });
  const [openSelectFieldsModal, setOpenSelectFieldsModal] = useState(false);
  const { handleUpdate } = useCreateRelatedObjects();
  const { t } = useTranslation('translation', {
    keyPrefix: 'accountSettings.relatedObjects',
  });

  const {
    icon,
    objectApiName,
    title,
    availableFields,
    selectedFields,
    display,
    objectTypeFieldRelated,
    availableObjectTypeFieldRelated,
  } = data;

  const updateData = async (newData: RelatedObjectsTableProps) => {
    setLoading(true);
    const { errors, data } = await handleUpdate(newData);
    setData(data);
    setErrors(errors);
    setLoading(false);
  };

  const tooltipValuesText =
    !selectedFields || selectedFields?.length === 0
      ? title
        ? t('tooltipAddValues')
        : t('tooltipRequiredFields')
      : title
      ? t('tooltipEditValues')
      : t('tooltipRequiredFields');

  const isEditable = title && objectTypeFieldRelated?.length > 0;
  const tooltipText = !isEditable ? t('tooltipRequiredFields') : null;

  if (loading) {
    return <RelatedBobjectSkeleton id={1} />;
  }

  return (
    <>
      <EntityCard
        key={`field-${data?.id ?? data?.objectApiName?.apiName}`}
        className={styles.cardRow}
      >
        <EntityCardItem size="small" align="center" className={styles.cardItem}>
          <Tooltip title={tooltipText} position="top">
            <IconPicker
              disabled={!isEditable}
              selectedIcon={{
                name: icon || 'salesforce',
                color: relatedPickableIcons.find(p => p.name === icon ?? 'salesforce')?.color,
              }}
              onSelectIcon={pick => {
                updateData({
                  ...data,
                  icon: pick.name,
                });
              }}
              hasError={false /* error.icon */}
              pickableIcons={relatedPickableIcons}
              borderless
            />
          </Tooltip>
        </EntityCardItem>
        <EntityCardItem size="small">
          <Tooltip title={objectApiName?.label} position="top">
            <Text size="s" ellipsis={20}>
              {objectApiName?.label}
            </Text>
          </Tooltip>
        </EntityCardItem>
        <EntityCardItem error={errors?.errorTitleField && t('fieldRequired')}>
          <Select
            variant="form"
            size="small"
            width="250px"
            placeholder={t('titleSelectPlaceholder')}
            value={title}
            onChange={value => {
              updateData({
                ...data,
                title: value,
              });
            }}
          >
            {availableFields.map(field => (
              <Item key={field.apiName} value={field.apiName}>
                {field.label}
              </Item>
            ))}
          </Select>
        </EntityCardItem>
        <EntityCardItem error={errors?.errorObjectTypeFieldRelated && t('fieldRequired')}>
          <MultiSelect
            variant="form"
            size="small"
            width="250px"
            placeholder={t('relathionshipsTitlePlaceholder')}
            value={objectTypeFieldRelated}
            onChange={value => {
              updateData({
                ...data,
                objectTypeFieldRelated: value,
              });
            }}
          >
            {availableObjectTypeFieldRelated?.map(field => (
              <CheckItem key={field} value={field}>
                {field}
              </CheckItem>
            ))}
          </MultiSelect>
        </EntityCardItem>
        <EntityCardItem>
          {!selectedFields || selectedFields?.length === 0 ? (
            <Tooltip title={tooltipValuesText} position="top">
              <Button
                size="small"
                variant="secondary"
                iconLeft={selectedFields?.length > 0 ? 'edit' : 'add'}
                uppercase={false}
                onClick={() => setOpenSelectFieldsModal(true)}
                disabled={!isEditable}
              >
                {selectedFields?.length > 0 ? '' : t('addFields')}
              </Button>
            </Tooltip>
          ) : (
            <Text size="s">{selectedFields?.map(field => field.label).join(', ')}</Text>
          )}
        </EntityCardItem>
        <EntityCardItem size="small" align="center">
          <span className={styles.display}>
            <Tooltip title={tooltipValuesText} position="top">
              <IconButton
                name={!selectedFields || selectedFields?.length === 0 ? 'add' : 'edit'}
                color="bloobirds"
                size={24}
                disabled={!isEditable}
                onClick={() => setOpenSelectFieldsModal(true)}
              />
            </Tooltip>
            <Tooltip title={tooltipText} position="top">
              <Switch
                disabled={!isEditable}
                checked={display}
                onChange={() => {
                  updateData({
                    ...data,
                    display: !display,
                  });
                }}
              />
            </Tooltip>
          </span>
        </EntityCardItem>
      </EntityCard>
      {openSelectFieldsModal && (
        <RelatedObjectValuesModal
          data={data}
          onClose={() => {
            setOpenSelectFieldsModal(null);
          }}
          updateData={updateData}
        />
      )}
    </>
  );
};
