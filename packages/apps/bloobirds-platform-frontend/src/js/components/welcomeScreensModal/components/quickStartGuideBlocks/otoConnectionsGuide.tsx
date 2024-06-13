import React, { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  Button,
  ColorType,
  ExpandableBox,
  ExpandableStep,
  IconType,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserSettings, useUserHelpers } from '@bloobirds-it/hooks';
import { UserHelperKeys, UserRole, CRM } from '@bloobirds-it/types';
import clsx from 'clsx';
import { TFunction } from 'i18next';

import { useQuickStartGuideCompleted } from '../../../../hooks/useQuickStartGuide';
import { getIsCompleted } from '../../../../pages/homePage/components/quickStartGuide/quickStartGuide.utils';
import { useUserSettings } from '../../../userPermissions/hooks';
import { ConnectToSFDC } from './components/connectSalesforce';
import { DialerSetter } from './components/dialerSetter';
import { EmailSetter } from './components/emailSetter';
import OpenExtension from './components/openExtension';
import { RemindersSetter } from './components/reminderSetter';
import { TimezoneSetter } from './components/timezoneSetter';
import styles from './otoConnectionsGuide.module.css';

export type QuickStartGuideBlock = {
  title: string;
  key: UserHelperKeys;
  icon: IconType;
  iconColor: ColorType;
  action?: { label: string; key: UserHelperKeys };
  skipButtonText?: string;
};

export const qsgTourKeys: (t: TFunction, hasEmail?: boolean) => Array<QuickStartGuideBlock> = (
  t: TFunction,
  hasEmail = false,
) => {
  return [
    {
      title: t('quickStartGuide.oto.blocks.dialer.title'),
      key: UserHelperKeys.CHOOSE_DIALER,
      icon: 'phone' as IconType,
      iconColor: 'bloobirds' as ColorType,
      skipButtonText: t('quickStartGuide.oto.blocks.dialer.skipButtonText'),
    },
    {
      title: hasEmail
        ? t('quickStartGuide.oto.blocks.email.titleSignature')
        : t('quickStartGuide.oto.blocks.email.title'),
      key: UserHelperKeys.SET_YOUR_EMAIL_SIGNATURE,
      icon: 'mail' as IconType,
      iconColor: 'bloobirds' as ColorType,
      skipButtonText: hasEmail
        ? t('quickStartGuide.oto.blocks.email.skipButtonTextSignature')
        : t('quickStartGuide.oto.blocks.email.skipButtonText'),
    },
    {
      title: t('quickStartGuide.oto.blocks.taskAndReminders.title'),
      key: UserHelperKeys.SET_UP_REMINDERS,
      icon: 'taskAction' as IconType,
      iconColor: 'bloobirds' as ColorType,
      skipButtonText: t('quickStartGuide.oto.blocks.taskAndReminders.skipButtonText'),
    },
    {
      title: t('quickStartGuide.oto.blocks.timezone.title'),
      key: UserHelperKeys.SET_TIMEZONE,
      icon: 'timezones' as IconType,
      iconColor: 'bloobirds' as ColorType,
      skipButtonText: t('quickStartGuide.oto.blocks.timezone.skipButtonText'),
    },
    {
      title: t('quickStartGuide.oto.blocks.sfdc.title'),
      key: UserHelperKeys.CONNECT_SALESFORCE,
      icon: 'salesforceOutlined' as IconType,
      iconColor: 'bloobirds' as ColorType,
      skipButtonText: t('quickStartGuide.oto.blocks.sfdc.skipButtonText'),
    },
    {
      title: t('quickStartGuide.oto.blocks.start.title'),
      key: UserHelperKeys.DOWNLOAD_CHROME_EXTENSION,
      icon: 'chrome' as IconType,
      iconColor: 'bloobirds' as ColorType,
    },
  ];
};

const StepContent = ({
  type,
  handleFinish,
  allTasksCompleted,
}: {
  type: typeof qsgTourKeys[number]['key'];
  handleFinish: () => void;
  allTasksCompleted: boolean;
}) => {
  switch (type) {
    case UserHelperKeys.DOWNLOAD_CHROME_EXTENSION:
      return <OpenExtension handleFinish={handleFinish} allTasksCompleted={allTasksCompleted} />;
    case UserHelperKeys.SET_YOUR_EMAIL_SIGNATURE:
      return <EmailSetter />;
    case UserHelperKeys.CONNECT_SALESFORCE:
      return <ConnectToSFDC />;
    case UserHelperKeys.SET_TIMEZONE:
      return <TimezoneSetter />;
    case UserHelperKeys.CHOOSE_DIALER:
      return <DialerSetter />;
    case UserHelperKeys.SET_UP_REMINDERS:
      return <RemindersSetter />;
    default:
      return <></>;
  }
};

const Steps = ({ handleFinish, isHomePage }: { handleFinish: () => void; isHomePage: boolean }) => {
  const { userHelpers }: { userHelpers: Record<UserHelperKeys, Date> } = useUserSettings();
  const { settings } = useActiveUserSettings();
  const { has, save } = useUserHelpers();
  const { t } = useTranslation();
  const stepsKeys = qsgTourKeys(t).map(step => step.key);
  const hasSalesforceConnected = settings?.account?.salesforceInstance;
  const userRoles = settings?.user?.roles;
  const isAdmin =
    userRoles?.includes(UserRole.GLOBAL_ADMIN) || userRoles?.includes(UserRole.ACCOUNT_ADMIN);
  const shouldNotShowSFDCStep =
    !isAdmin || hasSalesforceConnected || settings?.account?.mainCrm !== CRM.SALESFORCE;
  const [steps, setSteps] = useState({
    steps: qsgTourKeys,
    opened: UserHelperKeys.CHOOSE_DIALER,
  });
  const allTasksCompleted = [
    ...(shouldNotShowSFDCStep ? [] : [UserHelperKeys.CONNECT_SALESFORCE]),
    UserHelperKeys.SET_TIMEZONE,
    UserHelperKeys.CHOOSE_DIALER,
    UserHelperKeys.SET_YOUR_EMAIL_SIGNATURE,
    UserHelperKeys.SET_UP_REMINDERS,
  ].every(key => has(key));

  const autoOpenStepsKeys = [
    UserHelperKeys.CONNECT_SALESFORCE,
    UserHelperKeys.DOWNLOAD_CHROME_EXTENSION,
  ];

  useEffect(() => {
    const openedStep = autoOpenStepsKeys.find(s => {
      const previousStep = stepsKeys[stepsKeys.indexOf(s) - 1];
      return Object.keys(userHelpers).includes(previousStep);
    });
    setSteps({ ...steps, ...(openedStep ? { opened: openedStep } : {}) });
  }, [userHelpers.CONNECT_SALESFORCE, userHelpers.SET_UP_REMINDERS]);

  return (
    <div key={steps.opened}>
      {steps.steps(t, !!userHelpers?.CONNECT_EMAIL).map(step => {
        const isCompleted = getIsCompleted(userHelpers, step.key, {}) || has(step.key);

        return shouldNotShowSFDCStep && step.key === UserHelperKeys.CONNECT_SALESFORCE ? null : (
          <Tooltip
            title={
              step.key === UserHelperKeys.DOWNLOAD_CHROME_EXTENSION &&
              !allTasksCompleted &&
              t('quickStartGuide.oto.blocks.start.completeSteps')
            }
            position="top"
          >
            <ExpandableStep
              key={step.key}
              progressPercentage={isCompleted ? 100 : 0}
              defaultOpened={
                !isCompleted &&
                (autoOpenStepsKeys?.includes(step.key) ? steps.opened === step.key : false)
              }
              button={
                step.key !== UserHelperKeys.DOWNLOAD_CHROME_EXTENSION &&
                !isHomePage && (
                  <Button
                    variant="secondary"
                    size="small"
                    uppercase={false}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      save(step.key);
                    }}
                  >
                    {step.skipButtonText}
                  </Button>
                )
              }
              {...(step.key === UserHelperKeys.SET_UP_REMINDERS
                ? { onClick: () => save(UserHelperKeys.SET_UP_REMINDERS) }
                : {})}
              isDisabled={
                step.key === UserHelperKeys.DOWNLOAD_CHROME_EXTENSION && !allTasksCompleted
              }
              {...step}
            >
              <StepContent
                type={step.key}
                handleFinish={handleFinish}
                allTasksCompleted={allTasksCompleted}
              />
            </ExpandableStep>
          </Tooltip>
        );
      })}
    </div>
  );
};

export const OTOConnectionsGuide = React.forwardRef(
  (
    {
      handleFinish,
      isHomePage = false,
      ...props
    }: { handleFinish: () => void; isHomePage?: boolean },
    ref: React.LegacyRef<HTMLDivElement>,
  ) => {
    const isQSGCompleted = useQuickStartGuideCompleted();
    const { t } = useTranslation('translation', { keyPrefix: 'quickStartGuide.oto' });

    return isHomePage ? (
      <div ref={ref} {...props} style={{ margin: 8 }}>
        <ExpandableBox
          defaultOpened={isHomePage ? !isQSGCompleted : true}
          nonCollapsable={!isHomePage}
          title={t('title')}
          subtitle={!isQSGCompleted && <Trans i18nKey="quickStartGuide.oto.subtitle" />}
          progressPercentage={isQSGCompleted ? 100 : 0}
          progressText={isQSGCompleted && t('progressText')}
        >
          <OTOConnectionsGuideContent handleFinish={handleFinish} isHomePage={isHomePage} />
        </ExpandableBox>
      </div>
    ) : (
      <div className={styles.WSContainer}>
        <Text size="s" align="center" color="softPeanut">
          <Trans i18nKey="quickStartGuide.oto.subtitle" />
        </Text>
        <OTOConnectionsGuideContent handleFinish={handleFinish} isHomePage={isHomePage} />
      </div>
    );
  },
);

export const OTOConnectionsGuideContent = ({
  handleFinish,
  isHomePage = false,
}: {
  handleFinish: () => void;
  isHomePage?: boolean;
}) => (
  <div className={clsx(styles.qsgContainer, { [styles.qsgContainerWS]: !isHomePage })}>
    <Steps handleFinish={handleFinish} isHomePage={isHomePage} />
  </div>
);
