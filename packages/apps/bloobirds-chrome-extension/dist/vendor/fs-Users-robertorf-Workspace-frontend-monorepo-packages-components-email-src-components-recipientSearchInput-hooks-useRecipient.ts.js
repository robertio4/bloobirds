import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useGetBobjectByTypeAndId, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getValueFromLogicRole } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { getContactProps } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-utils-emailModal.utils.ts.js";
import { emptyContact, SearchType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-recipientSearchInput.tsx.js";
import { useBobjectsByEmails } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-components-recipientSearchInput-hooks-useBobjectsByEmails.ts.js";
function getReferenceId(bobject) {
  const bobjectType = bobject.id.typeName;
  if (bobjectType === BobjectTypes.Lead) {
    return getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY) || bobject.id.value;
  } else {
    return bobject.id.value;
  }
}
export function useParseEmailsIntoContact(accountId, isFirstLoad, emails = [], dataModel) {
  const companyEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Company, "EMAIL").map((f) => f.id);
  const leadEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Lead, "EMAIL").map((f) => f.id);
  const contacts = [];
  const { bobjects: leadsFromDB, isValidating: isValidatingLead } = useBobjectsByEmails(
    isFirstLoad && accountId,
    "Lead",
    leadEmailFields,
    emails
  );
  const { bobjects: companiesFromDB, isValidating: isValidatingCompany } = useBobjectsByEmails(
    isFirstLoad && accountId,
    "Company",
    companyEmailFields,
    emails
  );
  const isLoading = isValidatingLead || isValidatingCompany;
  if (isFirstLoad && !isLoading && emails) {
    emails.forEach((email) => {
      const lead = leadsFromDB?.find((b) => {
        return leadEmailFields.some((fieldId) => b.raw.contents[fieldId] === email);
      });
      const companyFromDB = companiesFromDB?.find((b) => {
        return companyEmailFields.some((fieldId) => b.raw.contents[fieldId] === email);
      });
      if (lead) {
        const companyId = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY);
        contacts.push({
          bobject: {
            id: lead.id,
            bobjectType: BobjectTypes.Lead,
            fullName: getValueFromLogicRole(lead, "LEAD__FULL_NAME"),
            ...companyId && {
              company: {
                id: {
                  accountId,
                  objectId: "",
                  typeName: BobjectTypes.Company,
                  value: companyId
                }
              }
            }
          },
          email,
          name: getValueFromLogicRole(lead, "LEAD__FULL_NAME"),
          icon: "person",
          isInDB: true,
          referenceId: getReferenceId(lead)
        });
      } else if (companyFromDB) {
        contacts.push({
          name: "",
          bobject: {
            id: companyFromDB.id,
            bobjectType: BobjectTypes.Company,
            name: ""
          },
          email,
          icon: "company",
          isInDB: true,
          referenceId: getReferenceId(companyFromDB)
        });
      } else {
        contacts.push({ ...emptyContact, email });
      }
    });
  }
  return { contacts, isLoadingContacts: isLoading };
}
function getCompanyLeads(companyIdValue) {
  const accountId = companyIdValue.split("/")[0];
  if (accountId)
    return api.post("/bobjects/" + accountId + "/Lead/search", {
      query: { LEAD__COMPANY: [companyIdValue] },
      formFields: true,
      pageSize: 50,
      injectReferences: true
    });
}
export function useRelatedContacts(company, dataModel) {
  const companyId = company?.id.value;
  const { bobject: companyFromBE } = useGetBobjectByTypeAndId(companyId);
  const companyEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Company, "EMAIL").map((f) => f.id);
  const leadEmailFields = dataModel && dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Lead, "EMAIL").map((f) => f.id);
  const { data: leadsFromBE } = useSWR(
    companyId ? `lead-company-leads-${companyId}` : null,
    () => getCompanyLeads(companyId)
  );
  const contacts = [];
  if (companyFromBE && companyEmailFields) {
    companyEmailFields.forEach((field) => {
      const email = companyFromBE.raw?.contents[field];
      if (email) {
        contacts.push({
          name: getValueFromLogicRole(companyFromBE, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          email,
          icon: "company",
          isInDB: true,
          referenceId: companyId,
          bobject: {
            id: companyFromBE.id,
            bobjectType: BobjectTypes.Company,
            name: ""
          }
        });
      }
    });
  }
  if (leadsFromBE && leadEmailFields) {
    leadsFromBE.data?.contents?.map((lead) => {
      leadEmailFields.forEach((field) => {
        const email = lead.raw.contents[field];
        if (email) {
          contacts.push({
            name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            email,
            icon: "person",
            isInDB: true,
            referenceId: companyId,
            bobject: {
              id: lead.id,
              bobjectType: BobjectTypes.Lead,
              fullName: getValueFromLogicRole(lead, "LEAD__FULL_NAME"),
              ...companyId && {
                company: {
                  id: {
                    accountId: lead.id.accountId,
                    objectId: "",
                    typeName: BobjectTypes.Company,
                    value: companyId
                  }
                }
              }
            }
          });
        }
      });
    });
  }
  return { contacts };
}
const useGlobalContacts = ({ searchTerm, accountId }) => {
  const [contacts, setContacts] = useState();
  useEffect(() => {
    api.post(`/bobjects/${accountId}/global-search`, {
      query: searchTerm,
      bobjectTypes: ["Company", "Lead"],
      filters: ["WITH_EMAIL"],
      numberOfResults: 10
    }).then((response) => {
      setContacts(response?.data?.results);
    });
  }, [searchTerm, accountId]);
  return { contacts, isValidating: !contacts };
};
export const useRecipientSeachInput = ({
  company,
  selectedContacts,
  dataModel
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState(
    company ? SearchType.relatedBobjects : SearchType.globalSearch
  );
  const { contacts: relatedContacts } = useRelatedContacts(company, dataModel);
  const { users: availableCompanyContacts } = useUserSearch();
  const { contacts: globalContacts, isValidating } = useGlobalContacts({
    accountId: dataModel?.getAccountId(),
    searchTerm: searchTerm?.toLowerCase()
  });
  const availableGlobalContacts = useMemo(() => {
    if (!globalContacts) {
      return [];
    }
    return globalContacts.reduce((acc, { emails, ...contact }) => {
      const contactProps = getContactProps(contact);
      const referenceId = contact.bobjectType === BobjectTypes.Lead ? contact?.companyId : contact?.rawBobject?.id;
      const parsedContacts = emails?.map((email) => ({ ...contactProps, email, referenceId })).filter((c) => !selectedContacts?.find((sc) => sc.email === c.email));
      return [...acc, ...parsedContacts];
    }, []);
  }, [globalContacts, selectedContacts]);
  function getAvailableContacts() {
    switch (searchType) {
      case SearchType.relatedBobjects:
        return relatedContacts.filter(
          (contact) => !selectedContacts?.find((sc) => sc.email === contact.email) && (!searchTerm || contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) || contact.email?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      case SearchType.globalSearch:
        return availableGlobalContacts;
      case SearchType.companySearch: {
        const filteredContacts = availableCompanyContacts?.filter(
          (contact) => !selectedContacts?.find((sc) => sc.email === contact.email) && (!searchTerm || contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || contact?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        return filteredContacts?.reduce((acc, { email, name }) => {
          if (selectedContacts?.find((sc) => sc.email === email)) {
            return acc;
          }
          return [
            ...acc,
            {
              email,
              name,
              icon: "person",
              isInDB: false,
              referenceId: void 0,
              bobject: void 0,
              isCompanyMember: true
            }
          ];
        }, []);
      }
    }
  }
  const availableContacts = getAvailableContacts();
  return {
    isValidating,
    availableGlobalContacts,
    availableContacts,
    globalContacts,
    relatedContacts,
    availableCompanyContacts,
    searchTerm,
    setSearchTerm,
    searchType,
    setSearchType
  };
};
