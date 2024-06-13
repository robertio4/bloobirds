import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { InfoWarning } from '@bloobirds-it/misc';
import { MessagesEvents } from '@bloobirds-it/types';

import { useRingoverDialer } from './hooks/useRingoverDialerVisibility';
import styles from './ringoverDialer.module.css';

const RingoverDialerFrame = React.forwardRef((props, ref) => {
  const { contact } = useRingoverDialer();

  const setContactViewBobjectId = bobjectId => {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ForceOpenExtension, {
        detail: { bobjectId },
      }),
    );
  };

  return (
    <div className={styles.airCall_dialer_container} id="bb-ringover-dialer">
      {contact && (
        <div className={styles.airCall_dialer_contact}>
          <div className={styles.airCall_dialer_contact_names}>
            {contact.leadName && (
              <div
                className={styles.airCall_dialer_contact_name}
                onClick={() => setContactViewBobjectId(contact.leadId)}
              >
                <Icon name={'bloobirds'} color="bloobirds" size={20} />
                <Text
                  size={'m'}
                  color="bloobirds"
                  weight="bold"
                  className={styles.airCall_dialer_contact_name_text}
                >
                  {contact.leadName}
                </Text>
              </div>
            )}
            {contact.companyName && (
              <div
                className={styles.airCall_dialer_contact_name}
                onClick={() => setContactViewBobjectId(contact.companyId)}
              >
                <Icon name={'company'} color="bloobirds" size={16} />
                <Text
                  size={'s'}
                  color="bloobirds"
                  className={styles.airCall_dialer_contact_name_text}
                >
                  {contact.companyName}
                </Text>
              </div>
            )}
          </div>
          {contact.multipleContacts && (
            <div className={styles.airCall_dialer_contact_multiple}>
              <InfoWarning message="There are multiple records with this phone number" />
            </div>
          )}
        </div>
      )}
      {/*@ts-ignore*/}
      <div id="ringover-phone" ref={ref} className={styles.airCall_dialer} />
    </div>
  );
});

export default RingoverDialerFrame;
