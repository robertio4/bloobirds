import { useUserHelpers } from '@bloobirds-it/hooks';
import { Bobject, BobjectId, BobjectTypes, MainBobjectTypes } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

export type CallResultBobjectType = MainBobjectTypes | BobjectTypes.Activity;

export type FieldFromWizard = {
  name: string;
  label: string;
  fieldBobjectType: BobjectTypes;
  required: boolean;
  defaultValue?: string;
};

export type UpdatableFieldInCallResult = {
  idValue?: BobjectId<CallResultBobjectType>['value'];
  fields?: FieldFromWizard[];
};

interface HandleSubmitProps {
  activity?: Bobject;
  data?: { [logicRole: string]: string };
  bobjectChanges?: Record<CallResultBobjectType, UpdatableFieldInCallResult>;
  nextStepData?: { accountId: string; body: any };
}
//TODO refactor if time
const patchBobject = (bobjectId, data) => api.patch(`/bobjects/${bobjectId}/raw`, data);

const createNextStep = ({ accountId, body }) => api.post(`/bobjects/${accountId}/Task`, body);

export const useContactFlowData = () => {
  const { save } = useUserHelpers();

  function handleSubmit({ activity, data, bobjectChanges, nextStepData }: HandleSubmitProps) {
    const activityFieldsToUpdate = bobjectChanges?.[BobjectTypes.Activity]?.fields;

    if (bobjectChanges) {
      Object.entries(bobjectChanges).forEach(([key, value]) => {
        if (key === BobjectTypes.Activity) return;
        if (value) {
          const { idValue, fields } = value;
          if (idValue) {
            patchBobject(idValue, fields).then(() => {
              window.dispatchEvent(
                new CustomEvent('ACTIVE_BOBJECT_UPDATED', { detail: { type: key } }),
              );
            });
          }
        }
      });
    }

    if (activity?.id) {
      patchBobject(activity?.id.value, { ...data, ...(activityFieldsToUpdate ?? {}) }).then(() => {
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
