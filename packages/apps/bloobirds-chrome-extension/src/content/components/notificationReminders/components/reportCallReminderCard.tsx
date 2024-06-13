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
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import {
  ACTIVITY_DIRECTION,
  ACTIVITY_FIELDS_LOGIC_ROLE,
  PluralBobjectTypes,
} from '@bloobirds-it/types';
import {
  api,
  getFieldByLogicRole,
  getHoursMinutesSeconds,
  getTextFromLogicRole,
} from '@bloobirds-it/utils';
import { useWizardContext, WIZARD_MODALS } from '@bloobirds-it/wizard-modal-context';
import { isToday } from 'date-fns';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import { NameComponent } from '../../card/fieldTypeComponent';
import CardIcon from '../../cardIcon/cardIcon';
import { IconLabel } from '../../extensionLeftBar/components/views/inboxView/card/callCard';
import { useNotificationReminders } from '../notificationReminders';
import styles from '../notificationReminders.module.css';

export function ReportCallReminderCard({ activity }) {
  const { t } = useTranslation();
  const { dismissReminder } = useNotificationReminders();
  const { openWizard, resetWizardProperties } = useWizardContext();

  const direction = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DIRECTION);
  const leadId = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.LEAD)?.value;
  const companyId = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY)?.value;
  const opportunityId = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY)
    ?.value;

  const lead = leadId && activity?.referencedBobjects[leadId];
  const company = companyId && activity?.referencedBobjects[companyId];

  const callDateTime =
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.DATETIME) ||
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CREATION_DATETIME);
  const activityFromToday = isToday(new Date(callDateTime));
  const format = activityFromToday ? '{time-24}' : t('dates.monthShortWithTime');

  const phone = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_LEAD_PHONE_NUMBER);
  const parsedPhone = phone && parsePhoneNumberFromString(phone)?.formatInternational();

  const parsedDateTime = useGetI18nSpacetime(callDateTime).format(format);
  const callDuration = getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.CALL_DURATION);
  const { hours, minutes, seconds } = getHoursMinutesSeconds(parseInt(callDuration));
  const parsedCallDuration =
    callDuration &&
    (hours > 0 ? hours + ' h ' : '') + (minutes > 0 ? minutes + ' min ' : '') + seconds + ' s';

  async function openCorrectContactFlow() {
    const mainBobjectId = opportunityId || leadId || companyId;
    if (mainBobjectId) {
      const response = await api.get(
        `/linkedin/${PluralBobjectTypes[mainBobjectId.split('/')[1]]?.toLowerCase()}/${
          mainBobjectId.split('/')[2]
        }`,
      );
      const referenceBobject = response.data;
      const handleClose = () => {
        dismissReminder();
        resetWizardProperties(WIZARD_MODALS.CONTACT_FLOW_OTO);
      };

      openWizard(WIZARD_MODALS.CONTACT_FLOW_OTO, activity, {
        handleClose: handleClose,
        referenceBobject,
      });
    }
  }

  return (
    <div className={styles.reportCallReminder}>
      <Card key={activity?.id} expand size="small" onClick={() => {}}>
        <CardHeader>
          <CardLeft>
            <CardIcon
              name="phone"
              color="melon"
              direction={direction as ACTIVITY_DIRECTION}
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
                {t('leftBar.card.call.' + direction + 'Call')}
              </Text>
              {(lead || company) && (
                <>
                  <Text size="xs">
                    {direction === ACTIVITY_DIRECTION.OUTGOING
                      ? t('leftBar.card.call.with')
                      : t('leftBar.card.call.with')}
                  </Text>
                  <NameComponent
                    value={lead ?? company}
                    bobject={activity}
                    shrinkName={false}
                    showIcon={false}
                  />
                </>
              )}
            </div>
          </CardBody>
        </CardHeader>
        <div className={styles.content}>
          <div className={styles.div_not_collapsed}>
            {(parsedPhone || callDateTime || parsedCallDuration) && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <IconLabel iconName="agendaPerson" label={parsedPhone} />
                <IconLabel
                  iconName="clock"
                  label={parsedDateTime + (callDuration ? ', ' + parsedCallDuration : '')}
                />
              </div>
            )}
          </div>
        </div>
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
            onClick={openCorrectContactFlow}
            size="small"
            variant="primary"
            iconLeft="thumbsUp"
            expand
            uppercase={false}
            className={styles.reminderButton}
          >
            {t('common.reportResult')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
