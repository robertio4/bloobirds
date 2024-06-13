import React, { useContext, useEffect, useState } from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { RichTextEditor } from '@bloobirds-it/rich-text-editor';
import clsx from 'clsx';

import styles from '../../handleTemplate.module.css';
import { TemplateFormContext } from '../templateForm';

export const NameFormEditor = ({ isTemplateModal = false }) => {
  const [editor, setEditor] = useState(null);
  const { template, setElements, plugins, storeEditorRef, focusedRef } = useContext(
    TemplateFormContext,
  );
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation('translation', { keyPrefix: 'playbook.nameFormEditor' });

  const { field } = useController({
    control,
    name: 'name',
    rules: {
      validate: fieldValue => {
        // @ts-ignore
        const value =
          fieldValue &&
          (fieldValue[0].children ? fieldValue[0].children[0].text : fieldValue[0].text);
        if (value === undefined || value === '') return t('requiredText');
        else return undefined;
      },
    },
  });

  useEffect(() => {
    setElements(field.value, template.name, editor, true);
  }, [template, editor]);

  return (
    <div
      className={clsx(styles.nameEditor, { [styles.withPadding]: isTemplateModal })}
      onClick={() => (focusedRef.current = isTemplateModal ? 0 : 2)}
    >
      <Text size="s" color="verySoftPeanut">
        {t('title')}:
      </Text>
      <div className={styles.templateNameContainer}>
        <RichTextEditor
          id="templateNameEditor"
          placeholder={t('placeholder')}
          plugins={plugins}
          setEditor={value => {
            setEditor(value);
            storeEditorRef?.(value);
          }}
          style={{ width: '100%', padding: 0 }}
          {...field}
        />
        <Text size="xxs" color="tomato" className={styles._error_text}>
          {errors?.name?.message}
        </Text>
      </div>
    </div>
  );
};
