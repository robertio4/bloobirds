import React, { useContext, useEffect, useMemo } from 'react';

import { ColorType } from '@bloobirds-it/flamingo-ui';
import { useUserSearch } from '@bloobirds-it/hooks';
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES } from '@bloobirds-it/types';
import {
  api,
  getUserTimeZone,
  injectReferencesSearchProcess,
  keepPreviousResponse,
} from '@bloobirds-it/utils';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import spacetime from 'spacetime';
import useSWR, { SWRResponse } from 'swr';

import MeetingModalContext from '../meetingModal/context';
import { CalendarsWithColors } from '../meetingModal/meetingModal';
import { EventsType, Invitee } from '../types/calendar';
import { parseEvents } from '../utils/calendar.utils';

const { persistAtom } = recoilPersist();

const primaryCalendarColor: ColorType = 'verySoftBloobirds';

const primaryBarColor: ColorType = 'softBloobirds';

const colorsPalette: ColorType[] = [
  'softTomato',
  'softBanana',
  'softGrape',
  'softGray',
  'softTangerine',
  'lightestCall',
];

const secondaryColorsPalette: ColorType[] = [
  'tomato',
  'banana',
  'grape',
  'gray',
  'tangerine',
  'extraCall',
];

export interface CalendarData {
  id: string;
  name: string;
  description?: any;
  location?: any;
  timezone: string;
  readOnly: boolean;
  primary: boolean;
  accountId: string;
  jobStatusId?: any;
}

export enum RemindeBeforeType {
  minutes = 'minutes',
  hours = 'hours',
  days = 'days',
}

export interface ReminderBefore {
  type: RemindeBeforeType;
  value: number;
}

const calendarSelectedAtom = atom({
  key: 'calendarSelectedAtom-meeting-old',
  default: null,
  effects: [persistAtom],
});

const accountSelectedAtom = atom({
  key: 'accountSelectedAtom-meeting-old',
  default: null,
  effects: [persistAtom],
});

const eventsTypeSelectedAtom = atom({
  key: 'eventsTypeSelectedAtom-meeting-old',
  default: 'nylas' as EventsType,
  effects: [persistAtom],
});

const inviteesAtom = atom({
  key: 'inviteesAtom-meeting-old',
  default: [],
});

const dateSelectedAtom = atom({
  key: 'daySelectedAtom-meeting-old',
  default: new Date(),
});

const selectedTimezoneAtom = atom({
  key: 'selectedTimezoneAtom-meeting-old',
  default: typeof getUserTimeZone === 'function' ? getUserTimeZone() : undefined,
});

// These are the users selected when seeing bloobirds events
const usersSelectedAtom = atom({
  key: 'usersSelectedAtom-meeting-old',
  default: [],
  effects: [persistAtom],
});

// These are the account executives selected when seeing bloobirds events
const accountExecutivesSelectedAtom = atom({
  key: 'accountExecutivesSelectedAtom-meeting-old',
  default: [],
  effects: [persistAtom],
});

const skipEventCalendarCreationAtom = atom({
  key: 'skipEventCalendarCreationAtom-meeting-old',
  default: false,
  effects: [persistAtom],
});

const loadingAtom = atom({
  key: 'loadingMeetingModalAtom-meeting-old',
  default: false,
});

// In case this is an update, we will ban this event in the calendar so we only show the new placeholder
const bannedEventAtom = atom({
  key: 'bannedEventAtom-meeting-old',
  default: '',
});

const showReminderAtom = atom({
  key: 'showReminderAtom-meeting-old',
  default: false,
  effects: [persistAtom],
});

const reminderTemplateAtom = atom({
  key: 'reminderTemplateAtom-meeting-old',
  default: null,
  effects: [persistAtom],
});

const reminderBeforeAtom = atom({
  key: 'reminderBeforeAtom-meeting-old',
  default: {
    type: RemindeBeforeType.minutes,
    value: 30,
  } as ReminderBefore,
  effects: [persistAtom],
});

const conferencingInGoogleMeetAtom = atom({
  key: 'conferencingGoogleMeet-meeting-old',
  default: true,
  effects: [persistAtom],
});

const meetingDurationAtom = atom({
  key: 'meetingDurationAtomIncalendar-meeting-old',
  default: 60,
  effects: [persistAtom],
});

const placeholderAtom = atom({
  key: 'placeholderAtomIncalendar-meeting-old',
  default: '',
});

export const useCalendar = () => {
  const { userId, connections, accountId } = useContext(MeetingModalContext);

  const [calendarSelected, setSelectedCalendar] = useRecoilState(calendarSelectedAtom);
  const [accountSelected, setAccountSelected] = useRecoilState(accountSelectedAtom);
  const [eventsTypeSelected, setEventTypesSelected] = useRecoilState<EventsType>(
    eventsTypeSelectedAtom,
  );
  // @ts-ignore
  const [invitees, setInvitees] = useRecoilState<Invitee[]>(inviteesAtom);
  const [selectedTimezone, setSelectedTimezone] = useRecoilState(selectedTimezoneAtom);
  const [date, setDate] = useRecoilState<Date>(dateSelectedAtom);
  const [usersSelected, setUsersSelected] = useRecoilState(usersSelectedAtom);
  const [skipCalendarCreation, setSkipCalendarCreation] = useRecoilState(
    skipEventCalendarCreationAtom,
  );
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [bannedEvent, setBannedEvent] = useRecoilState<string>(bannedEventAtom);
  const resetBannedAtom = useResetRecoilState(bannedEventAtom);
  const resetInvitees = useResetRecoilState(inviteesAtom);
  const resetDate = useResetRecoilState(dateSelectedAtom);
  const [reminderTemplate, setReminderTemplate] = useRecoilState(reminderTemplateAtom);
  const [reminderBefore, setReminderBefore] = useRecoilState(reminderBeforeAtom);
  const [showReminder, setShowReminder] = useRecoilState(showReminderAtom);
  const [meetingDuration, setMeetingDuration] = useRecoilState(meetingDurationAtom);
  const [conferencingGoogleMeet, setConferencingGoogleMeet] = useRecoilState(
    conferencingInGoogleMeetAtom,
  );
  const [placeholder, setPlaceholder] = useRecoilState(placeholderAtom);

  useEffect(
    () => () => {
      resetBannedAtom();
    },
    [],
  );
  useEffect(() => {
    if (userId && usersSelected?.length === 0) {
      setUsersSelected([userId]);
    }
  }, []);
  const [accountExecutivesSelected, setAccountExecutivesSelected] = useRecoilState(
    accountExecutivesSelectedAtom,
  );
  const users = useUserSearch();

  const calendarIdsSelected = calendarSelected?.join(',');
  const {
    data: { data: events } = {},
    isValidating: isNylasValidating,
    error: eventsError,
  } = useSWR(
    `/messaging/calendar/events?start=${spacetime(date)
      .startOf('week')
      .format('iso-utc')}&end=${spacetime(date)
      .endOf('week')
      .format('iso-utc')}&calendar=${calendarIdsSelected}${
      accountSelected ? '&account=' + accountSelected : ''
    }`,
    url => api.get(url),
    { use: [keepPreviousResponse], revalidateOnFocus: false },
  );
  const { data: calendarsAvailable, mutate: mutateCalendars, error: calendarsError } = useSWR<
    SWRResponse<CalendarData[]>
  >(
    `/messaging/calendar${accountSelected ? '?account=' + accountSelected : ''}`,
    url => api.get(url),
    {
      revalidateOnFocus: false,
    },
  );

  useEffect(() => {
    if (eventsError || calendarsError) {
      setAccountSelected(null);
      setSelectedCalendar(null);
    }
  }, [eventsError, calendarsError]);

  useEffect(() => {
    calendarSelected?.forEach((calendarId: string) => {
      if (
        // @ts-ignore
        calendarsAvailable?.data?.length > 0 &&
        !calendarsAvailable?.data?.find(c => c?.id === calendarId)
      ) {
        setSelectedCalendar((curr: any) => curr?.filter((c: string) => c !== calendarId));
      }
    });
  }, [calendarsAvailable]);

  const meetingsRequest = React.useMemo(() => {
    const queries = [];
    if (usersSelected) {
      queries.push({
        [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: usersSelected,
      });
      queries.push({
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: usersSelected,
      });
    }
    if (accountExecutivesSelected && accountExecutivesSelected?.length > 0) {
      queries.push({
        [ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE]: accountExecutivesSelected,
      });
    }
    return {
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
          query: {
            gte: spacetime(date).startOf('week').format('iso-utc'),
            lte: spacetime(date).endOf('week').format('iso-utc'),
          },
          searchMode: 'RANGE__SEARCH',
        },
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES.MEETING,
      },
      queries,
      formFields: true,
      page: 0,
      pageSize: 5000,
      injectReferences: true,
    };
  }, [date, usersSelected, accountExecutivesSelected, eventsTypeSelected]);

  const { data, isValidating: isBloobirdsValidating } = useSWR(
    accountId ? `/bobjects/${accountId}/Activity/search` : null,
    key => api.post(key, meetingsRequest),
  );
  const eventsWithReferences = data ? injectReferencesSearchProcess(data?.data)?.contents : null;

  const calendarsWithColor: CalendarsWithColors[] | undefined = calendarsAvailable?.data?.map(
    (calendar, index) => {
      if (calendar?.primary) {
        return {
          calendarId: calendar?.id,
          color: primaryCalendarColor,
          barColor: primaryBarColor,
        };
      } else {
        return {
          calendarId: calendar?.id,
          color: colorsPalette[index % colorsPalette?.length],
          barColor: secondaryColorsPalette[index % colorsPalette?.length],
        };
      }
    },
  );

  const eventsPerDay = useMemo(() => {
    return parseEvents(
      eventsTypeSelected === 'nylas' ? events : eventsWithReferences,
      eventsTypeSelected,
      users,
      selectedTimezone,
      //@ts-ignore
      calendarsWithColor,
      bannedEvent,
    );
  }, [events?.length, eventsWithReferences?.length, bannedEvent, eventsTypeSelected]);

  useEffect(() => {
    if (!accountSelected && connections && connections?.list?.length > 0) {
      setAccountSelected(
        connections?.list?.find((connection: any) => connection?.default)?.id ||
          connections?.list[0]?.id,
      );
    }
  }, [connections]);

  useEffect(() => {
    // @ts-ignore
    if (!calendarSelected && calendarsAvailable && calendarsAvailable?.data?.length > 0) {
      setSelectedCalendar([calendarsAvailable?.data?.find(c => c.primary)?.id]);
    }
  }, [calendarsAvailable]);

  useEffect(() => {
    eventsTypeSelected === 'nylas'
      ? setLoading(isNylasValidating)
      : setLoading(isBloobirdsValidating);
  }, [eventsTypeSelected, isNylasValidating, isBloobirdsValidating]);

  return {
    accountId,
    userId,
    connections,
    calendarSelected,
    setSelectedCalendar,
    accountSelected,
    setAccountSelected: (value: string) => {
      setSelectedCalendar(undefined);
      setAccountSelected(value);
    },
    eventsTypeSelected,
    setEventTypesSelected,
    invitees,
    setInvitees,
    resetInvitees,
    date,
    setDate,
    resetDate,
    selectedTimezone,
    setSelectedTimezone,
    usersSelected,
    setUsersSelected,
    accountExecutivesSelected,
    setAccountExecutivesSelected,
    skipCalendarCreation,
    setSkipCalendarCreation,
    bannedEvent,
    setBannedEvent,
    reminderBefore,
    setReminderBefore,
    reminderTemplate,
    setReminderTemplate,
    showReminder,
    setShowReminder,
    conferencingGoogleMeet,
    setConferencingGoogleMeet,
    meetingDuration,
    setMeetingDuration,
    calendarsAvailable,
    mutateCalendars,
    events,
    eventsPerDay,
    calendarsWithColor,
    isNylasValidating,
    isBloobirdsValidating,
    loading,
    placeholder,
    setPlaceholder,
  };
};
