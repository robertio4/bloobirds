import React, { useEffect, useRef, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  CheckItem,
  DateTimePicker,
  Input,
  Item,
  MultiSelect,
  Select,
  Text,
  TextArea,
} from '@bloobirds-it/flamingo-ui';
import {
  QualifyingQuestionsType,
  useActiveMessagingFilters,
  useBobjectFieldGroups,
  useFullSalesEnabled,
  useQualifyingQuestions,
} from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  BobjectField,
  BobjectTypes,
} from '@bloobirds-it/types';
import { getFieldById } from '@bloobirds-it/utils';

import { useCalendar } from '../../hooks/useCalendar';
import styles from '../../meetingModal/meetingModal.module.css';
import { CopyText } from '../copyText/copyText';
import { getFilteredQQsBySegmentation } from './activityDetailsForm.utils';

export function groupFields(fieldConditionsByField: any) {
  return fieldConditionsByField.reduce((acc: any, value: any) => {
    acc[value.field.logicRole || value.field.name] = value.fieldValues.map(
      (field: any) => field.value,
    );
    return acc;
  }, {});
}

export function getFieldsThatAreConditioned(fieldConditionsByField: any, modalBobjectType: any) {
  return fieldConditionsByField
    .filter(({ field }: { field: any }) => field.bobjectType === modalBobjectType)
    .map(({ field }: { field: any }) => field.logicRole || field.name);
}

const DISCARDED_FIELDS = [
  ACTIVITY_FIELDS_LOGIC_ROLE.TIME,
  ACTIVITY_FIELDS_LOGIC_ROLE.LEAD,
  ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY,
  ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.TITLE,
  ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION,
  ACTIVITY_FIELDS_LOGIC_ROLE.CREATE_EVENT,
  ACTIVITY_FIELDS_LOGIC_ROLE.OPPORTUNITY,
  ACTIVITY_FIELDS_LOGIC_ROLE.NOTE,
  ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO,
  ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
];

function checkFieldConditions(field: any, watch: any) {
  if (field.fieldConditionsByField.length > 0) {
    const relatedFields = getFieldsThatAreConditioned(field.fieldConditionsByField, 'Activity');
    const values = watch(relatedFields);
    const grouped = groupFields(field.fieldConditionsByField);

    const hasRelatedFields = relatedFields.length > 0;
    const checkAllConditions = Object.values(grouped).map(value => values?.includes(value[0]));
    const satisfiesFieldCondition = checkAllConditions?.every(value => value === true);

    if ((hasRelatedFields && !satisfiesFieldCondition) || !field.satisfiesFieldCrossCondition) {
      return false;
    }
  }
  return true;
}

function Field({ field, ...props }: { field: any }) {
  const values = field?.fieldValues();

  switch (field.type) {
    case 'Text':
      return field.multiline ? <TextArea {...props} /> : <Input {...props} />;
    case 'Picklist':
    case 'Global Picklist':
      // @ts-ignore
      // eslint-disable-next-line no-case-declarations
      return (
        <Select {...props} borderless={false} autocomplete={values?.length > 6}>
          {values?.map(({ value, label }: { value: any; label: any }) => (
            <Item key={value} value={value} label={label}>
              {label}
            </Item>
          ))}
        </Select>
      );
    case 'Multi global picklist':
      return (
        <MultiSelect {...props} borderless={false} autocomplete={values?.length > 6}>
          {values?.map(({ value, label }: { value: any; label: any }) => (
            <CheckItem key={value} value={value} label={label}>
              {label}
            </CheckItem>
          ))}
        </MultiSelect>
      );
    case 'Number':
      return <Input {...props} type="number" />;
    case 'DateTime':
    case 'Date':
      return <DateTimePicker {...props} withTimePicker={field.type === 'DateTime'} />;
    default:
      return <Input {...props} />;
  }
}

function MeetingField({
  field,
  isRequiredBeforeMeeting,
  textsToCopy,
  setTextsToCopy,
  section,
}: {
  field: any;
  isRequiredBeforeMeeting: boolean;
  textsToCopy: any;
  setTextsToCopy: React.Dispatch<any>;
  section: string;
}) {
  // @ts-ignore
  const { watch, setValue, getValues, control, formState } = useFormContext();
  const { invitees, setInvitees } = useCalendar();
  const { t } = useTranslation('translation', { keyPrefix: 'meetingModal' });
  const mustBeRequired = isRequiredBeforeMeeting || field?.required;
  const isLinkedin =
    window.location.href.includes('linkedin') || window.location.href.includes('lightning.force');
  const {
    field: { value, onChange },
  } = useController({
    control,
    name: field?.logicRole || field.name,
    rules: { required: mustBeRequired },
  });

  const defaultPicklistValue = field?.defaultPicklistValue;
  const defaultValue = field?.defaultValue;
  const fieldName = field?.logicRole || field?.name;
  const company = watch('company');
  const error = formState?.errors && formState?.errors[fieldName] && t('thisFieldIsRequired');

  useEffect(() => {
    const currentValue = getValues(fieldName);
    if (!currentValue && (defaultPicklistValue || defaultValue)) {
      setValue(fieldName, defaultPicklistValue || defaultValue);
    }
  }, [defaultPicklistValue, defaultValue]);

  useEffect(() => {
    if (company && isRequiredBeforeMeeting) {
      if (!company?.fields) {
        setValue(fieldName, company?.rawBobject[fieldName]);
      } else {
        setValue(fieldName, getFieldById(company, fieldName)?.text);
      }
    }
    if (!company && isRequiredBeforeMeeting) {
      setValue(fieldName, null);
    }
  }, [company]);

  const ref = useRef();

  // Scroll to error
  const errorMessage = formState?.errors && formState?.errors[fieldName];
  const firstError = formState?.errors && Object.keys(formState.errors)[0];
  useEffect(() => {
    if (errorMessage && firstError === fieldName) {
      // @ts-ignore
      ref?.current?.scrollIntoView({ behaviour: 'smooth', block: 'center' });
    }
  }, [errorMessage]);

  const getValue = () => {
    try {
      if (field.type === 'DateTime' || field.type === 'Date') {
        return value ? new Date(value) : value;
      } else {
        return value || field?.defaultPicklistValue || '';
      }
    } catch {
      return value;
    }
  };

  const values = field?.fieldValues();
  const getFieldValue = (e: string) => {
    switch (field.type) {
      case 'Picklist':
      case 'Global Picklist':
        return values.filter((v: any) => v.value === e)[0]?.label;
      default:
        return e;
    }
  };

  const handleOnChange = (e: string) => {
    if (field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      const value = field?.fieldValues()?.find((v: any) => v?.value === e);
      if (!invitees?.find(invitee => invitee?.email === value?.label)) {
        setInvitees(curr => [
          ...curr,
          {
            type: 'AE',
            email: value?.label,
          },
        ]);
      }
    }
    onChange(e);
    let textToCopyTmp = textsToCopy;
    textToCopyTmp = {
      ...textToCopyTmp,
      ...{
        [section]: {
          ...textToCopyTmp[section],
          ...{
            [field.label]: getFieldValue(e),
          },
        },
      },
    };
    setTextsToCopy(textToCopyTmp);
  };
  return (
    <>
      <div className={styles._input_field} ref={ref}>
        <Field
          field={field}
          //@ts-ignore
          onChange={(e: string) => handleOnChange(e)}
          value={getValue()}
          defaultValue={value || field?.defaultPicklistValue || ''}
          name={fieldName}
          size="labeled"
          portal={false}
          width={field?.label.length > 40 ? (isLinkedin ? '296px' : '304px') : '100%'}
          placeholder={`${field?.label}${mustBeRequired ? ' *' : ''}`}
          required={mustBeRequired}
          error={error}
        />
      </div>
    </>
  );
}

export interface MinimizableBobject {
  name: string;
  stage: string;
  url: string;
  data: Bobject;
}

export interface FormDataInterface {
  company: Bobject | MinimizableBobject;
  lead: Bobject | MinimizableBobject;
  [key: string]: any;
}

function ActivityDetailsForm({
  isEditionModal,
  formData,
  accountId,
}: {
  isEditionModal: boolean;
  formData: FormDataInterface;
  accountId: string;
}) {
  const { company } = formData;
  const filters = useActiveMessagingFilters();
  const { qualifyingQuestions } = useQualifyingQuestions(filters as QualifyingQuestionsType);
  const requiredQQs = qualifyingQuestions?.filter((qq: any) => qq?.isRequiredBeforeMeeting);
  const filteredQQs = getFilteredQQsBySegmentation(requiredQQs, formData);

  const meetingFormFields = useBobjectFieldGroups({
    bobject: null,
    bobjectType: BobjectTypes.Activity,
    // @ts-ignore
    companyBobjectId: company?.id?.value || null,
    options: {
      type: 'Meeting',
    },
    modalId: undefined,
    segmentatedQQs: filteredQQs,
  });
  const isFullSalesEnabled = useFullSalesEnabled(accountId);
  const { watch, getValues } = useFormContext();
  const defaultFormValues = getValues();
  const [textsToCopy, setTextsToCopy] = useState<any>({});

  const activityDetailsFilterFunction = (field: any, isRequiredBeforeMeeting: boolean) => {
    if (isRequiredBeforeMeeting) {
      return !isEditionModal;
    }
    return (
      !field.deprecated &&
      !field.readOnly &&
      isValidAeField(field) &&
      checkFieldConditions(field, watch) &&
      !DISCARDED_FIELDS.includes(field.logicRole)
    );
  };

  useEffect(() => {
    let createTextToCopyObject = {};
    meetingFormFields?.sections?.forEach(section => {
      const isRequiredBeforeMeeting = section?.title === 'Required information to close Meeting';
      let defaultValues = {};
      section?.fields
        ?.filter((field: any) => activityDetailsFilterFunction(field, isRequiredBeforeMeeting))
        .forEach((field: any) => {
          const getValue = (fieldValue: string) => {
            return field?.fieldValues()?.filter((v: any) => v.value === fieldValue)[0]?.label;
          };
          if (field.defaultPicklistValue || field.defaultGlobalPicklistValue) {
            defaultValues = {
              ...defaultValues,
              ...{
                [field.label]: getValue(field.defaultPicklistValue),
              },
            };
          } else if (field.defaultValue) {
            defaultValues = {
              ...defaultValues,
              ...{
                [field.label]: field.defaultValue,
              },
            };
          } else if (Object.keys(defaultFormValues).includes(field.name)) {
            defaultValues = {
              ...defaultValues,
              ...(getValue(defaultFormValues[field.name]) || defaultFormValues[field.name]
                ? {
                    [field.label]:
                      getValue(defaultFormValues[field.name]) || defaultFormValues[field.name],
                  }
                : undefined),
            };
          }
        });
      createTextToCopyObject = {
        ...createTextToCopyObject,
        ...{
          [section.title]: defaultValues,
        },
      };
    });
    setTextsToCopy(createTextToCopyObject);
  }, [meetingFormFields.sections]);

  const getClipboardText = (sectionTitle: string) => {
    let textForClipboard = '';

    const sectionText = textsToCopy[sectionTitle] || {};
    const textArray = Object.keys(sectionText).map(
      key => `<div><span style="font-weight: bold">${key}</span>: ${sectionText[key]}</div>`,
    );
    textArray.forEach(element => (textForClipboard = textForClipboard.concat('\n' + element)));

    return textForClipboard;
  };

  const isValidAeField = (field: BobjectField) => {
    if (isFullSalesEnabled && field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE) {
      return true;
    } else if (
      !isFullSalesEnabled &&
      field?.logicRole === ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className={styles._additionalFields_content}>
      {meetingFormFields?.sections?.map(section => {
        const isRequiredBeforeMeeting = section?.title === 'Required information to close Meeting';
        const sectionFields = section.fields
          ?.filter((field: BobjectField) =>
            activityDetailsFilterFunction(field, isRequiredBeforeMeeting),
          )
          .map((field: BobjectField) => (
            <MeetingField
              key={field.name}
              field={field}
              isRequiredBeforeMeeting={isRequiredBeforeMeeting}
              textsToCopy={textsToCopy}
              setTextsToCopy={setTextsToCopy}
              section={section.title}
            />
          ));
        return sectionFields.length > 0 ? (
          <div className={styles._additionalFields_section} key={section.title}>
            <div className={styles._additionalFields_content_title}>
              <CopyText
                isLinkTypeField={false}
                textToCopy={getClipboardText(section.title)}
                htmlFormat={true}
                alwaysDisplay={true}
              >
                <Text size="s" color="softPeanut">
                  {section.title}
                </Text>
              </CopyText>
            </div>
            <div className={styles._additionalFields_fields}>{sectionFields}</div>
          </div>
        ) : null;
      })}
    </div>
  );
}

export default ActivityDetailsForm;
