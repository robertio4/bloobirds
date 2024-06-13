import { BobjectTypes, MainBobjectTypes } from '@bloobirds-it/types';
import {
  getSalesforceStatusApiNameField,
  getSobjectTypeFromBobject,
  getValueFromLogicRole,
} from '@bloobirds-it/utils';

import { COMPANY_STAGE_LOGIC_ROLE } from '../../../utils/company';
import { LEAD_STAGE_LOGIC_ROLE } from '../../../utils/lead';
import { useExtensionContext } from '../context';

function getBobjectName(bobject, bobjectType) {
  switch (bobjectType) {
    case 'Company':
      return bobject.name;
    case 'Opportunity':
      return bobject.name;
    case 'Lead':
      return bobject.fullName;
  }
}

function getBobjectIsSalesStage(stageId: string, bobjectType: MainBobjectTypes, dataModel) {
  switch (bobjectType) {
    case 'Opportunity':
      return true;
    case 'Company':
      return dataModel?.findValueById(stageId)?.logicRole === COMPANY_STAGE_LOGIC_ROLE.SALES;
    case 'Lead':
      return dataModel?.findValueById(stageId)?.logicRole === LEAD_STAGE_LOGIC_ROLE.SALES;
  }
}

function getBobjectStatus(bobject, bobjectType, isSalesStage, dataModel) {
  if (bobjectType === 'Opportunity') return dataModel.findValueById(bobject.status);
  const prospectingStatusId = bobject.prospectingStatus;
  const salesStatusId = bobject.salesStatus;
  const prospectingStatus = dataModel?.findValueById(prospectingStatusId);
  const salesStatus = dataModel?.findValueById(salesStatusId);

  return isSalesStage ? salesStatus : prospectingStatus;
}

function getSalesforceStatus(bobject, dataModel) {
  const salesforceStatusLogicRole = getSalesforceStatusApiNameField(bobject?.id?.typeName);
  const salesforceStatusField = dataModel?.findFieldByLogicRole(salesforceStatusLogicRole);
  const sobjectType = getSobjectTypeFromBobject(bobject);

  const salesStatusValue =
    bobject?.salesforceStatus ??
    bobject?.salesforceStage ??
    bobject?.rawBobject?.[salesforceStatusField?.id] ??
    getValueFromLogicRole(bobject, salesforceStatusLogicRole);

  return salesforceStatusField?.values?.find(
    value =>
      (value?.salesforceLabel === salesStatusValue ||
        value?.name === salesStatusValue ||
        value?.id === salesStatusValue) &&
      (bobject?.id?.typeName != BobjectTypes.Lead || value.salesforceObjectType == sobjectType),
  );
}

export const useStatusModalInfo = bobject => {
  const { useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const stage = bobject.stage;
  const isAssigned = !!bobject.assignedTo;
  const bobjectType = bobject?.id?.typeName;
  const hascadenceStarted = !!bobject.cadence;
  const name = getBobjectName(bobject, bobjectType);
  const isSalesStage = getBobjectIsSalesStage(stage, bobjectType, dataModel);
  const status = getBobjectStatus(bobject, bobjectType, isSalesStage, dataModel);
  const salesforceStatus = getSalesforceStatus(bobject, dataModel);

  return {
    bobjectType,
    isAssigned,
    hascadenceStarted,
    name,
    status,
    isSalesStage,
    salesforceStatus,
  };
};
