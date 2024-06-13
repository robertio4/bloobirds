import React from 'react';
import { Tooltip, Icon } from '@bloobirds-it/flamingo-ui';
import { getFieldByLogicRole, getValueFromLogicRole } from '../../utils/bobjects.utils';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../../constants/activity';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../constants/opportunity';

const OpportunityIcon = ({ bobject, color = 'peanut' }) => {
  const opportunity = getFieldByLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.referencedBobject;
  const opportunityName = getValueFromLogicRole(opportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME);

  return opportunityName ? (
    <Tooltip title={`Lead with opporutnity: ${opportunityName}`} position="top">
      <Icon name="fileOpportunity" size={18} color={color} />
    </Tooltip>
  ) : null;
};

export default OpportunityIcon;
