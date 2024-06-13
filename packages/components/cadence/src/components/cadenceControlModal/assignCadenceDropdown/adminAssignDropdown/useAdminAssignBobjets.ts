import { createToast } from '@bloobirds-it/flamingo-ui';
import { api } from '@bloobirds-it/utils';

export function useAdminAssignBobjects(userId) {
  const assignBobjects = ({ activeBobject, mode, callback, event }) => {
    const bobjectType = activeBobject?.id?.typeName;
    const accountId = activeBobject?.id?.accountId;

    if (mode === 'startCadence') {
      callback(event);
    } else {
      const body = {
        [bobjectType?.toUpperCase() + '__ASSIGNED_TO']: userId,
      };
      api
        .patch(`/bobjects/${accountId}/${bobjectType}/${activeBobject.id.objectId}/raw`, body)
        .then(() =>
          createToast({
            message: `${bobjectType} assigned successfully!`,
            type: 'success',
          }),
        )
        .then(() => callback(event));
    }
  };
  return { assignBobjects };
}
