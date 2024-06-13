import { CircularBadge, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useSyncBobjectStatus } from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import { LEAD_FIELDS_LOGIC_ROLE, LinkedInLead, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { ContactViewTab } from '../../../../../types/contactView';
import { useExtensionContext } from '../../../context';
import { StageAndStatusLabel } from '../../../stageAndStatusLabel/stageAndStatusLabel';
import { useContactViewContext } from '../../context/contactViewContext';
import { LeadInfoDetails } from './components/leadInfoDetails';
import styles from './leadBriefCard.module.css';

export const LeadBriefCard = ({ lead }: { lead: LinkedInLead }) => {
  const { fullName, jobTitle } = lead;
  const { setActiveTab } = useContactViewContext();
  const { setActiveBobject, useGetSidePeekEnabled, useGetDataModel } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const dataModel = useGetDataModel();
  const { syncStatus } = useSyncBobjectStatus(lead?.id?.accountId, [lead]);
  const opportunityFieldId = dataModel?.findFieldByLogicRole(
    LEAD_FIELDS_LOGIC_ROLE.LEAD_OPPORTUNITIES,
  )?.id;
  const opportunitiesIds = lead?.rawBobject[opportunityFieldId]?.split('\u001E');
  const hasOpportunities = opportunitiesIds?.length > 0;

  const handleViewDetails = () => {
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_LEAD_FROM_CONTACT_VIEW_MENU_OTO);
    setActiveBobject(lead);
    setActiveTab(ContactViewTab.LEAD);
  };

  const detailsInfoClasses = clsx(styles.detailsInfo, {
    [styles.detailsInfoSidePeek]: sidePeekEnabled,
  });

  const containerClasses = clsx(styles.container, {
    [styles.containerSidePeek]: sidePeekEnabled,
  });

  const textClasses = clsx(styles.text, {
    [styles.textSidePeek]: sidePeekEnabled,
  });

  return (
    <div className={containerClasses} onClick={handleViewDetails}>
      <div className={styles.details}>
        <CircularBadge backgroundColor="softPeanut" color="peanut" size="s">
          {/*@ts-ignore*/}
          <Icon name="person" color="black" size={14} />
        </CircularBadge>
        <div className={styles.leadInfoText}>
          <Text size="xs" weight="bold" color="bloobirds" className={textClasses}>
            {fullName}
          </Text>
          <Text size="xxs" color="softPeanut" className={styles.text}>
            {jobTitle}
          </Text>
        </div>
        <div className={styles.status}>
          {hasOpportunities && (
            <CircularBadge backgroundColor="lightPeanut" size={sidePeekEnabled ? 's' : 'xs'}>
              {/*@ts-ignore*/}
              <Icon name="fileOpportunity" color="black" size={sidePeekEnabled ? 16 : 14} />
            </CircularBadge>
          )}
          {syncStatus !== undefined && !syncStatus && (
            <InfoWarningSync
              type={'lead'}
              id={lead?.id}
              size={sidePeekEnabled ? 'medium' : 'small'}
            />
          )}
          <StageAndStatusLabel bobject={lead} />
        </div>
      </div>
      <div className={detailsInfoClasses}>
        <LeadInfoDetails lead={lead} />
      </div>
    </div>
  );
};
