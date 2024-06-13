import { generateDatePrefix, getDateTimestampString } from '@bloobirds-it/utils';
import { format, isSameDay, parse } from 'date-fns';

import { getValueFromLogicRole } from './bobjects.utils';

export const addActivityDateGrouping = (items, dateLogicRole, t) =>
  items.map((item, index) => {
    const date = new Date(getValueFromLogicRole(item, dateLogicRole));
    const previous = items[index - 1];
    const previousItemDate = previous && new Date(getValueFromLogicRole(previous, dateLogicRole));
    const formattedDay = format(date, 'MMMM do, yyyy');
    const dateDay = parse(formattedDay, 'MMMM do, yyyy', new Date());
    const hashDate = getDateTimestampString(date);
    return {
      ...item,
      activityDate: {
        isFirstOfDay: !previousItemDate || !isSameDay(date, previousItemDate),
        day: dateDay,
        formattedDate: formattedDay,
        prefix: generateDatePrefix(dateDay, undefined, t),
        hashDate,
      },
    };
  });
