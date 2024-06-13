import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const useMemo = __vite__cjsImport0_react["useMemo"];
import { useHistory, useLocation, useParams, useRouteMatch } from "/vendor/.vite-deps-react-router-dom.js__v--2a87e614.js";
import {
  constructMixpanelCustomRoute,
  isCompanyPage,
  isLeadPage,
  isLeadWithoutCompanyPage,
  isOpportunityPage
} from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import __vite__cjsImport3_mixpanelBrowser from "/vendor/.vite-deps-mixpanel-browser.js__v--b6d836df.js"; const mixpanel = __vite__cjsImport3_mixpanelBrowser.__esModule ? __vite__cjsImport3_mixpanelBrowser.default : __vite__cjsImport3_mixpanelBrowser;
import __vite__cjsImport4_queryString from "/vendor/.vite-deps-query-string.js__v--41c0c2b2.js"; const queryString = __vite__cjsImport4_queryString.__esModule ? __vite__cjsImport4_queryString.default : __vite__cjsImport4_queryString;
import { usePreviousUrl } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-src-usePreviousUrl.ts.js";
export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const { setPreviousUrl } = usePreviousUrl();
  const customHistoryPush = (path, options) => {
    let pathToUse = path;
    if (isLeadPage(path) || isLeadWithoutCompanyPage(path) || isCompanyPage(path) || isOpportunityPage(path)) {
      pathToUse = constructMixpanelCustomRoute(path);
    }
    mixpanel.track(
      `REDIRECTED_TO_${typeof pathToUse === "string" ? pathToUse : pathToUse?.pathname}`,
      {
        "In new tab": options?.event && (options?.event?.ctrlKey || options?.event?.metaKey)
      }
    );
    if (options?.event && (options?.event?.ctrlKey || options?.event?.metaKey)) {
      window.open(path, "_blank");
    } else {
      setPreviousUrl(location.pathname + location.search);
      history.push(path, options?.state);
    }
  };
  const customHistoryReplace = (path, state) => {
    setPreviousUrl(location.pathname + location.search);
    history.replace(path, state);
  };
  return useMemo(
    () => ({
      push: customHistoryPush,
      replace: customHistoryReplace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params
      },
      match,
      location,
      history: { ...history, push: customHistoryPush, replace: customHistoryReplace }
    }),
    [params, match, location, history]
  );
}
