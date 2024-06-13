var _s = $RefreshSig$();
import __vite__cjsImport0_react from "/vendor/.vite-deps-react.js__v--2922b7f0.js"; const React = __vite__cjsImport0_react.__esModule ? __vite__cjsImport0_react.default : __vite__cjsImport0_react; const useContext = __vite__cjsImport0_react["useContext"]; const useEffect = __vite__cjsImport0_react["useEffect"]; const useMemo = __vite__cjsImport0_react["useMemo"];
import { useUserSearch } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-hooks-dist-index.js.js";
import { ACTIVITY_FIELDS_LOGIC_ROLE, ACTIVITY_TYPES } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-types-dist-index.js.js";
import { api, getUserTimeZone, injectReferencesSearchProcess, keepPreviousResponse } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import { atom, useRecoilState, useResetRecoilState } from "/vendor/.vite-deps-recoil.js__v--5937b302.js";
import __vite__cjsImport5_recoilPersist from "/vendor/.vite-deps-recoil-persist.js__v--a151999f.js"; const recoilPersist = __vite__cjsImport5_recoilPersist["recoilPersist"];
import spacetime from "/vendor/.vite-deps-spacetime.js__v--14e7d295.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
import MeetingModalContext from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-meetingModal-context.tsx.js";
import { parseEvents } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-meeting-src-utils-calendar.utils.ts.js";
const {
  persistAtom
} = recoilPersist();
const primaryCalendarColor = "verySoftBloobirds";
const primaryBarColor = "softBloobirds";
const colorsPalette = ["softTomato", "softBanana", "softGrape", "softGray", "softTangerine", "lightestCall"];
const secondaryColorsPalette = ["tomato", "banana", "grape", "gray", "tangerine", "extraCall"];
export var RemindeBeforeType = /* @__PURE__ */ ((RemindeBeforeType2) => {
  RemindeBeforeType2["minutes"] = "minutes";
  RemindeBeforeType2["hours"] = "hours";
  RemindeBeforeType2["days"] = "days";
  return RemindeBeforeType2;
})(RemindeBeforeType || {});
const calendarSelectedAtom = atom({
  key: "calendarSelectedAtom-meeting-old",
  default: null,
  effects: [persistAtom]
});
const accountSelectedAtom = atom({
  key: "accountSelectedAtom-meeting-old",
  default: null,
  effects: [persistAtom]
});
const eventsTypeSelectedAtom = atom({
  key: "eventsTypeSelectedAtom-meeting-old",
  default: "nylas",
  effects: [persistAtom]
});
const inviteesAtom = atom({
  key: "inviteesAtom-meeting-old",
  default: []
});
const dateSelectedAtom = atom({
  key: "daySelectedAtom-meeting-old",
  default: new Date()
});
const selectedTimezoneAtom = atom({
  key: "selectedTimezoneAtom-meeting-old",
  default: typeof getUserTimeZone === "function" ? getUserTimeZone() : void 0
});
const usersSelectedAtom = atom({
  key: "usersSelectedAtom-meeting-old",
  default: [],
  effects: [persistAtom]
});
const accountExecutivesSelectedAtom = atom({
  key: "accountExecutivesSelectedAtom-meeting-old",
  default: [],
  effects: [persistAtom]
});
const skipEventCalendarCreationAtom = atom({
  key: "skipEventCalendarCreationAtom-meeting-old",
  default: false,
  effects: [persistAtom]
});
const loadingAtom = atom({
  key: "loadingMeetingModalAtom-meeting-old",
  default: false
});
const bannedEventAtom = atom({
  key: "bannedEventAtom-meeting-old",
  default: ""
});
const showReminderAtom = atom({
  key: "showReminderAtom-meeting-old",
  default: false,
  effects: [persistAtom]
});
const reminderTemplateAtom = atom({
  key: "reminderTemplateAtom-meeting-old",
  default: null,
  effects: [persistAtom]
});
const reminderBeforeAtom = atom({
  key: "reminderBeforeAtom-meeting-old",
  default: {
    type: "minutes" /* minutes */,
    value: 30
  },
  effects: [persistAtom]
});
const conferencingInGoogleMeetAtom = atom({
  key: "conferencingGoogleMeet-meeting-old",
  default: true,
  effects: [persistAtom]
});
const meetingDurationAtom = atom({
  key: "meetingDurationAtomIncalendar-meeting-old",
  default: 60,
  effects: [persistAtom]
});
const placeholderAtom = atom({
  key: "placeholderAtomIncalendar-meeting-old",
  default: ""
});
export const useCalendar = () => {
  _s();
  const {
    userId,
    connections,
    accountId
  } = useContext(MeetingModalContext);
  const [calendarSelected, setSelectedCalendar] = useRecoilState(calendarSelectedAtom);
  const [accountSelected, setAccountSelected] = useRecoilState(accountSelectedAtom);
  const [eventsTypeSelected, setEventTypesSelected] = useRecoilState(eventsTypeSelectedAtom);
  const [invitees, setInvitees] = useRecoilState(inviteesAtom);
  const [selectedTimezone, setSelectedTimezone] = useRecoilState(selectedTimezoneAtom);
  const [date, setDate] = useRecoilState(dateSelectedAtom);
  const [usersSelected, setUsersSelected] = useRecoilState(usersSelectedAtom);
  const [skipCalendarCreation, setSkipCalendarCreation] = useRecoilState(skipEventCalendarCreationAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [bannedEvent, setBannedEvent] = useRecoilState(bannedEventAtom);
  const resetBannedAtom = useResetRecoilState(bannedEventAtom);
  const resetInvitees = useResetRecoilState(inviteesAtom);
  const resetDate = useResetRecoilState(dateSelectedAtom);
  const [reminderTemplate, setReminderTemplate] = useRecoilState(reminderTemplateAtom);
  const [reminderBefore, setReminderBefore] = useRecoilState(reminderBeforeAtom);
  const [showReminder, setShowReminder] = useRecoilState(showReminderAtom);
  const [meetingDuration, setMeetingDuration] = useRecoilState(meetingDurationAtom);
  const [conferencingGoogleMeet, setConferencingGoogleMeet] = useRecoilState(conferencingInGoogleMeetAtom);
  const [placeholder, setPlaceholder] = useRecoilState(placeholderAtom);
  useEffect(() => () => {
    resetBannedAtom();
  }, []);
  useEffect(() => {
    if (userId && usersSelected?.length === 0) {
      setUsersSelected([userId]);
    }
  }, []);
  const [accountExecutivesSelected, setAccountExecutivesSelected] = useRecoilState(accountExecutivesSelectedAtom);
  const users = useUserSearch();
  const calendarIdsSelected = calendarSelected?.join(",");
  const {
    data: {
      data: events
    } = {},
    isValidating: isNylasValidating,
    error: eventsError
  } = useSWR(`/messaging/calendar/events?start=${spacetime(date).startOf("week").format("iso-utc")}&end=${spacetime(date).endOf("week").format("iso-utc")}&calendar=${calendarIdsSelected}${accountSelected ? "&account=" + accountSelected : ""}`, (url) => api.get(url), {
    use: [keepPreviousResponse],
    revalidateOnFocus: false
  });
  const {
    data: calendarsAvailable,
    mutate: mutateCalendars,
    error: calendarsError
  } = useSWR(`/messaging/calendar${accountSelected ? "?account=" + accountSelected : ""}`, (url) => api.get(url), {
    revalidateOnFocus: false
  });
  useEffect(() => {
    if (eventsError || calendarsError) {
      setAccountSelected(null);
      setSelectedCalendar(null);
    }
  }, [eventsError, calendarsError]);
  useEffect(() => {
    calendarSelected?.forEach((calendarId) => {
      if (calendarsAvailable?.data?.length > 0 && !calendarsAvailable?.data?.find((c) => c?.id === calendarId)) {
        setSelectedCalendar((curr) => curr?.filter((c) => c !== calendarId));
      }
    });
  }, [calendarsAvailable]);
  const meetingsRequest = React.useMemo(() => {
    const queries = [];
    if (usersSelected) {
      queries.push({
        [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: usersSelected
      });
      queries.push({
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: usersSelected
      });
    }
    if (accountExecutivesSelected && accountExecutivesSelected?.length > 0) {
      queries.push({
        [ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE]: accountExecutivesSelected
      });
    }
    return {
      query: {
        [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: {
          query: {
            gte: spacetime(date).startOf("week").format("iso-utc"),
            lte: spacetime(date).endOf("week").format("iso-utc")
          },
          searchMode: "RANGE__SEARCH"
        },
        [ACTIVITY_FIELDS_LOGIC_ROLE.TYPE]: ACTIVITY_TYPES.MEETING
      },
      queries,
      formFields: true,
      page: 0,
      pageSize: 5e3,
      injectReferences: true
    };
  }, [date, usersSelected, accountExecutivesSelected, eventsTypeSelected]);
  const {
    data,
    isValidating: isBloobirdsValidating
  } = useSWR(accountId ? `/bobjects/${accountId}/Activity/search` : null, (key) => api.post(key, meetingsRequest));
  const eventsWithReferences = data ? injectReferencesSearchProcess(data?.data)?.contents : null;
  const calendarsWithColor = calendarsAvailable?.data?.map((calendar, index) => {
    if (calendar?.primary) {
      return {
        calendarId: calendar?.id,
        color: primaryCalendarColor,
        barColor: primaryBarColor
      };
    } else {
      return {
        calendarId: calendar?.id,
        color: colorsPalette[index % colorsPalette?.length],
        barColor: secondaryColorsPalette[index % colorsPalette?.length]
      };
    }
  });
  const eventsPerDay = useMemo(() => {
    return parseEvents(
      eventsTypeSelected === "nylas" ? events : eventsWithReferences,
      eventsTypeSelected,
      users,
      selectedTimezone,
      calendarsWithColor,
      bannedEvent
    );
  }, [events?.length, eventsWithReferences?.length, bannedEvent, eventsTypeSelected]);
  useEffect(() => {
    if (!accountSelected && connections && connections?.list?.length > 0) {
      setAccountSelected(connections?.list?.find((connection) => connection?.default)?.id || connections?.list[0]?.id);
    }
  }, [connections]);
  useEffect(() => {
    if (!calendarSelected && calendarsAvailable && calendarsAvailable?.data?.length > 0) {
      setSelectedCalendar([calendarsAvailable?.data?.find((c) => c.primary)?.id]);
    }
  }, [calendarsAvailable]);
  useEffect(() => {
    eventsTypeSelected === "nylas" ? setLoading(isNylasValidating) : setLoading(isBloobirdsValidating);
  }, [eventsTypeSelected, isNylasValidating, isBloobirdsValidating]);
  return {
    accountId,
    userId,
    connections,
    calendarSelected,
    setSelectedCalendar,
    accountSelected,
    setAccountSelected: (value) => {
      setSelectedCalendar(void 0);
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
    setPlaceholder
  };
};
_s(useCalendar, "upkntiDUEA9rGuXN92kci+AU6mY=", false, function() {
  return [useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useResetRecoilState, useResetRecoilState, useResetRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useRecoilState, useUserSearch, useSWR, useSWR, useSWR];
});
