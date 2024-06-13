import { useEffect, useState, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import useMeasure from 'react-use-measure';

import { Button, Icon, IconButton, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import {
  BuyerPersonaAffinity as BuyerType,
  useCopilotEnabled,
  useUserSettings,
} from '@bloobirds-it/hooks';
import { initInternationalizationSettings } from '@bloobirds-it/internationalization';
import { api } from '@bloobirds-it/utils';
import { animated, config, useSpring } from '@react-spring/web';
import { RecoilRoot } from 'recoil';

import styles from './buyerPersonaAffinity.module.css';

const BuyerPersonaAffinityInner = () => {
  const [open, setOpen] = useState(false);
  const [ref, { height }] = useMeasure();
  const style = useSpring({
    config: config.gentle,
    from: {
      height: 0,
    },
    to: {
      height: open ? height : 0,
    },
  });
  const animationStyle = useSpring({
    config: config.slow,
    opacity: 1,
    y: 0,
    from: { opacity: 0, y: -20 },
    enter: { opacity: 1 },
  });
  const { t } = useTranslation('translation', { keyPrefix: 'extension.buyerPersonaAffinity' });
  const [isLoading, setIsLoading] = useState(false);
  const [affinity, setAffinity] = useState<BuyerType>();

  const [refresh, setRefresh] = useState(false);

  const [reload, setReload] = useState(true);
  useEffect(() => {
    const element = document.querySelector('.text-body-medium.break-words');
    if (element && reload) {
      setIsLoading(true);
      api
        .post<BuyerType>(`/copilot/buyer-persona/affinity?refresh=${refresh}`, {
          existingPersonas: [],
          leadInfo: element?.textContent,
          linkedinUrl: window.location.href,
        })
        .then(response => {
          setIsLoading(false);
          setAffinity(response.data);
          setReload(false);
          setRefresh(false);
          return response.data;
        });
    }
  }, [reload]);

  useEffect(() => {
    if (refresh) {
      setReload(true);
    }
  }, [refresh]);

  return (
    <animated.div style={{ ...animationStyle }}>
      <div className={styles.root} id="buyer-persona-affinity-root">
        <div className={styles.header}>
          <div className={styles.title}>
            <Icon name="stars" color="purple" size={16} />
            <Text size="m" color="purple" weight="bold">
              {t('title')}
            </Text>
            {!isLoading && affinity && (
              <Text size="l" color="purple" weight="bold">
                {affinity.grade} %
              </Text>
            )}
          </div>
          {!isLoading && (
            <div className={styles.button}>
              <Button
                iconLeft="refresh"
                variant="secondary"
                size="small"
                color="purple"
                className={styles.button_override}
                onClick={() => setRefresh(true)}
              >
                {t('refresh')}
              </Button>
              <IconButton
                onClick={() => setOpen(!open)}
                name={open ? 'chevronUp' : 'chevronDown'}
                color="lightPurple"
                size={16}
              />
            </div>
          )}
          {isLoading && (
            <div className={styles.title}>
              <Text size="s" color="lightPurple">
                {t('generating')}
              </Text>
              <Spinner color="lightPurple" size={16} name="loadingCircle" />
            </div>
          )}
        </div>
        <animated.div style={{ overflow: 'hidden', ...style }}>
          <div className={styles.content} ref={ref}>
            {affinity?.positivePoints?.map((point, index) => (
              <div key={index} className={styles.point}>
                <span className={styles.point_icon}>
                  <Icon name="check" color="extraCall" size={20} />
                </span>
                <Text size="s">{point}</Text>
              </div>
            ))}
            {affinity?.negativePoints?.map((point, index) => (
              <div key={index} className={styles.point}>
                <span className={styles.point_icon}>
                  <Icon name="cross" color="extraMeeting" size={20} />
                </span>
                <Text size="s">{point}</Text>
              </div>
            ))}
          </div>
        </animated.div>
      </div>
    </animated.div>
  );
};

const BuyerPersonaAffinity = () => {
  initInternationalizationSettings();
  const settings = useUserSettings();
  const isCopilotEnabled = useCopilotEnabled(settings?.account?.id);

  if (!isCopilotEnabled) {
    return null;
  }

  return <BuyerPersonaAffinityInner />;
};

export const BuyerPersonaAffinityWrapper = () => (
  <Suspense fallback={<></>}>
    <RecoilRoot>
      <BuyerPersonaAffinity />
    </RecoilRoot>
  </Suspense>
);
