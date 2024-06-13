import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { TDateISO, TDateISODate } from '@bloobirds-it/types';
import throttle from 'lodash/throttle';
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import spacetime from 'spacetime';

import { Event } from '../types/calendar';

const eventPlaceholderAtom = atom({
  key: 'eventPlaceholderAtom',
  default: null,
});

const isMouseDownAtom = atom({
  key: 'eventPlaceholderIsMouseDownAtom',
  default: false,
});

export const useMouseEvents = () => {
  const [isMouseDown, setIsMouseDown] = useRecoilState<boolean>(isMouseDownAtom);

  return {
    isMouseDown,
    setIsMouseDown,
  };
};

export const useGeneratePlaceHolder = () => {
  const setEventPlaceholder = useSetRecoilState(eventPlaceholderAtom);
  const isMouseDown = useRecoilValue(isMouseDownAtom);
  const methods = useFormContext();
  const dateTime = methods?.watch('dateTime');
  const duration = methods?.watch('duration');

  const generatePlaceHolder = throttle((date: TDateISO, duration: number) => {
    const title = methods?.watch('title');
    setEventPlaceholder({
      // @ts-ignore
      duration: duration,
      type: 'placeholder',
      startTime: date,
      endTime: null,
      id: 'event-placeholder',
      title: title || 'Untitled Event',
      collisions: 0,
      collisionNumber: 0,
      day: spacetime(date).format('iso-short') as TDateISODate,
      participants: [],
      calendarId: 'eventPlaceholder',
    });
  }, 250);

  useEffect(() => {
    if (dateTime && duration && !isMouseDown) {
      generatePlaceHolder(dateTime as TDateISO, duration || 15);
    }
  }, [dateTime, duration]);

  return;
};

export const useEventPlaceholder = (setMeetingDuration: (duration: number) => void) => {
  // @ts-ignore
  const [eventPlaceholder, setEventPlaceholder] = useRecoilState<Event>(eventPlaceholderAtom);
  const resetEventPlaceholder = useResetRecoilState(eventPlaceholderAtom);
  const methods = useFormContext();
  const dateTime = methods?.watch('dateTime');
  const duration = methods?.watch('duration');
  const title = methods?.watch('title');

  useEffect(
    () => () => {
      resetEventPlaceholder();
    },
    [],
  );

  const handlePlaceholderCreation = throttle((date: TDateISO, duration: number) => {
    setEventPlaceholder({
      duration: duration,
      type: 'placeholder',
      startTime: date,
      endTime: date,
      // @ts-ignore
      startTimeTimestamp: null,
      // @ts-ignore
      endTimeTimestamp: null,
      id: 'event-placeholder',
      title: title || 'Untitled Event',
      collisions: 0,
      collisionNumber: 0,
      day: spacetime(date).format('iso-short') as TDateISODate,
      participants: [],
      calendarId: 'eventPlaceholder',
    });
  }, 250);

  useEffect(() => {
    if (
      eventPlaceholder?.startTime &&
      spacetime(eventPlaceholder?.startTime).format('iso-utc') !==
        // @ts-ignore
        spacetime(dateTime).format('iso-utc')
    ) {
      methods?.setValue('dateTime', spacetime(eventPlaceholder?.startTime).toNativeDate());
    }
    // @ts-ignore
    if (eventPlaceholder?.duration && eventPlaceholder?.duration !== parseInt(duration)) {
      setMeetingDuration(eventPlaceholder?.duration);
      methods?.setValue('duration', eventPlaceholder?.duration);
    }
  }, [eventPlaceholder]);

  return {
    eventPlaceholder,
    onCalendarPlaceholder: handlePlaceholderCreation,
  };
};
