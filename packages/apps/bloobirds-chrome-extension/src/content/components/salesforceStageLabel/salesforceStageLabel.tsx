import { ExtensionBobject } from '@bloobirds-it/types';

import { StatusLabel } from '../statusLabel/statusLabel';

export const SalesforceStageLabel = ({
  bobject,
  className,
}: {
  bobject: ExtensionBobject;
  className?: string;
}) => {
  const stageName = bobject?.salesforceStage;
  if (!stageName) {
    return null;
  }

  return (
    <StatusLabel
      backgroundColor={'#CDE2F6'}
      color={'#464F57'}
      borderColor={null}
      text={stageName || ''}
      size="small"
      onClick={() => null}
      {...(className ? { className } : {})}
    />
  );
};
