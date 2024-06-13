import React from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '@bloobirds-it/flamingo-ui';
import { useBaseSetEmailVariablesValues, useMinimizableModals } from '@bloobirds-it/hooks';
import { getBobjectTypeFromPathname } from '@bloobirds-it/utils';

import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES,
} from '../../../../constants/activity';
import { EMAIL_MODE } from '../../../../constants/email';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../../../constants/lead';
import { useSelectedLead } from '../../../../hooks/useSelectedLead';
import { useContactBobjects } from '../../../../pages/contactPages/contactPageContext';
import {
  getReferencedBobjectFromLogicRole,
  getValueFromLogicRole,
} from '../../../../utils/bobjects.utils';
import styles from './activityEmailActions.module.css';

const ActivityEmailActions = ({ bobject }) => {
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const { openMinimizableModal } = useMinimizableModals();
  const { company, leads, opportunities } = useContactBobjects();
  const { selectedLead } = useSelectedLead();
  const activityType = getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE, true);
  const activityDirection =
    activityType === ACTIVITY_TYPES.EMAIL
      ? getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION, true)
      : undefined;
  const { pathname } = useLocation();
  const pageBobjectType = getBobjectTypeFromPathname(pathname);

  const handleOpenEmailModal = () => {
    const activityLead = getReferencedBobjectFromLogicRole(
      bobject,
      ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
    );
    const activityOpportunity = getReferencedBobjectFromLogicRole(
      bobject,
      ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY,
    );
    const lead = activityLead || selectedLead;

    const leadOpportunity = getReferencedBobjectFromLogicRole(
      lead,
      LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY,
    );
    const opportunity = activityOpportunity || leadOpportunity || opportunities?.[0];

    setEmailVariablesValue({ company, lead, opportunity });

    const subject = getValueFromLogicRole(
      bobject,
      ACTIVITY_FIELDS_LOGIC_ROLE.MESSAGE_SUBJECT,
      true,
    );
    openMinimizableModal({
      type: 'email',
      title: 'New Email',
      data: {
        template: {
          id: null,
          content: '',
          subject,
        },
        mode: EMAIL_MODE.REPLY,
        activity: bobject,
        company,
        leads,
        lead,
        pageBobjectType,
      },
    });
  };

  return (
    <div className={styles._edit_container}>
      {activityType === ACTIVITY_TYPES.EMAIL && (
        <div className={styles._reply__container}>
          <Button size="small" variant="primary" onClick={handleOpenEmailModal} iconLeft="reply">
            {activityDirection === ACTIVITY_DIRECTION.INCOMING
              ? 'Reply from BB'
              : 'Send another email'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityEmailActions;
