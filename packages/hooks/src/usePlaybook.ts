import { useMemo } from 'react';

import {
  Bobject,
  BobjectTypes,
  ExtensionCompany,
  MainBobjectTypes,
  SegmentationData,
  TemplateStage,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import sortBy from 'lodash/sortBy';
import useSWR from 'swr';

import { useDataModel } from './useDataModel';
import { useFieldsData } from './useFields';

const fetchSegmentations = async ([url, stage]) => {
  const response = await api
    .get(`${url}?stage=${stage}`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      data: {},
    })
    .then(res => res?.data);
  return sortBy(response, 'ordering');
};

export interface UsePlaybook {
  stage: TemplateStage;
  bobjectData: {
    company: Bobject<BobjectTypes.Company> | Partial<ExtensionCompany>;
    activeBobject: Bobject<MainBobjectTypes>;
  };
}

export const usePlaybookSegmentation = (stage: TemplateStage) => {
  const { data: segmentations } = useSWR(['/messaging/segmentations', stage], fetchSegmentations);
  const dataModel = useDataModel();
  const dataModelFieldsByBobjectType = dataModel?.findMainBobjectTypes();
  const dataModelFields = dataModelFieldsByBobjectType?.flatMap(fields => fields.fields);

  const segmentationFields = useMemo(
    () =>
      segmentations?.reduce(
        (acc, segmentation) => {
          const { bobjectFieldId } = segmentation;
          const field = dataModelFields?.find(
            dataModelField => dataModelField.id === bobjectFieldId,
          );
          if (field) return { ...acc, [segmentation.stage]: [...acc[segmentation.stage], field] };
          return acc;
        },
        { [TemplateStage.Prospecting]: [], [TemplateStage.Sales]: [] },
      ),
    [segmentations, dataModelFields],
  );
  return { segmentationFields, isLoading: !dataModel };
};

export const usePlaybook = ({
  stage,
  bobjectData,
}: UsePlaybook): {
  segmentationFields: SegmentationData;
  activeBobjectSegmentationValues: { [id: string]: string };
} => {
  const activeRawBobject =
    bobjectData?.activeBobject?.rawBobject ?? bobjectData?.activeBobject?.raw?.contents;
  const companyRawBobject =
    bobjectData?.company?.rawBobject ??
    (bobjectData?.company as Bobject<BobjectTypes.Company>)?.raw?.contents;
  const activeBobjectType = bobjectData?.activeBobject?.id?.typeName;
  const { data: segmentations } = useSWR(['/messaging/segmentations', stage], fetchSegmentations);
  const { getFieldValuesById } = useFieldsData();
  const segmentationFields = useMemo(
    () =>
      segmentations?.reduce(
        (acc, segmentation) => {
          const { bobjectFieldId, bobjectType: segmentationBobjectType } = segmentation;
          let field = getFieldValuesById(bobjectFieldId, segmentationBobjectType);
          if (activeBobjectType === BobjectTypes.Lead && !field)
            field =
              getFieldValuesById(bobjectFieldId, BobjectTypes.Company) ||
              getFieldValuesById(bobjectFieldId, BobjectTypes.Opportunity);
          if (field) return { ...acc, [segmentation.stage]: [...acc[segmentation.stage], field] };
          return acc;
        },
        { [TemplateStage.Prospecting]: [], [TemplateStage.Sales]: [] },
      ),
    [segmentations],
  );

  const activeBobjectSegmentationValues = useMemo(() => {
    let activeSegmentationValues = {};
    [TemplateStage.Prospecting, TemplateStage.Sales].forEach(stage => {
      segmentationFields?.[stage]?.map(field => {
        const fieldValue =
          activeBobjectType === BobjectTypes.Lead
            ? activeRawBobject?.[field?.id] || companyRawBobject?.[field?.id]
            : activeRawBobject?.[field?.id];
        if (fieldValue)
          activeSegmentationValues = {
            ...activeSegmentationValues,
            ...{
              [field.id]: [fieldValue],
            },
          };
      }, {});
    });
    return activeSegmentationValues;
  }, [bobjectData?.activeBobject?.id?.value, !!companyRawBobject, segmentationFields]);

  return {
    segmentationFields,
    activeBobjectSegmentationValues,
  };
};
