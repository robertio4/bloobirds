import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Button, Icon, Spinner } from '@bloobirds-it/flamingo-ui';
import {
  useBaseEmailVariables,
  useBaseSetEmailVariablesValues as useSetEmailVariablesValuesGeneralHook,
  useMinimizableModals,
} from '@bloobirds-it/hooks';
import { BobjectTypes } from '@bloobirds-it/types';
import { getBobjectTypeFromPathname } from '@bloobirds-it/utils';
import { isObject } from 'lodash';
import mixpanel from 'mixpanel-browser';

import { EMAIL_MODE, EMAIL_TYPE } from '../../constants/email';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import { useSendFromMailEnabled } from '../../hooks/useFeatureFlags';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useSelectedLead } from '../../hooks/useSelectedLead';
import { useSelectedOpportunity } from '../../hooks/useSelectedOpportunity';
import { useContactBobjects } from '../../pages/contactPages/contactPageContext';
import { getValueFromLogicRole } from '../../utils/bobjects.utils';
import { createEmailLink, removeHtmlTags } from '../../utils/email.utils';
import { useUserSettings } from '../userPermissions/hooks';
import styles from './emailButton.module.css';

const EmailButton = ({ template, isFromBB, isBlankEmail }) => {
  const settings = useUserSettings();
  const { openMinimizableModal } = useMinimizableModals();
  const { leads, company } = useContactBobjects();
  const { selectedLead: activeLead } = useSelectedLead();
  const type = settings?.settings.mailtoLinksType;
  const leadEmail =
    activeLead && getValueFromLogicRole(activeLead, LEAD_FIELDS_LOGIC_ROLE.EMAIL, true);
  const toEmail = leadEmail ? [leadEmail] : [];
  const { selectedOpportunity } = useSelectedOpportunity();
  const emailVariables = useBaseEmailVariables();
  const setEmailVariablesValueGeneralHook = useSetEmailVariablesValuesGeneralHook();
  const isSendFromMailEnabled = useSendFromMailEnabled();
  const { isSmallDesktop } = useMediaQuery();
  const { pathname } = useLocation();
  const pageBobjectType = getBobjectTypeFromPathname(pathname);

  const emailProvider = useMemo(() => {
    if (type === EMAIL_TYPE.GMAIL) {
      return 'Gmail';
    }
    if (type === EMAIL_TYPE.OUTLOOK) {
      return 'Outlook';
    }
    return 'Mail';
  }, [type]);

  const handleOpenModal = () => {
    setEmailVariablesValueGeneralHook({
      company,
      lead: pageBobjectType === BobjectTypes.Lead || leadEmail ? activeLead : null,
      opportunity: selectedOpportunity,
    });
    openMinimizableModal({
      type: 'email',
      title: template?.subject ? removeHtmlTags(template.previewSubject) : 'New Email',
      data: {
        template: {
          content: template?.content,
          subject: template?.subject || '',
          id: template?.id,
          format: template?.format,
          mediaFiles: template?.mediaFiles,
          name: template?.name || 'Untitled template',
        },
        mode: EMAIL_MODE.SEND,
        isBlankEmail: !!isBlankEmail,
        company,
        leads,
        lead: activeLead,
        opportunity: selectedOpportunity,
        pageBobjectType,
      },
    });
    mixpanel.track(isBlankEmail ? 'NEW_BLANK_EMAIL_CREATED' : 'TEMPLATE_FROM_BB_CREATED', {
      templateId: template?.id,
      'Template Subject': template?.subject,
      'To Email Filled': toEmail.length > 0,
    });
  };

  return isFromBB ? (
    <>
      {isBlankEmail ? (
        <Button
          variant="primary"
          iconLeft={isObject(emailVariables) ? 'plus' : undefined}
          onClick={handleOpenModal}
          disabled={!isObject(emailVariables)}
          color="bloobirds"
        >
          {isObject(emailVariables) ? (
            'Create new Email'
          ) : (
            <Spinner color="white" size={16} name="loadingCircle" />
          )}
        </Button>
      ) : (
        <Button
          iconLeft={isObject(emailVariables) ? 'deliver' : undefined}
          variant="primary"
          size="small"
          color="bloobirds"
          onClick={handleOpenModal}
          dataTest="sendFromBB"
          disabled={!isObject(emailVariables)}
        >
          {isObject(emailVariables) ? (
            !isSmallDesktop && `Send ${isSendFromMailEnabled ? 'from BB' : ''}`
          ) : (
            <Spinner color="white" size={10} name="loadingCircle" />
          )}
        </Button>
      )}
    </>
  ) : (
    <>
      {isSendFromMailEnabled && (
        <Button
          variant="secondary"
          size="small"
          onClick={() => {
            window.open(
              createEmailLink({
                type,
                toEmail,
                subject: template.previewSubject,
                body: template.previewContent,
              }),
            );
            mixpanel.track('TEMPLATE_SENT_FROM_MAIL', {
              templateId: template?.id,
              'Template Subject': template?.subject,
              'To Email Filled': toEmail.length > 0,
              'Link Type': type,
            });
          }}
        >
          <Icon name="deliver" size={16} className={!isSmallDesktop && styles._icon__container} />
          {!isSmallDesktop && `Send from ${emailProvider}`}
        </Button>
      )}
    </>
  );
};

EmailButton.defaultProps = {
  isFromBB: false,
};

export default EmailButton;
