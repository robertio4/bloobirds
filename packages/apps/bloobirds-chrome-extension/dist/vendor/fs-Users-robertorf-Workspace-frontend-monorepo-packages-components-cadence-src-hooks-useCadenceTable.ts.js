import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"]; const useState = __vite__cjsImport0_react["useState"];
import {
  BobjectTypes,
  COMPANY_FIELDS_LOGIC_ROLE,
  FIELDS_LOGIC_ROLE,
  isBobject
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getTextFromLogicRole, getValueFromLogicRole, isCompany } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import { useCadences } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-cadence-src-hooks-useCadences.ts.js";
const fetchCadenceByTargetMarket = ([url, targetMarketName]) => api.get(`${url}${targetMarketName ? `?targetMarketName=${targetMarketName}` : ""}`);
export const useCadenceTable = (bobjectToSet) => {
  const [bobject, setBobject] = useState(bobjectToSet);
  const typeName = bobject?.id?.typeName;
  const accountId = bobject?.id?.accountId;
  const { cadences } = useCadences({ bobjectTypeName: typeName, accountId, includeDeleted: true });
  const companyTM = useMemo(() => {
    if (bobject) {
      if (!isBobject(bobject)) {
        return bobject.targetMarket;
      } else if (isCompany(bobject)) {
        return getTextFromLogicRole(bobject, COMPANY_FIELDS_LOGIC_ROLE.TARGET_MARKET);
      }
    } else
      return null;
  }, [bobject]);
  const { data: cadenceByTargetMarket } = useSWR(
    companyTM ? ["/service/view/cadence/targetMarket", companyTM] : null,
    fetchCadenceByTargetMarket
  );
  const getDefaultCadence = () => {
    switch (typeName) {
      case BobjectTypes.Company: {
        const defaultCadenceByBobjectType = cadences?.find(
          (cadence) => cadence?.defaultCadence
        );
        const defaultCadenceByTargetMarket = cadences?.find(
          (cadence) => cadence.name === cadenceByTargetMarket?.data?.name
        );
        return defaultCadenceByTargetMarket || defaultCadenceByBobjectType;
      }
      case BobjectTypes.Opportunity: {
        return null;
      }
      case BobjectTypes.Lead:
        return cadences?.find((cadence) => cadence.defaultCadence);
      default:
        return void 0;
    }
  };
  const defaultCadence = useMemo(() => bobject && cadences && getDefaultCadence(), [
    bobject,
    cadences,
    cadenceByTargetMarket
  ]);
  const cadenceId = useMemo(() => {
    let cadenceName = "";
    if (bobject) {
      if (isBobject(bobject)) {
        cadenceName = getValueFromLogicRole(
          bobject,
          FIELDS_LOGIC_ROLE[bobject.id?.typeName]?.CADENCE
        );
      } else {
        cadenceName = bobject.cadenceId ?? bobject.cadence;
      }
    }
    return cadenceName;
  }, [bobject]);
  useEffect(() => {
    if (bobjectToSet) {
      setBobject(bobjectToSet);
    }
  }, [bobjectToSet]);
  return {
    bobject,
    cadence: cadenceId ? cadences?.find((cadence) => cadence?.id === cadenceId) : defaultCadence,
    defaultCadence
  };
};
