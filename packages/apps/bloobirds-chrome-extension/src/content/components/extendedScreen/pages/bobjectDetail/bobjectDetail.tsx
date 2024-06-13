import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDialerLauncher } from '@bloobirds-it/dialer';
import { Button, Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';
import {
  useBaseSetEmailVariablesValues,
  useDataModel,
  useMinimizableModals,
  useAircallPhoneLinkEnabled,
} from '@bloobirds-it/hooks';
import {
  Bobject,
  BobjectFieldDataModel,
  BobjectTypes,
  ExtensionBobject,
  MessagesEvents,
} from '@bloobirds-it/types';
import {
  getSobjectTypeFromId,
  isEmail,
  isUrl,
  isValidPhone,
  openPhoneOrDialer,
} from '@bloobirds-it/utils';

import { EMAIL_MODE } from '../../../../../constants/email';
import { api } from '../../../../../utils/api';
import { ContactViewAction } from '../../../contactView/components/contactViewActions/contactViewActions';
import { useContextBobjects } from '../../../contactView/hooks/useContextBobjects';
import { useExtensionContext } from '../../../context';
import styles from './bobjectDetail.module.css';
import { SectionField } from './sectionField/sectionField';
import { Action } from './types';

export const BobjectDetail = ({ isB2CAccount = false }: { isB2CAccount: boolean }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'extendedScreen.bobjectDetail' });
  const {
    useGetExtendedContext,
    openExtendedScreen,
    closeExtendedScreen,
    useGetSettings,
  } = useExtensionContext();
  const settings = useGetSettings();
  const hasSalesforceIntegration = settings?.account?.salesforceInstance;
  const { data, handleMutateAndRefresh } = useContextBobjects();
  const { openDialer } = useDialerLauncher();
  const { openMinimizableModal } = useMinimizableModals();
  const setEmailVariablesValue = useBaseSetEmailVariablesValues();
  const { company, leads } = data || {};
  const context = useGetExtendedContext();
  const bobject = context.bobject;
  const dataModel = useDataModel();
  const hasAircallPhoneLinkEnabled = useAircallPhoneLinkEnabled();
  const companyFields = dataModel?.getFieldsByBobjectType('Company');
  const leadFields = dataModel?.getFieldsByBobjectType('Lead');
  const isLead = bobject?.id?.typeName === BobjectTypes.Lead;
  const [refreshing, setRefreshing] = useState(false);
  const companyEmailFields = companyFields?.filter(
    (field: BobjectFieldDataModel) => field?.fieldType === 'EMAIL',
  );
  const companyPhoneFields = companyFields?.filter(
    (field: BobjectFieldDataModel) => field?.fieldType === 'PHONE',
  );
  const leadEmailFields = leadFields
    ?.filter((field: BobjectFieldDataModel) => field?.fieldType === 'EMAIL')
    ?.sort((a, b) => a.ordering - b.ordering);
  const leadPhoneFields = leadFields
    ?.filter((field: BobjectFieldDataModel) => field?.fieldType === 'PHONE')
    ?.sort((a, b) => a.ordering - b.ordering);

  const mainInfoCompanyFields = companyFields
    ?.filter((field: BobjectFieldDataModel) =>
      ['COMPANY__NAME', 'COMPANY__WEBSITE'].includes(field.logicRole),
    )
    ?.sort((a, b) => a.ordering - b.ordering);
  const mainInfoLeadFields = leadFields?.filter((field: BobjectFieldDataModel) =>
    ['LEAD__NAME', 'LEAD__SURNAME', 'LEAD__LINKEDIN_JOB_TITLE'].includes(field.logicRole),
  );

  const companyLinkedinURLField = companyFields?.filter(
    (field: BobjectFieldDataModel) => field.logicRole === 'COMPANY__LINKEDIN_URL',
  );
  const leadLinkedinURLField = leadFields?.filter(
    (field: BobjectFieldDataModel) => field.logicRole === 'LEAD__LINKEDIN_URL',
  );

  const sections: {
    title: string;
    leadFields: BobjectFieldDataModel[];
    companyFields: BobjectFieldDataModel[];
    companySection: string;
    validation: (field: BobjectFieldDataModel) => (value: string) => string;
    action?: Action;
  }[] = [
    {
      title: '',
      leadFields: mainInfoLeadFields,
      companyFields: mainInfoCompanyFields,
      companySection: t('sections.companyDetails'),
      validation: field => value => {
        if (value) {
          return undefined;
        } else {
          return field.required ? t('validation.notEmpty') : undefined;
        }
      },
    },
    {
      title: t('sections.emails'),
      leadFields: leadEmailFields,
      companyFields: companyEmailFields,
      companySection: t('sections.companyEmails'),
      action: 'EMAIL',
      validation: field => value => {
        if (value) {
          return isEmail(value) ? undefined : t('validation.email');
        } else {
          return field.required ? t('validation.notEmpty') : undefined;
        }
      },
    },
    {
      title: t('sections.phones'),
      leadFields: leadPhoneFields,
      companyFields: companyPhoneFields,
      companySection: t('sections.companyPhones'),
      action: 'PHONE',
      validation: field => value => {
        if (value) {
          return isValidPhone(value) ? undefined : t('validation.phone');
        } else {
          return field.required ? t('validation.notEmpty') : undefined;
        }
      },
    },
    // Add only if the company is not a B2C account
    !isB2CAccount && {
      title: t('sections.linkedIn'),
      leadFields: leadLinkedinURLField,
      companyFields: companyLinkedinURLField,
      companySection: t('sections.companyLinkedIn'),
      action: 'LINKEDIN',
      validation: field => value => {
        if (value) {
          return isUrl(value) ? undefined : t('validation.url');
        } else {
          return field.required ? t('validation.notEmpty') : undefined;
        }
      },
    },
  ];

  const openLinkedInView = linkedinUrl => {
    window.open(linkedinUrl + '?bb-messaging-tab-open', '_blank');
  };

  const openEmailModal = (value?: string) => {
    setEmailVariablesValue({
      company: isLead ? company?.rawBobject : bobject?.rawBobject,
      lead: isLead ? bobject?.rawBobject : undefined,
      opportunity: null,
    });
    openMinimizableModal({
      type: 'email',
      title: t('newEmail'),
      data: {
        template: {
          content: '',
          subject: '',
        },
        mode: EMAIL_MODE.SEND,
        activity: null,
        company: isLead ? company : bobject,
        leads,
        lead: isLead ? bobject : leads && leads?.length > 0 && leads[0],
        pageBobjectType: isLead ? BobjectTypes.Lead : BobjectTypes.Company,
        defaultToEmail: [value],
      },
      onSave: () => {
        window.dispatchEvent(
          new CustomEvent(MessagesEvents.ActiveBobjectUpdated, {
            detail: { type: BobjectTypes.Activity },
          }),
        );
      },
    });
  };

  const getContactAction = (type: Action, value: any) => {
    switch (type) {
      case 'EMAIL':
        return (
          <ContactViewAction
            color="tangerine"
            icon="mail"
            size={'small'}
            onClick={() => {
              openEmailModal(value);
              closeExtendedScreen();
            }}
          />
        );
      case 'PHONE':
        return hasAircallPhoneLinkEnabled ? (
          <a href={`callto:${value}`}>
            <ContactViewAction color="extraCall" icon="phone" size={'small'} />
          </a>
        ) : (
          <ContactViewAction
            color="extraCall"
            icon="phone"
            size={'small'}
            onClick={() => {
              openPhoneOrDialer(value, settings, openDialer, bobject?.id?.value);
              closeExtendedScreen();
            }}
          />
        );

      case 'LINKEDIN':
        return (
          <ContactViewAction
            color="darkBloobirds"
            icon="linkedin"
            size={'small'}
            onClick={() => {
              openLinkedInView(value);
              closeExtendedScreen();
            }}
          />
        );
      case 'WHATSAPP':
        return <></>;
    }
  };

  const updateBobject = async (bobject: Bobject | ExtensionBobject, data) => {
    try {
      await api.patch('/bobjects/' + bobject?.id?.value + '/raw', data);
      const newActiveBobject = await handleMutateAndRefresh();
      openExtendedScreen({ ...context, bobject: newActiveBobject });
    } catch (e) {
      console.log(e);
    }
  };

  const refreshBobject = () => {
    if (bobject && 'salesforceId' in bobject && bobject.salesforceId) {
      setRefreshing(true);
      const sobjectId = bobject.salesforceId;
      const sobjectType = getSobjectTypeFromId(sobjectId);
      api
        .get(`/utils/service/salesforce/resync/${sobjectType}/${sobjectId}`, {})
        .then(async () => {
          const newActiveBobject = await handleMutateAndRefresh();
          openExtendedScreen({ ...context, bobject: newActiveBobject });
          setRefreshing(false);
        })
        .finally(() => setRefreshing(false));
    }
  };

  return (
    <div className={styles.container}>
      {dataModel && (
        <>
          <div className={styles.header}>
            <Text size="m" weight="bold">
              {t('contactDetails')}
            </Text>
            {hasSalesforceIntegration &&
              bobject &&
              'salesforceId' in bobject &&
              bobject.salesforceId && (
                <div className={styles.refreshHelper}>
                  <Text className={styles.refreshText} size="xs">
                    {t('outdatedInfo')}
                  </Text>
                  <Button
                    size="small"
                    iconLeft="salesforceOutlined"
                    uppercase={false}
                    onClick={refreshBobject}
                    variant="clear"
                  >
                    {refreshing ? (
                      <Spinner name="loadingCircle" size={12} color="bloobirds" />
                    ) : (
                      <Icon name="refresh" size={16} />
                    )}
                  </Button>
                </div>
              )}
          </div>
          {sections?.map(section => (
            <>
              <div className={styles.sectionHeader} key={`section-${section.title}`}>
                <Text size="m" weight="bold" className={styles.sectionHeader}>
                  {section.title}
                </Text>
              </div>
              {(isLead ? section.leadFields : section.companyFields)?.map(field => (
                <SectionField
                  value={bobject?.rawBobject[field?.id]}
                  name={field.name}
                  activityAction={getContactAction(section.action, bobject?.rawBobject[field?.id])}
                  key={`field-${field?.id}`}
                  onSubmit={newValue => updateBobject(bobject, { [field?.id]: newValue })}
                  refresh={!refreshing}
                  validation={section.validation(field)}
                />
              ))}
              {isLead && company && !isB2CAccount && (
                <>
                  <div key={`section-${section.title}`}>
                    <Text size="m" color="softPeanut" className={styles.sectionSubHeader}>
                      {section.companySection}
                    </Text>
                  </div>
                  {section?.companyFields?.map(field => (
                    <SectionField
                      value={company?.rawBobject[field?.id]}
                      name={field.name}
                      activityAction={getContactAction(
                        section.action,
                        company?.rawBobject[field?.id],
                      )}
                      key={`field-${field?.id}`}
                      refresh={refreshing}
                      onSubmit={newValue => updateBobject(company, { [field?.id]: newValue })}
                      validation={section.validation(field)}
                    />
                  ))}
                </>
              )}
            </>
          ))}
        </>
      )}
    </div>
  );
};
