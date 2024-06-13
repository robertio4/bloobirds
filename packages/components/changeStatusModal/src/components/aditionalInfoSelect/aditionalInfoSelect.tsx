import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Item, Select, Text } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { isStatusWithReason, shouldBeAssigned } from '../../utils/changeStatus.utils';
import styles from '../changeStatusModal.module.css';
import { useChangeStatusContext } from '../useChangeStatus';

export const AditionalInfoSelect = () => {
  const { t } = useTranslation();
  const {
    handleSelectedStatus: [selectedStatus],
    handleErrors: [errors],
    isAssigned,
    bobjectType,
    handleSelectedReason: [selectedReason, setSelectedReason],
    handleSelectedUser: [selectedUser, setSelectedUser],
    availableReasons,
    availableUsers,
  } = useChangeStatusContext();
  const needsAssignedTo = shouldBeAssigned(isAssigned, selectedStatus);
  const reasonedStatus = isStatusWithReason(selectedStatus);
  const aditionalInfoNeeded = needsAssignedTo || reasonedStatus;
  const isFirstRender = useRef(true);
  const reasonsRef = useRef(null);
  const assignedRef = useRef(null);

  useEffect(() => {
    if (isFirstRender?.current) {
      isFirstRender.current = false;
      return;
    }

    if (reasonsRef?.current) {
      reasonsRef?.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (assignedRef?.current) {
      assignedRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedStatus]);

  if (!aditionalInfoNeeded) return null;
  return (
    <>
      {reasonedStatus && availableReasons.values.length > 0 && (
        <div className={styles._section__wrapper} ref={reasonsRef}>
          <div className={clsx(styles._title__wrapper, styles._title__wrapper__centered)}>
            <Text size="m" weight="medium" color="peanut">
              {t('changeStatusModal.reasonedStatus.title')}
            </Text>
          </div>
          <div className={styles._content__wrapper}>
            <div className={styles._reason__wrapper}>
              <Select
                value={selectedReason}
                placeholder={t('changeStatusModal.reasonedStatus.placeholder', {
                  bobjectType,
                  selectedStatus: selectedStatus.name,
                  required: availableReasons.isRequired ? '*' : '',
                })}
                width="100%"
                onChange={setSelectedReason}
                error={errors?.statusReason}
              >
                {availableReasons?.values?.map(reason => (
                  <Item key={reason.value} value={reason}>
                    {reason.label}
                  </Item>
                ))}
              </Select>
            </div>
          </div>
        </div>
      )}
      {needsAssignedTo && (
        <div className={styles._section__wrapper} ref={assignedRef}>
          <div className={clsx(styles._title__wrapper, styles._title__wrapper__centered)}>
            <Text size="m" weight="medium" color="peanut">
              {t(`changeStatusModal.assignedTo.${bobjectType}`)}
            </Text>
          </div>
          <div className={styles._content__wrapper}>
            <div className={styles._reason__wrapper}>
              {availableUsers && (
                <Select
                  value={selectedUser?.id}
                  placeholder={t('changeStatusModal.assignedTo.placeholder', {
                    required: availableUsers.isRequired ? '*' : '',
                  })}
                  width="100%"
                  error={errors?.assignedUser}
                >
                  {availableUsers?.values?.map((user: any) => (
                    <Item
                      key={`user-assigned-item-${user?.id}`}
                      value={user?.id}
                      onClick={() => setSelectedUser(user)}
                    >
                      {user.name}
                    </Item>
                  ))}
                </Select>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
