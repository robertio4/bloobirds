import { format } from 'date-fns';

export const dateRangeToApiFilter = (start: Date, end: Date) => {
  const result: { rangeStart?: string; rangeEnd?: string } = {};

  if (!start && !end) {
    return result;
  }

  if (start) {
    result.rangeStart = formatDateForAPI(start);
  }

  if (end) {
    result.rangeEnd = formatDateForAPI(end);
  }

  return result;
};

const formatDateForAPI = (date: Date) => format(date, 'yyyy-MM-dd');
