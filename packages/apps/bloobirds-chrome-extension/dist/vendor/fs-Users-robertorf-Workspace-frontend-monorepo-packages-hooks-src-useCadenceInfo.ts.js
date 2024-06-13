import { api, getTextFromLogicRole, isCompany, isLead, isOpportunity } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { COMPANY_FIELDS_LOGIC_ROLE } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import __vite__cjsImport3_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport3_react["useEffect"]; const useMemo = __vite__cjsImport3_react["useMemo"]; const useState = __vite__cjsImport3_react["useState"];
const fetchCadenceByTargetMarket = ([url, targetMarketName]) => api.get(`${url}${targetMarketName ? `?targetMarketName=${targetMarketName}` : ""}`);
const fetchCadences = ([url, ...filters]) => api.get(`${url}/?bobjectTypes=${filters[0]}`, {});
export const useCadenceInfo = (bobjectToSet) => {
  const [bobject, setBobject] = useState(bobjectToSet);
  const typeName = bobject?.id?.typeName;
  const { data: entities } = useSWR(
    ["/messaging/cadences", typeName],
    fetchCadences,
    {
      revalidateOnFocus: false
    }
  );
  const cadences = entities?.data?.cadences;
  const companyTM = bobject && isCompany(bobject) ? getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET) : null;
  const { data: cadenceByTargetMarket } = useSWR(
    companyTM ? ["/service/view/cadence/targetMarket", companyTM] : null,
    fetchCadenceByTargetMarket,
    {
      revalidateOnFocus: false
    }
  );
  const getDefaultCadence = () => {
    if (isCompany(bobject) && cadences) {
      const defaultCadenceByBobjectType = cadences?.find((cadence) => cadence?.defaultCadence);
      const defaultCadenceByTargetMarket = cadences?.find(
        (cadence) => cadence.name === cadenceByTargetMarket?.data?.name
      );
      return defaultCadenceByTargetMarket || defaultCadenceByBobjectType;
    }
    if (isOpportunity(bobject)) {
      return null;
    }
    if (isLead(bobject)) {
      return cadences?.find((cadence) => cadence.defaultCadence);
    }
    return void 0;
  };
  const defaultCadence = useMemo(() => bobject && cadences && getDefaultCadence(), [
    bobject,
    cadences,
    cadenceByTargetMarket
  ]);
  const cadenceId = bobject?.cadence;
  useEffect(() => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
  }, [bobjectToSet]);
  function getCadenceById(cadenceId2) {
    return cadences?.find(({ id }) => cadenceId2 === id);
  }
  return {
    cadence: cadenceId ? cadences?.find((cadence) => cadence?.id === cadenceId) : defaultCadence,
    defaultCadence,
    getCadenceById
  };
};
