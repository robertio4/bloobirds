import { UseTranslationResponse } from 'react-i18next';

import { ColorType } from '@bloobirds-it/flamingo-ui';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { serialize } from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  BobjectId,
  BobjectTypes,
  CADENCE_TYPES_VALUES_LOGIC_ROLE,
  DIRECTION_VALUES_LOGIC_ROLE,
  GroupedActivityInterface,
} from '@bloobirds-it/types';
import {
  getUserTimeZone,
  isDifferentYearThanCurrent,
  isToday,
  removeHtmlTags,
} from '@bloobirds-it/utils';
import { TFunction } from 'i18next';

const getCadenceActivityText = (cadenceValueLR: CADENCE_TYPES_VALUES_LOGIC_ROLE, t: TFunction) => {
  switch (cadenceValueLR) {
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.STARTED:
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.CONFIGURE:
    default:
      return t('activityTimelineItem.item.startedCadence');
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.RESCHEDULE:
      return t('activityTimelineItem.item.rescheduledCadence');
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.STOPPED:
      return t('activityTimelineItem.item.stoppedCadence');
    case CADENCE_TYPES_VALUES_LOGIC_ROLE.ENDED:
      return t('activityTimelineItem.item.endedCadence');
  }
};

export function getSyncName(activityType: GroupedActivityInterface['activityType']) {
  switch (activityType) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return 'email';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return 'meeting';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return 'call';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return 'message';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return 'note';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return 'activity';
  }
}

export function getActivityTypeColor(
  activityTypeLogicRole: ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  activityDirection: DIRECTION_VALUES_LOGIC_ROLE,
  customTaskIconColor,
): ColorType {
  const isOutgoing = activityDirection === DIRECTION_VALUES_LOGIC_ROLE.OUTGOING;
  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      return isOutgoing ? 'lightestTangerine' : 'tangerine';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return 'lightestMeeting';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      return activityDirection === DIRECTION_VALUES_LOGIC_ROLE.MISSED
        ? 'lightestMeeting'
        : 'lightestCall';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return 'verySoftBloobirds';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE:
      return 'banana';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return 'lightestBanana';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE:
      return 'verySoftPurple';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CHANGED_FROM:
      return 'verySoftPurple';
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return customTaskIconColor;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS:
      return 'lightPeanut';
  }
}

export function getActivitySubject(activity, t, customTaskName): string {
  const activityTypeLogicRole = activity.activityType;
  let activitySubject = activity.subject;
  switch (activityTypeLogicRole) {
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.EMAIL:
      if (
        activitySubject?.includes('"type":"p"') &&
        typeof activitySubject === 'string' &&
        typeof JSON.parse(activitySubject) === 'object'
      ) {
        activitySubject = removeHtmlTags(serialize(activitySubject));
      }
      return activitySubject || t('common.noSubject');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING:
      return activity.meetingTitle ? activity.meetingTitle : t('common.meetingArranged');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CALL:
      //TODO meh
      return t(
        'activityTimelineItem.item.' +
          ACTIVITY_DIRECTION[activity.direction?.split('__').at(-1)] +
          'Call',
      );
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.LINKEDIN:
      return activity.body
        ? t('activityTimelineItem.item.linkedinConversation')
        : t('activityTimelineItem.item.manuallyLoggedActivity');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.NOTE: {
      const activityTitle = activity.meetingTitle;
      const activityLeadName = activity.leadName;
      return typeof activityTitle === 'string'
        ? removeHtmlTags(activityTitle)
        : activityLeadName
        ? activityLeadName + ' ' + t('common.note').toLowerCase()
        : t('common.note');
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.INBOUND:
      return t('activityTimelineItem.item.inboundActivity');
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CADENCE: {
      const activityCadenceStatus = getCadenceActivityText(activity.cadenceType, t);
      return activityCadenceStatus ? activityCadenceStatus : '';
    }
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.CUSTOM_TASK:
      return customTaskName;
    case ACTIVITY_TYPES_VALUES_LOGIC_ROLE.STATUS: {
      const activityStatusUpdate = activity.statusTitle;
      return activityStatusUpdate ? activityStatusUpdate : t('common.statusUpdate');
    }
  }
}

export const getBobjectNameProps = (activity: GroupedActivityInterface) => {
  const opportunityName = activity.opportunityName;
  const activityLeadName = activity.leadName;
  const activityCompanyName = activity.companyName;
  //leadInfo
  const activityEmailMetadata = activity.emailMetadata;
  const activityEmailInfo = activityEmailMetadata ? JSON.parse(activityEmailMetadata) : {};
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
  let activityBobjectName = '';
  let activityBobjectType = BobjectTypes.Lead;

  if (activityLeadName) {
    activityBobjectName = activityLeadName;
    if (activityEmailLeads?.length > 0) {
      activityBobjectName += ', ' + activityEmailLeads.join(', ');
    }
  } else if (activityEmailLeads?.length > 0) {
    activityBobjectName += activityEmailLeads.join(', ');
  } else if (opportunityName) {
    activityBobjectName = opportunityName;
    activityBobjectType = BobjectTypes.Opportunity;
  } else if (activityCompanyName) {
    activityBobjectName = activityCompanyName;
    activityBobjectType = BobjectTypes.Company;
  }

  return { activityBobjectName, activityBobjectType };
};

export function getTimeToShow(
  activityTime: Date,
  trans: UseTranslationResponse<'translation', undefined>,
) {
  const { t, i18n } = trans;
  const isDifferentYear = isDifferentYearThanCurrent(activityTime);
  const isThisDay = isToday(activityTime, getUserTimeZone());

  return getI18nSpacetimeLng(i18n?.language, new Date(activityTime)).format(
    isDifferentYear ? t('dates.shortYear') : isThisDay ? '{time-24}' : t('dates.shortMonth'),
  );
}

export function forgeIdFieldsFromIdValue(idValue: BobjectId['value']) {
  const [accountId, typeName, objectId] = idValue.split('/');
  return {
    accountId,
    typeName,
    objectId,
    value: idValue,
  } as BobjectId;
}
