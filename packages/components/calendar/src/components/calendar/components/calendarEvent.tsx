import React from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown, Icon, IconButton, Text, useVisible } from '@bloobirds-it/flamingo-ui';
import { getI18nSpacetimeLng } from '@bloobirds-it/internationalization';
import { Invitee, Event, LiveEvent, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { getUserTimeZone, toTitleCase } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

import { InviteeCard, useCalendarContext } from '../calendar';
import styles from '../calendar.module.css';
import { createArrayOfLength, getPxPaddingSinceMidnight } from '../utils/calendar.utils';

interface BlockInterface {
  startDatetimeSpaceTime?;
  event;
  calculatePosition;
  height?: number;
  width?;
  left;
  zIndex?: number;
  selectedTimezone?: string;
}

const getColors = event => {
  if (event?.type === 'bloobirds') {
    return {
      backgroundColor: 'verySoftTomato',
      barColor: 'tomato',
    };
  } else if (event?.type === 'placeholder') {
    return {
      backgroundColor: 'white',
      barColor: 'bloobirds',
    };
  } else if (event?.type === 'nylas') {
    return {
      backgroundColor: event?.backgroundColor || 'verySoftBloobirds',
      barColor: event?.barColor || 'bloobirds',
    };
  } else if (event?.type === 'dragging') {
    return {
      backgroundColor: 'white',
      barColor: event?.barColor || 'bloobirds',
    };
  }
};

function SlotsDisplay({ event }) {
  return (
    <div style={{ display: 'flex', height: '100%', width: '100%', gap: '4px' }}>
      <div style={{ backgroundColor: 'var(--verySoftGrape)', width: '22px' }} />
      <div style={{ display: 'flex', flexDirection: 'column', width: 'inherit' }}>
        {createArrayOfLength(Math.floor(event.duration / event.minuteSpan)).map(index => (
          <div
            key={index}
            style={{
              borderRadius: '4px',
              color: 'black',
              height: (event.minuteSpan * 40) / 60 + 'px',
              backgroundColor: 'var(--softGrape)',
              borderBottom: '2px solid white',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function DraggingBlock({
  startDatetimeSpaceTime,
  event,
  calculatePosition,
  height,
  width,
  left,
  zIndex,
}: BlockInterface) {
  const { t } = useTranslation();

  const isPastEvent = spacetime.now().isAfter(startDatetimeSpaceTime);
  const cellClassName = clsx(styles.calendar_cell, {
    [styles.calendar_cell_small]: height < 29,
    [styles.calendar_cell_45]: height >= 29 && height < 39,
    [styles.calendar_cell_placeholder]: event.type === 'placeholder',
  });
  return (
    <div
      className={cellClassName}
      style={{
        cursor: 'grabbing',
        top: calculatePosition + 'px',
        height,
        width,
        left,
        backgroundColor: `var(--${getColors(event)?.backgroundColor})`,
        border: isPastEvent ? '1px var(--tomato) dashed' : '1px rgba(66,218,156) dashed',
        borderRadius: '4px',
        zIndex,
        boxShadow:
          '0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%)',
        padding: '4px 4px 3px',
      }}
    >
      {isPastEvent ? (
        <>
          <div className={styles.calendar_cell_title}>{t('calendar.cannotCreatePastSlots')}</div>
          <div className={styles.calendar_cell_time}>{t('calendar.selectTimeBelow')}</div>
        </>
      ) : (
        <SlotsDisplay event={event} />
      )}
    </div>
  );
}

function SolidBlock({
  selectedTimezone,
  startDatetimeSpaceTime,
  event,
  calculatePosition,
  height,
  width,
  left,
  zIndex,
}: BlockInterface) {
  const cellClassName = clsx(styles.calendar_cell, {
    [styles.calendar_cell_small]: height < 29,
    [styles.calendar_cell_45]: height >= 29 && height < 39,
    [styles.calendar_cell_placeholder]: event.type === 'placeholder',
  });

  const {
    t,
    i18n: { language },
  } = useTranslation();

  const timeSlot = `${startDatetimeSpaceTime.format('time')} -
                ${startDatetimeSpaceTime.add(event.duration, 'minute').format('time')}`;
  const topPosition = calculatePosition - height / 2 + 'px';

  const endTime = getI18nSpacetimeLng(
    language,
    event.endTime,
    selectedTimezone || getUserTimeZone(),
  );

  const participantsWithOrganizer: Invitee[] = event?.participants?.map(participant => {
    const ownerEmail = event?.owner?.replaceAll(/[<>]/gi, '')?.trim();
    const isOwner = participant?.email === ownerEmail;
    return isOwner ? { ...participant, type: 'Organizer' } : participant;
  });
  const orderedParticipants = participantsWithOrganizer?.reduce((acc, invitee) => {
    if (invitee?.type === 'Organizer') {
      return [invitee, ...acc];
    }
    return [...acc, invitee];
  }, []);
  const { ref, visible, setVisible } = useVisible();
  return (
    <Dropdown
      ref={ref}
      width={448}
      position="left"
      fallbackPositions={['left']}
      arrow={false}
      customStyles={{
        top: topPosition,
        right: '10px',
      }}
      visible={visible}
      anchor={
        <div
          className={cellClassName}
          style={{
            top: calculatePosition + 'px',
            height: height - 1,
            width,
            left,
            backgroundColor: `var(--${getColors(event)?.backgroundColor})`,
            borderLeft: `2px solid var(--${getColors(event)?.barColor})`,
            zIndex: visible ? 10 : zIndex,
            boxShadow: visible
              ? '0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%), 0px 3px 5px -1px rgb(0 0 0 / 20%)'
              : null,
          }}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            return event.type !== 'placeholder' && setVisible(true);
          }}
        >
          <div className={styles.calendar_cell_title}>{event.title}</div>
          <div className={styles.calendar_cell_time}>{timeSlot}</div>
        </div>
      }
    >
      <div
        className={styles.event_details_container}
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className={styles.event_details_header}>
          <div className={styles.event_details_title_name}>
            <Icon name="calendar" color="tomato" size={32} className={styles.event_details_icon} />
            <Text className={styles.event_details_title_text}>
              {event?.title || t('calendar.events.noTitle')}
            </Text>
          </div>
          <IconButton name="cross" size={16} onClick={() => setVisible(false)} />
        </div>
        <div className={styles.event_details_title}>
          <Text size="m">
            {toTitleCase(startDatetimeSpaceTime.dayName())}, {startDatetimeSpaceTime.date()}{' '}
            {toTitleCase(startDatetimeSpaceTime.monthName())} ·{' '}
            {startDatetimeSpaceTime.format('time')} - {endTime.format('time')}
          </Text>
        </div>
        <div className={styles.event_details_body}>
          <span className={styles.attendees_details}>
            <Icon name="people" color="softPeanut" />
            <Text size="s" className={styles.attendees_title}>
              {t('calendar.events.attendee', { count: orderedParticipants?.length || 0 })}
            </Text>
          </span>
          <div className={styles.attendees_list_container}>
            {orderedParticipants?.map(participant => (
              <InviteeCard
                invitee={participant}
                key={participant?.email}
                readOnly
                shouldShowStatus
              />
            ))}
          </div>
        </div>
      </div>
    </Dropdown>
  );
}

interface LiveEventBlockInterface extends Pick<BlockInterface, 'selectedTimezone' | 'zIndex'> {
  selectedTimezone;
  event: LiveEvent[];
  zIndex;
}

function LiveEventBlock({
  selectedTimezone,
  event: dailyLiveEvents,
  zIndex,
}: LiveEventBlockInterface) {
  const {
    deleteLiveEvent,
    slotsData: { calendarSlotsVisible },
  } = useCalendarContext();
  const { language } = useTranslation().i18n;
  return (
    <>
      {dailyLiveEvents.map((liveEvent, idx) => {
        const startDatetimeSpaceTime = getI18nSpacetimeLng(
          language,
          liveEvent.startTime,
          selectedTimezone || getUserTimeZone(),
        );
        const width =
          liveEvent.collisions > 0
            ? `calc(${95.0 / (liveEvent.collisions + 1) + '%'} + ${liveEvent.collisions * 8}px)`
            : '98%';

        const eventHeight = Math.floor(
          (liveEvent.minuteSpan * 40) /
            //  - 60 / liveEvent.minuteSpan)
            60,
        );

        if (liveEvent.type !== 'dragging') return null;
        const timeSlot = `${startDatetimeSpaceTime.format('time')} -
                ${startDatetimeSpaceTime.add(liveEvent.minuteSpan, 'minute').format('time')}`;
        return (
          <div
            //@ts-ignore TODO fix typing startTime is a spaceTime object
            key={`slot-${liveEvent.startTime.format('time')}-${liveEvent.endTime?.format(
              'time',
            )}-${idx}`}
            style={{
              position: 'absolute',
              top: liveEvent.paddingTop + 'px',
              display: 'flex',
              flexDirection: 'column',
              width: '320px',
            }}
          >
            {liveEvent.minuteSpan && (
              <div
                key={`slot-${timeSlot}-${idx}`}
                style={{
                  height: eventHeight,
                  borderBottom: '1px solid var(--white)',
                  padding: '0 4px',
                  width,
                  backgroundColor: 'var(--verySoftGrape)',
                  borderLeft: '2px solid var(--grape)',
                  zIndex,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                }}
                className={clsx({ [styles.small_slot]: liveEvent.minuteSpan === 15 })}
              >
                <Text size={liveEvent.minuteSpan === 15 ? 'xxxs' : 'xxs'} color="peanut">
                  {timeSlot}
                </Text>
                {calendarSlotsVisible && (
                  <IconButton
                    name="cross"
                    size={liveEvent.minuteSpan === 15 ? 10 : 12}
                    color="peanut"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteLiveEvent(liveEvent.day, liveEvent.id);
                      mixpanel.track(MIXPANEL_EVENTS.REMOVE_CALENDAR_SLOT);
                    }}
                  />
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export const CalendarEvent = React.memo(
  ({
    event,
    selectedTimezone,
    type,
  }: {
    event: Event | LiveEvent | LiveEvent[];
    selectedTimezone: string;
    type: 'settledEvent' | 'liveEvent' | 'placeholderEvent';
  }) => {
    const {
      i18n: { language },
    } = useTranslation();
    const initialEvent = Array.isArray(event) ? event[0] : event;
    if (!initialEvent) return null;
    const startDatetimeSpaceTime = spacetime(initialEvent.startTime)?.goto(
      selectedTimezone || getUserTimeZone(),
    );
    const calculatePosition = getPxPaddingSinceMidnight(
      selectedTimezone
        ? getI18nSpacetimeLng(
            language,
            startDatetimeSpaceTime,
            selectedTimezone || getUserTimeZone(),
          )
        : startDatetimeSpaceTime,
    );
    const height = initialEvent.duration * (40 / 60);
    const width =
      initialEvent.collisions > 0
        ? `calc(${95.0 / (initialEvent.collisions + 1) + '%'} + ${initialEvent.collisions * 8}px)`
        : '95%';

    const left = `calc(${
      (initialEvent.collisionNumber / (initialEvent.collisions + 1)) * 100 + '%'
    } - ${initialEvent.collisionNumber > 0 ? initialEvent.collisionNumber * 8 : 0}px)`;
    const zIndex = type === 'placeholderEvent' ? 10 : 5;

    switch (type) {
      case 'liveEvent':
        return (
          <LiveEventBlock
            selectedTimezone={selectedTimezone}
            event={event as LiveEvent[]}
            zIndex={zIndex}
          />
        );
      case 'placeholderEvent':
        return (
          <DraggingBlock
            startDatetimeSpaceTime={getI18nSpacetimeLng(
              language,
              startDatetimeSpaceTime,
              selectedTimezone || getUserTimeZone(),
            )}
            event={event as Event}
            calculatePosition={calculatePosition}
            height={height}
            width={width}
            left={left}
            zIndex={zIndex}
          />
        );
      default:
      case 'settledEvent':
        return (
          <SolidBlock
            startDatetimeSpaceTime={startDatetimeSpaceTime}
            event={event as Event}
            calculatePosition={calculatePosition}
            height={height}
            width={width}
            left={left}
            zIndex={zIndex}
            selectedTimezone={selectedTimezone}
          />
        );
    }
  },
);
