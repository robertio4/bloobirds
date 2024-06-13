import React from 'react';

import { Bobject, BobjectId, ExtensionBobject, MainBobjectTypes } from '@bloobirds-it/types';

import { CadenceBobject } from '../../cadenceTable/cadenceTable.type';

export interface ContactBobjects {
  company: { id: BobjectId };
  leads: { id: BobjectId }[];
}

export interface BasicAssignDropdownProps {
  activeUserId: string;
  callback: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  activeBobject: ExtensionBobject | Bobject<MainBobjectTypes> | CadenceBobject;
  children?: JSX.Element;
  actionsDisabled?: boolean;
  contactBobjects?: ContactBobjects;
  onRenderDropdown?: () => void;
  onUnmountDropdown?: () => void;
}

export interface AutoAssignDropdownContentProps extends BasicAssignDropdownProps {
  setDropdownVisible: (value: boolean) => void;
}

export interface AdminAssignDropdownContentProps extends BasicAssignDropdownProps {
  setDropdownVisible: (value: boolean) => void;
  onUnmountDropdown?: () => void;
}

export interface AssignCadenceDropdownProps extends BasicAssignDropdownProps {
  hasPermissions?: boolean;
  contactBobjects?: ContactBobjects;
}
