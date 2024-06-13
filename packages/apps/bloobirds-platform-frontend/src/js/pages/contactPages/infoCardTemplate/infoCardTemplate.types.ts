import { Bobject, BobjectField } from '../../../typings/bobjects';

export interface InfoCardTemplateTypes {
  assignTo: BobjectField;
  bobject: Bobject;
  requiredFields: { [x: string]: any };
  name: BobjectField;
  stage: BobjectField;
  status: BobjectField;
  highPriority: boolean;
  optOut: boolean;
  hasRequiredMissing: boolean;
  otherFields: Array<BobjectField>;
  handleOnClickName: () => void;
  handleOnClickEdit: () => void;
  isInactive: boolean;
  bobjectName: string;
  onStatusClick: () => void;
  contextualMenu: any;
}
