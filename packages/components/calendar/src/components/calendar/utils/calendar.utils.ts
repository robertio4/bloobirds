import { LiveEvent } from '@bloobirds-it/types';
import spacetime, { Spacetime } from 'spacetime';

export function getPxPaddingSinceMidnight(date?: Spacetime, selectedTimezone?: string) {
  if (!selectedTimezone) {
    const dateToUse = spacetime(date || new Date());
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  } else {
    const dateToUse = spacetime(date || new Date()).goto(selectedTimezone);
    return (60 * dateToUse.hour() + dateToUse.minute()) * (40 / 60);
  }
}

export function getLiveEventPadding(date?: Spacetime) {
  return (60 * date.hour() + date.minute()) * (40 / 60);
}

export function createArrayOfLength(length: number) {
  return Array.from(Array(length)).map((_, i) => i);
}

export function updatedCreatedSectionsOnDelete(createdSections: any, selectedEvent: LiveEvent) {
  const updatedCreatedSections = [];
  const selectedEventStart = selectedEvent.startTime;
  const selectedEventEnd = selectedEvent.endTime;
  createdSections.forEach(eventBlock => {
    if (
      (selectedEventEnd && selectedEventEnd.isBefore(eventBlock.startTime)) ||
      (selectedEventStart && selectedEventStart.isAfter(eventBlock.endTime))
    ) {
      updatedCreatedSections.push(eventBlock);
    } else {
      const reducedDuration = eventBlock.duration - selectedEvent.minuteSpan;
      if (reducedDuration < 0) {
        updatedCreatedSections.push(eventBlock);
      } else if (reducedDuration === 0) {
        return;
      } else {
        if (selectedEventStart.isEqual(eventBlock.startTime)) {
          updatedCreatedSections.push({
            ...eventBlock,
            startTime: selectedEventEnd,
            duration: reducedDuration,
          });
        } else if (selectedEventEnd.isEqual(eventBlock.endTime)) {
          updatedCreatedSections.push({
            ...eventBlock,
            endTime: selectedEventStart,
            duration: reducedDuration,
          });
        } else {
          const newDurationFirstBlock = eventBlock.startTime.diff(selectedEventStart, 'minutes');
          const newDurationSecondBlock = selectedEventEnd.diff(eventBlock.endTime, 'minutes');

          updatedCreatedSections.push({
            ...eventBlock,
            endTime: selectedEventStart,
            duration: newDurationFirstBlock,
          });
          updatedCreatedSections.push({
            ...eventBlock,
            startTime: selectedEventEnd,
            duration: newDurationSecondBlock,
          });
        }
      }
    }
  });

  return updatedCreatedSections;
}

export function updatedCreatedSectionsOnCreate(createdSections: any, selectedEvent: any) {
  const updatedCreatedSections = [];
  const selectedEventStart = selectedEvent.startTime;
  const selectedEventEnd = selectedEvent.endTime;

  if (createdSections?.length === 0) {
    return [
      {
        duration: selectedEvent.duration,
        startTime: selectedEventStart,
        endTime: selectedEventEnd,
        minuteSpan: selectedEvent.minuteSpan,
        day: selectedEvent.day,
      },
    ];
  }
  createdSections.forEach((eventBlock, idx) => {
    const increasedDuration = eventBlock.duration + selectedEvent.minuteSpan;
    const nextBlock = createdSections?.[idx + 1];
    if (
      nextBlock &&
      selectedEventStart.isEqual(eventBlock.endTime) &&
      selectedEventEnd.isEqual(nextBlock?.endTime)
    ) {
      updatedCreatedSections.push({
        ...eventBlock,
        endTime: nextBlock.endTime,
        duration: increasedDuration + nextBlock.duration,
      });
    } else if (selectedEventStart.isEqual(eventBlock.endTime)) {
      updatedCreatedSections.push({
        ...eventBlock,
        endTime: selectedEventEnd,
        duration: increasedDuration,
      });
    } else if (selectedEventEnd.isEqual(eventBlock.startTime)) {
      updatedCreatedSections.push({
        ...eventBlock,
        startTime: selectedEventStart,
        duration: increasedDuration,
      });
    } else if (
      !selectedEventEnd.isEqual(eventBlock.startTime) &&
      !selectedEventStart.isEqual(eventBlock.endTime)
    ) {
      updatedCreatedSections.push(eventBlock, {
        duration: selectedEvent.duration,
        startTime: selectedEventStart,
        endTime: selectedEventEnd,
        minuteSpan: selectedEvent.minuteSpan,
        day: selectedEvent.day,
      });
    }
  });

  return updatedCreatedSections;
}

export function mergeExistingPlaceholders(
  createdSections: Record<string, any>,
  selectedPlaceholder: any,
): LiveEvent[] {
  const updatedCreatedSections = [];
  const selectedEventStart = selectedPlaceholder.startTime;
  const selectedEventEnd = selectedEventStart.add(selectedPlaceholder.duration, 'minutes');

  if (createdSections?.length === 0) {
    return [
      {
        duration: selectedPlaceholder.duration,
        startTime: selectedEventStart,
        endTime: selectedEventEnd,
        minuteSpan: selectedPlaceholder.minuteSpan,
        day: selectedPlaceholder.day,
      } as LiveEvent,
    ];
  }

  for (let i = 0; i < createdSections.length; i++) {
    const eventBlock = createdSections[i];
    const nextBlock = createdSections[i + 1];
    if (selectedEventStart.isBefore(eventBlock.startTime)) {
      //new event starts before
      if (selectedEventEnd.isBefore(eventBlock.startTime)) {
        //new event ends before
        updatedCreatedSections.push(selectedPlaceholder);
        updatedCreatedSections.push(eventBlock);
      } else if (selectedEventEnd.isEqual(eventBlock.startTime)) {
        //new event ends at the same time so we need to merge
        updatedCreatedSections.push({
          ...selectedPlaceholder,
          duration: selectedPlaceholder.duration + eventBlock.duration,
          endTime: eventBlock.endTime,
        });
      } else if (selectedEventEnd.isAfter(eventBlock.endTime)) {
        //new event ends after
        let numOfOverridenEvents = 1;
        while (createdSections[i + numOfOverridenEvents]) {
          if (
            selectedEventEnd.isAfter(createdSections[i + numOfOverridenEvents].endTime) ||
            selectedEventEnd.isEqual(createdSections[i + numOfOverridenEvents].endTime)
          ) {
            numOfOverridenEvents++;
          } else {
            break;
          }
        }
        if (numOfOverridenEvents > 1) {
          const overridenEvents = numOfOverridenEvents - 1;
          updatedCreatedSections.push({
            ...selectedPlaceholder,
            duration:
              selectedPlaceholder.duration +
              eventBlock.duration +
              createdSections[i + overridenEvents].duration,
            endTime: createdSections[i + overridenEvents].endTime,
          });
          i += overridenEvents;
        } else {
          updatedCreatedSections.push(selectedPlaceholder);
        }
      } else if (selectedEventEnd.isBefore(eventBlock.endTime)) {
        //new event ends before
        const timeDifference = Math.abs(selectedEventEnd.diff(eventBlock.endTime, 'minutes'));
        const usableTime =
          Math.floor(timeDifference / eventBlock.minuteSpan) * eventBlock.minuteSpan;
        updatedCreatedSections.push(selectedPlaceholder);
        updatedCreatedSections.push({
          ...eventBlock,
          duration: usableTime,
          startTime: eventBlock.endTime.subtract(usableTime, 'minutes'),
        });
      }
    } else if (selectedEventStart.isEqual(eventBlock.startTime)) {
      //new event starts at the same time
      if (selectedEventEnd.isBefore(eventBlock.startTime)) {
        //new event ends before
        updatedCreatedSections.push(eventBlock);
      } else if (selectedEventEnd.isAfter(eventBlock.endTime)) {
        //new event ends after
        updatedCreatedSections.push(selectedPlaceholder);
      }
    } else {
      //new event starts after
      if (selectedEventStart.isEqual(eventBlock.endTime)) {
        //new event starts at the same time so we need to merge
        if (nextBlock && selectedEventEnd.isEqual(nextBlock.startTime)) {
          updatedCreatedSections.push({
            ...selectedPlaceholder,
            duration: selectedPlaceholder.duration + eventBlock.duration + nextBlock.duration,
            startTime: eventBlock.startTime,
            endTime: nextBlock.endTime,
          });
          i++;
        } else {
          updatedCreatedSections.push({
            ...eventBlock,
            duration: selectedPlaceholder.duration + eventBlock.duration,
            endTime: selectedPlaceholder.endTime,
          });
        }
      } else {
        updatedCreatedSections.push(eventBlock);
        updatedCreatedSections.push(selectedPlaceholder);
      }
    }
  }

  return updatedCreatedSections;
}

export const isSlotCreated = (events, startDate) => {
  return events?.some(section => {
    return startDate.isAfter(section.startTime) && startDate.isBefore(section.endTime);
  });
};
