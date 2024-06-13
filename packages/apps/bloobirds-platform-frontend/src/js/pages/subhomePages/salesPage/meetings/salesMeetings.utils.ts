import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  MEETING_MAIN_TYPE_VALUES,
} from '../../../../constants/activity';
import SessionManagerFactory from '../../../../misc/session';

const SessionManager = SessionManagerFactory();

const subQuerySelector = {
  [MEETING_MAIN_TYPE_VALUES.FIRST_MEETING]: {
    [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: SessionManager?.getUser()?.id,
    [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: [
      MEETING_MAIN_TYPE_VALUES.FIRST_MEETING,
      '__MATCH_EMPTY_ROWS__',
    ],
  },
  [MEETING_MAIN_TYPE_VALUES.FOLLOW_UP]: {
    [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: SessionManager?.getUser()?.id,
    [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE]: [MEETING_MAIN_TYPE_VALUES.FOLLOW_UP],
  },
};

export function subQueriesValueDependant(value, setSubQueries) {
  const [assignedValue] = value;

  let subQuery = [];

  if (assignedValue) {
    subQuery = [
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: assignedValue,
      },
      {
        [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: assignedValue,
      },
    ];
  }

  setSubQueries(subQuery);
}
