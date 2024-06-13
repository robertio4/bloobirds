import React, { useRef, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { Avatar, Button, Input, Item, Select, Text, useToasts } from '@bloobirds-it/flamingo-ui';

import { ColorPicker } from '../../../components/colorPicker/index';
import { useUserSettingsReload } from '../../../components/userPermissions/hooks';
import { useTimeZones } from '../../../hooks/useTimeZones';
import { ServiceApi } from '../../../misc/api/service';
import styles from './personalDetails.module.css';
import TimeZoneChangeModal from './timeZoneChangeModal.view';

const submitEmail = (inputEmail, onSubmit, setIsSubmittingEmail, setNewEmailSubmitted) => {
  ServiceApi.request({
    url: '/service/users/me/updateEmail',
    method: 'POST',
    body: { email: inputEmail },
  })
    .then(() => {
      if (onSubmit) {
        onSubmit?.();
      }
      setIsSubmittingEmail(false);
      setNewEmailSubmitted(true);
    })
    .catch(() => {
      setIsSubmittingEmail(false);
    });
};

const needsEmailUpdate = (emailValue, email) => emailValue !== '' && emailValue !== email;

const PersonalDetails = ({ userSettings }) => {
  const originalTimeZoneValue = userSettings.timeZone;
  const defaultValues = {
    timeZone: originalTimeZoneValue,
    name: userSettings.name,
    shortname: userSettings.shortname,
    color: userSettings.color,
  };
  const methods = useForm({ defaultValues });
  const { isDirty, errors } = methods.formState;
  const [open, setOpen] = useState(false);
  const timeZones = useTimeZones();
  const { createToast } = useToasts();
  const userSettingsReload = useUserSettingsReload();
  const email = userSettings?.email;
  const [newEmailSubmitted, setNewEmailSubmitted] = useState(false);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState();
  const parentRef = useRef();

  // Will be needed for PP00 User Story
  // https://www.notion.so/bloobirdsproduct/Profile-Photo-59f56cfb68bf4275add3723d837c7571?p=2e8048d1a7ac4444914d59b283ca3ce1&pm=s
  /*const [ref, isHover] = useHover();
  const { connections } = useEmailConnections();
  const fileInputRef = useRef(null);
  const [avatarImg, setAvatarImg] = useState(
    'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
  );*/

  const onSubmit = () => {
    const emailValue = methods.getValues().email;
    if (needsEmailUpdate(emailValue, email)) {
      submitEmail(emailValue, userSettingsReload, setIsSubmittingEmail, setNewEmailSubmitted);
    }

    if (methods.getValues().timeZone !== originalTimeZoneValue) {
      setOpen(true);
    } else {
      ServiceApi.request({
        url: '/service/users/me',
        method: 'POST',
        body: { ...methods.getValues() },
      })
        .then(() => {
          createToast({ type: 'success', message: 'Your settings have been updated!' });
          userSettingsReload();
        })
        .catch(() => {
          createToast({
            type: 'error',
            message: 'There was an error saving your personal settings!',
          });
          setOpen(false);
        });
    }
  };

  const timeZoneSubmit = () => {
    ServiceApi.request({
      url: '/service/users/me',
      method: 'POST',
      body: { ...methods.getValues() },
    })
      .then(() => {
        createToast({ type: 'success', message: 'Your settings have been updated!' });
        setOpen(false);
        userSettingsReload();
      })
      .catch(() => {
        createToast({
          type: 'error',
          message: 'There was an error saving your personal settings!',
        });
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Will be needed for PP00 User Story
  // https://www.notion.so/bloobirdsproduct/Profile-Photo-59f56cfb68bf4275add3723d837c7571?p=2e8048d1a7ac4444914d59b283ca3ce1&pm=s
  /*const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Check if reader result is not null before setting the state
        if (reader.result) {
          setAvatarImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleRemoveImage = () => {
    setAvatarImg(null);
    fileInputRef.current.value = null;
  };

  const handleAvatarClick = () => {
    // Trigger the click event of the hidden file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };*/

  return (
    <>
      <FormProvider {...methods}>
        <div className={styles._container} data-intercom="user-settings-page-personal-details">
          <div className={styles._content}>
            <div className={styles._sectionVertical}>
              <div className={styles._timezone_title}>
                <Text color="softPeanut" size="m">
                  Personal details
                </Text>
              </div>
              <div className={styles._header_wrapper}>
                {/*Temporal approach, should be replaced commented component*/}
                <Avatar
                  size="superlarge"
                  color="white"
                  backgroundColor={userSettings?.color}
                  ref={parentRef}
                >
                  {userSettings?.shortname}
                </Avatar>
                {/*Following component includes image management*/}
                {/*<div ref={ref}>
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                <CompoundIcon
                  position="top-right"
                  parent={
                    <Tooltip
                          position="bottom"
                          title={avatarImg ? 'Replace photo' : 'Add photo'}
                        >
                          <span style={{ cursor: 'pointer' }} onClick={handleAvatarClick}>
                    <Avatar
                      size="superlarge"
                      color="white"
                      backgroundColor={userSettings?.color}
                      ref={parentRef}
                      image={avatarImg}
                    >
                      {avatarImg ? '' : userSettings?.shortname}
                    </Avatar>
                    </span>
                        </Tooltip>
                  }
                  parentRef={parentRef}
                >
                  isHover && avatarImg && (
                        <Tooltip position="bottom" title="Remove photo">
                          <span style={{ cursor: 'pointer' }} onClick={handleRemoveImage}>
                            <CircularBadge
                              size="s"
                              color="bloobirds"
                              style={{ border: '2px solid #faf9fc', margin: '8px 8px 0 0' }}
                            >
                              <Icon name="cross" color="white" />
                            </CircularBadge>
                          </span>
                        </Tooltip>
                      )
                </CompoundIcon>
                </>
                </div>*/}

                <div>
                  <Controller
                    name="name"
                    render={({ onChange, value }) => (
                      <Input
                        id="personal-details-name-field"
                        width="100%"
                        label="Name"
                        onChange={onChange}
                        value={value}
                        variant="outlined"
                      />
                    )}
                  />
                  <div className={styles._sectionHorizontal}>
                    <Controller
                      name="shortname"
                      render={({ onChange, value }) => (
                        <Input
                          onChange={onChange}
                          value={value}
                          width={176}
                          label="Shortname"
                          variant="outlined"
                        />
                      )}
                    />
                    <Controller
                      name="color"
                      render={({ onChange, value }) => (
                        <ColorPicker
                          onChange={onChange}
                          value={value}
                          label="Color"
                          variant="outlined"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className={styles._timezone_title}>
                  <Text color="softPeanut" size="m">
                    Time Zone
                  </Text>
                </div>
                <Controller
                  name="timeZone"
                  render={({ onChange, value }) => (
                    <Select
                      onChange={onChange}
                      value={value}
                      width="100%"
                      placeholder="Time Zone"
                      autocomplete
                    >
                      {timeZones?.map(tz => (
                        <Item label={tz.name} key={tz.location} value={tz.location}>
                          {tz.name}
                        </Item>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className={styles._form__box}>
                <div className={styles._timezone_title}>
                  <Text color="softPeanut" size="m">
                    Change email
                  </Text>
                </div>
                <Text color="peanut" size="s">
                  Your email address is currently <b>{email}</b>
                </Text>
                <Controller
                  name="email"
                  render={({ onChange, value }) => (
                    <Input
                      placeholder="New email address"
                      name="email"
                      onChange={onChange}
                      value={value}
                      innerRef={methods.register({
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: 'Must be a valid email',
                        },
                      })}
                      error={errors.email && 'Must be a valid email'}
                      width="100%"
                    />
                  )}
                />
              </div>
              {newEmailSubmitted && !isSubmittingEmail && (
                <Text color="peanut" size="s">
                  We&apos;ve sent a verification email to the new email. Once it is verified it will
                  be set as as your email.
                </Text>
              )}
            </div>
            <div>
              <Button
                variant="primary"
                expand
                disabled={!isDirty}
                onClick={methods.handleSubmit(onSubmit)}
              >
                save changes
              </Button>
            </div>
          </div>
        </div>
        <TimeZoneChangeModal
          open={open}
          close={handleClose}
          name={methods.getValues().timeZone}
          save={methods.handleSubmit(timeZoneSubmit)}
        />
      </FormProvider>
    </>
  );
};

export default PersonalDetails;
