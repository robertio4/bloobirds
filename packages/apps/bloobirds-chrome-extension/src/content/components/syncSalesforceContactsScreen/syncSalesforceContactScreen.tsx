import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Button, Checkbox, CircularBadge, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import { BobjectId, ExtensionBobject, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

import { api } from '../../../utils/api';
import { BubbleWindow } from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import TopIconBar from '../topIconBar/topIconBar';
import styles from './syncSalesforceContactScreen.module.css';

export const SyncSalesforceContactScreen = ({
  draftBobjectToSync,
  companyIdRelated,
  onSync,
  opportunityRelatedId,
}: {
  draftBobjectToSync: ExtensionBobject[];
  companyIdRelated: BobjectId;
  onSync?: () => void;
  opportunityRelatedId?: BobjectId;
}) => {
  const { createToast } = useToasts();
  const {
    useGetDataModel,
    useGetSettings,
    setActiveBobject,
    setExtendedContext,
    setCustomPage,
  } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const { t } = useTranslation();
  const [selectedBobjects, setSelectedBobject] = useState<ExtensionBobject[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [bobjects, setBobjects] = useState<ExtensionBobject[]>(draftBobjectToSync);
  const leadNameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.NAME);
  const leadSurnameField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.SURNAME);
  const leadTitleField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE);
  const leadEmailField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const leadAssignedTo = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
  const users = useUserSearch();
  const updateSelected = (bobject: ExtensionBobject) => {
    setSelectedBobject(currSelected =>
      currSelected?.find(b =>
        opportunityRelatedId
          ? b?.salesforceId === bobject?.salesforceId
          : b?.sobject?.['Id'] === bobject?.sobject?.['Id'],
      )
        ? currSelected?.filter(b =>
            opportunityRelatedId
              ? b?.salesforceId !== bobject?.salesforceId
              : b?.sobject?.['Id'] !== bobject?.sobject?.['Id'],
          )
        : [...currSelected, bobject],
    );
  };
  const syncLeadsRequest = (
    url: string,
    data,
    isBulk: boolean,
    requestData: ExtensionBobject | ExtensionBobject[],
  ) => {
    apiRequest(url, data, isBulk)
      .then(response => {
        if (response?.status === 200) {
          setSelectedBobject([]);
          setLoading(false);
          if (opportunityRelatedId) {
            addLeadsToOpportunity(
              isBulk ? response?.data?.map(bobject => bobject?.value) : [response?.data?.value],
              opportunityRelatedId?.value,
            );
            const resultingBobjects = bobjects?.filter(bobj =>
              isBulk
                ? requestData?.map(obj => obj?.salesforceId).includes(bobj?.salesforceId)
                : bobj?.salesforceId !== requestData?.salesforceId,
            );
            setBobjects(resultingBobjects);
            if (resultingBobjects?.length === 0) {
              setCustomPage(null);
            }
          } else {
            const resultingBobjects = bobjects?.filter(bobj =>
              isBulk
                ? requestData?.map(obj => obj?.sobject?.['Id']).includes(bobj?.sobject?.['Id'])
                : bobj?.sobject?.['Id'] !== requestData?.sobject?.['Id'],
            );
            setBobjects(resultingBobjects);
            if (resultingBobjects?.length === 0) {
              setCustomPage(null);
            }
          }
          if (onSync) {
            onSync();
          }
          createToast({
            message: t('sidePeek.overview.toasts.contactSyncedSuccess'),
            type: 'success',
          });
        }
      })
      .catch(() => {
        createToast({
          message: t('sidePeek.overview.toasts.contactSyncedError'),
          type: 'error',
        });
      })
      .finally(() => {
        setSelectedBobject([]);
        setLoading(false);
      });
  };
  const apiRequest = (url: string, data: any, isBulk: boolean) => {
    return isBulk ? api.put(url, data) : api.post(url, data);
  };

  const syncLeads = (requestData: ExtensionBobject | ExtensionBobject[]) => {
    setLoading(true);
    const isBulk = Array.isArray(requestData);
    const contents = isBulk
      ? bobjects?.map(bobject => {
          return {
            ...bobject?.rawBobject,
            [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyIdRelated?.value,
          };
        })
      : {
          ...requestData?.rawBobject,
          [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyIdRelated?.value,
        };

    const url = isBulk
      ? `/bobjects/${settings?.account?.id}/Lead/bulk`
      : `/bobjects/${settings?.account?.id}/Lead`;
    const data = isBulk
      ? contents
      : {
          contents,
          params: {},
        };

    if (isBulk) {
      const syncLeads = requestData?.filter(lead => lead?.id?.objectId === null);
      const syncLeadsWithOpportunity = requestData?.filter(lead => lead?.id?.objectId !== null);

      if (syncLeads.length > 0) {
        syncLeadsRequest(url, data, isBulk, syncLeads);
      }
      if (syncLeadsWithOpportunity.length > 0) {
        const leadIds = syncLeadsWithOpportunity.map(lead => lead?.id?.value);
        addLeadsToOpportunity(leadIds, opportunityRelatedId?.value);
        const resultingBobjects = bobjects?.filter(
          bobject => !leadIds?.includes(bobject?.id?.value),
        );
        if (resultingBobjects?.length === 0) {
          setCustomPage(null);
        }
        setBobjects(resultingBobjects);
      }
    } else {
      if (requestData?.id?.objectId === null) {
        syncLeadsRequest(url, data, isBulk, requestData);
      } else {
        addLeadsToOpportunity([requestData?.id?.value], opportunityRelatedId?.value);
        const resultingBobjects = bobjects?.filter(
          bobj => bobj?.salesforceId !== requestData?.salesforceId,
        );
        if (resultingBobjects?.length === 0) {
          setCustomPage(null);
        }
        setBobjects(resultingBobjects);
      }
    }
  };
  const addLeadsToOpportunity = (leadsToRelate: string[], opportunityId: string) => {
    api
      .post(`/bobjects/${settings?.account?.id}/operations/fill/opportunity-leads`, {
        leadsToRelate: leadsToRelate,
        opportunityId: opportunityId,
      })
      .then(() => {
        setLoading(false);
        setSelectedBobject([]);
        if (onSync) {
          onSync();
        }
      });
  };

  return (
    <BubbleWindow>
      <TopIconBar
        dragging={false}
        onBackButton={() => {
          setCustomPage(null);
        }}
        backgroundColor="lightestBloobirds"
        onRefresh={() => {
          setActiveBobject(null);
          setExtendedContext(null);
        }}
      />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.left_header}>
            <Checkbox
              size="small"
              disableHoverStyle
              checked={selectedBobjects?.length === bobjects.length}
              onClick={() => {
                selectedBobjects?.length === bobjects?.length
                  ? setSelectedBobject([])
                  : setSelectedBobject(bobjects);
              }}
            />
            <Text size="xs">{t('sidePeek.overview.selectAll')}</Text>
          </span>
          <span className={styles.right_header}>
            <Text size="xs" color="softPeanut" weight="bold">
              {t('sidePeek.overview.contacts', { count: selectedBobjects?.length })}
            </Text>
          </span>
        </div>
        {bobjects?.map(bobject => {
          const assignedTo = bobject?.rawBobject[leadAssignedTo?.id];
          const assigneeUser = users?.users?.find(user => user?.id === assignedTo);
          const assignedColor = assigneeUser?.color;
          const assignedShortName = assigneeUser?.shortname;
          const assignedName = assigneeUser?.name;
          return (
            <div className={styles.container} key={bobject?.sobject?.['Id']}>
              <div className={styles.top_container}>
                <Checkbox
                  size="small"
                  disableHoverStyle
                  checked={
                    !!selectedBobjects?.find(b =>
                      opportunityRelatedId
                        ? b?.salesforceId === bobject?.salesforceId
                        : b?.sobject?.['Id'] === bobject?.sobject?.['Id'],
                    )
                  }
                  onClick={() => updateSelected(bobject)}
                />
                <div className={styles.info_container}>
                  <Text size="s" color="bloobirds">
                    {bobject?.rawBobject[leadNameField?.id]}{' '}
                    {bobject?.rawBobject[leadSurnameField?.id]}
                  </Text>
                  <Text size="xs" color="softPeanut">
                    {bobject?.rawBobject[leadTitleField?.id] ||
                      bobject?.rawBobject[leadEmailField?.id]}
                  </Text>
                </div>
              </div>
              <div className={styles.bottom_container}>
                <div>
                  {assigneeUser && (
                    <div className={styles.assigned_to}>
                      <CircularBadge
                        style={{ fontSize: '9px' }}
                        backgroundColor={assignedColor || 'lightPeanut'}
                        size="small"
                        className={styles.assign_badge}
                      >
                        {assignedShortName || 'U'}
                      </CircularBadge>
                      <Text size="s" ellipsis={18}>
                        {assignedName}
                      </Text>
                    </div>
                  )}
                </div>
                <div>
                  <Button
                    size="small"
                    iconRight="bloobirds"
                    disabled={loading}
                    onClick={() => syncLeads(bobject)}
                  >
                    {t('sidePeek.overview.sync').toUpperCase()}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedBobjects?.length > 0 && (
        <div className={styles.sync_bloobirds_banner}>
          <Button
            iconRight="bloobirds"
            variant="tertiary"
            className={styles.button}
            onClick={() => syncLeads(selectedBobjects)}
          >
            {t('sidePeek.overview.syncInBloobirds')}
          </Button>
        </div>
      )}
    </BubbleWindow>
  );
};
