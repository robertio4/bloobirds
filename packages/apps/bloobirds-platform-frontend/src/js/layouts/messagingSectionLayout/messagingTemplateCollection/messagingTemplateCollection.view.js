import React from 'react';
import { useLocation } from 'react-router';

import { Button, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  TEMPLATE_TYPES,
} from '@bloobirds-it/types';
import { handleAddWhatsAppTemplate, openWhatsAppWeb } from '@bloobirds-it/utils';
import { a, useTrail } from '@react-spring/web';
import { useVirtualizer } from '@tanstack/react-virtual';

import {
  APP_PLAYBOOK_MESSAGING_EMAIL_FORM,
  APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM,
  APP_PLAYBOOK_MESSAGING_PITCH_FORM,
  APP_PLAYBOOK_MESSAGING_QQ_FORM,
  APP_PLAYBOOK_MESSAGING_SNIPPET_FORM,
  APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM,
} from '../../../app/_constants/routes';
import EmailButton from '../../../components/emailButton';
import { useContactView, useRouter } from '../../../hooks';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import { copyToClipboard } from '../../../misc/utils';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../../utils/bobjects.utils';
import { convertHtmlToString } from '../../../utils/email.utils';
import MessagingTemplateCard from '../messagingTemplateCard';

const TEMPLATE_FORMS_ROUTES = Object.freeze({
  [TEMPLATE_TYPES.EMAIL]: APP_PLAYBOOK_MESSAGING_EMAIL_FORM,
  [TEMPLATE_TYPES.LINKEDIN]: APP_PLAYBOOK_MESSAGING_LINKEDIN_FORM,
  [TEMPLATE_TYPES.PITCH]: APP_PLAYBOOK_MESSAGING_PITCH_FORM,
  [TEMPLATE_TYPES.SNIPPET]: APP_PLAYBOOK_MESSAGING_SNIPPET_FORM,
  [TEMPLATE_TYPES.QUALIFYING_QUESTION]: APP_PLAYBOOK_MESSAGING_QQ_FORM,
  [TEMPLATE_TYPES.WHATSAPP]: APP_PLAYBOOK_MESSAGING_WHATSAPP_FORM,
});

const TEMPLATE_CARD_ACTIONS = {
  [TEMPLATE_TYPES.EMAIL]: template => (
    <>
      <EmailButton template={template} />
      <EmailButton template={template} isFromBB />
    </>
  ),
  [TEMPLATE_TYPES.LINKEDIN]: (template, selectedLead) => {
    const linkedInLeadLink = getValueFromLogicRole(
      selectedLead,
      LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL,
    );
    const salesNavLink = getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.SALES_NAV_URL);
    const selectedLeadName = getValueFromLogicRole(
      selectedLead,
      LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
      true,
    );
    const company = getFieldByLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
      ?.referencedBobject;
    return (
      <>
        <Button
          size="small"
          onClick={() => {
            if (linkedInLeadLink) {
              window.open(
                linkedInLeadLink + '?bb-messaging-tab-open&templateId=' + template?.id,
                '_blank',
              );
            } else {
              window.open(
                'https://www.linkedin.com/messaging/thread/new/?bbFullName=' +
                  selectedLeadName +
                  '&templateId=' +
                  template?.id +
                  '&leadId=' +
                  selectedLead?.id?.objectId +
                  '&companyId=' +
                  company?.id?.objectId,
                '_blank',
              );
            }
          }}
          iconLeft="linkedin"
          uppercase
        >
          Open in Linkedin
        </Button>
        {salesNavLink && (
          <Button
            size="small"
            onClick={() => {
              window.open(
                salesNavLink + '?bb-messaging-tab-open&templateId=' + template?.id,
                '_blank',
              );
            }}
            iconLeft="compass"
            uppercase
          >
            Open in Sales Navigator
          </Button>
        )}
      </>
    );
  },
  [TEMPLATE_TYPES.SNIPPET]: () => <></>,
  [TEMPLATE_TYPES.PITCH]: () => <></>,
  [TEMPLATE_TYPES.QUALIFYING_QUESTION]: () => <></>,
  [TEMPLATE_TYPES.WHATSAPP]: (template, selectedLead, userName) => {
    const company = getFieldByLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
      ?.referencedBobject;
    const lead = {
      name: getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.NAME, true),
      jobTitle: getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE, true),
      companyName: getValueFromLogicRole(company, COMPANY_FIELDS_LOGIC_ROLE.NAME),
    };

    const phoneNumber = getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.PHONE, true);

    return (
      <Tooltip title={!phoneNumber && 'Set a phone number to use templates'} position="top">
        <Button
          size="small"
          onClick={() => {
            handleAddWhatsAppTemplate(template.id, template.previewContent, lead, userName).then(
              data => {
                if (data) {
                  const text = data.replace(/<(?:br|\/div|\/p)>/g, '%0A').replace(/<.*?>/g, '');
                  openWhatsAppWeb(true, phoneNumber, text);
                }
              },
            );
          }}
          iconLeft="whatsapp"
          uppercase
          disabled={!phoneNumber}
        >
          Open in WhatsApp
        </Button>
      </Tooltip>
    );
  },
};

export const AnimatedCardGroup = ({ children }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: 1,
    x: 0,
    from: { opacity: 0, x: 20, height: 0 },
    leave: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <>
      {trail.map(({ height, ...style }, index) => (
        <a.div key={index} style={style}>
          {items[index]}
        </a.div>
      ))}
    </>
  );
};

const MessagingTemplateCollectionView = ({
  templateCollection,
  templateType,
  type,
  parentRef,
  scrollMargin,
}) => {
  const { history } = useRouter();
  const location = useLocation();
  const { selectedLead } = useSelectedLead();
  const { scrollOffset } = useContactView();

  const { settings } = useActiveUserSettings();
  const userName = settings?.user?.name;

  const virtualizer = useVirtualizer({
    count: templateCollection.length,
    estimateSize: () => 130,
    getScrollElement: () => parentRef?.current,
    overscan: 3,
    scrollMargin,
    initialOffset: scrollOffset,
  });

  const items = virtualizer.getVirtualItems();

  return (
    <div
      style={{
        height: virtualizer.getTotalSize(),
        width: '100%',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transform: `translateY(${items[0].start - virtualizer.options.scrollMargin}px)`,
        }}
      >
        {items.map(virtualRow => {
          const template = templateCollection[virtualRow.index];
          const tempalteBody =
            template.format === 'HTML'
              ? template.content
              : template.previewContent || template.question;
          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
            >
              <MessagingTemplateCard
                key={template?.id}
                templateName={template.name}
                templateSubject={template.previewSubject}
                enabled={template.enabled}
                templateFormat={template.format}
                type={type}
                templateBody={tempalteBody}
                templateType={templateType}
                format={template.format}
                templateStatistics={template.templateStatistics}
                lastUpdated={template.updateDatetime}
                template={template}
                actions={TEMPLATE_CARD_ACTIONS[templateType](template, selectedLead, userName)}
                onClone={() => {
                  const url = `${TEMPLATE_FORMS_ROUTES[templateType]}?mode=CLONE&id=${template?.id}&from=${location.pathname}`;
                  history.push(url);
                }}
                onCopy={() => {
                  const plain = convertHtmlToString(template.previewContent);
                  copyToClipboard({ html: template.previewContent, plain });
                }}
                onEdit={e => {
                  const url = `${TEMPLATE_FORMS_ROUTES[templateType]}?mode=EDITION&id=${template?.id}&from=${location.pathname}`;
                  history.push(url, { event: e });
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

MessagingTemplateCollectionView.defaultProps = {
  templateCollection: [],
  type: 'TEMPLATE_MANAGEMENT',
};

export default MessagingTemplateCollectionView;
