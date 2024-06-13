import { KeyboardEvent, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';

import { IconButton, Input, Text, Tooltip, useHover } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import { useExtensionContext } from '../../../../context';
import styles from '../bobjectDetail.module.css';

interface SectionFieldProps {
  value: string;
  name: string;
  activityAction: ReactNode;
  key: string;
  onSubmit: (newValue: string) => void;
  validation: (value: string) => string;
  refresh: boolean;
}

export const SectionField = ({
  value,
  name,
  key,
  activityAction,
  onSubmit,
  validation,
  refresh,
}: SectionFieldProps) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'extendedScreen.bobjectDetail.sectionField',
  });
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const [copiedValue, copyToClipboard] = useCopyToClipboard();
  const [ref, hover] = useHover();
  const [editing, setEditing] = useState<boolean>(false);

  const [inputValue, setInputValue] = useState<string>(value);
  const [error, setError] = useState<string>(undefined);
  const [displayValue, setDisplayValue] = useState(value);
  const submitValue = () => {
    const errorString = validation(inputValue);
    if (errorString) {
      setError(errorString);
    } else {
      if (inputValue !== value) {
        onSubmit(inputValue);
        setDisplayValue(inputValue);
      }
      setError(undefined);
      setEditing(false);
    }
  };

  useEffect(() => {
    if (refresh) {
      setDisplayValue(value);
      setInputValue(value);
    }
  }, [refresh]);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setInputValue(value);
      setEditing(false);
    }
  };

  const actionClasses = clsx(styles.action, {
    [styles.actionSidePeek]: sidePeekEnabled,
  });

  return (
    <div className={styles.sectionField} key={key} ref={ref}>
      <div className={styles.fieldLabel}>
        <Text color="softPeanut" className={styles.label} size="xs">
          {name}
        </Text>
      </div>
      {editing ? (
        <div className={styles.input}>
          <Input
            size="small"
            value={inputValue}
            onChange={setInputValue}
            onSubmit={submitValue}
            width="100%"
            error={error}
            onKeyDown={onKeyDown}
            autoFocus={true}
          />
          <span onClick={submitValue} className={styles.saveButton}>
            <Text size="xs" color="bloobirds" weight="bold" className={styles.save}>
              {t('save')}
            </Text>
          </span>
        </div>
      ) : (
        <Text size="xs" className={styles.fieldValue}>
          {displayValue}
        </Text>
      )}

      <div className={styles.fieldActions}>
        {!editing && hover && (
          <>
            <Tooltip title={t('edit')} position="top">
              <IconButton name="edit" size={20} onClick={() => setEditing(true)} />
            </Tooltip>
            <Tooltip title={copiedValue?.value ? t('copied') : t('copyToClipboard')} position="top">
              {value && <IconButton name="copy" onClick={() => copyToClipboard(value)} size={20} />}
            </Tooltip>
          </>
        )}
        {!editing && value && <span className={actionClasses}>{activityAction}</span>}
      </div>
    </div>
  );
};
