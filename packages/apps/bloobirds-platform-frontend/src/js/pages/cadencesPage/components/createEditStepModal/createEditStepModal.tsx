import React, { useEffect, useState } from 'react';
import { Controller, FieldError, FormProvider, useController, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Banner } from '@bloobirds-it/banner';
import { useCadenceSteps } from '@bloobirds-it/cadence';
import {
  Button,
  Checkbox,
  Icon,
  Input,
  Item,
  Modal,
  ModalCloseIcon,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalSection,
  ModalTitle,
  Radio,
  RadioGroup,
  Select,
  Spinner,
  Text,
  TextArea,
  Tooltip,
  useToasts,
} from '@bloobirds-it/flamingo-ui';
import { useCustomTasks } from '@bloobirds-it/hooks';
import {
  EditorToolbar,
  EditorToolbarControlsSection,
  EditorToolbarFontStylesSection,
  EditorToolbarListsSection,
  EditorToolbarSection,
  EditorToolbarTemplateVariable,
  EditorToolbarTextMarksSection,
  RichTextEditor,
  useRichTextEditorPlugins,
} from '@bloobirds-it/rich-text-editor';
import {
  BobjectType,
  CadenceActionType,
  CadenceStep,
  SaveCadenceStepCommand,
  UserHelperKeys,
  UserPermission,
  TemplateSegmentationValues,
} from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { APP_PLAYBOOK_CUSTOM_TASKS } from '../../../../app/_constants/routes';
import LogoCheckbox from '../../../../components/logoCheckbox';
import { useUserSettings } from '../../../../components/userPermissions/hooks';
import { MIXPANEL_EVENTS } from '../../../../constants/mixpanel';
import useCadenceStep from '../../../../hooks/useCadenceStep';
import {
  useNewCadenceTableEnabled,
  useTemplatesForEveryone,
} from '../../../../hooks/useFeatureFlags';
import { useQueryParam } from '../../../../hooks/useQueryParams';
import { useUserHelpers } from '../../../../hooks/useUserHelpers';
import AutomatedEmailModal from './automatedEmailModal/automatedEmailModal';
import ClockTimeSelect from './clockTimeSelect/clockTimeSelect';
import styles from './createEditStepModal.module.css';
import { parseTemplateData, prepareValues } from './createEditStepModal.utils';
import { templateDictionary, TemplateManager } from './templateManager/templateManager';

interface CreateEditStepModalProps {
  id?: string;
  bobjectType: BobjectType;
  onClose: () => void;
  refreshCadences?: () => void;
}

interface TemplateInfo {
  id: string;
  subject: string;
  body: string;
}

interface EmailTemplateInfo extends TemplateInfo {
  name?: string;
  segmentationValues?: TemplateSegmentationValues;
}

export interface FormValues extends SaveCadenceStepCommand {
  skippeableConfig: string;
  overrideMandatory: boolean;
  templates: {
    emailTemplate: EmailTemplateInfo;
    linkedInTemplate: TemplateInfo;
    pitchTemplate: TemplateInfo;
    whatsappTemplate: TemplateInfo;
  };
}

const optOutEditorDefaultValue = [
  {
    type: 'p',
    children: [
      { text: "PS: If you don't want to hear from me anymore, just let me know by " },
      {
        type: 'a',
        url: 'https://optout.com/',
        children: [{ text: 'clicking here' }],
      },
      { text: '' },
    ],
  },
];

export const CreateEditStepModal = ({
  id: stepId,
  bobjectType,
  refreshCadences,
  onClose,
}: CreateEditStepModalProps) => {
  const isEdition = !!stepId;
  const { createToast } = useToasts();
  const cadenceId = useQueryParam('cadence', true);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const { steps, createStep, updateStep, deleteStep } = useCadenceSteps(cadenceId);
  const { step } = useCadenceStep(cadenceId, stepId);
  const isNewCadenceEnabled = useNewCadenceTableEnabled();
  const {
    user: { permissions },
  } = useUserSettings();
  const { save } = useUserHelpers();

  const optOutPlugins = useRichTextEditorPlugins({
    templateVariables: false,
    replaceTemplateVariables: false,
    singleLine: true,
    marks: true,
    elements: true,
    images: false,
    autoReplace: false,
  });

  const methods = useForm<FormValues>({ shouldUnregister: false });
  const {
    formState: { isSubmitting },
    handleSubmit,
    errors,
    control,
    reset,
    watch,
    trigger,
    getValues,
    setValue,
    setError,
    clearErrors,
  } = methods;

  const latestDay = steps.reduce((maxDay: number, step: CadenceStep) => {
    return step.dayNumber > maxDay ? step.dayNumber : maxDay;
  }, -1);

  useEffect(() => {
    if (isEdition && step) {
      reset(prepareValues(step));
    }
  }, [isEdition, step]);

  useEffect(() => {
    if (!isEdition) {
      reset({
        dayNumber: latestDay + 2,
      });
    }
  }, [isEdition, latestDay]);

  const { customTasks } = useCustomTasks({ disabled: false });

  const saveForm = async (data: FormValues) => {
    if (!emailModalVisible && data.actionTypes.includes('AUTOMATED_EMAIL')) {
      setEmailModalVisible(true);
      return;
    }
    if (data.optOutContent) {
      data.optOutContent = JSON.stringify(data.optOutContent);
    }
    try {
      const parsedData = parseTemplateData(data);
      if (isEdition) {
        await updateStep(parsedData, stepId);
        mixpanel.track(MIXPANEL_EVENTS.STEP_UPDATED);
        createToast({
          message: 'Step updated successfully',
          type: 'success',
        });
        onClose();
      } else {
        await createStep(parsedData);
        save(UserHelperKeys.CREATE_YOUR_FIRST_CADENCE_STEP);
        if (isAutomatedStepSelected) save(UserHelperKeys.SEND_FIRST_AUTO_EMAIL);
        mixpanel.track(MIXPANEL_EVENTS.STEP_ADDED);
        createToast({
          message: 'Step created successfully',
          type: 'success',
        });
        onClose();
      }
    } catch (e) {
      console.error('ERROR', e);
      createToast({
        message: 'Failed to save the changes',
        type: 'error',
      });
    }
    refreshCadences?.();
  };

  const handleDelete = async () => {
    deleteStep(stepId).then(() => {
      refreshCadences();
      createToast({ message: 'Step deleted successfully!', type: 'success' });
      onClose();
    });
  };
  const hasTemplatesForEveryone = useTemplatesForEveryone();
  const skippeableConfig = watch('skippeableConfig', 'DEFAULT');
  const actionTypes = watch('actionTypes', []);
  const automationSchedulingMode = watch('automationSchedulingMode', 'RANGE');
  const startAutomationRange = watch('startAutomationRange');
  const customTaskId = watch('customTaskId');
  const dayNumber = watch('dayNumber');
  const description = watch('description');
  const optOutEnabled = watch('optOutEnabled');
  const isAutomatedStepSelected = actionTypes.includes('AUTOMATED_EMAIL');
  const isCustomTaskSelected = actionTypes.includes('CUSTOM_TASK');
  const hasActions = actionTypes.length > 0;
  const firstError = Object.values(errors)?.[0] as FieldError;
  const canSelectDelay = dayNumber === 1;
  const history = useHistory();
  const templates = watch('templates');

  const [checkedSelectTemplates, setCheckedSelectTemplates] = useState(
    isCustomTaskSelected ? !!templates?.whatsappTemplate?.id : !!templates,
  );

  useEffect(() => {
    if (!hasActions) {
      setCheckedSelectTemplates(false);
    } else {
      setCheckedSelectTemplates(isCustomTaskSelected ? !!templates?.whatsappTemplate : !!templates);
    }
  }, [hasActions, isCustomTaskSelected]);

  const isEnableSave =
    !checkedSelectTemplates ||
    (checkedSelectTemplates &&
      !!(
        templates?.emailTemplate?.id ||
        templates?.whatsappTemplate?.id ||
        templates?.pitchTemplate?.id ||
        templates?.linkedInTemplate?.id
      ));

  const canCreateCustomTasks = permissions.includes(UserPermission.CUSTOM_TASK);

  const isStepCompleted =
    !isCustomTaskSelected ||
    (dayNumber !== undefined &&
      automationSchedulingMode !== undefined &&
      customTaskId !== undefined &&
      !errors.customTaskId &&
      description !== undefined);

  useEffect(() => {
    if (
      isCustomTaskSelected &&
      automationSchedulingMode !== 'ALL_DAY' &&
      automationSchedulingMode !== 'START'
    ) {
      setValue('automationSchedulingMode', 'ALL_DAY');
    }
  }, [isCustomTaskSelected]);

  useEffect(() => {
    if (!isEdition) {
      setValue('description', customTasks?.find(t => t.id === customTaskId)?.description);
    }
    const sameDaySteps = steps.filter(step => {
      return step.dayNumber === dayNumber - 1 && step.id !== stepId;
    });
    if (errors.customTaskId) {
      clearErrors('customTaskId');
    }
    if (sameDaySteps.length > 0 && actionTypes.length > 0) {
      const customTasksForSameDay = sameDaySteps.flatMap(step => step.customTaskId);
      const hasRepeatedCustomTasks = customTasksForSameDay.find(ctid => ctid === customTaskId);

      if (isCustomTaskSelected) {
        if (hasRepeatedCustomTasks) {
          setError('customTaskId', {
            message: 'Cannot have repeated custom task steps on the same day',
          });
        } else {
          clearErrors('customTaskId');
        }
      }
    }
  }, [customTaskId, dayNumber, setError]);
  useEffect(() => {
    if (actionTypes.length > 0) {
      trigger('dayNumber');
    }
    clearErrors('customTaskId');
  }, [actionTypes?.length]);

  useEffect(() => {
    if (!canSelectDelay && isAutomatedStepSelected) {
      setValue('automationSchedulingMode', 'RANGE');
    }
  }, [dayNumber]);

  const {
    field: { value, onChange },
  } = useController({
    control,
    name: 'optOutContent',
    defaultValue: optOutEditorDefaultValue,
  });

  const isManualStepSelected =
    (hasTemplatesForEveryone &&
      !isAutomatedStepSelected &&
      !isCustomTaskSelected &&
      actionTypes.length > 0) ||
    actionTypes.includes('EMAIL');

  const isWhatsappCustomTasks =
    hasTemplatesForEveryone &&
    isCustomTaskSelected &&
    customTasks.find(task => task.id === customTaskId)?.logicRole?.includes('WHATSAPP');

  return (
    <Modal open dataTest={'CreateEditStep'} onClose={onClose} width={740}>
      <FormProvider {...methods}>
        {emailModalVisible && (
          <AutomatedEmailModal
            bobjectType={bobjectType}
            step={{
              ...step,
              ...getValues(),
            }}
            onClose={() => setEmailModalVisible(false)}
            onSave={data => {
              setEmailModalVisible(false);
              saveForm(data);
            }}
            isAutomatedStep={isAutomatedStepSelected}
          />
        )}
        <form onSubmit={handleSubmit(saveForm)} className={styles.form}>
          <ModalHeader variant="gradient" color="bloobirds">
            <ModalTitle variant="gradient">
              <div className={styles.title}>
                <Icon color="white" name="check" size={24} />
                <Text color="white" size="m">
                  {isEdition ? 'Edit' : 'Add'} a step
                </Text>
              </div>
            </ModalTitle>
            <ModalCloseIcon variant="gradient" onClick={onClose} />
          </ModalHeader>
          {isEdition && (
            <div className={styles.warningBanner}>
              <Banner type="softWarning" icon="postpone">
                <Text htmlTag="span" size="xs">
                  Changes to delivery hours or selected template{' '}
                  <b>will only apply to started cadences</b> after saving your changes. Active
                  cadences will need <b>to be stopped then started again</b> to go through the
                  updated cadence steps.
                </Text>
              </Banner>
            </div>
          )}
          {firstError && (
            <Banner type="error" icon="cross">
              {firstError.message}
            </Banner>
          )}
          <Controller
            control={control}
            name="actionTypes"
            defaultValue={[]}
            rules={{
              validate: value => {
                if (value.length === 0) {
                  return 'At least one type of action is required to save the day';
                }
              },
            }}
            render={({ onChange, value: actionTypes }) => {
              const isAutomatedStepSelected = actionTypes.includes('AUTOMATED_EMAIL');
              const isCustomTaskSelected = actionTypes.includes('CUSTOM_TASK');
              const isManualStepSelected =
                !isAutomatedStepSelected && !isCustomTaskSelected && actionTypes.length > 0;

              const handleChange = (value: CadenceActionType) => {
                if (actionTypes.includes(value)) {
                  if (
                    value === 'PHONE_CALL' ||
                    value === 'EMAIL' ||
                    value === 'LINKEDIN_MESSAGE' ||
                    value === 'CUSTOM_TASK'
                  ) {
                    setValue(`templates.${templateDictionary[value].formKey}`, undefined);
                  }
                  onChange(actionTypes.filter((action: CadenceActionType) => action !== value));
                } else {
                  reset({ ...getValues(), automationSchedulingMode: 'RANGE' });
                  onChange(actionTypes ? [...actionTypes, value] : [value]);
                }
              };

              return (
                <div className={styles.stepSelector}>
                  <LogoCheckbox
                    logo={() => <Icon name="phone" size={40} color="extraCall" />}
                    name="Phone Call"
                    checked={actionTypes.includes('PHONE_CALL')}
                    onChange={handleChange}
                    value="PHONE_CALL"
                    color="bloobirds"
                    selectedColor="verySoftMelon"
                    disabled={isAutomatedStepSelected || isCustomTaskSelected}
                  />
                  <LogoCheckbox
                    logo={() => <Icon name="mail" size={40} color="tangerine" />}
                    name="Manual email"
                    checked={actionTypes.includes('EMAIL')}
                    onChange={handleChange}
                    value="EMAIL"
                    color="bloobirds"
                    selectedColor="verySoftTangerine"
                    disabled={isAutomatedStepSelected || isCustomTaskSelected}
                  />
                  <LogoCheckbox
                    logo={() => <Icon name="linkedin" size={40} />}
                    name="LinkedIn"
                    checked={actionTypes.includes('LINKEDIN_MESSAGE')}
                    onChange={handleChange}
                    value="LINKEDIN_MESSAGE"
                    color="bloobirds"
                    selectedColor="veryLightBloobirds"
                    disabled={isAutomatedStepSelected || isCustomTaskSelected}
                  />
                  {isNewCadenceEnabled && (
                    <>
                      <div className={styles.verticalDivider} />
                      <LogoCheckbox
                        logo={() => <Icon name="edit" size={40} color="banana" />}
                        name="Custom Task"
                        checked={actionTypes.includes('CUSTOM_TASK')}
                        onChange={handleChange}
                        value="CUSTOM_TASK"
                        color="bloobirds"
                        selectedColor="verySoftBanana"
                        disabled={isManualStepSelected || isAutomatedStepSelected}
                      />
                    </>
                  )}

                  <div className={styles.verticalDivider} />
                  <LogoCheckbox
                    logo={() => <Icon name="autoMail" size={40} color="tangerine" />}
                    name="Auto Email"
                    checked={actionTypes.includes('AUTOMATED_EMAIL')}
                    onChange={handleChange}
                    value="AUTOMATED_EMAIL"
                    color="bloobirds"
                    selectedColor="verySoftTangerine"
                    disabled={isManualStepSelected || isCustomTaskSelected}
                  />
                </div>
              );
            }}
          />
          <ModalContent className={styles.content}>
            {isCustomTaskSelected && customTasks?.length === 0 ? (
              <div className={styles.noCustomTasks}>
                <Icon name="slash" size={48} color="softPeanut" />
                <span>
                  <Text size="s" align="center">
                    There are no custom tasks created or enabled.
                  </Text>
                  <Text size="s" align="center">
                    In order to select this step make sure to have at least one custom type
                    available.
                  </Text>
                </span>

                {canCreateCustomTasks ? (
                  <Button
                    iconRight="arrowRight"
                    variant="clear"
                    onClick={() => history.push(APP_PLAYBOOK_CUSTOM_TASKS)}
                  >
                    Create custom task types
                  </Button>
                ) : (
                  <Text size="s" weight="heavy">
                    Ask your manager to create your first custom task
                  </Text>
                )}
              </div>
            ) : (
              <ModalSection title="Task details" icon="taskAction">
                {isCustomTaskSelected && (
                  <div className={styles.customTaskSelect}>
                    <Controller
                      name="customTaskId"
                      control={control}
                      rules={{
                        required: { value: true, message: 'A custom task type must be selected' },
                      }}
                      render={({ onChange, value }) => {
                        const handleChange = (value: string) => {
                          onChange(value);
                          setValue(
                            `templates.${templateDictionary['CUSTOM_TASK'].formKey}`,
                            undefined,
                          );
                        };

                        return (
                          <Select
                            placeholder="Select the type of custom task"
                            width="100%"
                            onChange={handleChange}
                            value={value}
                          >
                            {customTasks
                              ?.sort((a, b) => b.ordering - a.ordering)
                              .map(task => (
                                <Item value={task.id} key={task.id}>
                                  {task.name}
                                </Item>
                              ))}
                          </Select>
                        );
                      }}
                    />
                  </div>
                )}
                <div className={styles.detailsRow}>
                  <div className={styles.phrase}>
                    <Text size="s" color="softPeanut">
                      Run this step on
                    </Text>
                    <Controller
                      control={control}
                      name="dayNumber"
                      rules={{
                        valueAsNumber: true,
                        required: { value: true, message: 'A cadence day is required' },
                        min: { value: 1, message: 'Cadence days should start at day 1' },
                        max: {
                          value: 1095,
                          message: 'Cadence days should not exceed 3 years (1095 days)',
                        },
                        validate: value => {
                          const sameDaySteps = steps.filter(step => {
                            return step.dayNumber === value - 1 && step.id !== stepId;
                          });
                          if (sameDaySteps.length > 0 && actionTypes.length > 0) {
                            const actionTypesForSameDay = sameDaySteps.flatMap(
                              step => step.actionTypes,
                            );
                            const hasAutomatedStepForSameDay = actionTypesForSameDay.includes(
                              'AUTOMATED_EMAIL',
                            );
                            const hasManualStepForSameDay =
                              actionTypesForSameDay.filter(
                                actionType =>
                                  actionType !== 'AUTOMATED_EMAIL' && actionType !== 'CUSTOM_TASK',
                              ).length > 0;

                            if (isAutomatedStepSelected) {
                              if (hasAutomatedStepForSameDay) {
                                return 'Cannot have two automated steps on the same day';
                              }
                            } else {
                              if (hasManualStepForSameDay) {
                                return 'Cannot have two manual steps on the same day';
                              }
                            }
                          }
                        },
                      }}
                      render={({ onChange, onBlur, value }) => (
                        <Input
                          value={value}
                          onBlur={onBlur}
                          onChange={onChange}
                          type="number"
                          width="88px"
                          placeholder="Day"
                          color="bloobirds"
                          error={!!errors?.dayNumber?.message && ' '}
                        />
                      )}
                    />
                  </div>
                  {isCustomTaskSelected && (
                    <div className={styles.phrase}>
                      <Text size="s" color="softPeanut">
                        Do this task during
                      </Text>
                      <Controller
                        control={control}
                        name="automationSchedulingMode"
                        defaultValue="ALL_DAY"
                        render={({ onChange, value }) => (
                          <Select value={value} onChange={onChange} width="128px">
                            <Item value="ALL_DAY">All day</Item>
                            <Item value="START">Specific hour</Item>
                          </Select>
                        )}
                      />
                    </div>
                  )}

                  {isAutomatedStepSelected && (
                    <div className={styles.phrase}>
                      <Text size="s" color="softPeanut">
                        Send email
                      </Text>
                      <Controller
                        control={control}
                        name="automationSchedulingMode"
                        defaultValue="RANGE"
                        render={({ onChange, value }) => (
                          <Select value={value} onChange={onChange} width="224px">
                            <Item value="RANGE">Only during these hours</Item>
                            {canSelectDelay && <Item value="DELAY">After a time delay</Item>}
                          </Select>
                        )}
                      />
                    </div>
                  )}
                </div>
                {isAutomatedStepSelected && (
                  <>
                    <div>
                      {automationSchedulingMode === 'RANGE' && (
                        <div className={styles.detailsRow}>
                          <div className={styles.phrase}>
                            <Text size="s" color="softPeanut">
                              From
                            </Text>
                            <Controller
                              control={control}
                              name="startAutomationRange"
                              defaultValue="09:00"
                              render={({ onChange, value }) => (
                                <ClockTimeSelect value={value} onChange={onChange} max="23:30" />
                              )}
                            />
                            <Text size="s" color="softPeanut">
                              to
                            </Text>
                            <Controller
                              control={control}
                              name="endAutomationRange"
                              defaultValue="18:00"
                              render={({ onChange, value }) => (
                                <ClockTimeSelect
                                  value={value}
                                  onChange={onChange}
                                  min={startAutomationRange}
                                />
                              )}
                            />
                          </div>
                          <div className={styles.phrase}>
                            <Text size="s" color="softPeanut">
                              of
                            </Text>
                            <Controller
                              control={control}
                              name="automationTimeZoneToApply"
                              defaultValue="BOBJECT_TIMEZONE"
                              render={({ onChange, value }) => (
                                <Select
                                  value={value}
                                  onChange={onChange}
                                  defaultValue="BOBJECT_TIMEZONE"
                                  width="236px"
                                >
                                  <Item value="BOBJECT_TIMEZONE">
                                    {`The ${bobjectType?.toLowerCase()} timezone`}
                                  </Item>
                                  <Item value="USER_TIMEZONE">My timezone</Item>
                                </Select>
                              )}
                            />
                          </div>
                        </div>
                      )}
                      {automationSchedulingMode === 'DELAY' && (
                        <div className={styles.detailsRow}>
                          <div />
                          <div className={styles.phrase}>
                            <Text size="s" color="softPeanut">
                              of
                            </Text>
                            <Controller
                              control={control}
                              name="delayAutomation"
                              defaultValue={20}
                              render={({ onChange, value }) => (
                                <Select
                                  value={value === null ? 20 : value}
                                  onChange={onChange}
                                  width="200px"
                                >
                                  <Item value={0}>Immediately</Item>
                                  <Item value={1}>1 minute</Item>
                                  <Item value={5}>5 minutes</Item>
                                  <Item value={20}>20 minutes</Item>
                                  <Item value={30}>30 minutes</Item>
                                  <Item value={60}>1 hour</Item>
                                  <Item value={120}>2 hours</Item>
                                  <Item value={240}>4 hours</Item>
                                  <Item value={360}>6 hours</Item>
                                  <Item value={480}>8 hours</Item>
                                </Select>
                              )}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={styles.banner}>
                      <ul>
                        {automationSchedulingMode === 'RANGE' && (
                          <li>
                            <Text size="xs" color="peanut">
                              If the {bobjectType?.toLowerCase()} has <strong>no time zone</strong>,
                              the email will be sent using your time zone
                            </Text>
                          </li>
                        )}
                        <li>
                          <Text size="xs" color="peanut">
                            If the step is scheduled <strong>outside of the selected hours</strong>,
                            it will be delivered on the next available day
                          </Text>
                        </li>
                      </ul>
                    </div>
                  </>
                )}
                {isCustomTaskSelected && automationSchedulingMode === 'START' && (
                  <div>
                    <div className={styles.detailsRow}>
                      <div className={styles.phrase}>
                        <Text size="s" color="softPeanut">
                          Starting time
                        </Text>
                        <Controller
                          control={control}
                          name="startTime"
                          defaultValue="09:00"
                          render={({ onChange, value }) => (
                            <ClockTimeSelect value={value} onChange={onChange} max="23:30" />
                          )}
                        />
                      </div>
                      <div className={styles.phrase}>
                        <Text size="s" color="softPeanut">
                          of
                        </Text>
                        <Controller
                          control={control}
                          name="automationTimeZoneToApply"
                          defaultValue="BOBJECT_TIMEZONE"
                          render={({ onChange, value }) => (
                            <Select
                              value={value}
                              onChange={onChange}
                              defaultValue="BOBJECT_TIMEZONE"
                              width="236px"
                            >
                              <Item value="BOBJECT_TIMEZONE">
                                {`The ${bobjectType?.toLowerCase()} timezone`}
                              </Item>
                              <Item value="USER_TIMEZONE">My timezone</Item>
                            </Select>
                          )}
                        />
                      </div>
                    </div>
                    {automationSchedulingMode === 'START' && (
                      <div className={styles.banner}>
                        <ul>
                          <li>
                            <Text size="xs" color="peanut">
                              If the {bobjectType?.toLowerCase()} has <strong>no time zone</strong>,
                              the task will be set using your time zone
                            </Text>
                          </li>

                          <li>
                            <Text size="xs" color="peanut">
                              If the step is scheduled{' '}
                              <strong>outside of the selected hours</strong>, it will be delivered
                              on the next available day
                            </Text>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                <Controller
                  control={control}
                  name="description"
                  defaultValue=""
                  render={({ onChange, value }) => (
                    <TextArea
                      onChange={onChange}
                      value={value}
                      placeholder="Task description"
                      width="100%"
                      minRows={3}
                      disabled={isCustomTaskSelected && !customTaskId}
                      color="bloobirds"
                    />
                  )}
                />
                {(isManualStepSelected || isWhatsappCustomTasks) && (
                  <>
                    <div className={styles.sectionHeader}>
                      <Text weight="medium" size="m">
                        Choose template(s) for the cadence step
                      </Text>
                    </div>
                    <div className={styles.checkboxRow}>
                      <TemplateManager setEmailModalVisible={setEmailModalVisible} />
                    </div>
                  </>
                )}
                {hasActions && !isAutomatedStepSelected && (
                  <>
                    <div className={styles.sectionHeader}>
                      <Text weight="medium" size="m">
                        Do you want this step to be mandatory or skippable?
                      </Text>
                    </div>
                    <div className={styles.checkboxRow}>
                      <Controller
                        name="skippeableConfig"
                        control={control}
                        defaultValue="DEFAULT"
                        render={({ value, onChange }) => (
                          <>
                            <Checkbox
                              expand
                              color="bloobirds"
                              size="small"
                              checked={value && value !== 'DEFAULT'}
                              onClick={value => onChange(value ? 'DISABLED' : 'DEFAULT')}
                            >
                              <div className={styles.checkbox}>
                                <span>
                                  Change this step to mandatory or not regardless of the general
                                  setting.
                                </span>
                              </div>
                            </Checkbox>
                            {skippeableConfig !== 'DEFAULT' && (
                              <div className={styles.radioGroup}>
                                <RadioGroup
                                  defaultValue="DISABLED"
                                  value={value}
                                  onChange={onChange}
                                >
                                  <Radio
                                    expand
                                    size="small"
                                    value="DISABLED"
                                    color="bloobirds"
                                    backgroundColor="verySoftBloobirds"
                                  >
                                    <Text size="xs">
                                      <b>Mandatory</b> task: An attempt should be made to mark as
                                      done
                                    </Text>
                                  </Radio>
                                  <Radio
                                    expand
                                    size="small"
                                    value="ENABLED"
                                    color="bloobirds"
                                    backgroundColor="verySoftBloobirds"
                                  >
                                    <Text size="xs">
                                      <b>Skippable</b> task: Task can be skipped without an attempt
                                    </Text>
                                  </Radio>
                                </RadioGroup>
                              </div>
                            )}
                          </>
                        )}
                      />
                    </div>
                  </>
                )}
                {isAutomatedStepSelected && (
                  <div className={styles.checkboxRow}>
                    <Controller
                      name="automationPauseOverdueEnabled"
                      control={control}
                      defaultValue={true}
                      render={({ value, onChange }) => (
                        <Checkbox
                          expand
                          color="bloobirds"
                          size="small"
                          checked={value}
                          onClick={onChange}
                        >
                          <div className={styles.checkbox}>
                            <span>
                              Ask in outbox before sending if any of the previous task is not
                              completed
                            </span>
                            <Tooltip
                              title="By selecting this option, an auto email task won’t be send if the object has one or more overdue tasks pending to complete and will be marked as 'Paused'"
                              position="top"
                            >
                              <Icon name="info" color="bloobirds" />
                            </Tooltip>
                          </div>
                        </Checkbox>
                      )}
                    />
                  </div>
                )}
                {isAutomatedStepSelected && (
                  <div className={styles.checkboxRow}>
                    <Controller
                      name="automationPauseTouchEnabled"
                      control={control}
                      defaultValue={false}
                      render={({ value, onChange }) => (
                        <Checkbox
                          expand
                          color="bloobirds"
                          size="small"
                          checked={value}
                          onClick={onChange}
                        >
                          <div className={styles.checkbox}>
                            <span>
                              Ask in outbox before sending if the prospect previously contacted you
                            </span>
                            <Tooltip
                              title="By selecting this option, an auto email task won’t be send if there is any previous incoming call, email or Linkedin activity registered and will be marked as 'Paused'"
                              position="top"
                            >
                              <Icon name="info" color="bloobirds" />
                            </Tooltip>
                          </div>
                        </Checkbox>
                      )}
                    />
                  </div>
                )}
                {isAutomatedStepSelected && (
                  <>
                    <div className={styles.checkboxRow}>
                      <Controller
                        name="optOutEnabled"
                        control={control}
                        defaultValue={false}
                        render={({ value, onChange }) => (
                          <Checkbox
                            expand
                            color="bloobirds"
                            size="small"
                            checked={value}
                            onClick={onChange}
                          >
                            <div className={styles.checkbox}>
                              <span>Include Opt-out link at the bottom of the email</span>
                              <Tooltip
                                title="Selecting this option will always include an opt-out copy with a link
                                  at the bottom of the auto-emails, allowing the recipient to click on
                                  the link and be redirected to a confirmation page. Auto-emails sent to
                                  prospects that are marked as opted-out will be marked as failed.
                                  You will always be able to unmark the prospect manually."
                                position="top"
                              >
                                <Icon name="info" color="bloobirds" />
                              </Tooltip>
                            </div>
                          </Checkbox>
                        )}
                      />
                    </div>
                    {optOutEnabled && (
                      <RichTextEditor
                        defaultValue={value}
                        onChange={onChange}
                        plugins={optOutPlugins}
                        style={{ padding: '16px 20px', height: 40 }}
                      >
                        {editor => (
                          <>
                            <div className={styles.optOutEditor}>
                              <EditorToolbar disabled={!optOutEnabled} backgroundColor="bloobirds">
                                <EditorToolbarControlsSection />
                                <EditorToolbarFontStylesSection enableChangeSize />
                                <EditorToolbarTextMarksSection enableChangeColor />
                                <EditorToolbarListsSection />
                                <EditorToolbarSection>
                                  <EditorToolbarTemplateVariable />
                                </EditorToolbarSection>
                              </EditorToolbar>
                              <div className={styles.editor}>{editor}</div>
                            </div>
                            <div className={styles.optOutDescription}>
                              <Text color="peanut" size="s">
                                Make sure to hyperlink the text with https://optout.com/
                              </Text>
                            </div>
                            <div className={styles.optOutDescription}>
                              <Text color="peanut" size="s">
                                Bloobirds automatically generates a dynamic link based on your
                                custom domain
                              </Text>
                            </div>
                          </>
                        )}
                      </RichTextEditor>
                    )}
                  </>
                )}
              </ModalSection>
            )}
          </ModalContent>
          <ModalFooter>
            <div>
              <Button variant="clear" onClick={onClose} color="softBloobirds">
                Cancel
              </Button>
              {isEdition && (
                <Button variant="clear" color="tomato" type="button" onClick={handleDelete}>
                  Delete
                </Button>
              )}
            </div>
            <Button
              disabled={isSubmitting || !isStepCompleted || !isEnableSave}
              type="submit"
              color={
                isSubmitting || !isStepCompleted || !isEnableSave ? 'lighterGray' : 'bloobirds'
              }
            >
              {isSubmitting ? (
                <Spinner size={16} color="white" name="loadingCircle" />
              ) : (
                <>{isAutomatedStepSelected ? 'Continue' : isEdition ? 'Save' : 'Add Step'}</>
              )}
            </Button>
          </ModalFooter>
        </form>
      </FormProvider>
    </Modal>
  );
};
