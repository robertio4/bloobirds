import React, { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStatus } from '@bloobirds-it/hooks';
import { MainBobjectTypes } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import { ProviderType } from '../types/changeStatusModalTypes';
import {
  buildRequestBody,
  getIconName,
  isStatusWithReason,
  shouldBeAssigned,
} from '../utils/changeStatus.utils';

const ChangeStatusModalContext = createContext(null);

export const ChangeStatusModalProvider = ({ children, ...props }: ProviderType) => {
  const { statusInfo, bobject } = props;
  const bobjectType = bobject.id.typeName as MainBobjectTypes;
  const icon = getIconName(bobjectType);
  const isAssigned = !!bobject.assignedTo;
  const isInactive = bobject.cadence && bobject.isInactive;
  const hasStartedCadence = !!bobject.cadence;
  const [selectedUser, setSelectedUser] = useState();
  const [errors, setErrors] = useState();
  const {
    selectedStatus,
    setSelectedStatus,
    selectedReason,
    setSelectedReason,
    ...statusOptions
  } = useStatus(bobject as any);

  return (
    <ChangeStatusModalContext.Provider
      value={{
        bobject,
        bobjectType,
        icon,
        handleSelectedReason: [
          selectedReason,
          value => {
            setSelectedReason(value);
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
        handleSelectedStatus: [
          selectedStatus,
          value => {
            setSelectedStatus(value);
            setErrors(undefined);
          },
        ],
        handleErrors: [errors, setErrors],
        isAssigned,
        hasStartedCadence,
        isInactive,
        ...statusInfo,
        ...statusOptions,
      }}
    >
      {children}
    </ChangeStatusModalContext.Provider>
  );
};

export const useChangeStatusContext = () => {
  const context = useContext(ChangeStatusModalContext);

  if (context === undefined) {
    throw new Error('useInactiveHandlingModal must be used within the modal provider');
  }

  return context;
};

const checkForErrors = (
  { selectedStatus, selectedReason, selectedUser, isAssigned },
  [, setErrors],
  requiredAssigned,
  requiredReasonedStatuses,
  t,
) => {
  if (!requiredAssigned && !requiredReasonedStatuses) return false;
  const missingReason =
    requiredReasonedStatuses && isStatusWithReason(selectedStatus) && !selectedReason;
  const missingAssignee =
    requiredAssigned && shouldBeAssigned(isAssigned, selectedStatus) && !selectedUser;
  if (missingAssignee || missingReason) {
    const errorsObject = {
      ...(missingReason ? { statusReason: t('common.fieldRequired') } : {}),
      ...(missingAssignee ? { assignedUser: t('common.fieldRequired') } : {}),
    };
    setErrors(errorsObject);
    return true;
  }
  return false;
};

export const useChangeStatusData = () => {
  const { handleErrors, availableUsers, availableStatuses } = useChangeStatusContext();
  const { t } = useTranslation();

  function handleSave(data, setIsSubmitting) {
    //This should be handled on an error resolution
    if (
      checkForErrors(data, handleErrors, availableUsers.isRequired, availableStatuses.isRequired, t)
    )
      return setIsSubmitting(false);
    else {
      const requestBody = buildRequestBody(data);
      return api.patch(`/bobjects/${data.bobject.id.value}/raw`, requestBody);
    }
  }
  return { handleSave };
};
