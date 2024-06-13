import React, { useEffect, useState } from 'react';

import { Skeleton } from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { DialerType } from '@bloobirds-it/types';
import clsx from 'clsx';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

import { DialerOpenStatus, useDialer, useDialerStore } from '../dialer';
import { Position } from '../hooks/useDialerPosition';
import { DialerExtendedContent } from './dialerExtendedContent';
import styles from './dialerExtendedScreen.module.css';

function getSize(isBig, dialerType) {
  if (dialerType == DialerType.RINGOVER_DIALER) {
    return 377;
  }
  if (dialerType == DialerType.NUMINTEC_DIALER) {
    return 417;
  }
  return isBig ? 372 : 317;
}
function getExtendedScreenPosition(sideOpen, opening, isBig, dialerType) {
  if (sideOpen === 'right') {
    const size = getSize(isBig, dialerType);
    return opening ? [20, size] : [size, 20];
  } else {
    return opening ? [-50, -337] : [-337, -50];
  }
}

export const DialerExtendedScreen = ({ position }: { position: Position }) => {
  const controls = useAnimation();
  const [sideOpen, setSideOpen] = useState('right');
  const { toggleExtendedScreen } = useDialerStore();

  const open = useDialer(state => state.open);
  const showingExternalScreen = useDialer(state => state.showingExtendedScreen);
  const extendedScreenType = useDialer(state => state.extendedScreenType);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const handleOnClose = () => toggleExtendedScreen(extendedScreenType);
  const { settings } = useActiveUserSettings();
  const {
    user: { dialerType },
  } = settings;
  const isAircall = dialerType === 'AIRCALL_DIALER';

  useEffect(() => {
    setInternalOpen(open !== DialerOpenStatus.closed && open !== DialerOpenStatus.minimized);
  }, [open]);

  useEffect(() => {
    if (showingExternalScreen) {
      controls?.start('start').then(() => setInternalOpen(open === DialerOpenStatus.open));
      setHasBeenOpened(b => (b ? b : true));
    } else if (hasBeenOpened) {
      controls?.start('close').then(() => setInternalOpen(false));
    }
  }, [showingExternalScreen, open]);

  useEffect(() => {
    if (
      (sideOpen === 'left' && position?.x < 322) ||
      (sideOpen === 'right' && position?.x > window.innerWidth - 650)
    ) {
      if (open === DialerOpenStatus.open && showingExternalScreen) controls?.start('start');

      if (showingExternalScreen) {
        controls?.start('close').then(async () => {
          await setSideOpen(side => (side === 'left' ? 'right' : 'left'));
          controls?.start('start');
        });
      } else {
        setSideOpen(side => (side === 'left' ? 'right' : 'left'));
      }
    }
  }, [position]);

  const variants = {
    start: () => {
      return {
        left: getExtendedScreenPosition(sideOpen, true, isAircall, dialerType),
        scaleX: [0, 1],
        opacity: 1,
        transition: {
          duration: 0.25,
        },
      };
    },
    close: () => {
      return {
        left: getExtendedScreenPosition(sideOpen, false, isAircall, dialerType),
        scaleX: [1, 0],
        transition: {
          duration: 0.25,
        },
      };
    },
  };

  const isRightOpen = sideOpen === 'right';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={controls}
        variants={variants}
        className={clsx({ [styles.extended]: !isRightOpen, [styles.extendedRight]: isRightOpen })}
      >
        {internalOpen ? (
          <DialerExtendedContent isRightOpen={isRightOpen} handleOnClose={handleOnClose} />
        ) : (
          <DialerExtendedSkeleton />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

const DialerExtendedSkeleton = () => (
  <div className={styles.extendedSkeleton}>
    <Skeleton height="20%" width="100%" variant="rect" />
    <Skeleton height="70%" width="100%" variant="rect" />
    <Skeleton height="10%" width="100%" variant="rect" />
  </div>
);
