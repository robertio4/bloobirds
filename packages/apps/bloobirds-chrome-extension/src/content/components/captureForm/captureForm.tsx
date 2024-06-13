import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '@bloobirds-it/bobjects';
import { Button } from '@bloobirds-it/flamingo-ui';
import { useActiveAccountId, useObjectCreationSettings, useUserHelpers } from '@bloobirds-it/hooks';
import {
  ExtensionBobject,
  LEAD_FIELDS_LOGIC_ROLE,
  LeadField,
  LinkedInLead,
  MIXPANEL_EVENTS,
  UserHelperKeys,
} from '@bloobirds-it/types';
import { getExtensionBobjectByIdFields } from '@bloobirds-it/utils';
import { isAxiosError } from 'axios';
import mixpanel from 'mixpanel-browser';
import useSWR from 'swr';

import { useCreationForm } from '../../../hooks/useCreationForm';
import { BobjectField, FormBobject } from '../../../types/entities';
import { api } from '../../../utils/api';
import {
  scrapLeadCompanyName,
  scrapLeadFirstName,
  scrapLeadJobTitle,
  scrapLeadLastName,
} from '../../../utils/scrapper/profileScrapper';
import {
  BubbleWindow,
  BubbleWindowContent,
  BubbleWindowFooter,
  BubbleWindowHeader,
} from '../bubbleWindow/bubbleWindow';
import { useExtensionContext } from '../context';
import DuplicatedLead from '../duplicatedLead/duplicatedLead';
import { useFloatingMenuContext } from '../floatingMenu/floatingMenuContext';
import LeadPage from '../linkedInScreens/leadPage';

interface CaptureFormProps {
  currentPage: string;
  linkedInURL: string;
  salesNavigatorURL: string;
  setCurrentLead: any;
  setExactMatch: any;
  info?: {
    name: string;
    number: string;
    validatePhone: boolean;
    onCreate: (bobjectId: string) => void;
  };
}

interface LayoutSettingsResponse {
  fields: Array<LeadField>;
}

interface DuplicatedLeadResponse {
  duplicates: Array<{
    bobject: FormBobject;
    field: BobjectField;
  }>;
}

interface FormValues {
  companyName: string;
  createCompany: boolean;
  fields: {
    [id: string]: string;
  };
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
  const accountId = useActiveAccountId();
  const isLoggedIn = !!accountId;
  const { data } = useSWR(isLoggedIn ? '/linkedin/settings/layout' : null, fetchLeadFields);
  return data?.fields ?? [];
};

const CaptureForm = ({
  currentPage,
  linkedInURL,
  salesNavigatorURL,
  setCurrentLead,
  setExactMatch,
  info,
}: CaptureFormProps) => {
  const { t } = useTranslation();
  const [leadInfo, setLeadInfo] = useState(null);
  const [duplicatedLead, setDuplicatedLead] = useState<FormBobject>(null);
  const [duplicatedField, setDuplicatedField] = useState<BobjectField>(null);
  const [transformedBobject, setTransformedBobject] = useState<ExtensionBobject>();
  const { setActiveBobject, useGetSettings } = useExtensionContext();
  const { setGoBack } = useFloatingMenuContext();
  const {
    user: { autoAssignLeadsLinkedin },
  } = useGetSettings();
  const fields = useLeadFields();
  const { setCreateLead, setSyncLead } = useCreationForm();
  const { save } = useUserHelpers();
  const { companyRequiredFromExtension } = useObjectCreationSettings();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      fields: {},
      companyName: '',
      createCompany: false,
    },
  });

  useEffect(() => {
    if (fields.length > 0) {
      const firstNameField = fields.find(field => field.logicRole === LEAD_FIELDS_LOGIC_ROLE.NAME);
      const lastNameField = fields.find(
        field => field.logicRole === LEAD_FIELDS_LOGIC_ROLE.SURNAME,
      );
      const jobTitleField = fields.find(
        field => field.logicRole === LEAD_FIELDS_LOGIC_ROLE.JOB_TITLE,
      );
      const numberField = fields.find(field => field.logicRole === LEAD_FIELDS_LOGIC_ROLE.PHONE);

      const { fields: currentFields, createCompany } = getValues();
      if (info) {
        reset({
          createCompany,
          companyName: '',
          fields: {
            ...currentFields,
            [firstNameField.id]: info?.name,
            // Add number only if it's a whatsapp page
            ...(numberField && { [numberField.id]: info?.number }),
          },
        });
      } else {
        reset({
          createCompany,
          companyName: scrapLeadCompanyName(),
          fields: {
            ...currentFields,
            [firstNameField.id]: scrapLeadFirstName(),
            [lastNameField.id]: scrapLeadLastName(),
            [jobTitleField.id]: scrapLeadJobTitle(),
          },
        });
      }
    }
  }, [currentPage, fields.length]);

  useEffect(() => {
    if (duplicatedLead) {
      const promise = getExtensionBobjectByIdFields(duplicatedLead?.id);
      promise.then(({ data }) => setTransformedBobject(data)).catch(e => console.log(e));
    }
  }, [duplicatedLead]);

  useEffect(
    () =>
      setGoBack(() => {
        setDuplicatedLead(undefined);
        setDuplicatedField(undefined);
      }),
    [],
  );

  const companyField = fields.find(field => field.logicRole === 'LEAD__COMPANY');
  const companyId = watch(`fields.${companyField?.id}`);
  const createCompany = watch('createCompany');

  const saveButtonMessage = useMemo(() => {
    if (createCompany) {
      return t('sidePeek.captureForm.saveLeadAndCompany');
    }
    if (companyId || companyRequiredFromExtension) {
      return t('sidePeek.captureForm.saveLeadToCompany');
    }
    return t('sidePeek.captureForm.saveLeadWithoutCompany');
  }, [companyId, createCompany]);

  const saveLead = async (data: FormValues) => {
    try {
      let response;
      if (info) {
        response = await api.post('/linkedin/leads', {
          fields: {
            ...data.fields,
            LEAD__PHONE: info?.number,
          },
          companyName: data.companyName,
          createCompany: data.createCompany,
          validatePhone: info?.validatePhone || false,
        });
      } else {
        response = await api.post('/linkedin/leads', {
          fields: {
            ...data.fields,
            LEAD__LINKEDIN_URL: linkedInURL,
            LEAD__SALES_NAVIGATOR_URL: salesNavigatorURL ?? undefined,
          },
          companyName: data.companyName,
          createCompany: data.createCompany,
        });
      }
      setCurrentLead([response?.data]);
      setExactMatch(true);
      setLeadInfo(response.data);
      setCreateLead(false);
      setSyncLead(false);
      if (info?.onCreate) {
        info.onCreate(response?.data?.id?.value);
      }
      save(UserHelperKeys.CREATE_LEAD_FROM_LINKEDIN);
      mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_LEAD_OTO);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response.status === 409) {
          const response = error.response.data as DuplicatedLeadResponse;
          setDuplicatedField(response.duplicates[0].field);
          setDuplicatedLead(response.duplicates[0].bobject);
        }
      }
    }
  };

  if (duplicatedLead) {
    if (leadInfo) {
      return <LeadPage lead={leadInfo} />;
    }

    return (
      <DuplicatedLead
        linkedInURL={linkedInURL}
        salesNavigatorURL={salesNavigatorURL}
        lead={transformedBobject as LinkedInLead}
        field={duplicatedField}
        onUpdate={lead => {
          setActiveBobject(lead);
        }}
      />
    );
  }

  return (
    <BubbleWindow>
      {leadInfo ? (
        <>
          <LeadPage lead={leadInfo} key={leadInfo?.id} />
        </>
      ) : (
        <>
          <BubbleWindowHeader color="bloobirds" backgroundColor="lightBloobirds" name="person" />
          <BubbleWindowContent>
            <form>
              {fields?.reduce((acc, curr) => {
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
          </BubbleWindowContent>
          <BubbleWindowFooter>
            <Button
              expand
              disabled={
                Object.keys(errors).length !== 0 ||
                isSubmitting ||
                (companyRequiredFromExtension && !createCompany && !companyId)
              }
              onClick={handleSubmit(saveLead)}
            >
              {saveButtonMessage}
            </Button>
          </BubbleWindowFooter>
        </>
      )}
    </BubbleWindow>
  );
};

export default CaptureForm;
