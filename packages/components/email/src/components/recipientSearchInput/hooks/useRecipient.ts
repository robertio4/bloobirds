import { useEffect, useMemo, useState } from 'react';

import { useGetBobjectByTypeAndId, useUserSearch } from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectId,
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  DataModelResponse,
  LEAD_FIELDS_LOGIC_ROLE,
  StrDict,
} from '@bloobirds-it/types';
import { api, getValueFromLogicRole } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { getContactProps } from '../../../utils/emailModal.utils';
import { Contact, emptyContact, SearchType } from '../recipientSearchInput';
import { useBobjectsByEmails } from './useBobjectsByEmails';

function getReferenceId(bobject: Bobject) {
  const bobjectType = bobject.id.typeName;
  if (bobjectType === BobjectTypes.Lead) {
    return getValueFromLogicRole(bobject, LEAD_FIELDS_LOGIC_ROLE.COMPANY) || bobject.id.value;
  } else {
    return bobject.id.value;
  }
}

export function useParseEmailsIntoContact(
  accountId: string,
  isFirstLoad: boolean,
  emails: string[] = [],
  //leads: Bobject[],
  dataModel: DataModelResponse,
): { contacts: Contact[]; isLoadingContacts: boolean } {
  const companyEmailFields =
    dataModel &&
    dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Company, 'EMAIL').map(f => f.id);
  const leadEmailFields =
    dataModel &&
    dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Lead, 'EMAIL').map(f => f.id);

  const contacts: Contact[] = [];

  const { bobjects: leadsFromDB, isValidating: isValidatingLead } = useBobjectsByEmails(
    isFirstLoad && accountId,
    'Lead',
    leadEmailFields,
    emails,
  );
  const { bobjects: companiesFromDB, isValidating: isValidatingCompany } = useBobjectsByEmails(
    isFirstLoad && accountId,
    'Company',
    companyEmailFields,
    emails,
  );
  const isLoading = isValidatingLead || isValidatingCompany;
  if (isFirstLoad && !isLoading && emails) {
    emails.forEach(email => {
      const lead: Bobject = leadsFromDB?.find(b => {
        return leadEmailFields.some(fieldId => b.raw.contents[fieldId] === email);
      });
      const companyFromDB: Bobject = companiesFromDB?.find(b => {
        return companyEmailFields.some(fieldId => b.raw.contents[fieldId] === email);
      });
      if (lead) {
        const companyId = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.COMPANY) as BobjectId<
          BobjectTypes.Company
        >['value'];
        contacts.push({
          bobject: {
            id: lead.id,
            bobjectType: BobjectTypes.Lead as BobjectTypes.Lead,
            fullName: getValueFromLogicRole(lead, 'LEAD__FULL_NAME'),
            ...(companyId && {
              company: {
                id: {
                  accountId,
                  objectId: '',
                  typeName: BobjectTypes.Company,
                  value: companyId,
                },
              },
            }),
          },
          email: email,
          name: getValueFromLogicRole(lead, 'LEAD__FULL_NAME'),
          icon: 'person',
          isInDB: true,
          referenceId: getReferenceId(lead),
        });
      } else if (companyFromDB) {
        contacts.push({
          name: '',
          bobject: {
            id: companyFromDB.id,
            bobjectType: BobjectTypes.Company as BobjectTypes.Company,
            name: '',
          },
          email: email,
          icon: 'company',
          isInDB: true,
          referenceId: getReferenceId(companyFromDB),
        });
      } else {
        contacts.push({ ...emptyContact, email });
      }
    });
  }
  return { contacts, isLoadingContacts: isLoading };
}

function getCompanyLeads(companyIdValue) {
  const accountId = companyIdValue.split('/')[0];
  if (accountId)
    return api.post('/bobjects/' + accountId + '/Lead/search', {
      query: { LEAD__COMPANY: [companyIdValue] },
      formFields: true,
      pageSize: 50,
      injectReferences: true,
    });
}

export function useRelatedContacts(company: Bobject, dataModel: DataModelResponse) {
  const companyId = company?.id.value;
  const { bobject: companyFromBE } = useGetBobjectByTypeAndId(companyId);

  const companyEmailFields =
    dataModel &&
    dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Company, 'EMAIL').map(f => f.id);
  const leadEmailFields =
    dataModel &&
    dataModel.findFieldsByTypeAndBobjectType(BobjectTypes.Lead, 'EMAIL').map(f => f.id);

  const { data: leadsFromBE } = useSWR(companyId ? `lead-company-leads-${companyId}` : null, () =>
    getCompanyLeads(companyId),
  );

  const contacts: Contact[] = [];

  if (companyFromBE && companyEmailFields) {
    companyEmailFields.forEach(field => {
      const email = companyFromBE.raw?.contents[field];
      if (email) {
        contacts.push({
          name: getValueFromLogicRole(companyFromBE, COMPANY_FIELDS_LOGIC_ROLE.NAME),
          email,
          icon: 'company',
          isInDB: true,
          referenceId: companyId,
          bobject: {
            id: companyFromBE.id,
            bobjectType: BobjectTypes.Company as BobjectTypes.Company,
            name: '',
          },
        });
      }
    });
  }

  if (leadsFromBE && leadEmailFields) {
    leadsFromBE.data?.contents?.map((lead: Bobject) => {
      leadEmailFields.forEach(field => {
        const email = lead.raw.contents[field];
        if (email) {
          contacts.push({
            name: getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME),
            email,
            icon: 'person',
            isInDB: true,
            referenceId: companyId,
            bobject: {
              id: lead.id,
              bobjectType: BobjectTypes.Lead as BobjectTypes.Lead,
              fullName: getValueFromLogicRole(lead, 'LEAD__FULL_NAME'),
              ...(companyId && {
                company: {
                  id: {
                    accountId: lead.id.accountId,
                    objectId: '',
                    typeName: BobjectTypes.Company,
                    value: companyId,
                  },
                },
              }),
            },
          });
        }
      });
    });
  }

  return { contacts };
}

interface GlobalContactsInterface {
  id: BobjectId;
  highlights: StrDict;
  rawBobject: any;
  bobjectType: BobjectTypes;
  lastAttemptDate: string;
  attempts: number;
  lastTouchDate: string;
  touches: number;
  status: string;
  assignedTo: string;
  fullName: string;
  email: string;
  emails: string[];
  phone: null;
  phoneNumbers: [];
  jobTitle: string;
  companyName: null;
  companyId: null;
  companyWebsite: null;
  stage: string;
}

const useGlobalContacts = ({ searchTerm, accountId }) => {
  const [contacts, setContacts] = useState<GlobalContactsInterface[]>();

  useEffect(() => {
    api
      .post(`/bobjects/${accountId}/global-search`, {
        query: searchTerm,
        bobjectTypes: ['Company', 'Lead'],
        filters: ['WITH_EMAIL'],
        numberOfResults: 10,
      })
      .then(response => {
        setContacts(response?.data?.results);
      });
  }, [searchTerm, accountId]);

  return { contacts, isValidating: !contacts };
};

export const useRecipientSeachInput = ({
  company,
  selectedContacts,
  dataModel,
}: {
  company: Bobject<BobjectTypes.Company>;
  dataModel: DataModelResponse;
  selectedContacts: Contact[];
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<SearchType>(
    company ? SearchType.relatedBobjects : SearchType.globalSearch,
  );
  const { contacts: relatedContacts } = useRelatedContacts(company, dataModel);
  const { users: availableCompanyContacts } = useUserSearch();

  const { contacts: globalContacts, isValidating } = useGlobalContacts({
    accountId: dataModel?.getAccountId(),
    searchTerm: searchTerm?.toLowerCase(),
  });

  const availableGlobalContacts: Contact[] = useMemo((): Contact[] => {
    if (!globalContacts) {
      return [];
    }
    return globalContacts.reduce((acc: Contact[], { emails, ...contact }): Contact[] => {
      const contactProps = getContactProps(contact);
      const referenceId =
        contact.bobjectType === BobjectTypes.Lead ? contact?.companyId : contact?.rawBobject?.id;
      const parsedContacts = emails
        ?.map(email => ({ ...contactProps, email, referenceId }))
        .filter(c => !selectedContacts?.find(sc => sc.email === c.email)) as Contact[];
      return [...acc, ...parsedContacts];
    }, []);
  }, [globalContacts, selectedContacts]);

  function getAvailableContacts(): Contact[] {
    switch (searchType) {
      case SearchType.relatedBobjects:
        return relatedContacts.filter(
          contact =>
            !selectedContacts?.find(sc => sc.email === contact.email) &&
            (!searchTerm ||
              contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              contact.email?.toLowerCase().includes(searchTerm.toLowerCase())),
        );
      case SearchType.globalSearch:
        return availableGlobalContacts;
      case SearchType.companySearch: {
        const filteredContacts = availableCompanyContacts?.filter(
          contact =>
            !selectedContacts?.find(sc => sc.email === contact.email) &&
            (!searchTerm ||
              contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              contact?.name?.toLowerCase().includes(searchTerm.toLowerCase())),
        );
        return filteredContacts?.reduce((acc, { email, name }) => {
          if (selectedContacts?.find(sc => sc.email === email)) {
            return acc;
          }
          return [
            ...acc,
            {
              email,
              name,
              icon: 'person',
              isInDB: false,
              referenceId: undefined,
              bobject: undefined,
              isCompanyMember: true,
            },
          ];
        }, []) as Contact[];
      }
    }
  }

  const availableContacts = getAvailableContacts() as Contact[];

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
    setSearchType,
  };
};
