import styles from '../../styles/fieldsPage.module.css';
import {
  EntityCard,
  EntityCardItem,
} from '../../../../../components/entityList/entityCard/entityCard';
import {
  Dropdown,
  Icon,
  IconButton,
  Item,
  Switch,
  Tag,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import { useEntity } from '../../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { BOBJECT_FIELD, PICKLIST_FIELD_TYPES } from '../../constants/fields.constants';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { useBobjectFieldGroupsCleaning } from '../../../../../hooks/useBobjectFieldGroups';
import { ConfirmDeleteModalLayout } from '../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { useTagsModal } from '../../../../../hooks/useTagsModal';
import { useGroupFields } from '../../hooks/useGroupFields';

export const FieldCard = ({ field, refresh, openEditField }) => {
  const fieldTypes = useEntity('fieldTypes');
  const { groups: bobjectFieldGroups } = useGroupFields();
  const { handleUpdateEntity, handleDeleteEntity } = useEntityActions();
  const isSystemField = !!field?.logicRole;
  const { cleanCachedBobjectGroups } = useBobjectFieldGroupsCleaning();
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const { ref, setVisible, visible } = useVisible(false);
  const { handleOpenTagsModal } = useTagsModal();
  const isReferenceField = fieldTypes?.get(field?.fieldType)?.name === 'Reference';

  // Needed to display picklist values
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const picklistTypes = fieldTypes
    ?.all()
    ?.filter(type => PICKLIST_FIELD_TYPES.includes(type.enumName))
    ?.map(t => t.id);

  const isPicklistType = picklistTypes.includes(field.fieldType);
  const picklistValues = bobjectPicklistFieldValues
    ?.all()
    ?.filter(
      value =>
        value.bobjectField === field?.id ||
        (field.bobjectGlobalPicklist &&
          value.bobjectGlobalPicklist === field?.bobjectGlobalPicklist),
    );

  const picklistFieldId = fieldTypes?.findBy('enumName')('PICKLIST')?.id;
  const isOnlyPicklistType = picklistFieldId && field.fieldType === picklistFieldId;

  const handleUpdateField = (property, value) => {
    handleUpdateEntity({
      id: field?.id,
      entityName: 'bobjectFields',
      label: 'Field',
      body: {
        [property]: value,
      },
      callback: () => {
        refresh();
        forceSelectedEntitiesCacheRefresh(BOBJECT_FIELD);
        cleanCachedBobjectGroups();
      },
    });
  };

  const handleToggleEnabled = enabled => {
    handleUpdateField('enabled', enabled);
  };

  const handleToggleReadOnly = () => {
    handleUpdateField('layoutReadOnly', !field?.layoutReadOnly);
  };

  const handleDeleteField = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: field?.id,
      entityName: 'bobjectFields',
      label: 'Field',
      callback: () => {
        refresh();
        forceSelectedEntitiesCacheRefresh(BOBJECT_FIELD);
        cleanCachedBobjectGroups();
        setConfirmModalOpen(false);
        setIsDeleting(false);
      },
    });
  };

  // Check if value is logic role or value id, if not show raw value
  const logicRoleValue = bobjectPicklistFieldValues?.findByLogicRole(field?.defaultValue)?.value;
  const idValue = bobjectPicklistFieldValues?.get(field?.defaultValue)?.value;
  const defaultValue = field?.defaultValue && (logicRoleValue || idValue || field?.defaultValue);

  return (
    <EntityCard className={styles.row}>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          icon="list"
          assetLabel={'Field'}
          isDeleting={isDeleting}
          handleDelete={handleDeleteField}
          handleClose={() => setConfirmModalOpen(false)}
          variant="gradient"
        >
          <Text size="m">
            You are going to delete permantently the Field &quot;{field?.name}&quot;
          </Text>
          <Text size="m">Are you sure you want to continue?</Text>
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem size="small">
        <Icon size={20} name={field?.layoutIcon} color="softPeanut" />
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title={field?.name} position="top">
          <Text size="s" ellipsis={30}>
            {field?.name}
          </Text>
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem>{fieldTypes?.findBy('id')(field?.fieldType)?.name}</EntityCardItem>
      <EntityCardItem>
        {bobjectFieldGroups?.find(group => group?.id === field?.bobjectFieldGroup)?.name}
      </EntityCardItem>
      <EntityCardItem>
        {field?.required && (
          <Tooltip title="Required: Yes" position="top">
            <Tag>Yes</Tag>
          </Tooltip>
        )}
      </EntityCardItem>
      <EntityCardItem>{field?.duplicateValidation && <Tag>Yes</Tag>}</EntityCardItem>
      <EntityCardItem>{field?.description}</EntityCardItem>
      <EntityCardItem>{defaultValue}</EntityCardItem>
      <EntityCardItem>{field?.ordering}</EntityCardItem>
      <EntityCardItem>
        {isPicklistType &&
          picklistValues?.slice(0, 2)?.map(value => <Tag key={value?.value}>{value?.value}</Tag>)}
        {isPicklistType && picklistValues?.length > 2 && (
          <span
            className={styles._number__tags}
            onClick={() =>
              handleOpenTagsModal(
                picklistValues?.map(value => ({
                  label: value?.value,
                })),
                true,
              )
            }
          >
            + {picklistValues?.length - 2}
          </span>
        )}
      </EntityCardItem>
      <EntityCardItem size="small">
        <span className={styles._status__span}>
          <Tooltip
            title={isSystemField && "You can't disable a system field, try to hide it instead!"}
            position={isSystemField && 'top'}
          >
            <Switch
              checked={field?.enabled}
              onChange={handleToggleEnabled}
              disabled={isSystemField}
            />
          </Tooltip>
          <Tooltip
            title={
              isReferenceField
                ? 'As this is a reference field it cannot be shown on forms'
                : 'Visible in forms?'
            }
            position="top"
          >
            <IconButton
              disabled={isReferenceField}
              name={field?.layoutReadOnly ? 'eyeOff' : 'eye'}
              onClick={handleToggleReadOnly}
            />
          </Tooltip>
          {isOnlyPicklistType ? (
            <Dropdown
              ref={ref}
              visible={visible}
              width="100%"
              anchor={
                <IconButton
                  name="edit"
                  color="bloobirds"
                  size={24}
                  onClick={() => setVisible(!visible)}
                />
              }
            >
              <Item
                onClick={() => {
                  openEditField(field, false);
                  setVisible(false);
                }}
              >
                <Icon name="edit" size={16} color="bloobirds" className={styles._dropdown__icon} />{' '}
                <Text size="s" inline>
                  Edit field
                </Text>
              </Item>
              <Item
                onClick={() => {
                  openEditField(field, true);
                  setVisible(false);
                }}
              >
                <Icon name="list" size={16} color="bloobirds" className={styles._dropdown__icon} />{' '}
                <Text size="s" inline>
                  Edit picklist values
                </Text>
              </Item>
            </Dropdown>
          ) : (
            <IconButton
              name="edit"
              color="bloobirds"
              size={24}
              onClick={() => openEditField(field)}
            />
          )}
          <Tooltip
            title={isSystemField && "You can't delete a system field, try to hide it instead!"}
            position={isSystemField && 'top'}
          >
            <IconButton
              name="trashFull"
              color="bloobirds"
              size={24}
              disabled={isSystemField || field?.cadenceUsages > 0}
              onClick={() => setConfirmModalOpen(true)}
            />
          </Tooltip>
        </span>
      </EntityCardItem>
    </EntityCard>
  );
};
