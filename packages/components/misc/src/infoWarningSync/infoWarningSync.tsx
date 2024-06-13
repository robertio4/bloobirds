import { useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useClickAway } from 'react-use';

import { Action, Dropdown, Icon, Button } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { BobjectId, MIXPANEL_EVENTS, UserRole } from '@bloobirds-it/types';
import { baseUrls } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import styles from './infoWarning.module.css';

export const InfoWarningSync = ({
  type,
  id,
  size = 'small',
}: {
  type: 'email' | 'meeting' | 'call' | 'message' | 'activity' | 'note' | 'opportunity';
  id: BobjectId;
  size?: 'small' | 'medium';
}) => {
  const [visible, setVisible] = useState(false);
  const { settings } = useActiveUserSettings();
  const isAdminUser =
    settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) ||
    settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);
  const { t } = useTranslation();

  const ref = useRef(null);
  useClickAway(ref, () => setVisible(false));

  return (
    <Dropdown
      visible={visible}
      width={200}
      position="top"
      style={{
        padding: '0px',
      }}
      ref={ref}
      anchor={
        <div
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            setVisible(true);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_SYNC_ISSUE);
          }}
          className={clsx(styles.anchor, { [styles.anchorMedium]: size === 'medium' })}
        >
          <Action icon="alertTriangle" color="softBanana" />
        </div>
      }
      color="verySoftBanana"
    >
      <>
        <div className={styles.title}>
          <Icon name="alertTriangle" color="peanut" size={24} />
          {t('extendedScreen.header.syncIssues')}
        </div>
        {isAdminUser ? (
          <div className={styles.body}>
            <Trans i18nKey="extendedScreen.header.syncIssuesMessageAdmin" values={{ type }} />
            <Button
              variant="secondary"
              iconRight="externalLink"
              uppercase={false}
              expand
              size="small"
              className={styles.viewLogsButton}
              onClick={() =>
                window.open(
                  `${
                    baseUrls[process.env.NODE_ENV]
                  }/app/account-settings/integration/salesforce/sync?&bobjectType=${
                    id?.typeName
                  }&bobjectId=${id?.objectId}&dateRange=all_time`,
                  '_blank',
                )
              }
            >
              {t('extendedScreen.header.viewLogs')}
            </Button>
          </div>
        ) : (
          <div className={styles.body}>
            <Trans i18nKey="extendedScreen.header.syncIssuesMessage" values={{ type }} />
          </div>
        )}
      </>
    </Dropdown>
  );
};
