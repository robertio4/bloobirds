import { useEffect } from 'react';

import { formatDate } from '@bloobirds-it/utils';
import calendarize from 'calendarize';
import { isToday, isWeekend } from 'date-fns';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

const getCalendarView = ({ view, offset }) => {
  const year = view.getFullYear();
  const month = view.getMonth();

  return calendarize(new Date(year, month), offset)
    .flat()
    .map(dayNumber => {
      const dateValue = dayNumber > 0 ? new Date(year, month, dayNumber) : null;
      return {
        dayNumber,
        dateValue,
        inMonth: dayNumber > 0,
        isWeekend: isWeekend(dateValue),
        isToday: isToday(dateValue),
      };
    });
};

const calendarViewAtom = atom({
  key: 'calendarViewAtom',
  default: new Date(),
});

const calendarDaysAtom = atom({
  key: 'calendarDaysAtom',
  default: null,
});

const useCalendar = ({ date, offset = 1 } = {}) => {
  const [view, setView] = useRecoilState(calendarViewAtom);
  const [days, setDays] = useRecoilState(calendarDaysAtom);
  const resetView = useResetRecoilState(calendarViewAtom);
  const resetDays = useResetRecoilState(calendarDaysAtom);

  useEffect(() => {
    if (date) {
      setView(date);
    }
  }, [date]);

  useEffect(() => {
    const calendarView = getCalendarView({ view, offset });

    setDays(calendarView);
  }, [view, offset]);

  const onNextMonth = () => {
    const nextView = new Date(view.getFullYear(), view.getMonth() + 1);
    setView(nextView);
  };

  const onPrevMonth = () => {
    const prevView = new Date(view.getFullYear(), view.getMonth() - 1);
    setView(prevView);
  };

  const onToday = () => {
    const todayView = new Date();
    setView(todayView);
  };

  const resetCalendar = () => {
    resetView();
    resetDays();
  };

  return {
    currentMonth: view.getMonth(),
    currentYear: view.getFullYear(),
    days,
    title: formatDate(view, 'LLL yyyy'),
    view,
    onNextMonth,
    onPrevMonth,
    onToday,
    resetCalendar,
  };
};

export default useCalendar;
