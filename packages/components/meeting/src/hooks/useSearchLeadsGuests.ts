import { useEffect, useMemo, useState } from 'react';

import { useActiveAccountId, useDebounce, useUserSearch } from '@bloobirds-it/hooks';
import { Bobject, BobjectTypes, LEAD_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { api, getValueFromLogicRole, isEmail, keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { Coworker, SearchType } from '../types/calendar';

export const useSearchLeadsGuests = ({
  company,
  inviteesEmails,
}: {
  company: Bobject<BobjectTypes.Company>;
  inviteesEmails: string[];
}) => {
  const accountId = useActiveAccountId();
  const [searchQuery, setSearchQuery] = useState<string | null>('');
  const debounceSearchValue = useDebounce(searchQuery, 200);
  const isValidEmail = isEmail(debounceSearchValue);
  const [searchType, setSearchType] = useState(SearchType.leads);
  const query = company
    ? {
        [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [company?.id?.value],
      }
    : {};
  let queries: any = [];
  if (debounceSearchValue) {
    queries = [
      {
        [LEAD_FIELDS_LOGIC_ROLE.EMAIL]: {
          query: [debounceSearchValue],
          searchMode: 'AUTOCOMPLETE__SEARCH',
        },
      },
      {
        [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME]: {
          query: [debounceSearchValue],
          searchMode: 'AUTOCOMPLETE__SEARCH',
        },
        [LEAD_FIELDS_LOGIC_ROLE.EMAIL]: ['__MATCH_FULL_ROWS__'],
      },
    ];
  } else {
    queries = [
      {
        [LEAD_FIELDS_LOGIC_ROLE.EMAIL]: ['__MATCH_FULL_ROWS__'],
      },
    ];
  }

  const { data: response, isValidating } = useSWR(
    searchType === SearchType.leads
      ? ['searchLeadGuestsMeetings', debounceSearchValue, company]
      : null,
    () => {
      return api.post(`/bobjects/${accountId}/Lead/search`, {
        query,
        queries,
        formFields: true,
        pageSize: 50,
      });
    },
    { use: [keepPreviousResponse], keepPreviousData: true },
  );
  const leads: Bobject<BobjectTypes.Lead>[] = response?.data?.contents;

  const { users: coworkers } = useUserSearch();
  const parsedCoworkers: Coworker[] = coworkers?.map((user: any) => {
    return {
      type: 'Coworker',
      email: user?.email,
      name: user?.name,
      id: user?.id,
    };
  });

  const allCoworkersAdded = useMemo(
    () =>
      parsedCoworkers?.every(({ email: selectedEmail }) =>
        inviteesEmails.some(email => selectedEmail === email),
      ),
    [inviteesEmails],
  );

  const allLeadsAdded = useMemo(
    () =>
      leads?.every(lead => {
        const leadEmail = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
        return inviteesEmails.some(email => leadEmail === email);
      }),
    [inviteesEmails],
  );

  useEffect(() => {
    if (allCoworkersAdded) {
      setSearchType(SearchType.leads);
    }
  }, [allCoworkersAdded]);

  function getAvailableContacts(): Array<Bobject<BobjectTypes.Lead>> | Coworker[] {
    switch (searchType) {
      case SearchType.leads:
        return leads?.filter((lead: Bobject<BobjectTypes.Lead>) => {
          const leadEmail = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
          return !inviteesEmails?.includes(leadEmail);
        });
      case SearchType.coworkers: {
        return parsedCoworkers?.filter(
          ({ email: userEmail, name }: Coworker) =>
            !inviteesEmails?.includes(userEmail) &&
            (!debounceSearchValue ||
              userEmail?.toLowerCase().includes(debounceSearchValue.toLowerCase()) ||
              name?.toLowerCase().includes(debounceSearchValue.toLowerCase())),
        );
      }
      default:
        return [];
    }
  }

  return {
    isValidEmail,
    isValidating,
    availableContacts: useMemo(() => getAvailableContacts(), [
      searchType,
      searchQuery,
      company,
      inviteesEmails,
    ]),
    allCoworkersAdded,
    allLeadsAdded,
    searchType,
    setSearchType,
    searchQuery,
    debounceSearchValue,
    setSearchQuery,
  };
};
