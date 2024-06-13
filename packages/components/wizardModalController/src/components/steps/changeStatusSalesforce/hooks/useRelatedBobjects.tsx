import { useDataModel } from '@bloobirds-it/hooks';
import {
  Bobject,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  getOpportunityById,
  getTextFromLogicRole,
  getValueFromLogicRole,
  isLead,
} from '@bloobirds-it/utils';

export const useRelatedBobjects = () => {
  const dataModel = useDataModel();
  const getOpportunityRelated = (referenceBobject, accountId): Bobject => {
    const dataModelField = dataModel?.findFieldByLogicRole(
      LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES,
    );
    const leadOpportunities = getValueFromLogicRole(
      referenceBobject,
      LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES,
    );
    const leadOpportunitiesValue =
      leadOpportunities || referenceBobject?.rawBobject?.[dataModelField?.id];
    if (leadOpportunitiesValue) {
      const opportunityId = Array.isArray(leadOpportunitiesValue)
        ? leadOpportunitiesValue[0]
        : leadOpportunitiesValue;
      const opp = getOpportunityById(opportunityId.split('/')[2], accountId);

      return opp?.opportunity;
    }

    return undefined;
  };

  const getCompanyRelated = (referenceBobjectWithReferences): Bobject => {
    const companyId = isLead(referenceBobjectWithReferences)
      ? referenceBobjectWithReferences?.company?.value ??
        getTextFromLogicRole(referenceBobjectWithReferences, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
      : getTextFromLogicRole(referenceBobjectWithReferences, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY);
    return referenceBobjectWithReferences?.referencedBobjects?.[companyId];
  };

  const getLeadRelated = (referenceBobjectWithReferences): Bobject => {
    const leadId = isLead(referenceBobjectWithReferences)
      ? referenceBobjectWithReferences?.company?.value ??
        getTextFromLogicRole(referenceBobjectWithReferences, LEAD_FIELDS_LOGIC_ROLE.COMPANY)
      : getTextFromLogicRole(referenceBobjectWithReferences, OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY);
    return referenceBobjectWithReferences?.referencedBobjects?.[leadId];
  };

  return {
    getOpportunityRelated,
    getCompanyRelated,
    getLeadRelated,
  };
};
