import React from 'react';

import { ColorType } from '@bloobirds-it/flamingo-ui';
import { DataModelResponse, ExtensionBobject, MainBobjectTypes } from '@bloobirds-it/types';

export interface Status {
  name: string;
  id: string;
  logicRole: string;
  backgroundColor: ColorType;
  outlineColor: ColorType;
  textColor: ColorType;
}

export type ProviderType = {
  bobject?: ExtensionBobject;
  bobjectType?: MainBobjectTypes;
  handleClose?: () => void;
  onSave?: () => void;
  statusInfo: any;
  children?: React.ReactElement;
  dataModel: DataModelResponse;
};

export type ModalProps = {
  handleClose?: () => void;
  onSave: () => void;
};
