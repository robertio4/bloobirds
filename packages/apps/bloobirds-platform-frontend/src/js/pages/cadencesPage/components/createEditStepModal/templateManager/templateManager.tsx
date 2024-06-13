import React, { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import {
  Button,
  Checkbox,
  Dropdown,
  Skeleton,
  Spinner,
  Text,
  useVisible,
} from '@bloobirds-it/flamingo-ui';
import { useActiveUserId, useDebounce, useMessagingTemplates } from '@bloobirds-it/hooks';
import { CadenceActionType, MIXPANEL_EVENTS, TEMPLATE_TYPES } from '@bloobirds-it/types';
import mixpanel from 'mixpanel-browser';

import { useTemplatesForEveryone } from '../../../../../hooks/useFeatureFlags';
import { FormValues } from '../createEditStepModal';
import styles from './templateManager.module.css';
import { NoTemplatesFound, TemplatesList } from './templatesList/templatesList';

type TemplateTypes = 'EMAIL' | 'LINKEDIN_MESSAGE' | 'PHONE_CALL' | 'CUSTOM_TASK';

type TemplateTypeDict = Record<
  TemplateTypes,
  {
    text: string;
    managerName: string;
    requestEnum: string;
    formKey: keyof FormValues['templates'];
  }
>;

export const templateDictionary: TemplateTypeDict = {
  PHONE_CALL: {
    text: 'Select a pitch template:',
    requestEnum: TEMPLATE_TYPES.PITCH,
    formKey: 'pitchTemplate',
    managerName: 'Pitch',
  },
  EMAIL: {
    text: 'Select an email template:',
    formKey: 'emailTemplate',
    requestEnum: TEMPLATE_TYPES.EMAIL,
    managerName: 'Email',
  },
  LINKEDIN_MESSAGE: {
    text: 'Select a LinkedIn template:',
    requestEnum: TEMPLATE_TYPES.LINKEDIN_MESSAGE,
    formKey: 'linkedInTemplate',
    managerName: 'LinkedIn',
  },
  CUSTOM_TASK: {
    text: 'Select a Whatsapp template:',
    requestEnum: TEMPLATE_TYPES.WHATSAPP,
    formKey: 'whatsappTemplate',
    managerName: 'WhatsApp',
  },
};

const templateTypeDictionary: Pick<
  TemplateTypeDict,
  'PHONE_CALL' | 'EMAIL' | 'LINKEDIN_MESSAGE'
> = {
  PHONE_CALL: templateDictionary.PHONE_CALL,
  EMAIL: templateDictionary.EMAIL,
  LINKEDIN_MESSAGE: templateDictionary.LINKEDIN_MESSAGE,
};

const templateCustomTaskTypeDictionary: Pick<TemplateTypeDict, 'CUSTOM_TASK'> = {
  CUSTOM_TASK: templateDictionary.CUSTOM_TASK,
};

const useStepTemplates = (requestEnum: TemplateTypeDict[TemplateTypes]['requestEnum']) => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  const userId = useActiveUserId();

  const { messagingTemplates, isLoading } = useMessagingTemplates({
    name: debouncedSearch,
    segmentationValues: null,
    onlyMine: false,
    visibility: 'PUBLIC',
    type: requestEnum,
    page: 0,
    size: 200,
  });

  const myTemplates = messagingTemplates?.filter(template => template?.createdBy === userId);
  const teamTemplates = messagingTemplates?.filter(template => template?.createdBy !== userId);
  function getTemplateName(id: string) {
    return messagingTemplates?.find(({ id: templateId }) => templateId === id.trim())?.name;
  }
  return {
    getTemplateName,
    isLoading,
    templates: messagingTemplates,
    myTemplates,
    teamTemplates,
    searchValue,
    setSearchValue,
  };
};
type TemplatesFormType = FormValues['templates'];

function getHasValue<T extends keyof TemplatesFormType>(
  formValue: TemplatesFormType[T],
  formKey: T extends keyof TemplatesFormType ? T : never,
) {
  if (!formValue) return false;
  if (formKey === 'emailTemplate') {
    return Object.values(formValue).filter(Boolean).length > 0;
  } else {
    return !!formValue;
  }
}

const TemplateSelectorManager = ({
  actionType,
  isEnabled,
  setEmailModalVisible,
  hasValue,
  handleClear,
}: {
  actionType: TemplateTypes;
  isEnabled: boolean;
  setEmailModalVisible?: (value: boolean) => void;
  hasValue: boolean;
  handleClear: () => void;
}): JSX.Element => {
  const { formKey, requestEnum, managerName } = templateDictionary[actionType];
  const { ref, visible, setVisible } = useVisible(false);
  const { isLoading, setSearchValue, myTemplates, teamTemplates } = useStepTemplates(requestEnum);
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.tabContent' });

  function handleAnchorClick() {
    actionType === 'EMAIL' ? setEmailModalVisible(true) : setVisible(!visible);
    mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ADD_TEMPLATE_FROM_EDIT_STEP_CADENCE);
  }

  return (
    <Dropdown
      width={323}
      ref={ref}
      visible={visible}
      zIndex={20000}
      anchor={
        <>
          {isLoading ? (
            <Spinner name="loadingCircle" color="softPeanut" size={12} />
          ) : hasValue ? (
            <>
              <Button
                size="small"
                color="bloobirds"
                iconLeft="redoReload"
                variant="secondary"
                onClick={handleAnchorClick}
              >
                Replace
              </Button>
              <Button
                size="small"
                color="tomato"
                iconLeft="cross"
                variant="clear"
                onClick={handleClear}
              >
                Remove
              </Button>
            </>
          ) : (
            <Button
              size="small"
              variant="secondary"
              disabled={!isEnabled}
              onClick={handleAnchorClick}
            >
              + Add
            </Button>
          )}
        </>
      }
    >
      <input
        width="100%"
        placeholder={t('search')}
        className={styles.input}
        onChange={e => setSearchValue(e.target.value)}
      />
      <>
        {(!myTemplates || myTemplates?.length === 0) &&
        (!teamTemplates || teamTemplates?.length === 0) ? (
          <NoTemplatesFound type={managerName} />
        ) : (
          <>
            {myTemplates?.length > 0 && (
              <TemplatesList
                title={t('myTemplates')}
                templates={myTemplates}
                toggleVisibility={() => setVisible(!visible)}
                icon="assignBoard"
                titleColor={isEnabled ? 'peanut' : 'softPeanut'}
                formKey={formKey}
              />
            )}
            {teamTemplates?.length > 0 && (
              <TemplatesList
                templates={teamTemplates}
                toggleVisibility={() => setVisible(!visible)}
                title={t('teamTemplates')}
                icon="company"
                titleColor={isEnabled ? 'peanut' : 'softPeanut'}
                formKey={formKey}
              />
            )}
          </>
        )}
      </>
    </Dropdown>
  );
};

const TemplateType: {
  (props: {
    actionKey: TemplateTypes;
    isEnabled: boolean;
    setEmailModalVisible?: (value: boolean) => void;
  }): JSX.Element;
} = ({ actionKey, ...props }) => {
  const { formKey, text, managerName, requestEnum } = templateDictionary[actionKey];
  const { getTemplateName, isLoading } = useStepTemplates(requestEnum);
  const { watch, setValue, unregister } = useFormContext<FormValues>();
  const formValue = watch('templates')?.[formKey];
  const templateName =
    (formValue as ReturnType<typeof watch>['templates']['emailTemplate'])?.name ||
    (formValue?.id && getTemplateName(formValue.id));
  const hasValue = getHasValue(formValue, formKey);

  const handleClear = () => {
    unregister('templates.' + formKey + '.id');
    unregister('templates.' + formKey + '.body');
    unregister('templates.' + formKey + '.subject');
    setValue('templates.' + formKey, undefined);
    unregister('templates.' + formKey);
  };

  if (isLoading)
    return (
      <div style={{ display: 'flex', gap: '16px' }}>
        <Skeleton variant="rect" height={16} width="70%" />
        <Skeleton variant="rect" height={16} width="30%" />
      </div>
    );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        <Text size="s" color={props.isEnabled && !hasValue ? 'peanut' : 'softPeanut'}>
          {hasValue ? managerName + ': ' : text}
        </Text>
        <Text size="s" weight="bold" color={props.isEnabled ? 'peanut' : 'softPeanut'}>
          {templateName || 'New template'}
        </Text>
      </div>
      <TemplateSelectorManager
        actionType={actionKey}
        handleClear={handleClear}
        hasValue={hasValue}
        {...props}
      />
    </div>
  );
};

export const TemplateManager = ({
  setEmailModalVisible,
}: {
  setEmailModalVisible: (value: boolean) => void;
}) => {
  const hasTemplatesForEveryone = useTemplatesForEveryone();
  const { watch, control } = useFormContext();
  const actionTypes = watch('actionTypes');
  const isCustomTaskEnabled = actionTypes.includes('CUSTOM_TASK');
  const templateTypes = isCustomTaskEnabled
    ? templateCustomTaskTypeDictionary
    : templateTypeDictionary;
  const checkedSelectTemplates = watch('checkedSelectTemplates');
  const templates = watch('templates');
  return (
    <>
      <Controller
        name={'checkedSelectTemplates'}
        control={control}
        defaultValue={false}
        rules={{
          validate: value => {
            if (value && (!templates || !Object.values(templates)?.filter(Boolean)?.length)) {
              return 'You must select a messaging template';
            }
          },
        }}
        render={({ value, onChange }, { invalid }) => {
          return (
            <Checkbox
              expand
              color={invalid ? 'tomato' : 'bloobirds'}
              size="small"
              checked={value}
              onClick={e => {
                onChange(e);
                mixpanel.track(MIXPANEL_EVENTS.CLICK_ON_ENABLE_TEMPLATES_FROM_EDIT_STEP_CADENCE);
              }}
            >
              <div className={styles.checkbox}>
                <span>Add templates for this step</span>
              </div>
            </Checkbox>
          );
        }}
      />
      {checkedSelectTemplates && (
        <div className={styles.radioGroup}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {Object.keys(templateTypes).map(key => {
              if (!hasTemplatesForEveryone && key !== 'EMAIL') return null;
              const typedKey = key as TemplateTypes;
              const isEnabled = actionTypes.includes(key as CadenceActionType);
              return (
                <TemplateType
                  key={key}
                  actionKey={typedKey}
                  isEnabled={isEnabled}
                  {...(key === 'EMAIL' && {
                    setEmailModalVisible: (value: boolean) => setEmailModalVisible(value),
                  })}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
