import { useEffect, useMemo } from 'react';

import { useSearchSubscription } from '@bloobirds-it/plover';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BOBJECT_TYPES,
  BobjectTypes,
  LEAD_FIELDS_LOGIC_ROLE,
  LogicRoleType,
  MainBobjectTypes,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getReferencedBobjectFromLogicRole,
  getValueFromLogicRole,
  isActivity,
  isLead,
  isOpportunity,
} from '@bloobirds-it/utils';
import { atomFamily, useRecoilState } from 'recoil';
import useSWR from 'swr';

const loadingAtom = atomFamily({
  key: 'bobjectFormLoading',
  default: true,
});

const sectionsAtom = atomFamily({
  key: 'bobjectFormSections',
  default: [],
});

const cachedFieldGroups = {};

function getLeadsRequest(bobject, companyId) {
  if (companyId) {
    return {
      query: { [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
      formFields: true,
      pageSize: 50,
    };
  }
  return null;
}

function getOpportunitiesRequest(companyId) {
  if (companyId) {
    return {
      query: { [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
      formFields: true,
      pageSize: 50,
    };
  }
  //TODO: Opportunities of the leads are not yet supported
  return null;
}

const fetchFieldGroups = async bobjectType => {
  if (bobjectType in cachedFieldGroups) {
    return [...cachedFieldGroups[bobjectType]];
  }

  const response = await api.get(`/utils/service/view/field/groups/${bobjectType}`);

  cachedFieldGroups[bobjectType] = response.data.sections;

  return response.data.sections;
};

export const shouldShowStatusFields = (bobjectType, field, isSalesStage, isProspectingStage) => {
  if (bobjectType === BOBJECT_TYPES.LEAD || bobjectType === BOBJECT_TYPES.COMPANY) {
    if (field?.logicRole === bobjectType?.toUpperCase() + '__STATUS' && isSalesStage) {
      return false;
    } else if (
      field?.logicRole === bobjectType?.toUpperCase() + '__SALES_STATUS' &&
      isProspectingStage
    )
      return false;
    return true;
  } else {
    return true;
  }
};

const fetchRequiredMeetingFields = async () =>
  api.get('/utils/service/view/field/required/beforeMeeting');

const satisfiesCrossFieldConditions = ({ conditions, referencedBobjects = {} }) => {
  const translateBobject = type => referencedBobjects[type.toLowerCase()];
  return conditions?.every(
    (condition: {
      fieldValues: { value: string }[];
      field: { bobjectType: string; name: string };
    }) =>
      condition.fieldValues.some(
        (value: { value: string }) =>
          translateBobject(condition.field.bobjectType)?.raw?.contents?.[condition.field.name] ===
          value.value,
      ),
  );
};

const satisfiesCrossValueConditions = ({ value, referencedBobjects = {} }) => {
  const translateBobject = type => referencedBobjects[type.toLowerCase()];
  return value.conditions?.some(
    condition =>
      translateBobject(condition.requiredFieldBobjectType)?.raw.contents[
        condition.requiredFieldId
      ] === condition.requiredValueId,
  );
};

export const useBobjectFieldGroupsCleaning = () => {
  const cleanCachedBobjectGroups = () => {
    Object.keys(cachedFieldGroups).forEach(type => {
      delete cachedFieldGroups[type];
    });
  };

  return { cleanCachedBobjectGroups };
};

export const useBobjectFieldGroups = ({
  bobject,
  bobjectType,
  companyBobjectId,
  generateSections = true,
  options = {
    type: undefined,
  },
  modalId,
  segmentatedQQs = undefined,
}: {
  bobject: Bobject;
  bobjectType: BobjectTypes;
  companyBobjectId: string;
  generateSections?: boolean;
  options: any;
  modalId: string;
  segmentatedQQs: string[];
}) => {
  if (!generateSections) {
    return { loading: false, sections: null };
  }
  const [loading, setLoading] = useRecoilState(loadingAtom(modalId || companyBobjectId));
  const [sections, setSections] = useRecoilState(sectionsAtom(modalId || companyBobjectId));
  const { data: company } = useSWR(
    companyBobjectId ? `/Company/${companyBobjectId}/form` : null,
    () => api.get(`/bobjects/${companyBobjectId}/form`),
    {
      revalidateOnFocus: false,
    },
  );
  const { data: leadsData } = useSearchSubscription(
    getLeadsRequest(bobject, companyBobjectId),
    BOBJECT_TYPES.LEAD,
  );

  const { data: opportunitiesData } = useSearchSubscription(
    getOpportunitiesRequest(companyBobjectId),
    BOBJECT_TYPES.OPPORTUNITY,
  );
  const opportunities = opportunitiesData?.data?.contents;
  const opportunityLeadObj = isOpportunity(bobject)
    ? getReferencedBobjectFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT)
    : null;
  const opportunityLead = opportunityLeadObj ? [opportunityLeadObj] : null;
  const leads = leadsData?.data?.contents;
  const bobjectStage = getFieldByLogicRole(
    bobject,
    (bobjectType?.toUpperCase() + '__STAGE') as LogicRoleType<MainBobjectTypes>,
  )?.valueLogicRole;

  const isProspectingStage =
    bobjectStage === undefined ||
    bobjectStage === bobjectType?.toUpperCase() + '__STAGE__PROSPECTING';
  const isSalesStage = bobjectStage === bobjectType?.toUpperCase() + '__STAGE__SALES';
  const segmentatedQQsLength = segmentatedQQs ? segmentatedQQs?.length : 0;
  useEffect(() => {
    if (!bobjectType) return;
    const leadAssociated = getReferencedBobjectFromLogicRole(
      bobject,
      isActivity(bobject) ? ACTIVITY_FIELDS_LOGIC_ROLE.LEAD : TASK_FIELDS_LOGIC_ROLE.LEAD,
    );
    const bobjectLeads =
      isOpportunity(bobject) && !companyBobjectId
        ? opportunityLead
        : companyBobjectId
        ? leads
        : leadAssociated
        ? [leadAssociated]
        : leads;

    const referencedLeads = bobjectLeads?.length
      ? bobjectLeads?.map(lead => ({
          conditions: [],
          logicRole: null,
          parentFieldValueValue: null,
          value: lead.id.value,
        }))
      : [];

    const referencedOpportunities = opportunities?.map(opp => ({
      conditions: [],
      label: getValueFromLogicRole(opp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME, true),
      logicRole: null,
      parentFieldValueValue: null,
      value: opp.id.value,
    }));

    if (!cachedFieldGroups[bobjectType]) {
      setLoading(true);
    }

    fetchFieldGroups(bobjectType).then(response => {
      const newSections = response.map(section => {
        const fields = section?.fields
          ?.map(field => {
            const newField = { ...field };
            if (newField.type === 'Reference' && newField.referencedBobjectType === 'Lead') {
              newField.fieldValues =
                isLead(bobject) && referencedLeads?.length === 0
                  ? [
                      {
                        conditions: [],
                        logicRole: null,
                        parentFieldValueValue: null,
                        value: bobject.id.value,
                      },
                    ]
                  : referencedLeads;
            } else if (
              newField.type === 'Reference' &&
              newField.referencedBobjectType === 'Opportunity'
            ) {
              newField.fieldValues = referencedOpportunities;
            }
            return newField;
          })
          ?.filter(field =>
            shouldShowStatusFields(bobjectType, field, isSalesStage, isProspectingStage),
          );
        return { ...section, fields };
      });
      if (bobjectType === 'Activity' && options?.type === 'Meeting') {
        fetchRequiredMeetingFields().then(res => {
          const resp = res?.data;
          let response = res?.data;
          if (segmentatedQQs) {
            response = [
              {
                ...resp[0],
                fields: resp[0]?.fields.filter(field => segmentatedQQs.includes(field.label)),
              },
            ];
          }
          setSections([...newSections, ...response]);
          setLoading(false);
        });
      } else {
        setSections(newSections);
      }
      setLoading(false);
    });
  }, [bobjectType, leads, opportunities, segmentatedQQsLength, company]);

  const sectionsWithCrossConditions = useMemo(() => {
    return sections
      ?.filter(section => section?.fields)
      ?.map(section => ({
        ...section,
        fields: section?.fields?.map(field => {
          const fieldHasCrossConditions = field?.fieldValues
            ?.map(value => ({
              ...value,
              conditions: value.conditions?.filter(condition => condition.isCrossBobject),
            }))
            .some(crossValue => crossValue.conditions?.length > 0);
          return {
            ...field,
            satisfiesFieldCrossCondition: satisfiesCrossFieldConditions({
              conditions: field.fieldConditionsByField?.filter(
                condition => condition.field.bobjectType !== bobjectType,
              ),
              referencedBobjects: { company },
            }),
            fieldValues: () => {
              const filteredValues = field.fieldValues?.filter(fieldValue => {
                const valueHasCrossConditions = fieldValue.conditions?.some(
                  condition => condition.isCrossBobject,
                );
                if (valueHasCrossConditions) {
                  return satisfiesCrossValueConditions({
                    value: {
                      ...fieldValue,
                      conditions: fieldValue.conditions?.filter(
                        condition => condition.isCrossBobject,
                      ),
                    },
                    referencedBobjects: {
                      company,
                      // lead: selectedLead,
                      // opportunity: selectedOpportunity,
                    },
                  });
                }
                return fieldHasCrossConditions && valueHasCrossConditions;
              });
              return filteredValues?.length === 0 && field.fieldValues?.length > 0
                ? [...(field?.fieldValues || [])]
                : filteredValues;
            },
          };
        }),
      }));
  }, [sections]);

  return { loading, sections: sectionsWithCrossConditions };
};
