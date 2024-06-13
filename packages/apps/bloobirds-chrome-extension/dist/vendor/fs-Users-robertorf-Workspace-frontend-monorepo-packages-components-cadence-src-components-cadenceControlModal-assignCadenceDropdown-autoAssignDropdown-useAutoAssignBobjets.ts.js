import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
function getBobjectsToAssign(contactBobjects, activeBobject) {
  const activeBobjectType = activeBobject?.id?.typeName;
  switch (activeBobjectType) {
    case "Lead":
      return { Company: contactBobjects?.company?.id?.objectId, Lead: activeBobject.id.objectId };
    case "Company":
      return {
        Company: activeBobject.id.objectId,
        Lead: contactBobjects?.leads?.map((lead) => lead.id.objectId)
      };
  }
}
export function useAutoAssignBobjets(userId) {
  const assignBobjects = ({ contactBobjects, activeBobject, mode, callback }) => {
    const bobjects = getBobjectsToAssign(contactBobjects, activeBobject);
    const bobjectsToSetTypes = bobjects && Object.keys(bobjects);
    const accountId = activeBobject?.id?.accountId;
    function getRequestBody(bobjectType, leads) {
      const body = {
        [bobjectType?.toUpperCase() + "__ASSIGNED_TO"]: userId
      };
      if (leads) {
        let leadsData = {};
        leads.forEach((leadId) => {
          leadsData = { ...leadsData, [leadId]: body };
        });
        return leadsData;
      } else {
        return body;
      }
    }
    if (mode === "partial") {
      const bobjectType = activeBobject?.id?.typeName;
      return api.patch(
        `/bobjects/${accountId}/${bobjectType}/${bobjects[bobjectType]}/raw`,
        getRequestBody(bobjectType, null)
      ).then(callback);
    } else {
      bobjectsToSetTypes.forEach((bobjectType) => {
        if (!bobjects[bobjectType])
          return;
        if (typeof bobjects[bobjectType] === "string") {
          const updateData = getRequestBody(bobjectType, null);
          return api.patch(`/bobjects/${accountId}/${bobjectType}/${bobjects[bobjectType]}/raw`, updateData).then(callback);
        } else {
          return api.patch(
            `/bobjects/${accountId}/Lead/bulk`,
            getRequestBody(bobjectType, bobjects[bobjectType])
          ).then(callback);
        }
      });
    }
  };
  return { assignBobjects };
}
