import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import { BobjectId } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

export const useStatusData = () => {
  const hasNoStatusPlan = useIsNoStatusPlanAccount();
  function handleUpdateStatus(bobjectIdField: BobjectId, data) {
    if (!data || Object.keys(data).length === 0) return Promise.resolve('noUpdates');
    const body = hasNoStatusPlan
      ? {
          fieldsToUpdate: data,
          crm: 'SALESFORCE',
          accountId: bobjectIdField?.accountId,
        }
      : data;
    const url = hasNoStatusPlan
      ? '/utils/crmStatus/updateCrmStatus'
      : '/bobjects/' + bobjectIdField?.value + '/raw';
    return api[hasNoStatusPlan ? 'post' : 'patch'](url, body);
  }

  return {
    handleUpdateStatus,
  };
};
