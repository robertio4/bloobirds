import {
  PluralBobjectTypes
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
export function getStage(bobject) {
  return bobject?.bobjectType === "Opportunity" || bobject.stage?.includes("SALES") ? "sales" : "prospecting";
}
function getHitByName(hits, nameField) {
  let hitByName;
  if (hits) {
    let hasHitByName = false;
    if (hits && nameField?.id) {
      hasHitByName = hits[nameField.id];
    }
    if (hasHitByName) {
      hitByName = hasHitByName;
    }
  }
  return hitByName;
}
export function getName(dataModel, bobject, hits) {
  const nameField = dataModel?.findFieldByLogicRole(
    `${bobject?.bobjectType?.toUpperCase() + (bobject?.bobjectType === "Lead" ? "__FULL" : "_")}_NAME`
  );
  const hitByName = getHitByName(hits, nameField);
  let name;
  switch (bobject?.bobjectType) {
    case "Lead":
      name = bobject?.fullName;
      break;
    case "Company":
      name = bobject?.companyName;
      break;
    case "Opportunity":
      name = bobject?.name;
      break;
  }
  return {
    name: nameField ? hitByName ?? name : `Unnamed ${bobject?.bobjectType}`,
    hitByName: nameField?.id
  };
}
export function getSubtitle(bobject) {
  if (bobject?.bobjectType === "Lead") {
    return bobject.jobTitle || bobject.email || bobject.phone;
  }
  if (bobject?.bobjectType === "Company") {
    return bobject.website;
  }
  if (bobject?.bobjectType === "Opportunity") {
    return bobject.amount;
  }
  return "";
}
export function getStatus(type, stage, bobject, dataModel) {
  const salesLR = type === "Opportunity" || stage === "prospecting" ? "" : "SALES_";
  const statusField = dataModel?.findFieldByLogicRole(`${type.toUpperCase()}__${salesLR}STATUS`);
  if (!statusField) {
    return void 0;
  }
  const statusValues = dataModel?.findValuesByFieldId(statusField.id);
  const statusId = bobject.rawBobject.contents[statusField.id];
  if (!statusId) {
    return void 0;
  }
  return statusValues.filter((status) => status.id === statusId)[0];
}
export function searchBobjectTypeName(search) {
  if (!search) {
    return false;
  }
  const types = ["All", "Lead", "Company", "Opportunity"];
  const match = types.find((type) => {
    if (type.toLowerCase().startsWith(search.toLowerCase())) {
      return type;
    }
    if (type !== "All") {
      if (PluralBobjectTypes[type].toLowerCase().startsWith(search.toLowerCase())) {
        return type;
      }
    }
    return false;
  });
  return match ? match : false;
}
