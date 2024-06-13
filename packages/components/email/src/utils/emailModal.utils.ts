import { BobjectType, BobjectTypes } from '@bloobirds-it/types';
import { EMAIL_MODE, getTextFromLogicRole } from '@bloobirds-it/utils';
import { Editor } from 'slate';

interface GetActivityUserEmailOptions {
  activity: any;
  mode: 'REPLY' | 'SEND';
  connections: any;
}

export const getActivityConnection = (options: GetActivityUserEmailOptions): any | undefined => {
  const { activity, mode, connections } = options;
  if (mode === EMAIL_MODE.REPLY && connections?.list && activity) {
    const connection = connections.list.find(
      (c: any) => c?.email === getTextFromLogicRole(activity, 'ACTIVITY__EMAIL_USER'),
    );
    return connection;
  }

  const defaultConnection = connections?.defaultConnection;

  if (!defaultConnection && connections?.list && connections?.list?.length !== 0) {
    return connections?.list[0];
  }

  return connections?.list?.find((c: any) => c?.email === defaultConnection);
};

export function getDefaultEmail(
  mode: 'REPLY' | 'SEND',
  activityEmailLead: string,
  activeLeadEmail: string,
) {
  if (mode === 'REPLY' && activityEmailLead) {
    return activityEmailLead;
  }
  if (activeLeadEmail) {
    return activeLeadEmail;
  }
  return null;
}

export const checkIfIsEmpty = (value: any): boolean => {
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
    const segmentedId = rawBobject?.id?.split('/');
    return {
      name: companyName,
      icon: 'company',
      isInDB: true,
      bobject: {
        id: {
          value: rawBobject?.id,
          accountId: segmentedId[0],
          objectId: segmentedId.at(-1),
          typeName: BobjectTypes.Company,
        },
        bobjectType,
        name: companyName,
        rawBobject,
      },
    };
  } else {
    const segmentedId = rawBobject?.id?.split('/');
    return {
      name: fullName,
      icon: 'person',
      isInDB: true,
      bobject: {
        id: {
          value: rawBobject?.id,
          accountId: segmentedId[0],
          objectId: segmentedId.at(-1),
          typeName: BobjectTypes.Lead,
        },
        bobjectType,
        fullName,
        rawBobject,
        ...(companyId
          ? {
              company: {
                bobjectType: BobjectTypes.Company,
                name: companyName,
                id: {
                  objectId: companyId.split('/').at(-1),
                  value: companyId,
                  accountId: companyId.split('/')[0],
                },
              },
            }
          : {}),
      },
    };
  }
}

export const getDefaultToEmail = (
  pageBobjectType: BobjectType,
  defaultToEmail: string | string[],
  defaultEmail: string,
) => {
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
