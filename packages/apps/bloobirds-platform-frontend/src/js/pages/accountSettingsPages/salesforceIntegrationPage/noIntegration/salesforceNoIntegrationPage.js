import React, { useState } from 'react';
import NoIntegrationPage from '../../../../layouts/integrationLayout/noIntegrationPage';
import { Input } from '@bloobirds-it/flamingo-ui';
import { useSalesforceIntegration } from '../../../../hooks/useSalesforceIntegration';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import styles from './salesforceNoIntegrationPage.module.css';
import { CRM } from '../../../../constants/integrations';
import { useRouteMatch } from 'react-router';
import { APP_ACCOUNT_INTEGRATION_SALESFORCE_OAUTH } from '../../../../app/_constants/routes';
import OauthSalesforceReceiver from '../oauthReciver/oauthSalesforceReciever.view';
import { SalesforceNoLogsTooltip } from '../../../../components/discoveryTooltips/integrationSalesforceTooltips/salesforceNoLogsTooltip';
import { useQuickStartEnabled } from '../../../../hooks/useQuickStartGuide';

const SalesforceNoIntegrationPage = () => {
  const { createIntegration, isSubmitting } = useSalesforceIntegration();
  const [error, setIntegrationError] = useState(undefined);
  const match = useRouteMatch({
    path: APP_ACCOUNT_INTEGRATION_SALESFORCE_OAUTH,
    strict: true,
    sensitive: true,
  });
  const { activeIntegration } = useSalesforceIntegration();
  const defaultValues = {
    inputClientId: '',
    inputSalesforceUser: '',
  };
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
  const disabled = isSubmitting;
  const onSubmit = () => {
    createIntegration(
      { inputClientId: watch('inputClientId'), inputSalesforceUser: watch('inputSalesforceUser') },
      aI => {
        if (aI?.hasError) {
          setIntegrationError(aI?.message);
        } else {
          reset(defaultValues);
        }
      },
    );
  };
  const hasQSGEnabled = useQuickStartEnabled();

  return (
    <>
      {!match && (
        <NoIntegrationPage
          crm={CRM.SALESFORCE}
          link="https://support.bloobirds.com/hc/en-us/articles/360017716300"
          onSubmit={handleSubmit(onSubmit)}
          handleError={setIntegrationError}
          error={error}
          isSubmiting={disabled}
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
              <Controller
                render={({ onChange, value }) => (
                  <Input
                    placeholder="Salesforce Consumer Key*"
                    innerRef={register({
                      required: true,
                    })}
                    onChange={onChange}
                    width="100%"
                    value={value}
                  />
                )}
                control={control}
                name="inputClientId"
              />
              <Controller
                render={({ onChange, value }) => (
                  <Input
                    placeholder="Salesforce User*"
                    onChange={onChange}
                    value={value}
                    innerRef={register({
                      required: true,
                    })}
                    width="100%"
                  />
                )}
                control={control}
                name="inputSalesforceUser"
              />
            </div>
          </FormProvider>
        </NoIntegrationPage>
      )}
      {match && !activeIntegration.isLoaded && <OauthSalesforceReceiver />}
      {hasQSGEnabled && <SalesforceNoLogsTooltip />}
    </>
  );
};
export default SalesforceNoIntegrationPage;
