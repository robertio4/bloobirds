import { useEffect, useState } from 'react';

import { useObjectCreationSettings, useSalesforceLeftBarEnabled } from '@bloobirds-it/hooks';
import {
  ContactViewContext,
  ContactViewSubTab,
  ContactViewTab,
  LEAD_FIELDS_LOGIC_ROLE,
  LinkedInLead,
} from '@bloobirds-it/types';
import {
  api,
  isIdLinkedinUrl,
  isLinkedInProfilePage,
  isSalesNavigatorProfile,
  isDynamicsPage,
} from '@bloobirds-it/utils';
import retry from 'async-retry';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { searchLeadByQuery } from '../../../utils/leads';
import { getLinkedInUrlFromSalesProfile } from '../../../utils/salesUrlConverter';
import {
  scrapLeadCompanyName,
  scrapLeadFullName,
  scrapLeadLinkedinId,
} from '../../../utils/scrapper/profileScrapper';
import CaptureForm from '../captureForm/captureForm';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import Loading from '../loadingIndicator/loadingIndicator';
import NoContextPage from '../noContextPage/noContextPage';
import CaptureLinkFailed from './captureLinkFailed';
import LeadPage from './leadPage';
import MultipleLeadsPage from './multipleLeadsPage';
import NeedsSalesNavigatorUpgrade from './needsSalesNavigatorUpgrade';

const needsToUpgradeSalesNavigator = () => {
  const tags = document.querySelectorAll('span');
  return Array.from(tags).some(tag => tag.innerText === 'Sales Navigator Team');
};

function ProfileForm({ info }: { info?: any }): JSX.Element {
  const {
    useGetSettings,
    useGetCurrentPage,
    useGetSidePeekEnabled,
    useGetDataModel,
  } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const settings = useGetSettings();
  const dataModel = useGetDataModel();
  const [isLoading, setIsLoading] = useState(true);
  const [linkedInURL, setLinkedInURL] = useState('');
  const [salesNavigatorURL, setSalesNavigatorURL] = useState('');
  const [currentLeadOrLeads, setCurrentLeadOrLeads] = useState<LinkedInLead[]>(null);
  const [errorCapturingUrl] = useState(false);
  const [needsUpgrade, setNeedsUpgrade] = useState(false);
  const [exactMatch, setExactMatch] = useState<boolean>();
  const { createLead, setCreateLead } = useCreationForm();
  const { enabledObjectCreation } = useObjectCreationSettings();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const fullName = scrapLeadFullName();
  const linkedInIdFieldId = dataModel.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.LEAD__LINKEDIN_ID)
    ?.id;

  const refresh = (): void => {
    const isLinkedIn = isLinkedInProfilePage(currentPage);
    const isSalesNavigator = isSalesNavigatorProfile(currentPage);
    const isDynamics = isDynamicsPage(currentPage);

    setCurrentLeadOrLeads(null);
    setExactMatch(null);

    if (!currentPage) {
      setIsLoading(true);
    } else if (isDynamics && info) {
      setIsLoading(true);
      setNeedsUpgrade(false);
      setSalesNavigatorURL('');
      setLinkedInURL('');
      api.get(`/linkedin/leads/dynamics/${info.entity}/${info.id}`).then(data2 => {
        setIsLoading(false);
        if (data2.data) {
          setExactMatch(true);
          setCurrentLeadOrLeads([data2.data]);
        }
      });
      // searchLeadByQuery({
      //   salesforceId: info.id,
      //   autoMatching: false,
      // }).then(data => {
      //   console.log('data', data);
      //   if (!data?.leads || data?.leads?.length === 0) {
      //     api.get(`/linkedin/leads/dynamics/${info.entity}/${info.id}`).then(data2 => {
      //       console.log('data2', data2);
      //       setIsLoading(false);
      //       if (data2.data) {
      //         setExactMatch(true);
      //         setCurrentLeadOrLeads([data2.data]);
      //       }
      //     });
      //     return;
      //   }
      //   setIsLoading(false);
      //   if (data?.leads) {
      //     if (data?.leads?.length > 1) {
      //       setCurrentLeadOrLeads(data?.leads);
      //     } else {
      //       setCurrentLeadOrLeads([data?.leads[0]]);
      //     }
      //   }
      //   setExactMatch(data?.exactMatch);
      //   if (data?.leads[0]) {
      //     setSalesNavigatorURL(data?.leads[0].salesNavigatorUrl || null);
      //   }
      // });
    } else if (info) {
      setIsLoading(true);
      setNeedsUpgrade(false);
      setSalesNavigatorURL('');
      setLinkedInURL('');
      api
        .post(`/bobjects/${settings?.account?.id}/global-search`, {
          query: info?.name,
          bobjectTypes: ['Lead'],
          numberOfResults: 20,
        })
        .then(response => {
          setIsLoading(false);
          setCurrentLeadOrLeads(response?.data?.results);
          setExactMatch(false);
        });
    } else if (isLinkedIn) {
      setIsLoading(true);
      setNeedsUpgrade(false);
      setSalesNavigatorURL('');
      setLinkedInURL(currentPage);
      const companyName = scrapLeadCompanyName();
      searchLeadByQuery({
        linkedInUrl: isIdLinkedinUrl(currentPage) ? null : currentPage || null,
        leadFullName: fullName?.trim() ? fullName : null,
        companyName: companyName?.trim() ? companyName : null,
        autoMatching: false,
      }).then(data => {
        setIsLoading(false);
        if (data?.leads) {
          if (data?.leads?.length > 1) {
            setCurrentLeadOrLeads(data?.leads);
          } else {
            setCurrentLeadOrLeads([data?.leads[0]]);
          }
        }
        setExactMatch(data?.exactMatch);
        if (data?.leads[0]) {
          setSalesNavigatorURL(data?.leads[0].salesNavigatorUrl || null);
        }
      });
    } else if (isSalesNavigator) {
      if (needsToUpgradeSalesNavigator()) {
        setIsLoading(false);
        setSalesNavigatorURL(currentPage);
        setNeedsUpgrade(true);
        return;
      }

      setNeedsUpgrade(false);
      setIsLoading(true);
      setSalesNavigatorURL(currentPage);
      retry(async () => getLinkedInUrlFromSalesProfile(currentPage), {
        retries: 2,
        minTimeout: 250,
        factor: 2,
      })
        .then(url => {
          setLinkedInURL(url);
          const fullName = scrapLeadFullName();
          const companyName = scrapLeadCompanyName();
          searchLeadByQuery({
            linkedInUrl: isIdLinkedinUrl(url) ? null : url || null,
            salesNavigatorUrl: currentPage,
            leadFullName: fullName?.trim() ? fullName : null,
            companyName: companyName?.trim() ? companyName : null,
            autoMatching: true,
          })
            .then(data => {
              setCurrentLeadOrLeads(data?.leads);
              setExactMatch(data?.exactMatch);
              setIsLoading(false);
            })
            .catch(err => {
              console.log(err);
              console.error('Error searching for lead by sales navigator');
              setIsLoading(false);
            });
        })
        .catch(err => {
          console.log(err);
          console.error('Could not get LinkedIn URL from clipboard');
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    refresh();
  }, [currentPage]);

  useEffect(() => {
    if (currentLeadOrLeads?.[0] && isLinkedInProfilePage(currentPage)) {
      const scrappedLinkedInId = scrapLeadLinkedinId();
      const linkedInId = currentLeadOrLeads?.[0]?.rawBobject?.[linkedInIdFieldId];
      if (scrappedLinkedInId && !linkedInId && exactMatch) {
        const contentToPatch = {
          [LEAD_FIELDS_LOGIC_ROLE.LEAD__LINKEDIN_ID]: scrappedLinkedInId,
        };
        api.patch(`/bobjects/${currentLeadOrLeads?.[0]?.id?.value}/raw`, contentToPatch);
      }
    }
  }, [currentLeadOrLeads, exactMatch]);

  useEffect(() => {
    if (info) {
      setCreateLead(false);
    }
  }, [currentLeadOrLeads, info]);

  const isSalesforceLeftBarEnabled = useSalesforceLeftBarEnabled(settings?.account?.id);

  if (createLead && enabledObjectCreation) {
    return (
      <CaptureForm
        currentPage={currentPage}
        linkedInURL={linkedInURL}
        salesNavigatorURL={salesNavigatorURL}
        setCurrentLead={setCurrentLeadOrLeads}
        setExactMatch={setExactMatch}
        info={info}
      />
    );
  }

  const initialLeadContext: ContactViewContext = {
    activeTab: ContactViewTab.LEAD,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentLeadOrLeads?.[0],
  };
  //TODO this needs refactoring
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : needsUpgrade ? (
        <NeedsSalesNavigatorUpgrade />
      ) : errorCapturingUrl ? (
        <CaptureLinkFailed onRefresh={refresh} />
      ) : enabledObjectCreation &&
        currentLeadOrLeads &&
        (currentLeadOrLeads?.length > 1 || !exactMatch) ? (
        <MultipleLeadsPage
          leads={currentLeadOrLeads}
          linkedInUrl={linkedInURL}
          salesNavigatorUrl={salesNavigatorURL}
          setCurrentLead={setCurrentLeadOrLeads}
          setExactMatch={setExactMatch}
          accountId={settings?.account?.id}
          sidePeekEnabled={sidePeekEnabled}
          info={info}
        />
      ) : currentLeadOrLeads && currentLeadOrLeads?.length === 1 && currentLeadOrLeads[0]?.id ? (
        isSalesforceLeftBarEnabled ? (
          <ContactView defaultContext={initialLeadContext} />
        ) : (
          <LeadPage lead={currentLeadOrLeads[0]} />
        )
      ) : enabledObjectCreation ? (
        <CaptureForm
          currentPage={currentPage}
          linkedInURL={linkedInURL}
          salesNavigatorURL={salesNavigatorURL}
          setCurrentLead={setCurrentLeadOrLeads}
          setExactMatch={setExactMatch}
          info={info}
        />
      ) : (
        <NoContextPage />
      )}
    </>
  );
}

export default ProfileForm;
