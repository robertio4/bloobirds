import { useEffect, useState } from 'react';

import { useActiveAccountId } from '@bloobirds-it/hooks';
import {
  ContactViewSubTab,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  MessagesEvents,
  CUSTOM_TASK_TYPES,
} from '@bloobirds-it/types';
import { api, getValueFromLogicRole } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { ExtendedContextTypes } from '../../../types/extendedContext';
import { getSalesforceIdFromPath } from '../../../utils/url';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import Loading from '../loadingIndicator/loadingIndicator';
import NoContextPage from '../noContextPage/noContextPage';

export const SalesforceCasePage = () => {
  const {
    useGetCurrentPage,
    setActiveBobject,
    setExtendedContext,
    setForcedActiveSubTab,
  } = useExtensionContext();
  const accountId = useActiveAccountId();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedObject, setRelatedObject] = useState(null);
  const id = getSalesforceIdFromPath(currentPage);
  const sobjectType = 'Case';
  const { data } = useSWR(sobjectType && `/sobject/${id}`, () =>
    api
      .get(`/utils/service/salesforce/getBloobirdsRelatedObject/${sobjectType}/${id}`)
      .then(data => data?.data),
  );
  const fetchLastActivity = contactId => {
    api
      .post(`/bobjects/${accountId}/Activity/search`, {
        query: {
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: [contactId?.value],
        },
        formFields: true,
        pageSize: 1,
        injectReferences: false,
        sort: [
          {
            field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
            direction: 'DESC',
          },
        ],
      })
      .then(data => {
        if (data?.data?.totalMatching > 0) {
          const lastActivity = data?.data?.contents?.[0];
          const lastActivityType = getValueFromLogicRole(
            lastActivity,
            ACTIVITY_FIELDS_LOGIC_ROLE.CUSTOM_TASK_TYPE,
          );
          if (lastActivityType && lastActivityType == CUSTOM_TASK_TYPES.WHATSAPP_BUSINESS) {
            setExtendedContext({
              type: ExtendedContextTypes.WHATSAPP_BUSINESS_THREAD,
              bobject: lastActivity,
            });
          }
        }
        setIsLoading(false);
      });
  };

  const refresh = (): void => {
    if (!currentPage && data) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      if (data) {
        if (data?.['id']) {
          window.dispatchEvent(new CustomEvent(MessagesEvents.ForceOpenExtension));
          setActiveBobject(data);
          setRelatedObject(data);
          if (currentPage && currentPage.includes('?channel=OMNI')) {
            fetchLastActivity(data?.['id']);
            setForcedActiveSubTab(ContactViewSubTab.ACTIVITIES);
          }
        }
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    refresh();
  }, [currentPage, data]);

  return <>{isLoading ? <Loading /> : relatedObject ? <ContactView /> : <NoContextPage />}</>;
};
