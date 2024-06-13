import { useRef } from 'react';
import ReactDOM from 'react-dom';

import { NotificationsDisplay } from '@bloobirds-it/misc';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  ContactViewSubTab,
  MessagesEvents,
  Notification,
  NotificationsTypes,
  PluralBobjectTypes,
  SalesforceTabs,
} from '@bloobirds-it/types';
import { injectReferencesGetProcess } from '@bloobirds-it/utils';

import { ExtendedContextTypes } from '../../../types/extendedContext';
import { api } from '../../../utils/api';
import { getTextFromLogicRole } from '../../../utils/bobjects.utils';
import { useExtensionContext } from '../context';
import { useExtensionLeftBarContext } from '../extensionLeftBar/extensionLeftBarContext';

function getType(notificationType: NotificationsTypes): ExtendedContextTypes {
  switch (notificationType) {
    case NotificationsTypes.NEW_EMAIL:
    case NotificationsTypes.EMAIL_CLICKED:
    case NotificationsTypes.EMAIL_OPENED:
      return ExtendedContextTypes.EMAIL_THREAD;
    case NotificationsTypes.NEW_LINKEDIN:
      return ExtendedContextTypes.LINKEDIN_THREAD;
    case NotificationsTypes.REPORT_CALL:
    case NotificationsTypes.MISSED_CALL_UNKNOWN:
    case NotificationsTypes.MISSED_CALL_LEAD:
      return ExtendedContextTypes.CALL_DETAILS;
    case NotificationsTypes.MEETING_DONE:
    case NotificationsTypes.MEETING_ACCEPTED:
    case NotificationsTypes.MEETING_DELETED:
    case NotificationsTypes.MEETING_CANCELLED:
    case NotificationsTypes.MEETING_RESCHEDULED:
      return ExtendedContextTypes.MEETING_DETAILS;
    case NotificationsTypes.NEW_INBOUND:
      return ExtendedContextTypes.INBOUND_ACTIVITY;
    default:
      return null;
  }
}

function getReferencedBobjectId(bobject) {
  const relatedCompany = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY);
  const relatedLead = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD);
  const relatedOpportunity = getTextFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY);
  const getMainBobject = () => {
    if (relatedOpportunity) return relatedOpportunity;
    if (relatedLead) return relatedLead;
    if (relatedCompany) return relatedCompany;
    return null;
  };
  return getMainBobject();
}
export const NotificationsWrapper = () => {
  const {
    setExtendedContext,
    setContactViewBobjectId,
    useGetExtendedContext,
    setForcedActiveSubTab,
  } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const { setCurrentTab, setCurrentSubTab } = useExtensionLeftBarContext();
  const handleCardClick = (notification: Notification) => {
    window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));

    if ([NotificationsTypes.NEW_INBOUND_LEAD].includes(notification.type)) {
      setContactViewBobjectId(
        `${notification.accountId}/Lead/${notification.url.split('/').at(-1)}`,
      );
    } else if (
      [NotificationsTypes.LEAD_ASSIGNED, NotificationsTypes.COMPANY_ASSIGNED].includes(
        notification.type,
      )
    ) {
      setCurrentTab(SalesforceTabs.PIPELINE);
      setCurrentSubTab(
        PluralBobjectTypes[
          notification.type === NotificationsTypes.LEAD_ASSIGNED
            ? BobjectTypes.Lead
            : BobjectTypes.Company
        ],
      );
    } else {
      const type = getType(notification.type);
      api
        .get(
          `/bobjects/${notification.accountId}/Activity/${notification.objectId}/form?injectReferences=true`,
        )
        .then(({ data }) => {
          const referencedBobjectIdValue = getReferencedBobjectId(data as Bobject);
          setContactViewBobjectId(referencedBobjectIdValue);
          setForcedActiveSubTab(ContactViewSubTab.ACTIVITIES);
          if (
            extendedContext.type !== type ||
            extendedContext.bobject?.id.value !== data?.id.value
          ) {
            const bobject = injectReferencesGetProcess(data as Bobject);
            setExtendedContext({
              type,
              bobject,
            });
          }
        });
    }
  };

  const ref = useRef<HTMLDivElement>();
  ref.current = document.getElementById('placeholder-div') as HTMLDivElement;

  if (ref.current) {
    return ReactDOM.createPortal(
      <NotificationsDisplay onCardClick={handleCardClick} />,
      ref.current,
    );
  } else return null;
};
