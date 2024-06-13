import { useEffect, useState } from 'react';

import { useIsPersonAccountAsAccount } from '@bloobirds-it/hooks';
import {
  ContactViewContext,
  ContactViewSubTab,
  ContactViewTab,
  ExtensionCompany,
  LEAD_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import {
  api,
  convertLeadInBloobirds,
  getSalesforceSobject,
  querySalesforce,
  extractSalesforceIdFromPath,
} from '@bloobirds-it/utils';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { SALESFORCE } from '../../../utils/integrations';
import { searchCompaniesByQuery, searchLeadByQuery } from '../../../utils/leads';
import CaptureSalesforceForm from '../captureLeadSalesforceForm/captureSalesforceForm';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import Loading from '../loadingIndicator/loadingIndicator';
import MultipleCompaniesPage from '../multipleCompaniesPage/multipleCompaniesPage';
import {
  patchLeadWithContactId,
  SalesforceLeadOrContactPage,
} from '../salesforceLeadOrContactPage/salesforceLeadOrContactPage';

export const patchCompanyWithAccountId = async (companyId, accountId) => {
  if (accountId) {
    return await api.patch(`/bobjects/${companyId}/raw`, {
      contents: {
        [SALESFORCE.ACCOUNT_ID_FIELD]: accountId,
      },
      params: { duplicateValidation: true },
    });
  } else {
    return false;
  }
};

export const SalesforceAccountPage = () => {
  const { useGetCurrentPage } = useExtensionContext();
  const isPersonAccountAsAccount = useIsPersonAccountAsAccount();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [isPerson, setIsPerson] = useState(null);
  const [exactMatch, setExactMatch] = useState<boolean>();
  const [aboveLead, setAboveLead] = useState<string>();
  const { getOnRefresh } = useFloatingMenuContext();
  const onRefresh = getOnRefresh();
  const [currentCompanyOrCompanies, setCurrentCompanyOrCompanies] = useState<ExtensionCompany[]>(
    null,
  );

  const id = extractSalesforceIdFromPath(currentPage);
  const { createLead } = useCreationForm();

  const searchBySimilarCompanies = (name: string) => {
    searchCompaniesByQuery({
      name: name,
      autoMatching: false,
    }).then(response => {
      if (response && response?.exactMatch && response?.companies?.length === 1) {
        setCurrentCompanyOrCompanies([response?.companies[0]]);
        setIsLoading(false);
      } else if (response?.companies?.[0].id.objectId) {
        setCurrentCompanyOrCompanies([response?.companies[0]]);
        setIsLoading(false);
      } else if (response?.companies?.length > 1 || !response?.exactMatch) {
        setCurrentCompanyOrCompanies(response?.companies);
        setIsLoading(false);
      }
    });
  };

  const searchLeadsByConvertedAccountId = async (accountId: string, fallbackname: string) => {
    // This query lets us know if the account comes from a converted lead
    const query = `select Id, ConvertedContactId from Lead where ConvertedAccountId = '${accountId}'`;
    querySalesforce(query).then(async sfdcLeads => {
      if (sfdcLeads?.length === 1) {
        // 3 Answer. Yes
        // 4 Question. Does this Lead exists on Bloobirds?
        const data = await searchLeadByQuery({
          salesforceId: sfdcLeads?.[0]?.['Id'],
        });
        if ((data?.leads && data?.leads?.length === 0) || !data?.leads) {
          // 4 Answer. No
          searchBySimilarCompanies(fallbackname);
        } else if (data?.leads?.length === 1) {
          // 4 Answer. Yes
          const lead = data?.leads?.[0];
          const possibleConvertedContactId = sfdcLeads?.[0]?.['ConvertedContactId'];
          if (possibleConvertedContactId) {
            patchLeadWithContactId(lead?.id?.value, possibleConvertedContactId);
          }
          // 5 Question. Does this lead has a company?
          const leadCompany = lead?.companyId;
          if (leadCompany) {
            // 5 Answer. Yes
            const extensionCompany = await api.get(
              `/linkedin/companies/${lead?.companyId?.split('/')?.[2]}`,
            );
            // 6 Question. Does this company exist?
            if (extensionCompany) {
              // 6 Answer. Yes
              setCurrentCompanyOrCompanies([extensionCompany?.data]);
              patchCompanyWithAccountId(leadCompany, accountId);
              setExactMatch(data?.exactMatch);
              setIsLoading(false);
            } else {
              // 6 Answer. No. Option to create company above lead
              setAboveLead(lead?.id?.value);
              setIsLoading(false);
            }
          } else {
            // 5 Answer. No. Option to create company above lead
            setAboveLead(lead?.id?.value);
            setIsLoading(false);
          }
        }
      } else {
        // 3 Answer. No
        searchBySimilarCompanies(fallbackname);
        setIsLoading(false);
      }
    });
  };

  const refresh = async (): Promise<void> => {
    setCurrentCompanyOrCompanies(null);
    setExactMatch(null);
    if (!currentPage) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      // Process based on FE 1. Sync Account al entrar en la pagina del Account.
      // More info https://www.notion.so/bloobirdsproduct/Conversion-process-84c1fdeb34de41e8a3d9f6f448df8af0
      // 1 Question. Does this Account exist on Bloobirds by Salesforce Id?
      const data = await searchCompaniesByQuery({
        salesforceId: id,
      });
      if ((data?.companies && data?.companies?.length === 0) || !data?.companies) {
        // 1 Answer. No
        getSalesforceSobject('Account', id).then(async s => {
          const possibleName = s?.['Name'];
          const personContactId = s?.['PersonContactId'];
          // 2 Question. Is this account a person account?
          if (personContactId) {
            // 2 Answer. Yes
            setIsPerson(personContactId);
            setIsLoading(false);
          } else {
            // 2 Answer. No
            // 3 Question. Is this account a converted lead?
            await searchLeadsByConvertedAccountId(id, possibleName);
          }
        });
      } else if (
        data?.companies?.length === 1 ||
        (data?.companies?.length > 1 && data?.exactMatch)
      ) {
        // 1 Answer. Yes
        setCurrentCompanyOrCompanies([data?.companies[0]]);
        setExactMatch(data?.exactMatch);
        if (isPersonAccountAsAccount && data?.companies?.[0]?.personContactId) {
          setIsPerson(data?.companies[0]?.personContactId);
        }
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    refresh();
  }, [currentPage]);

  const initialLeadContext: ContactViewContext = {
    activeTab: ContactViewTab.COMPANY,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentCompanyOrCompanies?.[0],
  };

  const afterSyncing = l => {
    if (aboveLead && l?.id?.value) {
      api
        .patch(`/bobjects/${aboveLead}/raw`, {
          contents: {
            [LEAD_FIELDS_LOGIC_ROLE.COMPANY]: l?.id?.value,
          },
          params: {},
        })
        .then(() => {
          onRefresh();
        });
      convertLeadInBloobirds(aboveLead);
    }
    setExactMatch(true);
    setCurrentCompanyOrCompanies([l as ExtensionCompany]);
  };

  if (createLead) {
    return (
      <CaptureSalesforceForm
        defaultSobjectType="Account"
        sobjectId={id}
        // @ts-ignore
        afterSyncing={afterSyncing}
      />
    );
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isPerson ? (
        <SalesforceLeadOrContactPage forceSalesforceId={isPerson} />
      ) : currentCompanyOrCompanies && (currentCompanyOrCompanies?.length > 1 || !exactMatch) ? (
        <MultipleCompaniesPage
          companies={currentCompanyOrCompanies}
          setExactMatch={setExactMatch}
          setCurrentCompany={setCurrentCompanyOrCompanies}
          dataToUpdate={{
            [SALESFORCE.ACCOUNT_ID_FIELD]: id,
          }}
        />
      ) : currentCompanyOrCompanies ? (
        <ContactView defaultContext={initialLeadContext} />
      ) : (
        <CaptureSalesforceForm
          defaultSobjectType="Account"
          sobjectId={id}
          // @ts-ignore
          afterSyncing={afterSyncing}
        />
      )}
    </>
  );
};
