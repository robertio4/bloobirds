import React from 'react';

import { Dropdown, IconButton, Item, useToasts, useVisible } from '@bloobirds-it/flamingo-ui';
import { useCustomTasks, useMinimizableModals, useQuickLogActivity } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { getReferencedBobject } from '@bloobirds-it/utils';

import {
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
  companyUrl,
  leadUrl,
  opportunityUrl,
} from '../../../../app/_constants/routes';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE } from '../../../../constants/company';
import { CRM } from '../../../../constants/integrations';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../../../constants/opportunity';
import {
  useActivity,
  useBobjectDetailsVisibility,
  useBobjectFormVisibility,
  useRouter,
} from '../../../../hooks';
import useHubspot from '../../../../hooks/useHubspot';
import useSalesforce from '../../../../hooks/useSalesforce';
import useUpdateSalesforceCampaignStatus from '../../../../hooks/useUpdateCampaignStatus';
import { isUrl } from '../../../../misc/utils';
import { useContactBobjects } from '../../../../pages/contactPages/contactPageContext';
import { api } from '../../../../utils/api';
import {
  getFieldByLogicRole,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import { useBobjectPermissions } from '../../../userPermissions/hooks';

const ContextMenu = ({ bobject }) => {
  const { company, active } = useContactBobjects();
  const { createToast } = useToasts();
  const { reportedActivityResult } = useActivity('activityCard');
  const { openModal: openUpdateSalesforceCampaignStatus } = useUpdateSalesforceCampaignStatus();
  const { checkPermissions } = useBobjectPermissions();
  const { openEditModal } = useBobjectFormVisibility();
  const { leads } = useContactBobjects();
  const { ref, visible, setVisible } = useVisible(false);
  const lead = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;
  const recordCall = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_RECORD_URL);
  const type = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
  const campaignId = getValueFromLogicRole(
    bobject,
    ACTIVITY_FIELDS_LOGIC_ROLE.SALESFORCE_CAMPAIGN_ID,
  );
  const campaignMemberId = getValueFromLogicRole(
    bobject,
    ACTIVITY_FIELDS_LOGIC_ROLE.SALESFORCE_CAMPAIGN_MEMBER_ID,
  );
  const isIncomingActivity =
    getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION) ===
    ACTIVITY_DIRECTION.INCOMING;
  const showReportResult =
    (isIncomingActivity && type !== ACTIVITY_TYPES.INBOUND) ||
    type === ACTIVITY_TYPES.MEETING ||
    type === ACTIVITY_TYPES.CALL;
  const isMeeting = type === ACTIVITY_TYPES.MEETING;
  const showCampaignMember = type === ACTIVITY_TYPES.INBOUND && campaignId && campaignMemberId;
  const hasPermission = checkPermissions(company || active);
  const isReported = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED) === 'Yes';
  const isPinned = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.IS_PINNED) === 'Yes';
  const { setPinned } = useActivity('activityCard');
  const { hubspotIntegration } = useHubspot();
  const { salesforceIntegration } = useSalesforce();
  const { closeBobjectDetailsModal } = useBobjectDetailsVisibility();
  const { openQuickLogModal } = useQuickLogActivity();
  const { history } = useRouter();
  const { customTasks } = useCustomTasks({ disabled: false });
  const customTaskId = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK);
  const customTask = customTasks?.find(ct => ct.id === customTaskId?.value);

  const goToLogs = (e, integration) => {
    const query = {
      page: 0,
      pageSize: 25,
      bobjectType: bobject?.id?.typeName?.toUpperCase(),
      dateRange: 'all_time',
      textSearch: bobject?.id?.objectId,
      bobjectId: bobject?.id?.objectId,
    };
    const queryString = new URLSearchParams(query).toString();
    history.push(
      `${
        integration.type === CRM.SALESFORCE
          ? APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS
          : APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS
      }?${queryString}`,
      { event: e },
    );
    closeBobjectDetailsModal();
  };

  const markAsNotReported = () => {
    reportedActivityResult({
      activityId: bobject?.id.objectId,
      valueLogicRole: undefined,
      activityType: type,
    });
    setVisible(false);
  };

  const markAsReported = () => {
    reportedActivityResult({
      activityId: bobject?.id.objectId,
      valueLogicRole: REPORTED_VALUES_LOGIC_ROLE.YES,
    });
    setVisible(false);
  };

  const getSignedCallRecordingUrl = async () => {
    const oldRecordingRegex = /^(https:\/\/record-calls.bloobirds.com\/)(.{34})/g;
    let callSid = recordCall;
    const itsADeprecatedRecordingLink = recordCall.match(oldRecordingRegex);
    if (!itsADeprecatedRecordingLink && isUrl(recordCall)) {
      return recordCall;
    }
    if (recordCall && itsADeprecatedRecordingLink) {
      callSid = recordCall.split('/').at(-1);
    } else {
      callSid = recordCall.split('/')[1];
    }
    const signedUrl = await api.get(`/calls/whiteLabel/calls/${callSid}/recording`);
    if (signedUrl.status === 200) {
      return signedUrl.data.url;
    } else {
      throw new Error('Failed to get signed url');
    }
  };
  const { openMinimizableModal } = useMinimizableModals();
  const handleOpenModal = t => {
    const bobjectFieldsData = {};
    bobject.fields.forEach(field => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });
    const companyName = company
      ? getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME)
      : 'New something';
    openMinimizableModal({
      title: companyName && companyName !== '' ? companyName.slice(0, 10) : 'Untitled company',
      type: t,
      bobject,
      data: {
        company: company
          ? {
              name: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
              url: companyUrl(company),
              data: company,
            }
          : undefined,
        lead: lead && {
          name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
          url: leadUrl(lead),
          data: lead,
        },
        opportunity:
          active?.id?.typeName === BOBJECT_TYPES.OPPORTUNITY
            ? {
                name: getValueFromLogicRole(active, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
                data: active,
              }
            : undefined,
        ...bobjectFieldsData,
      },
    });
  };

  function handleSetVisible() {
    setVisible(v => !v);
  }

  function handleEditActivity() {
    if (!hasPermission) {
      return false;
    }
    if (type === ACTIVITY_TYPES.MEETING) {
      handleOpenModal('calendarMeeting');
    } else {
      if (customTask) {
        openQuickLogModal({
          customTask,
          leads,
          selectedBobject: getReferencedBobject(bobject),
          isEdition: true,
          activity: bobject,
        });
      } else {
        openEditModal({ bobject });
      }
    }
    setVisible(false);
  }

  return (
    <Dropdown
      visible={visible}
      anchor={
        <IconButton
          dataTest="Activity-Options"
          name="moreOpenholes"
          color="softPeanut"
          onClick={handleSetVisible}
        />
      }
    >
      <div ref={ref}>
        {type !== ACTIVITY_TYPES.CADENCE && (
          <Item
            dataTest="Edit-Activity"
            icon="edit"
            onClick={handleEditActivity}
            disabled={!hasPermission}
          >
            Edit activity
          </Item>
        )}
        {recordCall && (
          <Item
            icon="voicemail"
            onClick={() => {
              getSignedCallRecordingUrl()
                .then(url => {
                  window.open(url, '_blank');
                })
                .catch(() => {
                  createToast({
                    message: 'Failed to get the recording, it may have been deleted',
                    type: 'error',
                  });
                });
            }}
          >
            Listen call recording
          </Item>
        )}
        <Item
          onClick={() => {
            setVisible(false);
            setPinned(bobject.id.objectId, isPinned, type);
          }}
          icon="pin"
        >
          {isPinned ? 'Unpin activity' : 'Pin activity'}
        </Item>
        {((showReportResult && !isMeeting) || (isMeeting && isReported)) && (
          <Item onClick={isReported ? markAsNotReported : markAsReported} icon="thumbsUp">
            {!isReported ? 'Mark as reported' : 'Mark as not reported'}
          </Item>
        )}
        {hubspotIntegration?.id && (
          <Item icon="hubspot" onClick={e => goToLogs(e, hubspotIntegration)}>
            View HS logs
          </Item>
        )}
        {salesforceIntegration?.id && (
          <Item icon="salesforce" onClick={e => goToLogs(e, salesforceIntegration)}>
            View SFDC logs
          </Item>
        )}
        {showCampaignMember && (
          <Item
            icon="salesforceOutlined"
            onClick={() => {
              setVisible(false);
              const campaignName = bobject?.fields?.find(field => field?.label === 'Campaign name')
                ?.value;
              const campaignMemberStatus = bobject?.fields?.find(
                field => field?.label === 'Campaign member status',
              )?.value;
              openUpdateSalesforceCampaignStatus({
                leadToSet: lead,
                campaignNameToSet: campaignName,
                campaignIdToSet: campaignId,
                bobjectIdToSet: bobject?.id?.value,
                campaignMemberStatusToSet: campaignMemberStatus,
                campaignMemberIdToSet: campaignMemberId,
              });
            }}
          >
            Update campaign member
          </Item>
        )}
      </div>
    </Dropdown>
  );
};

export default ContextMenu;
