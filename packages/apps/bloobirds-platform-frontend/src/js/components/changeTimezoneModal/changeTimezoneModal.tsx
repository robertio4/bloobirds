import * as React from 'react';
import { useState } from 'react';

import { Button, IconButton, Item, Modal, Section, Select, Text } from '@bloobirds-it/flamingo-ui';
import { groupBy } from 'lodash';
import { compose } from 'redux';

import { useTimeZones } from '../../hooks/useTimeZones';
import useUserTimeZone from '../../hooks/useUserTimeZone';
import styles from './changeTimezoneModal.modules.css';

interface ChangeTimezoneModalProps {
  defaultTimezone?: string;
  onChange: (timezone: string) => void;
  onClose: () => void;
  returnAbbreviation?: boolean;
}

const removeContinent = (value: string) => value?.replace(/\s([A-z]*)\//, ' ');
const replaceUnderscores = (value: string) => value?.replace('_', ':');
const cleanTimezoneName = compose(removeContinent, replaceUnderscores);

const ChangeTimezoneModal = ({
  defaultTimezone,
  onChange,
  onClose,
  returnAbbreviation = false,
}: ChangeTimezoneModalProps) => {
  const userTimeZone = useUserTimeZone();
  const [selectedTimeZone, setSelectedTimeZone] = useState(defaultTimezone || userTimeZone);
  const allTimeZones = useTimeZones();

  const handleChange = () => {
    onChange(selectedTimeZone);
  };

  const continentTimeZones = groupBy(allTimeZones, ({ location }) => location.split('/')[0].trim());

  return (
    <Modal className={styles.modal} open onClose={onClose}>
      <header className={styles.header}>
        <Text size="xl">Change timezone</Text>
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
          {userTimeZone && <Section id="my-timezone">My Timezone</Section>}
          {userTimeZone && (
            <Item section="my-timezone" label={userTimeZone} value={userTimeZone}>
              {cleanTimezoneName(
                allTimeZones.find(({ location }) => location === userTimeZone)?.name,
              )}
            </Item>
          )}
          <Section id="america-timezone">America</Section>
          {continentTimeZones['America']?.map(({ location, name }) => (
            <Item section="america-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="europe-timezone">Europe</Section>
          {continentTimeZones['Europe']?.map(({ location, name }) => (
            <Item section="europe-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="africa-timezone">Africa</Section>
          {continentTimeZones['Africa']?.map(({ location, name }) => (
            <Item section="africa-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="asia-timezone">Asia</Section>
          {continentTimeZones['Asia']?.map(({ location, name }) => (
            <Item section="asia-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="australia-timezone">Australia</Section>
          {continentTimeZones['Australia']?.map(({ location, name }) => (
            <Item section="australia-timezone" key={location} label={location} value={location}>
              {cleanTimezoneName(name)}
            </Item>
          ))}
          <Section id="antarctica-timezone">Antarctica</Section>
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
          Change
        </Button>
      </main>
    </Modal>
  );
};

export default ChangeTimezoneModal;
