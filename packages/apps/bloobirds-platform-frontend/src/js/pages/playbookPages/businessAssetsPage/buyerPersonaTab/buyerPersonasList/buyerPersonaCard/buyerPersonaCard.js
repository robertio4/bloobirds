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
import { useOpenBuyerPersonaModal } from '../../../../../../hooks/useSteppableModal';
import { useTagsModal } from '../../../../../../hooks/useTagsModal';
import { ConfirmDeleteModalLayout } from '../../../../../../layouts/confirmDeleteModalLayout/confirmDeleteModalLayout';
import { REFRESHED_ENTITIES } from '../../../businessAssetsPage.constants';
import styles from '../../../businessAssetsPage.module.css';

export const BuyerPersonaCard = ({ icp }) => {
  const { handleUpdateEntity } = useEntityActions();
  const [temporarySwitch, setTemporarySwitch] = useState(icp?.enabled);
  const [viewAllTags, setViewAllTags] = useState();
  const { handleOpenTagsModal } = useTagsModal();
  const { handleOpenCreateEditModal } = useOpenBuyerPersonaModal();
  const [isDeleting, setIsDeleting] = useState();
  const { handleDeleteEntity } = useEntityActions();
  const [confirmModalOpen, setConfirmModalOpen] = useState();
  const { createToast } = useToasts();
  const { t } = useTranslation();
  const entityName = t('common.buyerPersona');

  const handleToggleEnabled = enabled => {
    setTemporarySwitch(!temporarySwitch);
    handleUpdateEntity({
      id: icp.id,
      entityName: 'idealCustomerProfiles',
      label: entityName,
      body: { enabled },
      callback: () => {
        mutate('/idealCustomerProfiles');
        forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
      },
    });
  };

  const handleDeleteBuyerPersona = () => {
    setIsDeleting(true);
    handleDeleteEntity({
      id: icp?.id,
      entityName: 'idealCustomerProfiles',
      label: entityName,
      callback: () => {
        createToast({
          message: `${entityName} ${t('common.successfullyDeleted')}!`,
          type: 'success',
        });
        setIsDeleting(false);
        mutate('/idealCustomerProfiles');
        forceSelectedEntitiesCacheRefresh(REFRESHED_ENTITIES);
      },
    });
  };

  const firstSegmentationElement = icp?.fieldValueConditions
    ? icp?.fieldValueConditions[0]?.childField
    : null;
  const totalSegmentationElements = icp?.fieldValueConditions
    ? icp?.fieldValueConditions?.length
    : null;

  return (
    <>
      {confirmModalOpen && (
        <ConfirmDeleteModalLayout
          icon="person"
          assetLabel={entityName}
          isDeleting={isDeleting}
          handleDelete={handleDeleteBuyerPersona}
          handleClose={() => setConfirmModalOpen(false)}
          colorSchema={{
            verySoft: 'verySoftPurple',
            light: 'lightPurple',
          }}
        >
          <Text size="m">
            You are going to delete permantently the Buyer Persona &quot;{icp?.name}&quot;
          </Text>
          <Text size="m">Are you sure you want to continue?</Text>
        </ConfirmDeleteModalLayout>
      )}
      <EntityCardItem size="small">
        <Icon name="dragAndDrop" size={24} color="softPeanut" />
        <CircularBadge size="medium" backgroundColor={icp?.color} color="gray">
          {icp?.shortName}
        </CircularBadge>
      </EntityCardItem>
      <EntityCardItem>{icp?.name}</EntityCardItem>
      <EntityCardItem>{icp?.defaultCadence}</EntityCardItem>
      <EntityCardItem ellipsis={50}>
        {icp?.description?.replace(/(<([^>]+)>)/gi, '')}
      </EntityCardItem>
      <EntityCardItem>
        {icp?.fieldValueConditions?.length > 0 && (
          <>
            {viewAllTags ? (
              <>
                {icp?.fieldValueConditions
                  ?.flatMap(condition => condition.childField)
                  .map((child, i) => (
                    <span className={styles._tag__element} key={`conditions-${child?.label}`}>
                      <Tag
                        onClick={() =>
                          handleOpenTagsModal(
                            icp?.fieldValueConditions[i]?.fieldValuesToDisplay,
                            true,
                            `for ${icp?.fieldValueConditions[i]?.childField?.label}`,
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
                        icp?.fieldValueConditions[0]?.fieldValuesToDisplay,
                        true,
                        `for ${icp?.fieldValueConditions[0]?.childField?.label}`,
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
            onClick={() => handleOpenCreateEditModal({ buyerPersona: icp })}
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
