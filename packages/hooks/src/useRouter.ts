import { useMemo } from 'react';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';

import {
  constructMixpanelCustomRoute,
  isCompanyPage,
  isLeadPage,
  isLeadWithoutCompanyPage,
  isOpportunityPage,
} from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import queryString from 'query-string';

import { usePreviousUrl } from './usePreviousUrl';

export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();
  const { setPreviousUrl } = usePreviousUrl();

  const customHistoryPush = (path: any, options?: any) => {
    let pathToUse = path;
    if (
      isLeadPage(path) ||
      isLeadWithoutCompanyPage(path) ||
      isCompanyPage(path) ||
      isOpportunityPage(path)
    ) {
      pathToUse = constructMixpanelCustomRoute(path);
    }
    mixpanel.track(
      `REDIRECTED_TO_${typeof pathToUse === 'string' ? pathToUse : pathToUse?.pathname}`,
      {
        'In new tab': options?.event && (options?.event?.ctrlKey || options?.event?.metaKey),
      },
    );
    if (options?.event && (options?.event?.ctrlKey || options?.event?.metaKey)) {
      window.open(path, '_blank');
    } else {
      setPreviousUrl(location.pathname + location.search);
      history.push(path, options?.state);
    }
  };

  const customHistoryReplace = (path, state) => {
    setPreviousUrl(location.pathname + location.search);
    history.replace(path, state);
  };

  // Return our custom router object
  // Memoize so that a new object is only returned if something changes
  return useMemo(
    () => ({
      push: customHistoryPush,
      replace: customHistoryReplace,
      pathname: location.pathname,
      query: {
        ...queryString.parse(location.search),
        ...params,
      },
      match,
      location,
      history: { ...history, push: customHistoryPush, replace: customHistoryReplace },
    }),
    [params, match, location, history],
  );
}
