import { BobjectTypes } from '@bloobirds-it/types';

export const getReferenceBobject = (task, isB2CAccount, type = false) => {
  const leadId = task?.lead?.id;
  const companyId = task?.company?.id;
  const opportunityId = task?.opportunity?.id;

  const b2bOrder = companyId || opportunityId;
  const b2cOrder = opportunityId || companyId;

  if (!leadId && !companyId && !opportunityId) {
    return task;
  } else {
    if (type) {
      return leadId
        ? BobjectTypes.Lead
        : isB2CAccount
        ? BobjectTypes.Opportunity || BobjectTypes.Company
        : BobjectTypes.Company || BobjectTypes.Opportunity;
    }
    return leadId ? leadId : isB2CAccount ? b2cOrder : b2bOrder;
  }
};
