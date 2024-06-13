import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { AnimationTooltip, Button, Modal, Slider, SliderPage } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers, useUserSettings } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';

//@ts-ignore
import SystemRemainder from '../../../../assets/system-remainder.png';
import { useQueryParam } from '../../../hooks/useQueryParams';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import CommonScreen from '../components/slides/commonScreen';
import FirstScreenOTO from '../components/slides/otoSlides/firstScreenOTO';
import GuideScreenOTO from '../components/slides/otoSlides/guideScreenOTO';
import { LastScreenOTO } from '../components/slides/otoSlides/lastScreenOTO';
import SecondScreenOTO from '../components/slides/otoSlides/secondScreen';
import { LetTheSystemRemindYouText } from '../screenTexts';
import styles from '../welcomeScreens.module.css';
import { WelcomeScreensTypes } from '../welcomeScreensTypes';

export const OTOWelcomeScreens = ({ openModal, handleFinish }: WelcomeScreensTypes) => {
  const ref = useRef<HTMLDivElement>(null);
  const [element, setElement] = useState<HTMLDivElement | null>(null);
  const hasQSGEnabled = useQuickStartEnabled();
  const { t } = useTranslation('translation', {
    keyPrefix: 'welcomeScreens.otoSlides',
  });
  const [activeSlide, setActiveSlide] = useState<number>();
  const [hideFooter, setHideFooter] = useState<boolean>();
  const settings = useUserSettings();
  const isSupport = settings?.user?.type === 'SUPPORT_USER';
  const { save } = useUserHelpers();

  useLayoutEffect(() => {
    setElement(ref.current);
  }, [ref.current]);

  const tooltipEl = () => (
    <div id="WS-Tooltip" className={styles.tooltip}>
      <div ref={ref} />
    </div>
  );

  const comesFromAuth = useQueryParam('welcomeScreen') === '?origin=nylas';

  const slide = useMemo(() => {
    if (activeSlide) {
      return activeSlide;
    } else if (comesFromAuth) {
      return 3;
    } else {
      return undefined;
    }
  }, [comesFromAuth, activeSlide]);

  const SliderContent = useCallback(() => {
    return (
      <div className={styles.otoWrapper}>
        <Slider
          {...(slide && { activeSlide: slide as number })}
          {...(hideFooter && { isDotsVisible: false })}
          color={{ primary: 'bloobirds', secondary: 'lightBloobirds' }}
        >
          <SliderPage textNextButton={t('firstScreen.buttonText')} buttonVariant="primary">
            <FirstScreenOTO />
          </SliderPage>
          <SliderPage textNextButton={t('secondScreen.buttonText')} buttonVariant="primary">
            <SecondScreenOTO />
            <AnimationTooltip
              element={element}
              color="softBloobirds"
              key={0}
              arrow={false}
              horizontalAnimation
              text={t('secondScreen.animationText')}
              width={'183px'}
              left={window.innerWidth / 2 - 180}
              top={window.innerHeight / 2 + 130}
            />
          </SliderPage>
          <SliderPage textNextButton={t('commonScreen.buttonText')} buttonVariant="primary">
            <CommonScreen
              text={LetTheSystemRemindYouText}
              svg={SystemRemainder}
              color="white"
              isOTO
            />
            <AnimationTooltip
              element={element}
              color="softBloobirds"
              key={2}
              arrow
              horizontalAnimation
              position="right-start"
              text={t('commonScreen.animationText')}
              width={'282px'}
              left={window.innerWidth / 2 + 150}
              top={window.innerHeight / 2 + 10}
            />
          </SliderPage>
          {hasQSGEnabled && (
            <SliderPage displayButton={false}>
              <GuideScreenOTO
                handleFinish={() => setActiveSlide(4)}
                setHideFooter={setHideFooter}
              />
            </SliderPage>
          )}
          <SliderPage isLast={true}>
            <LastScreenOTO />
          </SliderPage>
        </Slider>
        {isSupport && (
          <Button
            onClick={() => save(UserHelperKeys.COMPLETE_WELCOME_SCREEN)}
            size={'small'}
            expand
          >
            Skip welcome screens
          </Button>
        )}
      </div>
    );
  }, [activeSlide, comesFromAuth, ref.current]);

  return (
    <>
      {tooltipEl()}
      <Modal
        data-testid="welcomeScreenModalOTO"
        width={800}
        open={openModal}
        onClose={handleFinish}
        fullScreen={true}
      >
        <SliderContent />
      </Modal>
    </>
  );
};
