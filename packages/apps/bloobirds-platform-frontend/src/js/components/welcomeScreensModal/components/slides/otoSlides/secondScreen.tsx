import React from 'react';
import { Trans } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

//@ts-ignore
import CallSendOnePlace from '../../../../../../assets/call-send-one-place.png';
//@ts-ignore
import Calendar from './assets/Calendar.png';
//@ts-ignore
import Dialer from './assets/Dialer.png';
//@ts-ignore
import Gmail from './assets/Gmail.png';
//@ts-ignore
import Notes from './assets/Notes.png';
import Outlook from './assets/Outlook.png';
//@ts-ignore
import SalesNav from './assets/SalesNav.png';
//@ts-ignore
import Workflows from './assets/workflows.png';
import styles from './otoSlides.module.css';

const CallsInOnePlaceImageComposite = () => (
  <div className={styles.callsInOnePlaceImageComposite}>
    <div className={styles.callsInOnePlaceImageCompositeImageColumn}>
      <img height="35px" src={Outlook} style={{ alignSelf: 'center' }} alt="svg" />
      <img height="24px" src={Gmail} alt="svg" />
      <img height="40px" src={Calendar} style={{ alignSelf: 'flex-end' }} alt="svg" />
      <img height="41px" src={SalesNav} alt="svg" />
    </div>
    <img height="260px" style={{ margin: '0 16px' }} src={CallSendOnePlace} alt="svg" />
    <div className={styles.callsInOnePlaceImageCompositeImageColumn} style={{ gap: '36px' }}>
      <img
        height="32px"
        src={Dialer}
        alt="svg"
        style={{ marginRight: '-10px', alignSelf: 'flex-start' }}
      />
      <img height="32px" src={Workflows} style={{ alignSelf: 'flex-end' }} alt="svg" />
      <img height="32px" src={Notes} style={{ alignSelf: 'flex-start' }} alt="svg" />
    </div>
  </div>
);

function SecondScreenOTO() {
  return (
    <div key="secondScreenOTO" className={styles.backgroundWhite}>
      <div className={styles.subtitleContent}>
        <div className={styles.subtitleContent}>
          <Text size="m" align="center" color="softPeanut" className={styles.subtitleText}>
            <Trans
              i18nKey="welcomeScreens.otoSlides.secondScreen.title"
              components={[
                <Text
                  key="0"
                  size="m"
                  weight="bold"
                  color="bloobirds"
                  inline
                  className={styles.subtitleText}
                >
                  {''}
                </Text>,
              ]}
            />
          </Text>
        </div>
        <div className={styles.titleContent}>
          <Text size="xl" align="center">
            <Trans
              i18nKey="welcomeScreens.otoSlides.secondScreen.content"
              components={[
                <span key="0" style={{ color: 'var(--bloobirds)', fontWeight: '600' }}>
                  {''}
                </span>,
              ]}
            />
          </Text>
        </div>
        <CallsInOnePlaceImageComposite />
      </div>
    </div>
  );
}
export default SecondScreenOTO;
