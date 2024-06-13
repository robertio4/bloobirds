import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"];
import {
  BobjectTypes,
  TemplateStage
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport3_lodash_sortBy from "/vendor/.vite-deps-lodash_sortBy.js__v--db3f7ac0.js"; const sortBy = __vite__cjsImport3_lodash_sortBy.__esModule ? __vite__cjsImport3_lodash_sortBy.default : __vite__cjsImport3_lodash_sortBy;
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useDataModel } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useDataModel.ts.js";
import { useFieldsData } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-useFields.ts.js";
const fetchSegmentations = async ([url, stage]) => {
  const response = await api.get(`${url}?stage=${stage}`, {
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    data: {}
  }).then((res) => res?.data);
  return sortBy(response, "ordering");
};
export const usePlaybookSegmentation = (stage) => {
  const { data: segmentations } = useSWR(["/messaging/segmentations", stage], fetchSegmentations);
  const dataModel = useDataModel();
  const dataModelFieldsByBobjectType = dataModel?.findMainBobjectTypes();
  const dataModelFields = dataModelFieldsByBobjectType?.flatMap((fields) => fields.fields);
  const segmentationFields = useMemo(
    () => segmentations?.reduce(
      (acc, segmentation) => {
        const { bobjectFieldId } = segmentation;
        const field = dataModelFields?.find(
          (dataModelField) => dataModelField.id === bobjectFieldId
        );
        if (field)
          return { ...acc, [segmentation.stage]: [...acc[segmentation.stage], field] };
        return acc;
      },
      { [TemplateStage.Prospecting]: [], [TemplateStage.Sales]: [] }
    ),
    [segmentations, dataModelFields]
  );
  return { segmentationFields, isLoading: !dataModel };
};
export const usePlaybook = ({
  stage,
  bobjectData
}) => {
  const activeRawBobject = bobjectData?.activeBobject?.rawBobject ?? bobjectData?.activeBobject?.raw?.contents;
  const companyRawBobject = bobjectData?.company?.rawBobject ?? bobjectData?.company?.raw?.contents;
  const activeBobjectType = bobjectData?.activeBobject?.id?.typeName;
  const { data: segmentations } = useSWR(["/messaging/segmentations", stage], fetchSegmentations);
  const { getFieldValuesById } = useFieldsData();
  const segmentationFields = useMemo(
    () => segmentations?.reduce(
      (acc, segmentation) => {
        const { bobjectFieldId, bobjectType: segmentationBobjectType } = segmentation;
        let field = getFieldValuesById(bobjectFieldId, segmentationBobjectType);
        if (activeBobjectType === BobjectTypes.Lead && !field)
          field = getFieldValuesById(bobjectFieldId, BobjectTypes.Company) || getFieldValuesById(bobjectFieldId, BobjectTypes.Opportunity);
        if (field)
          return { ...acc, [segmentation.stage]: [...acc[segmentation.stage], field] };
        return acc;
      },
      { [TemplateStage.Prospecting]: [], [TemplateStage.Sales]: [] }
    ),
    [segmentations]
  );
  const activeBobjectSegmentationValues = useMemo(() => {
    let activeSegmentationValues = {};
    [TemplateStage.Prospecting, TemplateStage.Sales].forEach((stage2) => {
      segmentationFields?.[stage2]?.map((field) => {
        const fieldValue = activeBobjectType === BobjectTypes.Lead ? activeRawBobject?.[field?.id] || companyRawBobject?.[field?.id] : activeRawBobject?.[field?.id];
        if (fieldValue)
          activeSegmentationValues = {
            ...activeSegmentationValues,
            ...{
              [field.id]: [fieldValue]
            }
          };
      }, {});
    });
    return activeSegmentationValues;
  }, [bobjectData?.activeBobject?.id?.value, !!companyRawBobject, segmentationFields]);
  return {
    segmentationFields,
    activeBobjectSegmentationValues
  };
};
