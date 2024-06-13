import { ServiceApi } from '../misc/api/service';
import { bobjectModel } from '../misc/model/bobjectFieldsModel';
import {
  getFieldByLogicRole,
  getReferencedBobjectFromLogicRole,
  getValueFromLogicRole,
  hasRequiredMissing,
  isActivity,
  isLead,
  isOpportunity,
} from '../utils/bobjects.utils';
import { useEffect, useMemo } from 'react';
import { atomFamily, useRecoilState } from 'recoil';
import { BOBJECT_TYPES } from '@bloobirds-it/types';
import { useEntity } from './entities/useEntity';
import useSWR from 'swr';
import { BobjectApi } from '../misc/api/bobject';
import { LEAD_FIELDS_LOGIC_ROLE } from '../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../constants/opportunity';
import { useSearchSubscription } from '@bloobirds-it/plover';
import { useBobjectTypes } from './useBobjectTypes';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '../constants/activity';
import { TASK_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';

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

  const response = await ServiceApi.request({
    method: 'GET',
    url: `/service/view/field/groups/${bobjectType}`,
  });

  cachedFieldGroups[bobjectType] = response.sections;

  return response.sections;
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
  ServiceApi.request({
    method: 'GET',
    url: '/service/view/field/required/beforeMeeting',
  });

const satisfiesCrossFieldConditions = ({ field, conditions, referencedBobjects = {} }) => {
  const translateBobject = type => referencedBobjects[type.toLowerCase()];
  return conditions?.every(condition =>
    condition.fieldValues.some(
      value =>
        translateBobject(condition.field.bobjectType)?.raw.contents[condition.field.name] ===
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
  options = {},
  modalId,
  segmentatedQQs = undefined,
}) => {
  if (!generateSections) {
    return { loading: false, sections: null };
  }
  const [loading, setLoading] = useRecoilState(loadingAtom(modalId || companyBobjectId));
  const [sections, setSections] = useRecoilState(sectionsAtom(modalId || companyBobjectId));
  const companyId = companyBobjectId?.split('/')[2];
  const { data: company } = useSWR(companyId ? `/Company/${companyId}/form` : null, () =>
    BobjectApi.request().bobjectType(BOBJECT_TYPES.COMPANY).getForm(companyId),
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
  const bobjectStage = getFieldByLogicRole(bobject, bobjectType?.toUpperCase() + '__STAGE')
    ?.valueLogicRole;

  const isProspectingStage =
    bobjectStage === undefined ||
    bobjectStage === bobjectType?.toUpperCase() + '__STAGE__PROSPECTING';
  const isSalesStage = bobjectStage === bobjectType?.toUpperCase() + '__STAGE__SALES';

  const bobjectTypes = useBobjectTypes();
  const bobjectFields = useEntity('bobjectFields');
  const bobjectConditionalFields = useEntity('bobjectConditionalFields');
  const segmentatedQQsLength = segmentatedQQs ? segmentatedQQs?.length : 0;
  useEffect(() => {
    if (!bobjectType) return;
    const leadAssociated = getReferencedBobjectFromLogicRole(
      bobject,
      isActivity(bobject) ? ACTIVITY_FIELDS_LOGIC_ROLE.LEAD : TASK_FIELDS_LOGIC_ROLE.LEAD,
    );
    const bobjectLeads =
      isOpportunity(bobject) && !companyId
        ? opportunityLead
        : companyBobjectId
        ? leads
        : leadAssociated
        ? [leadAssociated]
        : leads;

    const referencedLeads = bobjectLeads?.length
      ? bobjectLeads?.map(lead => ({
          conditions: [],
          label: bobjectModel(lead).find('FULL_NAME').text,
          stage: bobjectModel(lead).find('STAGE')?.text,
          missingRequiredInfo: hasRequiredMissing({
            bobjectType: BOBJECT_TYPES.LEAD,
            bobjectTypes,
            bobjectFields,
            bobject: lead,
            bobjectConditionalFields,
          }),
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
        const fields = section.fields
          .map(field => {
            const newField = { ...field };
            if (newField.type === 'Reference' && newField.referencedBobjectType === 'Lead') {
              newField.fieldValues =
                isLead(bobject) && referencedLeads?.length === 0
                  ? [
                      {
                        conditions: [],
                        label: bobjectModel(bobject).find('FULL_NAME').text,
                        stage: bobjectModel(bobject).find('STAGE').text,
                        missingRequiredInfo: hasRequiredMissing({
                          bobjectType: BOBJECT_TYPES.LEAD,
                          bobjectTypes,
                          bobjectFields,
                          bobject: bobject,
                          bobjectConditionalFields,
                        }),
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
      if (bobjectType === 'Activity' && options.type === 'Meeting') {
        fetchRequiredMeetingFields().then(res => {
          if (segmentatedQQs) {
            res = [
              {
                ...res[0],
                fields: res[0]?.fields.filter(field => segmentatedQQs.includes(field.label)),
              },
            ];
          }
          setSections([...newSections, ...res]);
          setLoading(false);
        });
      } else {
        setSections(newSections);
      }
      setLoading(false);
    });
  }, [bobjectType, leads, opportunities, segmentatedQQsLength, company]);

  const sectionsWithCrossConditions = useMemo(
    () =>
      sections.map(section => ({
        ...section,
        fields: section.fields.map(field => {
          const fieldHasCrossConditions = field?.fieldValues
            ?.map(value => ({
              ...value,
              conditions: value.conditions?.filter(condition => condition.isCrossBobject),
            }))
            .some(crossValue => crossValue.conditions?.length > 0);
          return {
            ...field,
            satisfiesFieldCrossCondition: satisfiesCrossFieldConditions({
              field,
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
                ? [...field.fieldValues]
                : filteredValues;
            },
          };
        }),
      })),
    [sections],
  );

  return { loading, sections: sectionsWithCrossConditions };
};
