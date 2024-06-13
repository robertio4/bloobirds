var _s = $RefreshSig$();
import { useTranslation } from "/vendor/.vite-deps-react-i18next.js__v--8418bf92.js";
import { SearchType, TASK_FIELDS_LOGIC_ROLE, TASK_TYPE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-src-index.ts.js";
export const nurturingTabQuickFilters = (dataModel) => {
  _s();
  const {
    t
  } = useTranslation();
  const taskTypeLR = TASK_FIELDS_LOGIC_ROLE.TASK_TYPE;
  const taskTypeField = dataModel?.findFieldByLogicRole(taskTypeLR);
  const onCadenceLR = TASK_TYPE.PROSPECT_CADENCE;
  const onCadenceField = taskTypeField.values.find((a) => a.logicRole === onCadenceLR);
  const nextStepLR = TASK_TYPE.NEXT_STEP;
  const nextStepField = taskTypeField.values.find((a) => a.logicRole === nextStepLR);
  return [{
    id: "onCadence",
    name: t("leftBar.quickFilters.onCadence"),
    color: "peanut",
    filters: [{
      bobjectFieldId: taskTypeField?.id,
      values: [{
        bobjectPicklistValue: onCadenceField?.id,
        textValue: null,
        searchType: SearchType.EXACT
      }]
    }]
  }, {
    id: "manualTasks",
    name: t("leftBar.quickFilters.manualTasks"),
    color: "peanut",
    filters: [{
      bobjectFieldId: taskTypeField?.id,
      values: [{
        bobjectPicklistValue: nextStepField?.id,
        textValue: null,
        searchType: SearchType.EXACT
      }]
    }]
  }];
};
_s(nurturingTabQuickFilters, "zlIdU9EjM2llFt74AbE2KsUJXyM=", false, function() {
  return [useTranslation];
});
