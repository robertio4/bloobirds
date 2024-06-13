import React from 'react';

import { Data, NoData } from '@udecode/plate-combobox';
import { getPluginOptions, usePlateEditorRef } from '@udecode/plate-core';
import { MentionPlugin } from '@udecode/plate-mention';
import { Combobox, ComboboxProps } from '@udecode/plate-ui-combobox';

import { ELEMENT_SNIPPET } from '../templateVariablesPlugin';
import { getSnippetOnSelectItem } from './getSnippetOnSelectItem';

export interface MentionComboboxProps<TData extends Data = NoData>
  extends Partial<ComboboxProps<TData>> {
  pluginKey?: string;
}

export const SnippetCombobox = <TData extends Data = NoData>({
  pluginKey = ELEMENT_SNIPPET,
  id = pluginKey,
  ...props
}: MentionComboboxProps<TData>) => {
  const editor = usePlateEditorRef();

  const { trigger } = getPluginOptions<MentionPlugin>(editor, pluginKey);

  return (
    <Combobox
      id={id}
      trigger={trigger!}
      controlled
      onSelectItem={getSnippetOnSelectItem({
        key: pluginKey,
      })}
      styles={{ item: { maxWidth: '98%', overflow: 'hidden', textOverflow: 'ellipsis' } }}
      {...props}
    />
  );
};
