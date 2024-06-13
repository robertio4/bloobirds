import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfQuarter,
  endOfQuarter,
  startOfYear,
  endOfYear,
  addDays,
  addWeeks,
  addMonths,
  addYears,
  addQuarters,
  min,
  startOfYesterday,
  endOfYesterday,
  subDays,
  format,
} from 'date-fns';

const WEEK_STARTS_ON_MONDAY = { weekStartsOn: 1 };
const START_OF_TIME = new Date('2018-01-01');

export const getRangeByType = type => {
  const now = Date.now();
  const quarter = Math.floor(new Date().getMonth() / 3);
  let start;
  let end;
  switch (type) {
    case 'today':
    case 'TODAY':
      start = startOfDay(now);
      end = endOfDay(now);
      break;
    case 'this_week':
    case 'THIS_WEEK':
      start = startOfWeek(now, WEEK_STARTS_ON_MONDAY);
      end = endOfWeek(now, { weekStartsOn: 1 });
      break;
    case 'this_month':
    case 'THIS_MONTH':
      start = startOfMonth(now);
      end = endOfMonth(now);
      break;
    case 'this_quarter':
    case 'THIS_QUARTER':
      start = startOfQuarter(now);
      end = endOfQuarter(now);
      break;
    case 'this_year':
    case 'THIS_YEAR':
      start = startOfYear(now);
      end = endOfYear(now);
      break;
    case 'yesterday':
      start = startOfYesterday();
      end = endOfYesterday();
      break;
    case 'last_week':
      start = startOfWeek(addDays(new Date(), -7), WEEK_STARTS_ON_MONDAY);
      end = endOfWeek(addDays(new Date(), -7), WEEK_STARTS_ON_MONDAY);
      break;
    case 'last_month':
      start = startOfMonth(new Date().setMonth(new Date().getMonth() - 1));
      end = endOfMonth(new Date().setMonth(new Date().getMonth() - 1));
      break;
    case 'last_quarter':
      start = startOfQuarter(new Date(new Date().getFullYear(), quarter * 3 - 3, 1));
      end = endOfQuarter(new Date(new Date().getFullYear(), quarter * 3 - 3, 1));
      break;
    case 'last_year':
      start = startOfYear(new Date().setFullYear(new Date().getFullYear() - 1));
      end = endOfYear(new Date().setFullYear(new Date().getFullYear() - 1));
      break;
    case 'all_time':
      start = START_OF_TIME;
      end = endOfDay(now);
      break;
    case 'LAST_7_DAYS':
      start = subDays(new Date(), 7);
      end = new Date();
      break;
    case 'LAST_30_DAYS':
      start = subDays(new Date(), 30);
      end = new Date();
      break;
    case 'LAST_90_DAYS':
      start = subDays(new Date(), 90);
      end = new Date();
      break;
    default:
      throw new Error(`getRangeByType: unknown type: ${type}`);
  }
  //end = min([end, now]);
  return {
    start,
    end,
  };
};

export const getPreviousRangeByType = (type) => {
  const now = new Date();
  let start;
  let end;
  switch (type) {
    case 'today':
    case 'TODAY':
      start = startOfDay(addDays(now, -1));
      end = startOfDay(addDays(now, -1));
      break;
    case 'this_week':
    case 'THIS_WEEK':
      start = startOfWeek(addDays(now, -7), WEEK_STARTS_ON_MONDAY);
      end = endOfWeek(addDays(now, -7), WEEK_STARTS_ON_MONDAY);
      break;
    case 'this_month':
    case 'THIS_MONTH':
      start = startOfMonth(now.setMonth(new Date().getMonth() - 1));
      end = endOfMonth(now.setMonth(new Date().getMonth() - 1));
      break;
    case 'LAST_7_DAYS':
      start = subDays(now, 14);
      end = subDays(now, 7);
      break;
    case 'LAST_30_DAYS':
      start = subDays(now, 60);
      end = subDays(now, 30);
      break;
    case 'LAST_90_DAYS':
      start = subDays(now, 180);
      end = subDays(now, 90);
      break;
    default:
      throw new Error(`getRangeByType: unknown type: ${type}`);
  }
  //end = min([end, now]);
  return {
    start,
    end,
  };
};

const adjustRange = (range, type, interval) => {
  const { start, end } = range;

  if ((type === 'today' || type === 'yesterday') && interval === 'day') {
    return {
      start: addDays(start, -5),
      end,
    };
  }

  if ((type === 'this_week' || type === 'last_week') && interval === 'week') {
    return {
      start: addWeeks(start, -5),
      end,
    };
  }

  if ((type === 'this_month' || type === 'last_month') && interval === 'month') {
    return {
      start: addMonths(start, -5),
      end,
    };
  }

  if ((type === 'this_quarter' || type === 'last_quarter') && interval === 'quarter') {
    return {
      start: addQuarters(start, -5),
      end,
    };
  }

  if ((type === 'this_year' || type === 'last_year') && interval === 'year') {
    return {
      start: addYears(start, -5),
      end,
    };
  }

  return range;
};

export const getDashboardTimeRange = ({ interval, type, start, end, withPadding = true }) => {
  if (type === 'custom') {
    return { start, end };
  }

  const range = getRangeByType(type);

  if (!withPadding) {
    return range;
  }

  return adjustRange(range, type, interval);
};

const formatDateForAPI = date => format(date, 'yyyy-MM-dd');

export const dateRangeToApiFilter = (start, end) => {
  const result = {};

  if (!start && !end) {
    return result;
  }

  if (start) {
    result.from = formatDateForAPI(start);
  }

  if (end) {
    result.to = formatDateForAPI(end);
  }

  return {
    date: result,
  };
};
