import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Text, Tooltip, Tag } from '@bloobirds-it/flamingo-ui';
import { formatDateAsText } from '@bloobirds-it/utils';

import {
  EntityCard,
  EntityCardItem,
} from '../../../../../components/entityList/entityCard/entityCard';
import { useEntity } from '../../../../../hooks';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../hooks/entities/useEntity.utils';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { useBobjectFieldGroupsCleaning } from '../../../../../hooks/useBobjectFieldGroups';
import { useBobjectTypes } from '../../../../../hooks/useBobjectTypes';
import { useTagsModal } from '../../../../../hooks/useTagsModal';
import { ConfirmDeleteModalLayout } from '../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { switchDateFormat } from '../../../../../misc/utils';
import { BOBJECT_FIELD } from '../../constants/fields.constants';
import {
  MY_PLAYBOOK_GLOBAL_PICKLISTS,
  RESTRICTED_GLOBAL_PICKLISTS,
} from '../../constants/globalPicklists.constants';
import styles from '../../styles/fieldsPage.module.css';

export const GlobalPicklistCard = ({ global, refresh, openEditField }) => {
  const { handleDeleteEntity } = useEntityActions();
  const { cleanCachedBobjectGroups } = useBobjectFieldGroupsCleaning();
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const { handleOpenTagsModal } = useTagsModal();
  const { t } = useTranslation();

  const fieldsUsedIn = bobjectFields
    ?.all()
    ?.filter(field => field?.bobjectGlobalPicklist === global?.id);

  const picklistValues = bobjectPicklistFieldValues
    ?.all()
    ?.filter(value => value?.bobjectGlobalPicklist === global?.id);

  const handleDeleteGlobalPicklists = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: global?.id,
      entityName: 'bobjectGlobalPicklists',
      label: 'Global Picklist',
      callback: () => {
        forceSelectedEntitiesCacheRefresh(BOBJECT_FIELD);
        cleanCachedBobjectGroups();
        setConfirmModalOpen(false);
        refresh();
        setIsDeleting(false);
      },
    });
  };

  return (
    <EntityCard className={styles.row}>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          icon="list"
          assetLabel={'Field'}
          isDeleting={isDeleting}
          handleDelete={handleDeleteGlobalPicklists}
          handleClose={() => setConfirmModalOpen(false)}
          variant="gradient"
        >
          <Text size="m">
            You are going to delete permantently the Field &quot;{global?.name}&quot;
          </Text>
          <Text size="m">Are you sure you want to continue?</Text>
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem />
      <EntityCardItem>
        <Tooltip title={global?.name} position="top">
          <Text size="s" ellipsis={30}>
            {global?.name}
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
                disabled: !field?.enabled,
              })),
              false,
            )
          }
        >
          {fieldsUsedIn.length > 2 && `+${fieldsUsedIn.length - 2}`}
        </span>
      </EntityCardItem>
      <EntityCardItem>
        {picklistValues?.slice(0, 2).map(value => (
          <Tag key={value?.value}>{value?.value}</Tag>
        ))}
        <span
          className={styles._number__tags}
          onClick={() =>
            handleOpenTagsModal(
              picklistValues?.map(value => ({
                label: value?.value,
                disabled: !value?.enabled,
              })),
              true,
            )
          }
        >
          {picklistValues.length > 2 && `+${picklistValues.length - 2}`}
        </span>
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title={switchDateFormat(global?.creationDatetime)} position="top">
          {formatDateAsText({ text: global?.creationDatetime, t })}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title={switchDateFormat(global?.updateDatetime)} position="top">
          {formatDateAsText({ text: global?.updateDatetime, t })}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem size="small">
        <span className={styles._status__span}>
          <Tooltip
            title={
              MY_PLAYBOOK_GLOBAL_PICKLISTS.includes(global?.logicRole) &&
              "You can't edit this global picklist, you should do it in My Playbook section"
            }
            position="top"
          >
            <IconButton
              name="edit"
              color="bloobirds"
              disabled={RESTRICTED_GLOBAL_PICKLISTS.includes(global?.logicRole)}
              size={24}
              onClick={() => openEditField(global)}
            />
          </Tooltip>
          <Tooltip
            title={global?.logicRole ? 'You cannot delete a system Global Picklist' : 'Delete'}
            position="top"
          >
            <IconButton
              disabled={global?.logicRole}
              name="trashFull"
              color="bloobirds"
              size={24}
              onClick={() => setConfirmModalOpen(true)}
            />
          </Tooltip>
        </span>
      </EntityCardItem>
    </EntityCard>
  );
};
