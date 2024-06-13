import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Button, Icon, Text } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import styles from '../pages/SelectSlots.module.css';
import { MIXPANEL_EVENTS } from '../utils/mixpanel';
import { Field } from './Field';
import GuestsInput from './GuestsArea';

interface ScheduleMeetingProps {
  onSubmit: (data: {
    fields: {
      [id: string]: any;
    };
  }) => void;
  principalName: string;
  principalEmail: string;
}

const ScheduleMeeting = ({ principalName, principalEmail, onSubmit }: ScheduleMeetingProps) => {
  const [showGuestsTextArea, setShowGuestsTextArea] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler' });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      principalName,
      principalEmail,
    },
  });

  const submitForm = async (values: {
    fields: {
      [id: string]: any;
    };
  }) => {
    onSubmit(values);
    mixpanel.track(MIXPANEL_EVENTS.SCHEDULER_SUBMIT_MEETING);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <div className={styles.meetingView}>
        <Text size="xxl" color="peanut" weight="heavy">
          {t('meetingDetails')}
        </Text>

        <div className={styles.meetingInfo}>
          <Field id="principalName" name={t('name')} control={control} required />
          <Field id="principalEmail" name={t('email')} control={control} required isEmail />
          <div className={styles.invitees}>
            {!showGuestsTextArea ? (
              <>
                <Button
                  variant="secondary"
                  iconLeft="personAdd"
                  onClick={() => {
                    setShowGuestsTextArea(true);
                    mixpanel.track(MIXPANEL_EVENTS.SCHEDULER_CLICK_ON_ADD_GUESTS);
                  }}
                >
                  {t('addGuests')}
                </Button>
                <div className={styles.inviteesInfo}>
                  <Icon size={16} name="alertTriangle" />
                  <Text size="xs" color="softPeanut">
                    {t('guests.noEditInfo')}
                  </Text>
                </div>
              </>
            ) : (
              <GuestsInput name="invitees" control={control} />
            )}
          </div>
          <Field id="meetingNote" name={t('note')} control={control} isTextArea />
        </div>
        <Button
          className={styles.scheduleBtn}
          iconLeft="calendar"
          type="submit"
          disabled={isSubmitting}
        >
          {t('scheduleMeeting')}
        </Button>
      </div>
    </form>
  );
};

export default ScheduleMeeting;
