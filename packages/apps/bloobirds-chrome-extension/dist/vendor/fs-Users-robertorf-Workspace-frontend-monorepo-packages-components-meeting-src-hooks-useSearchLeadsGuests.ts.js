import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import { useActiveAccountId, useDebounce, useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { LEAD_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getValueFromLogicRole, isEmail, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { SearchType } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-types-calendar.ts.js";
export const useSearchLeadsGuests = ({
  company,
  inviteesEmails
}) => {
  const accountId = useActiveAccountId();
  const [searchQuery, setSearchQuery] = useState("");
  const debounceSearchValue = useDebounce(searchQuery, 200);
  const isValidEmail = isEmail(debounceSearchValue);
  const [searchType, setSearchType] = useState(SearchType.leads);
  const query = company ? {
    [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [company?.id?.value]
  } : {};
  let queries = [];
  if (debounceSearchValue) {
    queries = [
      {
        [LEAD_FIELDS_LOGIC_ROLE.EMAIL]: {
          query: [debounceSearchValue],
          searchMode: "AUTOCOMPLETE__SEARCH"
        }
      },
      {
        [LEAD_FIELDS_LOGIC_ROLE.FULL_NAME]: {
          query: [debounceSearchValue],
          searchMode: "AUTOCOMPLETE__SEARCH"
        },
        [LEAD_FIELDS_LOGIC_ROLE.EMAIL]: ["__MATCH_FULL_ROWS__"]
      }
    ];
  } else {
    queries = [
      {
        [LEAD_FIELDS_LOGIC_ROLE.EMAIL]: ["__MATCH_FULL_ROWS__"]
      }
    ];
  }
  const { data: response, isValidating } = useSWR(
    searchType === SearchType.leads ? ["searchLeadGuestsMeetings", debounceSearchValue, company] : null,
    () => {
      return api.post(`/bobjects/${accountId}/Lead/search`, {
        query,
        queries,
        formFields: true,
        pageSize: 50
      });
    },
    { use: [keepPreviousResponse], keepPreviousData: true }
  );
  const leads = response?.data?.contents;
  const { users: coworkers } = useUserSearch();
  const parsedCoworkers = coworkers?.map((user) => {
    return {
      type: "Coworker",
      email: user?.email,
      name: user?.name,
      id: user?.id
    };
  });
  const allCoworkersAdded = useMemo(
    () => parsedCoworkers?.every(
      ({ email: selectedEmail }) => inviteesEmails.some((email) => selectedEmail === email)
    ),
    [inviteesEmails]
  );
  const allLeadsAdded = useMemo(
    () => leads?.every((lead) => {
      const leadEmail = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
      return inviteesEmails.some((email) => leadEmail === email);
    }),
    [inviteesEmails]
  );
  useEffect(() => {
    if (allCoworkersAdded) {
      setSearchType(SearchType.leads);
    }
  }, [allCoworkersAdded]);
  function getAvailableContacts() {
    switch (searchType) {
      case SearchType.leads:
        return leads?.filter((lead) => {
          const leadEmail = getValueFromLogicRole(lead, LEAD_FIELDS_LOGIC_ROLE.EMAIL);
          return !inviteesEmails?.includes(leadEmail);
        });
      case SearchType.coworkers: {
        return parsedCoworkers?.filter(
          ({ email: userEmail, name }) => !inviteesEmails?.includes(userEmail) && (!debounceSearchValue || userEmail?.toLowerCase().includes(debounceSearchValue.toLowerCase()) || name?.toLowerCase().includes(debounceSearchValue.toLowerCase()))
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
      inviteesEmails
    ]),
    allCoworkersAdded,
    allLeadsAdded,
    searchType,
    setSearchType,
    searchQuery,
    debounceSearchValue,
    setSearchQuery
  };
};
