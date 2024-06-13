import React, { SyntheticEvent } from 'react';

import { Dropdown, IconButton, Item, useVisible } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';

import {
  APP_ACCOUNT_INTEGRATION_HUBSPOT_SYNC_STATUS,
  APP_ACCOUNT_INTEGRATION_SALESFORCE_SYNC_STATUS,
} from '../../../../../app/_constants/routes';
import { useBobjectPermissions } from '../../../../../components/userPermissions/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  MEETING_MAIN_TYPE_VALUES,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../../../constants/activity';
import { CRM } from '../../../../../constants/integrations';
import { useActivity, useBobjectFormVisibility, useRouter } from '../../../../../hooks';
import useHubspot from '../../../../../hooks/useHubspot';
import useSalesforce from '../../../../../hooks/useSalesforce';
import { getFieldByLogicRole } from '../../../../../utils/bobjects.utils';

export const ActivityCardDropdown = ({ bobject }: { bobject: Bobject }) => {
  const { reportedActivityResult } = useActivity('reportResult');
  const { history } = useRouter();
  const { hubspotIntegration } = useHubspot();
  const { salesforceIntegration } = useSalesforce();
  const { checkPermissions } = useBobjectPermissions();
  const { openEditModal } = useBobjectFormVisibility();
  const { ref, visible, setVisible } = useVisible(false);
  const meetingType = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE);
  const isFirstMeeting =
    meetingType?.valueLogicRole === MEETING_MAIN_TYPE_VALUES.FIRST_MEETING ||
    !meetingType?.valueLogicRole;

  const isReported =
    getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)?.valueLogicRole ===
    REPORTED_VALUES_LOGIC_ROLE.YES;

  const hasPermission = checkPermissions(bobject);

  const markAsNotReported = () => {
    reportedActivityResult({
      activityId: bobject?.id.objectId,
      valueLogicRole: undefined,
      activityType: ACTIVITY_TYPES.MEETING as keyof typeof ACTIVITY_TYPES,
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

  const goToLogs = (e: SyntheticEvent, integration: { type: string }) => {
    const query = {
      page: '0',
      pageSize: '25',
      bobjectType: bobject?.id?.typeName?.toUpperCase(),
      dateRange: 'all_time',
      textSearch: bobject?.id?.objectId,
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
  };

  return (
    <Dropdown
      visible={visible}
      ref={ref}
      anchor={
        <IconButton
          dataTest="Activity-Options"
          name="moreOpenholesVertical"
          color="softPeanut"
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setVisible(!visible);
          }}
        />
      }
    >
      <div ref={ref}>
        {(!isFirstMeeting || isReported) && (
          <Item
            onClick={(value, event) => {
              event.stopPropagation();
              isReported ? markAsNotReported() : markAsReported();
            }}
            icon="thumbsUp"
          >
            {!isReported ? 'Mark as reported' : 'Mark as not reported'}
          </Item>
        )}
        <Item
          dataTest="Edit-Activity"
          icon="edit"
          onClick={(value, event) => {
            event.stopPropagation();
            if (!hasPermission) {
              return false;
            }
            openEditModal({ bobject });
            setVisible(false);
          }}
          disabled={!hasPermission}
        >
          Edit activity
        </Item>

        {hubspotIntegration?.id && (
          <Item
            icon="hubspot"
            onClick={(value, event) => {
              event.stopPropagation();
              goToLogs(event, hubspotIntegration);
            }}
          >
            View HS logs
          </Item>
        )}
        {salesforceIntegration?.id && (
          <Item
            icon="salesforce"
            onClick={(value, event) => {
              event.stopPropagation();
              goToLogs(event, salesforceIntegration);
            }}
          >
            View SFDC logs
          </Item>
        )}
      </div>
    </Dropdown>
  );
};
