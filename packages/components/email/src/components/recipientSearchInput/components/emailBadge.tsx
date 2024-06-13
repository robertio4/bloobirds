import React from 'react';
import { useTranslation } from 'react-i18next';

import { Icon, Tag, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useObjectCreationSettings } from '@bloobirds-it/hooks';
import { SmartEmailTab } from '@bloobirds-it/types';
import { isEmail } from '@bloobirds-it/utils';

import { useSmartEmailModal } from '../../../modals/smartEmailModal/smartEmailModal';
import { Contact } from '../recipientSearchInput';
import styles from '../recipientSearchInput.module.css';

function getTooltipText(email, isOutsider, isValidEmail, showAddToDB, t) {
  if (showAddToDB) return t('notRegisteredTooltip');
  if (isOutsider && isValidEmail) return t('outsiderTooltip', { email });
}
export const EmailBadge = ({
  contact,
  unselectEmail,
  isOutsider = false,
}: {
  contact: Contact;
  unselectEmail: () => void;
  isOutsider: boolean;
}) => {
  const { enabledObjectCreation } = useObjectCreationSettings();
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.recipientSearchInput',
  });
  const { newLeadInfo, setNewLeadInfo, setSelectedTab, company } = useSmartEmailModal() || {
    setNewLeadInfo: { email: undefined, company: undefined },
    setSelectedTab: () => null,
  };
  const isSmartEmailEditor = typeof setNewLeadInfo === 'function';
  const isContactOnDatabase = contact.isInDB;
  const isValidEmail = isEmail(contact.email);
  const showAddToDB =
    !contact.isCompanyMember && !isContactOnDatabase && isValidEmail && isSmartEmailEditor;
  const tooltipText = getTooltipText(contact.email, isOutsider, isValidEmail, showAddToDB, t);
  const color = (() => {
    if (!isValidEmail) return 'verySoftTomato';
    else if (contact.isCompanyMember) return 'lightBloobirds';
    else if (showAddToDB) {
      return 'verySoftTangerine';
    } else if (isContactOnDatabase && !isOutsider) {
      return 'lightBloobirds';
    } else {
      return 'softBanana';
    }
  })();

  return (
    <Tooltip title={tooltipText} position="top">
      <Tag
        uppercase={false}
        color={color}
        iconLeft={showAddToDB && enabledObjectCreation ? 'plus' : undefined}
        onClickLeft={() => {
          if (showAddToDB && enabledObjectCreation) {
            setNewLeadInfo({ ...newLeadInfo, email: contact.email, company });
            setSelectedTab(SmartEmailTab.CREATE_LEAD);
          }
        }}
        iconRight="cross"
        onClickRight={e => {
          e.stopPropagation();
          unselectEmail();
        }}
      >
        {showAddToDB ? (
          <Icon name="alertTriangle" color="tangerine" size={16} className={styles.warningIcon} />
        ) : (
          isOutsider &&
          isValidEmail && (
            <Icon name="alertTriangle" color="peanut" size={16} className={styles.warningIcon} />
          )
        )}
        {contact.email}
      </Tag>
    </Tooltip>
  );
};
