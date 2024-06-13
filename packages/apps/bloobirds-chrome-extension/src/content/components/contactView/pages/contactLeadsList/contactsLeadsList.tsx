import { useTranslation } from 'react-i18next';

import { CircularBadge, Text } from '@bloobirds-it/flamingo-ui';
import { useIsB2CAccount } from '@bloobirds-it/hooks';
import {
  BobjectId,
  ContactViewTab,
  ExtensionBobject,
  ExtensionCompany,
  LinkedInLead,
} from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';
import capitalize from 'lodash/capitalize';
import useSWR from 'swr';

import { BubbleWindow } from '../../../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../../../context';
import { useFloatingMenuContext } from '../../../floatingMenu/floatingMenuContext';
import { SyncSalesforceContactScreen } from '../../../syncSalesforceContactsScreen/syncSalesforceContactScreen';
import { CompanyBriefHeader } from '../../components/companyBriefHeader/companyBriefHeader';
import { ContactViewContent } from '../../components/contactViewContent/contactViewContent';
import { LeadBriefCard } from '../../components/leadBriefCard/leadBriefCard';
import { RelatedContactResponse } from '../../components/wizardHelper/wizardHelper';
import NoBobjectsPage from '../noBobjectsPage/noBobjectsPage';
import styles from './contactsLeadsList.module.css';

const SyncRelatedContacts = ({
  nonMatchedDrafts,
  array,
  relatedCompanyId,
  relatedOpportunityId,
}: {
  nonMatchedDrafts: ExtensionBobject[];
  array: ExtensionBobject[];
  relatedCompanyId: BobjectId;
  relatedOpportunityId?: BobjectId;
}) => {
  const { setShowBackButton } = useFloatingMenuContext();
  const { setCustomPage } = useExtensionContext();
  const { t } = useTranslation();
  return (
    <>
      {nonMatchedDrafts?.length > 0 && (
        <span className={styles.sync__contacts__container}>
          <div className={styles.badges_container}>
            {array?.map((el, i) => (
              <CircularBadge key={i} size="s" color="white" backgroundColor="var(--verySoftPeanut)">
                C
              </CircularBadge>
            ))}
          </div>
          <Text size="s" color="peanut" weight="bold">
            {nonMatchedDrafts?.length} Contact{nonMatchedDrafts?.length > 1 ? 's' : ''} not synced
          </Text>
          <span
            className={styles.sync_button}
            onClick={() => {
              setShowBackButton(true);
              setCustomPage(
                <SyncSalesforceContactScreen
                  draftBobjectToSync={nonMatchedDrafts}
                  companyIdRelated={relatedCompanyId}
                  opportunityRelatedId={relatedOpportunityId}
                />,
              );
            }}
          >
            <Text size="s" color="peanut" decoration="underline" weight="bold">
              {t('sidePeek.overview.sync')}
            </Text>
          </span>
        </span>
      )}
    </>
  );
};

export const ContactsLeadsList = ({
  company,
  leads,
}: {
  company: ExtensionCompany;
  leads: LinkedInLead[];
}) => {
  const { data } = useSWR(
    company?.salesforceId &&
      '/utils/service/salesforce/relatedSobjects/Contact/AccountId/' + company?.salesforceId,
    () =>
      api
        .get<RelatedContactResponse>(
          '/utils/service/salesforce/relatedSobjects/Contact/AccountId/' + company?.salesforceId,
        )
        .then(data => data?.data),
  );
  const isB2CAccount = useIsB2CAccount();
  const nonMatchedDrafts = data?.nonMatchedDrafts;
  const array = nonMatchedDrafts?.slice(0, 3);
  return (
    <BubbleWindow>
      {leads?.length > 0 ? (
        <>
          {!isB2CAccount && <CompanyBriefHeader company={company} />}
          <ContactViewContent>
            <div className={styles.container}>
              <LeadsList leads={leads} />
              {!isB2CAccount && (
                <SyncRelatedContacts
                  nonMatchedDrafts={nonMatchedDrafts}
                  array={array}
                  relatedCompanyId={company?.id}
                />
              )}
            </div>
          </ContactViewContent>
        </>
      ) : (
        <NoBobjectsPage contactPage={ContactViewTab.LEAD} />
      )}
    </BubbleWindow>
  );
};

export const LeadsList = ({
  leads,
  withTitle = false,
}: {
  leads: LinkedInLead[];
  withTitle?: boolean;
}) => {
  const { useGetSettings } = useExtensionContext();
  const { t, i18n } = useTranslation();
  const settings = useGetSettings();
  const hasSalesforceIntegration = settings?.account?.salesforceInstance;
  const bobjectName = hasSalesforceIntegration ? t('bobjectTypes.contact', {count: 0}) : t('bobjectTypes.lead', {count: 0});

  return (
    <>
      {leads?.length > 0 ? (
        <div className={styles._related_list_container}>
          {withTitle && (
            <Text
              className={styles._related_list_title}
              size={'xs'}
              color="softPeanut"
              weight="bold"
            >
              {t('sidePeek.overview.relatedBobject', {
                bobject: i18n.language === 'en' ? bobjectName : capitalize(bobjectName),
              })}
            </Text>
          )}
          <div className={styles.leadsList}>
            {leads?.map((lead, idx) => (
              <LeadBriefCard key={`${lead?.id?.value}-${idx}`} lead={lead} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
