import React, { useContext, useEffect, useState, useLayoutEffect } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Icon, Tooltip } from '@bloobirds-it/flamingo-ui';
import { FloatingTemplateVariable, RichTextEditor } from '@bloobirds-it/rich-text-editor';
import { TEMPLATE_TYPES } from '@bloobirds-it/types';
import clsx from 'clsx';
import { BaseEditor } from 'slate';

import styles from '../../handleTemplate.module.css';
import { TemplateFormContext } from '../templateForm';

// General Custom Input to match RichTextEditor styling, but with normal input attributes
const FieldInput = ({ value, onChange, placeholder }) => {
  const { storeEditorRef } = useContext(TemplateFormContext);
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateForm' });

  useLayoutEffect(() => {
    setTimeout(() => storeEditorRef(({ id: 'shortcutInput' } as unknown) as BaseEditor), 100);
  }, []);

  return (
    <div className={styles.input}>
      <input
        id="shortcutInput"
        type="text"
        placeholder={t('shortcutNamePlaceholder')}
        value={value}
        onChange={onChange}
      />
      {!value && <span className={styles.placeholder}>{placeholder}</span>}
    </div>
  );
};

const SubjectFormEditor = ({ isTemplateModal }) => {
  const [subjectEditor, setSubjectEditor] = useState(null);
  const { template, setElements, plugins, storeEditorRef, focusedRef } = useContext(
    TemplateFormContext,
  );
  const { control } = useFormContext();
  const { field } = useController({ control, name: 'subject' });
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateForm' });

  useEffect(() => {
    setElements(field.value, template.subject, subjectEditor);
  }, [template?.subject, subjectEditor]);

  return (
    <div
      className={clsx(styles.nameEditor, { [styles.withPadding]: isTemplateModal })}
      onClick={() => (focusedRef.current = isTemplateModal ? 1 : 3)}
    >
      <div className={styles.subjectContainer}>
        <RichTextEditor
          id="templateSubjectEditor"
          placeholder={t('subjectPlaceholder')}
          plugins={plugins}
          setEditor={value => {
            setSubjectEditor(value);
            storeEditorRef?.(value);
          }}
          style={{ width: '100%', padding: 0 }}
          {...field}
        >
          {editor => (
            <div className={styles.subjectFloatingTemplateVariableContainer}>
              {editor}
              {subjectEditor && <FloatingTemplateVariable editor={subjectEditor} />}
            </div>
          )}
        </RichTextEditor>
      </div>
    </div>
  );
};

const ShortCutFormEditor = ({ isTemplateModal }) => {
  const { control } = useFormContext();
  const { field } = useController({ control, name: 'shortcut' });
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.templateForm' });

  return (
    <div className={clsx(styles.nameEditor, { [styles.withPadding]: isTemplateModal })}>
      <div className={styles.templateNameContainer}>
        <Tooltip title={t('shortcutTooltip')} position="top">
          <Icon name="infoFilled" color="darkBloobirds" size={16} />
        </Tooltip>
        <FieldInput
          value={field.value ? '/' + field.value : ''}
          onChange={value => {
            const cleanValue = value.target.value.replace(/\s|\//g, '');
            const parsedValue = cleanValue.length > 49 ? cleanValue.slice(0, 49) : cleanValue;
            field.onChange(parsedValue);
          }}
          placeholder={t('shortcutPlaceholder')}
        />
      </div>
    </div>
  );
};

export const TemplateFormFieldsByType = ({
  isTemplateModal = false,
}: {
  isTemplateModal?: boolean;
}) => {
  const { template } = useContext(TemplateFormContext);
  switch (template?.type) {
    case TEMPLATE_TYPES.EMAIL:
      return <SubjectFormEditor isTemplateModal={isTemplateModal} />;
    case TEMPLATE_TYPES.SNIPPET:
      return <ShortCutFormEditor isTemplateModal={isTemplateModal} />;
    default:
      return null;
  }
};
