import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { ColorType, Icon, IconType, Skeleton, Text } from '@bloobirds-it/flamingo-ui';
import { BobjectId, BobjectTypes, MainBobjectTypes } from '@bloobirds-it/types';
import clsx from 'clsx';

import { useExtensionContext } from '../../../../context';
import styles from '../lastActivityOverview.module.css';
import { useLastActivity } from '../utils/useLastActivity';

const applyHoverStyles = (event, color) => {
  const element = event.currentTarget;
  if (element) {
    element.style.boxShadow = `0px 0px 4px 0px var(--${color})`;
  }
};

const removeHoverStyles: MouseEventHandler<HTMLDivElement> = event => {
  const element = event.currentTarget;
  if (element) {
    element.style.boxShadow = ''; // Revert to default
  }
};

const ActivityInfoCard = ({
  title,
  subtitle,
  color,
  iconName,
  onClick,
}: {
  title: string;
  subtitle: string;
  color: ColorType;
  iconName?: IconType;
  onClick?: () => void;
}) => {
  if (typeof title !== 'string' || typeof subtitle !== 'string') return null;
  return (
    <div
      className={styles._activity_info_card}
      style={{
        borderColor: `var(--${color}`,
        paddingLeft: !!iconName && 4,
        cursor: onClick ? 'pointer' : 'default',
      }}
      id="activityInfocard"
      onMouseOver={event => {
        if (onClick) applyHoverStyles(event, color);
      }}
      onMouseOut={event => {
        if (onClick) removeHoverStyles(event);
      }}
      {...(onClick ? { onClick } : {})}
    >
      {iconName && <Icon name={iconName} color={color} />}
      <div className={styles._activity_info_card_text}>
        <Text color={color} size="m" weight="medium">
          {title}
        </Text>
        <Text size="xs" color="softPeanut">
          {subtitle}
        </Text>
      </div>
    </div>
  );
};

function NoActivity() {
  const { t } = useTranslation('translation', { keyPrefix: 'sidePeek.overview.lastActivity' });
  return (
    <div
      style={{
        padding: '8px',
        textAlignLast: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <Text weight="bold" size="s">
        {t('noActivity')}
      </Text>
      <Text color="softPeanut" size="s">
        {t('noActivitySubtitle')}
      </Text>
    </div>
  );
}

function LastActivitySkeleton() {
  return (
    <div style={{ height: '50px', width: '100%', paddingTop: '8px' }}>
      <Skeleton variant="rect" height="100%" width="100%" />
    </div>
  );
}

export type ActivityInfoCardProps = Parameters<typeof ActivityInfoCard>[0];

export const LastContactsView = ({
  bobjectId,
  leadsIds,
  companyId,
}: {
  bobjectId: BobjectId<MainBobjectTypes>;
  leadsIds?: BobjectId<BobjectTypes.Lead>['value'][];
  companyId?: BobjectId<BobjectTypes.Company>['value'];
}) => {
  const { timeInfo, activityInfo, onClick, hasNoActivity } =
    useLastActivity(bobjectId, leadsIds, companyId) || {};
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();

  if (!activityInfo) {
    return <LastActivitySkeleton />;
  }

  return hasNoActivity ? (
    <NoActivity />
  ) : (
    <div
      className={clsx(styles._last_contacts_wrapper, {
        [styles._last_contacts_wrapper_bubble]: !sidePeekEnabled,
      })}
    >
      <ActivityInfoCard {...timeInfo} />
      <ActivityInfoCard {...activityInfo} onClick={onClick} />
    </div>
  );
};
