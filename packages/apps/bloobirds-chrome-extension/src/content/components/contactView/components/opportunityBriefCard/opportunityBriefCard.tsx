import { useTranslation } from 'react-i18next';

import { CircularBadge, Icon, Text } from '@bloobirds-it/flamingo-ui';
import { useNoStatusOppSetting, useSyncBobjectStatus, useDataModel } from '@bloobirds-it/hooks';
import { InfoWarningSync } from '@bloobirds-it/misc';
import { ExtensionOpportunity, OPPORTUNITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { parseCurrency } from '@bloobirds-it/utils';

import { ContactViewTab } from '../../../../../types/contactView';
import { formatDateAsText } from '../../../../../utils/dates';
import { useExtensionContext } from '../../../context';
import { SalesforceStageLabel } from '../../../salesforceStageLabel/salesforceStageLabel';
import { StageAndStatusLabel } from '../../../stageAndStatusLabel/stageAndStatusLabel';
import { useContactViewContext } from '../../context/contactViewContext';
import { InfoDetailElement } from '../briefCardComponents/infoDetailElement';
import { MainNoteButton } from '../leadBriefCard/components/mainNoteButton';
import styles from './opportunityBriefCard.module.css';

export const OpportunityBriefCard = ({ opportunity }: { opportunity: ExtensionOpportunity }) => {
  const { name, status, amount, closeDate, mainNote } = opportunity;
  const isNoStatusOppSetting = useNoStatusOppSetting();
  const { setActiveTab } = useContactViewContext();
  const { setActiveBobject, useGetSidePeekEnabled } = useExtensionContext();
  const dataModel = useDataModel();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { syncStatus } = useSyncBobjectStatus(opportunity?.id?.accountId, [opportunity]);
  const { prefix, suffix } =
    dataModel?.findFieldByLogicRole(OPPORTUNITY_FIELDS_LOGIC_ROLE.AMOUNT) || {};

  const handleViewDetails = () => {
    setActiveBobject(opportunity);
    setActiveTab(ContactViewTab.OPPORTUNITY);
  };
  const { t } = useTranslation();

  return (
    <div className={styles.container} onClick={handleViewDetails}>
      <div className={styles.headerText}>
        <CircularBadge backgroundColor="softPeanut" color="peanut" size="s">
          {/* @ts-ignore */}
          <Icon name="fileOpportunity" color="black" size={14} />
        </CircularBadge>
        <div className={styles.opportunityName}>
          <Text size="s" weight="bold" className={styles.text} color="bloobirds">
            {name}
          </Text>
        </div>
        {syncStatus !== undefined && !syncStatus && (
          <InfoWarningSync
            type={'opportunity'}
            id={opportunity?.id}
            size={sidePeekEnabled ? 'medium' : 'small'}
          />
        )}
      </div>
      <div className={styles.mainInfo}>
        {amount && (
          <div className={styles.amountWrapper}>
            {prefix && (
              <Text size="s" color="softPeanut" className={styles.amountCurrency}>
                {prefix}
              </Text>
            )}
            <Text size="s" className={styles.amount}>
              {parseCurrency(amount)}
            </Text>
            {suffix && (
              <Text size="s" color="softPeanut" className={styles.amountCurrency}>
                {suffix}
              </Text>
            )}
          </div>
        )}
        <div className={styles.status}>
          {isNoStatusOppSetting ? (
            <SalesforceStageLabel bobject={opportunity} />
          ) : (
            status && <StageAndStatusLabel bobject={opportunity} />
          )}
        </div>
      </div>
      {(closeDate || mainNote) && (
        <div className={styles.infoFields}>
          {closeDate && (
            <InfoDetailElement
              icon="calendar"
              iconColor="softPeanut"
              text={` ${t('sidePeek.bobjectBriefCard.closes')} ${formatDateAsText({
                text: closeDate,
                t,
              })}`}
            />
          )}
          {mainNote && <MainNoteButton bobject={opportunity} />}
        </div>
      )}
    </div>
  );
};
