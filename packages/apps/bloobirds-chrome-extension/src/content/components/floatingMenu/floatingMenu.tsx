import { useEffect } from 'react';

import { useEmailConnections } from '@bloobirds-it/hooks';
import { isUnassignedTask } from '@bloobirds-it/utils';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import { isSalesforcePage } from '../../../utils/url';
import { useExtensionContext } from '../context';
import { ExtendedScreen } from '../extendedScreen/ExtendedScreen';
import { getStyle } from '../extensionLeftBar/extensionLeftBar.utils';
import Main from '../linkedInScreens';
import LoginForm from '../loginForm/loginForm';
import NavigationBar from '../navegationBar/navegationBar';
import TopIcons from '../topIconBar/topIconBar';
import styles from './floatingMenu.module.css';
import { useFloatingMenuContext, useFloatingMenuContextStore } from './floatingMenuContext';

interface FloatingMenuProps {
  visible: boolean;
  dragging: boolean;
  width: number;
  onClose: () => void;
  url: string;
}

const FloatingScreens = () => {
  const store = useFloatingMenuContextStore();
  const {
    useGetLoggedIn,
    useGetExtendedContext,
    useGetContactViewBobjectId,
    closeExtendedScreen,
  } = useExtensionContext();
  const { setIsHome } = useFloatingMenuContext();
  const loggedIn = useGetLoggedIn();
  const { connections, mutate } = useEmailConnections();
  const leftBarExtendedContext = useGetExtendedContext();
  const contactViewBobjectId = useGetContactViewBobjectId();

  useEffect(() => {
    if (connections) {
      store.setState('connections', connections);
      store.setState('mutateConnections', mutate);
    }
  }, [connections]);

  useEffect(() => {
    if (leftBarExtendedContext === null) {
      closeExtendedScreen();
      setIsHome(false);
    }
  }, [leftBarExtendedContext]);

  useEffect(() => {
    if (!contactViewBobjectId) {
      closeExtendedScreen();
    } else {
      setIsHome(false);
    }
  }, [contactViewBobjectId]);

  if (!connections && loggedIn) {
    return null;
  }

  return (
    <>
      <Main />
      <ExtendedScreen />
    </>
  );
};

export default function FloatingMenu(props: FloatingMenuProps) {
  const { dragging, onClose, visible, width = 0, url } = props;
  const {
    useGetLoggedIn,
    useGetCurrentPage,
    useGetSidePeekEnabled,
    useGetCurrentTask,
    useGetOpenStartTasksNavigation,
    useGetCustomPage,
    updateIsSettings,
  } = useExtensionContext();
  const {
    setGoBack,
    getGoBack,
    setIsHome,
    getIsHome,
    getOnRefresh,
    getIsDuplicatePage,
  } = useFloatingMenuContext();
  const customPage = useGetCustomPage();
  const currentPage = useGetCurrentPage();
  const currentTask = useGetCurrentTask();
  const isDuplicatePage = getIsDuplicatePage();
  const goBack = getGoBack();
  const loggedIn = useGetLoggedIn();
  const isHome = getIsHome();
  const openStartTaskNavigation = useGetOpenStartTasksNavigation();
  const { open: openStartTask, stage, quickFilter } = openStartTaskNavigation;
  const sidePeekEnabled = useGetSidePeekEnabled();
  const onRefresh = getOnRefresh();
  const isSalesforce = isSalesforcePage(url);

  useEffect(() => {
    setIsHome(false);
  }, [currentPage]);

  useEffect(() => {
    if (currentTask && isUnassignedTask(currentTask) && !isHome) setIsHome(true);
  }, [currentTask]);

  const onSettings = () => {
    updateIsSettings();
  };

  const onGoBack = () => {
    isDuplicatePage && goBack ? goBack() : setGoBack(() => null);
  };

  const classnames = classNames(styles.container, {
    [styles.bubbleView]: !sidePeekEnabled && visible,
    [styles.sidePeekView]: sidePeekEnabled && visible,
  });

  const withFooter = !isSalesforce;
  const height = getStyle(url, withFooter)?.height;
  const top = getStyle(url)?.top;

  const widthSidePeek = (width - 56) * 0.33;
  const xSidePeek = width - widthSidePeek;

  return (
    <motion.div
      style={
        sidePeekEnabled && {
          position: 'absolute',
          top: top ?? (isSalesforce ? '90px' : '52px'),
          left: xSidePeek || '300px',
          transition: 'all 0.25s ease-in-out',
          pointerEvents: 'all',
        }
      }
      initial={{ x: xSidePeek }}
      animate={{
        opacity: [sidePeekEnabled ? 1 : 0, 1],
        x: [sidePeekEnabled ? xSidePeek : 0, 0],
      }}
      transition={{
        duration: !sidePeekEnabled ? 0.5 : 0.25,
        ease: 'easeInOut',
      }}
    >
      <div
        style={{
          width: sidePeekEnabled ? widthSidePeek : undefined,
          height: sidePeekEnabled ? height : '100%',
        }}
        className={classnames}
        id="floating-menu"
      >
        <AnimatePresence>
          {customPage ? (
            customPage
          ) : (
            <>
              {!openStartTask ? (
                <TopIcons
                  dragging={dragging}
                  onClose={onClose}
                  onRefresh={onRefresh}
                  onSettings={onSettings}
                  onBackButton={onGoBack}
                />
              ) : (
                <NavigationBar dragging={dragging} stage={stage} quickFilter={quickFilter} />
              )}
              {loggedIn ? <FloatingScreens /> : <LoginForm />}
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
