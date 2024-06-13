import React, { useState } from 'react';

import { IconButton } from '@bloobirds-it/flamingo-ui';

import Confirmation from '../components/Confirmation';
import MeetingDetails from '../components/MeetingDetails';
import ScheduleMeeting from '../components/ScheduleMeeting';
import SelectDate from '../components/SelectDate';
import SlotSelection from '../components/SlotSelection';
import { useMediaQuery } from '../hooks/useMediaQuery';
import useSlots from '../hooks/useSlots';
import ExpiredLink from './ExpiredLink';
import styles from './SelectSlots.module.css';

const SelectSlots = () => {
  const {
    data,
    openScheduleMeeting,
    selectedDay,
    slotSelected,
    setSelectedDay,
    setSlotSelected,
    handleShowScheduleMeeting,
    createMeeting,
  } = useSlots();

  const { days, slots, slotBooked, timeZone } = data;
  const [schedule, setSchedule] = useState(false);

  const matchesWidth = useMediaQuery('(min-width: 980px)');
  const matchesHeight = useMediaQuery('(min-height: 620px)');
  const isBigScreen = matchesWidth && matchesHeight;

  if (slotBooked ?? schedule) {
    return <Confirmation {...data} {...slotBooked} />;
  }

  // If all day slots are disabled, redirect to the expired link page.
  if (Object.values(data?.days).every(day => !day)) {
    return <ExpiredLink />;
    //return <Navigate to="/expired" replace={true} />;
  }

  if (!slotSelected) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        {openScheduleMeeting && (
          <IconButton
            className={styles.goBackBtn}
            name="arrowLeft"
            onClick={handleShowScheduleMeeting}
          />
        )}
        <MeetingDetails open={openScheduleMeeting} data={data} slotSelected={slotSelected} />
        {!openScheduleMeeting && isBigScreen && (
          <>
            <div>
              <div className={styles.dividerInfo} />
            </div>
            <SelectDate
              days={days}
              selectedDay={selectedDay}
              updateDay={setSelectedDay}
              timeZone={timeZone}
            />
          </>
        )}
      </div>
      <div className={styles.rightContainer}>
        {!openScheduleMeeting && !isBigScreen && (
          <SelectDate
            days={days}
            selectedDay={selectedDay}
            updateDay={setSelectedDay}
            timeZone={timeZone}
          />
        )}
        {!openScheduleMeeting ? (
          <SlotSelection
            day={selectedDay}
            slots={slots[selectedDay] ?? slots[Object.keys(slots)[0]]}
            slotSelected={slotSelected}
            setSlotSelected={setSlotSelected}
            onToggle={handleShowScheduleMeeting}
            timeZone={timeZone}
          />
        ) : (
          <ScheduleMeeting
            principalName={data.leadName}
            principalEmail={data.leadEmail}
            onSubmit={data => {
              createMeeting(data).then(() => {
                setSchedule(true);
              });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SelectSlots;
