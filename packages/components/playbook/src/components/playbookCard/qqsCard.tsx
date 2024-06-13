import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CheckItem, Icon, Input, Item, MultiSelect, Select, Text } from '@bloobirds-it/flamingo-ui';
import { MessagingTemplate, PlaybookTab, QQ_TYPES } from '@bloobirds-it/types';

import styles from './playbookCard.module.css';
import { getTabIcon } from './playbookCard.utils';

export const QQsCard = ({
  template: qq,
  tabSelected,
  onUpdateQQ,
  QQValue,
  refreshActiveBobject,
  actionsDisabled,
}: {
  template: MessagingTemplate;
  tabSelected: PlaybookTab;
  onUpdateQQ?: (newQQData: { [x: string]: any }) => void;
  QQValue?: string | Array<string>;
  refreshActiveBobject?: () => void;
  actionsDisabled?: boolean;
}) => {
  const tabIcon = tabSelected && getTabIcon(tabSelected);
  //@ts-ignore
  const { type, disabled, question, answers } = qq;
  const [internalValue, setInternalValue] = useState(QQValue);
  const isGlobalPicklist = type?.toString() === QQ_TYPES.GLOBAL_PICKLIST;
  const isMultiGlobalPicklist = type?.toString() === QQ_TYPES.MULTI_GLOBAL_PICKLIST;
  const isText = type?.toString() === QQ_TYPES.TEXT;
  const { t } = useTranslation();
  function handleChange(value?: string | Array<string>) {
    const newQQData = { [qq.id]: value || internalValue };
    onUpdateQQ(newQQData);
    refreshActiveBobject();
  }

  return (
    <div className={styles.qq_container}>
      <div className={styles.qq_cardContent}>
        <div className={styles.qq_cardText}>
          {tabIcon && <Icon name={tabIcon} color="softPeanut" size={24} />}
          <Text size="s" weight="bold">
            {question}
          </Text>
        </div>
        {isText && (
          <Input
            onBlur={() => handleChange()}
            disabled={disabled || actionsDisabled}
            width="100%"
            size="small"
            borderless={false}
            value={internalValue}
            onChange={setInternalValue}
            placeholder={t('playbook.qualifyingQuestions.nonePlaceholder')}
          />
        )}
        {isGlobalPicklist && (
          <Select
            placeholder={t('playbook.qualifyingQuestions.picklistSelect')}
            disabled={disabled || actionsDisabled}
            borderless={false}
            width="100%"
            size="small"
            value={internalValue}
            onChange={newValue => {
              setInternalValue(newValue);
              handleChange(newValue);
            }}
            autocomplete={answers.length > 6}
          >
            <Item value="none">{t('playbook.qualifyingQuestions.nonePlaceholder')}</Item>
            {answers.map(answer => (
              <Item key={answer.id} hidden={!answer.enabled} value={answer.id} label={answer.value}>
                {answer.value}
              </Item>
            ))}
          </Select>
        )}
        {isMultiGlobalPicklist && (
          <MultiSelect
            autocomplete={answers.length > 6}
            size="small"
            value={internalValue}
            onChange={setInternalValue}
            onClose={() => {
              handleChange();
            }}
            width="100%"
            borderless={false}
            selectAllOption
            placeholder={t('playbook.qualifyingQuestions.picklistSelect')}
            disabled={disabled || actionsDisabled}
          >
            <CheckItem value="">None</CheckItem>
            {answers.map(answer => (
              <CheckItem
                key={answer.value}
                dataTest={answer.value}
                value={answer.id}
                label={answer.value}
              >
                {answer.value}
              </CheckItem>
            ))}
          </MultiSelect>
        )}
      </div>
    </div>
  );
};
