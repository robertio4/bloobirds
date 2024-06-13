import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject, BobjectTypes, SalesforceStatus } from '@bloobirds-it/types';

import { ChangeStatusStepDataProps } from '../../../../hooks/useChangeStatusStepData';
import { getBobjectName, getIconName } from '../utils/changeStatusSalesforce.utils';
import styles from './salesforceStatusSelector.module.css';
import StatusLabelButton from './statusLabelButton';

export const SalesforceStatusSelector = ({
  statusList,
  bobject,
  changeStatusStepData,
  setChangeStatusStepData,
  onClick,
}: {
  statusList: SalesforceStatus[];
  bobject: Bobject<BobjectTypes>;
  changeStatusStepData: ChangeStatusStepDataProps;
  setChangeStatusStepData: (data: ChangeStatusStepDataProps) => void;
  onClick?: () => void;
}) => {
  if (!statusList) return null;
  const relatedBobjectName = getBobjectName(bobject);
  const bobjectType = bobject?.id?.typeName?.toLowerCase();
  return (
    <div className={styles._status}>
      <div className={styles._name__wrapper}>
        <Icon color="verySoftPeanut" name={getIconName(bobject)} />
        <Text dataTest="Text-Modal-StatusUpdate" size="m" color="peanut">
          {relatedBobjectName}
        </Text>
      </div>
      <div className={styles._list_status}>
        {statusList?.map(status => (
          <StatusLabelButton
            key={`${bobjectType}-status-${status?.name}`}
            status={status}
            selectedStatus={changeStatusStepData[`${bobjectType}Status`]}
            onClick={() => {
              onClick?.();
              setChangeStatusStepData({
                ...changeStatusStepData,
                [`${bobjectType}Status`]: status.name,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};
