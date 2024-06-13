import { useEffect, useState } from 'react';

import {
  ExtensionCompany,
  LinkedInLead,
  ContactViewContext,
  ContactViewSubTab,
  ContactViewTab,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { searchCompaniesByQuery, searchLeadByQuery } from '../../../utils/leads';
import {
  getSalesforceIdFromPath,
  isSalesforceEventPage,
  isSalesforceTaskPage,
} from '../../../utils/url';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import NavigateMessageSalesforce from '../linkedInScreens/navigateMessageSalesforce';
import Loading from '../loadingIndicator/loadingIndicator';

export const SalesforceTaskOrEventPage = () => {
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [, setExactMatch] = useState<boolean>();
  const [currentLeadOrLeads, setCurrentLeadOrLeads] = useState<LinkedInLead[]>(null);
  const [currentCompanyOrCompanies, setCurrentCompanyOrCompanies] = useState<ExtensionCompany[]>(
    null,
  );
  const id = getSalesforceIdFromPath(currentPage);
  const isTask = isSalesforceTaskPage(currentPage);
  const isEvent = isSalesforceEventPage(currentPage);
  const sobjectType = isTask ? 'Task' : isEvent ? 'Event' : null;
  const { data } = useSWR(sobjectType && `/sobject/${id}`, () =>
    api.get(`/utils/service/salesforce/sobject/${sobjectType}/${id}`).then(data => data?.data),
  );

  const refresh = (): void => {
    setCurrentLeadOrLeads(null);

    if (!currentPage && data) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      if (data?.['WhoId']) {
        searchLeadByQuery({
          salesforceId: data?.['WhoId'],
        }).then(data => {
          setIsLoading(false);
          if (data?.leads) {
            setCurrentLeadOrLeads([data?.leads[0]]);
          }
          setExactMatch(data?.exactMatch);
        });
      } else if (data?.['WhatId']) {
        searchCompaniesByQuery({
          salesforceId: data?.['WhatId'],
        }).then(data => {
          setIsLoading(false);
          if (data?.companies) {
            setCurrentCompanyOrCompanies([data?.companies[0]]);
          }
          setExactMatch(data?.exactMatch);
        });
      } else {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    refresh();
  }, [currentPage, data]);

  const initialLeadContext: ContactViewContext = {
    activeTab: ContactViewTab.LEAD,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentLeadOrLeads?.[0],
  };

  const initialCompanyContext: ContactViewContext = {
    activeTab: ContactViewTab.COMPANY,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentCompanyOrCompanies?.[0],
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : currentLeadOrLeads || currentCompanyOrCompanies ? (
        <ContactView
          defaultContext={currentLeadOrLeads ? initialLeadContext : initialCompanyContext}
        />
      ) : (
        <NavigateMessageSalesforce />
      )}
    </>
  );
};
