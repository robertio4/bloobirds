import { useUserHelpers } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

//TODO refactor if time
const patchBobject = (bobjectId, data) => api.patch(`/bobjects/${bobjectId}/raw`, data);

const createNextStep = ({ accountId, body }) => api.post(`/bobjects/${accountId}/Task`, body);

export const useContactFlowData = () => {
  const { save } = useUserHelpers();
  function handleSubmit({
    activity,
    data,
    companyChanges,
    leadChanges,
    nextStepData,
  }: {
    activity?: Bobject;
    data?: { [logicRole: string]: string };
    companyChanges?: any;
    leadChanges?: any;
    nextStepData?: { accountId: string; body: any };
  }) {
    const { companyIdValue, companyPhoneFields } = companyChanges || {};
    const { leadIdValue, leadPhoneFields } = leadChanges || {};
    if (leadPhoneFields) {
      patchBobject(leadIdValue, leadPhoneFields).then(() => {
        window.dispatchEvent(
          new CustomEvent('ACTIVE_BOBJECT_UPDATED', { detail: { type: BobjectTypes.Lead } }),
        );
      });
    }
    if (companyPhoneFields) {
      patchBobject(companyIdValue, companyPhoneFields).then(() => {
        window.dispatchEvent(
          new CustomEvent('ACTIVE_BOBJECT_UPDATED', { detail: { type: BobjectTypes.Company } }),
        );
      });
    }

    if (activity?.id) {
      patchBobject(activity?.id.value, data).then(() => {
        // @ts-ignore
        save('CALL_AND_REPORT_RESULT');

        //mutate activity and launch side effects
        window.dispatchEvent(
          new CustomEvent('ACTIVE_BOBJECT_UPDATED', { detail: { type: BobjectTypes.Activity } }),
        );
      });
    }
    if (nextStepData) {
      return createNextStep(nextStepData).then(response => {
        window.dispatchEvent(
          new CustomEvent('ACTIVE_BOBJECT_UPDATED', { detail: { type: BobjectTypes.Task } }),
        );
        return response;
      });
    }
  }
  return { handleSubmit, patchActivity: patchBobject };
};
