import { CheckItem, Icon, Input, Item, MultiSelect, Select, Text } from '@bloobirds-it/flamingo-ui';
import { useEffect, useState } from 'react';
import styles from './qualifyingQuestion.module.css';
import { useTranslation } from "react-i18next";

export const QualifyingQuestion = ({ type, disabled, value, question, answers, onChange }) => {
  const [internalValue, setInternalValue] = useState(value);
  const {t} = useTranslation('translation', { keyPrefix: 'contactFlowModal.notesAndQQ'});

  useEffect(() => {
    const isPicklist = type === 'GLOBAL_PICKLIST' || type === 'MULTI_GLOBAL_PICKLIST';
    setInternalValue(isPicklist ? value || 'none' : value);
  }, []);

  return (
    <div>
      <header className={styles.header}>
        <Icon className={styles.headerIcon} name="chatSupport" color="softPeanut" />
        <Text size="s" color="peanut">
          {question}
        </Text>
      </header>
      {type === 'TEXT' && (
        <Input
          disabled={disabled}
          width="100%"
          value={internalValue}
          onChange={newValue => {
            onChange(newValue);
            setInternalValue(newValue);
          }}
        />
      )}
      {type === 'GLOBAL_PICKLIST' && (
        <Select
          disabled={disabled}
          width="100%"
          value={internalValue}
          onChange={newValue => {
            onChange(newValue);
            setInternalValue(newValue);
          }}
          autocomplete={answers.length > 6}
        >
          <Item value="none">{t('none')}</Item>
          {answers.map(answer => (
            <Item key={answer.id} hidden={!answer.enabled} value={answer.id} label={answer.value}>
              {answer.value}
            </Item>
          ))}
        </Select>
      )}
      {type === 'MULTI_GLOBAL_PICKLIST' && (
        <MultiSelect
          autocomplete={answers.length > 6}
          size="medium"
          value={internalValue}
          onChange={newValue => {
            onChange(newValue);
            setInternalValue(newValue);
          }}
          width="100%"
          selectAllOption
        >
          <CheckItem value="">{t('none')}</CheckItem>
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
  );
};
