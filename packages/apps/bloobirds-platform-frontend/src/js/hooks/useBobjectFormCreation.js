import { useToasts } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
} from '@bloobirds-it/types';

import { useUserSettings } from '../components/userPermissions/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../constants/activity';
import { COMPANY_FIELDS_LOGIC_ROLE, COMPANY_STAGE_LOGIC_ROLE } from '../constants/company';
import {
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_SALES_STATUS_VALUES_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  LEAD_STATUS_LOGIC_ROLE,
} from '../constants/lead';
import {
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_LEADS_LOGIC_ROLES,
} from '../constants/opportunity';
import {
  getCompanyIdFromBobject,
  getFirstAvailableOpportunityLeadField,
  getLeadIdFromBobject,
  getOpportunityIdFromBobject,
  getTextFromLogicRole,
  getValueFromLogicRole,
} from '../utils/bobjects.utils';
import { useEntity } from './entities/useEntity';
import { useActiveUser } from './useActiveUser';
import { useBobjectFormVisibility } from './useBobjectForm';
import { useFullSalesEnabled } from './useFeatureFlags';
import { useOpportunity } from './useOpportunity';
import { usePicklistValues } from './usePicklistValues';

export const useBobjectFormCreation = () => {
  const { activeUser } = useActiveUser();
  const { openCreateModal } = useBobjectFormVisibility();
  const taskStatuses = usePicklistValues({ picklistLogicRole: TASK_FIELDS_LOGIC_ROLE.STATUS });
  const leadStatuses = usePicklistValues({ picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.STATUS });
  const leadSalesStatuses = usePicklistValues({
    picklistLogicRole: LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS,
  });
  const activityTypes = usePicklistValues({ picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE });
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const config = useUserSettings();
  const meetingFieldsRequiredEnabled = config?.settings.meetingFieldsRequiredEnabled;
  const hasSalesEnabled = useFullSalesEnabled();
  const { updateOpportunity } = useOpportunity();
  const { createToast } = useToasts();

  const openAddLead = ({ onSuccess = () => {}, bobject } = {}) => {
    const companyId = bobject ? getCompanyIdFromBobject(bobject) : null;

    const defaultValues = {
      [LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY]: '',
      [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser.id,
    };
    const additionalValues = {
      [LEAD_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
      [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyId,
    };
    openCreateModal({
      bobjectType: BobjectTypes.Lead,
      defaultValues,
      additionalValues,
      bobject,
      onSuccess,
    });
  };

  const openAddLeadWithOpportunity = ({ onSuccess = () => {}, bobject } = {}) => {
    const companyId = getCompanyIdFromBobject(bobject);
    const statusId = leadStatuses.find(value => value.logicRole === LEAD_STATUS_LOGIC_ROLE.CONTACT)
      ?.id;
    const salesStatusId = leadSalesStatuses.find(
      value => value.logicRole === LEAD_SALES_STATUS_VALUES_LOGIC_ROLE.ACTIVE,
    )?.id;

    const defaultValues = {
      [LEAD_FIELDS_LOGIC_ROLE.STATUS]: statusId,
      [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: hasSalesEnabled ? salesStatusId : null,
      [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser.id,
    };

    const additionalValues = {
      [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: companyId,
      [LEAD_FIELDS_LOGIC_ROLE.STATUS]: statusId,
      [LEAD_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
      [LEAD_FIELDS_LOGIC_ROLE.SALES_STATUS]: hasSalesEnabled ? salesStatusId : null,
      [LEAD_FIELDS_LOGIC_ROLE.STAGE]: hasSalesEnabled
        ? LEAD_STAGE_LOGIC_ROLE.SALES
        : LEAD_STAGE_LOGIC_ROLE.PROSPECT,
    };

    const onSuccessFn = data => {
      const fieldRelationLogicRole = getFirstAvailableOpportunityLeadField(bobject);
      let newData = {
        [fieldRelationLogicRole]: data?.response?.value,
      };
      if (companyId) {
        newData = {
          ...newData,
          [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: companyId,
        };
      }
      updateOpportunity(bobject?.id?.objectId, newData).then(() => {
        onSuccess(data);
        createToast({ type: 'success', message: 'Changes successfully saved' });
      });
    };

    openCreateModal({
      bobjectType: 'Lead',
      defaultValues,
      additionalValues,
      bobject,
      onSuccess: onSuccessFn,
    });
  };

  const openAddTask = ({ bobject }) => {
    const companyId = getCompanyIdFromBobject(bobject);
    const leadId = getLeadIdFromBobject(bobject);
    const opportunityId = getOpportunityIdFromBobject(bobject);

    const defaultValues = {
      [TASK_FIELDS_LOGIC_ROLE.LEAD]: leadId,
    };

    const nextStepId = bobjectPicklistFieldValues?.findByLogicRole(TASK_TYPE.NEXT_STEP)?.id;
    const todoStatusId = taskStatuses.find(
      value => value.logicRole === TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
    )?.id;

    let additionalValues = {
      [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser?.id,
      [TASK_FIELDS_LOGIC_ROLE.COMPANY]: companyId,
      [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: nextStepId,
      [TASK_FIELDS_LOGIC_ROLE.STATUS]: todoStatusId,
    };

    if (leadId) {
      additionalValues = {
        ...additionalValues,
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: leadId,
      };
    }

    if (opportunityId) {
      additionalValues = {
        ...additionalValues,
        [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunityId,
      };
    }

    openCreateModal({ bobjectType: 'Task', defaultValues, additionalValues, bobject });
  };

  const openAddOpportunity = ({ onSuccess, bobject, company, lead, assignedTo } = {}) => {
    const companyId = bobject ? getCompanyIdFromBobject(bobject) : undefined;
    let leadId;
    if (lead) {
      leadId = getLeadIdFromBobject(lead);
    }
    const additionalValues = {
      [OPPORTUNITY_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
    };
    const defaultValues = {};

    if (companyId !== undefined) {
      const assignedToRelated = getValueFromLogicRole(
        company,
        COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO,
      );
      additionalValues[OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY] = companyId;
      additionalValues[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedToRelated;
      defaultValues[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedToRelated;
    }

    if (leadId !== undefined) {
      if (!companyId) {
        const assignedToRelated = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO);
        additionalValues[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedToRelated;
        defaultValues[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedToRelated;
      }

      defaultValues[OPPORTUNITY_LEADS_LOGIC_ROLES.OPPORTUNITY__LEAD_PRIMARY_CONTACT] = leadId;
      additionalValues[OPPORTUNITY_LEADS_LOGIC_ROLES.OPPORTUNITY__LEAD_PRIMARY_CONTACT] = leadId;
    }

    if (assignedTo) {
      additionalValues[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedTo;
      defaultValues[OPPORTUNITY_FIELDS_LOGIC_ROLE.ASSIGNED_TO] = assignedTo;
    }
    openCreateModal({
      bobjectType: 'Opportunity',
      defaultValues,
      additionalValues,
      onSuccess,
      bobject,
    });
  };

  const openAddActivity = ({ type = null, lead, bobject, hasOneLead = false } = {}) => {
    const opportunityId = getOpportunityIdFromBobject(bobject);
    const companyId = (lead && getCompanyIdFromBobject(lead)) || bobject?.id?.value;
    const hasMissingFields = type && meetingFieldsRequiredEnabled && hasOneLead;
    const defaultValues = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: hasMissingFields ? undefined : lead?.id.value,
      [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: new Date(),
    };

    if (type) {
      defaultValues.ACTIVITY__TYPE = activityTypes.find(
        activityType => activityType.value === type,
      ).id;
    }

    if (lead) {
      const emailLead = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
      const emailPhone = getTextFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.PHONE);

      defaultValues[ACTIVITY_FIELDS_LOGIC_ROLE.EMAIL_LEAD] = emailLead;
      defaultValues[ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER] = emailPhone;
    }

    const additionalValues = {
      [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: activeUser?.id,
    };

    if (companyId !== undefined) {
      additionalValues[ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY] = companyId;
    }

    if (opportunityId !== undefined) {
      additionalValues[ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY] = opportunityId;
    }

    openCreateModal({ bobjectType: 'Activity', bobject, defaultValues, additionalValues });
  };

  const openAddCompany = ({ onSuccess, status, stage } = {}) => {
    const additionalValues = {
      [COMPANY_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
    };
    const defaultValues = {
      [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser.id,
    };

    if (status !== undefined) {
      defaultValues[COMPANY_FIELDS_LOGIC_ROLE.STATUS] = status;
    }

    if (stage !== undefined) {
      defaultValues[COMPANY_FIELDS_LOGIC_ROLE.STAGE] = stage;
      additionalValues[COMPANY_FIELDS_LOGIC_ROLE.STAGE] = stage;
    }

    openCreateModal({ bobjectType: 'Company', defaultValues, additionalValues, onSuccess });
  };

  const openAddCompanyAndAssign = lead => {
    const additionalValues = {
      [COMPANY_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
    };
    const defaultValues = {
      [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser.id,
    };
    openCreateModal({
      bobjectType: 'Company',
      additionalValues,
      defaultValues,
      leadToAssign: lead,
    });
  };

  const openAddCompanyInSales = lead => {
    const defaultValues = {
      [COMPANY_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser.id,
    };
    const additionalValues = {
      [COMPANY_FIELDS_LOGIC_ROLE.STAGE]: COMPANY_STAGE_LOGIC_ROLE.SALES,
      [COMPANY_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
    };

    openCreateModal({
      bobjectType: 'Company',
      additionalValues,
      defaultValues,
      leadToAssign: lead,
    });
  };

  const openAddLeadWithoutCompany = () => {
    const additionalValues = {
      [LEAD_FIELDS_LOGIC_ROLE.AUTHOR]: activeUser?.id,
    };
    const defaultValues = {
      [LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser.id,
    };
    openCreateModal({ bobjectType: 'Lead', additionalValues, defaultValues });
  };

  const openAddProduct = () => {
    const additionalValues = {
      PRODUCT__AUTHOR: activeUser?.id,
    };
    openCreateModal({ bobjectType: 'Product', additionalValues, defaultValues: {} });
  };

  return {
    openAddActivity,
    openAddLeadWithOpportunity,
    openAddOpportunity,
    openAddLead,
    openAddTask,
    openAddCompany,
    openAddLeadWithoutCompany,
    openAddCompanyAndAssign,
    openAddCompanyInSales,
    openAddProduct,
  };
};
