import { useCrmStatus, useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { BobjectTypes, crmObjects, FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { mergeObjects } from 'swr/_internal';

import { useExtensionContext } from '../../../../../context';

interface StatusMapping {
  id: string;
  creationDatetime: string;
  updateDatetime: string;
  createdBy: string;
  updatedBy: string;
  crmStatusName: string;
  crmStatusLabel: string;
  statusCategoryId: string;
  textColor: string;
  backgroundColor: string;
  ordering: number;
}

interface CRMStatusType {
  id: string;
  crmObjectType: string;
  crmField: string;
  crmStatusMappingList: StatusMapping[];
}

export const useSalesforceStatusFilter = (tabBobject: BobjectTypes) => {
  const { useGetSettings, useGetDataModel } = useExtensionContext();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const accountId = settings?.account?.id;
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const salesForceStatusField = dataModel?.findFieldByLogicRole(
    FIELDS_LOGIC_ROLE[tabBobject].SALESFORCE_STATUS,
  );

  const { crmStatusList } = useCrmStatus(
    accountId,
    crmObjects.map(crmObject => crmObject.crmObject),
    'SALESFORCE',
    isNoStatusPlanAccount,
  );

  // From CRMStatusList return object with {[bobjectType]: {[statusCategoryLogicRole]: [statusLabel]}}
  const organizeStatusIdsByBobjectType = (data: CRMStatusType[]) => {
    const result = {};

    data?.forEach(obj => {
      const objectType = obj.crmObjectType;
      const statusMappingList = obj.crmStatusMappingList;

      const statusLabelsByCategory = {};

      statusMappingList?.forEach(status => {
        const categoryId = status.statusCategoryId;

        if (!statusLabelsByCategory[categoryId]) {
          statusLabelsByCategory[categoryId] = [];
        }

        statusLabelsByCategory[categoryId].push(status.crmStatusLabel);
      });

      result[objectType] = statusLabelsByCategory;
    });

    return {
      [BobjectTypes.Company]: result?.['Account'],
      [BobjectTypes.Lead]: mergeObjects(result?.['Lead'], result?.['Contact']),
      [BobjectTypes.Opportunity]: result?.['Opportunity'],
    };
  };

  // Function used to parse query on filters change
  // From array of categories ids return array of status ids for current bobject
  const parseSalesforceStatus = (query: Record<string, string[]>, bobjectType?: BobjectTypes) => {
    let salesforceStatusQuery = [];
    if (isNoStatusPlanAccount && query && query?.[salesForceStatusField?.id]) {
      // {[bobjectType]: {[statusCategoryId]: [statusId]}}
      const crmStatusIdsByBobjectType = organizeStatusIdsByBobjectType(crmStatusList);
      const queriedFields = Object.keys(query);
      queriedFields.forEach(key => {
        if (key === salesForceStatusField?.id) {
          // Returns array of status ids for each filter value selected
          query[key]?.forEach((value: string) => {
            salesforceStatusQuery = [
              ...salesforceStatusQuery,
              ...(crmStatusIdsByBobjectType[bobjectType ?? tabBobject]?.[value] ?? []),
            ];
          });
        }
      });

      // We merge arrays of status ids from all filters
      return {
        ...query,
        [salesForceStatusField?.id]: {
          query: salesforceStatusQuery.flat(),
          searchMode: 'EXACT__SEARCH',
        },
      };
    } else {
      return query;
    }
  };

  return { parseSalesforceStatus, organizeStatusIdsByBobjectType };
};
