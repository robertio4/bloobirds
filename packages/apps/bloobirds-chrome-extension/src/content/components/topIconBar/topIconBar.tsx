import { useTranslation } from 'react-i18next';

import {
  ColorType,
  Dropdown,
  IconButton,
  Item,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useLocalStorage } from '@bloobirds-it/hooks';
import { LocalStorageKeys, MIXPANEL_EVENTS } from '@bloobirds-it/types';
import { getAuthUrl, logout } from '@bloobirds-it/utils';
import classNames from 'classnames';
import mixpanel from 'mixpanel-browser';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { useIsNewAuthEnabled } from '../../../hooks/useIsNewAuthEnabled';
import { useExtensionContext } from '../context';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import styles from './topIconBar.module.css';

interface TopIconsProps {
  dragging: boolean;
  onClose?: () => void;
  onRefresh?: () => void;
  onSettings?: () => void;
  onBackButton?: () => void;
  backgroundColor?: ColorType;
}

function TopIconBar(props: TopIconsProps): JSX.Element {
  const { onClose, onRefresh, onSettings, dragging, onBackButton, backgroundColor } = props;

  const { setCreateLead, setSyncLead } = useCreationForm();
  const { getShowBackButton, setIsHome, getIsDuplicatePage } = useFloatingMenuContext();
  const showBackButton = getShowBackButton();
  const isDuplicatePage = getIsDuplicatePage();
  const {
    useGetLoggedIn,
    setLoggedIn,
    setActiveBobject,
    useGetActiveBobject,
    setExtendedContext,
    setCurrentTask,
    toggleSidePeek,
    useGetSidePeekEnabled,
    setCustomPage,
    closeExtendedScreen,
    setNoMatchFound,
    setDuplicatesDetected,
    setContactViewBobjectId,
    useGetIsSettings,
    setIsSettings,
  } = useExtensionContext();
  const loggedIn = useGetLoggedIn();
  const activeBobject = useGetActiveBobject();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const isSettings = useGetIsSettings();
  const { remove } = useLocalStorage();
  const { t } = useTranslation();

  const isNewAuthEnabled = useIsNewAuthEnabled();
  const { visible, setVisible, ref: dropdownRef } = useVisible();

  const handleHomeClick = e => {
    closeExtendedScreen();
    setActiveBobject(null);
    setExtendedContext(null);
    setCurrentTask(null);
    setContactViewBobjectId(null);
    setIsHome(true);
    setCustomPage(null);
    setIsSettings(false);
    setNoMatchFound(null);
    setDuplicatesDetected(false);

    e.stopPropagation();
  };

  const handleToggleView = () => {
    if (sidePeekEnabled) {
      mixpanel.track(MIXPANEL_EVENTS.CHANGE_TO_BUBBLE_VIEW);
    } else {
      mixpanel.track(MIXPANEL_EVENTS.CHANGE_TO_SIDEPEEK_VIEW);
    }

    toggleSidePeek();
    setExtendedContext(null);
  };

  const handleClose = () => {
    if (sidePeekEnabled) {
      mixpanel.track(MIXPANEL_EVENTS.MINIMIZE_SIDEPEEK_MENU);
    } else {
      mixpanel.track(MIXPANEL_EVENTS.MINIMIZE_BUBBLE_MENU);
    }
    onClose();
  };

  return (
    <div
      id="bb-handle"
      className={classNames(styles.container, {
        [styles.dragging]: dragging,
        [styles.sidePeekEnabled]: sidePeekEnabled,
      })}
      style={{ backgroundColor: backgroundColor && `var(--${backgroundColor})` }}
    >
      {!sidePeekEnabled && (
        <svg
          className={styles.handle}
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1 0.75C0.447715 0.75 0 1.19772 0 1.75V2.25C0 2.80228 0.447715 3.25 1 3.25H1.5C2.05228 3.25 2.5 2.80228 2.5 2.25V1.75C2.5 1.19772 2.05228 0.75 1.5 0.75H1ZM1 5.75C0.447715 5.75 0 6.19772 0 6.75V7.25C0 7.80228 0.447715 8.25 1 8.25H1.5C2.05228 8.25 2.5 7.80228 2.5 7.25V6.75C2.5 6.19772 2.05228 5.75 1.5 5.75H1ZM0 11.75C0 11.1977 0.447715 10.75 1 10.75H1.5C2.05228 10.75 2.5 11.1977 2.5 11.75V12.25C2.5 12.8023 2.05228 13.25 1.5 13.25H1C0.447715 13.25 0 12.8023 0 12.25V11.75ZM6 0.75C5.44772 0.75 5 1.19772 5 1.75V2.25C5 2.80228 5.44772 3.25 6 3.25H6.5C7.05228 3.25 7.5 2.80228 7.5 2.25V1.75C7.5 1.19772 7.05228 0.75 6.5 0.75H6ZM5 6.75C5 6.19772 5.44772 5.75 6 5.75H6.5C7.05228 5.75 7.5 6.19772 7.5 6.75V7.25C7.5 7.80228 7.05228 8.25 6.5 8.25H6C5.44772 8.25 5 7.80228 5 7.25V6.75ZM6 10.75C5.44772 10.75 5 11.1977 5 11.75V12.25C5 12.8023 5.44772 13.25 6 13.25H6.5C7.05228 13.25 7.5 12.8023 7.5 12.25V11.75C7.5 11.1977 7.05228 10.75 6.5 10.75H6Z"
            fill="#9ACFFF"
          />
        </svg>
      )}
      <div>
        <>
          {(isDuplicatePage ||
            (onBackButton && showBackButton && !isSettings && activeBobject)) && (
            <Tooltip title={t('common.back')} position="top">
              <IconButton name="arrowLeft" onClick={onBackButton} />
            </Tooltip>
          )}
          <Tooltip title={t('common.search')} position="top">
            <IconButton name="search" onClick={handleHomeClick} />
          </Tooltip>
          {loggedIn && onRefresh && (
            <Tooltip title={t('common.refresh')} position="top">
              <IconButton
                name="redoReload"
                onClick={() => {
                  setCreateLead(false);
                  setSyncLead(false);
                  setIsHome(false);
                  onRefresh(activeBobject);
                  setIsSettings(false);
                }}
              />
            </Tooltip>
          )}
        </>
      </div>
      <div className={styles.actions}>
        <>
          {onClose && (
            <Tooltip title={t('common.minimise')} position="top">
              <IconButton name="minus" onClick={handleClose} />
            </Tooltip>
          )}
          <Tooltip
            title={sidePeekEnabled ? t('common.bubble') : t('common.sidePeek')}
            position="top"
          >
            <IconButton
              name={sidePeekEnabled ? 'floatingpeek' : 'sidepeek'}
              onClick={handleToggleView}
            />
          </Tooltip>
          {loggedIn && (
            <Dropdown
              anchor={<IconButton name="moreVertical" onClick={() => setVisible(!visible)} />}
              visible={visible}
              ref={dropdownRef}
            >
              {onSettings && (
                <Item>
                  <IconButton
                    name="settings"
                    onClick={() => {
                      setVisible(false);
                      onSettings();
                    }}
                  >
                    {t('common.settings')}
                  </IconButton>
                </Item>
              )}
              <Item>
                <IconButton
                  name="logout"
                  onClick={async () => {
                    await logout();
                    setVisible(false);
                    setLoggedIn(false);
                    remove(LocalStorageKeys.LastVisitedBobjects);
                    if (isNewAuthEnabled) {
                      const authUrl = getAuthUrl();
                      window.location.href = `${authUrl}?logout=true&afterLogout=${window.location.href}`;
                    }
                  }}
                >
                  {t('common.logout')}
                </IconButton>
              </Item>
            </Dropdown>
          )}
        </>
      </div>
    </div>
  );
}

export default TopIconBar;
