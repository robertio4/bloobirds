import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ToolbarButton, ColorType } from '@bloobirds-it/flamingo-ui';
import { useSignatures } from '@bloobirds-it/hooks';
import { baseUrls } from '@bloobirds-it/utils';
import {
  usePlateEditorRef,
  useEventPlateId,
  ToolbarDropdown,
  usePlateEditorState,
} from '@udecode/plate';

import { ELEMENT_RAW_HTML_BLOCK, replaceHTMLBlock } from '../../plugins';
import styles from './editorToolbar.module.css';

type SizeDropdownMenuProps = {
  id?: string;
  color?: ColorType;
};

export const SelectSignatureDropdown = ({ id, ...props }: SizeDropdownMenuProps) => {
  id = useEventPlateId(id);
  const editor = usePlateEditorState(id);
  const editorRef = usePlateEditorRef(id);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { data } = useSignatures();

  const onToggle = useCallback(
    (value = !open) => {
      setOpen(value);
    },
    [open, setOpen],
  );

  const selectHandler = useCallback(
    (value: string) => {
      if (editorRef && editor && editor.selection) {
        replaceHTMLBlock(editorRef, 'signature', ELEMENT_RAW_HTML_BLOCK, value);

        onToggle();
      }
    },
    [editor, editorRef, onToggle],
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
        control={<ToolbarButton active={open} icon="signature" {...props} isDropdown />}
        open={open}
        onOpen={onToggle}
        onClose={onToggle}
      >
        {data?.length > 0 && (
          <>
            {data.map(({ name, signature }) => (
              <div
                className={styles.itemSignature}
                style={{ cursor: 'pointer', fontSize: 13 }}
                key={name}
                onClick={() => selectHandler(signature)}
              >
                {name}
              </div>
            ))}
            <div className={styles.separator} />
          </>
        )}
        <div
          className={styles.itemSignature}
          style={{ cursor: 'pointer', fontSize: 13 }}
          onClick={() =>
            window.open(baseUrls[process.env.NODE_ENV] + '/app/management/user', '_blank')
          }
        >
          {data?.length > 0
            ? t('signatures.selectToolbarEmail.edit')
            : t('signatures.selectToolbarEmail.create')}
        </div>
      </ToolbarDropdown>
    </div>
  );
};
