import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Text, Tooltip, Tag, Icon } from '@bloobirds-it/flamingo-ui';
import { formatDateAsText } from '@bloobirds-it/utils';

import { EntityCardItem } from '../../../../../components/entityList/entityCard/entityCard';
import { useEntity } from '../../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { useBobjectFieldGroupsCleaning } from '../../../../../hooks/useBobjectFieldGroups';
import { useBobjectTypes } from '../../../../../hooks/useBobjectTypes';
import { useTagsModal } from '../../../../../hooks/useTagsModal';
import { ConfirmDeleteModalLayout } from '../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { switchDateFormat } from '../../../../../misc/utils';
import { BOBJECT_FIELD_GROUPS } from '../../constants/group.constants';
import styles from '../../styles/fieldsPage.module.css';

export const GroupCard = ({ group, refresh, openEditField }) => {
  const { handleDeleteEntity } = useEntityActions();
  const { cleanCachedBobjectGroups } = useBobjectFieldGroupsCleaning();
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const { handleOpenTagsModal } = useTagsModal();
  const { t } = useTranslation();

  const fieldsUsedIn = bobjectFields
    ?.all()
    ?.filter(field => field?.bobjectFieldGroup === group?.id);
  const hasFieldsUsedIn = fieldsUsedIn?.length > 0;

  const handleDeleteGroupPicklists = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: group?.id,
      entityName: 'bobjectFieldGroups',
      label: 'Field gropup',
      callback: () => {
        forceSelectedEntitiesCacheRefresh(BOBJECT_FIELD_GROUPS);
        cleanCachedBobjectGroups();
        setConfirmModalOpen(false);
        refresh();
        setIsDeleting(false);
      },
    });
  };

  return (
    <>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          assetLabel={'Field group'}
          isDeleting={isDeleting}
          handleDelete={handleDeleteGroupPicklists}
          handleClose={() => setConfirmModalOpen(false)}
          variant="gradient"
        >
          <Text size="m">
            You are going to delete permantently the Field &quot;{group?.name}&quot;
          </Text>
          <Text size="m">Are you sure you want to continue?</Text>
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem>
        <Icon name="dragAndDrop" size={24} color="softPeanut" />
      </EntityCardItem>
      <EntityCardItem>
        <Icon name={group?.icon} color="softPeanut" size={16} />
        <Tooltip title={group?.name} position="top">
          <Text size="s" ellipsis={30}>
            {group?.name}
          </Text>
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem>
        {fieldsUsedIn?.slice(0, 2).map((field, index) => (
          <Tag key={`tag-${index}`}>
            {bobjectTypes?.all().find(type => type?.id === field?.bobjectType)?.name}: {field?.name}
          </Tag>
        ))}
        <span
          className={styles._number__tags}
          onClick={() =>
            handleOpenTagsModal(
              fieldsUsedIn?.map(field => ({
                label: `${
                  bobjectTypes?.all().find(type => type?.id === field?.bobjectType)?.name
                }: ${field?.name}`,
              })),
              false,
            )
          }
        >
          {fieldsUsedIn.length > 2 && `+${fieldsUsedIn.length - 2}`}
        </span>
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title={switchDateFormat(group?.creationDatetime)} position="top">
          {formatDateAsText({ text: group?.creationDatetime, t })}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title={switchDateFormat(group?.updateDatetime)} position="top">
          {formatDateAsText({ text: group?.updateDatetime, t })}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem size="small">
        <span className={styles._status__span}>
          <IconButton
            name="edit"
            color="bloobirds"
            size={24}
            onClick={() => openEditField(group)}
          />
          <Tooltip
            title={
              hasFieldsUsedIn
                ? "You can't delete a field group with fields inside. Move the fields and then delete the field"
                : 'Delete'
            }
            position="top"
          >
            <IconButton
              disabled={hasFieldsUsedIn}
              name="trashFull"
              color="bloobirds"
              size={24}
              onClick={() => setConfirmModalOpen(true)}
            />
          </Tooltip>
        </span>
      </EntityCardItem>
    </>
  );
};
