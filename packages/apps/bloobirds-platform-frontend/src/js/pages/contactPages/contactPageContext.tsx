import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';

import { useSearchSubscription } from '@bloobirds-it/plover';
import { keepPreviousResponse } from '@bloobirds-it/utils';
import useSWR, { mutate, useSWRConfig } from 'swr';

import { useUserSettings } from '../../components/userPermissions/hooks';
import { LEAD_FIELDS_LOGIC_ROLE } from '../../constants/lead';
import { OPPORTUNITY_FIELDS_LOGIC_ROLE } from '../../constants/opportunity';
import { useBobjectChangesMonitor } from '../../hooks/useBobjectChangesMonitor';
import { useFullSalesEnabled } from '../../hooks/useFeatureFlags';
import { BobjectApi } from '../../misc/api/bobject';
import { BobjectType } from '../../typings/bobjects';
import {
  getReferencedBobjectFromLogicRole,
  getValueFromLogicRole,
} from '../../utils/bobjects.utils';
import { isCompanyPage, isLeadPage, isOpportunityPage } from '../../utils/pages.utils';
import { ContactBobjects } from './contact';
import { URLBobject } from './contactPage';

/**
 * This function is used to get the UrlBobject form the current path. It will be the only source of truth for the current UrlBobject.
 *
 * @param url
 * @param id The id param from the url
 * @param accountId
 */
const getMainBobject = (url: string, id: string, accountId: string): URLBobject => {
  if (!id || id.length === 0) {
    throw new Error('No id found in the url');
  }
  if (isLeadPage(url)) {
    return {
      type: 'Lead',
      id: { objectId: id, accountId, typeName: 'Lead', value: `${accountId}/Lead/${id}` },
    };
  } else if (isOpportunityPage(url)) {
    const opportunityIdRegex = /(?<=opportunities\/)([a-zA-Z0-9]{16})/;
    const opportunityId = opportunityIdRegex.exec(url);
    if (!opportunityId) {
      throw new Error('Could not find the opportunity id');
    }
    return {
      type: 'Opportunity',
      id: {
        objectId: opportunityId[0],
        accountId,
        typeName: 'Opportunity',
        value: `${accountId}/Opportunity/${opportunityId[0]}`,
      },
    };
  } else if (isCompanyPage(url)) {
    return {
      type: 'Company',
      id: { objectId: id, accountId, typeName: 'Company', value: `${accountId}/Company/${id}` },
    };
  }
  throw new Error('Unsupported bobject as a main bobject of the contact view');
};

/**
 * This function is used to get the company id (if any) from the active bobject
 *
 * @param type
 * @param bobjectData
 */
function getCompanyId(type: BobjectType, bobjectData: any): { value: string; objectId: string } {
  if (type === 'Lead') {
    const value = getValueFromLogicRole(bobjectData, 'LEAD__COMPANY');
    const companyIdRegex = /(?<=Company\/)([a-zA-Z0-9]{16})/;
    const companyId = companyIdRegex.exec(value);
    return { value, objectId: companyId ? companyId[0] : null };
  }
  if (type === 'Opportunity') {
    const value = getValueFromLogicRole(bobjectData, 'OPPORTUNITY__COMPANY');
    const oppIdregex = /(?<=Company\/)([a-zA-Z0-9]{16})/;
    const oppId = oppIdregex.exec(value);
    return { value, objectId: oppId ? oppId[0] : null };
  }
  if (type === 'Company') {
    return { value: bobjectData?.id.value, objectId: bobjectData?.id.objectId };
  }
  throw new Error('Unsupported bobject type');
}

/**
 * This function is used to get the query for the leads related to the urlBobject
 *
 * @param {URLBobject} urlBobject
 * @param {string} companyId
 * @param {boolean} hasSalesEnabled
 */
function getLeadsRequest(urlBobject: URLBobject, companyId: string, hasSalesEnabled?: boolean) {
  if (companyId) {
    return {
      query: { [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
      formFields: true,
      pageSize: 50,
    };
  }
  //TODO: This is a temporary solution to get the leads of the opportunity, when the relation is switched to the opportunity this will be easier
  if (urlBobject.type === 'Opportunity' && urlBobject.id.objectId) {
    if (!hasSalesEnabled) {
      return {
        query: { [LEAD_FIELDS_LOGIC_ROLE.OPPORTUNITY]: [urlBobject.id.value] },
        formFields: true,
        pageSize: 50,
      };
    }
  }
  return null;
}

/**
 * This function is used to get the query for the opportunity bobjects related to the urlBobject
 *
 * @param {URLBobject} urlBobject - The bobject of the url
 * @param {string} companyId - The id of the company (if any)
 */
function getOpportunitiesRequest(
  urlBobject: URLBobject,
  companyId: string,
  hasSalesEnabled?: boolean,
) {
  if (companyId) {
    return {
      query: { [OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY]: [companyId] },
      formFields: true,
      pageSize: 50,
    };
  } else if (hasSalesEnabled && urlBobject.type === 'Lead') {
    return {
      query: { [OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT]: [urlBobject.id.value] },
      formFields: true,
      pageSize: 50,
    };
  }
  return null;
}

/**
 * This function is used to get the bobjects of the contact page
 * It will return the set of bobjects that are needed for the contact page (main bobject, company, leads, opportunities)
 *
 * @param {URLBobject} urlBobject The bobject extracted from the url, this is the source of truth for the active bobject and the bobjects of the contact page
 * @param bobject The main bobject of the contact page (Form Bobject)
 */
function useContactBobjectsSubscriptions(
  urlBobject: URLBobject,
  bobject: any,
): { leads: any; company: any; opportunities: any; active: any; error: any; isValidating: any } {
  // It saves the company id (if any) of the current bobject or related company
  const [companyId, setCompanyId] = React.useState<{ value: string; objectId: string }>(
    getCompanyId(urlBobject.type, bobject),
  );

  const isFullSalesEnabled = useFullSalesEnabled();
  const hasSalesEnabled = useFullSalesEnabled();

  const { cache } = useSWRConfig();

  // It saves the query to get the leads of the current bobject or its related company (if any)
  const [leadsRequest, setLeadsRequest] = React.useState<any>(
    getLeadsRequest(urlBobject, companyId.value, hasSalesEnabled),
  );

  //It saves the query to get the opportunities of the current bobject or its related company (if any)
  const [opportunityRequest, setOpportunityRequest] = React.useState<any>(
    getOpportunitiesRequest(urlBobject, companyId.value, hasSalesEnabled),
  );

  // The company itself (if any) if there is not any company it will not fetch the company
  const {
    data: company,
    error: companyError,
    isValidating: isCompanyValidating,
  } = useSWR(
    companyId.objectId ? `/Company/${companyId.objectId}/form` : null,
    async () =>
      BobjectApi.request()
        .bobjectType('Company')
        .getForm(companyId.objectId, 'injectReferences=true'),
    { use: [keepPreviousResponse] },
  );

  useEffect(() => {
    return () => {
      cache.delete(`/${companyId.objectId}/form`);
    };
  }, []);

  // In case the related company from opp or lead is not found, we will treat it as a lead / opp without company
  let companyResolved;
  let errorCompanyResolved;

  if (
    urlBobject.type !== 'Company' &&
    (companyError?.status === 404 || companyId?.objectId === null)
  ) {
    companyResolved = null;
    errorCompanyResolved = null;
  } else {
    companyResolved = company;
    errorCompanyResolved = companyError;
  }

  // The leads of the current bobject or its related company (if any)
  // @ts-ignore
  const {
    data: leadsData,
    error: leadError,
    isValidating: isLeadValidating,
  } = useSearchSubscription(leadsRequest, 'Lead', [keepPreviousResponse]);

  // The opportunities of the current bobject or its related company (if any)
  // @ts-ignore
  const {
    data: opportunitiesData,
    error: opportunityError,
    isValidating: isOpportunityValidating,
  } = useSearchSubscription(isFullSalesEnabled && opportunityRequest, 'Opportunity', [
    keepPreviousResponse,
  ]);

  useEffect(() => {
    const isCompanyAndChanged =
      urlBobject.type === 'Company' && !!bobject && company?.id.objectId !== bobject?.id.objectId;
    const isLeadAndChanged =
      !leadsRequest ||
      (urlBobject.type === 'Lead' &&
        !!bobject &&
        !leadsData?.data?.contents.some((lead: any) => lead?.id.objectId === bobject?.id.objectId));
    const isOpportunityAndChanged =
      !opportunityRequest ||
      (urlBobject.type === 'Opportunity' &&
        !!bobject &&
        !opportunitiesData?.data?.contents.some(
          (opportunity: any) => opportunity?.id.objectId === bobject?.id.objectId,
        ));

    // If the urlBobject changes and it's not any of the current contact bobjects it will update the requests to force a re-fetch.
    if (isCompanyAndChanged || isLeadAndChanged || isOpportunityAndChanged) {
      //Refresh contact bobjects
      const newCompanyId = getCompanyId(urlBobject.type, bobject);
      setCompanyId(newCompanyId);
      setLeadsRequest(getLeadsRequest(urlBobject, newCompanyId.value, hasSalesEnabled));
      setOpportunityRequest(
        getOpportunitiesRequest(urlBobject, newCompanyId.value, hasSalesEnabled),
      );
    }
  }, [bobject?.id.objectId]);

  const arrayBobject = bobject ? [bobject] : [];
  // Correction to return the main bobject if it's a lead and there is no company
  let leads =
    urlBobject.type === 'Lead' && (leadsRequest === null || leadsData === undefined)
      ? arrayBobject
      : leadsData?.data?.contents;

  // Correction to return the main bobject if it's an opportunity and there is no company
  const opportunities =
    urlBobject.type === 'Opportunity' &&
    (opportunityRequest === null || opportunitiesData === undefined)
      ? arrayBobject
      : opportunitiesData?.data?.contents;

  //TODO: @Patricia quizas hay una manera más bonita
  let active;
  if (urlBobject.type === 'Lead') {
    active =
      bobject?.id.objectId === urlBobject?.id.objectId
        ? bobject
        : leads.find((lead: any) => lead?.id.objectId === urlBobject?.id.objectId);
  } else if (urlBobject.type === 'Opportunity') {
    active =
      bobject?.id.objectId === urlBobject?.id.objectId
        ? bobject
        : opportunities.find(
            (opportunity: any) => opportunity?.id.objectId === urlBobject?.id.objectId,
          );
  } else {
    active = bobject;
  }

  if (urlBobject.type === 'Opportunity' && (leadsRequest === null || leadsData === undefined)) {
    const referenceLead = getReferencedBobjectFromLogicRole(
      active,
      OPPORTUNITY_FIELDS_LOGIC_ROLE.PRIMARY_CONTACT,
    );
    leads = referenceLead ? [referenceLead] : undefined;
  }

  return {
    company: companyResolved,
    leads,
    opportunities,
    active,
    error: errorCompanyResolved || leadError || opportunityError,
    isValidating: isCompanyValidating || isLeadValidating || isOpportunityValidating,
  };
}

const ContactBobjectsContext = React.createContext<ContactBobjects | null>(null);

function useActiveBobject() {
  const { id: bobjectId } = useParams<any>();
  const location = useLocation<any>();
  const settings = useUserSettings();
  const urlBobject = getMainBobject(location.pathname, bobjectId, settings?.account.id);
  const { hasChanged: shouldRefetch } = useBobjectChangesMonitor(
    urlBobject.id.objectId,
    urlBobject.type,
  );

  const { cache } = useSWRConfig();

  //Get the main bobject
  const { data, error } = useSWR(`/${urlBobject.type}/${urlBobject.id.objectId}/form`, async () =>
    BobjectApi.request()
      .bobjectType(urlBobject.type)
      .getForm(urlBobject.id.objectId, 'injectReferences=true'),
  );

  useEffect(() => {
    if (shouldRefetch) {
      mutate(`/${urlBobject.type}/${urlBobject.id.objectId}/form`);
    }
  }, [shouldRefetch]);

  useEffect(() => {
    return () => {
      cache.delete(`/${urlBobject.type}/${urlBobject.id.objectId}/form`);
    };
  }, []);

  return {
    activeBobject: data,
    urlBobject,
    error,
    hasActiveBobjectUpdated: shouldRefetch,
  };
}

function getRelatedBobjects(
  activeBobject: any,
  company: any[],
  leads: any[],
  opportunities: any[],
): string[] {
  // Join the leads, the opportunities and the company in a single array
  const relatedBobjects = [];
  if (company) {
    relatedBobjects.push(company);
  }
  if (leads) {
    relatedBobjects.push(...leads);
  }
  if (opportunities) {
    relatedBobjects.push(...opportunities);
  }

  // Map the array and return only the ids and remove the undefined values and the active bobject
  return relatedBobjects
    .map((bobject: any) => bobject?.id.value)
    .filter((id: any) => id !== undefined)
    .filter((id: any) => id !== activeBobject?.id.value);
}

const ContactBobjectsProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    activeBobject,
    urlBobject,
    error: activeBobjectError,
    hasActiveBobjectUpdated,
  } = useActiveBobject();

  //Get the contact bobjects and regenerate them if the id is not in them
  const {
    company,
    leads,
    opportunities,
    active,
    error: contactBobjectsError,
    isValidating,
  } = useContactBobjectsSubscriptions(urlBobject, activeBobject);

  const relatedBobjects = getRelatedBobjects(active, company, leads, opportunities);
  return (
    <ContactBobjectsContext.Provider
      value={{
        company,
        leads,
        opportunities,
        active,
        error: activeBobjectError || contactBobjectsError,
        hasActiveBobjectUpdated,
        isValidating,
        urlBobject,
        relatedBobjectIds: relatedBobjects,
      }}
    >
      {children}
    </ContactBobjectsContext.Provider>
  );
};

const useContactBobjects = () => {
  const context = React.useContext(ContactBobjectsContext);
  if (context === undefined) {
    throw new Error('useContactBobjects must be used within a ContactBobjectsProvider');
  }
  return context;
};

export { ContactBobjectsProvider, useContactBobjects };
