import React, { useEffect, Fragment, useState, useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  Icon,
  IconButton,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Select,
  Text,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useTimeZones } from '@bloobirds-it/hooks';
import {
  COMPANY_FIELDS_LOGIC_ROLE,
  LEAD_FIELDS_LOGIC_ROLE,
  LinkedInLead,
  MIXPANEL_EVENTS,
  SlotsData,
} from '@bloobirds-it/types';
import { getUserTimeZone, getValueFromLogicRole } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

import { useCalendarContext } from '../calendar';
import { TranslationDropdown } from '../components/translationDropdown';
import styles from './slotsForm.module.css';

const ConfirmationModal = ({ open, handleClose, handleCancel }) => {
  const { t } = useTranslation();
  return (
    <Modal width={600} open={open} onClose={handleCancel}>
      <ModalHeader variant="primary">
        <ModalTitle size="small" color="veryLightBloobirds">
          <Icon name="cross" className={styles._icon} color="peanut" />
          <Text size="m" inline>
            {t('calendar.events.close')}
          </Text>
        </ModalTitle>
        <ModalCloseIcon color="black" size="small" onClick={handleCancel} />
      </ModalHeader>
      <ModalContent className={styles.modalContent}>
        <Text size="m" align="center">
          <Trans i18nKey="calendar.events.closeConfirmation" />
        </Text>
      </ModalContent>
      <ModalFooter>
        <Button variant="tertiary" onClick={handleCancel} color="bloobirds">
          {t('common.cancel')}
        </Button>
        <Button variant="primary" color="tomato" onClick={handleClose}>
          {t('common.close')}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

function ParsedSlots({
  liveEvents,
  language,
  selectedTimezone,
}: {
  selectedTimezone: string;
  liveEvents: ReturnType<typeof useCalendarContext>['liveEvents'];
  language: 'en' | 'es';
}) {
  const allTimeZones = useTimeZones();
  const { t } = useTranslation();

  const orderedEvents =
    liveEvents &&
    Object.entries(liveEvents || {}).reduce((acc, [day, dayEvents]) => {
      const sortedDays = (dayEvents as any[]).sort((a, b) => {
        const aDate = spacetime(a.startTime);
        const bDate = spacetime(b.startTime);
        return aDate.isBefore(bDate) ? -1 : 1;
      });
      return { ...acc, [day]: sortedDays };
    }, {} as ReturnType<typeof useCalendarContext>['liveEvents']);
  const isSpanish = language === 'es';
  const formatString = isSpanish
    ? '{day-short}, {date-pad} {month-short}'
    : '{day-short} {date-pad}, {month-short}';
  let idSlots = 0;

  return (
    <div className={styles.parsedSlots} id="slots-block">
      {!liveEvents || Object.values(liveEvents).flatMap(e => e).length === 0 ? (
        <Text size="s" color="softPeanut">
          {t('calendar.description')}
        </Text>
      ) : (
        <>
          {Object.entries(orderedEvents).map(([, dayEvents]) => {
            const dayString =
              dayEvents[0]?.startTime && spacetime(dayEvents[0].startTime).format('iso-utc');
            return (
              dayEvents &&
              (dayEvents as any[]).length > 0 && (
                <Fragment key={dayEvents[0]?.startTime && dayString}>
                  <Text size="xs" color="peanut" weight="bold">
                    {dayEvents[0]?.startTime &&
                      spacetime(dayEvents[0].startTime).format(formatString)}
                  </Text>
                  {(dayEvents as any[])
                    .flatMap(e => e)
                    .map(event => {
                      const startDate = spacetime(event.startTime).goto(
                        selectedTimezone || getUserTimeZone(),
                      );

                      const linkProps = {
                        id: `slots-link-${event.id}`,
                        ['data-slot-' + idSlots]: true,
                      };
                      idSlots++;

                      return (
                        <a key={event.id} {...linkProps}>
                          <Text color="bloobirds" size="xs">
                            {startDate.format(isSpanish ? 'time-24' : 'time') +
                              ' - ' +
                              startDate
                                .goto(selectedTimezone || getUserTimeZone())
                                .add(event?.minuteSpan, 'minute')
                                .format(isSpanish ? 'time-24' : 'time') +
                              ' (' +
                              allTimeZones?.find(
                                ({ abbreviation, location }) =>
                                  abbreviation === selectedTimezone ||
                                  location === selectedTimezone,
                              )?.abbreviation +
                              ')'}
                          </Text>
                        </a>
                      );
                    })}
                </Fragment>
              )
            );
          })}
        </>
      )}
    </div>
  );
}

export const SlotsForm = () => {
  const { t } = useTranslation();
  const [isDeleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const {
    previousLiveEvents,
    discardLiveEvents,
    discardChanges,
    setSlotDuration,
    slotDuration,
    liveEvents,
    contextItems: { Company, Lead },
    handleSlots,
    setLiveEvents,
    setPreviousLiveEvents,
    slotsModified,
    slotsData: { selectedTimezone, meetingTitle },
    setSlotsData,
  } = useCalendarContext();

  const { settings } = useActiveUserSettings();
  const [title, setTitle] = React.useState(meetingTitle);
  const [displayForm, setDisplayForm] = React.useState(false);
  const isCreating = useMemo(() => !previousLiveEvents?.current, [previousLiveEvents?.current]);

  const handleDiscardChanges = () => {
    setSlotsData((prevSlotsData: SlotsData) => ({
      ...prevSlotsData,
      calendarSlotsVisible: false,
    }));
    discardChanges();
  };

  useEffect(() => {
    // If there is no title, set it to the default name
    if (!title) {
      if (Company && !title) {
        if ('fields' in Company) {
          setTitle(
            `${getValueFromLogicRole(Company, COMPANY_FIELDS_LOGIC_ROLE.NAME)} <> ${
              settings?.account?.name
            }`,
          );
        } else {
          setTitle(`${Company?.name || ''} <> ${settings?.account?.name}`);
        }
      } else if (Lead && !title) {
        if ('fields' in Lead) {
          setTitle(
            `${getValueFromLogicRole(Lead, LEAD_FIELDS_LOGIC_ROLE.FULL_NAME)} <> ${
              settings?.account?.name
            }`,
          );
        } else {
          setTitle(`${(Lead as LinkedInLead)?.fullName || ''} <> ${settings?.account?.name}`);
        }
      }
    }
  }, [Company, Lead]);

  useEffect(() => {
    setSlotsData((prevSlotsData: SlotsData) => ({
      ...prevSlotsData,
      meetingTitle: title,
    }));
  }, [title]);

  const [language, setLanguage] = useState<'en' | 'es'>('en');

  return (
    <div className={styles.slotsForm}>
      <div className={clsx(styles.slotsFormBody, { [styles.slotsFormBodyHidden]: !displayForm })}>
        <header className={styles.slotsFormHeader}>
          <div style={{ display: 'flex' }}>
            <IconButton
              name={displayForm ? 'chevronDown' : 'chevronUp'}
              size={14}
              color="bloobirds"
              className={styles.arrowButton}
              onClick={() => {
                setDisplayForm(!displayForm);
              }}
            />
            <Text size="s" className={styles.formTitle}>
              {t('calendar.selectedSlots')}
            </Text>
          </div>
          <div className={styles.timeSelector}>
            <Text size="xs">{t('calendar.meetingDuration')}</Text>
            <Select size="small" value={slotDuration} onChange={setSlotDuration} width="48px">
              <Item value={15}>15</Item>
              <Item value={30}>30</Item>
              <Item value={45}>45</Item>
              <Item value={60}>60</Item>
            </Select>
            <Text size="xs">{t('calendar.minutes')}</Text>
          </div>
        </header>
        <section
          className={clsx(styles.timeSlotForm, { [styles.timeSlotFormHidden]: !displayForm })}
        >
          <div className={styles.sectionHeader}>
            <Icon name="calendar" size={24} color="bloobirds" />
            <Input
              placeholder={t('calendar.meetingTitlePlaceholder')}
              value={title}
              onChange={setTitle}
              width="100%"
              size="small"
            />
          </div>
          <ParsedSlots
            liveEvents={liveEvents}
            language={language}
            selectedTimezone={selectedTimezone}
          />
        </section>
      </div>
      <footer className={styles.slotsFormFooter}>
        {isCreating ? (
          <div>
            <Button
              variant="secondary"
              size="small"
              color="tomato"
              uppercase={false}
              onClick={handleDiscardChanges}
              iconLeft="trashEmpty"
            >
              {t('common.discard')}
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Button
              variant="secondary"
              size="small"
              color="tomato"
              uppercase={false}
              onClick={() => {
                setDeleteModalVisible(true);
                mixpanel.track(MIXPANEL_EVENTS.DELETE_CALENDAR_SLOTS);
              }}
              iconLeft="trashEmpty"
            >
              {t('common.delete')}
            </Button>
            {slotsModified && (
              <Button
                variant="clear"
                size="small"
                color="bloobirds"
                uppercase={false}
                onClick={handleDiscardChanges}
              >
                {t('calendar.discardChanges')}
              </Button>
            )}
          </div>
        )}
        <div className={styles.footerRight} style={{ display: 'flex', gap: '8px' }}>
          <TranslationDropdown language={language} setLanguage={setLanguage} />
          <Button
            variant="primary"
            size="small"
            uppercase={false}
            disabled={!liveEvents}
            onClick={() => {
              handleSlots(
                <ParsedSlots
                  liveEvents={liveEvents}
                  language={language}
                  selectedTimezone={selectedTimezone}
                />,
                value => {
                  setLiveEvents(value);
                  setPreviousLiveEvents(value);
                },
              );
              mixpanel.track(MIXPANEL_EVENTS.ADD_CALENDAR_SLOTS);
            }}
          >
            {t('common.save')}
          </Button>
        </div>
      </footer>
      <ConfirmationModal
        open={isDeleteModalVisible}
        handleClose={() => {
          discardLiveEvents();
          handleSlots(undefined, undefined);
          setDeleteModalVisible(false);
          setSlotsData((prevSlotsData: SlotsData) => ({
            ...prevSlotsData,
            calendarSlotsVisible: false,
          }));
        }}
        handleCancel={() => setDeleteModalVisible(false)}
      />
    </div>
  );
};
