import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { SimilarDealsTooltip } from '@bloobirds-it/discovery-tooltips';
import { useSimilarDeals } from '@bloobirds-it/email';
import { Icon, IconButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE,
  Bobject,
  BobjectTypes,
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  MIXPANEL_EVENTS,
  OPPORTUNITY_FIELDS_LOGIC_ROLE,
} from '@bloobirds-it/types';
import { api, getExtensionBobjectByIdFields } from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import { ExtendedContextTypes } from '../../../../../types/extendedContext';
import {
  addHttpIfNeeded,
  createBloobirdsUrl,
  isLinkedinOrSalesNav,
} from '../../../../../utils/url';
import { useExtensionContext } from '../../../context';
import { useContactViewContext } from '../../context/contactViewContext';
import styles from './contactButtons.module.css';

export const ContactButtons = ({
  bobject,
  mainNoteBobject,
  isDisabled,
  hasOpportunities = false,
}) => {
  const { actionsDisabled } = useContactViewContext();
  const { useGetDataModel, useGetSettings, setExtendedContext } = useExtensionContext();
  const dataModel = useGetDataModel();
  const settings = useGetSettings();
  const isOTOAccount = useIsOTOAccount();
  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.contactViewActions.contactButtons',
  });
  const { t: bobjectT } = useTranslation('translation', { keyPrefix: 'bobjectTypes' });
  const bobjectType = bobject.id.typeName;
  const bobjectLinkedInUrl = bobject.linkedInUrl;
  const bobjectSalesforceId = bobject.salesforceId;
  const bobjectDynamicsId = bobject.dynamicsId;
  const bobjectDynamicsType = bobject.dynamicsType;
  const website = bobject?.website;
  const mainNote = bobject?.mainNote && !!mainNoteBobject;
  const hubspotPortalId = settings?.account?.hubspotPortalId;
  const salesforceInstance = settings?.account?.salesforceInstance;
  const bobjectHubspotId = bobject?.hubspotId;
  const bloobirdsUrl = createBloobirdsUrl(bobject.id);
  const isOpportunityBobject = bobject.id.typeName === 'Opportunity';
  const hubspotBobjectType =
    bobject?.id?.typeName === 'Lead'
      ? 'contact'
      : bobject?.id?.typeName === 'Company'
      ? 'company'
      : 'deal';
  const companyIdField = dataModel?.findFieldByLogicRole(
    bobjectType === BobjectTypes.Lead
      ? LEAD_FIELDS_LOGIC_ROLE.COMPANY
      : OPPORTUNITY_FIELDS_LOGIC_ROLE.COMPANY,
  )?.id;
  const [relatedCompany, setRelatedCompany] = useState<ExtensionBobject>();

  const { data: msndynamicdriver } = useSWR(
    `/integrations/manager/drivers/msndynamics`,
    async () => await api.get(`/integrations/manager/drivers/msndynamics`).then(res => res.data),
  );

  useEffect(() => {
    if (companyIdField && bobject?.rawBobject[companyIdField]) {
      getExtensionBobjectByIdFields({
        typeName: BobjectTypes.Company,
        objectId: bobject?.rawBobject[companyIdField]?.split('/')[2],
      }).then(res => setRelatedCompany(res?.data));
    }
  }, []);

  function openNoteModal() {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_MAIN_NOTE_ICON_FROM_CONTACT_VIEW);

    const bobjectFieldsData = {};
    mainNoteBobject?.data?.fields.forEach(field => {
      bobjectFieldsData[field.logicRole || field.name] = field.value;
    });

    const activityMainNoteYes = dataModel?.findValueByLogicRole(
      ACTIVITY_MAIN_NOTE_VALUES_LOGIC_ROLE.YES,
    );
    const isMainNote =
      bobjectFieldsData[ACTIVITY_FIELDS_LOGIC_ROLE.MAIN_NOTE] === activityMainNoteYes?.id;

    setExtendedContext({
      type: ExtendedContextTypes.NOTE_DETAILS,
      bobject: mainNoteBobject?.data,
      extraInfo: {
        lead: bobjectType === 'Lead' && {
          ...bobject,
          fullName: bobject?.fullName,
        },
        company: bobjectType === 'Company' && {
          ...bobject,
          fullName: bobject?.name,
        },
        opportunity: bobjectType === 'Opportunity' && {
          ...bobject,
          fullName: bobject?.name,
        },
        bobjectId: mainNoteBobject?.data?.id?.value,
        originallyMainNote: isMainNote,
        location: 'bubble',
        ...bobjectFieldsData,
      },
      actionsDisabled: actionsDisabled,
    });
  }

  const handleGoToSalesforce = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isLinkedinOrSalesNav(window.location.href)) {
      window.open(`${salesforceInstance}/${bobjectSalesforceId}`, '_blank');
    } else {
      window.open(
        `${salesforceInstance}/${bobjectSalesforceId}`,
        e.metaKey || (navigator.appVersion.indexOf('Mac') == -1 && e.ctrlKey) ? '_blank' : '_self',
      );
    }
  };

  const handleGoToDynamics = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (msndynamicdriver?.resource) {
      const resource = msndynamicdriver.resource;
      if (isLinkedinOrSalesNav(window.location.href)) {
        window.open(
          `${resource}/main.aspx?etn=${bobjectDynamicsType}&pagetype=entityrecord&id=%7B${bobjectDynamicsId}%7D`,
          '_blank',
        );
      } else {
        window.open(
          `${resource}/main.aspx?etn=${bobjectDynamicsType}&pagetype=entityrecord&id=%7B${bobjectDynamicsId}%7D`,
          e.metaKey || (navigator.appVersion.indexOf('Mac') == -1 && e.ctrlKey)
            ? '_blank'
            : '_self',
        );
      }
    }
  };

  const handleGoToLinkedin = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (bobjectLinkedInUrl) {
      if (isLinkedinOrSalesNav(window.location.href)) {
        window.open(
          addHttpIfNeeded(bobjectLinkedInUrl),
          e.metaKey || (navigator.appVersion.indexOf('Mac') == -1 && e.ctrlKey)
            ? '_blank'
            : '_self',
        );
      } else {
        window.open(addHttpIfNeeded(bobjectLinkedInUrl), '_blank');
      }
    } else {
      if (isLinkedinOrSalesNav(window.location.href)) {
        window.open(
          'https://linkedin.com/search/results/all/?keywords=' +
            bobject.name +
            '&origin=GLOBAL_SEARCH_HEADER&sid=Y5G',
          '_blank',
        );
      } else {
        window.open(
          'https://linkedin.com/search/results/all/?keywords=' +
            bobject.name +
            '&origin=GLOBAL_SEARCH_HEADER&sid=Y5G',
          '_self',
        );
      }
    }
  };

  return (
    <div className={styles.buttonsContainer}>
      {!isOpportunityBobject && (
        <Tooltip
          title={
            bobjectLinkedInUrl
              ? t('openInLinkedIn', { bobjectType: bobjectT(bobjectType.toLowerCase()) })
              : t('searchInLinkedIn', { bobjectType: bobjectT(bobjectType.toLowerCase()) })
          }
          position="top"
        >
          <IconButton
            size={20}
            name="linkedin"
            color={bobjectLinkedInUrl ? 'bloobirds' : 'softPeanut'}
            onClick={handleGoToLinkedin}
          />
        </Tooltip>
      )}
      {bobjectSalesforceId && (
        <Tooltip title={t('goToSFDC')} position="top">
          <IconButton size={20} name="salesforceOutlined" onClick={handleGoToSalesforce} />
        </Tooltip>
      )}
      {bobjectDynamicsId && (
        <Tooltip title={'Go to Dynamics 365'} position="top">
          <IconButton size={20} name="microsoftDynamics" onClick={handleGoToDynamics} />
        </Tooltip>
      )}
      {bobjectHubspotId && hubspotPortalId && (
        <Tooltip title={t('goToHubspot')} position="top">
          <IconButton
            color="tangerine"
            size={20}
            name="hubspot"
            onClick={e =>
              window.open(
                `https://app.hubspot.com/contacts/${hubspotPortalId}/${hubspotBobjectType}/${bobjectHubspotId}`,
                e.metaKey || (navigator.appVersion.indexOf('Mac') == -1 && e.ctrlKey)
                  ? '_blank'
                  : null,
              )
            }
          />
        </Tooltip>
      )}
      {website && (
        <Tooltip title={website} position="top">
          <IconButton
            size={20}
            name="timezones"
            onClick={() => window.open(addHttpIfNeeded(website), '_blank')}
          />
        </Tooltip>
      )}
      {!isOTOAccount && (
        <Tooltip title={t('openInBB')} position="top">
          <IconButton
            size={20}
            name="bloobirds"
            onClick={() => window.open(addHttpIfNeeded(bloobirdsUrl), '_black')}
          />
        </Tooltip>
      )}
      {mainNote && (
        <Tooltip title={isDisabled ? t('noPermissions') : t('openMainNote')} position="top">
          <IconButton
            color="banana"
            size={20}
            name="note"
            onClick={openNoteModal}
            disabled={isDisabled}
          />
        </Tooltip>
      )}
      {hasOpportunities && (
        <div className={styles.noTooltipIcon}>
          <Icon color="peanut" size={20} name="fileOpportunity" />
        </div>
      )}
      {(bobjectType === BobjectTypes.Company || bobject?.rawBobject[companyIdField]) && (
        <SimilarDealsButton bobject={bobject} relatedCompany={relatedCompany} />
      )}
    </div>
  );
};

const SimilarDealsButton = ({
  bobject,
  relatedCompany,
}: {
  bobject: Bobject;
  relatedCompany: ExtensionBobject;
}) => {
  const bobjectType = bobject.id.typeName;
  const {
    useGetSettings,
    openExtendedScreen,
    useGetExtendedContext,
    closeExtendedScreen,
  } = useExtensionContext();
  const extendedContext = useGetExtendedContext();
  const isExtendedOpened = extendedContext?.open;
  const settings = useGetSettings();
  const { t } = useTranslation('translation', {
    keyPrefix: 'sidePeek.contactViewActions.contactButtons',
  });
  const accountId = settings?.account?.id;
  const { similarDeals } = useSimilarDeals(
    accountId,
    bobjectType === BobjectTypes.Company ? bobject?.id.objectId : undefined,
  );
  const showIcon = similarDeals?.length > 0;
  return (
    <div style={{ position: 'relative', display: 'flex' }}>
      {showIcon && (
        <Tooltip title={t('similarWonDeals')} position="top">
          <IconButton
            color="softPeanut"
            size={20}
            name="deals"
            onClick={() => {
              if (
                isExtendedOpened &&
                extendedContext?.type === ExtendedContextTypes.SIMILAR_DEALS
              ) {
                closeExtendedScreen();
              } else {
                openExtendedScreen({
                  type: ExtendedContextTypes.SIMILAR_DEALS,
                  bobject: bobjectType === BobjectTypes.Company ? bobject : relatedCompany,
                });
              }
            }}
          />
        </Tooltip>
      )}
      {similarDeals?.length > 0 && <SimilarDealsTooltip />}
    </div>
  );
};
