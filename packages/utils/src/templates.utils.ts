import {
  MessagingTemplate,
  MIXPANEL_EVENTS,
  BobjectTypes,
  PlaybookTab,
  TemplateButtonProps,
  LinkedInLead,
  BobjectId,
  Environment,
} from '@bloobirds-it/types';
import { TFunction } from 'i18next';
import mixpanel from 'mixpanel-browser';

import { api } from './api';
import { isComposedId } from './bobjects.utils';
import { baseUrls } from './url.utils';
import { openWhatsAppWeb } from './whatsapp.utils';

const leadNameVariables = ['{Lead-Name}', '{Lead Name}', '{Lead: Name}'];
const companyNameVariables = [
  '{Company-Name}',
  '{Company Name}',
  '{Company: Name}',
  '{Lead-Company Name}',
  '{Lead: Company Name}',
];
const jobTitleVariables = ['{Lead-Job title}', '{Lead Job title}', '{Lead: Job title}'];
const surnameVarialbes = ['{Lead Surname}', '{Lead-Surname}', '{Lead: Surname}'];
const fullNameVariables = ['{Lead Full name}', '{Lead-Full name}', '{Lead: Full name}'];
const userNameVariables = ['{User Name}', '{User-Name}', '{User: Name}'];

export const replaceWithContent = (
  content: any,
  leadName: string,
  leadJobTitle: string,
  leadCompanyName: string,
  userName: string,
) => {
  let newContent = content;
  if (leadName) {
    leadNameVariables.forEach(
      variable => (newContent = newContent.replace(variable, leadName?.split(' ')?.[0])),
    );
    surnameVarialbes.forEach(
      variable => (newContent = newContent.replace(variable, leadName?.replace(/^[^ ]* /, ''))),
    );
    fullNameVariables.forEach(
      variable => (newContent = newContent.replace(variable, leadName?.split(' ')?.[0])),
    );
  }
  if (leadJobTitle) {
    jobTitleVariables.forEach(
      variable => (newContent = newContent.replace(variable, leadJobTitle)),
    );
  }
  if (leadCompanyName) {
    companyNameVariables.forEach(
      variable => (newContent = newContent.replace(variable, leadCompanyName)),
    );
  }
  if (userName) {
    userNameVariables.forEach(variable => (newContent = newContent.replace(variable, userName)));
  }
  return newContent;
};

export const serializeMessagingTemplate = (
  templateId: string,
  leadId: BobjectId['objectId'],
  companyId: string,
) => {
  let query = '';
  if (leadId && companyId) {
    const companyIdValue = isComposedId(companyId) ? companyId?.split('/')?.[2] : companyId;
    query = `?leadId=${leadId}&companyId=${companyIdValue}`;
  } else if (leadId) {
    query = `?leadId=${leadId}`;
  } else if (companyId) {
    const companyIdValue = isComposedId(companyId) ? companyId?.split('/')?.[2] : companyId;
    query = `?companyId=${companyIdValue}`;
  }
  return api.get(`/messaging/messagingTemplates/${templateId}/serialize${query}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
    },
    data: {},
  });
};

export function generateTemplateURL(id, tabSelected, linkedInURL, userCanEdit) {
  const baseUrl = baseUrls[process.env.NODE_ENV];
  switch (tabSelected) {
    case PlaybookTab.PITCHES:
      return userCanEdit
        ? [`${baseUrl}/app/playbook/messaging/pitch/form?mode=EDITION&id=${id}`]
        : [`${baseUrl}/app/playbook/messaging/pitch`];
    case PlaybookTab.SNIPPETS:
      return userCanEdit
        ? [`${baseUrl}/app/playbook/messaging/snippet/form?mode=EDITION&id=${id}`]
        : [`${baseUrl}/app/playbook/messaging/snippet`];
    case PlaybookTab.EMAILS:
      return userCanEdit
        ? [`${baseUrl}/app/playbook/messaging/email/form?mode=EDITION&id=${id}`]
        : [`${baseUrl}/app/playbook/messaging/email`];
    case PlaybookTab.LINKEDIN:
      return userCanEdit
        ? [`${baseUrl}/app/playbook/messaging/linkedin/form?mode=EDITION&id=${id}`, linkedInURL]
        : [`${baseUrl}/app/playbook/messaging/linkedin`, linkedInURL];
    case PlaybookTab.WHATSAPP:
      return userCanEdit
        ? [`${baseUrl}/app/playbook/messaging/whatsapp/form?mode=EDITION&id=${id}`]
        : [`${baseUrl}/app/playbook/messaging/whatsapp`];
    case PlaybookTab.QQS:
      return userCanEdit
        ? [`${baseUrl}/app/playbook/messaging/qq/form?mode=EDITION&id=${id}`]
        : [`${baseUrl}/app/playbook/messaging/qq`];
    default:
      return [''];
  }
}

let contador = 0;
export const insertTextWhatsApp = (
  forceWsOpenNewPage: boolean,
  selector = '#main .copyable-area [contenteditable="true"][role="textbox"]',
  phoneNumber: string,
  text?: string,
) => {
  const messageBox: HTMLDivElement = document.querySelector(selector);
  let textToAdd = text ?? phoneNumber;

  textToAdd = textToAdd.replace(/<(?:br|\/div|\/p)>/g, '\n').replace(/<.*?>/g, '');

  const event = new InputEvent('input', {
    bubbles: true,
    data: textToAdd,
  });

  messageBox?.focus();
  document.execCommand('selectAll'); // It's necessary for replacing the content

  setTimeout(() => {
    messageBox.dispatchEvent(event);
  }, 50);

  if (
    messageBox?.innerText?.replaceAll('\n', '') !== textToAdd?.replaceAll('\n', '') &&
    contador < 10
  ) {
    contador++;
    setTimeout(() => insertTextWhatsApp(forceWsOpenNewPage, selector, phoneNumber, text), 100);
    console.warn('Text not inserted correctly, trying again...', contador);
    if (contador === 10) {
      openWhatsAppWeb(forceWsOpenNewPage, phoneNumber, text ?? '');
    }
  } else {
    messageBox.dispatchEvent(new Event('blur'));
    contador = 0;
  }
};

export const handleAddWhatsAppTemplate = (
  id: string,
  fallbackContent: any,
  lead: LinkedInLead,
  userName: string,
  callback?: () => void,
) => {
  return serializeMessagingTemplate(id, lead?.id?.objectId, null)
    .then(data => {
      const content = data?.data?.serializedTemplate;
      callback?.();
      return Promise.resolve(
        replaceWithContent(content, lead?.name, lead?.jobTitle, lead?.companyName, userName),
      );
    })
    .catch(() => {
      callback?.();
      return Promise.resolve(
        replaceWithContent(
          fallbackContent,
          lead?.name,
          lead?.jobTitle,
          lead?.companyName,
          userName,
        ),
      );
    });
};

export function getTemplateTypeButtons({
  template,
  tabSelected,
  linkedInURL,
  handleEmailModal,
  isSEE = false,
  userCanEdit,
  templateFunctions,
  t,
  whatsappData,
  environment,
}: {
  template: MessagingTemplate;
  tabSelected: PlaybookTab;
  linkedInURL: string;
  handleEmailModal: (template: MessagingTemplate) => void;
  isSEE: boolean;
  userCanEdit?: boolean;
  templateFunctions: {
    editTemplate?: (template: MessagingTemplate) => void;
    insertTemplate?: (template: MessagingTemplate) => void;
    replaceTemplate?: (template: MessagingTemplate) => void;
  };
  t: TFunction;
  environment: Environment;
  whatsappData?: {
    phoneNumber: string;
    isSameActiveLead: boolean;
    userName: string;
    lead: LinkedInLead;
  };
}): Array<TemplateButtonProps> {
  const url = generateTemplateURL(template?.id, tabSelected, linkedInURL, userCanEdit);
  const isLinkedinPage = window.location.href.includes('linkedin');
  const { phoneNumber, isSameActiveLead, userName, lead } = whatsappData || {
    phoneNumber: null,
    isSameActiveLead: false,
    userName: null,
    lead: null,
  };

  const handleClick =
    templateFunctions?.editTemplate && template?.format !== 'HTML'
      ? e => {
          e.stopPropagation();
          templateFunctions?.editTemplate?.(template);
        }
      : e => {
          e.stopPropagation();
          window.open(url[0]);
        };

  switch (tabSelected) {
    case PlaybookTab.PITCHES:
      return [
        {
          tooltipText:
            !userCanEdit && t('extendedScreen.templateDetail.headerButtons.userCantEdit'),
          buttonText: t('extendedScreen.templateDetail.headerButtons.edit'),
          name: 'edit',
          color: !userCanEdit ? undefined : 'purple',
          onClick: handleClick,
          disabled: !userCanEdit,
        },
      ];
    case PlaybookTab.SNIPPETS:
      return [
        {
          tooltipText: !userCanEdit
            ? t('extendedScreen.templateDetail.headerButtons.userCantEdit')
            : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
          name: 'edit',
          color: !userCanEdit ? undefined : 'purple',
          onClick: handleClick,
          disabled: !userCanEdit,
        },
        !isSEE && {
          tooltipText: t('extendedScreen.templateDetail.headerButtons.sendEmail'),
          buttonText: t('extendedScreen.templateDetail.headerButtons.send'),
          color: !userCanEdit ? undefined : 'purple',
          name: 'send',
          onClick: e => {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_SNIPPET_ON_PLAYBOOK);
            handleEmailModal(template);
          },
          disabled: !userCanEdit,
        },
      ];
    case PlaybookTab.EMAILS:
      return [
        {
          tooltipText: !userCanEdit
            ? t('extendedScreen.templateDetail.headerButtons.userCantEdit')
            : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
          name: 'edit',
          color: !userCanEdit ? undefined : 'purple',
          onClick: handleClick,
          disabled: !userCanEdit,
        },
        !isSEE && {
          tooltipText: t('extendedScreen.templateDetail.headerButtons.sendEmail'),
          buttonText: t('extendedScreen.templateDetail.headerButtons.send'),
          color: !userCanEdit ? undefined : 'purple',
          name: 'send',
          onClick: e => {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_TEMPLATE_ON_PLAYBOOK);
            handleEmailModal(template);
          },
          disabled: !userCanEdit,
        },
      ];
    case PlaybookTab.LINKEDIN:
      return [
        {
          tooltipText: !userCanEdit
            ? t('extendedScreen.templateDetail.headerButtons.userCantEdit')
            : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
          color: !userCanEdit ? undefined : 'purple',
          name: 'edit',
          onClick: handleClick,
          disabled: !userCanEdit,
        },
        {
          tooltipText: t('extendedScreen.templateDetail.headerButtons.openInLinkedin'),
          buttonText: t('extendedScreen.templateDetail.headerButtons.openInLinkedin'),
          name: 'linkedin',
          color: !userCanEdit ? undefined : 'purple',
          onClick: e => {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_LINKEDIN_ON_PLAYBOOK);
            environment === Environment.LINKEDIN_TEMPLATE_SELECTOR
              ? templateFunctions?.replaceTemplate?.(template)
              : window.open(url[1], isLinkedinPage ? '_self' : '_blank');
          },
          disabled: !userCanEdit,
        },
      ];
    case PlaybookTab.WHATSAPP:
      return [
        {
          tooltipText: !userCanEdit
            ? t('extendedScreen.templateDetail.headerButtons.userCantEdit')
            : t('extendedScreen.templateDetail.headerButtons.editInBloobirds'),
          color: !userCanEdit ? undefined : 'purple',
          name: 'edit',
          onClick: handleClick,
          disabled: !userCanEdit,
        },
        {
          tooltipText: phoneNumber
            ? t('extendedScreen.templateDetail.headerButtons.openInWhatsapp')
            : t('extendedScreen.templateDetail.headerButtons.noPhoneNumber'),
          buttonText: t('extendedScreen.templateDetail.headerButtons.openInWhatsapp'),
          name: 'whatsapp',
          color: !userCanEdit ? undefined : 'purple',
          onClick: e => {
            e.stopPropagation();
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_USE_WHATSAPP_ON_PLAYBOOK);
            if (environment === Environment.WHATSAPP_TEMPLATE_SELECTOR) {
              templateFunctions?.replaceTemplate?.(template);
            } else {
              if (phoneNumber) {
                handleAddWhatsAppTemplate(
                  template.id,
                  template.previewContent,
                  lead,
                  userName,
                ).then(data => {
                  if (data) {
                    const forceWsOpenNewPage = true;
                    if (isSameActiveLead) {
                      insertTextWhatsApp(
                        forceWsOpenNewPage,
                        '#main .copyable-area [contenteditable="true"][role="textbox"]',
                        phoneNumber,
                        data,
                      );
                    } else {
                      const text = data.replace(/<(?:br|\/div|\/p)>/g, '%0A').replace(/<.*?>/g, '');
                      openWhatsAppWeb(forceWsOpenNewPage, phoneNumber, text);
                    }
                  }
                });
              }
            }
          },
          disabled: !userCanEdit || !whatsappData?.phoneNumber,
        },
      ];

    default:
      return [];
  }
}

export function getLinkedInURL(id, company, leads, activeBobject) {
  if (activeBobject?.id?.typeName === BobjectTypes.Lead) {
    return activeBobject?.linkedInUrl
      ? activeBobject?.linkedInUrl + '?bb-messaging-tab-open&templateId=' + id
      : 'https://www.linkedin.com/messaging/thread/new/?bbFullName=' +
        activeBobject?.fullName +
        '&templateId=' +
        id +
        '&leadId=' +
        activeBobject?.id?.objectId +
        '&companyId=' +
        company?.id?.objectId
      ? '&companyId=' + company?.id?.objectId
      : '';
  }
  if (!leads)
    return (
      'https://www.linkedin.com/messaging/thread/new/?bbFullName=undefined&templateId=' +
      id +
      '&leadId=undefined&companyId=' +
      activeBobject?.id?.objectId
    );
  return leads[0]?.linkedInUrl
    ? leads[0]?.linkedInUrl + '?bb-messaging-tab-open&templateId=' + id
    : 'https://www.linkedin.com/messaging/thread/new/?bbFullName=' +
        leads[0]?.fullName +
        '&templateId=' +
        id +
        '&leadId=' +
        leads[0]?.id?.objectId +
        '&companyId=' +
        activeBobject?.id?.objectId;
}
