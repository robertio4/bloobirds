import { useDataModel } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  ExtensionBobject,
} from '@bloobirds-it/types';
import { getFieldByLogicRole, getIsSales } from '@bloobirds-it/utils';
import { useWizardContext } from '@bloobirds-it/wizard-modal-context';

interface ActivityRelatedInfoProps {
  activityCompany: Bobject<BobjectTypes.Company>;
  activityLead: Bobject<BobjectTypes.Lead>;
  activityOpportunity: Bobject;
  referenceBobjectIsSales: boolean;
  referenceBobject: Bobject | ExtensionBobject;
}
export const useActivityRelatedInfo = (wizardKey): ActivityRelatedInfoProps => {
  const { getWizardProperties, addMetaToWizardProperties } = useWizardContext();
  const dataModel = useDataModel();
  let {
    bobject: activity,
    referenceBobject,
    activityLead,
    activityCompany,
    activityOpportunity,
    referenceBobjectIsSales,
  } = getWizardProperties(wizardKey);

  activityLead =
    activityLead ||
    getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.referencedBobject;

  activityCompany =
    activityCompany ||
    getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.referencedBobject;

  activityOpportunity =
    activityOpportunity ||
    getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)?.referencedBobject;

  referenceBobject = referenceBobject || activityLead || activityCompany;

  referenceBobjectIsSales =
    referenceBobjectIsSales || (referenceBobject ? getIsSales(dataModel, referenceBobject) : false);
  addMetaToWizardProperties(wizardKey, {
    activityCompany,
    activityLead,
    activityOpportunity,
    referenceBobjectIsSales,
    referenceBobject,
  });
  return {
    activityCompany,
    activityLead,
    activityOpportunity,
    referenceBobjectIsSales,
    referenceBobject,
  };
};
