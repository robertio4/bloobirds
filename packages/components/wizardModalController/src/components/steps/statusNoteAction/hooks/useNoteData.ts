import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { createToast } from '@bloobirds-it/flamingo-ui';
import { useDebouncedCallback } from '@bloobirds-it/hooks';
import { deserialize, serialize, useRichTextEditorPlugins } from '@bloobirds-it/rich-text-editor';
import { ACTIVITY_FIELDS_LOGIC_ROLE } from '@bloobirds-it/types';
import { api, getTextFromLogicRole, isHtml } from '@bloobirds-it/utils';
import { useWizardContext } from '@bloobirds-it/wizard-modal-context';

export const useNoteData = ({ t, activity, wizardKey }) => {
  const { getWizardProperties, addMetaToWizardProperties } = useWizardContext();
  const wizardProperties = getWizardProperties(wizardKey);
  const plugins = useRichTextEditorPlugins({
    images: false,
    replaceParagraphs: true,
  });

  const defaultNoteValue =
    wizardProperties.activityNote ||
    getTextFromLogicRole(activity, ACTIVITY_FIELDS_LOGIC_ROLE.NOTE);
  const serializedNoteValue = isHtml(defaultNoteValue)
    ? deserialize(defaultNoteValue, {
        format: 'HTML',
        plugins,
      })
    : defaultNoteValue;

  const { register, watch, getFieldState } = useForm({
    defaultValues: {
      note: serializedNoteValue,
    },
  });
  const { onChange } = register('note');
  const [loading, setLoading] = useState(false);
  const hasSaved = useRef<boolean>();

  const note = watch('note');

  const onSubmit = ({ dataToCreate, setHasSaved }) => {
    setLoading(true);
    const activityId = activity?.id;
    api
      .patch(`/bobjects/${activityId?.value}/raw`, {
        contents: dataToCreate,
        params: {},
      })
      .then(() => {
        addMetaToWizardProperties(wizardKey, {
          activityNote: dataToCreate[ACTIVITY_FIELDS_LOGIC_ROLE.NOTE],
        });
        setHasSaved();
        setLoading(false);
      })
      .catch(() => {
        setHasSaved();
        setLoading(false);
        createToast({ message: t('toasts.errorUpdating'), type: 'error' });
      });
  };

  const saveNote = useDebouncedCallback(
    () => {
      if (
        note &&
        note?.[0]?.children?.[0].text &&
        (!serializedNoteValue || JSON.stringify(serializedNoteValue) !== JSON.stringify(note)) &&
        !getFieldState('note').invalid
      ) {
        const dataToCreate = note
          ? {
              [ACTIVITY_FIELDS_LOGIC_ROLE.NOTE]: serialize(note, {
                format: 'AST',
                plugins,
              }),
            }
          : null;
        onSubmit({
          dataToCreate,
          setHasSaved: () => {
            hasSaved.current = true;
          },
        });
      }
    },
    500,
    [onSubmit],
  );

  return {
    note,
    setNote: value => {
      return onChange({ target: { value, name: 'note' } });
    },
    saveNote,
    loading,
    hasSaved: hasSaved.current,
  };
};
