import { CircularBadge, Icon, IconType, Tooltip } from '@bloobirds-it/flamingo-ui';
import { useSyncBobjectStatus } from '@bloobirds-it/hooks';
import { ContactViewTab, ExtensionCompany, LinkedInLead } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import { useExtensionContext } from '../context';
import styles from './contactView.module.css';
import { useContactViewContext } from './context/contactViewContext';

const ContactViewTabElement = ({
  tab,
  icon,
  number,
  onClick,
  bobjects,
}: {
  tab: ContactViewTab;
  icon: IconType;
  onClick?: () => void;
  number?: number;
  bobjects?: ExtensionCompany[] | LinkedInLead[];
}) => {
  const { activeTab, setActiveTab } = useContactViewContext();
  const { useGetSettings } = useExtensionContext();
  const settings = useGetSettings();
  const accountId = settings?.account?.id;
  const { syncStatus } = useSyncBobjectStatus(accountId, bobjects);

  const bobjectName = bobjects?.[0]?.name;
  const bobjectType = bobjects?.[0]?.id?.typeName;

  return (
    <div
      className={clsx(styles.tab__container, {
        [styles.tab__container__selected]: activeTab === tab,
      })}
      onClick={() => {
        mixpanel.track(`CLICK_ON_HEADER_TAB_FROM_BUBBLE_IN_ICON_${tab}`);
        if (onClick) {
          onClick();
        }
        setActiveTab(tab);
      }}
    >
      <Icon name={icon} size={20} color={activeTab === tab ? 'bloobirds' : 'softPeanut'} />
      {number && number !== 0 ? (
        <CircularBadge
          backgroundColor={activeTab === tab ? 'var(--bloobirds)' : 'var(--softPeanut)'}
          color="white"
          size="xs"
          style={{ fontSize: '10px', lineHeight: '10px', fontWeight: 500 }}
        >
          {number as any}
        </CircularBadge>
      ) : null}
      {bobjects?.length > 0 &&
        syncStatus !== undefined &&
        (syncStatus ? (
          <span className={styles.tab__container__sync} />
        ) : (
          <Tooltip
            title={
              bobjects?.length === 1
                ? `${bobjectType} "${bobjectName}" not synced`
                : tab === ContactViewTab.LEAD
                ? 'Leads not synced'
                : 'Opportunities not synced'
            }
            position="top"
          >
            <span className={styles.tab__container__noSync} />
          </Tooltip>
        ))}
    </div>
  );
};

export default ContactViewTabElement;
