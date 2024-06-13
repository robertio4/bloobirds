import React from 'react';

import {
  Dropdown,
  Flag,
  Icon,
  IconButton,
  Item,
  Radio,
  RadioGroup,
  Switch,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useCopilot, useIsOTOAccount } from '@bloobirds-it/hooks';
import { api } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';
import PropTypes from 'prop-types';
import useSWR, { useSWRConfig } from 'swr';

import {
  APP_ACCOUNT_GENERAL_SETTINGS,
  APP_MANAGEMENT_USER,
  APP_PLAYBOOK_MESSAGING_PITCH,
  APP_PLAYBOOK_TARGET_MARKET,
} from '../../../app/_constants/routes';
import { useDialerVisibility, useMediaQuery, useRouter } from '../../../hooks';
import { useOldReportingEnabled } from '../../../hooks/useFeatureFlags';
import { useLogin } from '../../../hooks/useLogin';
import { useAppCalendarVisibility } from '../../../hooks/useUserTasks';
import SessionManagerFactory from '../../../misc/session';
import { useTableContext } from '../../bobjectTable/context/bobjectTable.context';
import { bobjectTableActions } from '../../bobjectTable/context/bobjectTable.types';
import styles from './headerActions.module.css';
import { HelpButton } from './helpButton/helpButton';
import NotificationBell from './notificationBell';
import { SearchBarButton } from './searchBarButton/searchBarButton';

const AiSwitch = () => {
  const { isEnabled, setEnabled, language, setLanguage } = useCopilot();

  const { visible, setVisible, ref } = useVisible(false);

  return (
    <div className={styles._switch_wrapper}>
      <div className={styles._switch_text}>
        <Icon name="stars" color={isEnabled ? 'lightPurple' : 'softPeanut'} size={20} />
        <Text size="s" color="purple">
          Copilot
        </Text>
      </div>
      <Switch size="small" gradient checked={isEnabled} onChange={setEnabled} />
      <Dropdown
        ref={ref}
        anchor={<IconButton name="settings" color="purple" onClick={() => setVisible(!visible)} />}
        visible={visible}
        onClose={() => setVisible(false)}
      >
        <div className={styles._language_dropdown}>
          <Text size="s" align="center">
            Pick a language to work with
          </Text>
          <RadioGroup
            value={language}
            onChange={value => setLanguage(value)}
            defaultValue={language}
          >
            <Radio size="small" value="english" expand>
              <span className={styles._language_option}>
                English
                <Flag code="US" size={14} />
              </span>
            </Radio>
            <Radio size="small" value="spanish" expand>
              <span className={styles._language_option}>
                Spanish
                <Flag code="ES" size={14} />
              </span>
            </Radio>
            <Radio size="small" value="italian" expand>
              <span className={styles._language_option}>
                Italian
                <Flag code="IT" size={14} />
              </span>
            </Radio>
          </RadioGroup>
        </div>
      </Dropdown>
    </div>
  );
};

const HeaderActions = (props: { userName: any }) => {
  const { userName } = props;
  const { logout } = useLogin();
  const roleManager = SessionManagerFactory().getRoleManager();
  const router = useRouter();
  const { dispatch } = useTableContext();
  const { openCalendar, isOpen: isOpenCalendar, closeCalendar } = useAppCalendarVisibility();
  const isOldReportingEnabled = useOldReportingEnabled();
  const { cache } = useSWRConfig();
  const isOTOAccount = useIsOTOAccount();
  const { data } = useSWR('authEnabled', () => api.get('/auth/service/jwt/new-auth-enabled'));
  const { ref, visible, setVisible } = useVisible(false);
  const { isOpen: isDialerOpen } = useDialerVisibility();
  const { windowDimensions, isSmallDesktop } = useMediaQuery();
  const screenWithSpace = windowDimensions.width > 1550;

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleClose = () => {
    if (visible) {
      setVisible(false);
    }
  };

  const resetTable = () => dispatch({ type: bobjectTableActions.BOBJECT_TABLE_RESET });

  const handleLogout = () => {
    router.history.replace({ search: '' });
    logout({ callback: resetTable, redirectToAuth: data.data?.newAuthEnabled });
    cache.clear();
    mixpanel.reset();
  };

  function onClickCalendar() {
    if (!isOpenCalendar) {
      openCalendar();
    } else {
      closeCalendar();
    }
  }

  function onClickMyPlaybook(event) {
    const url = roleManager.isAccountAdmin()
      ? APP_PLAYBOOK_TARGET_MARKET
      : APP_PLAYBOOK_MESSAGING_PITCH;
    router.history.push(url, { event: event });
  }

  return (
    <div className={styles._container} onClick={handleClose}>
      {!isOTOAccount && (
        <SearchBarButton shortPlaceholder={(isDialerOpen && !screenWithSpace) || isSmallDesktop} />
      )}
      <div
        className={clsx(styles._button_wrapper, {
          [styles._button_wrapper_dialer_open]:
            (isDialerOpen && !screenWithSpace) || isSmallDesktop,
        })}
        data-test="Button-HeaderMyPlaybook"
        onClick={onClickMyPlaybook}
      >
        <Icon name="magic" color="purple" size={16} />
        {(!isDialerOpen || screenWithSpace) && !isSmallDesktop && (
          <Text size="s" color="purple" htmlTag="span">
            My Playbook
          </Text>
        )}
      </div>
      {!isOTOAccount && (
        <>
          <NotificationBell />
          <div
            className={clsx({
              [styles._calendar_icon_wrapper]: !isOTOAccount,
            })}
          >
            <IconButton
              dataTest="HeaderCalendar"
              name="event"
              onClick={onClickCalendar}
              size={20}
              color="peanut"
            />
          </div>
        </>
      )}
      <Dropdown
        ref={ref}
        arrow={false}
        visible={visible}
        anchor={
          <div
            className={styles._user_button}
            style={{ margin: isOldReportingEnabled ? '0 24px' : '0 0 0 24px' }}
            data-test={'Button-HeaderUserName'}
            data-intercom="nav-action-user"
            onClick={handleClick}
          >
            <div className={styles._user_button_circle} />
            {userName}
            <div className={styles._user_button_icon_container}>
              <Icon name={visible ? 'chevronUp' : 'chevronDown'} size={12} color="verySoftPeanut" />
            </div>
          </div>
        }
      >
        <Item
          dataTest={'HeaderUserNameUserSettings'}
          onClick={(value, e) => router.push(APP_MANAGEMENT_USER, { event: e })}
        >
          <span
            data-test={'DropdownItem-HeaderUserSettings'}
            data-intercom="nav-action-user-user-settings"
          >
            User Settings
          </span>
        </Item>
        {roleManager.isAccountAdmin() && (
          <Item
            dataTest={'HeaderUserNameAccountSettings'}
            onClick={(value, e) => router.push(APP_ACCOUNT_GENERAL_SETTINGS, { event: e })}
          >
            <span
              data-test={'DropdownItem-dropdownAccountSettings'}
              data-intercom="nav-action-user-account-settings"
            >
              Account Settings
            </span>
          </Item>
        )}
        <Item dataTest={'HeaderUserNameLogOut'} onClick={handleLogout}>
          Log Out
        </Item>
      </Dropdown>
      {isOldReportingEnabled && (
        <Tooltip title="Open Dashboards">
          <a
            className={styles._dashboard_button}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              window.open('https://reporting.bloobirds.com/superset/welcome', '_blank');
              mixpanel.track('OLD_DASHBOARDS_OPENED');
            }}
          >
            <Icon name="barchart" color="peanut" size={20} />
          </a>
        </Tooltip>
      )}
      <HelpButton />
    </div>
  );
};

HeaderActions.propTypes = {
  userName: PropTypes.string,
};

HeaderActions.defaultProps = {
  userName: '',
};

export { HeaderActions };
