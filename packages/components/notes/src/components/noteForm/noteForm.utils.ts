import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { getTextFromLogicRole } from '@bloobirds-it/utils';

export function onBobjectChange(bobject, relatedOnChange, setNameSelected) {
  relatedOnChange(bobject?.rawBobject?.id);
  if (bobject?.bobjectType === BobjectTypes.Company) {
    setNameSelected(
      bobject?.companyName || getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.NAME),
    );
  } else if (bobject?.bobjectType === BobjectTypes.Lead) {
    setNameSelected(
      bobject?.fullName || getTextFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
    );
  } else if (bobject?.bobjectType === BobjectTypes.Opportunity) {
    setNameSelected(
      bobject?.name || getTextFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME),
    );
  }
}
