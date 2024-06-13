import React, { useEffect, useMemo, useRef, useState } from 'react';

import { useMinimizableModal } from '@bloobirds-it/hooks';
import {
  TASK_FIELDS_LOGIC_ROLE,
  TASK_STATUS_VALUE_LOGIC_ROLE,
  TASK_TYPE,
  BOBJECT_TYPES, ACTIVITY_FIELDS_LOGIC_ROLE
} from "@bloobirds-it/types";
import BobjectFormModal from './bobjectFormModal';
import { useBobjectPermissions } from '../../userPermissions/hooks';
import { useBobjectFieldGroups } from '../../../hooks/useBobjectFieldGroups';
import { useSelectedLead } from '../../../hooks/useSelectedLead';
import { useActiveUser, useEntity, usePicklistValues } from "../../../hooks";
import { ACTIVITY_TYPES } from '../../../constants/activity';

const BobjectFormContainer = ({ id, bobjectType, type }) => {
  const { activeUser } = useActiveUser();
  const { selectedLead } = useSelectedLead();
  const bobjectPicklistFieldValues = useEntity('bobjectPicklistFieldValues');
  const activityTypes = usePicklistValues({ picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE });
  const taskStatuses = usePicklistValues({ picklistLogicRole: TASK_FIELDS_LOGIC_ROLE.STATUS });
  const [loadingRelated, setLoadingRelated] = useState(true);
  const {
    data: { company, lead, data: savedData, opportunity },
  } = useMinimizableModal(id);
  const [hasPermission, setHasPermissions] = useState(false);

  const { checkPermissions } = useBobjectPermissions();
  const options = { type };
  const { loading: loadingSections, sections } = useBobjectFieldGroups({
    bobjectType,
    options,
    companyBobjectId: company?.data?.id.value,
    bobject: selectedLead,
    modalId: id,
  });
  const sectionsForm = savedData?.sections || sections || [];

  const defaultValues = useMemo(() => {
    if (bobjectType === BOBJECT_TYPES.ACTIVITY) {
      return {
        [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: selectedLead?.id.value,
        ACTIVITY__TYPE: activityTypes.find(activityType => activityType?.value === type)?.id,
        [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: company ? company?.data?.id?.value : undefined,
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: type !== ACTIVITY_TYPES.MEETING ? new Date() : null,
      };
    }
    if (bobjectType === BOBJECT_TYPES.TASK) {
      return {
        [TASK_FIELDS_LOGIC_ROLE.LEAD]: selectedLead?.id.value,
        [TASK_FIELDS_LOGIC_ROLE.ASSIGNED_TO]: activeUser?.id,
      };
    }
    return {};
  }, [bobjectType]);

  const additionalValues = useMemo(() => {
    if (bobjectType === BOBJECT_TYPES.ACTIVITY) {
      return {
        [ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunity?.data?.id?.value,
        [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: activeUser?.id,
      };
    }
    if (bobjectType === BOBJECT_TYPES.TASK) {
      const nextStepId = bobjectPicklistFieldValues?.findByLogicRole(TASK_TYPE.NEXT_STEP)?.id;
      const todoStatusId = taskStatuses?.find(
        value => value.logicRole === TASK_STATUS_VALUE_LOGIC_ROLE.TODO,
      )?.id;
      return {
        [TASK_FIELDS_LOGIC_ROLE.COMPANY]: company?.data?.id?.value,
        [TASK_FIELDS_LOGIC_ROLE.TASK_TYPE]: nextStepId,
        [TASK_FIELDS_LOGIC_ROLE.STATUS]: todoStatusId,
        [TASK_FIELDS_LOGIC_ROLE.OPPORTUNITY]: opportunity?.data?.id?.value,
      };
    }
    return {};
  }, [bobjectType]);

  const defaultRelatedValues = useMemo(() => {
    if (!loadingSections && sectionsForm?.length > 0) {
      if (type === ACTIVITY_TYPES.MEETING) {
        if (company && sectionsForm?.length > 0) {
          const values = {};
          sectionsForm
            .filter(section => section.bobjectType === BOBJECT_TYPES.COMPANY)
            .flatMap(sec => sec.fields)
            .forEach(field => {
              values[`${field.logicRole || field.name}_FROM_COMPANY`] =
                company?.data?.raw?.contents[field.name];
            });
          setLoadingRelated(false);
          return values;
        }
        setLoadingRelated(false);
        return {};
      }
      setLoadingRelated(false);
      return {};
    }
  }, [JSON.stringify(sectionsForm), company, type, loadingSections]);

  useEffect(() => {
    const hasPermissionFromSelfbobject = checkPermissions(lead?.data);
    setHasPermissions(
      hasPermissionFromSelfbobject || (company ? checkPermissions(company?.data) : false),
    );
  }, []);

  return (
    <>
      {!loadingRelated && (
        <BobjectFormModal
          id={id}
          bobjectType={bobjectType}
          type={type}
          defaultValues={defaultValues}
          defaultRelatedValues={defaultRelatedValues}
          additionalValues={additionalValues}
          hasPermission={hasPermission}
          loading={loadingSections}
          sectionsForm={sectionsForm}
          savedData={savedData}
        />
      )}
    </>
  );
};

export default BobjectFormContainer;
