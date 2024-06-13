import { Label } from '@bloobirds-it/flamingo-ui';

import { Status } from '../../types/changeStatusModalTypes';
import { useChangeStatusContext } from '../useChangeStatus';
import styles from './statusSelector.module.css';

const StatusLabelButton = (status: Status) => {
  const {
    handleSelectedStatus: [selectedStatus, setSelectedStatus],
    handleSelectedReason: [selectedReason, setSelectedReason],
  } = useChangeStatusContext();
  const isSelected = status.id === selectedStatus?.id;
  const style = {
    backgroundColor: status.backgroundColor ?? 'var(--peanut)',
    borderColor: status.backgroundColor ?? 'var(--peanut)',
    color: status.textColor ?? 'white',
    width: '100%',
  };
  return (
    <div
      className={styles._status_wrapper}
      key={`status-${status?.name}`}
      onClick={e => {
        e.stopPropagation();
        setSelectedStatus(status);
        setSelectedReason(undefined);
      }}
    >
      <Label
        value={status.logicRole}
        dataTest={status.logicRole}
        align="center"
        inline={false}
        key={`status-${status.name}`}
        selected={isSelected}
        hoverStyle={style}
        overrideStyle={{ width: '100%', boxSizing: 'border-box' }}
        {...(isSelected ? { selectedStyle: style } : {})}
      >
        {status.name}
      </Label>
    </div>
  );
};

export const StatusSelector = () => {
  const { availableStatuses, isSalesStage, bobjectType } = useChangeStatusContext();
  if (!availableStatuses) return;
  const statusesLength = availableStatuses.length;
  const halvedStatuses =
    statusesLength % 2 === 0 ? statusesLength / 2 : Math.floor(statusesLength / 2) + 1;
  const isOpportunity = bobjectType === 'Opportunity';

  return isSalesStage ? (
    <div className={styles._status}>
      <div
        className={styles._status_center_solo}
        {...(isOpportunity ? { style: { width: '370px' } } : {})}
      >
        {availableStatuses.map(StatusLabelButton)}
      </div>
    </div>
  ) : (
    <div className={styles._status}>
      <div className={styles._status_left}>
        {availableStatuses.slice(0, halvedStatuses).map(StatusLabelButton)}
      </div>
      <div className={styles._status_right}>
        {availableStatuses.slice(halvedStatuses, statusesLength).map(StatusLabelButton)}
      </div>
    </div>
  );
};
