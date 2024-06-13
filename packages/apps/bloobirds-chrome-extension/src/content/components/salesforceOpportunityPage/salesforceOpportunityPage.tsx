import { useEffect, useState } from 'react';

import {
  ExtensionOpportunity,
  ContactViewContext,
  ContactViewSubTab,
  ContactViewTab,
} from '@bloobirds-it/types';
import { querySalesforce, convertLeadInBloobirds } from '@bloobirds-it/utils';

import { searchLeadByQuery, searchOppsByQuery } from '../../../utils/leads';
import { getSalesforceIdFromPath } from '../../../utils/url';
import CaptureSalesforceForm from '../captureLeadSalesforceForm/captureSalesforceForm';
import { ContactView } from '../contactView/contactView';
import { useExtensionContext } from '../context';
import Loading from '../loadingIndicator/loadingIndicator';
import { patchCompanyWithAccountId } from '../salesforceAccountPage/salesforceAccountPage';
import { patchLeadWithContactId } from '../salesforceLeadOrContactPage/salesforceLeadOrContactPage';

export const SalesforceOpportunityPage = () => {
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();
  const [isLoading, setIsLoading] = useState(true);
  const [, setExactMatch] = useState<boolean>();
  const [currentOppOrOpps, setCurrentOppOrOpps] = useState<ExtensionOpportunity[]>(null);
  const id = getSalesforceIdFromPath(currentPage);

  const searchLeadsByConvertedOpportunityId = async (opportunityId: string) => {
    // This query lets us know if the opportunity comes from a converted lead
    const query = `select Id, ConvertedContactId, ConvertedAccountId from Lead where ConvertedOpportunityId = '${opportunityId}'`;
    const sfdcLeads = await querySalesforce(query);
    if (sfdcLeads?.length === 1) {
      // 2 Answer. Yes
      // 3 Question. Does this Lead exists on Bloobirds?
      const data = await searchLeadByQuery({
        salesforceId: sfdcLeads?.[0]?.['Id'],
      });
      if ((data?.leads && data?.leads?.length === 0) || !data?.leads) {
        // 3 Answer. No. Sync Opp
        setIsLoading(false);
      } else if (data?.leads?.length === 1) {
        // 3 Answer. Yes
        const lead = data?.leads?.[0];
        const possibleConvertedContactId = sfdcLeads?.[0]?.['ConvertedContactId'];
        const possibleConvertedAccountId = sfdcLeads?.[0]?.['ConvertedAccountId'];
        const leadCompany = lead?.companyId;
        if (lead) {
          if (possibleConvertedContactId) {
            patchLeadWithContactId(lead?.id?.value, possibleConvertedContactId);
          }
          // 4 Question. Does this lead has a company?
          if (leadCompany && possibleConvertedAccountId) {
            // 4 Answer. Yes
            await patchCompanyWithAccountId(leadCompany, possibleConvertedAccountId);
          }
          convertLeadInBloobirds(lead?.id?.value);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    } else {
      // 2 Answer. No. Sync Opp
      setIsLoading(false);
    }
  };

  const refresh = async (): Promise<void> => {
    setCurrentOppOrOpps(null);
    setExactMatch(null);
    if (!currentPage) {
      setIsLoading(true);
    } else {
      setIsLoading(true);
      // Process based on FE 3. Sync Opp al entrar en la pagina de Opportunidad
      // More info https://www.notion.so/bloobirdsproduct/Conversion-process-84c1fdeb34de41e8a3d9f6f448df8af0
      // 1 Question. Does this Opportunity exist on Bloobirds by Salesforce Id?
      const data = await searchOppsByQuery({
        salesforceId: id,
      });
      if ((data?.opportunities && data?.opportunities?.length === 0) || !data?.opportunities) {
        // 1 Answer. No
        // 2 Question. Is this opportunity a converted lead?
        await searchLeadsByConvertedOpportunityId(id);
      } else if (data?.opportunities?.length === 1) {
        // 1 Answer. Yes
        setCurrentOppOrOpps([data?.opportunities[0]]);
        setIsLoading(false);
        setExactMatch(data?.exactMatch);
      } else if (data?.opportunities?.length > 1 && data?.exactMatch) {
        // 1 Answer. Yes
        setCurrentOppOrOpps([data?.opportunities[0]]);
        setExactMatch(data?.exactMatch);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    refresh();
  }, [currentPage]);

  const initialLeadContext: ContactViewContext = {
    activeTab: ContactViewTab.OPPORTUNITY,
    activeSubTab: ContactViewSubTab.OVERVIEW,
    activeBobject: currentOppOrOpps?.[0],
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : currentOppOrOpps ? (
        <ContactView defaultContext={initialLeadContext} />
      ) : (
        <CaptureSalesforceForm
          defaultSobjectType="Opportunity"
          sobjectId={id}
          // @ts-ignore
          afterSyncing={l => setCurrentOppOrOpps([l])}
        />
      )}
    </>
  );
};
