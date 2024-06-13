import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { useCadences, useIsB2CAccount } from '@bloobirds-it/hooks';
import { serialize } from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectTypes,
  GroupedActivityInterface,
} from '@bloobirds-it/types';
import { convertHtmlToString, removeHtmlTags } from '@bloobirds-it/utils';
import clsx from 'clsx';

import {
  forgeIdFieldsFromIdValue,
  getBobjectNameProps,
} from '../../../utils/activityTimeline.utils';
import styles from '../activityTimelineItem.module.css';
import { BobjectName } from './cardIcons';
import { EmailDetailsDropdown } from './emailDetailsDropdown';

export const DescriptionComponent = ({
  activity,
  sidePeekEnabled,
  alternativeDescription,
}: {
  activity: GroupedActivityInterface;
  sidePeekEnabled: boolean;
  alternativeDescription: boolean;
}) => {
  const isB2CAccount = useIsB2CAccount();
  const { t } = useTranslation();
  const { cadences } = useCadences(
    getBobjectNameProps(activity)?.activityBobjectType,
    forgeIdFieldsFromIdValue(activity?.bobjectId)?.accountId,
    undefined,
    undefined,
    undefined,
    true,
  );
  const activityTypeLogicRole = activity.activityType;
  const descriptionClass = clsx(styles.descriptionContainer, {
    [styles.descriptionContainerSidePeek]: sidePeekEnabled,
  });
  const activityLeadName = activity.leadName;
  const activityNote = activity.note;
  let activityBody = activity.body;
  const opportunityName = activity.opportunityName;
  const opportunityStage = activity.opportunityStage;

  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL: {
      if (
        activityBody?.includes('"type":"p"') &&
        typeof activityBody === 'string' &&
        typeof JSON.parse(activityBody) === 'object'
      ) {
        activityBody = serialize(activityBody);
      }
      const cleanedBody = convertHtmlToString(activityBody?.replace(/<head>[\s\S]*?<\/head>/g, ''));
      let activitySubject = activity.subject;
      if (
        activitySubject?.includes('"type":"p"') &&
        typeof activitySubject === 'string' &&
        typeof JSON.parse(activitySubject) === 'object'
      ) {
        activitySubject = removeHtmlTags(serialize(activitySubject));
      }

      const activityEmailMetadata = activity.emailMetadata;
      const activityEmailInfo = activityEmailMetadata ? JSON.parse(activityEmailMetadata) : {};
      const activityTime = activityEmailInfo?.date;
      const activityLeadEmail = activity.leadEmail;
      const activityEmailLeads: Array<string> = [];
      if (activityEmailMetadata) {
        if (activityEmailInfo?.to?.length > 0) {
          activityEmailInfo.to.map((to: { name: string; email: string }) => {
            if (to.name && to.name !== activityLeadName) activityEmailLeads.push(to.name);
            else if (to.email && to.email !== activityLeadEmail)
              activityEmailLeads.push(to.email.split('@')[0]);
          });
        }
        if (activityEmailInfo?.cc?.length > 0) {
          activityEmailInfo.cc.map((cc: { name: string; email: string }) => {
            if (cc.name && cc.name !== activityLeadName) activityEmailLeads.push(cc.name);
            else if (cc.email && cc.email !== activityLeadEmail)
              activityEmailLeads.push(cc.email.split('@')[0]);
          });
        }
      }
      return (
        <div className={descriptionClass}>
          <BobjectName {...getBobjectNameProps(activity)} ellipsis="80%" />
          <EmailDetailsDropdown
            metadata={activityEmailInfo}
            date={activityTime}
            subject={activitySubject}
          />
          {activityBody && (activityEmailLeads.length === 0 || sidePeekEnabled) && (
            <div>
              <span>{activityBody ? cleanedBody : null}</span>
            </div>
          )}
        </div>
      );
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING: {
      const meetingResult = activity.meetingResult;
      return (
        <div className={descriptionClass}>
          {activityLeadName ? <BobjectName activityBobjectName={activityLeadName} /> : <div></div>}
          <div>
            {meetingResult && <b>{meetingResult}</b>}
            {activityNote && (
              <span>
                <b>{t('common.note')}: </b> {convertHtmlToString(activityNote)}
              </span>
            )}
          </div>
        </div>
      );
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL: {
      const activityCompanyName = activity.companyName;
      const callResult = activity.callResult;

      return alternativeDescription ? (
        <Text size="xxs" color="softPeanut">
          {t('common.callWith') +
            ' ' +
            activityLeadName +
            ' ' +
            (activityCompanyName ? t('common.from') + ' ' + activityCompanyName : '')}
        </Text>
      ) : (
        <div className={descriptionClass}>
          {activityLeadName && <BobjectName activityBobjectName={activityLeadName} />}
          {callResult && <b>{callResult}</b>}
          {activityNote && !!convertHtmlToString(activityNote) && (
            <span>
              <b>{t('common.note')}:</b>
              {convertHtmlToString(activityNote)}
            </span>
          )}
          {!callResult && !activityNote && <div></div>}
        </div>
      );
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return (
        <div className={descriptionClass}>
          {activityLeadName && <BobjectName activityBobjectName={activityLeadName} />}
          <div>
            <span>
              {alternativeDescription
                ? ''
                : activityBody
                ? activityBody === 'undefined'
                  ? t('linkedInDetail.messageNotAvailable')
                  : activityBody
                : activityNote
                ? activityNote
                : null}
            </span>
          </div>
        </div>
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE: {
      const activityCompanyName = activity.companyName;
      return (
        <div className={descriptionClass}>
          {activityLeadName && <BobjectName activityBobjectName={activityLeadName} />}
          {!isB2CAccount && activityCompanyName && !activityLeadName && (
            <BobjectName
              activityBobjectType={BobjectTypes.Company}
              activityBobjectName={activityCompanyName}
            />
          )}
          {sidePeekEnabled && activityNote && (
            <div>
              <span>{removeHtmlTags(activityNote)}</span>
            </div>
          )}
        </div>
      );
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND: {
      return activityLeadName && <BobjectName activityBobjectName={activityLeadName} />;
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE: {
      const activityCadence = activity.cadence;
      const activityCadenceName = cadences?.find(cadence => cadence.id === activityCadence)?.name;
      return (
        <div className={descriptionClass}>
          {activityLeadName && <BobjectName activityBobjectName={activityLeadName} />}
          <div>
            <span>{activityCadenceName ? `"${activityCadenceName}"` : ''}</span>
          </div>
        </div>
      );
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS: {
      return (
        <div className={descriptionClass}>
          {(activityLeadName || opportunityName) && (
            <BobjectName
              activityBobjectName={opportunityName ? opportunityName : activityLeadName}
              activityBobjectType={opportunityName ? BobjectTypes.Opportunity : BobjectTypes.Lead}
            />
          )}
          <div>{opportunityStage && <b>{opportunityStage}</b>}</div>
        </div>
      );
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return (
        <div className={descriptionClass}>
          {(activityLeadName || opportunityName) && (
            <BobjectName
              activityBobjectName={opportunityName ? opportunityName : activityLeadName}
              activityBobjectType={opportunityName ? BobjectTypes.Opportunity : BobjectTypes.Lead}
            />
          )}
          <div>
            {activityNote && (
              <span>
                <b>{t('common.note') + ': '}</b> {activityNote}
              </span>
            )}
            {activityBody && <span>{activityBody}</span>}
          </div>
        </div>
      );
    default:
      return <></>;
  }
};
