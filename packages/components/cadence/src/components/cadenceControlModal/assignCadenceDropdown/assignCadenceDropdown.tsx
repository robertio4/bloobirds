import React from 'react';

import { Bobject, BobjectTypes, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { getValueFromLogicRole } from '@bloobirds-it/utils';

import { AdminAssignDropdown } from './adminAssignDropdown/adminAssignDropdown';
import { AssignCadenceDropdownProps } from './assignCadenceDropdown.types';
import { AutoAssignDropdown } from './autoAssignDropdown/autoAssignDropdown';

export const AssignCadenceDropdown = ({
  hasPermissions = false,
  activeBobject,
  activeUserId,
  ...props
}: AssignCadenceDropdownProps) => {
  const bobjectType = activeBobject?.id?.typeName;
  const assignedToValue =
    // @ts-ignore
    activeBobject?.assignedTo ||
    getValueFromLogicRole(
      activeBobject as Bobject,
      // @ts-ignore
      FIELDS_LOGIC_ROLE[bobjectType as BobjectTypes].ASSIGNED_TO,
    );
  const userIsOwner = assignedToValue === activeUserId;

  if (userIsOwner) {
    return React.cloneElement(props.children, { onClick: event => props.callback(event) });
  }

  return assignedToValue && hasPermissions ? (
    <AdminAssignDropdown activeBobject={activeBobject} activeUserId={activeUserId} {...props} />
  ) : (
    <AutoAssignDropdown activeBobject={activeBobject} activeUserId={activeUserId} {...props} />
  );
};
