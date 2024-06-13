import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { useDebounce } from "/vendor/.vite-deps-use-debounce.js__v--e00a6ff0.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export async function searchCompanies(name) {
  const response = await api.get("/linkedin/search/companies", {
    params: { name }
  });
  return response.data;
}
export function useCompanies(search) {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [name] = useDebounce(search, 150);
  useEffect(() => {
    if (name && name.length > 0) {
      searchCompanies(name).then((companies2) => {
        setCompanies(companies2);
        setIsLoading(false);
      });
    }
  }, [name]);
  return { companies, isLoading };
}
export function useCompanyCreationEnabled() {
  const { data: isSettingEnabled } = useSWR("/linkedin/settings/companyCreation", async (url) => {
    const response = await api.get(url);
    return response.data?.enabled;
  });
  return isSettingEnabled;
}
