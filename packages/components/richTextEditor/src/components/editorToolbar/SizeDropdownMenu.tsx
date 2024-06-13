import React, { useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ToolbarButton, ColorType, Icon } from '@bloobirds-it/flamingo-ui';
import { MIXPANEL_EVENTS } from '@bloobirds-it/types';
import {
  getPluginType,
  focusEditor,
  getMark,
  select,
  usePlateEditorRef,
  setMarks,
  useEventPlateId,
  ToolbarDropdown,
  usePlateEditorState,
  MARK_FONT_SIZE,
} from '@udecode/plate';
import mixpanel from 'mixpanel-browser';

import styles from './editorToolbar.module.css';

type SizeDropdownMenuProps = {
  id?: string;
  color?: ColorType;
};

export const SizeDropdownMenu = ({ id, ...props }: SizeDropdownMenuProps) => {
  id = useEventPlateId(id);
  const editor = usePlateEditorState(id);
  const editorRef = usePlateEditorRef(id);
  const dropdownRef = useRef(null);
  const type = getPluginType(editor, MARK_FONT_SIZE);
  const { t } = useTranslation('translation', { keyPrefix: 'richTextEditor.sizes' });

  const [open, setOpen] = React.useState(false);

  const fontSize = (editorRef && (getMark(editorRef, type) as string)) ?? '13px';

  const sizeValues = [
    { name: t('small'), value: '10px' },
    { name: t('medium'), value: '13px' },
    { name: t('large'), value: '16px' },
    { name: t('huge'), value: '30px' },
  ];

  const onToggle = useCallback(
    (value = !open) => {
      setOpen(value);
      if (!open) mixpanel.track(MIXPANEL_EVENTS.EDITOR_OPEN_CHANGE_SIZE);
    },
    [open, setOpen],
  );

  const selectHandler = useCallback(
    (value: string) => {
      if (editorRef && editor && editor.selection) {
        select(editorRef, editor.selection);
        focusEditor(editorRef);

        setMarks(editor, { [type]: value });

        onToggle();
      }
    },
    [editor, editorRef, type, onToggle],
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={dropdownRef} className={styles.sizeContainer}>
      <ToolbarDropdown
        control={<ToolbarButton active={open} icon="textEditor" {...props} isDropdown />}
        open={open}
        onOpen={onToggle}
        onClose={onToggle}
      >
        {sizeValues &&
          sizeValues.map(({ name, value }) => (
            <div
              className={styles.sizeDropdown}
              style={{ cursor: 'pointer', fontSize: value }}
              key={name}
              onClick={() => {
                selectHandler(value);
              }}
            >
              <div className={styles.sizeItem}>
                {fontSize === value && <Icon name="check" color="black" size={16} />}
                {name}
              </div>
            </div>
          ))}
      </ToolbarDropdown>
    </div>
  );
};
