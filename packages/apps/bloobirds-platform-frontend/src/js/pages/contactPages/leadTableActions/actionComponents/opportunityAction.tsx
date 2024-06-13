import React from 'react';
import { Action, Tooltip } from '@bloobirds-it/flamingo-ui';
import { BobjectType } from '../../../../typings/bobjects';
import { useFullSalesEnabled } from '../../../../hooks/useFeatureFlags';
import { useContactBobjects } from '../../contactPageContext';
import { getFieldByLogicRole } from '../../../../utils/bobjects.utils';
import { BobjectTypes, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { COMPANY_STAGE_LOGIC_ROLE } from '../../../../constants/company';
import { LEAD_STAGE_LOGIC_ROLE } from '../../../../constants/lead';

export const LeadTableOpportunityAction = ({
  bobjectType,
  onAction,
}: {
  bobjectType: BobjectType;
  onAction: () => void;
}) => {
  const isSalesFeatureEnabled = useFullSalesEnabled();
  const { active } = useContactBobjects();
  const activeBobjectStage = getFieldByLogicRole(
    active,
    FIELDS_LOGIC_ROLE[active?.id.typeName as BobjectTypes.Lead | BobjectTypes.Company]?.STAGE,
  );
  const isStageSales = [COMPANY_STAGE_LOGIC_ROLE.SALES, LEAD_STAGE_LOGIC_ROLE.SALES].includes(
    activeBobjectStage?.valueLogicRole,
  );
  const canCreateAnOpportunity = isSalesFeatureEnabled
    ? (bobjectType === BobjectTypes.Company || bobjectType === BobjectTypes.Lead) && isStageSales
    : true;

  return isSalesFeatureEnabled ? (
    <Tooltip
      title={
        canCreateAnOpportunity
          ? 'Opportunity'
          : 'To create an opportunity first send the company and/or the lead to the sales stage.'
      }
      position="top"
      trigger="hover"
    >
      <Action
        icon="fileOpportunity"
        color="peanut"
        dataTest="opportunityButton"
        disabled={!canCreateAnOpportunity}
        onClick={onAction}
      />
    </Tooltip>
  ) : null;
};
