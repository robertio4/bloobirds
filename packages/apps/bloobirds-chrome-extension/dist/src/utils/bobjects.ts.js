export const isCompany = (bobject) => {
  return bobject.id.typeName === "Company";
};
export const isLead = (bobject) => {
  return bobject.id.typeName === "Lead";
};
export const isOpportunity = (bobject) => {
  return bobject?.id && bobject?.id?.typeName === "Opportunity";
};
export function getNewActiveBobject(res, activeBobject) {
  const activeBobjectId = activeBobject?.id?.objectId;
  const activeBobjectType = activeBobject?.id?.typeName;
  switch (activeBobjectType) {
    case "Company":
      return res?.data?.company;
    case "Lead":
      return res?.data?.leads?.find((bobject) => bobject.id?.objectId === activeBobjectId);
    case "Opportunity":
      return res?.data?.opportunities.find((bobject) => bobject.id?.objectId === activeBobjectId);
  }
}
