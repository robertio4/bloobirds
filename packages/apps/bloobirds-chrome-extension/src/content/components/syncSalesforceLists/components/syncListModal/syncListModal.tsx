import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Callout,
  Checkbox,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
  Text,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';
import { useRecoilState } from 'recoil';
import useSWR from 'swr';

import { getSalesforceSobjectFromPage } from '../../../../../utils/url';
import { inProgressBulkActionsState } from '../../../bulkActionsToasts/bulkActionsToasts';
import { useExtensionContext } from '../../../context';
import styles from './syncListModal.module.css';

const allowedSobjectTypes = ['Lead', 'Contact', 'Account', 'Opportunity'];
export const relatedCompanySobjects = ['Lead', 'Contact', 'Opportunity'];
export const relatedLeadsSobjects = ['Account', 'Opportunity'];
const pluralSobjectTypes = {
  Lead: 'leads',
  Contact: 'contacts',
  Account: 'accounts',
  Opportunity: 'opportunities',
};

function SyncListInfo(props: {
  syncText: string;
  relatedCompanyAllowed: boolean;
  onCreateAccountsClick: () => void;
  shouldCreateAccounts: boolean;
  sobjectType: string;
  relatedLeadsAllowed: boolean;
  onCreateContactsClick: () => void;
  shouldCreateContacts: boolean;
}) {
  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.syncSalesforceList.syncListInfo',
  });

  return (
    <div className={styles.content}>
      <Text size="m" weight="medium">
        {props.syncText}
      </Text>
      <div>
        {props.relatedCompanyAllowed && (
          <div className={styles.relatedObjectsSetting}>
            <Text size="xs" weight="bold">
              {t('titleAccounts')}
            </Text>
            <div className={styles.checkbox}>
              <Checkbox
                size="small"
                onClick={props.onCreateAccountsClick}
                checked={props.shouldCreateAccounts}
              >
                {t('checkBoxTextAccounts', { type: props.sobjectType })}
              </Checkbox>
            </div>
            {props.shouldCreateAccounts && (
              <Text size="xs" color="softPeanut">
                {t('shouldCreateAccountsText', { type: props.sobjectType })}
              </Text>
            )}
          </div>
        )}
        {props.relatedLeadsAllowed && (
          <div className={styles.relatedObjectsSetting}>
            <Text size="xs" color="softPeanut">
              {t('titleContacts')}
            </Text>
            <div className={styles.checkbox}>
              <Checkbox
                size="small"
                onClick={props.onCreateContactsClick}
                checked={props.shouldCreateContacts}
              >
                {t('checkBoxTextContacts', { type: props.sobjectType })}
              </Checkbox>
            </div>
            {props.shouldCreateContacts && (
              <Text size="s" color="softPeanut">
                {t('shouldCreateContactsText', { type: props.sobjectType })}
              </Text>
            )}
          </div>
        )}
      </div>
      <div className={styles.callout}>
        <Callout variant="neutral" icon="info">
          <Text size="xs">{t('callout', { type: pluralSobjectTypes[props.sobjectType] })}</Text>
        </Callout>
      </div>
    </div>
  );
}

export const SyncListModal = ({
  onClose,
  salesforceIds,
  isRecentList = false,
}: {
  onClose: () => void;
  salesforceIds: string[];
  isRecentList?: boolean;
}) => {
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const sobjectType = getSalesforceSobjectFromPage(currentPage);
  const [createCompany, setCreateCompany] = useState(true);
  const [createRelatedLeads, setCreateRelatedLeads] = useState(true);
  const { createToast } = useToasts();
  const [loading, setLoading] = useState(false);
  const [, setInProgressBulkActions] = useRecoilState(inProgressBulkActionsState);
  const { useGetSettings } = useExtensionContext();
  const relatedCompanyAllowed = relatedCompanySobjects?.includes(sobjectType);
  const relatedLeadsAllowed = relatedLeadsSobjects?.includes(sobjectType);
  const isNotAllowedSobjectType = !allowedSobjectTypes?.includes(sobjectType);
  const searchParams = new URLSearchParams(window.location.search);
  const listId = searchParams.get('filterName');
  const [wholeList, setWholeList] = useState(false);

  const settings = useGetSettings();

  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.syncSalesforceList.syncListModal',
  });

  const handleSync = async () => {
    setLoading(true);
    const body = {
      createRelatedCompany: relatedCompanyAllowed && createCompany,
      createRelatedLead: relatedLeadsAllowed && createRelatedLeads,
    };
    const syncSelection = salesforceIds?.length > 0 && !wholeList;
    if (syncSelection) {
      body['salesforceIds'] = salesforceIds;
    }
    const response = await api.post(
      syncSelection
        ? `/utils/service/salesforce/sync/sobjects/${sobjectType}`
        : `/utils/service/salesforce/sync/list/${sobjectType}/${listId}`,
      body,
    );
    if (response.status === 200) {
      createToast({ message: t('toasts.success', { type: sobjectType }), type: 'success' });
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
        message: t('toasts.error', { type: sobjectType }),
        type: 'error',
      });
    }
    setLoading(false);
  };

  const { data } = useSWR(
    wholeList && listId && listId !== 'Recent' && 'sync-sfdc-list-' + listId,
    () => api.get(`/utils/service/salesforce/total/${sobjectType}/${listId}`),
  );
  const listSize = data?.data?.listSize || 0;

  const syncText =
    salesforceIds?.length > 0 && !wholeList
      ? t('bulkMessages.synchronizeItems', {
          count: salesforceIds.length,
          type: pluralSobjectTypes[sobjectType],
        })
      : t('bulkMessages.synchronizeAll', {
          count: salesforceIds.length,
          type: pluralSobjectTypes[sobjectType],
        });

  const Actions = () => {
    if (salesforceIds.length > 0 || (wholeList && listSize > 0 && !isRecentList)) {
      return (
        <SyncListInfo
          syncText={syncText}
          relatedCompanyAllowed={relatedCompanyAllowed}
          onCreateAccountsClick={() => setCreateCompany(!createCompany)}
          shouldCreateAccounts={createCompany}
          sobjectType={sobjectType}
          relatedLeadsAllowed={relatedLeadsAllowed}
          onCreateContactsClick={() => setCreateRelatedLeads(!createRelatedLeads)}
          shouldCreateContacts={createRelatedLeads}
        />
      );
    }

    if (wholeList && listSize === 0 && !isRecentList) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">{t('noResults', { type: pluralSobjectTypes[sobjectType] })}</Text>
        </div>
      );
    }

    if (salesforceIds.length === 0 && !((wholeList && listSize > 0) || isRecentList)) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">{t('noSelected')}</Text>
        </div>
      );
    }

    if (salesforceIds.length === 0 && isRecentList) {
      return (
        <div className={styles.recently_viewed_content}>
          <Text size="m">{t('recentTitle')}</Text>
          <Text size="m">{t('recentSubtitle')}</Text>
        </div>
      );
    }

    return null;
  };

  return (
    <Modal open onClose={onClose} width={660}>
      <ModalHeader size="small">
        <ModalTitle variant="primary" size="small" icon="bloobirds">
          {t('title', { type: pluralSobjectTypes[sobjectType] || sobjectType })}
        </ModalTitle>
        <ModalCloseIcon onClick={onClose} />
      </ModalHeader>
      <ModalContent>
        {isNotAllowedSobjectType ? (
          <div className={styles.content}>
            <div className={styles.errorMessage}>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <Text size="m">{t('contentUpperBlock', { type: sobjectType })}</Text>
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
          {!wholeList && !isRecentList && (
            <Button disabled={loading} variant="secondary" onClick={() => setWholeList(true)}>
              {t('syncWholeList')}
            </Button>
          )}
          {((salesforceIds.length > 0 && !wholeList) || wholeList) && (
            <Button disabled={loading || (wholeList && listSize === 0)} onClick={handleSync}>
              {loading ? <Spinner color="white" name="loadingCircle" /> : t('sync')}
            </Button>
          )}
        </div>
      </ModalFooter>
    </Modal>
  );
};
