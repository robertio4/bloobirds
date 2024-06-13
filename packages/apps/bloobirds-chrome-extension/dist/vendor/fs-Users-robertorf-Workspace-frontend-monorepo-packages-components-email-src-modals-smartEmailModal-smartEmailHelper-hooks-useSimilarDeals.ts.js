import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useState = __vite__cjsImport0_react["useState"];
import { DateFilterValues } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, subDays } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport3_lodash_isEqual from "/vendor/.vite-deps-lodash_isEqual.js__v--1a3ee503.js"; const isEqual = __vite__cjsImport3_lodash_isEqual.__esModule ? __vite__cjsImport3_lodash_isEqual.default : __vite__cjsImport3_lodash_isEqual;
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { DATE_FILTER_DAY_VALUES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-email-src-modals-smartEmailModal-smartEmailHelper-smartEmailHelper.constants.tsx.js";
export const useSimilarDeals = (accountId, companyId) => {
  const [dateFilter, setDateFilter] = useState(DateFilterValues.LAST_90_DAYS);
  const fetchDeals = () => {
    const dateTo = spacetime(subDays(new Date(), 1)).format("iso-short");
    const dateFrom = spacetime(subDays(new Date(), DATE_FILTER_DAY_VALUES[dateFilter])).format(
      "iso-short"
    );
    if (!companyId)
      return;
    return api.get(
      `/bobjects/${accountId}/match/companies?bobjectId=${companyId}&dateFrom=${dateFrom}&dateTo=${dateTo}`
    );
  };
  const { data, error, isLoading } = useSWR(
    accountId && companyId && `/similarDeals/${companyId}/${dateFilter}`,
    fetchDeals
  );
  return {
    data,
    isLoading,
    dateFilter,
    setDateFilter: (date) => {
      if (!isEqual(date, dateFilter)) {
        setDateFilter(date);
      }
    },
    error,
    similarDeals: data && data.data
  };
};
