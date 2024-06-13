import React, { useMemo } from 'react';

import { useNoStatusOppSetting } from '@bloobirds-it/hooks';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import useChangeStatus from '../../../../components/changeStatusModal/useChangeStatus';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_OPT_OUT_LOGIC_ROLE,
  OPPORTUNITY_STATUS_LOGIC_ROLE,
} from '../../../../constants/opportunity';
import {
  useBobjectDetails,
  useBobjectFormVisibility,
  useCadenceControl,
  useEntity,
} from '../../../../hooks';
import { useBobjectTypes } from '../../../../hooks/useBobjectTypes';
import {
  getFieldByLogicRole,
  getFieldsByLogicRoles,
  getTextFromLogicRole,
  getValueFromLogicRole,
  hasRequiredMissing,
} from '../../../../utils/bobjects.utils';
import InfoCardTemplate from '../../infoCardTemplate/infoCardTemplate';
import { getOtherFields } from '../../infoCardTemplate/infoCardTemplate.utils';
import { useOpportunityInactive } from './useOpportunityInactive';

const { ASSIGNED_TO, NAME, STATUS, OPT_OUT } = OPPORTUNITY_FIELDS_LOGIC_ROLE;

const REQUIRED_FIELDS = [ASSIGNED_TO, NAME, STATUS, OPT_OUT];

const ACTIVE_STATUS = [
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_LOST,
  OPPORTUNITY_STATUS_LOGIC_ROLE.CLOSED_WON,
];

const useIsInactive = bobject => {
  const valueFromLogicRole = getTextFromLogicRole(bobject, 'OPPORTUNITY__IS_INACTIVE');
  const field = getFieldByLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.STATUS);
  return valueFromLogicRole === 'Yes' && !ACTIVE_STATUS.includes(field?.valueLogicRole);
};

const OpportunityCard = ({ bobject }) => {
  const { openEditModal } = useBobjectFormVisibility();
  const { openBobjectDetails } = useBobjectDetails();
  const { openCadenceControl } = useCadenceControl();
  const bobjectFields = useEntity('bobjectFields');
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const bobjectTypes = useBobjectTypes();
  const bobjectConditionalFields = useEntity('bobjectConditionalFields');
  const isInactive = useIsInactive(bobject);

  const fields = bobject && getFieldsByLogicRoles(bobject, REQUIRED_FIELDS);
  const otherFields = getOtherFields({
    bobjectType: BOBJECT_TYPES.OPPORTUNITY,
    bobjectFields,
    bobjectTypes,
    bobject,
  });

  const hasRequiredMissingInformation = hasRequiredMissing({
    bobjectType: BOBJECT_TYPES.OPPORTUNITY,
    bobjectFields,
    bobjectTypes,
    bobject,
    bobjectConditionalFields,
  });

  const {
    [NAME]: opportunityNameField = {},
    [STATUS]: statusField = {},
    [ASSIGNED_TO]: assignToField = {},
    [OPT_OUT]: optOutField = {},
  } = fields || {};
  const amountOppValue = getValueFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT);
  const currency = useMemo(
    () =>
      bobjectFields.findByLogicRole('OPPORTUNITY__AMOUNT')?.layoutNumberPrefix ||
      bobjectFields.findByLogicRole('OPPORTUNITY__AMOUNT')?.layoutNumberSuffix,
    [bobjectFields],
  );
  const { openChangeStatusModal } = useChangeStatus();
  const isOptOut = optOutField?.valueLogicRole === OPPORTUNITY_OPT_OUT_LOGIC_ROLE.YES;

  return (
    <InfoCardTemplate
      highPriority={null}
      stage={null}
      contextualMenu={null}
      assignTo={assignToField}
      bobject={bobject}
      requiredFields={{
        amount: amountOppValue,
        currency,
      }}
      name={opportunityNameField}
      onStatusClick={() => {
        mixpanel.track(MIXPANEL_EVENTS.CHANGE_OPP_STATUS_MODAL_OPENED);
        openChangeStatusModal(bobject);
      }}
      status={!isNoStatusOppSetting && statusField}
      optOut={isOptOut}
      hasRequiredMissing={hasRequiredMissingInformation}
      otherFields={otherFields}
      handleOnClickName={() => {
        openBobjectDetails({ id: bobject?.id.value });
      }}
      handleOnClickEdit={() => {
        openEditModal({ bobject, onSuccess: openCadenceControl });
      }}
      bobjectName="Opportunity"
      isInactive={isInactive}
    />
  );
};

export default OpportunityCard;
