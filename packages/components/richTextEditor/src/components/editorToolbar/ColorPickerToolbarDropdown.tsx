import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';

import { ToolbarButton, ColorType as ColorTypeF, Icon } from '@bloobirds-it/flamingo-ui';
import { useLocalStorage } from '@bloobirds-it/hooks';
import { MIXPANEL_EVENTS, LocalStorageKeys } from '@bloobirds-it/types';
import {
  DEFAULT_COLORS,
  DEFAULT_CUSTOM_COLORS,
  MARK_COLOR,
  focusEditor,
  getMark,
  removeMark,
  select,
  setMarks,
  useEventPlateId,
  usePlateEditorRef,
  usePlateEditorState,
  ToolbarDropdown,
  getPluginType,
} from '@udecode/plate';
import mixpanel from 'mixpanel-browser';

import { ColorPicker } from './ColorPicker/ColorPicker';
import { ColorType } from './ColorPicker/ColorType';
import styles from './editorToolbar.module.css';

type ColorPickerToolbarDropdownProps = {
  id?: string;
  colors?: ColorType[];
  customColors?: ColorType[];
  closeOnSelect?: boolean;
  color?: ColorTypeF;
};

function isBrightColor(hexColor) {
  if (!hexColor) {
    return false;
  }

  hexColor = hexColor.replace('#', '');

  const r = parseInt(hexColor.slice(0, 2), 16);
  const g = parseInt(hexColor.slice(2, 4), 16);
  const b = parseInt(hexColor.slice(4, 6), 16);

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  const threshold = 192; // Umbral para determinar si el color es brillante

  return luminance > threshold;
}

export const ColorPickerToolbarDropdown = ({
  id,
  colors = DEFAULT_COLORS,
  customColors = DEFAULT_CUSTOM_COLORS,
  ...rest
}: ColorPickerToolbarDropdownProps) => {
  id = useEventPlateId(id);
  const editor = usePlateEditorState(id);
  const editorRef = usePlateEditorRef(id);
  const { get, set } = useLocalStorage();
  const dropdownRef = useRef(null);
  const type = getPluginType(editor, MARK_COLOR);

  const [open, setOpen] = useState(false);

  const color = editorRef && (getMark(editorRef, type) as string);

  const [selectedColor, setSelectedColor] = useState<string>();

  const onToggle = useCallback(
    (value = !open) => {
      setOpen(value);
      if (!open) mixpanel.track(MIXPANEL_EVENTS.EDITOR_OPEN_COLOR_PICKER);
    },
    [open, setOpen],
  );

  const updateColor = useCallback(
    (value: string) => {
      if (editorRef && editor && editor.selection) {
        setSelectedColor(value);

        select(editorRef, editor.selection);
        focusEditor(editorRef);

        setMarks(editor, { [type]: value });

        // Guardar en localstorage el color seleccionado en la lista de últimos colores usados
        const lastColors = get(LocalStorageKeys.LastColors) || [];
        const index = lastColors.indexOf(value);
        if (index !== -1) {
          lastColors.splice(index, 1);
        }
        lastColors.unshift(value);
        if (lastColors.length > 10) {
          lastColors.pop();
        }
        set(LocalStorageKeys.LastColors, lastColors);
      }
    },
    [editor, editorRef, type],
  );

  const updateColorAndClose = useCallback(
    (value: string) => {
      updateColor(value);
      onToggle();
    },
    [onToggle, updateColor],
  );

  const clearColor = useCallback(() => {
    if (editorRef && editor && editor.selection) {
      select(editorRef, editor.selection);
      focusEditor(editorRef);

      if (selectedColor) {
        removeMark(editor, { key: type });
      }

      onToggle();
    }
  }, [editor, editorRef, onToggle, selectedColor, type]);

  useEffect(() => {
    if (editor?.selection) {
      setSelectedColor(color);
    }
  }, [color, editor?.selection]);

  // Si la lista de últimos colores usados está vacía, se rellena con los colores por defecto
  useEffect(() => {
    const lastColors = get(LocalStorageKeys.LastColors) || [];
    if (lastColors.length === 0) {
      set(
        LocalStorageKeys.LastColors,
        customColors.map(color => color.value),
      );
    }
  }, [get, set]);

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

  const lastColors = get(LocalStorageKeys.LastColors) || [];
  const lastColorsObject = useMemo(
    () =>
      lastColors.map(color => ({
        name: '',
        value: color,
        isBrightColor: isBrightColor(color),
      })),
    [lastColors],
  );

  return (
    <div ref={dropdownRef} className={styles.colorContainer}>
      <ToolbarDropdown
        control={<ToolbarButton active={open} icon="textColor" {...rest} isDropdown />}
        open={open}
        onOpen={onToggle}
        onClose={onToggle}
      >
        <ColorPicker
          color={selectedColor || color}
          colors={colors}
          customColors={lastColorsObject}
          selectedIcon={
            <Icon name="check" color={isBrightColor(color) ? 'black' : 'white'} size={16} />
          }
          updateColor={updateColorAndClose}
          updateCustomColor={updateColorAndClose}
          clearColor={clearColor}
          open={open}
        />
      </ToolbarDropdown>
    </div>
  );
};
