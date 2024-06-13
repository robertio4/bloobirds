import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"];
import { useSearchSubscription } from "/vendor/.vite-deps-@bloobirds-it_plover.js__v--88b8fafa.js";
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  BOBJECT_TYPES,
  LEAD_FIELDS_LOGIC_ROLE,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
  TASK_FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import {
  api,
  getFieldByLogicRole,
  getReferencedBobjectFromLogicRole,
  getValueFromLogicRole,
  isActivity,
  isLead,
  isOpportunity
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atomFamily, useRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
const loadingAtom = atomFamily({
  key: "bobjectFormLoading",
  default: true
});
const sectionsAtom = atomFamily({
  key: "bobjectFormSections",
  default: []
});
const cachedFieldGroups = {};
function getLeadsRequest(bobject, companyId) {
  if (companyId) {
    return {
      query: { [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
      formFields: true,
      pageSize: 50
    };
  }
  return null;
}
function getOpportunitiesRequest(companyId) {
  if (companyId) {
    return {
      query: { [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
      formFields: true,
      pageSize: 50
    };
  }
  return null;
}
const fetchFieldGroups = async (bobjectType) => {
  if (bobjectType in cachedFieldGroups) {
    return [...cachedFieldGroups[bobjectType]];
  }
  const response = await api.get(`/utils/service/view/field/groups/${bobjectType}`);
  cachedFieldGroups[bobjectType] = response.data.sections;
  return response.data.sections;
};
export const shouldShowStatusFields = (bobjectType, field, isSalesStage, isProspectingStage) => {
  if (bobjectType === BOBJECT_TYPES.LEAD || bobjectType === BOBJECT_TYPES.COMPANY) {
    if (field?.logicRole === bobjectType?.toUpperCase() + "__STATUS" && isSalesStage) {
      return false;
    } else if (field?.logicRole === bobjectType?.toUpperCase() + "__SALES_STATUS" && isProspectingStage)
      return false;
    return true;
  } else {
    return true;
  }
};
const fetchRequiredMeetingFields = async () => api.get("/utils/service/view/field/required/beforeMeeting");
const satisfiesCrossFieldConditions = ({ conditions, referencedBobjects = {} }) => {
  const translateBobject = (type) => referencedBobjects[type.toLowerCase()];
  return conditions?.every(
    (condition) => condition.fieldValues.some(
      (value) => translateBobject(condition.field.bobjectType)?.raw?.contents?.[condition.field.name] === value.value
    )
  );
};
const satisfiesCrossValueConditions = ({ value, referencedBobjects = {} }) => {
  const translateBobject = (type) => referencedBobjects[type.toLowerCase()];
  return value.conditions?.some(
    (condition) => translateBobject(condition.requiredFieldBobjectType)?.raw.contents[condition.requiredFieldId] === condition.requiredValueId
  );
};
export const useBobjectFieldGroupsCleaning = () => {
  const cleanCachedBobjectGroups = () => {
    Object.keys(cachedFieldGroups).forEach((type) => {
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
    type: void 0
  },
  modalId,
  segmentatedQQs = void 0
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
      revalidateOnFocus: false
    }
  );
  const { data: leadsData } = useSearchSubscription(
    getLeadsRequest(bobject, companyBobjectId),
    BOBJECT_TYPES.LEAD
  );
  const { data: opportunitiesData } = useSearchSubscription(
    getOpportunitiesRequest(companyBobjectId),
    BOBJECT_TYPES.OPPORTUNITY
  );
  const opportunities = opportunitiesData?.data?.contents;
  const opportunityLeadObj = isOpportunity(bobject) ? getReferencedBobjectFromLogicRole(bobject, OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT) : null;
  const opportunityLead = opportunityLeadObj ? [opportunityLeadObj] : null;
  const leads = leadsData?.data?.contents;
  const bobjectStage = getFieldByLogicRole(
    bobject,
    bobjectType?.toUpperCase() + "__STAGE"
  )?.valueLogicRole;
  const isProspectingStage = bobjectStage === void 0 || bobjectStage === bobjectType?.toUpperCase() + "__STAGE__PROSPECTING";
  const isSalesStage = bobjectStage === bobjectType?.toUpperCase() + "__STAGE__SALES";
  const segmentatedQQsLength = segmentatedQQs ? segmentatedQQs?.length : 0;
  useEffect(() => {
    if (!bobjectType)
      return;
    const leadAssociated = getReferencedBobjectFromLogicRole(
      bobject,
      isActivity(bobject) ? ACTIVITY_FIELDS_LOGIC_ROLE.LEAD : TASK_FIELDS_LOGIC_ROLE.LEAD
    );
    const bobjectLeads = isOpportunity(bobject) && !companyBobjectId ? opportunityLead : companyBobjectId ? leads : leadAssociated ? [leadAssociated] : leads;
    const referencedLeads = bobjectLeads?.length ? bobjectLeads?.map((lead) => ({
      conditions: [],
      logicRole: null,
      parentFieldValueValue: null,
      value: lead.id.value
    })) : [];
    const referencedOpportunities = opportunities?.map((opp) => ({
      conditions: [],
      label: getValueFromLogicRole(opp, OPPORTUNITY_FIELDS_LOGIC_ROLE.NAME, true),
      logicRole: null,
      parentFieldValueValue: null,
      value: opp.id.value
    }));
    if (!cachedFieldGroups[bobjectType]) {
      setLoading(true);
    }
    fetchFieldGroups(bobjectType).then((response) => {
      const newSections = response.map((section) => {
        const fields = section?.fields?.map((field) => {
          const newField = { ...field };
          if (newField.type === "Reference" && newField.referencedBobjectType === "Lead") {
            newField.fieldValues = isLead(bobject) && referencedLeads?.length === 0 ? [
              {
                conditions: [],
                logicRole: null,
                parentFieldValueValue: null,
                value: bobject.id.value
              }
            ] : referencedLeads;
          } else if (newField.type === "Reference" && newField.referencedBobjectType === "Opportunity") {
            newField.fieldValues = referencedOpportunities;
          }
          return newField;
        })?.filter(
          (field) => shouldShowStatusFields(bobjectType, field, isSalesStage, isProspectingStage)
        );
        return { ...section, fields };
      });
      if (bobjectType === "Activity" && options?.type === "Meeting") {
        fetchRequiredMeetingFields().then((res) => {
          const resp = res?.data;
          let response2 = res?.data;
          if (segmentatedQQs) {
            response2 = [
              {
                ...resp[0],
                fields: resp[0]?.fields.filter((field) => segmentatedQQs.includes(field.label))
              }
            ];
          }
          setSections([...newSections, ...response2]);
          setLoading(false);
        });
      } else {
        setSections(newSections);
      }
      setLoading(false);
    });
  }, [bobjectType, leads, opportunities, segmentatedQQsLength, company]);
  const sectionsWithCrossConditions = useMemo(() => {
    return sections?.filter((section) => section?.fields)?.map((section) => ({
      ...section,
      fields: section?.fields?.map((field) => {
        const fieldHasCrossConditions = field?.fieldValues?.map((value) => ({
          ...value,
          conditions: value.conditions?.filter((condition) => condition.isCrossBobject)
        })).some((crossValue) => crossValue.conditions?.length > 0);
        return {
          ...field,
          satisfiesFieldCrossCondition: satisfiesCrossFieldConditions({
            conditions: field.fieldConditionsByField?.filter(
              (condition) => condition.field.bobjectType !== bobjectType
            ),
            referencedBobjects: { company }
          }),
          fieldValues: () => {
            const filteredValues = field.fieldValues?.filter((fieldValue) => {
              const valueHasCrossConditions = fieldValue.conditions?.some(
                (condition) => condition.isCrossBobject
              );
              if (valueHasCrossConditions) {
                return satisfiesCrossValueConditions({
                  value: {
                    ...fieldValue,
                    conditions: fieldValue.conditions?.filter(
                      (condition) => condition.isCrossBobject
                    )
                  },
                  referencedBobjects: {
                    company
                  }
                });
              }
              return fieldHasCrossConditions && valueHasCrossConditions;
            });
            return filteredValues?.length === 0 && field.fieldValues?.length > 0 ? [...field?.fieldValues || []] : filteredValues;
          }
        };
      })
    }));
  }, [sections]);
  return { loading, sections: sectionsWithCrossConditions };
};
