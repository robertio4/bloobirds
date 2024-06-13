import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useEffect = __vite__cjsImport0_react["useEffect"]; const useState = __vite__cjsImport0_react["useState"];
import { useDebouncedCallback } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-index.tsx.js";
import __vite__cjsImport2_chillout from "/vendor/.vite-deps-chillout.js__v--b721a5eb.js"; const chillout = __vite__cjsImport2_chillout.__esModule ? __vite__cjsImport2_chillout.default : __vite__cjsImport2_chillout;
export const useSalesforceListSelection = () => {
  const [selectedSalesforceIds, setSelectedSalesforceIds] = useState([]);
  const tableBody = document.querySelector("tbody");
  const deboundecSetSelectedSalesforceIds = useDebouncedCallback(
    (mutationRecord) => {
      chillout.forEach(mutationRecord, (mutation) => {
        const columns = Array.from(mutation.target.children);
        const recordId = columns.find((row) => row.nodeName === "TH")?.querySelector("a")?.getAttribute("data-recordid");
        if (recordId && mutation.target instanceof Element) {
          const isSelected = mutation.target?.getAttribute("aria-selected") === "true";
          const wasSelected = mutation.oldValue === "true";
          if (isSelected && !wasSelected) {
            setSelectedSalesforceIds((prevState) => [...prevState, recordId]);
          } else if (!isSelected && wasSelected) {
            setSelectedSalesforceIds((prevState) => prevState.filter((id) => id !== recordId));
          }
        }
      });
    },
    50,
    []
  );
  const observer = new MutationObserver(deboundecSetSelectedSalesforceIds);
  useEffect(() => {
    if (tableBody) {
      observer.observe(tableBody, {
        attributes: true,
        attributeFilter: ["aria-selected"],
        attributeOldValue: true,
        characterData: true,
        childList: true,
        subtree: true
      });
    }
    return () => observer.disconnect();
  }, [tableBody]);
  return {
    selectedSalesforceIds
  };
};
