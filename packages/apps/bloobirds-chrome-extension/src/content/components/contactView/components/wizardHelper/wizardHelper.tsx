import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CircularBadge, Text } from '@bloobirds-it/flamingo-ui';
import {
  BobjectTypes,
  CadenceActionType,
  ExtensionBobject,
  ExtensionOpportunity,
  LinkedInLead,
  MainBobjectTypes,
  OPPORTUNITY_LEADS_LOGIC_ROLES,
} from '@bloobirds-it/types';
import { api, isDynamicsPage } from '@bloobirds-it/utils';
import clsx from 'clsx';
import useSWR from 'swr';

import { isSalesforcePage } from '../../../../../utils/url';
import { useExtensionContext } from '../../../context';
import { useFloatingMenuContext } from '../../../floatingMenu/floatingMenuContext';
import { SyncSalesforceContactScreen } from '../../../syncSalesforceContactsScreen/syncSalesforceContactScreen';
import { useContextBobjects } from '../../hooks/useContextBobjects';
import { CadenceTaskManager } from './components/cadenceTaskManager/cadenceTaskManager';
import { CreateInSfdcHelper } from './components/createInSfdcHelper/createInSfdcHelper';
import styles from './wizardHelper.module.css';

export enum WizardHelpers {
  SYNC_TO_BB = 'SYNC_TO_BB',
  HANDLE_INACTIVE = 'HANDLE_INACTIVE',
  START_CADENCE = 'START_CADENCE',
  TODAY_TASKS = 'TODAY_TASKS',
  CREATE_IN_SFDC = 'CREATE_IN_SFDC',
}

export interface WizardHelperProps {
  bobject: ExtensionBobject<MainBobjectTypes>;
  relatedCompany?: ExtensionBobject<BobjectTypes.Company>;
  minimized?: boolean;
  step?: WizardHelpers;
  cadenceControlCallback?: (action: CadenceActionType) => void;
}

export interface RelatedContactResponse {
  relatedObjects: ExtensionBobject[];
  nonMatchedDrafts: ExtensionBobject[];
}

function isFiveMinutesOlder(dateString) {
  // Convert the date string to a Date object
  const givenDate: any = new Date(dateString);
  // Get the current date and time
  const currentDate: any = new Date();
  // Calculate the difference in minutes between the two dates
  const diffInMinutes = (currentDate - givenDate) / 1000 / 60;
  // Check if the difference is greater than or equal to 5 minutes
  return diffInMinutes >= 1;
}

export const WizardHelper = (props: WizardHelperProps) => {
  const { setCustomPage, useGetSettings, useGetCurrentPage } = useExtensionContext();
  const { handleMutateAndRefresh } = useContextBobjects();
  const { t } = useTranslation();
  const settings = useGetSettings();
  const currentPage = useGetCurrentPage();
  const { setShowBackButton, setLastVisitedBobject } = useFloatingMenuContext();
  const salesforceInstance = settings?.account?.salesforceInstance;
  const isCurrentPageSalesforcePage = isSalesforcePage(currentPage);
  const { bobject, relatedCompany, minimized } = props;

  const notCreatedInSfdc = salesforceInstance && !bobject?.salesforceId;
  // This boolean is made to avoid show the button if it has been recently created
  const createdOld = bobject?.creationDateTime && isFiveMinutesOlder(bobject?.creationDateTime);
  const bobjectType = bobject?.id?.typeName;
  const isCompany = bobjectType === BobjectTypes.Company;
  const isOpportunity = bobjectType === BobjectTypes.Opportunity;
  const shouldGetRelatedContact =
    bobject?.salesforceId &&
    (isCompany ||
      (isOpportunity &&
        (bobject as ExtensionOpportunity)?.leads?.length <
          Object.keys(OPPORTUNITY_LEADS_LOGIC_ROLES).length));
  const relatedSobjectType = isCompany ? 'Contact' : 'OpportunityContactRole';

  const { data, mutate } = useSWR(
    shouldGetRelatedContact &&
      `/utils/service/salesforce/relatedSobjects/${relatedSobjectType}/AccountId/${bobject?.salesforceId}`,
    url => api.get<RelatedContactResponse>(url).then(data => data.data),
  );
  const matchedDraftsWithoutBloobirdsId = data?.relatedObjects.filter(
    relatedObject =>
      !(bobject as ExtensionOpportunity)?.leads?.includes(
        (relatedObject as LinkedInLead)?.id?.value,
      ),
  );

  const nonMatchedDrafts = isOpportunity
    ? data?.nonMatchedDrafts.concat(matchedDraftsWithoutBloobirdsId)
    : data?.nonMatchedDrafts;

  const sample = nonMatchedDrafts?.slice(0, 3);

  const containerClasses = clsx(styles.wizard__container, {
    [styles.wizard__container__minimized]: minimized,
  });
  const shouldRenderSyncRelatedObjects =
    nonMatchedDrafts?.length > 0 && isCurrentPageSalesforcePage;

  // When refreshing from floating menu, also check related contacts
  useEffect(() => {
    if (isOpportunity) {
      mutate();
    }
  }, [isOpportunity]);

  return (
    <div id="bb-wizard-helper" className={containerClasses}>
      <CadenceTaskManager {...props} />
      {notCreatedInSfdc && createdOld && !isDynamicsPage(currentPage) ? (
        <CreateInSfdcHelper bobject={bobject} />
      ) : shouldRenderSyncRelatedObjects ? (
        <span className={styles.sync__contacts__container}>
          <div className={styles.badges_container}>
            {sample?.map((el, i) => (
              <CircularBadge key={i} size="s" color="white" backgroundColor="var(--verySoftPeanut)">
                C
              </CircularBadge>
            ))}
          </div>
          <Text size="s" color="peanut" weight="bold">
            {t('sidePeek.overview.contacts', { count: nonMatchedDrafts?.length })}{' '}
            {t('sidePeek.overview.notSynced')?.toLowerCase()}
          </Text>
          <span
            className={styles.sync_button}
            onClick={() => {
              setShowBackButton(true);
              setCustomPage(
                <SyncSalesforceContactScreen
                  draftBobjectToSync={nonMatchedDrafts}
                  companyIdRelated={isOpportunity ? relatedCompany?.id : bobject?.id}
                  onSync={() => {
                    if (handleMutateAndRefresh) {
                      mutate();
                      handleMutateAndRefresh().then(r => setLastVisitedBobject(r));
                    }
                  }}
                  opportunityRelatedId={isOpportunity && bobject?.id}
                />,
              );
            }}
          >
            <Text size="s" color="white" decoration="underline" weight="bold">
              {t('sidePeek.overview.sync')}
            </Text>
          </span>
        </span>
      ) : (
        <></>
      )}
    </div>
  );
};
