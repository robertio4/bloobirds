import React, { useContext, useEffect, useRef, useState } from 'react';
import { FormProvider, useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useConfirmDeleteModal } from '@bloobirds-it/bobjects';
import {
  Button,
  Checkbox,
  ColorType,
  Icon,
  IconButton,
  Modal,
  ModalFooter,
  Spinner,
  Text,
  Tooltip,
  useToasts,
  TextArea,
  Select,
  Item,
} from '@bloobirds-it/flamingo-ui';
import {
  useMediaQuery,
  useMinimizableModal,
  useUserSearch,
  useIsOTOAccount,
  useFullSalesEnabled,
} from '@bloobirds-it/hooks';
import { useGetI18nSpacetime } from '@bloobirds-it/internationalization';
import { ChangeTimezoneModal } from '@bloobirds-it/misc-modals';
import { deserialize, serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import {
  ACTIVITY_FIELDS_LOGIC_ROLE,
  ACTIVITY_TYPES_VALUES_LOGIC_ROLE,
  Bobject,
  COMPANY_FIELDS_LOGIC_ROLE,
  COMPANY_STAGE_LOGIC_ROLE,
  Connections,
  DataModelResponse,
  ExtensionCompany,
  LEAD_FIELDS_LOGIC_ROLE,
  LEAD_STAGE_LOGIC_ROLE,
  MIXPANEL_EVENTS,
  Settings,
  TDateISODate,
} from '@bloobirds-it/types';
import {
  api,
  getUserTimeZone,
  getValueFromLogicRole,
  recoverScrollOfBox,
  removeScrollOfBox,
} from '@bloobirds-it/utils';
import mixpanel from 'mixpanel-browser';
import spacetime from 'spacetime';

import ActivityDetailsForm, {
  FormDataInterface,
} from '../components/activityDetailsForm/activityDetailsForm';
import { BloobirdsCalendarsSelector } from '../components/bloobirdsCalendarsSelector/bloobirdsCalendarsSelector';
import { Calendar, Invitee, InviteeCard } from '../components/calendar/calendar';
import { CalendarsSelector } from '../components/calendarsSelector/calendarsSelector';
import { MainInfoForm } from '../components/mainInfoForm/mainInfoForm';
import { NotesForm } from '../components/notesForm/notesForm';
import { SearchLeadsGuests } from '../components/searchLeadsGuests/searchLeadsGuests';
import { RemindeBeforeType, useCalendar } from '../hooks/useCalendar';
import MeetingModalContext from './context';
import styles from './meetingModal.module.css';

export interface CalendarsWithColors {
  calendarId: string | undefined;
  color: ColorType | undefined;
  barColor: ColorType | undefined;
}

function stringifyArrays(obj: any) {
  const transformedObj = {};
  if (!transformedObj) {
    return null;
  }
  if (Object.keys(obj)?.length === 0) {
    return {};
  }
  for (const key in obj) {
    if (Array.isArray(obj[key])) {
      transformedObj[key] = JSON.stringify(obj[key]);
    } else {
      transformedObj[key] = obj[key];
    }
  }
  return transformedObj;
}

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

interface MeetingModalProps {
  id: string;
  accountId: string;
  userId: string;
  settings: Settings;
  connections: Connections;
  mutateConnections: () => void;
  dataModel: DataModelResponse;
}

function ModalChild() {
  const { id, accountId, settings, userId, connections, mutateConnections, dataModel } = useContext(
    MeetingModalContext,
  );
  const { closeModal, minimize, data: formData, bobject, onSave, onClose } = useMinimizableModal<
    FormDataInterface
  >(id);
  const isEditionModal = !!bobject;
  const [changeTimezoneModalVisible, setChangeTimezoneModalVisible] = useState<boolean>(false);
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });
  const ref = useRef();
  const users = useUserSearch();
  const { isDesktop, isSmallDesktop, isMediumDesktop } = useMediaQuery();
  const { t } = useTranslation('translation', { keyPrefix: 'meetingModal' });
  const {
    setEventTypesSelected,
    eventsTypeSelected,
    invitees,
    setInvitees,
    setDate,
    date,
    resetDate,
    calendarsAvailable,
    mutateCalendars,
    selectedTimezone,
    setSelectedTimezone,
    eventsPerDay,
    skipCalendarCreation,
    loading,
    setSkipCalendarCreation,
    resetInvitees,
    setBannedEvent,
    meetingDuration,
  } = useCalendar();

  const parsedFormData = {
    title:
      formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]
        ? formData[ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]
        : null,
    dateTime:
      formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.TIME]
        ? new Date(formData[ACTIVITY_FIELDS_LOGIC_ROLE.TIME])
        : null,
    duration:
      formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION]
        ? formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION]
        : meetingDuration || 60,
    calendarNotes:
      formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE]
        ? deserialize(formData[ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE], {
            format: 'HTML',
            plugins,
          })
        : null,
    internalNotes:
      formData && formData[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]
        ? deserialize(formData[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE], {
            format: 'HTML',
            plugins,
          })
        : null,
    ...formData,
    // @ts-ignore
    company: formData?.company?.data || formData?.company,
    // @ts-ignore
    lead: formData?.lead?.data || formData?.lead,
    // @ts-ignore
    opportunity: formData?.opportunity?.data || formData?.opportunity,
  };
  const activityTypes = dataModel?.findValuesByFieldLogicRole(ACTIVITY_FIELDS_LOGIC_ROLE.TYPE);
  const methods = useForm({
    defaultValues: {
      ...parsedFormData,
    },
  });

  const { watch, control, getValues, formState, handleSubmit } = methods;
  // @ts-ignore
  useController({ control, name: ACTIVITY_FIELDS_LOGIC_ROLE.USER, defaultValue: userId });
  useController({
    control,
    // @ts-ignore
    name: ACTIVITY_FIELDS_LOGIC_ROLE.TYPE,
    defaultValue: activityTypes?.find(
      (activityType: any) => activityType?.logicRole === ACTIVITY_TYPES_VALUES_LOGIC_ROLE.MEETING,
    )?.id,
  });
  const openCalendarPopupAfterMeeting = settings?.settings?.openCalendarPopupAfterMeeting;
  const calendarEventDecision = settings?.settings?.calendarEventDecision;
  const createAlwaysOnLinkedCalendar =
    calendarEventDecision === 'IMPERATIVE' && openCalendarPopupAfterMeeting;
  const createInCalendarCheckboxDisabled =
    calendarEventDecision === 'IMPERATIVE' || !openCalendarPopupAfterMeeting;
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isValid, submitCount } = formState;
  const canSave = submitCount === 0 || isValid;
  const { createToast } = useToasts();
  const lead = watch('lead');
  const company = watch('company');

  useEffect(() => {
    if (formData[ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID]) {
      setBannedEvent(formData[ACTIVITY_FIELDS_LOGIC_ROLE.UNIQUE_NYLAS_ID] as string);
    }
    if (createAlwaysOnLinkedCalendar) setSkipCalendarCreation(false);
  }, []);
  // @ts-ignore
  const user = watch(ACTIVITY_FIELDS_LOGIC_ROLE.USER);
  const activityUser = users?.users?.find(u => ((user as unknown) as string) === u?.id);

  function handleClose() {
    resetInvitees();
    resetDate();
    closeModal();
  }
  const inviteesNotSynced =
    isEditionModal && !getValueFromLogicRole(bobject, ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES);

  useEffect(() => {
    if (formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]) {
      setInvitees(JSON.parse(formData[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]));
    } else {
      const newInvitees: Invitee[] = [];
      if (!!settings && !!connections) {
        const defaultConnection = connections.defaultConnection || connections.list[0]?.email;
        newInvitees.push({
          type: 'Organizer',
          email: activityUser ? activityUser?.email : defaultConnection,
          name: activityUser
            ? activityUser?.name
            : `${settings?.user?.name} (${t('bloobirdsCalendarSelector.you')})`,
        });
      }

      if (lead) {
        const leadEmail = lead?.email || getValueFromLogicRole(lead, 'LEAD__EMAIL');
        const leadName = lead?.fullName || getValueFromLogicRole(lead, 'LEAD__NAME');
        if (leadEmail) {
          newInvitees.push({ type: 'Lead', email: leadEmail, name: leadName });
        }
      }
      if (company) {
        const companyEmail = getEmailFromCompany(company);
        const companyName = company?.name || getValueFromLogicRole(company, 'COMPANY__NAME');
        if (companyEmail) {
          newInvitees.push({ type: 'Company', email: companyEmail.value, name: companyName });
        }
      }
      if (invitees?.length === 0) {
        setInvitees(newInvitees);
      }
    }
  }, []);

  const removeInvitee = (email: string) => {
    setInvitees(currInvitees => currInvitees?.filter(invitee => invitee?.email !== email));
  };

  const onSubmit = (values: any) => {
    setIsSubmitting(true);
    const {
      company,
      lead,
      opportunity,
      duration,
      dateTime,
      title,
      calendarNotes,
      internalNotes,
      reminderTemplate,
      reminderBefore,
      reminderBeforeType,
      conferencingGoogleMeet,
      ...rest
    } = values;

    const serializeNoteText = serialize(calendarNotes, {
      format: 'AST',
      plugins,
    });

    const serializeInternalNoteText = serialize(internalNotes, {
      format: 'AST',
      plugins,
    });

    if (isEditionModal) {
      api
        .patch(`/bobjects/${bobject?.id?.value}/raw`, {
          ...stringifyArrays(rest),
          [ACTIVITY_FIELDS_LOGIC_ROLE.TIME]: dateTime,
          [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_DURATION]: duration,
          [ACTIVITY_FIELDS_LOGIC_ROLE.COMPANY]: company?.id?.value,
          [ACTIVITY_FIELDS_LOGIC_ROLE.LEAD]: lead?.id?.value,
          [ACTIVITY_FIELDS_LOGIC_ROLE.TITLE]: title,
          [ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_INVITEES]: JSON.stringify(invitees),
          [ACTIVITY_FIELDS_LOGIC_ROLE.CALENDAR_NOTE]: serializeNoteText,
          [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: serializeInternalNoteText,
        })
        .then(() => {
          createToast({
            type: 'success',
            message: t('toasts.updateSuccess'),
          });
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_UPDATE_FROM_CALENDAR_MODAL);
          handleClose();
          setIsSubmitting(false);
          onSave?.();
        })
        .catch(() => {
          createToast({
            type: 'error',
            message: t('toasts.somethingHappenedWhileUpdating'),
          });
          setIsSubmitting(false);
          onSave?.();
        });
    } else {
      const reminderBeforeMuliplicator =
        reminderBeforeType === RemindeBeforeType.days
          ? 1440
          : reminderBeforeType === RemindeBeforeType.hours
          ? 60
          : 1;
      const data = {
        title,
        meetingDateTime: dateTime,
        meetingDuration: duration,
        company: company?.id?.value,
        lead: lead?.id?.value,
        opportunity:
          formData?.opportunity?.data?.id?.value ||
          formData?.opportunity?.id?.value ||
          opportunity?.id?.value,
        calendarId: calendarsAvailable?.data?.find(c => c.primary)?.id,
        accountId: calendarsAvailable?.data?.find(c => c.primary)?.accountId,
        invitees: invitees.map(i => i.email),
        inviteesDetails: invitees,
        otherFields: stringifyArrays(rest),
        reminderTemplateId: reminderTemplate,
        conferencingGoogleMeet,
        reminderTimeInMinutes: reminderBefore * reminderBeforeMuliplicator,
        skipCalendarEventCreation:
          connections?.list?.length === 0 ||
          !calendarsAvailable ||
          skipCalendarCreation ||
          !openCalendarPopupAfterMeeting,
        calendarNotes: serializeNoteText,
        internalNotes: serializeInternalNoteText,
      };
      api
        .post('/messaging/calendar/event', data)
        .then(() => {
          createToast({
            type: 'success',
            message: t('toasts.success'),
          });
          mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_CREATE_FROM_CALENDAR_MODAL);
          handleClose();
          setIsSubmitting(false);
          onSave?.();
        })
        .catch(() => {
          createToast({
            type: 'error',
            message: t('toasts.somethingHappenedWhileCreating'),
          });
          setIsSubmitting(false);
          onSave?.();
        });
    }
  };

  const isoDate = spacetime(date).format('iso-short') as TDateISODate;
  const modalWidth = isDesktop ? 1400 : isMediumDesktop ? 1100 : isSmallDesktop ? 1000 : 700;
  const leadProspectingStageId = dataModel
    ?.findFieldByLogicRole(LEAD_FIELDS_LOGIC_ROLE.STAGE)
    ?.values.find(stage => stage.name === 'Prospecting')?.id;
  const isLeadProspectingStage =
    !formData?.lead?.stage ||
    formData?.lead?.stage === LEAD_STAGE_LOGIC_ROLE.PROSPECT ||
    formData?.lead.stage === leadProspectingStageId;
  const companyProspectingStageId = dataModel
    ?.findFieldByLogicRole(COMPANY_FIELDS_LOGIC_ROLE.STAGE)
    ?.values.find(stage => stage.name === 'Prospecting')?.id;
  const isProspectingStage =
    isLeadProspectingStage ||
    !formData?.company?.stage ||
    formData?.company?.stage === COMPANY_STAGE_LOGIC_ROLE.PROSPECT ||
    formData?.company?.stage === companyProspectingStageId;
  const { openDeleteModal } = useConfirmDeleteModal();
  const handleDelete = () => {
    openDeleteModal(
      bobject,
      false,
      () => {},
      () => {
        createToast({ message: t('toasts.deleteSuccess'), type: 'success' });
        handleClose();
        onSave?.();
        onClose?.();
      },
    );
  };

  useEffect(() => {
    removeScrollOfBox();
    return recoverScrollOfBox;
  }, []);

  const { field: notesField } = useController({
    control,
    name: 'calendarNotes',
  });

  const { field: internalNotesField } = useController({
    control,
    name: 'internalNotes',
  });

  const activityAccountExecutiveField = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
  );
  const accountExecutivePicklistValues = activityAccountExecutiveField?.values;
  const activityAssignedToField = dataModel?.findFieldByLogicRole(
    ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO,
  );
  const activityAssignedToValues = activityAssignedToField?.values;

  const isOTOAccount = useIsOTOAccount();
  const isFullSalesEnabled = useFullSalesEnabled(accountId);

  const {
    field: { value: assignedToValue, onChange: activityAssignedToOnChange },
  } = useController({
    control,
    // @ts-ignore
    name: ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO,
    defaultValue: '',
    rules: { required: activityAssignedToField?.required && isFullSalesEnabled },
  });
  const errorAssignedTo =
    formState?.errors &&
    formState?.errors[ACTIVITY_FIELDS_LOGIC_ROLE.MEETING_ASSIGNED_TO] &&
    t('thisFieldIsRequired');

  const {
    field: { value: accountExecutive, onChange: accountExecutiveOnChange },
  } = useController({
    control,
    // @ts-ignore
    name: ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE,
    rules: { required: activityAccountExecutiveField?.required && !isFullSalesEnabled },
  });
  const errorAe =
    formState?.errors &&
    formState?.errors[ACTIVITY_FIELDS_LOGIC_ROLE.ACCOUNT_EXECUTIVE] &&
    t('thisFieldIsRequired');

  return (
    <Modal open={true} onClose={handleClose} width={modalWidth} className={styles.modal__container}>
      {/*@ts-ignore*/}
      <FormProvider {...methods}>
        <div className={styles._header__container}>
          <div className={styles._header__date_picker}>
            <Text size="l" weight="regular">
              {useGetI18nSpacetime(date, getUserTimeZone()).format('{month} {year}')}
            </Text>
            <IconButton
              name="chevronLeft"
              onClick={() => setDate(date => spacetime(date).subtract(1, 'week').toNativeDate())}
              size={16}
            />
            <IconButton
              name="chevronRight"
              onClick={() => setDate(date => spacetime(date).add(1, 'week').toNativeDate())}
              size={16}
            />
            <Button variant="secondary" size="small" onClick={() => setDate(new Date())}>
              {t('today')}
            </Button>
          </div>
          <div className={styles._header__spacer} />
          <div className={styles._header_right_actions}>
            {loading && <Spinner name="loadingCircle" size={16} />}
            <Text size="xs" color="softPeanut">
              {t('timezone')}: {selectedTimezone}{' '}
              <span
                className={styles._timezone_selector}
                onClick={() => setChangeTimezoneModalVisible(true)}
              >
                {t('change')}
              </span>
            </Text>
            {changeTimezoneModalVisible && (
              <ChangeTimezoneModal
                onChange={value => {
                  setSelectedTimezone(value);
                  setChangeTimezoneModalVisible(false);
                }}
                onClose={() => setChangeTimezoneModalVisible(false)}
                defaultTimezone={selectedTimezone}
              />
            )}
            <div className={styles._event_type_selector}>
              <div
                className={styles._event_type}
                style={{
                  backgroundColor:
                    eventsTypeSelected === 'bloobirds' ? 'var(--bloobirds)' : 'var(--white)',
                  borderTopLeftRadius: '4px',
                  borderBottomLeftRadius: '4px',
                }}
                onClick={() => setEventTypesSelected('bloobirds')}
              >
                <Text size="xs" color={eventsTypeSelected === 'bloobirds' ? 'white' : 'bloobirds'}>
                  Bloobirds
                </Text>
              </div>
              <div
                className={styles._event_type}
                style={{
                  backgroundColor:
                    eventsTypeSelected === 'nylas' ? 'var(--bloobirds)' : 'var(--white)',
                  borderTopRightRadius: '4px',
                  borderBottomRightRadius: '4px',
                }}
                onClick={() => setEventTypesSelected('nylas')}
              >
                <Icon
                  name="calendar"
                  size={12}
                  color={eventsTypeSelected === 'nylas' ? 'white' : 'bloobirds'}
                />
                <Text size="xs" color={eventsTypeSelected === 'nylas' ? 'white' : 'bloobirds'}>
                  {t('calendarName')}
                </Text>
              </div>
            </div>
            <div className={styles._calendar_select}>
              {eventsTypeSelected === 'nylas' ? (
                <CalendarsSelector
                  connections={connections}
                  disabled={eventsTypeSelected === 'nylas' && connections?.list?.length === 0}
                />
              ) : (
                <BloobirdsCalendarsSelector />
              )}
            </div>
            <IconButton
              name="minus"
              size={24}
              onClick={() =>
                // @ts-ignore
                minimize({
                  data: getValues(),
                  title: getValues()?.title || t('untitledEvent'),
                  bobject,
                })
              }
            />
            <IconButton name="cross" size={24} onClick={handleClose} />
          </div>
        </div>
        <div className={styles._body}>
          <div className={styles._form_column} ref={ref}>
            <MainInfoForm
              prospectingStage={isProspectingStage}
              accountId={accountId}
              isEditionModal={isEditionModal}
            />

            <div className={styles._row_header}>
              <Text size="m">{t('guests')}</Text>
            </div>
            <div>
              {!isOTOAccount &&
                (isFullSalesEnabled ? (
                  <Select
                    value={assignedToValue}
                    placeholder={`${activityAssignedToField?.name || t('meetingAssignedTo')} ${
                      activityAssignedToField?.required ? '*' : ''
                    }`}
                    width="100%"
                    size="labeled"
                    // @ts-ignore
                    portal={false}
                    borderless={false}
                    onChange={(v: string) => {
                      activityAssignedToOnChange(v);
                    }}
                    error={errorAssignedTo}
                    autocomplete={
                      activityAssignedToValues?.filter((ae: any) => ae?.isEnabled)?.length > 7
                    }
                  >
                    {activityAssignedToValues
                      ?.filter((ae: any) => ae?.isEnabled)
                      .map((ae: any) => (
                        <Item
                          key={ae.id}
                          value={ae?.id}
                          label={ae.name}
                          onClick={(v: string) => {
                            const user = users?.users?.find((user: any) => user?.id === v);
                            if (!invitees?.find(invitee => invitee?.email === user?.email)) {
                              setInvitees(curr => [
                                ...curr,
                                {
                                  type: 'AE',
                                  email: user?.email,
                                },
                              ]);
                            }
                          }}
                        >
                          {ae.name}
                        </Item>
                      ))}
                  </Select>
                ) : (
                  <Select
                    width="100%"
                    value={accountExecutive}
                    placeholder={`${t('accountExecutive')} ${
                      activityAccountExecutiveField?.required ? '*' : ''
                    }`}
                    size="labeled"
                    borderless={false}
                    // @ts-ignore
                    portal={false}
                    onChange={(v: string) => {
                      accountExecutiveOnChange(v);
                    }}
                    error={errorAe}
                    autocomplete={
                      accountExecutivePicklistValues?.filter((ae: any) => ae?.isEnabled)?.length > 7
                    }
                  >
                    {accountExecutivePicklistValues
                      ?.filter((ae: any) => ae?.isEnabled)
                      .map((ae: any) => (
                        <Item
                          key={ae.id}
                          value={ae?.id}
                          label={ae?.name}
                          onClick={(v: string) => {
                            const ae = accountExecutivePicklistValues?.find(
                              (ae: any) => ae?.id === v,
                            );
                            if (!invitees?.find(invitee => invitee?.email === ae?.name)) {
                              setInvitees(curr => [
                                ...curr,
                                {
                                  type: 'AE',
                                  email: ae?.name,
                                },
                              ]);
                            }
                          }}
                        >
                          {ae?.name}
                        </Item>
                      ))}
                  </Select>
                ))}
            </div>
            {inviteesNotSynced && (
              <div className={styles.inviteesNotSynced}>
                <Text size="s" color="peanut">
                  {t('inviteesNotSynced')}
                </Text>
              </div>
            )}
            {!inviteesNotSynced && (
              <div className={styles.searchLeads}>
                <SearchLeadsGuests
                  size={16}
                  handleSelect={leadSelected => {
                    const isLead =
                      typeof leadSelected !== 'string' &&
                      typeof leadSelected?.id !== 'string' &&
                      leadSelected?.id?.value;
                    const isCoworker =
                      typeof leadSelected !== 'string' &&
                      'type' in leadSelected &&
                      leadSelected.type === 'Coworker';
                    if (isLead) {
                      const leadEmail = getValueFromLogicRole(
                        leadSelected as Bobject,
                        LEAD_FIELDS_LOGIC_ROLE.EMAIL,
                      );
                      const leadName = getValueFromLogicRole(
                        leadSelected as Bobject,
                        LEAD_FIELDS_LOGIC_ROLE.FULL_NAME,
                      );
                      if (!invitees?.find(invitee => invitee?.email === leadEmail)) {
                        // @ts-ignore
                        setInvitees(curr => [
                          ...curr,
                          {
                            type: 'Lead',
                            email: leadEmail,
                            name: leadName,
                            leadId:
                              typeof leadSelected?.id === 'string' ? null : leadSelected?.id?.value,
                          },
                        ]);
                      }
                    } else if (isCoworker) {
                      if (!invitees?.find(invitee => invitee?.email === leadSelected.email)) {
                        // @ts-ignore
                        setInvitees(curr => [...curr, leadSelected]);
                      }
                    } else {
                      if (!invitees?.find(invitee => invitee?.email === leadSelected)) {
                        // @ts-ignore
                        setInvitees(curr => [
                          ...curr,
                          {
                            type: null,
                            email: leadSelected as string,
                            name: null,
                            leadId: null,
                          },
                        ]);
                      }
                    }
                  }}
                  company={company}
                  inviteesEmails={invitees?.map(i => i.email)}
                />
              </div>
            )}
            <div className={styles.inviteesList}>
              {invitees?.map(i => (
                <InviteeCard
                  invitee={i}
                  key={i.email}
                  handleRemoveInvitee={removeInvitee}
                  readOnly={false}
                  shouldShowStatus={isEditionModal}
                />
              ))}
            </div>
            <NotesForm
              notesField={notesField}
              title={t('noteCalendar.title')}
              placeholder={t('noteCalendar.placeholder')}
            />
            <NotesForm
              notesField={internalNotesField}
              title={t('noteInternal.title')}
              placeholder={t('noteInternal.placeholder')}
            />
            <ActivityDetailsForm
              isEditionModal={isEditionModal}
              formData={{ company, lead }}
              accountId={accountId}
            />
          </div>
          <Calendar
            day={isoDate}
            mode="week"
            events={eventsPerDay}
            notConnected={eventsTypeSelected === 'nylas' && connections?.list?.length === 0}
            onCalendarReconnect={() => {
              mutateConnections().then(() => {
                mutateCalendars();
              });
            }}
            selectedTimezone={selectedTimezone}
          />
        </div>
        <ModalFooter className={styles.footer}>
          <div>
            <Button variant="tertiary" onClick={handleClose}>
              {t('cancel')}
            </Button>
            {isEditionModal && (
              <Button variant="tertiary" color="tomato" onClick={handleDelete}>
                {t('delete')}
              </Button>
            )}
          </div>
          <div className={styles._footer_buttons_right}>
            {connections?.list?.length > 0 && !isEditionModal && (
              <Tooltip
                /* @ts-ignore */
                title={createInCalendarCheckboxDisabled && t('notAllowedTitle')}
                position="top"
              >
                <Checkbox
                  size="small"
                  checked={
                    createAlwaysOnLinkedCalendar
                      ? createAlwaysOnLinkedCalendar
                      : !skipCalendarCreation
                  }
                  disabled={createInCalendarCheckboxDisabled}
                  onClick={v => setSkipCalendarCreation(!v)}
                >
                  {t('createEventInCalendar')}
                </Checkbox>
              </Tooltip>
            )}
            <Button
              disabled={isSubmitting || !canSave}
              variant="primary"
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <Spinner size={16} color="bloobirds" name="loadingCircle" />
              ) : (
                `${isEditionModal ? t('save') : t('create')}`
              )}
            </Button>
          </div>
        </ModalFooter>
      </FormProvider>
    </Modal>
  );
}

export const MeetingModal = (props: MeetingModalProps) => {
  const initialContext = {
    id: props?.id,
    accountId: props?.accountId,
    userId: props?.userId,
    settings: props?.settings,
    connections: props?.connections,
    mutateConnections: props?.mutateConnections,
    dataModel: props?.dataModel,
  };
  return (
    <MeetingModalContext.Provider value={initialContext}>
      <ModalChild />
    </MeetingModalContext.Provider>
  );
};
