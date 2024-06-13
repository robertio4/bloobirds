import { Bobject } from './bobjects';

export type MinimizableModalType =
  | 'email'
  | 'meeting'
  | 'note'
  | 'task'
  | 'taskStatic'
  | 'calendarMeeting'
  | 'handleTemplate';

export type MinimizableModal<T> = {
  id: string;
  title?: string;
  open: boolean;
  data: T;
  bobject?: Bobject;
  type: MinimizableModalType;
  hasBeenMinimized: boolean;
  onSave?: () => void;
  onClose?: () => void;
};

export const MINIMIZABLE_MODALS = 'minimizableModals';
