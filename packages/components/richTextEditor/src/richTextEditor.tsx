import React, { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';

import { useBaseEmailVariableValue } from '@bloobirds-it/hooks';
import {
  AnyObject,
  ELEMENT_PARAGRAPH,
  PlatePlugin,
  PlateProvider,
  TComboboxItem,
} from '@udecode/plate';
import hash from 'object-hash';

import components from './components';
import { createMyPlugins, MyEditor, MyValue } from './config/typescript';
import { PlateWrapper } from './plateWrapper';

export const initialValue = [
  {
    type: ELEMENT_PARAGRAPH,
    children: [
      {
        text: '',
      },
    ],
  },
];

interface RichTextEditorProps {
  id?: string;
  value?: any;
  defaultValue?: any;
  style: CSSProperties;
  placeholder?: string;
  plugins?: any[];
  children?: (editor: JSX.Element) => React.ReactNode;
  setEditor?: (editor: MyEditor) => void;
  onChange?: (value: any) => void;
  snippets?: TComboboxItem[];
  saveSnippetCallback?: (snippet: string) => void;
  registerProps?: any;
}

const RichTextEditor = ({
  id,
  value,
  defaultValue = initialValue,
  style,
  onChange,
  placeholder,
  plugins,
  children,
  setEditor,
  snippets,
  saveSnippetCallback,
  registerProps,
}: RichTextEditorProps) => {
  const isUsingRegister = !!registerProps;
  const [plateId, setPlateId] = useState<string>();
  const oldPlateId = useRef(null);

  const emailVariablesValues = useBaseEmailVariableValue();

  const pluginsToUse = useMemo<PlatePlugin<AnyObject, MyValue, MyEditor>[]>(
    () => createMyPlugins(plugins, { components }),
    [hash(plugins)],
  );

  const templateVariableEnabled = pluginsToUse.some(plugin => plugin.key === 'variable');
  const markBallonEnabled = pluginsToUse.some(plugin => plugin.key === 'basicMarks');

  useEffect(() => {
    if (
      templateVariableEnabled &&
      emailVariablesValues &&
      Object.keys(emailVariablesValues).length > 0
    ) {
      if (id) {
        id = `${id}_${hash(emailVariablesValues)}`;
      } else {
        id = hash(emailVariablesValues);
      }
    } else {
      id = id || 'plateEditor';
    }

    setPlateId(id);
  }, [id, templateVariableEnabled, emailVariablesValues]);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      e.stopImmediatePropagation();
    });
    return () => {
      window.removeEventListener('keydown', e => {
        e.stopImmediatePropagation();
      });
    };
  }, []);

  useEffect(() => {
    if (oldPlateId.current !== plateId) {
      oldPlateId.current = plateId;
    }
  }, [plateId]);

  if (!plateId) {
    return null;
  }

  if (plateId !== id && oldPlateId.current && oldPlateId.current !== plateId) {
    return null;
  }

  const PlateEditor = (
    <PlateWrapper
      id={plateId}
      placeholder={placeholder}
      markBallonEnabled={markBallonEnabled}
      setEditor={setEditor}
      snippets={snippets}
      style={style}
      saveSnippetCallback={saveSnippetCallback}
    ></PlateWrapper>
  );

  return (
    <PlateProvider<MyValue>
      id={plateId}
      initialValue={defaultValue}
      plugins={pluginsToUse}
      value={value}
      {...(isUsingRegister ? registerProps : {})}
      onChange={
        isUsingRegister
          ? value => {
              const event = { target: { value, name: registerProps?.name } };
              registerProps.onChange(event);
            }
          : onChange
      }
    >
      {children?.(PlateEditor) ?? PlateEditor}
    </PlateProvider>
  );
};

export default RichTextEditor;
