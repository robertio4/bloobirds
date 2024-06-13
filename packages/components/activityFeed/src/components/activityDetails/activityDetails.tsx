import React from 'react';

import { Button, Text } from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
  Bobject,
  DataModelResponse,
} from '@bloobirds-it/types';
import { getTextFromLogicRole } from '@bloobirds-it/utils';

import styles from './activityDetails.module.css';
import { CallDetail } from './pages/callDetail/callDetail';
import { EmailThreadDetail } from './pages/emailThreadDetail/emailThreadDetail';
import { InboundDetail } from './pages/inboundDetail/inboundDetail';
import { LinkedInDetail } from './pages/linkedinDetail/linkedInDetail';
import { MeetingDetail } from './pages/meetingDetail/meetingDetail';
import { NoteDetail } from './pages/noteDetail/noteDetail';

interface ActivityDetailsProps {
  activity: Bobject;
  userId?: string;
  callback?: () => void;
  dataModel: DataModelResponse;
  visibleHeader?: boolean;
  visibleFooter?: boolean;
  selectedActivity?: Bobject;
}

export const ActivityDetails = ({
  activity,
  callback,
  dataModel,
  visibleFooter = true,
  selectedActivity,
}: ActivityDetailsProps) => {
  const activityToRender = selectedActivity || activity;
  const activityType = getTextFromLogicRole(activityToRender, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
  const accountId = activityToRender?.id?.accountId;

  const getActivityDetail = () => {
    switch (activityType) {
      case ACTIVITY_TYPES.EMAIL: {
        const emailThreadId = getTextFromLogicRole(
          activityToRender,
          ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_THREAD_ID,
        );
        return (
          <EmailThreadDetail
            activity={activityToRender}
            emailThreadId={emailThreadId}
            accountId={accountId} /*Temporal approach*/
            dataModel={dataModel}
            visibleFooter={visibleFooter}
          />
        );
      }
      case ACTIVITY_TYPES.LINKEDIN: {
        return (
          <LinkedInDetail
            activity={activity}
            accountId={accountId}
            dataModel={dataModel}
            visibleFooter={visibleFooter}
          />
        );
      }
      case ACTIVITY_TYPES.MEETING: {
        return (
          <MeetingDetail
            activity={activity}
            dataModel={dataModel}
            visibleFooter={visibleFooter}
            onSave={callback}
            onGoToBobject={() => undefined}
          />
        );
      }
      case ACTIVITY_TYPES.CALL: {
        return (
          <CallDetail activity={activity} dataModel={dataModel} visibleFooter={visibleFooter} />
        );
      }
      case ACTIVITY_TYPES.INBOUND: {
        return <InboundDetail activity={activity} dataModel={dataModel} />;
      }
      case ACTIVITY_TYPES.NOTE: {
        return (
          <NoteDetail
            activity={activity}
            dataModel={dataModel}
            accountId={accountId}
            visibleHeader
          />
        );
      }
      default:
        return (
          <Text color="extraMeeting" align="center" size="s" weight="bold">
            No page available
          </Text>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Button
          iconLeft="arrowLeft"
          size="small"
          color="bloobirds"
          onClick={callback as (e: React.MouseEvent<HTMLElement, MouseEvent>) => void}
          variant="clear"
          uppercase={false}
        >
          Back to list
        </Button>
      </div>
      <div className={styles.detailsContainer}>{getActivityDetail()}</div>
    </div>
  );
};
