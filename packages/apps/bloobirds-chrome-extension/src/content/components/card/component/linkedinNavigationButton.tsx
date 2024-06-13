import { useTranslation } from 'react-i18next';

import { CardButton, Dropdown, IconButton, Tooltip, useVisible } from '@bloobirds-it/flamingo-ui';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';

import { getFieldByLogicRole, getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { getTaskReferenceBobject } from '../../../../utils/tasks.utils';
import styles from '../card.module.css';

export const getLinkedInUrls = (bobject, bobjectType: BobjectTypes) => {
  switch (bobjectType) {
    case BobjectTypes.Company:
      return [
        getValueFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.LINKEDIN_URL) ||
          bobject.linkedinUrl,
      ];
    case BobjectTypes.Lead: {
      const linkedinUrl =
        getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL) || bobject.linkedinUrl;
      const salesNavUrl =
        getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.SALES_NAV_URL) || bobject.salesNavUrl;
      return [linkedinUrl, salesNavUrl];
    }
    case BobjectTypes.Activity: {
      const referenceBobject =
        getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject ||
        getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;
      return getLinkedInUrls(referenceBobject, referenceBobject.id.typeName as BobjectTypes);
    }
    default: {
      const referenceBobject = getTaskReferenceBobject(bobject);
      if (referenceBobject) {
        return getLinkedInUrls(referenceBobject, referenceBobject.id.typeName as BobjectTypes);
      }
      return [];
    }
  }
};

export const LinkedinNavigationButton = ({ bobject }) => {
  const { t } = useTranslation();
  const bobjectType = bobject?.id.typeName;
  const { ref, visible, setVisible } = useVisible(false);
  const linkedinUrls = getLinkedInUrls(bobject, bobjectType).filter(Boolean);

  const notInLinkedin = !linkedinUrls.length;
  function handleAnchorClick() {
    if (notInLinkedin) return null;
    if (linkedinUrls.length === 2) {
      setVisible(visible => !visible);
    } else window.location.href = linkedinUrls[0];
  }

  return (
    <div className={styles.linkedinDropdown}>
      <Dropdown
        ref={ref}
        visible={visible}
        position="top"
        anchor={
          <Tooltip
            title={
              notInLinkedin
                ? t('extension.card.navigateLinkedinErrorTooltip')
                : t('extension.card.navigateLinkedinTooltip')
            }
            position="top"
          >
            <CardButton
              iconLeft="linkedin"
              dataTest="linkedinButton"
              onClick={handleAnchorClick}
              variant="secondary"
              disabled={notInLinkedin}
            />
          </Tooltip>
        }
      >
        <div>
          <Tooltip title={t('extension.card.openLinkedin')} position="top">
            <IconButton
              name="linkedin"
              color="darkBloobirds"
              size={32}
              onClick={() => (window.location.href = linkedinUrls[0])}
            />
          </Tooltip>
          <Tooltip title={t('extension.card.openLinkedinSalesNav')} position="top">
            <IconButton
              name="compass"
              color="darkBloobirds"
              size={32}
              onClick={() => (window.location.href = linkedinUrls[1])}
            />
          </Tooltip>
        </div>
      </Dropdown>
    </div>
  );
};
