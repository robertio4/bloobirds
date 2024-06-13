import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useCustomTasks, useIsNoStatusPlanAccount, useStatus } from '@bloobirds-it/hooks';
import { Bobject, FIELDS_LOGIC_ROLE, MainBobjectTypes } from '@bloobirds-it/types';
import { api, getSobjectTypeFromBobject, getValueFromLogicRole } from '@bloobirds-it/utils';
import { useWizardContext, WizardsModalParams } from '@bloobirds-it/wizard-modal-context';
import useSWR, { useSWRConfig } from 'swr';

import { StatusNoteActionContextType } from '../types/statusNoteActions.types';
import { useNoteData } from './useNoteData';
import { useStatusData } from './useStatusData';
import {
  buildRequestBody,
  getIsAnyEmailOrWhatsappOrToday,
  referenceBobjectTasksQuery,
} from './useStatusNoteActions.utils';

const fetchTasks = (referenceBobject, query) =>
  api
    .post(
      '/bobjects/' + referenceBobject?.id.accountId + '/Task/search',
      query(referenceBobject.id),
    )
    .then(response => response.data);

const useReferenceBobjectTasks = (referenceBobject: Bobject) => {
  const { customTasks } = useCustomTasks();
  const { data } = useSWR('/statusActionModal' + referenceBobject?.id.value, () =>
    fetchTasks(referenceBobject, referenceBobjectTasksQuery),
  );
  return getIsAnyEmailOrWhatsappOrToday(data?.contents, customTasks);
};
//TODO rethink this
function getMainBobject(machineContext, watchedBobject) {
  if (!machineContext) return null;
  const { selectedOpportunityArray, selectedOpportunityObject, referenceBobject } = machineContext;
  if (!selectedOpportunityArray) return selectedOpportunityObject || referenceBobject;
  const isSingleArray = selectedOpportunityArray.length === 1;
  if (!watchedBobject) return referenceBobject;
  if (isSingleArray || (selectedOpportunityArray?.length > 1 && !watchedBobject))
    return selectedOpportunityArray[0] ?? selectedOpportunityObject;
  if (selectedOpportunityArray?.length > 1 && watchedBobject)
    return selectedOpportunityArray.find(
      availableOpps => availableOpps?.id?.value === watchedBobject,
    );
}

function getBobjectInfoFields(bobject) {
  const isExtensionBobject = !bobject.rawBobject;
  const bobjectType = bobject?.id.typeName as MainBobjectTypes;
  const isAssigned = isExtensionBobject
    ? !!bobject.assignedTo
    : !!getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].ASSIGNED_TO);
  const isInactive = isExtensionBobject
    ? bobject.cadence && bobject.isInactive
    : getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].IS_INACTIVE);
  const hasStartedCadence = isExtensionBobject
    ? !!bobject.cadence
    : !!getValueFromLogicRole(bobject, FIELDS_LOGIC_ROLE[bobjectType].CADENCE);
  return { isAssigned, isInactive, hasStartedCadence };
}

const StatusNoteActionContext = createContext(null);
//TODO check the type of bobject were getting
export const StatusNoteActionProvider = ({
  children,
  machineContext,
  ...props
}: PropsWithChildren<WizardsModalParams>) => {
  const { t } = useTranslation('translation', { keyPrefix: 'contactFlowModal.statusNoteActions' });
  const { getWizardProperties } = useWizardContext();
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const hasNoStatusPlanEnabled = useIsNoStatusPlanAccount();
  const { bobject: activity, activityLead, activityCompany } = getWizardProperties(props.wizardKey);
  const formMethods = useForm({
    defaultValues: { selectedBobjectId: machineContext.selectedOpportunityObject?.id?.value },
  });
  const bobject = getMainBobject(machineContext, formMethods.watch('selectedBobjectId'));
  const referenceBobjectTasks = useReferenceBobjectTasks(bobject);
  const bobjectType = bobject?.id.typeName as MainBobjectTypes;

  const { isAssigned, isInactive, hasStartedCadence } = getBobjectInfoFields(bobject);
  const [selectedUser, setSelectedUser] = useState();

  const {
    selectedStatus,
    setSelectedStatus,
    selectedReason,
    setSelectedReason,
    ...statusOptions
  } = useStatus(bobject);

  const noteHandling = useNoteData({ t, activity, wizardKey: props.wizardKey });
  const { handleUpdateStatus } = useStatusData();
  const { cache } = useSWRConfig();

  useEffect(() => {
    return () => cache.delete('/statusActionModal' + bobject?.id.value);
  }, []);

  return (
    <StatusNoteActionContext.Provider
      value={{
        activity,
        bobject,
        bobjectType,
        ...(activityLead ? { activityLead } : {}),
        ...(activityCompany ? { activityCompany } : {}),
        handleErrors: [errors, setErrors],
        handleSelectedReason: [
          selectedReason,
          value => {
            setSelectedReason(value);
            setErrors(undefined);
          },
        ],
        handleSelectedStatus: [
          selectedStatus,
          value => {
            setSelectedStatus(value);
            setErrors(undefined);
          },
        ],
        handleSelectedUser: [
          selectedUser,
          value => {
            setSelectedUser(value);
            setErrors(undefined);
          },
        ],
        handleUpdateStatus: statusInfo => {
          setLoading(true);
          return handleUpdateStatus(
            bobject?.id,
            buildRequestBody({
              bobject,
              selectedStatus,
              selectedReason,
              selectedUser,
              extraFields: statusInfo?.[getSobjectTypeFromBobject(bobject)],
              isSales: statusOptions.isSales,
              hasNoStatusPlanEnabled,
              dataForSalesforce: {
                machineContext,
                ...props,
              },
            }),
          );
        },
        hasNoStatusPlanEnabled,
        hasStartedCadence,
        isAssigned,
        isInactive,
        machineContext,
        t,
        formMethods,
        ...noteHandling,
        loading: loading || noteHandling.loading,
        setLoading,
        ...referenceBobjectTasks,
        ...statusOptions,
        ...props,
      }}
    >
      {children}
    </StatusNoteActionContext.Provider>
  );
};

export const useStatusNoteActionContext = (): StatusNoteActionContextType => {
  const context = useContext(StatusNoteActionContext);

  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }

  return context;
};
