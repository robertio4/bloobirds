import React, { useContext, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AutoCompleteSearchCompanies } from '@bloobirds-it/bobjects';
import {
  Chip,
  ChipGroup,
  DateTimePicker,
  Icon,
  Input,
  Item,
  Select,
  Text,
  Tooltip,
} from '@bloobirds-it/flamingo-ui';
import {
  useIsB2CAccount,
  useUserHelpers,
  usePicklist,
  useMeetingReportResult,
} from '@bloobirds-it/hooks';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  Bobject,
  ExtensionCompany,
  MEETING_MAIN_TYPE_VALUES,
  UserHelperKeys,
} from '@bloobirds-it/types';
import { getValueFromLogicRole, removeHtmlTags } from '@bloobirds-it/utils';
import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { useCalendar } from '../../hooks/useCalendar';
import { useGeneratePlaceHolder } from '../../hooks/useEventPlaceholder';
import MeetingModalContext from '../../meetingModal/context';
import styles from '../../meetingModal/meetingModal.module.css';
import { ConferencingForm } from '../conferencingForm/conferencingForm';
import { ReminderForm } from '../reminderForm/reminderForm';

const { persistAtom } = recoilPersist();

const meetingTypeAtom = atom({
  key: 'meetingTypeAtom',
  default: '',
  effects: [persistAtom],
});

function getEmailFromCompany(company: Bobject | ExtensionCompany) {
  if ('fields' in company && company?.fields) {
    const companyEmails = company
      ? company.fields?.filter(field => field.value && field.type === 'EMAIL')
      : [];

    return companyEmails?.length > 0 ? companyEmails[0] : undefined;
  } else {
    return null;
  }
}

export function MainInfoForm({
  prospectingStage,
  accountId,
  isEditionModal,
}: {
  prospectingStage: boolean;
  accountId: string;
  isEditionModal: boolean;
}) {
  const { settings, dataModel } = useContext(MeetingModalContext);
  const [meetingTypeStored, setMeetingTypeStored] = useRecoilState(meetingTypeAtom);
  const isB2CAccount = useIsB2CAccount();
  useGeneratePlaceHolder();
  const { setMeetingDuration, setInvitees, invitees } = useCalendar();
  const { setValue, control, formState } = useFormContext();

  const mainTypeField = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
  );
  const { data: meetingTypes } = usePicklist(mainTypeField?.id);
  const types = meetingTypes?.filter(i => i.enabled).sort((a, b) => a.ordering - b.ordering);
  const { has } = useUserHelpers();
  const { t } = useTranslation('translation', { keyPrefix: 'meetingModal.mainForm' });

  const {
    field: { ref: titleRef, value: title, onChange: titleOnChange },
  } = useController({ control, name: 'title', rules: { required: true }, defaultValue: '' });
  const errorTitle = formState?.errors && formState?.errors['title'] && t('thisFieldIsRequired');

  const firstMeetingType = dataModel?.findValueByLogicRole(MEETING_MAIN_TYPE_VALUES.FIRST_MEETING);
  const followUpMeetingType = dataModel?.findValueByLogicRole(MEETING_MAIN_TYPE_VALUES.FOLLOW_UP);
  const {
    field: { value: meetingType, onChange: meetingTypeOnChange },
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_MAIN_TYPE,
    defaultValue:
      meetingTypeStored || prospectingStage ? firstMeetingType?.id : followUpMeetingType?.id,
    rules: { required: true },
  });
  const meetingTypeError =
    formState?.errors &&
    formState?.errors['ACTIVITY__MEETING_MAIN_TYPE'] &&
    t('thisFieldIsRequired');

  const {
    field: { value: dateTime, onChange: dateTimeOnChange },
  } = useController({ control, name: 'dateTime', defaultValue: '', rules: { required: true } });
  const errorDatetime =
    formState?.errors && formState?.errors['dateTime'] && t('thisFieldIsRequired');
  const {
    field: { ref: durationRef, value: duration, onChange: durationOnChange },
  } = useController({ control, name: 'duration', rules: { required: true } });
  const errorDuration =
    formState?.errors && formState?.errors['duration'] && t('thisFieldIsRequired');

  const {
    field: { value: meetingResult, onChange: meetingResultOnChange },
  } = useController({
    control,
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_RESULT,
  });

  const { meetingResults } = useMeetingReportResult(dataModel, meetingType);

  const {
    field: { value: company, onChange: companyOnChange },
  } = useController({
    control,
    name: 'company',
    rules: { required: false },
  });

  const {
    field: { value: lead },
  } = useController({
    control,
    name: 'lead',
    rules: { required: false },
  });

  const [launchTooltip, setLaunchTooltip] = useState<boolean>();
  const defaultTooltipVisible = !has(UserHelperKeys.NEW_MEETING_MODAL);

  useEffect(() => {
    setTimeout(() => {
      setLaunchTooltip(true);
    }, 2000);
  }, []);

  useEffect(() => {
    // If there is no title, set it to the default name
    if (!title) {
      if (company && !title) {
        if (!company?.fields) {
          setValue('title', `${company?.name || ''} <> ${settings?.account?.name}`);
        } else {
          setValue(
            'title',
            `${getValueFromLogicRole(company, 'COMPANY__NAME')} <> ${settings?.account?.name}`,
          );
        }
      } else if (lead && !title) {
        if (!lead?.fields) {
          setValue('title', `${lead?.fullName || ''} <> ${settings?.account?.name}`);
        } else {
          setValue(
            'title',
            `${getValueFromLogicRole(lead, 'LEAD__NAME')} <> ${settings?.account?.name}`,
          );
        }
      }
    }
  }, [company, lead]);

  return (
    <div className={styles._main_row}>
      <div className={styles._main_info_title}>
        <Text size="m">{t('meetingDetails')}</Text>
      </div>
      <Input
        width="100%"
        placeholder={`${t('title')} *`}
        name="title *"
        // @ts-ignore
        innerRef={titleRef}
        value={title || ''}
        onChange={value => {
          titleOnChange(removeHtmlTags(value));
        }}
        error={errorTitle}
        className={styles.titleInput}
      />
      {types && (
        <>
          <>
            <div className={styles._meetingType}>
              <ChipGroup
                value={meetingType}
                onChange={v => {
                  setMeetingTypeStored(v);
                  meetingTypeOnChange(v);
                }}
              >
                {types?.map((type: any) => (
                  <Chip size="small" key={type?.id} value={type?.id}>
                    {type?.value}
                  </Chip>
                ))}
                <Tooltip title={t('tooltipMessage')} position="top">
                  <Icon name="infoFilled" size={14} />
                </Tooltip>
              </ChipGroup>
            </div>
            {meetingTypeError && (
              <Text color="tomato" size="xs">
                {meetingTypeError}
              </Text>
            )}
          </>
          {isEditionModal && (
            <div className={styles._meetingResult}>
              <Select
                width="100%"
                size="small"
                placeholder={t('meetingResult')}
                value={meetingResult}
                onChange={meetingResultOnChange}
              >
                {meetingResults?.map((result: any) => (
                  <Item key={result?.id} value={result?.id} label={result?.name}>
                    {result?.name}
                  </Item>
                ))}
              </Select>
            </div>
          )}
        </>
      )}
      {!isB2CAccount && (
        <AutoCompleteSearchCompanies
          onChange={(v: string) => {
            if (company) {
              const companyEmail = getEmailFromCompany(company);
              const companyName = company?.name || getValueFromLogicRole(company, 'COMPANY__NAME');
              if (!invitees?.find(invitee => invitee?.email === companyEmail?.value)) {
                setInvitees(curr => [
                  ...curr,
                  {
                    type: 'Company',
                    email: companyEmail?.value,
                    name: companyName,
                  },
                ]);
              }
            }
            companyOnChange(v);
          }}
          value={company?.name || getValueFromLogicRole(company, 'COMPANY__NAME') || ''}
          name="company"
          onCompanyIdChange={undefined}
          width={'304px'}
          accountId={accountId}
          size="labeled"
        />
      )}
      <div className={styles._date_picker}>
        <DateTimePicker
          width="170px"
          size="small"
          placeholder={`${t('date')} *`}
          // @ts-ignore
          value={dateTime ? new Date(dateTime) : ''}
          onChange={dateTimeOnChange}
          error={errorDatetime}
        />
        <Input
          width="100%"
          size="small"
          placeholder={`${t('durationMin')} *`}
          adornment={<Icon size={12} color="softPeanut" name="clock" />}
          value={duration}
          onChange={v => {
            const onlyNumbers = /^\d+$/; // Regular expression to match only numbers
            const numericValue = v?.replace(/\D/g, ''); // Remove non-numeric characters

            if (v === '' || !v || onlyNumbers.test(numericValue)) {
              setMeetingDuration(numericValue);
              durationOnChange(numericValue);
            }
          }}
          // @ts-ignore
          innerRef={durationRef}
          error={errorDuration}
        />
      </div>

      {!isEditionModal && (
        <div className={styles.titleForm}>
          <ConferencingForm />
          <ReminderForm />
        </div>
      )}
    </div>
  );
}
