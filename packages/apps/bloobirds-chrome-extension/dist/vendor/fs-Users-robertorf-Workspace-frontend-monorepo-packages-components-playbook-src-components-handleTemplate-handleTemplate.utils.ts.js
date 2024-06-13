import { TemplateStage } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
function isSegmentationValues(values) {
  return !!values && (!!values[TemplateStage.Prospecting] && typeof values[TemplateStage.Prospecting] === "object" || !!values[TemplateStage.Sales] && typeof values[TemplateStage.Sales] === "object");
}
export const defaultTemplate = {
  segmentationValues: {
    [TemplateStage.Prospecting]: {},
    [TemplateStage.Sales]: {}
  },
  stage: TemplateStage.All,
  visibility: "PRIVATE",
  isOfficial: false,
  isBattlecard: false
};
export const getSegmentationValuesToSendToDB = (segmentationValues, stage) => {
  let newValues = {};
  if (stage === TemplateStage.All) {
    newValues = { [TemplateStage.Prospecting]: {}, [TemplateStage.Sales]: {} };
    Object.entries(segmentationValues[TemplateStage.Prospecting]).forEach(([fieldId, values]) => {
      if (values && values.length) {
        newValues[TemplateStage.Prospecting] = {
          ...newValues[TemplateStage.Prospecting] || {},
          [fieldId]: values
        };
      }
    });
    Object.entries(segmentationValues[TemplateStage.Sales]).forEach(([fieldId, values]) => {
      if (values && values.length) {
        newValues[TemplateStage.Sales] = {
          ...newValues[TemplateStage.Sales] || {},
          [fieldId]: values
        };
      }
    });
  } else {
    newValues = { [stage]: {} };
    Object.entries(segmentationValues[stage]).forEach(([fieldId, values]) => {
      if (values && values.length) {
        newValues[stage] = { ...newValues[stage], [fieldId]: values };
      }
    });
  }
  return newValues;
};
export const parseSegmentationValues = (values, stage) => {
  if (isSegmentationValues(values)) {
    return { ...defaultTemplate.segmentationValues, ...values };
  }
  if (!!values && typeof values === "object") {
    switch (stage) {
      case TemplateStage.Prospecting:
        return { [TemplateStage.Prospecting]: values, [TemplateStage.Sales]: {} };
      case TemplateStage.Sales:
        return { [TemplateStage.Prospecting]: {}, [TemplateStage.Sales]: values };
      case TemplateStage.All:
      default:
        return { [TemplateStage.Prospecting]: {}, [TemplateStage.Sales]: {} };
    }
  } else {
    return { [TemplateStage.Prospecting]: {}, [TemplateStage.Sales]: {} };
  }
};
