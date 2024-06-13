import { BobjectTypes } from '@bloobirds-it/types';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  REPORTED_VALUES_LOGIC_ROLE,
} from '../../../../constants/activity';
import { useEntity, usePicklistValues } from '../../../../hooks';
import SessionManagerFactory from '../../../../misc/session';
import { useSalesItems } from '../useSales';
import { subQueriesValueDependant } from './salesMeetings.utils';

const SessionManager = SessionManagerFactory();

const defaultSort: { field: string; direction: 'ASC' | 'DESC' }[] = [
  {
    field: ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
    direction: 'ASC',
  },
];

const pageAtom = atom({
  key: 'salesMeetingsPage',
  default: 1,
});

const hasNextPageAtom = atom({
  key: 'salesMeetingsHasNextPage',
  default: true,
});

const queryAtom = atom({
  key: 'salesMeetingsQuery',
  default: undefined,
});

const subQueryAtom = atom({
  key: 'salesMeetingsSubQuery',
  default: undefined,
});

const subQuerySelector = selector({
  key: 'salesMeetingsSubQuerySelector',
  get: ({ get }) => {
    const subQuery = get(subQueryAtom);
    const userId = SessionManager?.getUser()?.id;
    if (!subQuery) {
      return [
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO]: userId,
        },
        {
          [ACTIVITY_FIELDS_LOGIC_ROLE.USER]: userId,
        },
      ];
    } else {
      return subQuery;
    }
  },
});

export const useSalesMeetingsQuery = () => {
  const [query, setQuery] = useRecoilState(queryAtom);
  const setSubQuery = useSetRecoilState(subQueryAtom);
  const resetSubQuery = useResetRecoilState(subQueryAtom);
  const bobjectFieldsEntity = useEntity('bobjectFields');
  const reportedFieldId = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED)
    ?.id;
  const assignedToId = bobjectFieldsEntity?.findByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO,
  )?.id;
  const meetingTypeId = bobjectFieldsEntity?.findByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  )?.id;
  const typeFieldId = bobjectFieldsEntity?.findByLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)?.id;

  const defaultQuery = {
    [typeFieldId]: ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
    [meetingTypeId]: '__MATCH_FULL_ROWS__',
    [reportedFieldId]: ['__MATCH_EMPTY_ROWS__', REPORTED_VALUES_LOGIC_ROLE.NO],
  };

  const notReportedId = usePicklistValues({
    picklistLogicRole: ACTIVITY_FIELDS_LOGIC_ROLE.REPORTED,
  }).find(option => option.logicRole === REPORTED_VALUES_LOGIC_ROLE.NO)?.id;

  return {
    query,
    setQuery: (value: { [x: string]: string[] }) => {
      if (value[assignedToId]) {
        const subQueryValue = [value[assignedToId]];
        subQueriesValueDependant(subQueryValue, setSubQuery);
      } else {
        if (value[reportedFieldId]?.includes(notReportedId))
          value[reportedFieldId]?.push('__MATCH_EMPTY_ROWS__');
        if (!value[assignedToId]) resetSubQuery();
      }
      if (value[assignedToId]) delete value[assignedToId];
      setQuery({ ...defaultQuery, ...value });
    },
    resetQuery: () => {
      setQuery(defaultQuery);
    },
  };
};

export const useSalesMeetingsPage = () => {
  const [hasNextPage, setHasNextPage] = useRecoilState(hasNextPageAtom);
  const [page, setPage] = useRecoilState(pageAtom);

  const loadNextPage = () => {
    setPage(page + 1);
  };

  return {
    hasNextPage,
    loadNextPage,
    setHasNextPage,
  };
};

export const useSalesMeetingsActivities = () => {
  const query = useRecoilValue(queryAtom);
  const ORs = useRecoilValue(subQuerySelector);
  return useSalesItems(query, ORs, defaultSort, pageAtom, BobjectTypes.Activity);
};
