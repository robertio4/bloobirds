import React, { useLayoutEffect, useRef, useState } from 'react';

import { AnimationTooltip, Modal, Slider, SliderPage } from '@bloobirds-it/flamingo-ui';

import Aircall from '../../../../assets/Aircall.png';
import Calendar from '../../../../assets/Calendar-icon.png';
import Dialer from '../../../../assets/Dialer.png';
import Gmail from '../../../../assets/Gmail.png';
import JustCall from '../../../../assets/JustCall.png';
import Linkedin from '../../../../assets/Linkedin.png';
import CommonScreen from '../components/slides/commonScreen';
import FirstScreen from '../components/slides/firstScreen';
import LastScreen from '../components/slides/lastScreen';
import {
  AutomatedTaskText,
  ContactabilityToolsText,
  CorrectContactFlowText,
  WhatWhenHowText,
} from '../screenTexts';
import styles from '../welcomeScreens.module.css';
import { WelcomeScreensTypes } from '../welcomeScreensTypes';

const Icons = () => (
  <>
    <div className={styles.imgCalendar}>
      <img src={Calendar} alt="Calendar" />
    </div>
    <div className={styles.imgJustCall}>
      <img src={JustCall} alt="JustCall" />
    </div>
    <div className={styles.imgGmail}>
      <img src={Gmail} alt="Gmail" />
    </div>
    <div className={styles.imgLinkedin}>
      <img src={Linkedin} alt="Linkedin" />
    </div>
    <div className={styles.imgAircall}>
      <img src={Aircall} alt="Aircall" />
    </div>
    <div className={styles.imgDialer}>
      <img src={Dialer} alt="Dialer" />
    </div>
  </>
);

export const UserWelcomeScreens = ({ openModal, handleFinish }: WelcomeScreensTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  useLayoutEffect(() => {
    setElement(ref.current);
  }, []);
  const tooltipEl = () => (
    <div className={styles.tooltip}>
      <div ref={ref} />
    </div>
  );
  return (
    <>
      {tooltipEl()}
      <Modal data-testid="welcomeScreenModal" width={700} open={openModal} onClose={handleFinish}>
        <Slider>
          <SliderPage textNextButton="Tell me more">
            <FirstScreen />
          </SliderPage>
          <SliderPage textNextButton="Continue">
            <CommonScreen
              text={AutomatedTaskText}
              svg={'https://media.bloobirds.com/public/welcomeScreens/task-assistence.gif'}
            />
            <AnimationTooltip
              element={element}
              key={0}
              arrow
              horizontalAnimation
              position="right-start"
              text={'Forget about losing prospects on lists or not knowing what to do next ✨'}
              width={'221px'}
              left={window.innerWidth / 2 + 130}
              top={window.innerHeight / 2 - 120}
            ></AnimationTooltip>
          </SliderPage>
          <SliderPage textNextButton="Continue">
            <CommonScreen
              text={ContactabilityToolsText}
              svg={
                'https://media.bloobirds.com/public/welcomeScreens/Bloobirds-PV-LinkedIn-Extension-Video.gif'
              }
            >
              <Icons />
            </CommonScreen>
            <AnimationTooltip
              element={element}
              key={1}
              verticalAnimation
              position="right-start"
              text={'Switching back and forth between different apps is a thing from the past ✨'}
              width={'310px'}
              left={window.innerWidth / 2 - 320}
              top={window.innerHeight / 2 + 66}
            ></AnimationTooltip>
          </SliderPage>
          <SliderPage textNextButton="Continue">
            <CommonScreen
              text={WhatWhenHowText}
              svg={'https://media.bloobirds.com/public/welcomeScreens/playbook-bg-white.gif'}
            />
            <AnimationTooltip
              element={element}
              key={2}
              arrow
              horizontalAnimation
              position="right-start"
              text={'Know which pitch and channel is working best for each scenario and persona ✨'}
              width={'237px'}
              left={window.innerWidth / 2 + 160}
              top={window.innerHeight / 2 - 46}
            ></AnimationTooltip>
          </SliderPage>
          <SliderPage textNextButton="Let's start">
            <CommonScreen
              text={CorrectContactFlowText}
              svg={
                'https://media.bloobirds.com/public/welcomeScreens/Bloobirds-PV-Data-Collection-Short.gif'
              }
            />
            <AnimationTooltip
              element={element}
              key={3}
              arrow
              horizontalAnimation
              position="right-start"
              text={'Stop wasting time filling spreadsheets and form fields ✨'}
              width={'164px'}
              left={window.innerWidth / 2 + 130}
              top={window.innerHeight / 2 - 66}
            ></AnimationTooltip>
          </SliderPage>
          <SliderPage>
            <LastScreen onFinish={handleFinish} />
          </SliderPage>
        </Slider>
      </Modal>
    </>
  );
};
