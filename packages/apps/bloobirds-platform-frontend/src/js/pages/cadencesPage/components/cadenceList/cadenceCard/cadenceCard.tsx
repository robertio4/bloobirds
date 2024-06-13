import React, { useEffect, useState } from 'react';

import {
  Button,
  Dropdown,
  Icon,
  IconButton,
  Item,
  Switch,
  Tag,
  Text,
  Tooltip,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import {
  useActiveUserSettings,
  useCadences,
  useCadenceV2Enabled,
  useRouter,
} from '@bloobirds-it/hooks';
import {
  APP_CADENCES_ANALYZE,
  BobjectTypes,
  cadenceEditUrl,
  cadenceEditUrlV2,
} from '@bloobirds-it/types';
import spacetime from 'spacetime';
import { v4 as uuid } from 'uuid';

import { getPluralBobjectName } from '../../../../../../../../../utils/src';
import { EntityCardItem } from '../../../../../components/entityList/entityCard/entityCard';
import { useBobjectTypes } from '../../../../../hooks/useBobjectTypes';
import { useGlobalPicklistValues } from '../../../../../hooks/usePicklistValues';
import { ConfirmDeleteModalLayout } from '../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import SessionManagerFactory from '../../../../../misc/session';
import { api } from '../../../../../utils/api';
import { CadenceTag } from '../../../cadenceEditionPage/cadenceEditionHeader/cadenceTags/cadenceTagsBlock';
import { CADENCE_EDIT_PERMISSIONS } from '../../createEditCadenceSettings/createEditCadenceSettings';
import styles from '../cadenceList.module.css';
import { useManageCadenceList } from '../useManageCadenceList';

export const CadenceCard = ({
  cadence,
  handleRefresh,
  setCadenceToClone,
  openCloneModal,
}: {
  cadence: any;
  handleRefresh: () => void;
  setCadenceToClone: (x: any) => void;
  openCloneModal: () => void;
}) => {
  const bobjectTypes = useBobjectTypes();
  const bobjectType = bobjectTypes?.get(cadence.bobjectType);
  const { delete: deleteCadence, getUsesCadence, markAsDefault } = useManageCadenceList();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEnabled, setIsEnabled] = useState(cadence?.enabled);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [numberOfUses, setNumberOfUses] = useState<number>();
  const { createToast } = useToasts();
  const SessionManager = SessionManagerFactory();
  const isDefaultCadence = cadence.defaultCadence;
  const [infoDefaultCadence, setInfoDefaultCadence] = useState(isDefaultCadence);
  const { history } = useRouter();
  const { ref, visible, setVisible } = useVisible(false);
  const cadenceVisibilityLabel =
    cadence?.editMode === CADENCE_EDIT_PERMISSIONS.EVERYONE ? 'Public' : 'Private';
  const canEditCadence =
    SessionManager.getRoleManager()?.isAccountAdmin() ||
    SessionManager.getUser()?.id === cadence?.owner ||
    cadence?.editMode === CADENCE_EDIT_PERMISSIONS.EVERYONE;
  const cadenceV2Enabled = useCadenceV2Enabled(SessionManager.getAccount()?.id);
  const bobjectTypesInterface = useBobjectTypes();
  const cadenceBobjectType = bobjectTypesInterface?.findBy('id')(cadence?.bobjectType)?.name;
  const users = useGlobalPicklistValues({
    logicRole: 'USER',
  })?.filter(user => user.enabled);
  const cadenceAuthor = users.filter(u => u.id === cadence?.ownerId)[0]?.value;
  const { settings } = useActiveUserSettings();
  const { refreshCadences } = useCadences(
    cadenceBobjectType as BobjectTypes,
    settings?.account?.id,
    undefined,
    undefined,
    undefined,
    true,
  );

  useEffect(() => {
    setInfoDefaultCadence(isDefaultCadence);
  }, [isDefaultCadence]);

  useEffect(() => {
    setIsEnabled(cadence?.enabled);
  }, [cadence]);

  const handleToggleEnabled = async () => {
    await api.put(`/messaging/cadences/${cadence.id}/${isEnabled ? 'disable' : 'enable'}`);
    setIsEnabled(!isEnabled);
  };

  const handleDeleteCadence = () => {
    setIsDeleting(true);
    deleteCadence(cadence.id).then(() => {
      createToast({ message: 'Cadence succesfully deleted!', type: 'success' });
      setIsDeleting(false);
      setConfirmModalOpen(false);
      handleRefresh();
      refreshCadences();
    });
  };

  const markCadenceAsDefault = () => {
    markAsDefault(cadence.id).then(() => {
      handleRefresh();
    });
  };

  const handleDelete = () => {
    setVisible(!visible);
    getUsesCadence(cadence.id, bobjectType?.name).then(r => {
      setNumberOfUses(r);
      setConfirmModalOpen(true);
    });
  };

  return (
    <>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          icon="company"
          assetLabel="Cadence"
          isDeleting={isDeleting}
          handleDelete={handleDeleteCadence}
          handleClose={() => setConfirmModalOpen(false)}
          colorSchema={{
            verySoft: 'veryLightBloobirds',
            light: 'softBloobirds',
          }}
        >
          {numberOfUses === 0 && (
            <div className={styles.confirmation_body}>
              <Text size="s" className={styles.confirmation_info}>
                You are going to delete permanently the Cadence &quot;{cadence?.name}&quot;
              </Text>
              <Text size="s" weight="bold">
                Are you sure you want to continue?
              </Text>
            </div>
          )}
          {numberOfUses > 0 && (
            <div className={styles.confirmation_body}>
              <Text size="s" className={styles.confirmation_info}>
                &quot;{cadence?.name}&quot; cadence is being used in {numberOfUses}{' '}
                {getPluralBobjectName(bobjectType?.name, numberOfUses).toLowerCase()}
              </Text>
              <Text size="s" weight="bold">
                The cadence steps will remain active until the cadence is completed. After that, it
                will be permanently deleted.
              </Text>
            </div>
          )}
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem size="medium">
        <div
          style={{ cursor: 'pointer' }}
          onClick={() =>
            history.push(
              `${APP_CADENCES_ANALYZE}?cadence=${encodeURIComponent(
                cadence.id,
              )}&bobjectType=${encodeURIComponent(bobjectType?.name)}&name=${encodeURIComponent(
                cadence.name,
              )}`,
            )
          }
        >
          <Text size="s" color="bloobirds" weight="bold">
            {cadence?.name}
          </Text>
        </div>
      </EntityCardItem>
      <EntityCardItem>
        <Tooltip title="Default Cadence" position="top">
          {infoDefaultCadence && <Icon name="starChecked" color="softBanana" size={16} />}
        </Tooltip>
      </EntityCardItem>
      <EntityCardItem>{cadenceBobjectType}</EntityCardItem>
      <EntityCardItem>{cadence?.statistics?.totalDays}</EntityCardItem>
      <EntityCardItem>{cadence?.statistics?.totalSteps}</EntityCardItem>
      <EntityCardItem>
        {Math.round(cadence?.statistics?.automatedPercentage * 100 || 0)}%
      </EntityCardItem>
      <EntityCardItem>{cadence?.statistics.optOutCount}</EntityCardItem>
      <EntityCardItem>
        {cadence?.creationDatetime
          ? spacetime(cadence?.creationDatetime).format('nice-short')
          : '-'}
      </EntityCardItem>
      <EntityCardItem>{cadenceAuthor ? cadenceAuthor : '[userName](deleted)'}</EntityCardItem>
      <EntityCardItem>{cadenceVisibilityLabel}</EntityCardItem>
      <EntityCardItem>
        {cadence?.tags?.slice(0, 2)?.map((tag: string, idx: number) => (
          <CadenceTag key={idx} tag={{ id: uuid(), name: tag }} />
        ))}
        {cadence?.tags?.length > 2 && <Tag>+{cadence?.tags?.length - 2}</Tag>}
      </EntityCardItem>
      <EntityCardItem size="small">
        <span className={styles._status__span}>
          <Tooltip
            title={isDefaultCadence ? 'The default cadence can not be disabled' : ''}
            position="top"
          >
            <Switch
              checked={isEnabled}
              disabled={isDefaultCadence}
              color="bloobirds"
              onChange={handleToggleEnabled}
            />
          </Tooltip>
          <Button
            color="bloobirds"
            variant="secondary"
            size="small"
            iconRight={canEditCadence ? 'edit' : 'eye'}
            onClick={() => {
              history.push(
                `${
                  cadenceV2Enabled ? cadenceEditUrlV2(cadence.id) : cadenceEditUrl(cadence.id)
                }&bobjectType=${encodeURIComponent(bobjectType?.name)}&name=${encodeURIComponent(
                  cadence.name,
                )}`,
              );
            }}
            uppercase={false}
            className={styles._edit_view_button}
          >
            {canEditCadence ? 'Edit' : 'View'}
          </Button>
          <Dropdown
            ref={ref}
            visible={visible}
            anchor={
              <IconButton
                name="moreOpenholes"
                color="bloobirds"
                dataTest="moreDropdown"
                onClick={() => setVisible(!visible)}
              />
            }
          >
            {!isDefaultCadence && (
              <Item
                onClick={() => {
                  setVisible(!visible);
                  markCadenceAsDefault();
                }}
                disabled={!canEditCadence}
                dataTest="updateLeadStatusOption"
                icon={isDefaultCadence ? 'starChecked' : 'starUnchecked'}
              >
                Mark as default
              </Item>
            )}
            <Item
              onClick={() => {
                setVisible(!visible);
                setCadenceToClone(cadence);
                openCloneModal();
              }}
              dataTest="logActivityOption"
              icon="copy"
            >
              Clone
            </Item>
            {!isDefaultCadence ? (
              <Item disabled={!canEditCadence} onClick={handleDelete} icon="trashEmpty">
                Delete
              </Item>
            ) : (
              <Tooltip title="Default cadence cannot be deleted" position="top">
                <Item disabled icon="trashEmpty">
                  Delete
                </Item>
              </Tooltip>
            )}
          </Dropdown>
        </span>
      </EntityCardItem>
    </>
  );
};
