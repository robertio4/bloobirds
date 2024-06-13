import { TFunction } from 'i18next';

export const STEPS_PROPS = (t: TFunction) => ({
  CALL_RESULTS_OPP: { title: t('callResultOpp'), width: 736 },
  CALL_RESULTS: { title: t('callResult'), width: 736 },
  CHANGE_STATUS: { title: t('changeStatus'), width: 760 },
  CONVERT_OBJECT: { title: t('convertObject'), width: 656 },
  INITIAL: { title: t('initial'), width: 870 },
  NOTES_AND_QQ: { title: t('notesAndQQs'), width: 870 },
  OPPORTUNITY_CONTROL: { title: t('opportunityControl'), width: 870 },
  SALES_CHANGE_STATUS: { title: t('changeSalesStatus'), width: 760 },
  SCHEDULE_NEXT_STEPS: { title: t('scheduleNextSteps'), width: 760 },
});
