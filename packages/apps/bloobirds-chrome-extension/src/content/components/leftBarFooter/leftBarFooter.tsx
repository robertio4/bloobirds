import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Button,
  CircularBadge,
  Dropdown,
  Icon,
  IconButton,
  IconType,
  Item,
  Radio,
  RadioGroup,
  Switch,
  Text,
  Tooltip,
  useHover,
  useToasts,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId, useActiveUserSettings, useCopilot } from '@bloobirds-it/hooks';
import { MIXPANEL_EVENTS, UserRole } from '@bloobirds-it/types';
import { api, baseUrls } from '@bloobirds-it/utils';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import {
  accountDropdownItems,
  DropdownItem,
  helpButton,
  redirectButtonsDropdown,
  userDropdownItems,
} from '../extensionLeftBar/extensionLeftBar.constants';
import styles from './leftBarFooter.module.css';

type LeftBarButtonProps = {
  iconName: IconType;
  url: string;
  children?: React.ReactNode;
  externalUrl?: { [key: string]: string };
};

type LeftBarDropdownItemProps = {
  label: string;
  url?: string;
  iconName: IconType;
  key: string;
  isSmall: boolean;
  onClick: () => void;
};

type LeftBarDropdownHeaderProps = {
  name: string;
  shortname: string;
  color: string;
  isSmall: boolean;
  hideButtons: boolean;
  isAdmin: boolean;
};

const AiSwitch = () => {
  const { isEnabled, setEnabled, language, setLanguage } = useCopilot();

  const { visible, setVisible, ref } = useVisible(false);
  const { t } = useTranslation();

  return (
    <div className={styles._switch_wrapper}>
      <div className={styles._switch_text}>
        <Icon name="stars" color={isEnabled ? 'lightPurple' : 'softPeanut'} size={20} />
        <Text size="s" color="purple">
          {t('common.copilot')}
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
            {t('languages.pickALanguage')}
          </Text>
          <RadioGroup
            value={language}
            onChange={value => setLanguage(value)}
            defaultValue={language}
          >
            <Radio size="small" value="english" expand>
              <span className={styles._language_option}>{t('languages.en')}</span>
            </Radio>
            <Radio size="small" value="spanish" expand>
              <span className={styles._language_option}>{t('languages.es')}</span>
            </Radio>
            <Radio size="small" value="italian" expand>
              <span className={styles._language_option}>{t('languages.it')}</span>
            </Radio>
          </RadioGroup>
        </div>
      </Dropdown>
    </div>
  );
};

export const LeftBarButton = ({ iconName, children, url, externalUrl }: LeftBarButtonProps) => {
  const [ref, isHover] = useHover();
  const { i18n } = useTranslation();

  return (
    <div ref={ref} className={styles.footer_button_wrapper}>
      {/* @ts-ignore */}
      <Tooltip title={children} position="right">
        <Button
          className={styles.footer_button}
          color={isHover ? 'veryLightBloobirds' : 'bloobirds'}
          size="small"
          onClick={() => handleOnClick({ url, externalUrl, language: i18n.language })}
        >
          <Icon name={iconName} color={isHover ? 'darkBloobirds' : 'veryLightBloobirds'} />
        </Button>
      </Tooltip>
    </div>
  );
};

const LeftBarDropdownItem = ({
  label,
  url,
  iconName,
  isSmall,
  onClick,
}: LeftBarDropdownItemProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={clsx(styles.item_wrapper, {
        [styles.small_dropdown_item]: isSmall,
        [styles.medium_dropdown_item]: !isSmall,
      })}
    >
      <Item
        onClick={() => {
          if (onClick) {
            onClick();
          }
          if (url) {
            window.open(baseUrls[process.env.NODE_ENV] + url, '_blank');
          }
        }}
        icon={iconName}
        iconColor="verySoftPeanut"
      >
        <Text size={isSmall ? 'xxs' : 'xs'} color="peanut">
          {t(label)}
        </Text>
      </Item>
    </div>
  );
};

const handleOnClick = ({
  url,
  externalUrl,
  language,
}: {
  url?: string;
  externalUrl?: { [key: string]: string };
  language?: string;
}) => {
  if (externalUrl) {
    window.open(externalUrl[language], '_blank');
  }

  if (url) {
    window.open(baseUrls[process.env.NODE_ENV] + url, '_blank');
  }
};

const LeftBarDropdownHeader = ({
  name,
  shortname,
  color,
  isSmall,
  hideButtons,
  isAdmin,
}: LeftBarDropdownHeaderProps) => {
  const { settings } = useActiveUserSettings();
  const { t, i18n } = useTranslation();

  const userEmail = settings?.user?.email;

  return (
    <>
      <div
        className={clsx(styles.dropdown_header, {
          [styles.small_dropdown_header]: isSmall,
          [styles.medium_dropdown_header]: !isSmall,
        })}
        style={!isAdmin ? { minWidth: '216px' } : { justifyContent: 'space-between' }}
      >
        <div className={styles.username_container}>
          <CircularBadge
            size={isSmall ? 's' : 'm'}
            color="lightPeanut"
            style={{ color: color ? 'var(--white)' : 'var(--peanut)', fontSize: '9px' }}
            backgroundColor={color || 'lightPeanut'}
          >
            {shortname || 'U'}
          </CircularBadge>
          <Tooltip title={name?.length > 20 && name} position="top">
            <Text
              size={isSmall ? 'xs' : 's'}
              weight={isSmall ? 'medium' : 'bold'}
              ellipsis={20}
              color="bloobirds"
            >
              {name || ''}
            </Text>
          </Tooltip>
        </div>
        {hideButtons ? (
          <div style={{ display: 'flex', gap: '8px', flex: 1, justifyContent: 'flex-end' }}>
            {redirectButtonsDropdown(userEmail).map(
              ({ iconName, label, url, externalUrl }, idx) => (
                <Tooltip key={label + '-' + idx} title={t(label)} position="top">
                  <IconButton
                    name={iconName}
                    onClick={() => handleOnClick({ url, externalUrl, language: i18n.language })}
                  />
                </Tooltip>
              ),
            )}
          </div>
        ) : (
          <>
            <Button
              size="small"
              variant="secondary"
              iconLeft="questionCircle"
              uppercase={true}
              onClick={() =>
                handleOnClick({
                  ...helpButton(userEmail),
                  language: i18n.language,
                })
              }
            >
              {t('leftBar.footer.help')}
            </Button>
          </>
        )}
      </div>
      <div
        className={clsx(styles.dropdown_divider, { [styles.small_dropdown_divider]: isSmall })}
      />
    </>
  );
};

const DropdownBlock = ({
  title,
  items,
  isSmall,
  setVisible,
  withBorder = false,
  customItem,
}: {
  title: string;
  items: DropdownItem[];
  isSmall: boolean;
  setVisible: (visible: boolean) => void;
  withBorder?: boolean;
  customItem?: React.ReactNode;
}) => {
  return (
    <div className={clsx(styles.dropdown_block_container, { [styles.left_border]: withBorder })}>
      <Text
        size={isSmall ? 'xxs' : 'xs'}
        weight={isSmall ? 'medium' : 'bold'}
        className={clsx(styles.dropdown_header, {
          [styles.small_dropdown_header]: isSmall,
          [styles.medium_dropdown_header]: !isSmall,
        })}
      >
        {title}
      </Text>
      {items.map((props, idx) => (
        <LeftBarDropdownItem
          key={`${props?.label}-${idx}`}
          isSmall={isSmall}
          {...props}
          onClick={() => setVisible(false)}
        />
      ))}
      {customItem}
    </div>
  );
};

export const fetchLanguages = async () => {
  const result = await fetch(
    `https://delivery.localazy.com/_a7714004326121177803f2a33b98/_e0.json`,
  );

  const data = await result.json();
  const languages = [];

  for (const key in Object.values(data)) {
    const item = Object.values(data)[key];
    const locales = item['locales'];

    locales.forEach(locale => {
      let langCode = locale.language;
      if (locale.region) {
        langCode = langCode + '-' + locale.region;
      }

      if (!languages.includes(langCode)) {
        languages.push(langCode);
      }
    });
  }

  return languages;
};

const LanguagesDropdown = ({ isSmall }: { isSmall: boolean }) => {
  const { t, i18n } = useTranslation();
  const { ref, visible, setVisible } = useVisible(false);
  const [languages, setLanguages] = useState([]);
  const { createToast } = useToasts();
  const userId = useActiveUserId();

  useEffect(() => {
    fetchLanguages().then(languages => {
      setLanguages(languages);
    });
  }, []);

  const updateLanguage = (language: string) => {
    api
      .patch(`/utils/service/users/${userId}/language/${language}`, {})
      .then(() => {
        createToast({
          message: t('leftBar.successChangeLng', { language: t(`languages.${language}`) }),
          type: 'success',
        });
      })
      .catch(e => {
        createToast({
          message: t('leftBar.errorChangeLng', { language: t(`languages.${language}`) }),
          type: 'error',
        });
      });
  };

  return (
    <Dropdown
      ref={ref}
      visible={visible}
      anchor={
        <LeftBarDropdownItem
          key={'language'}
          isSmall={isSmall}
          iconName="timezones"
          onClick={() => {
            setVisible(true);
            mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CHANGE_LANGUAGE);
          }}
          label={`languages.${i18n.language}`}
        />
      }
      onClose={() => setVisible(false)}
    >
      <div className={styles._language_select}>
        <Text size="xxs" color="peanut">
          {t('languages.selectALanguage')}
        </Text>
        <RadioGroup
          value={i18n.language}
          onChange={value => {
            i18n.changeLanguage(value);
            updateLanguage(value);
            mixpanel.track(MIXPANEL_EVENTS.CHANGE_LANGUAGE);
          }}
          defaultValue={i18n.language}
        >
          {languages.map(language => (
            <Radio key={language} size="small" value={language} expand>
              {t(`languages.${language}`)}
            </Radio>
          ))}
        </RadioGroup>
      </div>
    </Dropdown>
  );
};

export const useVisibleDropdownLng = (initialState = false, anchorRef = { current: undefined }) => {
  const [visible, setVisible] = useState(initialState);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        ((anchorRef.current && !anchorRef.current.contains(event.target as Node)) ||
          !anchorRef.current) &&
        !['menuitem', 'menuitemradio', 'menuitemcheckbox', 'radio'].includes(
          // @ts-ignore
          event.target?.role,
        ) &&
        // @ts-ignore
        typeof event.target.className === 'string' &&
        // @ts-ignore
        !event.target.className?.includes('leftBarFooter') &&
        // @ts-ignore
        !event.target.className?.includes('BaseRadio')
      ) {
        setVisible(false);
      }
    }

    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, visible, setVisible } as const;
};

export const LeftBarUserDropdown = ({
  size = 'medium',
  hideButtons,
}: {
  size?: 'small' | 'medium';
  hideButtons: boolean;
}) => {
  const { settings } = useActiveUserSettings();
  const enabledChangeLanguage = true;
  const anchorRef = useRef(null);
  const { t } = useTranslation();
  const { ref, visible, setVisible } = useVisibleDropdownLng(false, anchorRef);
  const { name, shortname, color } = settings?.user || {};
  const isAdminUser =
    settings?.user?.roles?.includes(UserRole.GLOBAL_ADMIN) ||
    settings?.user?.roles?.includes(UserRole.ACCOUNT_ADMIN);

  const isSmall = size === 'small';

  return (
    <Dropdown
      ref={ref}
      arrow={false}
      visible={visible}
      position="right-end"
      width="100%"
      customStyles={{ marginLeft: '14px' }}
      anchor={
        <div
          style={{ cursor: 'pointer', display: 'flex', justifyContent: 'center' }}
          onClick={() => {
            setVisible(!visible);
          }}
          ref={anchorRef}
        >
          <CircularBadge
            size="m"
            color="lightPeanut"
            style={{
              color: color ? 'var(--white)' : 'var(--peanut)',
              fontSize: '9px',
              border: '1px solid white',
            }}
            backgroundColor={color || 'lightPeanut'}
          >
            {shortname || 'U'}
          </CircularBadge>
        </div>
      }
    >
      <LeftBarDropdownHeader
        name={name}
        shortname={shortname}
        color={color}
        isSmall={isSmall}
        hideButtons={hideButtons}
        isAdmin={isAdminUser}
      />
      <div className={styles.dropdown_wrapper}>
        <DropdownBlock
          title={t('leftBar.footer.userSettings')}
          items={userDropdownItems}
          isSmall={isSmall}
          setVisible={setVisible}
          customItem={enabledChangeLanguage ? <LanguagesDropdown isSmall={isSmall} /> : undefined}
        />
        {isAdminUser && (
          <DropdownBlock
            title={t('leftBar.footer.accountSettings')}
            items={accountDropdownItems}
            isSmall={isSmall}
            setVisible={setVisible}
            withBorder
          />
        )}
      </div>

      {/*<LeftBarDropdownFooter isSmall={isSmall} alignCenter={isAdminUser} />*/}
    </Dropdown>
  );
};
