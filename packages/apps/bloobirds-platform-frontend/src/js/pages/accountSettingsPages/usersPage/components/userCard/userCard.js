import React, { useState } from 'react';
import {
  EntityCard,
  EntityCardItem,
} from '../../../../../components/entityList/entityCard/entityCard';
import {
  CircularBadge,
  Switch,
  Tag,
  Text,
  Button,
  IconButton,
  useToasts,
  Icon,
  Tooltip,
  Callout,
} from '@bloobirds-it/flamingo-ui';
import styles from '../../styles/usersPage.module.css';
import { USER_PERMISSIONS } from '../../constants/users.constants';
import { mutate } from 'swr';
import { useEntityActions } from '../../../../../hooks/entities/useEntityActions';
import { WebApi } from '../../../../../misc/api/web';
import { useCreateEditUserModal } from '../../hooks/useCreateEditUserModal';
import { ConfirmDeleteModalLayout } from '../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import {useTranslation} from "react-i18next";

export const UserCard = ({ user }) => {
  const [viewAllTags, setViewAllTags] = useState();
  const { handleUpdateEntity, handleDeleteEntity } = useEntityActions();
  const editAllPermission = user?.permissions?.filter(
    perm => perm?.enumName === USER_PERMISSIONS.EDIT_ALL,
  );
  const permissionsWithoutEditAll = user?.permissions?.filter(
    perm => perm?.enumName !== USER_PERMISSIONS.EDIT_ALL,
  );
  const [temporarySwitch, setTemporarySwitch] = useState(user?.active);
  const { createToast } = useToasts();
  const { handleOpenCreateEditUserModal } = useCreateEditUserModal();
  const isAccountAdmin = user?.roles?.some(role => role.name === 'Account Admin');
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const { t } = useTranslation();

  const handleToggleEnabled = active => {
    setTemporarySwitch(!temporarySwitch);
    handleUpdateEntity({
      id: user?.id,
      entityName: 'users',
      label: 'Users',
      body: { active },
      callback: () => {
        mutate('/users');
      },
    });
  };

  const handleResendInvitation = () => {
    WebApi.search({
      path: `service/users/${user.id}/sendInvitation`,
    })
      .then(() => {
        createToast({
          message: t('accountSettings.salesTeam.resendInvitationSuccess'),
          type: 'success',
        });
        mutate('/users');
      })
      .catch(() => {
        createToast({
          message: t('accountSettings.salesTeam.resendInvitationError'),
          type: 'error',
        });
        mutate('/users');
      });
  };

  const handleDeleteUser = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: user.id,
      entityName: 'users',
      label: 'User',
      callback: () => {
        setIsDeleting(false);
        createToast({
          message: t('accountSettings.salesTeam.userDeletedSuccess'),
          type: 'success',
        });
        mutate('/users');
      },
    });
  };

  return (
    <EntityCard>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          icon="person"
          assetLabel={'User'}
          isDeleting={isDeleting}
          handleDelete={handleDeleteUser}
          handleClose={() => setConfirmModalOpen(false)}
        >
          <Text size="m">
            {t('accountSettings.salesTeam.userDeleteWarning', { userName: user?.name })}
          </Text>
          <Text size="m" className={styles._delete__text}>
            {t('accountSettings.salesTeam.userDeleteConfirm')}
          </Text>
          <div className={styles._callout}>
            <Callout variant="alert" icon="alertTriangle">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              {t('accountSettings.salesTeam.userDeleteCallout')}
            </Callout>
          </div>
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem size="small">
        <CircularBadge size="medium" backgroundColor={user?.color} color="gray">
          {user?.shortname || 'U'}
        </CircularBadge>
      </EntityCardItem>
      <EntityCardItem>
        <Text size="s" inline>
          {user?.name}
        </Text>
        <Tooltip title={t('accountSettings.salesTeam.accountAdmin')} position="top">
          {isAccountAdmin && <Icon name="starChecked" color="softBanana" size={16} />}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem>{user?.employeeRole}</EntityCardItem>
      <EntityCardItem>{user?.email}</EntityCardItem>
      <EntityCardItem>
        {permissionsWithoutEditAll?.length > 0 && (
          <>
            {viewAllTags ? (
              <>
                {permissionsWithoutEditAll?.map(permission => (
                  <span className={styles._tag__element} key={permission?.name}>
                    <Tag>{permission?.name}</Tag>
                  </span>
                ))}
              </>
            ) : (
              <>
                <span className={styles._tag__element}>
                  <Tag>{permissionsWithoutEditAll[0]?.name}</Tag>
                </span>
                {permissionsWithoutEditAll?.length > 1 && (
                  <span onClick={() => setViewAllTags(true)}>
                    <Text className={styles._view_more__text} inline size="s">
                      +{permissionsWithoutEditAll?.length - 1}
                    </Text>
                  </span>
                )}
              </>
            )}
          </>
        )}
      </EntityCardItem>
      <EntityCardItem>
        {editAllPermission.length > 0
          ? editAllPermission?.map(perm => <Tag key={perm?.name}>{perm?.name}</Tag>)
          : null}
      </EntityCardItem>
      <EntityCardItem size="small" flexEnd>
        <div className={styles._actions__container}>
          {user.invitationStatus !== 'COMPLETED' && (
            <>
              {user.invitationExpired ? (
                <Button size="small" color="lightPeanut" disabled>
                  <Text color="softPeanut" size="s">
                    {t('accountSettings.salesTeam.expired')}
                  </Text>
                </Button>
              ) : (
                <Button color="softTangerine" size="small" disabled>
                  <Text color="white" size="s">
                    {t('accountSettings.salesTeam.pending')}
                  </Text>
                </Button>
              )}
            </>
          )}
          {user.invitationStatus !== 'COMPLETED' && (
            <Button size="small" onClick={handleResendInvitation} variant="secondary">
              <Icon name="send" size={16} />
              {t('accountSettings.salesTeam.resend')}
            </Button>
          )}
          {user.invitationStatus === 'COMPLETED' && (
            <Switch checked={temporarySwitch} onChange={handleToggleEnabled} />
          )}
          <IconButton
            name="edit"
            size={24}
            onClick={() => handleOpenCreateEditUserModal({ user })}
          />
          <Tooltip title={t('accountSettings.salesTeam.deleteButtonTooltip')} position="top">
            <IconButton name="trashFull" onClick={() => setConfirmModalOpen(true)} />
          </Tooltip>
        </div>
      </EntityCardItem>
    </EntityCard>
  );
};
