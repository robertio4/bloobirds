import React from 'react';

import { Icon, Label } from '@bloobirds-it/flamingo-ui';
import { useDataModel } from '@bloobirds-it/hooks';
import {
  BobjectPicklistValueDataModel,
  TASK_FIELDS_LOGIC_ROLE,
  TASK_PRIORITY_VALUE,
} from '@bloobirds-it/types';

const PriorityLabel = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const isSmall = size === 'small';
  const dataModel = useDataModel();
  const priorityField = dataModel?.findValuesByFieldLogicRole(TASK_FIELDS_LOGIC_ROLE.PRIORITY);
  const importantPriority: BobjectPicklistValueDataModel = priorityField?.find(
    priorityTask => priorityTask.logicRole === TASK_PRIORITY_VALUE.IMPORTANT,
  );

  return (
    <Label
      overrideStyle={{
        backgroundColor: importantPriority?.backgroundColor,
        color: importantPriority?.textColor,
        borderColor: importantPriority?.backgroundColor,
        marginLeft: '8px',
        padding: '2px 4px',
      }}
    >
      <Icon name="flagFilled" size={isSmall ? 14 : 16} color="softTomato" />
    </Label>
  );
};

export default PriorityLabel;
