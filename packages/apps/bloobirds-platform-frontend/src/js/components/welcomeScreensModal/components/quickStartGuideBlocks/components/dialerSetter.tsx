import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Text } from '@bloobirds-it/flamingo-ui';
import { useUserHelpers } from '@bloobirds-it/hooks';
import { UserHelperKeys, DialerType } from '@bloobirds-it/types';
import { api } from '@bloobirds-it/utils';

import {
  AircallSvg,
  AircallSvgDisabled,
  AstrolineSvg,
  JustCallSvgSettings,
  LogoSvg,
  NumintecSvg,
  RingoverSvg,
} from '../../../../../../assets/svg';
import { useEntity } from '../../../../../hooks';
import { useQuickStartEnabled } from '../../../../../hooks/useQuickStartGuide';
import { RestApi } from '../../../../../misc/api/rest';
import LogoCheckbox from '../../../../logoCheckbox';
import { useUserSettings, useUserSettingsReload } from '../../../../userPermissions/hooks';
import styles from './otoQSGSteps.module.css';

export const DIALER_TYPES_PROPS: Readonly<Record<
  DialerType,
  { logo: (disabled?: boolean) => JSX.Element; name: string }
>> = Object.freeze({
  [DialerType.BLOOBIRDS_DIALER]: {
    logo: () => <LogoSvg fill="var(--bloobirds)" />,
    name: 'Bloobirds',
  },
  [DialerType.AIRCALL_DIALER]: {
    logo: (disabled: boolean) => (disabled ? <AircallSvgDisabled /> : <AircallSvg />),
    name: 'Aircall',
  },
  [DialerType.JUST_CALL_DIALER]: {
    logo: () => <JustCallSvgSettings />,
    name: 'JustCall',
  },
  [DialerType.ASTROLINE_DIALER]: {
    logo: () => <AstrolineSvg />,
    name: 'Astroline',
  },
  [DialerType.NUMINTEC_DIALER]: {
    logo: () => <NumintecSvg />,
    name: 'Numintec',
  },
  [DialerType.RINGOVER_DIALER]: {
    logo: () => <RingoverSvg />,
    name: 'Ringover',
  },
});

function getDialerName(dialer: DialerType) {
  switch (dialer) {
    case DialerType.AIRCALL_DIALER:
      return 'Aircall';
    case DialerType.JUST_CALL_DIALER:
      return 'JustCall';
    case DialerType.BLOOBIRDS_DIALER:
      return 'Bloobirds';
    case DialerType.ASTROLINE_DIALER:
      return 'Astroline';
    case DialerType.NUMINTEC_DIALER:
      return 'Numintec';
    case DialerType.RINGOVER_DIALER:
      return 'Ringover';
    default:
      return 'Unknown';
  }
}

function needsUserMapping(
  dialer: DialerType,
  myAircallUser,
  myExternalUser,
  myNumintecUser,
  myRingoverUser,
) {
  return (
    (dialer === DialerType.AIRCALL_DIALER && !myAircallUser) ||
    (dialer === DialerType.NUMINTEC_DIALER && !myNumintecUser) ||
    (dialer === DialerType.ASTROLINE_DIALER && !myExternalUser) ||
    (dialer === DialerType.RINGOVER_DIALER && !myRingoverUser)
  );
}

type FormValues = {
  dialerSelected?: DialerType;
  enableLogCall?: boolean;
  autoChangePhoneExtension?: boolean;
  syncContactsSelected?: boolean;
};

export const DialerSetter = () => {
  const settings = useUserSettings();
  const activeUserId = settings?.user?.id;
  const { t } = useTranslation('translation', {
    keyPrefix: 'quickStartGuide.oto.blocks.dialer.content',
  });
  const hasQSGEnabled = useQuickStartEnabled();
  const { save } = useUserHelpers();
  const reloadSettings = useUserSettingsReload();
  const aircallUsers = useEntity('aircallUsers');
  const numintecUsers = useEntity('numintecUsers');
  const ringoverUsers = useEntity('ringoverUsers');
  const myAircallUser = aircallUsers?.findBy('bloobirdsUser')(activeUserId);
  const myNumintecUser = numintecUsers?.findBy('bloobirdsUser')(activeUserId);
  const myRingoverUser = ringoverUsers?.findBy('bloobirdsUser')(activeUserId);
  const externalUsers = useEntity('externalGenericUsers');
  const myExternalUser =
    externalUsers?.findBy('bloobirdsUser')(activeUserId)?.userType === 'ASTROLINE';
  const myAircallUserExists = aircallUsers?.all().some(user => user.bloobirdsUser === activeUserId);
  const dialerSelected = settings.user.dialerType;
  const availableDialers = settings.account.dialerTypes;

  const [values, setValues] = useState<FormValues>({
    dialerSelected,
    enableLogCall: settings.user.enableLogCall,
    autoChangePhoneExtension: settings.user.autoChangePhoneExtension,
    syncContactsSelected: myAircallUserExists && myAircallUser.syncContactsEnabled,
  });
  const dialerTypes = useEntity('dialerTypes');

  const handleChange = (data: FormValues) => {
    const dialerSelected = data?.dialerSelected ?? values?.dialerSelected;
    const enableLogCall = data?.enableLogCall ?? values?.enableLogCall;
    const autoChangePhoneExtension =
      data?.autoChangePhoneExtension ?? values?.autoChangePhoneExtension;
    const syncContactsEnabled = data?.syncContactsSelected ?? values?.syncContactsSelected;
    const dialerType = `dialerTypes/${
      dialerTypes.find(type => type.enumName === data?.dialerSelected).id
    }`;

    api
      .patch(`/entities/users/${activeUserId}`, {
        enableLogCall,
        dialerType,
        autoChangePhoneExtension,
      })
      .then(() => reloadSettings());

    if (dialerSelected === DialerType.AIRCALL_DIALER && myAircallUser?.id) {
      RestApi.patch({
        entity: 'aircallUsers',
        id: myAircallUser?.id,
        body: {
          syncContactsEnabled,
        },
      }).then(() => reloadSettings());
    }

    if (hasQSGEnabled) {
      save(UserHelperKeys.CHOOSE_DIALER);
      save(UserHelperKeys.SAVE_NUMBER_SETTINGS);
    }

    setValues(data);
  };

  useEffect(() => {
    if (availableDialers && availableDialers.includes(dialerSelected))
      save(UserHelperKeys.CHOOSE_DIALER);
  }, [dialerSelected]);

  return (
    <div>
      <div className={styles._dialers_row_container}>
        {availableDialers.map((dialer: DialerType) => (
          <LogoCheckbox
            key={dialer}
            disabled={needsUserMapping(
              dialer,
              myAircallUser,
              myExternalUser,
              myNumintecUser,
              myRingoverUser,
            )}
            disabledMessage={
              needsUserMapping(
                dialer,
                myAircallUser,
                myExternalUser,
                myNumintecUser,
                myRingoverUser,
              ) && t('disabledTooltip', { dialerName: getDialerName(dialer) })
            }
            value={dialer}
            {...DIALER_TYPES_PROPS[dialer]}
            onChange={(value: DialerType) => handleChange({ ...values, dialerSelected: value })}
            checked={dialer === values?.dialerSelected}
          />
        ))}
      </div>
      <div className={styles._dialers_wrapper}>
        <div className={styles._dialers_column_container}>
          <Text color="softPeanut" size="s" weight="medium">
            {t('logCallsManually.title')}
          </Text>
          <Checkbox
            checked={values.enableLogCall}
            onClick={value => handleChange({ ...values, enableLogCall: value })}
            size="small"
          >
            {t('logCallsManually.checkbox')}
          </Checkbox>
        </div>
        {values?.dialerSelected === DialerType.BLOOBIRDS_DIALER && (
          <div className={styles._dialers_column_container}>
            <Text color="softPeanut" size="s" weight="medium">
              {t('changePhoneManually.title')}
            </Text>

            <Checkbox
              checked={values?.autoChangePhoneExtension}
              onClick={value => handleChange({ ...values, autoChangePhoneExtension: value })}
              size="small"
            >
              {t('changePhoneManually.checkbox')}
            </Checkbox>
          </div>
        )}
        {values?.dialerSelected === DialerType.AIRCALL_DIALER && (
          <Checkbox
            checked={values?.syncContactsSelected}
            onClick={value => handleChange({ ...values, syncContactsSelected: value })}
            size="small"
            expand
          >
            {t('syncContactsAircall')}
          </Checkbox>
        )}
      </div>
    </div>
  );
};
