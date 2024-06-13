import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, IconButton, Spinner } from '@bloobirds-it/flamingo-ui';
import { useActiveUserId, useActiveUserSettings } from '@bloobirds-it/hooks';
import { NoteForm } from '@bloobirds-it/notes';
import { ACTIVITY_FIELDS_LOGIC_ROLE, Settings, UserRole } from '@bloobirds-it/types';
import { getFieldByLogicRole } from '@bloobirds-it/utils';
import clsx from 'clsx';

import { useDialer, useDialerStore } from '../dialer';
import styles from './dialerExtendedScreen.module.css';
import { DialerPlaybookFeed } from './playbook/dialerPlaybook';

function PlaybookExtendedScreen(props: {
  settings: Settings;
  rightOpen: boolean;
  handleOnClose: () => void;
  showAutoSetting: (value: ((prevState: boolean) => boolean) | boolean) => void;
  userId: any;
  adminUser: boolean;
  showAutoSetting1: boolean;
  checked: boolean;
  onClick: (newSetting: boolean) => Promise<void>;
}) {
  const { t } = useTranslation();

  return (
    <>
      <div className={styles.content}>
        <DialerPlaybookFeed
          accountId={props.settings?.account.id}
          isRightOpen={props.rightOpen}
          handleOnClose={props.handleOnClose}
          setShowAutoSetting={props.showAutoSetting}
          userId={props.userId}
          isAdminUser={props.adminUser}
        />
      </div>
      {props.showAutoSetting1 && (
        <div className={styles.checkbox}>
          <Checkbox
            color="purple"
            backgroundColor="lightPurple"
            size="small"
            expand
            checked={props.checked}
            onClick={props.onClick}
          >
            {t('dialer.extendedScreen.autoOpen')}
          </Checkbox>
        </div>
      )}
    </>
  );
}

function NoteExtendedScreen({
  rightOpen,
  handleOnClose,
}: {
  rightOpen: boolean;
  handleOnClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const activity = useDialer(state => state.activity);
  const { t } = useTranslation();

  if (!activity) {
    return null;
  }

  const activityType = getFieldByLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.TYPE)
    ?.valueLogicRole;

  return (
    <div className={styles.notesContent}>
      <div
        className={clsx(styles.header, {
          [styles.headerLeft]: !rightOpen,
          [styles.headerRight]: rightOpen,
        })}
        {...(rightOpen ? { style: { flexDirection: 'row-reverse' } } : {})}
      >
        {isLoading ? (
          <Spinner size={24} name="loadingCircle" color="softPeanut" />
        ) : (
          <IconButton name="cross" color="bloobirds" onClick={handleOnClose} />
        )}
      </div>
      <NoteForm
        activityId={activity?.id}
        activityType={activityType}
        accountId={activity?.id.accountId}
        showFooter={false}
        fitAllHeight={true}
        title={t('dialer.extendedScreen.note')}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export const DialerExtendedContent = ({
  isRightOpen,
  handleOnClose,
}: {
  isRightOpen: boolean;
  handleOnClose: () => void;
}) => {
  const { settings, mutate, saveUserSettings } = useActiveUserSettings();
  const autoOpenPitchesInDialer = settings?.user?.autoOpenPitchesInDialer;
  const userId = useActiveUserId();
  const userRoles = settings?.user?.roles;
  const isAdminUser =
    userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const { setAutoOpenPitchesInDialer } = useDialerStore();
  const [showAutoSetting, setShowAutoSetting] = useState(true);

  const extendedScreenType = useDialer(state => state.extendedScreenType);

  const setAutoOpenPitchesInDialerSetting = (newSetting: boolean) =>
    saveUserSettings(userId, { autoOpenPitchesInDialer: newSetting }).then(() => {
      mutate();
      setAutoOpenPitchesInDialer(newSetting);
    });

  return (
    <>
      <div
        className={clsx(styles.container, {
          [styles.containerPadding]: showAutoSetting && extendedScreenType !== 'notes',
        })}
      >
        {extendedScreenType === 'pitches' && (
          <PlaybookExtendedScreen
            settings={settings}
            rightOpen={isRightOpen}
            handleOnClose={handleOnClose}
            showAutoSetting={setShowAutoSetting}
            userId={userId}
            adminUser={isAdminUser}
            showAutoSetting1={showAutoSetting}
            checked={autoOpenPitchesInDialer}
            onClick={setAutoOpenPitchesInDialerSetting}
          />
        )}
        {extendedScreenType === 'notes' && (
          <NoteExtendedScreen rightOpen={isRightOpen} handleOnClose={handleOnClose} />
        )}
      </div>
    </>
  );
};
