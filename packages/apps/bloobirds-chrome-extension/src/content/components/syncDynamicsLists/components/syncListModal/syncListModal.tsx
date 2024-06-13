import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Callout,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Skeleton,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { getDynamicsEntityType } from '@bloobirds-it/utils';
import { useRecoilState } from 'recoil';

import { inProgressBulkActionsState } from '../../../bulkActionsToasts/bulkActionsToasts';
import { useExtensionContext } from '../../../context';
import {
  getDynamicsCheckedIds,
  getTotalObjectsInList,
  syncDynamicsList,
} from '../../dynamicsListSelection.utils';
import styles from './syncListModal.module.css';

const allowedSobjectTypes = ['lead', 'contact', 'account', 'opportunity'];
const pluralSobjectTypes = {
  lead: 'leads',
  contact: 'contacts',
  account: 'accounts',
  ppportunity: 'opportunities',
};

function SyncListInfo(props: { syncText: string; dobjectType: string }) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.syncSalesforceList.syncListInfo',
  });

  return (
    <div className={styles.content}>
      <Text size="m" weight="medium">
        {props.syncText}
      </Text>
      <div className={styles.callout}>
        <Callout variant="neutral" icon="info">
          <Text size="xs">{t('callout', { type: pluralSobjectTypes[props.dobjectType] })}</Text>
        </Callout>
      </div>
    </div>
  );
}

export const SyncListModal = ({ onClose }: { onClose: () => void }) => {
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const dobjectType = getDynamicsEntityType(currentPage);
  const { createToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [, setInProgressBulkActions] = useRecoilState(inProgressBulkActionsState);
  const { useGetSettings } = useExtensionContext();
  const isNotAllowedSobjectType = !allowedSobjectTypes?.includes(dobjectType);
  const searchParams = new URLSearchParams(window.location.search);
  const listId = searchParams.get('viewid');
  const [wholeList, setWholeList] = useState(false);

  const settings = useGetSettings();

  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.syncSalesforceList.syncListModal',
  });

  const dynamicsIds = getDynamicsCheckedIds();

  const handleSync = async () => {
    setLoading(true);

    const response = await syncDynamicsList({
      objectType: dobjectType,
      wholeList,
      listId,
      dynamicsIds,
    });

    if (response.status === 200) {
      createToast({ message: t('toasts.success', { type: dobjectType }), type: 'success' });
      setInProgressBulkActions(prev => [
        ...prev,
        {
          uniqueNotificationId: response.data.uniqueNotificationId,
          name: t('bulkMessages.starting'),
          status: 'CREATING',
          owner: settings?.user?.id,
        },
      ]);
      onClose();
    } else {
      createToast({
        message: t('toasts.error', { type: dobjectType }),
        type: 'error',
      });
    }
    setLoading(false);
  };

  const { total: listSize, isLoading: isTotalLoading } = getTotalObjectsInList(
    listId,
    dobjectType,
    wholeList,
  );

  const syncText =
    dynamicsIds?.size > 0 && !wholeList
      ? t('bulkMessages.synchronizeItems', {
          count: dynamicsIds.size,
          type: pluralSobjectTypes[dobjectType],
        })
      : t('bulkMessages.synchronizeAll', {
          count: listSize,
          type: pluralSobjectTypes[dobjectType],
        });

  const Actions = () => {
    if (isTotalLoading) {
      return (
        <>
          <Skeleton variant="text" height={25} width="100%" />
          <Skeleton variant="text" height={66} width="100%" />
        </>
      );
    }

    if (dynamicsIds.size > 0 || (wholeList && listSize > 0)) {
      return <SyncListInfo syncText={syncText} dobjectType={dobjectType} />;
    }

    if (wholeList && listSize === 0) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">{t('noResults', { type: pluralSobjectTypes[dobjectType] })}</Text>
        </div>
      );
    }

    if (dynamicsIds.size === 0 && !(wholeList && listSize > 0)) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">{t('noSelected')}</Text>
        </div>
      );
    }

    return null;
  };

  return (
    <Modal open onClose={onClose} width={660}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon="bloobirds">
          {t('title', { type: pluralSobjectTypes[dobjectType] || dobjectType })}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        {isNotAllowedSobjectType ? (
          <div className={styles.content}>
            <div className={styles.errorMessage}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text size="m">{t('contentUpperBlock', { type: dobjectType })}</Text>
              <Text size="m">{t('contentDownBlock')}</Text>
            </div>
          </div>
        ) : (
          <Actions />
        )}
      </ModalContent>
      <ModalFooter>
        <Button onClick={onClose} variant="clear">
          {t('goBack')}
        </Button>
        <div className={styles.buttons}>
          {!wholeList && (
            <Button disabled={loading} variant="secondary" onClick={() => setWholeList(true)}>
              {t('syncWholeList')}
            </Button>
          )}
          {((dynamicsIds.size > 0 && !wholeList) || wholeList) && (
            <Button disabled={loading || (wholeList && listSize === 0)} onClick={handleSync}>
              {loading ? <Spinner color="white" name="loadingCircle" /> : t('sync')}
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};
