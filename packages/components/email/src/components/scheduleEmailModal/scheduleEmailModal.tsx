import * as React from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  DateTimeShortcut,
  Icon,
  IconButton,
  Item,
  Modal,
  Section,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useTimeZones, useUserTimeZone } from '@bloobirds-it/hooks';
import { getTextFromLogicRole } from '@bloobirds-it/utils';
import groupBy from 'lodash/groupBy';
import { compose } from 'redux';
import spacetime from 'spacetime';

import { useEmailMatching } from '../../hooks';
import CustomDateDialog from './customDateDialog/customDateDialog';
import styles from './scheduleEmailModal.module.css';
import { getLocationFromTimeZone } from './scheduleEmailModal.utils';

interface ScheduleEmailModalProps {
  emails: Array<string>;
  onClose: () => void;
  onSubmit: ({ date, timezone }: { date: Date; timezone: string }) => Promise<void>;
}

const removeContinent = (value: string) => value?.replace(/\s([A-z]*)\//, ' ');
const replaceUnderscores = (value: string) => value?.replace('_', ':');
const cleanTimezoneName = compose(removeContinent, replaceUnderscores);

const ScheduleEmailModal = ({ emails, onSubmit, onClose }: ScheduleEmailModalProps) => {
  const userTimeZone = useUserTimeZone();
  const timezonesList = useTimeZones();
  const allTimeZones = timezonesList || [];
  const { company, lead, isLoading } = useEmailMatching(emails);
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.scheduleEmailModal',
  });

  const [selectedTimeZone, setSelectedTimeZone] = useState(userTimeZone);
  const [customDateVisible, setCustomDateVisible] = useState(false);

  const leadTimeZone = getLocationFromTimeZone(getTextFromLogicRole(lead, 'LEAD__TIME_ZONE'));
  const companyTimeZone = getLocationFromTimeZone(
    getTextFromLogicRole(company, 'COMPANY__TIME_ZONE'),
  );

  useEffect(() => {
    if (leadTimeZone) {
      setSelectedTimeZone(leadTimeZone);
    } else if (companyTimeZone) {
      setSelectedTimeZone(companyTimeZone);
    } else {
      setSelectedTimeZone(userTimeZone);
    }
  }, [leadTimeZone, companyTimeZone, userTimeZone]);

  const tomorrowMorning = spacetime()
    .goto(selectedTimeZone)
    .startOf('day')
    .add(1, 'day')
    .add(8, 'hour')
    .goto('utc')
    .toNativeDate();

  const tomorrowAfternoon = spacetime()
    .goto(selectedTimeZone)
    .startOf('day')
    .add(1, 'day')
    .add(16, 'hour')
    .goto('utc')
    .toNativeDate();

  const handleSubmit = async (date: Date) => {
    setCustomDateVisible(false);
    await onSubmit({ date, timezone: selectedTimeZone });
  };

  if (isLoading) {
    return null;
  }

  if (customDateVisible) {
    return (
      <CustomDateDialog
        onCancel={() => setCustomDateVisible(false)}
        onSubmit={async date => {
          const offsetDate = spacetime()
            .goto(selectedTimeZone)
            .year(date.getFullYear())
            .month(date.getMonth())
            .date(date.getDate())
            .hour(date.getHours())
            .minute(date.getMinutes())
            .toNativeDate();
          await handleSubmit(offsetDate);
        }}
      />
    );
  }

  const continentTimeZones = groupBy(allTimeZones, ({ location }) => location.split('/')[0].trim());

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <header className={styles.header}>
        <Text size="xl">{t('title')}</Text>
        <IconButton size={40} name="cross" color="bloobirds" onClick={onClose} />
      </header>
      <main className={styles.content}>
        <Select
          width="100%"
          borderless={false}
          value={selectedTimeZone}
          onChange={setSelectedTimeZone}
          size="small"
          autocomplete
        >
          {leadTimeZone && <Section id="lead-timezone">{t('leadTimezone')}</Section>}
          {leadTimeZone && (
            <Item section="lead-timezone" label={leadTimeZone} value={leadTimeZone}>
              {cleanTimezoneName(
                allTimeZones.find(({ location }) => location === leadTimeZone)?.name,
              )}
            </Item>
          )}
          {companyTimeZone && <Section id="company-timezone">{t('companyTimezone')}</Section>}
          {companyTimeZone && (
            <Item section="company-timezone" label={companyTimeZone} value={companyTimeZone}>
              {cleanTimezoneName(
                allTimeZones.find(({ location }) => location === companyTimeZone)?.name,
              )}
            </Item>
          )}
          {userTimeZone && <Section id="my-timezone">{t('myTimezone')}</Section>}
          {userTimeZone && (
            <Item section="my-timezone" label={userTimeZone} value={userTimeZone}>
              {cleanTimezoneName(
                allTimeZones.find(({ location }) => location === userTimeZone)?.name,
              )}
            </Item>
          )}
          <Section id="america-timezone">{t('america')}</Section>
          {continentTimeZones['America']?.map(({ location, name }) => (
            <Item section="america-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="europe-timezone">{t('europe')}</Section>
          {continentTimeZones['Europe']?.map(({ location, name }) => (
            <Item section="europe-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="africa-timezone">{t('africa')}</Section>
          {continentTimeZones['Africa']?.map(({ location, name }) => (
            <Item section="africa-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="asia-timezone">{t('asia')}</Section>
          {continentTimeZones['Asia']?.map(({ location, name }) => (
            <Item section="asia-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="australia-timezone">{t('australia')}</Section>
          {continentTimeZones['Australia']?.map(({ location, name }) => (
            <Item section="australia-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="antarctica-timezone">{t('antarctica')}</Section>
          {continentTimeZones['Antarctica']?.map(({ location, name }) => (
            <Item section="antarctica-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
        </Select>
        <section className={styles.timezones}>
          <Icon name="timezones" size={24} color="softBloobirds" />
          <Text size="xs" weight="medium" color="peanut">
            {t('dateTimeFromSelectedTimezone')}
          </Text>
        </section>
        <div className={styles.shortcuts}>
          <DateTimeShortcut
            timezone={selectedTimeZone}
            text={t('tomorrowMorning')}
            date={tomorrowMorning}
            onClick={handleSubmit}
          />
          <DateTimeShortcut
            timezone={selectedTimeZone}
            text={t('tomorrowAfternoon')}
            date={tomorrowAfternoon}
            onClick={handleSubmit}
          />
        </div>
        <Button
          className={styles.customButton}
          expand={true}
          variant="tertiary"
          uppercase={true}
          iconLeft="calendar"
          onClick={() => setCustomDateVisible(true)}
        >
          {t('selectDateAndTime')}
        </Button>
      </main>
    </Modal>
  );
};

export default ScheduleEmailModal;
