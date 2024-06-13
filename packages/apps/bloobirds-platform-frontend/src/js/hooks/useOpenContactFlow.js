import { atomFamily, useRecoilState } from 'recoil';

const stateFamilyAtom = atomFamily({
  key: 'stateFamilyAtom',
  default: null,
});

export const useOpenContactFlow = () => {
  const [activity, setActivity] = useRecoilState(stateFamilyAtom('activity'));
  const [step, setStep] = useRecoilState(stateFamilyAtom('step'));
  const [trigger, setTrigger] = useRecoilState(stateFamilyAtom('trigger'));

  const openAtStep = (activityId, modalStep, modalTrigger) => {
    setActivity(activityId);
    setStep(modalStep);
    setTrigger(modalTrigger);
  };

  const open = activityId => {
    setActivity(activityId);
  };

  const clear = () => {
    setActivity(null);
    setStep(null);
    setTrigger(null);
  };

  return {
    activity,
    step,
    trigger,
    clear,
    open,
    openAtStep,
    setTrigger,
  };
};
