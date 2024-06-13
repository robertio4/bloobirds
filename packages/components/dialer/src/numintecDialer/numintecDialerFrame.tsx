import React from 'react';

import { Icon, Text } from '@bloobirds-it/flamingo-ui';
import { InfoWarning } from '@bloobirds-it/misc';
import { MessagesEvents } from '@bloobirds-it/types';

import { useNumintecDialer } from './hooks/useNumintecDialer';
import styles from './numintecDialer.module.css';

const NumintecDialerFrame = React.forwardRef((props, ref) => {
  const { contact } = useNumintecDialer();

  const setContactViewBobjectId = bobjectId => {
    window.dispatchEvent(
      new CustomEvent(MessagesEvents.ForceOpenExtension, {
        detail: { bobjectId },
      }),
    );
  };

  return (
    <div className={styles.airCall_dialer_container} id="bb-numintec-dialer">
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
      <iframe
        className={styles.dialer}
        name="numintec-cti"
        id="numintec-cti"
        allow="microphone"
        src="https://go.invoxcontact.io/webphonego_middleware/"
        frameBorder="0"
        width="418"
        height="590"
      ></iframe>
    </div>
  );
});

export default NumintecDialerFrame;
