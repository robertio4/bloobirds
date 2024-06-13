import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  CircularBadge,
  Icon,
  IconButton,
  Switch,
  Tag,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { mutate } from 'swr';

import { EntityCardItem } from '../../../../../../components/entityList/entityCard/entityCard';
import { forceSelectedEntitiesCacheRefresh } from '../../../../../../hooks/entities/useEntity.utils';
import { useEntityActions } from '../../../../../../hooks/entities/useEntityActions';
import { useOpenTargetMarketModal } from '../../../../../../hooks/useSteppableModal';
import { useTagsModal } from '../../../../../../hooks/useTagsModal';
import { ConfirmDeleteModalLayout } from '../../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { REFRESHED_ENTITIES } from '../../../businessAssetsPage.constants';
import styles from '../../../businessAssetsPage.module.css';

export const TargetMarketCard = ({ tm }) => {
  const { handleUpdateEntity, handleDeleteEntity } = useEntityActions();
  const [temporarySwitch, setTemporarySwitch] = useState(tm.enabled);
  const [viewAllTags, setViewAllTags] = useState();
  const { handleOpenTagsModal } = useTagsModal();
  const { handleOpenCreateEditModal } = useOpenTargetMarketModal();
  const [isDeleting, setIsDeleting] = useState();
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const { createToast } = useToasts();
  const { t } = useTranslation();
  const entityName = t('common.targetMarket');

  const handleToggleEnabled = enabled => {
    setTemporarySwitch(!temporarySwitch);
    handleUpdateEntity({
      id: tm.id,
      entityName: 'targetMarkets',
      label: 'Target Market',
      body: { enabled },
      callback: () => {
        mutate('/targetMarket');
        forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
      },
    });
  };

  const handleDeleteTargetMarket = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: tm?.id,
      entityName: 'targetMarkets',
      label: entityName,
      callback: () => {
        createToast({
          message: `${entityName} ${t('common.succesfullyDeleted')}!`,
          type: 'success',
        });
        setIsDeleting(false);
        mutate('/targetMarket');
        forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
      },
    });
  };

  const firstSegmentationElement = tm?.fieldValueConditions
    ? tm?.fieldValueConditions[0]?.childField
    : null;
  const totalSegmentationElements = tm?.fieldValueConditions
    ? tm?.fieldValueConditions?.length
    : null;

  return (
    <>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          icon="company"
          assetLabel={entityName}
          isDeleting={isDeleting}
          handleDelete={handleDeleteTargetMarket}
          handleClose={() => setConfirmModalOpen(false)}
          colorSchema={{
            verySoft: 'verySoftPurple',
            light: 'lightPurple',
          }}
        >
          <Text size="m">{t('playbook.deleteTargetMarketWarning', { name: tm?.name })}</Text>
          <Text size="m">{t('playbook.areYouSure')}</Text>
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem size="small">
        <Icon name="dragAndDrop" size={24} color="softPeanut" />
        <CircularBadge size="medium" backgroundColor={tm?.color} color="gray">
          {tm?.shortName}
        </CircularBadge>
      </EntityCardItem>
      <EntityCardItem>{tm?.name}</EntityCardItem>
      <EntityCardItem>{tm?.defaultCadence}</EntityCardItem>
      <EntityCardItem ellipsis={50}>{tm?.description?.replace(/(<([^>]+)>)/gi, '')}</EntityCardItem>
      <EntityCardItem>
        {tm?.fieldValueConditions?.length > 0 && (
          <>
            {viewAllTags ? (
              <>
                {tm?.fieldValueConditions
                  ?.flatMap(condition => condition.childField)
                  .map((child, i) => (
                    <span className={styles._tag__element} key={child?.label}>
                      <Tag
                        onClick={() =>
                          handleOpenTagsModal(
                            tm?.fieldValueConditions[i]?.fieldValuesToDisplay,
                            true,
                            `for ${tm?.fieldValueConditions[i]?.childField?.label}`,
                          )
                        }
                      >
                        <Text size="s" ellipsis={20}>
                          {child?.label}
                        </Text>
                      </Tag>
                    </span>
                  ))}
              </>
            ) : (
              <>
                <span className={styles._tag__element}>
                  <Tag
                    onClick={() =>
                      handleOpenTagsModal(
                        tm?.fieldValueConditions[0]?.fieldValuesToDisplay,
                        true,
                        `for ${tm?.fieldValueConditions[0]?.childField?.label}`,
                      )
                    }
                  >
                    <Text size="s" ellipsis={20}>
                      {firstSegmentationElement?.label}
                    </Text>
                  </Tag>
                </span>
                {totalSegmentationElements > 1 && (
                  <span onClick={() => setViewAllTags(true)}>
                    <Text className={styles._view_more__text} inline size="s">
                      +{totalSegmentationElements - 1}
                    </Text>
                  </span>
                )}
              </>
            )}
          </>
        )}
      </EntityCardItem>
      <EntityCardItem size="small">
        <span className={styles._status__span}>
          <Switch
            checked={temporarySwitch}
            onChange={enabled => handleToggleEnabled(enabled)}
            color="purple"
          />
          <IconButton
            name="edit"
            color="purple"
            size={24}
            onClick={() => handleOpenCreateEditModal({ targetMarket: tm })}
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
