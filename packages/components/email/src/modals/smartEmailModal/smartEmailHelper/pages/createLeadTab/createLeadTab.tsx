import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '@bloobirds-it/bobjects';
import { Button, Icon, Text, useToasts } from '@bloobirds-it/flamingo-ui';
import { useUserSettings } from '@bloobirds-it/hooks';
import {
  ExtensionCompany,
  LEAD_FIELDS_LOGIC_ROLE,
  LeadField,
  LeadFieldType,
  SmartEmailTab,
} from '@bloobirds-it/types';
import { api, baseUrls } from '@bloobirds-it/utils';
import useSWR from 'swr';

import { useSmartEmailModal } from '../../../smartEmailModal';
import styles from './createLeadTab.module.css';

interface FormValues {
  companyName: string;
  createCompany: boolean;
  fields: {
    [id: string]: string;
  };
}

interface LayoutSettingsResponse {
  fields: Array<LeadField>;
}

const emptyFormValue = {
  id: undefined,
  name: 'Unassigned',
  logicRole: null,
  order: 0,
  enabled: true,
};

export const fetchLeadFields = async (url): Promise<LayoutSettingsResponse> => {
  const response = await api.get<LayoutSettingsResponse>(url, { params: { selected: true } });
  return response.data;
};
const useLeadFields = (): Array<LeadField> => {
  const { data } = useSWR('/linkedin/settings/layout', fetchLeadFields);
  return data?.fields ?? [];
};

export const CreateLeadTab = () => {
  const {
    user: { autoAssignLeadsLinkedin },
  } = useUserSettings();
  const fields = useLeadFields();
  const {
    newLeadInfo,
    dataModel,
    setNewLeadInfo,
    setSelectedTab,
    leadCreatedCallback,
  } = useSmartEmailModal();
  const { createToast } = useToasts();
  const { t } = useTranslation('translation', { keyPrefix: 'smartEmailModal.createLeadTab' });
  const emailDataModelField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.EMAIL);
  const companyDataModelField = dataModel?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.COMPANY);
  // @ts-ignore
  const emailField: LeadField = {
    ...emailDataModelField,
    type: emailDataModelField.fieldType as LeadFieldType,
    enabled: true,
    required: true,
  };
  // @ts-ignore
  const companyField: LeadField = {
    ...companyDataModelField,
    type: companyDataModelField.fieldType as LeadFieldType,
    enabled: true,
    required: false,
  };

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      fields: {},
      companyName: '',
      createCompany: false,
    },
  });

  useEffect(() => {
    if (fields.length > 0 && emailField) {
      setValue('fields', {
        [emailField.id]: newLeadInfo?.email,
        [companyField.id]: newLeadInfo?.company?.id.value,
      });
      setValue('companyName', (newLeadInfo?.company as ExtensionCompany)?.name);
    }
  }, [fields.length]);

  function discard() {
    reset();
    setSelectedTab(SmartEmailTab.PAST_ACTIVITY);
    setNewLeadInfo({ email: undefined, company: undefined });
  }

  function saveLead(data: FormValues) {
    api
      .post('/linkedin/leads', {
        fields: {
          ...data.fields,
        },
        companyName: data.companyName,
        createCompany: data.createCompany,
      })
      .then(() => {
        leadCreatedCallback(newLeadInfo.email);
        discard();
        createToast({ message: t('toasts.success'), type: 'success' });
      });
  }

  const fieldsWithEmail = fields?.find(field => field?.logicRole === LEAD_FIELDS_LOGIC_ROLE.EMAIL)
    ? fields
    : fields.slice(0, 1).concat([emailField], fields.slice(1));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleHeader}>
          <Icon name="checkDouble" size={20} />
          <Text weight="bold" size="l">
            {t('newLead')}
          </Text>
        </div>
        <span className={styles.divider} />
      </div>
      <div className={styles.content}>
        <div className={styles.form}>
          <form>
            {fieldsWithEmail?.reduce((acc, curr) => {
              const isICP = curr?.logicRole === LEAD_FIELDS_LOGIC_ROLE.ICP;
              const isAssignedTo = curr?.logicRole === LEAD_FIELDS_LOGIC_ROLE.ASSIGNED_TO;
              const shouldNotBeAutoAssigned = !autoAssignLeadsLinkedin && isAssignedTo;
              if ((isICP && curr?.values?.length > 0) || curr.enabled) {
                acc.push(
                  <FormField
                    key={curr.id}
                    control={control}
                    {...curr}
                    {...(shouldNotBeAutoAssigned && { logicRole: undefined })}
                    {...(isAssignedTo && { values: [emptyFormValue, ...curr.values] })}
                  />,
                );
              }
              return acc;
            }, [])}
          </form>
          <div className={styles.formFooter}>
            <Text size="s" color="softPeanut" className={styles.formFooterRow}>
              {t('missingInfo')}
            </Text>
            <div
              className={styles.formFooterRowLink}
              onClick={() => {
                const baseUrl = baseUrls[process.env.NODE_ENV];
                window.open(`${baseUrl}/app/account-settings/chrome-extension`);
              }}
            >
              <Text size="s" color="bloobirds">
                {t('changeFromField')}
              </Text>
              <Icon name="externalLink" size={20} />
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            variant="clear"
            size="small"
            iconLeft="trashEmpty"
            color="tomato"
            onClick={discard}
          >
            {t('discard')}
          </Button>
          <Button
            variant="primary"
            size="small"
            iconLeft="plus"
            disabled={Object.keys(errors).length !== 0 || isSubmitting}
            onClick={handleSubmit(saveLead)}
          >
            {t('createLead')}
          </Button>
        </div>
      </div>
    </div>
  );
};
