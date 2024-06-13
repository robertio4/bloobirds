import * as React from 'react';
import { useState } from 'react';
import groupBy from 'lodash/groupBy';
import { Button, IconButton, Item, Modal, Section, Select, Text } from '@bloobirds-it/flamingo-ui';
import { compose } from 'redux';
import styles from './changeTimezoneModal.module.css';
import { useTimeZones, useUserTimeZone, TimezoneType } from '@bloobirds-it/hooks';
import { useTranslation } from "react-i18next";

interface ChangeTimezoneModalProps {
  defaultTimezone?: string;
  onChange: (timezone: string) => void;
  onClose: () => void;
}

const removeContinent = (value: string) => value?.replace(/\s([A-z]*)\//, ' ');
const replaceUnderscores = (value: string) => value?.replace('_', ':');
const cleanTimezoneName = compose(removeContinent, replaceUnderscores);

export const ChangeTimezoneModal = ({
  defaultTimezone,
  onChange,
  onClose,
}: ChangeTimezoneModalProps) => {
  const userTimeZone = useUserTimeZone();
  const [selectedTimeZone, setSelectedTimeZone] = useState(defaultTimezone || userTimeZone);
  const allTimeZones = useTimeZones();
  const userDefaultTimezone = allTimeZones?.find(
    (timezone: TimezoneType) => timezone?.location === userTimeZone,
  )?.name;
  const {t} = useTranslation('translation', {keyPrefix: "changeTzModal"});

  const handleChange = () => {
    onChange(selectedTimeZone);
  };

  const continentTimeZones = groupBy(allTimeZones, ({ location }) =>
    location?.split('/')[0].trim(),
  );

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
          {userTimeZone && <Section id="my-timezone">{t('myTimezone')}</Section>}
          {userTimeZone && (
            <Item section="my-timezone" label={userTimeZone} value={userTimeZone}>
              {userDefaultTimezone ? cleanTimezoneName(userDefaultTimezone) : null}
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
          <Section id="antarctica-timezone">{t('america')}</Section>
          {continentTimeZones['Antarctica']?.map(({ location, name }) => (
            <Item section="antarctica-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
        </Select>
        <Button
          className={styles.customButton}
          expand={true}
          variant="tertiary"
          uppercase={true}
          iconLeft="calendar"
          onClick={handleChange}
        >
          {t('change')}
        </Button>
      </main>
    </Modal>
  );
};
