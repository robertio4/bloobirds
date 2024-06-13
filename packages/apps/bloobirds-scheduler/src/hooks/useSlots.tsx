import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useOutletContext } from 'react-router';

import spacetime from 'spacetime';

interface MyDocument extends Document {
  startViewTransition: any;
}

const startViewTransition = callback => {
  const myDocument = document as MyDocument;
  if (myDocument.startViewTransition) {
    myDocument.startViewTransition(() => {
      flushSync(() => callback());
    });
  } else {
    callback();
  }
};

const getAvailableSlots = slots => {
  const days = Object.keys(slots);
  const today = spacetime.now();

  // In slots if the key is not in availableDays, set slots to disabled
  const availableSlots = days.reduce((acc, day) => {
    const s = spacetime(day);
    const isTodayOrNextDays = s.isAfter(today) || s.isSame(today, 'day');
    const hasAvailableSlots = slots[day].some(slot => slot.available);

    if (isTodayOrNextDays && hasAvailableSlots) {
      // if the day is today put the slots before now as disabled
      const isToday = s.isSame(today, 'day');
      if (isToday) {
        const now = spacetime.now();
        const slotsToday = slots[day].map(slot => {
          if (spacetime(slot.startDateTime).epoch < now.epoch) {
            return { ...slot, available: false };
          }
          return slot;
        });

        acc[day] = slotsToday;
      } else {
        acc[day] = slots[day];
      }
    } else {
      acc[day] = slots[day].map(slot => ({ ...slot, available: false }));
    }
    return acc;
  }, {});

  return availableSlots;
};

type OutletContextType = [
  {
    slots: {
      [key: string]: {
        startDateTime: string;
        duration: string;
        available: boolean;
      }[];
    };
    userName: string;
    userEmail: string;
    timeZone: string;
    slotBooked: any;
    title: string;
    userId: string;
    leadName: string;
    leadEmail: string;
  },
  (dataForm, slotSelected) => void,
];

const useSlots = () => {
  const [data, create] = useOutletContext<OutletContextType>();

  const queryString = window.location.search;
  const searchParams = new URLSearchParams(queryString);
  const startDateTime = searchParams.get('startDateTime');

  const [openScheduleMeeting, setOpenScheduleMeeting] = useState(false);
  const [slotSelected, setSlotSelected] = useState(null);
  const [selectedDay, setSelectedDay] = useState(spacetime.now().format('iso-short'));

  const slots = data.slots;
  const days = Object.keys(slots);
  const availableSlots = getAvailableSlots(slots);
  const availableDays = days.reduce((acc, day) => {
    const hasAvailableSlots = availableSlots[day].some(slot => slot.available);
    acc[day] = hasAvailableSlots;
    return acc;
  }, {});

  const slotsData = {
    ...data,
    slots: availableSlots,
    days: availableDays,
  };

  // si para el dia de hoy no hay slots disponibles, selecciona el siguiente dia que tenga slots disponibles
  const todaySlots = availableSlots[selectedDay];
  if (!todaySlots || todaySlots.every(slot => !slot.available)) {
    const nextDay = Object.keys(availableSlots).find(day => {
      const daySlots = availableSlots[day];
      return daySlots && daySlots.some(slot => slot.available);
    });
    if (nextDay) {
      setSelectedDay(nextDay);
    }
  }

  const handleShowScheduleMeeting = () =>
    startViewTransition(() => setOpenScheduleMeeting(prev => !prev));

  const handleSelectedDay = (day: string) => {
    startViewTransition(() => setSelectedDay(day));
  };

  useEffect(() => {
    const selectedSlot = availableSlots[selectedDay]?.find(
      slot => slot.startDateTime === startDateTime && slot.available,
    );

    if (selectedSlot) {
      setSlotSelected(selectedSlot);
    } else {
      const availableSlot = availableSlots[selectedDay]?.find(slot => slot.available);

      if (availableSlot) {
        setSlotSelected(availableSlot);
      }
    }
  }, [selectedDay]);

  const createMeeting = async formData => {
    return create(
      {
        ...formData,
        startDateTime: slotSelected.startDateTime,
        day: selectedDay,
        userId: data.userId,
      },
      slotSelected,
    );
  };

  return {
    data: slotsData,
    openScheduleMeeting,
    selectedDay,
    slotSelected,
    setSelectedDay: handleSelectedDay,
    setSlotSelected,
    handleShowScheduleMeeting,
    createMeeting,
  };
};

export default useSlots;
