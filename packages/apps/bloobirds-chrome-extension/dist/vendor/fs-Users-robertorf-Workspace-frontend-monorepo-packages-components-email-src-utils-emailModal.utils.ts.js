import { BobjectTypes } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { EMAIL_MODE, getTextFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { Editor } from "/vendor/.vite-deps-slate.js__v--2e5bd3ec.js";
export const getActivityConnection = (options) => {
  const { activity, mode, connections } = options;
  if (mode === EMAIL_MODE.REPLY && connections?.list && activity) {
    const connection = connections.list.find(
      (c) => c?.email === getTextFromLogicRole(activity, "ACTIVITY__EMAIL_USER")
    );
    return connection;
  }
  const defaultConnection = connections?.defaultConnection;
  if (!defaultConnection && connections?.list && connections?.list?.length !== 0) {
    return connections?.list[0];
  }
  return connections?.list?.find((c) => c?.email === defaultConnection);
};
export function getDefaultEmail(mode, activityEmailLead, activeLeadEmail) {
  if (mode === "REPLY" && activityEmailLead) {
    return activityEmailLead;
  }
  if (activeLeadEmail) {
    return activeLeadEmail;
  }
  return null;
}
export const checkIfIsEmpty = (value) => {
  if (!value) {
    return true;
  }
  if (value?.[0] && value?.[0].children) {
    if (value?.[0].children?.[0].text || value?.[0].children?.length > 0) {
      return false;
    }
    return checkIfIsEmpty(value?.[0].children);
  }
  return true;
};
export function getContactProps({ bobjectType, companyName, rawBobject, fullName, companyId }) {
  const isCompany = bobjectType === BobjectTypes.Company;
  if (isCompany) {
    const segmentedId = rawBobject?.id?.split("/");
    return {
      name: companyName,
      icon: "company",
      isInDB: true,
      bobject: {
        id: {
          value: rawBobject?.id,
          accountId: segmentedId[0],
          objectId: segmentedId.at(-1),
          typeName: BobjectTypes.Company
        },
        bobjectType,
        name: companyName,
        rawBobject
      }
    };
  } else {
    const segmentedId = rawBobject?.id?.split("/");
    return {
      name: fullName,
      icon: "person",
      isInDB: true,
      bobject: {
        id: {
          value: rawBobject?.id,
          accountId: segmentedId[0],
          objectId: segmentedId.at(-1),
          typeName: BobjectTypes.Lead
        },
        bobjectType,
        fullName,
        rawBobject,
        ...companyId ? {
          company: {
            bobjectType: BobjectTypes.Company,
            name: companyName,
            id: {
              objectId: companyId.split("/").at(-1),
              value: companyId,
              accountId: companyId.split("/")[0]
            }
          }
        } : {}
      }
    };
  }
}
export const getDefaultToEmail = (pageBobjectType, defaultToEmail, defaultEmail) => {
  if (defaultToEmail && Array.isArray(defaultToEmail)) {
    return defaultToEmail;
  } else if (pageBobjectType === BobjectTypes.Opportunity) {
    return null;
  } else if (defaultEmail) {
    return [defaultEmail];
  } else {
    return null;
  }
};
export function getFocusPoint(focusedEditor, currentSelectedIndex) {
  return currentSelectedIndex === 0 ? Editor.end(focusedEditor, []) : focusedEditor?.selection;
}
