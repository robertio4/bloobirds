import { useState } from 'react';

import { Icon, Label } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import {
  BobjectPicklistValueEntity,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
} from '@bloobirds-it/types';

import styles from './prioritySelector.module.css';

export const PrioritySelector = ({
  value,
  onChange,
  overrideStyle = {},
}: {
  value: string;
  onChange: (value: any) => void;
  overrideStyle?: any;
}) => {
  const [open, setOpen] = useState(false);
  const dataModel = useDataModel();
  const priorityTask = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const defaultValue: BobjectPicklistValueEntity =
    value &&
    priorityTask?.find(
      priorityTask => priorityTask.logicRole === value || priorityTask.name === value,
    );
  const isImportantSelected = defaultValue?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT;

  if (open) {
    return (
      <div className={styles.containerOpen} style={overrideStyle}>
        {priorityTask?.map((priority: BobjectPicklistValueEntity) => (
          <Label
            overrideStyle={{
              backgroundColor: priority?.backgroundColor,
              color: priority?.textColor,
              borderColor: priority?.backgroundColor,
              textTransform: 'initial',
            }}
            hoverStyle={{
              opacity: 0.7,
            }}
            size={'small'}
            key={priority?.id}
            onClick={() => {
              setOpen(false);
              onChange(priority?.logicRole);
            }}
          >
            {priority?.logicRole === TASK_PRIORITY_VALUE.IMPORTANT && (
              <Icon name="flagFilled" size={12} color="softTomato" />
            )}{' '}
            {priority?.name}
          </Label>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.container} style={overrideStyle}>
      <Label
        overrideStyle={{
          backgroundColor: defaultValue?.backgroundColor,
          color: defaultValue?.textColor,
          borderColor: defaultValue?.backgroundColor,
          textTransform: 'initial',
        }}
        size="small"
        hoverStyle={{
          opacity: 0.7,
        }}
        onClick={() => {
          setOpen(true);
        }}
      >
        {isImportantSelected && <Icon name="flagFilled" size={12} color="softTomato" />}{' '}
        {defaultValue?.name}
      </Label>
    </div>
  );
};
