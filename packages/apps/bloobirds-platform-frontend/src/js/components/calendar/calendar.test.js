import React from 'react';

import { render, screen, configure } from '@testing-library/react';

import * as useCalendar from '../../hooks/useCalendar';
import Calendar from './calendar';
import { daysMock } from './dates.mock';

jest.spyOn(useCalendar, 'default').mockReturnValue({
  currentMonth: 7,
  currentYear: 2021,
  days: daysMock,
  title: 'Aug 2021',
  view: new Date(),
  onNextMonth: () => {},
  onPrevMonth: () => {},
  onToday: () => {},
  resetCalendar: () => {},
});

configure({ testIdAttribute: 'data-test' });

describe('Calendar component', () => {
  it('displays calendar in current month', async () => {
    render(<Calendar />);

    expect(screen.queryByText(/Aug 2021/i)).toBeInTheDocument();
  });

  it('displays calendar in current month with additional data', async () => {
    const additionalData = {
      '2021-08-04': 9,
    };

    render(<Calendar data={additionalData} />);

    expect(screen.getByTestId('day-2021-08-04-data')).toHaveTextContent('9');
  });

  // it('displays calendar in current month with a marked day', async () => {
  //   render(
  //     <Calendar markedDays={['2021-08-03']} />
  //   );

  //   const dayElement = screen.getByTestId("day-2021-08-03");
  //   expect((/_marked/).test(dayElement.className)).toBe(true);
  // });

  it('displays skeleton calendar when we are waiting for data', async () => {
    jest.spyOn(useCalendar, 'default').mockReturnValue({
      currentMonth: 7,
      currentYear: 2021,
      days: null,
      title: 'Aug 2021',
      view: new Date(),
      onNextMonth: () => {},
      onPrevMonth: () => {},
      onToday: () => {},
      resetCalendar: () => {},
    });

    render(<Calendar />);

    expect(screen.getByTestId('calendar-skeleton')).toBeInTheDocument();
  });
});
