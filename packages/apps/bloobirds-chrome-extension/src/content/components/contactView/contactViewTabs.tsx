import { useIsB2CAccount } from '@bloobirds-it/hooks';
import { ContactViewTab } from '@bloobirds-it/types';

import { useExtensionContext } from '../context';
import styles from './contactView.module.css';
import ContactViewTabElement from './contactViewTabElement';
import { useContactViewContext } from './context/contactViewContext';

const ContactViewTabs = () => {
  const {
    setActiveBobject,
    useGetActiveBobjectContext,
    closeExtendedScreen,
  } = useExtensionContext();
  const data = useGetActiveBobjectContext();
  const { activeTab } = useContactViewContext();

  const isB2CAccount = useIsB2CAccount();

  const handleClickCompany = () => {
    if (data?.company) {
      setActiveBobject(data?.company);
    }
    closeExtendedScreen();
  };

  const handleClickLeads = () => {
    if (data?.company && activeTab === ContactViewTab.LEAD) {
      setActiveBobject(data?.company, ContactViewTab.LEAD);
    }
    if (data?.leads?.length === 1 && activeTab === ContactViewTab.OPPORTUNITY) {
      setActiveBobject(data?.leads?.[0], ContactViewTab.LEAD);
    }
    closeExtendedScreen();
  };

  const handleClickOpportunities = () => {
    if (data?.company && activeTab === ContactViewTab.OPPORTUNITY) {
      setActiveBobject(data?.company, ContactViewTab.OPPORTUNITY);
    }
    closeExtendedScreen();
  };

  return (
    <div className={styles.header__container}>
      {!isB2CAccount && (
        <ContactViewTabElement
          tab={ContactViewTab.COMPANY}
          icon="company"
          onClick={handleClickCompany}
          bobjects={[data?.company]}
        />
      )}
      <ContactViewTabElement
        tab={ContactViewTab.LEAD}
        icon="people"
        number={data?.leads?.length}
        onClick={handleClickLeads}
        bobjects={data?.leads}
      />
      <ContactViewTabElement
        tab={ContactViewTab.OPPORTUNITY}
        icon="fileOpportunity"
        number={data?.numberOfOpportunities}
        onClick={handleClickOpportunities}
        bobjects={data?.opportunities}
      />
      {!isB2CAccount && (
        <ContactViewTabElement
          tab={ContactViewTab.RELATED_COMPANIES}
          icon="child"
          number={
            data
              ? data.numberOfChildCompanies +
                (data.parentCompany ? 1 : 0) +
                (data.siblingCompanies ? data.siblingCompanies.length - 1 : 0)
              : undefined
          }
        />
      )}
    </div>
  );
};

export default ContactViewTabs;
