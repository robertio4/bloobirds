import { ContactViewTab, LinkedInLead } from '@bloobirds-it/types';
import { isCompany, isLead, isOpportunity } from '@bloobirds-it/utils';

import { useExtensionContext } from '../context';
import { SalesforceNoCompanyPage } from '../salesforceNoCompanyPage/salesforceNoCompanyPage';
import { useContactViewContext } from './context/contactViewContext';
import { ContactCompanyPage } from './pages/contactCompanyPage/contactCompanyPage';
import { ContactLeadPage } from './pages/contactLeadPage/contactLeadPage';
import { ContactsLeadsList } from './pages/contactLeadsList/contactsLeadsList';
import { ContactOpportunityList } from './pages/contactOpportunityList/contactOpportunityList';
import { ContactOpportunityPage } from './pages/contactOpportunityPage/contactOpportunityPage';
import { ContactRelatedCompanies } from './pages/contactRelatedCompanies/contactRelatedCompanies';

const ContactViewScreens = () => {
  const {
    useGetActiveBobject,
    useGetActiveBobjectContext,
    setActiveBobject,
  } = useExtensionContext();
  const activeBobject = useGetActiveBobject();
  const data = useGetActiveBobjectContext();
  const { activeTab } = useContactViewContext();

  if (!activeBobject) {
    return null;
  }
  if (isCompany(activeBobject)) {
    switch (activeTab) {
      case ContactViewTab.LEAD:
        return <ContactsLeadsList company={data?.company} leads={data?.leads} />;
      case ContactViewTab.COMPANY:
        return (
          <ContactCompanyPage
            company={data?.company || activeBobject}
            leads={data?.leads}
            opportunities={data?.opportunities}
            loading={!data}
          />
        );
      case ContactViewTab.OPPORTUNITY:
        return (
          <ContactOpportunityList
            company={data?.company || activeBobject}
            opportunities={data?.opportunities}
          />
        );
      case ContactViewTab.RELATED_COMPANIES:
        return (
          <ContactRelatedCompanies
            company={data?.company}
            childCompanies={data?.childCompanies}
            parentCompany={data?.parentCompany}
            siblingCompanies={data?.siblingCompanies}
          />
        );
      default:
        return <></>;
    }
  }
  if (isLead(activeBobject)) {
    switch (activeTab) {
      case ContactViewTab.LEAD:
        return <ContactLeadPage lead={activeBobject} leads={data?.leads} />;
      case ContactViewTab.COMPANY:
        // Shouldn't arrive
        return <SalesforceNoCompanyPage />;
      case ContactViewTab.OPPORTUNITY:
        if (data?.opportunities?.length === 1) {
          setActiveBobject(data?.opportunities?.[0]);
          return <ContactOpportunityPage opportunity={data?.opportunities?.[0]} />;
        } else {
          return (
            <ContactOpportunityList
              company={data?.company}
              opportunities={data?.opportunities}
              lead={activeBobject as LinkedInLead}
            />
          );
        }
      case ContactViewTab.RELATED_COMPANIES:
        return (
          <ContactRelatedCompanies
            company={data?.company}
            parentCompany={data?.parentCompany}
            childCompanies={data?.childCompanies}
            siblingCompanies={data?.siblingCompanies}
          />
        );
      default:
        return <></>;
    }
  }
  if (isOpportunity(activeBobject)) {
    switch (activeTab) {
      case ContactViewTab.LEAD:
        if (data?.leads?.length === 1) {
          setActiveBobject(data?.leads[0]);
          return <ContactLeadPage lead={data?.leads[0]} leads={data?.leads} />;
        }
        return <ContactsLeadsList company={data?.company} leads={data?.leads} />;
      case ContactViewTab.COMPANY:
        // Shouldn't arrive
        return <></>;
      case ContactViewTab.OPPORTUNITY:
        return <ContactOpportunityPage opportunity={activeBobject} />;
      case ContactViewTab.RELATED_COMPANIES:
        return (
          <ContactRelatedCompanies
            company={data?.company}
            childCompanies={data?.childCompanies}
            parentCompany={data?.parentCompany}
            siblingCompanies={data?.siblingCompanies}
          />
        );
      default:
        return <></>;
    }
  }
  return <></>;
};

export default ContactViewScreens;
