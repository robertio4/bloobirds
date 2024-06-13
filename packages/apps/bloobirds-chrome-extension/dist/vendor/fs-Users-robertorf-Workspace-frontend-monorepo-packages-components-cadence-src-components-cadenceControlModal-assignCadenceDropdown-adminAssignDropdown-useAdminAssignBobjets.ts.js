import { createToast } from "/vendor/.vite-deps-@bloobirds-it_flamingo-ui.js__v--2cc8757f.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
export function useAdminAssignBobjects(userId) {
  const assignBobjects = ({ activeBobject, mode, callback, event }) => {
    const bobjectType = activeBobject?.id?.typeName;
    const accountId = activeBobject?.id?.accountId;
    if (mode === "startCadence") {
      callback(event);
    } else {
      const body = {
        [bobjectType?.toUpperCase() + "__ASSIGNED_TO"]: userId
      };
      api.patch(`/bobjects/${accountId}/${bobjectType}/${activeBobject.id.objectId}/raw`, body).then(
        () => createToast({
          message: `${bobjectType} assigned successfully!`,
          type: "success"
        })
      ).then(() => callback(event));
    }
  };
  return { assignBobjects };
}
