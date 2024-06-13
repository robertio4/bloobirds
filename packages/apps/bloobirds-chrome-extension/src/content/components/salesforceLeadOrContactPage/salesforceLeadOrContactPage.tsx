import { useEffect, useState } from 'react';

import {
  useActiveAccountId,
  useIsPersonAccountAsAccount,
  useObjectCreationSettings,
  useOtoUpdateContactId,
} from '@bloobirds-it/hooks';
import {
  ContactViewContext,
  ContactViewSubTab,
  ContactViewTab,
  LinkedInLead,
} from '@bloobirds-it/types';
import {
  api,
  getSalesforceSobject,
  querySalesforce,
  convertLeadInBloobirds,
  extractSalesforceIdFromPath,
  isSalesforceContactPage,
  isSalesforceLeadPage,
  isSalesforceAccountPage,
} from '@bloobirds-it/utils';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { SALESFORCE } from '../../../utils/integrations';
import { searchLeadByQuery } from '../../../utils/leads';
import CaptureSalesforceForm from '../captureLeadSalesforceForm/captureSalesforceForm';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import MultipleLeadsPage from '../linkedInScreens/multipleLeadsPage';
import NavigateMessageSalesforce from '../linkedInScreens/navigateMessageSalesforce';
import Loading from '../loadingIndicator/loadingIndicator';

export const patchLeadWithContactId = (leadId, contactId) => {
  api.patch(`/bobjects/${leadId}/raw`, {
    contents: {
      [SALESFORCE.CONTACT_ID_FIELD]: contactId,
    },
    params: { duplicateValidation: true },
  });
};

const isNewId = (sobjectId: string): boolean => {
  return sobjectId?.startsWith('new');
};

export const SalesforceLeadOrContactPage = ({
  forceSalesforceId,
}: {
  forceSalesforceId?: string;
}) => {
  const [possibleName, setPossibleName] = useState<string>();
  const { useGetCurrentPage, useGetActiveBobject } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [exactMatch, setExactMatch] = useState<boolean>();
  const [currentLeadOrLeads, setCurrentLeadOrLeads] = useState<LinkedInLead[]>(null);
  const id = extractSalesforceIdFromPath(currentPage);
  const isLead = isSalesforceLeadPage(currentPage);
  const isContact = isSalesforceContactPage(currentPage);
  const isAccount = isSalesforceAccountPage(currentPage);
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const accountId = useActiveAccountId();
  const hasOtoUpdateContactId = useOtoUpdateContactId(accountId);

  const { createLead, syncLead } = useCreationForm();
  const { enabledObjectCreation } = useObjectCreationSettings();

  const searchBySimilarLeads = (sobjectType: string) => {
    getSalesforceSobject(sobjectType, id).then(s => {
      const possibleEmail = s?.['Email'] || s?.['PersonEmail'];
      const possibleName = s?.['Name'];
      setPossibleName(possibleName);
      const possibleCompany = s?.['Company'];
      searchLeadByQuery({
        companyName: !hasOtoUpdateContactId ? possibleCompany : null,
        leadFullName: !hasOtoUpdateContactId ? possibleName : null,
        email: possibleEmail,
        autoMatching: false,
      }).then(response => {
        if (response && response?.exactMatch && response?.leads?.length === 1) {
          setCurrentLeadOrLeads([response?.leads[0]]);
          if (hasOtoUpdateContactId) {
            setExactMatch(true);
          }
          setIsLoading(false);
        } else if (response?.leads?.[0].id.objectId) {
          setCurrentLeadOrLeads([response?.leads[0]]);
          setIsLoading(false);
        } else if (response?.leads?.length > 1 || !response?.exactMatch) {
          setCurrentLeadOrLeads(response?.leads);
          setIsLoading(false);
        }
      });
    });
  };

  const searchLeadsByConvertedContactId = async contactId => {
    // This query lets us know if the contact comes from a converted lead
    const query = `select Id from Lead where ConvertedContactId = '${contactId}'`;
    querySalesforce(query).then(async leads => {
      if (leads?.length === 1) {
        // 2 Answer. Yes
        // 3 Question. Does this Lead exists on Bloobirds?
        const data = await searchLeadByQuery({
          salesforceId: leads?.[0]?.['Id'],
        });
        if ((data?.leads && data?.leads?.length === 0) || !data?.leads) {
          // 3 Answer. No
          // Do searching stuff
          searchBySimilarLeads('Contact');
        } else if (data?.leads?.length === 1) {
          // 3 Answer. Yes
          setCurrentLeadOrLeads([data?.leads[0]]);
          patchLeadWithContactId(data?.leads?.[0]?.id?.value, contactId);
          convertLeadInBloobirds(data?.leads?.[0]?.id?.value);
          setExactMatch(data?.exactMatch);
          setIsLoading(false);
        }
      } else {
        // 2 Answer. No
        setIsLoading(false);
      }
    });
  };

  const refresh = async (): Promise<void> => {
    setCurrentLeadOrLeads(null);
    if (!currentPage) {
      setIsLoading(true);
    } else {
      if (!isNewId(forceSalesforceId || id)) {
        setIsLoading(true);
        // Process based on FE 2. Sync Contact al entrar en la pagina del contact
        // More info https://www.notion.so/bloobirdsproduct/Conversion-process-84c1fdeb34de41e8a3d9f6f448df8af0
        // 1 Question. Does this Lead / Contact exist on Bloobirds by Salesforce Id?
        const data = await searchLeadByQuery({
          salesforceId: forceSalesforceId || id,
        });
        if ((data?.leads && data?.leads?.length === 0) || !data?.leads) {
          // 1 Answer. No
          if (isContact) {
            // 2 Question. Is this contact a converted lead?
            await searchLeadsByConvertedContactId(id);
          } else {
            // Do searching stuff
            searchBySimilarLeads(isPersonAccountAsAccount && isAccount ? 'Account' : 'Lead');
          }
        } else if (data?.leads?.length === 1) {
          // 1 Answer. Yes
          setCurrentLeadOrLeads([data?.leads[0]]);
          setExactMatch(data?.exactMatch);
          setIsLoading(false);
        } else if (data?.leads?.length > 1 && data?.exactMatch) {
          // 1 Answer. Yes
          setCurrentLeadOrLeads([data?.leads[0]]);
          setExactMatch(data?.exactMatch);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    refresh();
  }, [currentPage, activeBobject]);

  const initialLeadContext: ContactViewContext = {
    activeTab: ContactViewTab.LEAD,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentLeadOrLeads?.[0],
    actionsDisabled: false,
  };

  const afterSyncing = l => {
    setCurrentLeadOrLeads([l as LinkedInLead]);
    setExactMatch(true);
  };

  if (createLead && enabledObjectCreation) {
    if (isLead) {
      return (
        <CaptureSalesforceForm
          defaultSobjectType="Lead"
          sobjectId={id}
          // @ts-ignore
          afterSyncing={afterSyncing}
        />
      );
    }
    if (isContact) {
      return (
        <CaptureSalesforceForm
          defaultSobjectType="Contact"
          sobjectId={id}
          // @ts-ignore
          afterSyncing={afterSyncing}
        />
      );
    }
    if (forceSalesforceId) {
      return (
        <CaptureSalesforceForm
          defaultSobjectType="Account"
          sobjectId={forceSalesforceId}
          // @ts-ignore
          afterSyncing={afterSyncing}
        />
      );
    }
  }

  if (syncLead && !enabledObjectCreation) {
    return (
      <CaptureSalesforceForm
        defaultSobjectType="Lead"
        sobjectId={id}
        // @ts-ignore
        afterSyncing={afterSyncing}
        syncLead={true}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : currentLeadOrLeads && (currentLeadOrLeads?.length > 1 || !exactMatch) ? (
        <MultipleLeadsPage
          leads={currentLeadOrLeads}
          setCurrentLead={setCurrentLeadOrLeads}
          setExactMatch={setExactMatch}
          dataToUpdate={{
            [isContact
              ? SALESFORCE.CONTACT_ID_FIELD
              : isLead
              ? SALESFORCE.LEAD_ID_FIELD
              : null]: id,
          }}
          leadName={possibleName}
        />
      ) : currentLeadOrLeads ? (
        <ContactView defaultContext={initialLeadContext} />
      ) : enabledObjectCreation && isLead ? (
        <CaptureSalesforceForm
          defaultSobjectType="Lead"
          sobjectId={id}
          // @ts-ignore
          afterSyncing={afterSyncing}
        />
      ) : enabledObjectCreation && isContact ? (
        <CaptureSalesforceForm
          defaultSobjectType="Contact"
          sobjectId={id}
          // @ts-ignore
          afterSyncing={afterSyncing}
        />
      ) : enabledObjectCreation && forceSalesforceId ? (
        <CaptureSalesforceForm
          defaultSobjectType="Account"
          sobjectId={id}
          // @ts-ignore
          afterSyncing={afterSyncing}
        />
      ) : enabledObjectCreation ? (
        <NavigateMessageSalesforce />
      ) : (
        <MultipleLeadsPage
          leads={currentLeadOrLeads}
          setCurrentLead={setCurrentLeadOrLeads}
          setExactMatch={setExactMatch}
          dataToUpdate={{
            [isContact
              ? SALESFORCE.CONTACT_ID_FIELD
              : isLead
              ? SALESFORCE.LEAD_ID_FIELD
              : null]: id,
          }}
          leadName={possibleName}
        />
      )}
    </>
  );
};
