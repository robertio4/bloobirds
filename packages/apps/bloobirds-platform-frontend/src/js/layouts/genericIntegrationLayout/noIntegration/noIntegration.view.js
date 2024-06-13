import React, { useState, useEffect } from 'react';
import { useForm, Controller, FormProvider } from 'react-hook-form';

import { Input } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId } from '@bloobirds-it/hooks';

import NoIntegrationPage from '../../integrationLayout/noIntegrationPage/noIntegrationPage.view';
import styles from './noIntegration.module.css';

const NoIntegrationView = ({
  crm,
  fields,
  isSubmitting,
  isConnected,
  activeIntegration,
  createIntegration,
}) => {
  const accountId = useActiveAccountId();
  const [error, setIntegrationError] = useState(undefined);
  const defaultValues = fields?.reduce(
    (acc, cur) => ({ ...acc, [cur.inputName]: cur.defaultValue }),
    {},
  );
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setError,
    errors,
    clearErrors,
    getValues,
    setValue,
    formState,
    trigger,
    unregister,
  } = useForm({
    defaultValues,
  });
  const [disabled, setDisabled] = useState(true);
  const formInputs = watch(fields?.map(field => field.inputName));

  useEffect(() => {
    const foundEmpty = Object.values(formInputs)?.find(input => {
      return input === '';
    });
    setDisabled(foundEmpty === '');
  }, [formInputs]);

  const onSubmit = () => {
    createIntegration({ ...formInputs, accountId }, activeInt => {
      if (activeInt?.hasError) {
        setIntegrationError(activeInt?.message);
        for (const [key, value] of Object.entries(formInputs)) {
          setValue(key, value, {
            shouldValidate: true,
          });
        }
      } else {
        reset(defaultValues);
      }
    });
  };

  return (
    <NoIntegrationPage
      crm={crm}
      link="https://support.bloobirds.com/hc/en-us/articles/360017716300"
      onSubmit={handleSubmit(onSubmit)}
      handleError={setIntegrationError}
      error={error}
      isSubmiting={isSubmitting}
      isConnected={isConnected}
      disabled={disabled}
      activeIntegration={activeIntegration.hasLoaded}
    >
      <FormProvider
        watch={watch}
        control={control}
        clearErrors={clearErrors}
        setError={setError}
        handleSubmit={handleSubmit(onSubmit)}
        errors={errors}
        reset={reset}
        formState={formState}
        getValues={getValues}
        register={register}
        setValue={setValue}
        trigger={trigger}
        unregister={unregister}
      >
        <div className={styles._input_group}>
          {fields?.map(field => {
            return (
              <Controller
                key={field?.name}
                render={({ onChange, value }) => (
                  <Input
                    placeholder={field.placeholder}
                    onChange={onChange}
                    value={value}
                    error={error ? true : false}
                    innerRef={register({
                      required: true,
                    })}
                    width="100%"
                    type={field?.inputType}
                  />
                )}
                control={control}
                name={field?.inputName}
              />
            );
          })}
        </div>
      </FormProvider>
    </NoIntegrationPage>
  );
};
export default NoIntegrationView;
