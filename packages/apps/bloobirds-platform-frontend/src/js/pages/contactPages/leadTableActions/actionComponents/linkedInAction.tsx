import React from 'react';
import { Action, Dropdown, IconButton, Tooltip, useVisible } from '@bloobirds-it/flamingo-ui';
import styles from '../leadTableActions.module.css';
import { Bobject } from '../../../../typings/bobjects';
import { getValueFromLogicRole } from '../../../../utils/bobjects.utils';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';

export const LeadTableLinkedInAction = ({ selectedLead }: { selectedLead: Bobject }) => {
  const { ref, visible, setVisible } = useVisible();
  const selectedLeadName = getValueFromLogicRole(
    selectedLead,
    LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
    true,
  );
  const linkedInLeadLink = getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.LINKEDIN_URL);
  const salesNavLink = getValueFromLogicRole(selectedLead, LEAD_FIELDS_LOGIC_ROLE.SALES_NAV_URL);

  const linkedinButtonIsDirectLink =
    (salesNavLink && !linkedInLeadLink) ||
    (linkedInLeadLink && !salesNavLink) ||
    (!linkedInLeadLink && !salesNavLink);

  return (
    <div className={styles.fakeTooltipClass}>
      {linkedinButtonIsDirectLink ? (
        <Action
          icon="linkedin"
          color="darkBloobirds"
          dataTest="linkedinButton"
          onClick={() => {
            if (linkedInLeadLink) {
              window.open(linkedInLeadLink + '?bb-messaging-tab-open', '_blank');
            } else if (salesNavLink) {
              window.open(salesNavLink + '?bb-messaging-tab-open', '_blank');
            } else {
              window.open(
                'https://www.linkedin.com/messaging/thread/new/?bbFullName=' + selectedLeadName,
                '_blank',
              );
            }
          }}
        />
      ) : (
        <Dropdown
          ref={ref}
          visible={visible}
          position="top"
          anchor={
            <Action
              icon="linkedin"
              color="darkBloobirds"
              dataTest="linkedinButton"
              onClick={() => setVisible(visible => !visible)}
            />
          }
        >
          <div className={styles.linkedinIcons}>
            <Tooltip title="Open in Linkedin" position="top">
              <IconButton
                name="linkedin"
                color="darkBloobirds"
                size={32}
                onClick={() => window.open(linkedInLeadLink + '?bb-messaging-tab-open', '_blank')}
              />
            </Tooltip>
            <Tooltip title="Open in Sales Navigator" position="top">
              <IconButton
                name="compass"
                color="darkBloobirds"
                size={32}
                onClick={() => window.open(salesNavLink + '?bb-messaging-tab-open', '_blank')}
              />
            </Tooltip>
          </div>
        </Dropdown>
      )}
    </div>
  );
};
