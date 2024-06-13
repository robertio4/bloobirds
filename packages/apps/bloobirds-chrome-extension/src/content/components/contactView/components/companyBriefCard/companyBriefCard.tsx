import { useTranslation } from 'react-i18next';

import { CircularBadge, Icon, Text, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import { ExtensionCompany, COMPANY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import clsx from 'clsx';

import { ContactViewTab } from '../../../../../types/contactView';
import { formatDateAsText } from '../../../../../utils/dates';
import { useExtensionContext } from '../../../context';
import { StageAndStatusLabel } from '../../../stageAndStatusLabel/stageAndStatusLabel';
import { useContactViewContext } from '../../context/contactViewContext';
import { InfoDetailElement } from '../briefCardComponents/infoDetailElement';
import styles from './companyBriefCard.module.css';

export const CompanyBriefCard = ({ company }: { company: ExtensionCompany }) => {
  const { name, lastAttempt, lastTouch, attemptsCount, touchesCount } = company;
  const { t } = useTranslation();

  const { setActiveTab } = useContactViewContext();
  const { setActiveBobject, useGetSidePeekEnabled, useGetDataModel } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const dataModel = useGetDataModel();

  const assigneeId = company?.assignedTo;
  const users = useUserSearch();
  const assigneeUser = users?.users?.find(user => user?.id === assigneeId);
  const assignedColor = assigneeUser?.color;
  const assignedName = assigneeUser?.name || assigneeUser?.email;
  const assignedShortName = assigneeUser?.shortname;

  const handleViewDetails = () => {
    setActiveBobject(company);
    setActiveTab(ContactViewTab.COMPANY);
  };

  const numberOfLeadsField = dataModel?.findFieldByLogicRole(
    COMPANY_FIELDS_LOGIC_ROLE.NUMBER_OF_LEADS,
  );
  const numberOfLeads = company.rawBobject?.[numberOfLeadsField.id];

  const containerClasses = clsx(styles.container, {
    [styles.containerSidePeek]: sidePeekEnabled,
  });

  const textClasses = clsx(styles.text, {
    [styles.textSidePeek]: sidePeekEnabled,
  });

  return (
    <div className={containerClasses} onClick={handleViewDetails}>
      <div className={styles.details}>
        <div className={styles.left_info}>
          <CircularBadge
            backgroundColor="lightPeanut"
            className={styles.circular_badge}
            size="small"
          >
            <Icon name="company" size={16} color="softPeanut" />
          </CircularBadge>
          <Text size="xs" weight="bold" color="bloobirds" className={textClasses}>
            {name}
          </Text>
        </div>
        <div className={styles.status}>
          {sidePeekEnabled && assignedName && (
            <Tooltip
              title={`${
                assignedName ? `${t('common.assignedTo')} ${assignedName}` : t('common.assign')
              }`}
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
          <StageAndStatusLabel bobject={company} className={styles.statusBadge} />
        </div>
      </div>
      {sidePeekEnabled && (
        /* Pending show number of leads and opps */
        <>
          <div className={styles.countBobjects}>
            <div className={styles.badgesContainer}>
              <CircularBadge
                key={1}
                size="s"
                color="verySoftBloobirds"
                backgroundColor="var(--verySoftPeanut)"
              >
                JP
              </CircularBadge>
              <CircularBadge
                key={2}
                size="s"
                color="verySoftBloobirds"
                backgroundColor="var(--verySoftPeanut)"
              >
                JP
              </CircularBadge>
            </div>
            <Text size="s" color="bloobirds" weight="bold">
              {t('sidePeek.overview.leads', { count: numberOfLeads })}
            </Text>
          </div>
          <div className={styles.detailsInfo}>
            <div className={styles.countsColumn}>
              <InfoDetailElement
                icon="check"
                iconColor="softPeanut"
                text={t('sidePeek.overview.activity.attempts', { count: +attemptsCount || 0 })}
              />
              <InfoDetailElement
                icon="checkDouble"
                text={t('sidePeek.overview.activity.touches', { count: +touchesCount || 0 })}
              />
            </div>
            <div className={styles.datesColumn}>
              <InfoDetailElement
                icon="calendar"
                iconColor="softPeanut"
                text={`${formatDateAsText({ text: lastTouch, t })}`}
              />
              <InfoDetailElement
                icon="calendar"
                iconColor="softPeanut"
                text={`${formatDateAsText({ text: lastAttempt, t })}`}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
