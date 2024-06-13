import {
  CircularBadge,
  Icon,
  IconButton,
  Switch,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import React, { useState } from 'react';
import styles from '../../../businessAssetsPage.module.css';
import { useEntityActions } from '../../../../../../hooks/entities/useEntityActions';
import { useOpenScenarioModal } from '../../../../../../hooks/useSteppableModal';
import { mutate } from 'swr';
import { ConfirmDeleteModalLayout } from '../../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { EntityCardItem } from '../../../../../../components/entityList/entityCard/entityCard';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../../hooks/entities/useEntity.utils';
import { REFRESHED_ENTITIES } from '../../../businessAssetsPage.constants';

export const ScenarioCard = ({ sc }) => {
  const { handleUpdateEntity, handleDeleteEntity } = useEntityActions();
  const { handleOpenCreateEditModal } = useOpenScenarioModal();
  const [temporarySwitch, setTemporarySwitch] = useState(sc.enabled);
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const { createToast } = useToasts();

  const handleToggleEnabled = enabled => {
    setTemporarySwitch(!temporarySwitch);
    handleUpdateEntity({
      id: sc.id,
      entityName: 'useCases',
      label: 'Scenario',
      body: { enabled },
      callback: () => {
        mutate('/useCases');
        forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
      },
    });
  };

  const handleDeleteScenario = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: sc?.id,
      entityName: 'useCases',
      label: 'Scenario',
      callback: () => {
        setIsDeleting(false);
        createToast({ message: 'Scenario succesfully deleted!', type: 'success' });
        mutate('/useCases');
        forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
      },
    });
  };

  return (
    <>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          icon="compass"
          assetLabel={'Scenario'}
          isDeleting={isDeleting}
          handleDelete={handleDeleteScenario}
          handleClose={() => setConfirmModalOpen(false)}
          colorSchema={{
            verySoft: 'verySoftPurple',
            light: 'lightPurple',
          }}
        >
          <Text size="m">
            You are going to delete permantently the Scenario &quot;{sc?.name}&quot;
          </Text>
          <Text size="m">Are you sure you want to continue?</Text>
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem size="small">
        <Icon name="dragAndDrop" size={24} color="softPeanut" />
        <CircularBadge size="medium" backgroundColor={sc?.color} color="gray">
          {sc?.shortname || 'SC'}
        </CircularBadge>
      </EntityCardItem>
      <EntityCardItem>{sc?.name}</EntityCardItem>
      <EntityCardItem>{sc?.description?.replace(/(<([^>]+)>)/gi, '')}</EntityCardItem>
      <EntityCardItem size="small">
        <span className={styles._status__span}>
          <Switch
            checked={temporarySwitch}
            color="purple"
            onChange={enabled => handleToggleEnabled(enabled)}
          />
          <IconButton
            name="edit"
            color="purple"
            size={24}
            onClick={() => handleOpenCreateEditModal({ scenario: sc })}
          />
          <IconButton
            name="trashFull"
            color="purple"
            size={24}
            onClick={() => setConfirmModalOpen(true)}
          />
        </span>
      </EntityCardItem>
    </>
  );
};
