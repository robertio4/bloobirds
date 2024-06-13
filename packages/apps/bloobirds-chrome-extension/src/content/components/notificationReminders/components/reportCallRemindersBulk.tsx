import { useTranslation } from 'react-i18next';

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardLeft,
  IconButton,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { ACTIVITY_DIRECTION, MessagesEvents, SalesforceTabs } from '@bloobirds-it/types';

import CardIcon from '../../cardIcon/cardIcon';
import { useNotificationReminders } from '../notificationReminders';
import styles from '../notificationReminders.module.css';

export function ReportCallRemindersBulk() {
  const { t } = useTranslation();
  const { dismissReminder, reminder } = useNotificationReminders();

  const openInboxTab = () => {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.OpenLeftBarTab, {
        detail: { tab: SalesforceTabs.INBOX },
      }),
    );
    dismissReminder();
  };

  return (
    <div className={styles.reportCallReminder}>
      <Card expand size="small" onClick={() => null}>
        <CardHeader>
          <CardLeft>
            <CardIcon
              name="phone"
              color="melon"
              direction={ACTIVITY_DIRECTION.INCOMING}
              size="xxs"
            />
          </CardLeft>
          <div className={styles.closeCard}>
            <IconButton
              name="cross"
              color="softPeanut"
              onClick={() => {
                dismissReminder();
              }}
            />
          </div>
          <CardBody>
            <div className={styles._callCard_body__wrap}>
              <Text size="xs" weight="bold" className={styles._callCard_body__text}>
                {t('reminders.reportCallBulk', {
                  count: reminder?.notifications?.length || 0,
                })}
              </Text>
            </div>
          </CardBody>
        </CardHeader>
        <div className={styles.buttons}>
          <Button
            onClick={dismissReminder}
            size="small"
            variant="clear"
            color="peanut"
            iconLeft="cross"
            expand
            uppercase={false}
            className={styles.reminderButton}
          >
            {t('common.dismiss')}
          </Button>
          <Button
            onClick={openInboxTab}
            size="small"
            variant="primary"
            iconLeft="thumbsUp"
            expand
            uppercase={false}
            className={styles.reminderButton}
          >
            {t('reminders.reportCallBulkButton')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
