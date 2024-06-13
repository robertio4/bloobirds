import React, { useLayoutEffect, useRef, useState } from 'react';

import { AnimationTooltip, Modal, Slider, SliderPage } from '@bloobirds-it/flamingo-ui';

import CommonScreen from '../components/slides/commonScreen';
import FirstScreen from '../components/slides/firstScreen';
import LastScreen from '../components/slides/lastScreen';
import { GuidesSaleText, SalesTeamText, StrategicMetricsProText } from '../screenTexts';
import styles from '../welcomeScreens.module.css';
import { WelcomeScreensTypes } from '../welcomeScreensTypes';

export const AdminWelcomeScreens = ({ openModal, handleFinish }: WelcomeScreensTypes) => {
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
              text={SalesTeamText}
              svg={'https://media.bloobirds.com/public/welcomeScreens/playbook-bg-white.gif'}
            />
            <AnimationTooltip
              element={element}
              key={0}
              arrow
              horizontalAnimation
              position="right-start"
              text={'No more reps delivering alternative pitches and using their own sequences ✨'}
              width={'183px'}
              left={window.innerWidth / 2 + 170}
              top={window.innerHeight / 2 - 26}
            ></AnimationTooltip>
          </SliderPage>
          <SliderPage textNextButton="Continue">
            <CommonScreen
              text={GuidesSaleText}
              svg={
                'https://media.bloobirds.com/public/welcomeScreens/Bloobirds-PV-Data-Collection-Short.gif'
              }
            />
            <AnimationTooltip
              element={element}
              key={1}
              arrow
              horizontalAnimation
              position="right-start"
              text={
                'Keep your team focused on selling instead of overwhelmed with tedious admin stuff and say goodbye to a CRM filled with wonky data ✨'
              }
              width={'282px'}
              left={window.innerWidth / 2 + 130}
              top={window.innerHeight / 2 - 66}
            ></AnimationTooltip>
          </SliderPage>
          <SliderPage textNextButton="Let's start">
            <CommonScreen
              text={StrategicMetricsProText}
              svg={'https://media.bloobirds.com/public/welcomeScreens/Bloobirds-PV-Dashboards.gif'}
            />
            <AnimationTooltip
              element={element}
              key={2}
              arrow
              horizontalAnimation
              position="right-start"
              text={
                'Open rates and number of calls are not enough. Make decisions backed by strategic metrics and market insights that actually matter.✨'
              }
              width={'282px'}
              left={window.innerWidth / 2 + 150}
              top={window.innerHeight / 2 - 40}
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
