import { format } from 'date-fns';
import { CadenceResponse, TIME_WINDOW } from '../../cadenceTable.type';

export function getDateIndex(timeWindow: TIME_WINDOW, date: Date) {
  let ret = date;
  switch (timeWindow) {
    case TIME_WINDOW.DAILY: // thursday
      ret = new Date(new Date(date).setDate(date.getDate() - date.getDay() + 4));
      break;
    case TIME_WINDOW.WEEKLY: // monday
      ret = new Date(new Date(date).setDate(date.getDate() - date.getDay() + 1));
      break;
    case TIME_WINDOW.MONTHLY: // first day of the month
      ret = new Date(date.getFullYear(), date.getMonth(), 1);
      break;
  }
  return format(ret, 'yyyy-MM-dd');
}

// Monthly to Weekly
export function getCenterFromFirstDate(date: string) {
  const d = new Date(date);
  return format(new Date(d.setDate(d.getDate() + 20 - d.getDay() + 4)), 'yyyy-MM-dd');
}

const getMinAndMaxDate = (tasks: CadenceResponse['tasks'], currentDate: string) => {
  const sortedTasks = Object.keys(tasks).sort();
  const minDate = sortedTasks[0];
  const maxDate = sortedTasks[sortedTasks.length - 1];
  if (currentDate < minDate) {
    return { minDate: currentDate, maxDate };
  } else if (currentDate > maxDate) {
    return { minDate, maxDate: currentDate };
  } else {
    return { minDate, maxDate };
  }
};

const offset = 7;
function getColumns(timeWindow: TIME_WINDOW, minDate: string, maxDate: string) {
  const min = new Date(minDate);
  const max = new Date(maxDate);
  switch (timeWindow) {
    case TIME_WINDOW.DAILY: {
      const ret: string[] = [];
      min.setDate(min.getDate() - offset);
      max.setDate(max.getDate() + offset - max.getDay() + 1);
      for (let date = min; date < max; date.setDate(date.getDate() + 1)) {
        ret.push(format(date, 'yyyy-MM-dd'));
      }
      return ret;
    }
    case TIME_WINDOW.WEEKLY: {
      const minWeek = new Date(min.setDate(min.getDate() - min.getDay() - 6));
      const maxWeek = new Date(max.setDate(max.getDate() - max.getDay() + 15));
      const ret: string[] = [];
      for (let date = minWeek; date <= maxWeek; date.setDate(date.getDate() + 7)) {
        ret.push(format(date, 'yyyy-MM-dd'));
      }
      return ret;
    }
    case TIME_WINDOW.MONTHLY: {
      const minFirstOfMonth = new Date(min.getFullYear(), min.getMonth(), 1);
      const maxFirstOfMonth = new Date(max.getFullYear(), max.getMonth(), 1);
      const ret: string[] = [];
      for (
        let date = new Date(new Date(minFirstOfMonth).setMonth(minFirstOfMonth.getMonth() - 2));
        date < new Date(new Date(maxFirstOfMonth).setMonth(maxFirstOfMonth.getMonth() + 4));
        date.setMonth(date.getMonth() + 1)
      ) {
        ret.push(format(date, 'yyyy-MM-dd'));
      }
      return ret;
    }
  }
}

export function getDateList(timeWindow: TIME_WINDOW): string[] {
  const minDate = '2017-01-01';
  const maxDate = format(new Date().setFullYear(new Date().getFullYear() + 1), 'yyyy-MM-dd');
  return getColumns(timeWindow, minDate, maxDate);
}
