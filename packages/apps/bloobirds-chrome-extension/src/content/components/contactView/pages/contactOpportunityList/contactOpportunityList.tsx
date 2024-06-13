import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';
import {
  ContactViewTab,
  ExtensionCompany,
  ExtensionOpportunity,
  LinkedInLead,
} from '@bloobirds-it/types';
import capitalize from 'lodash/capitalize';

import { BubbleWindow } from '../../../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../../../context';
import { CompanyBriefHeader } from '../../components/companyBriefHeader/companyBriefHeader';
import { ContactViewContent } from '../../components/contactViewContent/contactViewContent';
import { OpportunityBriefCard } from '../../components/opportunityBriefCard/opportunityBriefCard';
import styles from '../contactLeadsList/contactsLeadsList.module.css';
import NoBobjectsPage from '../noBobjectsPage/noBobjectsPage';

export const ContactOpportunityList = ({
  company,
  opportunities,
  lead = null,
}: {
  company: ExtensionCompany;
  opportunities: ExtensionOpportunity[];
  lead?: LinkedInLead;
}) => {
  return (
    <BubbleWindow>
      {opportunities?.length > 0 ? (
        <>
          <CompanyBriefHeader company={company} lead={lead} />
          <ContactViewContent>
            <OpportunityList opportunities={opportunities} />
          </ContactViewContent>
        </>
      ) : (
        <NoBobjectsPage contactPage={ContactViewTab.OPPORTUNITY} />
      )}
    </BubbleWindow>
  );
};

export const OpportunityList = ({
  opportunities,
  withTitle = false,
}: {
  opportunities: ExtensionOpportunity[];
  withTitle?: boolean;
}) => {
  const { t, i18n } = useTranslation();
  const { useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();
  const salesforceStatusField = dataModel?.findFieldByLogicRole('SALESFORCE_OPPORTUNITY_STAGE');
  const oppStatusField = dataModel?.findFieldByLogicRole('OPPORTUNITY__STATUS');

  const opportunitiesSortedByStatus = opportunities?.sort((a, b) => {
    const getOrderingFromField = opp => {
      const fieldValue = isNoStatusPlanAccount
        ? salesforceStatusField?.values?.find(value => value?.name == opp?.salesforceStage)
        : oppStatusField?.values?.find(value => value?.id == opp?.status);
      return fieldValue !== undefined && fieldValue?.ordering !== undefined
        ? fieldValue.ordering
        : Infinity;
    };

    return getOrderingFromField(a) - getOrderingFromField(b);
  });

  return (
    <>
      {opportunitiesSortedByStatus?.length > 0 ? (
        <div className={styles._related_list_container}>
          {withTitle && (
            <Text
              className={styles._related_list_title}
              size={'xs'}
              color="softPeanut"
              weight="bold"
            >
              {t('sidePeek.overview.relatedBobjectOpp', {
                bobject:
                  i18n.language === 'en'
                    ? t('bobjectTypes.opportunity', { count: 0 })
                    : capitalize(t('bobjectTypes.opportunity', { count: 0 })),
              })}
            </Text>
          )}
          <div className={styles.leadsList}>
            {opportunitiesSortedByStatus?.map((opp, index) => {
              return <OpportunityBriefCard key={index} opportunity={opp} />;
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
