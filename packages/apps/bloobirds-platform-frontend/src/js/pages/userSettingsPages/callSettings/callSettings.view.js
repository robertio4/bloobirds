import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Button,
  Checkbox,
  Icon,
  Item,
  Radio,
  RadioGroup,
  Select,
  Text,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useIsOTOAccount } from '@bloobirds-it/hooks';
import { UserHelperKeys } from '@bloobirds-it/types';

import ConnectionCard from '../../../components/connectionCard';
import LogoCheckbox from '../../../components/logoCheckbox';
import { useUserSettings, useUserSettingsReload } from '../../../components/userPermissions/hooks';
import { useActiveUser, useEntity, usePhoneConnections, useRouter } from '../../../hooks';
import { useQuickStartEnabled } from '../../../hooks/useQuickStartGuide';
import { useUserHelpers } from '../../../hooks/useUserHelpers';
import { RestApi } from '../../../misc/api/rest';
import { api } from '../../../utils/api';
import AddPhoneModal from './addPhoneModal';
import { DIALER_TYPES_PROPS, INFO_TOOLTIP_TEXT } from './callSettings.constants';
import styles from './callSettings.module.css';

const CallSettings = () => {
  const [openAddPhoneModal, setOpenAddPhoneModal] = useState(false);
  const settings = useUserSettings();
  const hasQSGEnabled = useQuickStartEnabled();
  const { save } = useUserHelpers();
  const reloadSettings = useUserSettingsReload();
  const { activeUser } = useActiveUser();
  const { createToast } = useToasts();
  const isOTO = useIsOTOAccount();
  const aircallUsers = useEntity('aircallUsers');
  const numintecUsers = useEntity('numintecUsers');
  const ringoverUsers = useEntity('ringoverUsers');
  const myAircallUser = aircallUsers?.findBy('bloobirdsUser')(settings?.user.id);
  const myNumintecUser = numintecUsers?.findBy('bloobirdsUser')(settings?.user.id);
  const myRingoverUser = ringoverUsers?.findBy('bloobirdsUser')(settings?.user.id);
  const externalUsers = useEntity('externalGenericUsers');
  const myExternalUser =
    externalUsers?.findBy('bloobirdsUser')(settings?.user.id)?.userType === 'ASTROLINE';
  const myAircallUserExists = aircallUsers
    ?.all()
    .some(user => user.bloobirdsUser === settings?.user.id);
  const [dialerSelected, setDialerSelected] = useState(settings.user.dialerType);
  const [syncContactsSelected, setSyncContactsSelected] = useState(
    myAircallUserExists && myAircallUser.syncContactsEnabled,
  );
  const handleSelectDialerType = type => {
    setDialerSelected(type);
  };
  const dialerTypes = useEntity('dialerTypes');
  const defaultValues = {
    callMethod: settings.user.incomingCallsForwarding ? 'phone' : 'web',
    defaultView: settings.user.dialerDefaultView || 'webDialer',
    enableLogCall: settings.user.enableLogCall,
    autoChangePhoneExtension: settings.user.autoChangePhoneExtension,
    tabOnCall: settings.user.tabOnCall,
  };
  const { connections: phoneConnections } = usePhoneConnections();

  const { handleSubmit, control } = useForm({
    defaultValues,
  });

  const { history } = useRouter();

  const createIncomingCallsToast = () => {
    createToast({ type: 'success', message: 'Incoming calls method updated' });
  };

  const createDialerDefaulValueToast = () => {
    createToast({ type: 'success', message: 'Dialer default value updated' });
  };

  const onSubmit = async data => {
    const incomingCallsForwarding = data.callMethod === 'phone';
    const dialerDefaultView = data.defaultView;
    const enableLogCall = data.enableLogCall;
    const autoChangePhoneExtension = data.autoChangePhoneExtension;
    const dialerType = `dialerTypes/${
      dialerTypes.find(type => type.enumName === dialerSelected).id
    }`;
    const tabOnCall = data.tabOnCall;
    await api.patch(`/entities/users/${activeUser.id}`, {
      incomingCallsForwarding,
      dialerDefaultView,
      enableLogCall,
      dialerType,
      autoChangePhoneExtension,
      tabOnCall,
    });
    if (hasQSGEnabled) save(UserHelperKeys.SAVE_NUMBER_SETTINGS);

    if (defaultValues.callMethod !== data.callMethod) createIncomingCallsToast();

    if (defaultValues.defaultView !== data.dialerDefaultView) createDialerDefaulValueToast();

    if (dialerSelected === 'AIRCALL_DIALER') {
      RestApi.patch({
        entity: 'aircallUsers',
        id: myAircallUser?.id,
        body: {
          syncContactsEnabled: syncContactsSelected,
        },
      }).then(() => history.go(0));
    }

    if (dialerSelected === 'JUST_CALL_DIALER' || dialerSelected === 'ASTROLINE_DIALER') {
      history.go(0);
    }

    reloadSettings();
  };

  function getDialerName(dialer) {
    switch (dialer) {
      case 'AIRCALL_DIALER':
        return 'Aircall';
      case 'JUST_CALL_DIALER':
        return 'JustCall';
      case 'BLOOBIRDS_DIALER':
        return 'Bloobirds';
      case 'ASTROLINE_DIALER':
        return 'Astroline';
      case 'NUMINTEC_DIALER':
        return 'Numintec';
      case 'RINGOVER_DIALER':
        return 'Ringover';
      default:
        return 'Unknown';
    }
  }

  function needsUserMapping(dialer, myAircallUser, myExternalUser, myNumintecUser, myRingoverUser) {
    return (
      (dialer === 'AIRCALL_DIALER' && !myAircallUser) ||
      (dialer === 'NUMINTEC_DIALER' && !myNumintecUser) ||
      (dialer === 'ASTROLINE_DIALER' && !myExternalUser) ||
      (dialer === 'RINGOVER_DIALER' && !myRingoverUser)
    );
  }

  return (
    <div className={styles._container} data-intercom="user-settings-page-call">
      <div className={styles._content__box}>
        <div className={styles._section__box}>
          <Text size="m" color="softPeanut" htmlTag="span">
            Dialer by default
          </Text>
          <div className={styles._checkboxes__container}>
            {settings.account.dialerTypes.map(dialer => (
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
                  ) &&
                  `Your user does not have an ${getDialerName(
                    dialer,
                  )} user mapped, ask your admin to assign one!`
                }
                value={dialer}
                {...DIALER_TYPES_PROPS[dialer]}
                onChange={handleSelectDialerType}
                checked={dialer === dialerSelected}
              />
            ))}
          </div>
        </div>
        {dialerSelected === 'BLOOBIRDS_DIALER' && (
          <div className={styles._section__box}>
            <div className={styles._title__container}>
              <div className={styles._title__content}>
                <Text size="m" color="softPeanut" htmlTag="span">
                  Your connected private phone numbers
                </Text>
              </div>
              <Tooltip title={INFO_TOOLTIP_TEXT} position="top">
                <Icon color="darkBloobirds" name="infoFilled" />
              </Tooltip>
              <div className={styles._add_phone__container}>
                <Button
                  iconLeft="plus"
                  variant="secondary"
                  size="small"
                  onClick={() => setOpenAddPhoneModal(true)}
                >
                  Add phone
                </Button>
              </div>
            </div>
            {phoneConnections?.list?.length > 0 ? (
              <div className={styles._connections_container}>
                {phoneConnections.list.map(connection => (
                  <ConnectionCard
                    data={connection}
                    key={`phone-${connection.phoneNumber}`}
                    type="phone"
                    isDefault={
                      phoneConnections?.defaultConnection?.phoneNumber &&
                      connection.phoneNumber === phoneConnections?.defaultConnection.phoneNumber
                    }
                  />
                ))}
              </div>
            ) : (
              <>
                <Text color="softPeanut" size="s">
                  You don&apos;t have connected phone numbers
                </Text>
              </>
            )}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className={styles._form__container}>
          {dialerSelected === 'BLOOBIRDS_DIALER' && (
            <div className={styles._section__box}>
              <div className={styles._form__box}>
                <div className={styles._heading__wrapper}>
                  <Text color="softPeanut" size="m" weight="medium">
                    How do you want to receive incoming calls?
                  </Text>
                </div>
                <div className={styles._selector__wrapper}>
                  <Controller
                    name="callMethod"
                    control={control}
                    as={
                      <Select width="448px">
                        <Item value="web">By web dialer</Item>
                        {phoneConnections?.defaultConnection && (
                          <Item value="phone">
                            {`By phone call (${phoneConnections?.defaultConnection?.phoneNumber})`}
                          </Item>
                        )}
                      </Select>
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {dialerSelected === 'AIRCALL_DIALER' && (
            <div className={styles._section__box}>
              <div className={styles._form__box}>
                <div className={styles._heading__wrapper}>
                  <Checkbox
                    checked={syncContactsSelected}
                    onClick={value => setSyncContactsSelected(value)}
                  >
                    Sync your contacts from Bloobirds to{' '}
                    {dialerSelected === 'AIRCALL_DIALER' ? 'Aircall' : 'Astroline'}
                  </Checkbox>
                </div>
              </div>
            </div>
          )}
          <div className={styles._section__box}>
            <div className={styles._form__box}>
              <div className={styles._heading__wrapper}>
                <Text color="softPeanut" size="m" weight="medium">
                  Do you want to be able to log calls manually from the dialer?
                </Text>
              </div>
              <div className={styles._checkbox__wrapper}>
                <Controller
                  name="enableLogCall"
                  control={control}
                  render={({ onChange, value }) => (
                    <Checkbox checked={value} onClick={onChange}>
                      Enable call log view manually
                    </Checkbox>
                  )}
                />
              </div>
            </div>
            {dialerSelected === 'BLOOBIRDS_DIALER' && (
              <div className={styles._form__box}>
                <div className={styles._heading__wrapper}>
                  <Text color="softPeanut" size="m" weight="medium">
                    Select the dialer default view
                  </Text>
                </div>
                <div className={styles._selector__wrapper}>
                  <Controller
                    name="defaultView"
                    control={control}
                    render={({ onChange, value }) => (
                      <Select width="448px" onChange={onChange} value={value}>
                        <Item value="webDialer">Call by web dialer</Item>
                        <Item value="logCall">Log calls manually</Item>
                      </Select>
                    )}
                  />
                </div>
              </div>
            )}
            {dialerSelected === 'BLOOBIRDS_DIALER' && (
              <div className={styles._form__box}>
                <div className={styles._heading__wrapper}>
                  <Text color="softPeanut" size="m" weight="medium">
                    Automatically change the user’s phone to one that matches the lead’s phone
                    extension if available
                  </Text>
                </div>
                <div className={styles._checkbox__wrapper}>
                  <Controller
                    name="autoChangePhoneExtension"
                    control={control}
                    render={({ onChange, value }) => (
                      <Checkbox checked={value} onClick={onChange}>
                        Auto-change phone extension
                      </Checkbox>
                    )}
                  />
                </div>
              </div>
            )}
            {!isOTO && (
              <div className={styles._form__box}>
                <div className={styles._heading__wrapper}>
                  <Text color="softPeanut" size="m" weight="medium">
                    Select the view you want to see when making a call
                  </Text>
                </div>
                <div className={styles._radioGroup__wrapper}>
                  <Controller
                    name="tabOnCall"
                    control={control}
                    render={({ onChange, value }) => (
                      <RadioGroup onChange={onChange} value={value}>
                        <Radio value="PITCHES">Pitches in Messaging</Radio>
                        <Radio value="ACTIVITIES">Activity feed</Radio>
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
          <div className={styles._buttons__container}>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
        {openAddPhoneModal && (
          <AddPhoneModal open handleClose={() => setOpenAddPhoneModal(false)} />
        )}
      </div>
    </div>
  );
};

export default CallSettings;
