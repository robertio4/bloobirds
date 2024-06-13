import { useTranslation } from 'react-i18next';

import { CircularBadge, Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useFullSalesEnabled, useUserSearch } from '@bloobirds-it/hooks';
import { LinkedInLead } from '@bloobirds-it/types';

import { useAccountId } from '../../../../../hooks/useAccountId';
import { useTargetMarkets } from '../../../../../hooks/useTargetMarkets';
import { ExtensionCompany } from '../../../../../types/entities';
import { COMPANY_STAGE_LOGIC_ROLE } from '../../../../../utils/company';
import { useExtensionContext } from '../../../context';
import { StageAndStatusLabel } from '../../../stageAndStatusLabel/stageAndStatusLabel';
import { StageDivider } from '../stageDivider/stageDivider';
import styles from './companyBriefHeader.module.css';

export const CompanyBriefHeader = ({
  company,
  sidePeekEnabled,
  lead = null,
}: {
  company: ExtensionCompany;
  sidePeekEnabled?: boolean;
  lead?: LinkedInLead;
}) => {
  const targetMarkets = useTargetMarkets();
  const tm = targetMarkets?.find(bp => bp?.id === company?.targetMarket);
  const shortname: any = tm?.shortName;
  const accountId = useAccountId();
  const hasSalesEnabled = useFullSalesEnabled(accountId);
  const { useGetDataModel } = useExtensionContext();
  const dataModel = useGetDataModel();
  const isSalesStage =
    dataModel?.findValueById(company?.stage)?.logicRole === COMPANY_STAGE_LOGIC_ROLE.SALES;

  const assigneeId = company?.assignedTo;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === assigneeId);
  const assignedColor = assigneeUser?.color;
  const assignedName = assigneeUser?.name || assigneeUser?.email;
  const assignedShortName = assigneeUser?.shortname;
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.info_container}>
        <div className={styles.info}>
          {!sidePeekEnabled && (
            <CircularBadge
              backgroundColor={tm?.color || 'lightPeanut'}
              className={styles.circular_badge}
              size="small"
            >
              {shortname ||
                (company && <Icon name="company" size={20} color="softPeanut" />) ||
                (lead && <Icon name="person" size={20} color="softPeanut" />)}
            </CircularBadge>
          )}
          <div className={styles.content_container}>
            <Text size="m" color="peanut" weight="bold" className={styles.name}>
              {company?.name || lead?.fullName || t('sidePeek.bobjectBriefCard.untitledCompany')}
            </Text>
          </div>
        </div>
        <div className={styles.info}>
          {sidePeekEnabled && assignedName && (
            <Tooltip
              title={
                `${assignedName}`
                  ? `${t('common.assignedTo')}Assigned to ${assignedName}`
                  : t('common.assign')
              }
              position="bottom"
            >
              <CircularBadge
                style={{ fontSize: '9px' }}
                backgroundColor={assignedColor || 'lightPeanut'}
                size="small"
                className={styles.assign_badge}
              >
                {assignedShortName || 'U'}
              </CircularBadge>
            </Tooltip>
          )}
          <StageAndStatusLabel bobject={company} />
        </div>
      </div>
      {hasSalesEnabled && <StageDivider color={isSalesStage ? 'peanut' : 'softGrape'} />}
    </div>
  );
};
