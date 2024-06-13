import React from 'react';

import { useDialerLauncher } from '@bloobirds-it/dialer';
import { GeneralSearchBar } from '@bloobirds-it/general-search-bar';
import { useMinimizableModals, useWhatsappOpenNewPage } from '@bloobirds-it/hooks';
import {
  BobjectId,
  BobjectTypes,
  LinkedInCompany,
  LinkedInLead,
  MessagesEvents,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  SearchAction,
  SearchActionType,
  SearchBobjectType,
} from '@bloobirds-it/types';
import {
  EMAIL_MODE,
  forgeIdFieldsFromIdValue,
  getExtensionBobjectByIdFields,
  normalizeUrl,
  openPhoneOrDialer,
  openWhatsAppWeb,
} from '@bloobirds-it/utils';

import { clickMessageButton } from '../../../injectors/linkedin/linkedinMessagesFromBBInjector';
import { isLinkedinOrSalesNav } from '../../../utils/url';
import { useExtensionContext } from '../context';

function GeneralSearchBarWrapper() {
  const { setContactViewBobjectId, useGetSettings, useGetDataModel } = useExtensionContext();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const { openDialer } = useDialerLauncher();
  const { openMinimizableModal } = useMinimizableModals();
  const url = normalizeUrl(window.location.href);
  const isLinkedIn = isLinkedinOrSalesNav(url);

  const handleMainBobjectClick = (
    event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>,
    bobject: SearchBobjectType,
  ) => {
    event?.preventDefault();
    event?.stopPropagation();

    if (bobject) {
      setContactViewBobjectId(bobject.rawBobject.id);
    }
  };

  const actionHandler = ({
    action,
    company,
    data,
    bobject,
  }: {
    action: SearchActionType;
    company: LinkedInCompany;
    data: {
      phoneNumber: string;
      linkedInUrl: string;
      salesNavigatorUrl: string;
      forceWsOpenNewPage: boolean;
    };
    bobject?: LinkedInLead;
  }) => {
    const { phoneNumber, linkedInUrl, salesNavigatorUrl, forceWsOpenNewPage } = data;
    const linkedinLeadName = linkedInUrl?.split('/')[4]?.split('?')[0];
    const currentPage = window?.location?.href;
    const isInLeadProfile = currentPage.includes(linkedinLeadName);

    switch (action) {
      case SearchAction.Call:
        openPhoneOrDialer(phoneNumber ?? undefined, settings, openDialer);
        break;
      case SearchAction.Email:
        openMinimizableModal({
          type: 'email',
          title: 'New email',
          data: {
            template: {
              content: '',
              subject: '',
            },
            company,
            ...(bobject?.id?.typeName === BobjectTypes.Lead ? { lead: bobject } : {}),
            mode: EMAIL_MODE.SEND,
            activity: null,
          },
          onSave: () => {
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Activity },
              }),
            );
          },
        });
        break;
      case SearchAction.WhatsApp:
        openWhatsAppWeb(forceWsOpenNewPage, phoneNumber);
        break;
      case SearchAction.LinkedIn:
        if (linkedInUrl) {
          if (isInLeadProfile) {
            clickMessageButton();
          } else {
            window.open(linkedInUrl + '?bb-messaging-tab-open', '_blank');
          }
        } else if (salesNavigatorUrl) {
          window.open(salesNavigatorUrl + '?bb-messaging-tab-open', '_blank');
        } else {
          window.open(
            'https://www.linkedin.com/messaging/thread/new/?bbFullName=' + bobject.fullName,
            '_blank',
          );
        }
        window.open(linkedInUrl ?? 'https://www.linkedin.com', isLinkedIn ? '_self' : '_blank');
        break;
      case SearchAction.Meeting:
        openMinimizableModal({
          type: 'calendarMeeting',
          data: {
            company,
            ...(bobject?.id?.typeName === BobjectTypes.Lead ? { lead: bobject } : {}),
          },
          onSave: () => {
            window.dispatchEvent(
              new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
                detail: { type: BobjectTypes.Activity },
              }),
            );
          },
        });
    }
  };

  const handleActionOnClick = (
    event: MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>,
    action: SearchActionType,
    bobject: SearchBobjectType,
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const oppCompanyFieldId = dataModel.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY)
      ?.id;

    setContactViewBobjectId(bobject?.rawBobject?.id);
    const forceWsOpenNewPage = useWhatsappOpenNewPage(bobject?.id?.accountId);

    const bobjectIdObject: BobjectId = forgeIdFieldsFromIdValue(bobject?.rawBobject?.id);
    getExtensionBobjectByIdFields(bobjectIdObject).then(
      ({ data: extensionBobject }: { data: LinkedInLead }) => {
        const data = {
          phoneNumber: extensionBobject?.phoneNumbers?.[0],
          linkedInUrl: extensionBobject?.linkedInUrl,
          salesNavigatorUrl: extensionBobject?.salesNavigatorUrl,
          forceWsOpenNewPage,
        };

        if (extensionBobject?.id?.typeName === BobjectTypes.Company) {
          actionHandler({ action, company: extensionBobject, data });
          return;
        } else {
          const companyIdObject = forgeIdFieldsFromIdValue<BobjectTypes.Company>(
            (extensionBobject?.companyId ??
              extensionBobject?.rawBobject[oppCompanyFieldId]) as BobjectId<
              BobjectTypes.Company
            >['value'],
          );

          getExtensionBobjectByIdFields(companyIdObject).then(({ data: company }) => {
            actionHandler({ action, company, bobject: extensionBobject, data });
            return;
          });
        }
      },
    );
  };

  return <GeneralSearchBar actions={{ handleMainBobjectClick, handleActionOnClick }} />;
}

export default GeneralSearchBarWrapper;
