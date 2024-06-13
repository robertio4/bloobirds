import React from 'react';

import { Action, DiscoveryTooltip, Tooltip } from '@bloobirds-it/flamingo-ui';
import { UserHelperKeys, BobjectTypes, Bobject, BobjectType } from '@bloobirds-it/types';

import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { useEntity } from '../../../../hooks';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import { hasRequiredMissing } from '../../../../utils/bobjects.utils';
import styles from '../leadTableActions.module.css';

export const LeadTableMeetingAction = ({
  company,
  lead,
  handleOpenModal,
}: {
  company: Bobject;
  lead: Bobject;
  handleOpenModal: () => void;
}) => {
  const config = useUserSettings();
  const meetingFieldsRequiredEnabled = config.settings.meetingFieldsRequiredEnabled;
  const bobjectFields = useEntity('bobjectFields');
  const bobjectTypes = useBobjectTypes();
  const bobjectConditionalFields = useEntity('bobjectConditionalFields');
  const { has } = useUserHelpers();
  const showTooltip = !has(UserHelperKeys.NEW_MEETING_MODAL);

  const companyHasRequiredMissingInformation = hasRequiredMissing({
    bobjectType: BobjectTypes.Company as BobjectType,
    bobjectTypes,
    bobjectFields,
    bobject: company,
    bobjectConditionalFields,
  });
  const leadHasRequiredMissingInformation = hasRequiredMissing({
    bobjectType: BobjectTypes.Lead as BobjectType,
    bobjectTypes,
    bobjectFields,
    bobject: lead,
    bobjectConditionalFields,
  });
  const meetingShouldBeDisabled =
    meetingFieldsRequiredEnabled &&
    (companyHasRequiredMissingInformation || leadHasRequiredMissingInformation);
  return (
    <Tooltip
      title={
        meetingShouldBeDisabled ? "There's information missing in the selected lead" : 'Meeting'
      }
      position="top"
      trigger="hover"
    >
      <Action
        icon="calendar"
        color="tomato"
        dataTest="calendarButton"
        onClick={handleOpenModal}
        disabled={meetingShouldBeDisabled}
      />
      {showTooltip && (
        <span className={styles.discovery_tooltip}>
          <DiscoveryTooltip.DiscoveryDefaultAnchor />
        </span>
      )}
    </Tooltip>
  );
};
