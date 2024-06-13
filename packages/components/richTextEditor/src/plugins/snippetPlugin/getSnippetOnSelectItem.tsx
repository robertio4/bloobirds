import {
  ComboboxOnSelectItem,
  ELEMENT_MENTION,
  NoData,
  PlatePluginKey,
  comboboxSelectors,
  MentionPlugin,
  getPlugin,
  getBlockAbove,
  isEndPoint,
  Data,
  withoutNormalizing,
  select,
  removeNodes,
  insertNodes,
  insertText,
  TMentionElement,
  withoutMergingHistory,
  ELEMENT_MENTION_INPUT,
  moveSelection,
  comboboxActions,
} from '@udecode/plate';

export const getSnippetOnSelectItem = <TData extends Data = NoData>({
  key = ELEMENT_MENTION,
}: PlatePluginKey = {}): ComboboxOnSelectItem<TData> => (editor, item) => {
  const targetRange = comboboxSelectors.targetRange();
  if (!targetRange) return;

  const {
    options: { insertSpaceAfterMention, createMentionNode },
  } = getPlugin<MentionPlugin>(editor as any, key);

  const pathAbove = getBlockAbove(editor)?.[1];
  const isBlockEnd = () =>
    editor.selection && pathAbove && isEndPoint(editor, editor.selection.anchor, pathAbove);

  withoutNormalizing(editor, () => {
    // Selectors are sensitive to operations, it's better to create everything
    // before the editor state is changed. For example, asking for text after
    // removeNodes below will return null.
    const { value } = createMentionNode!(item, {
      search: comboboxSelectors.text() ?? '',
    });

    select(editor, targetRange);

    withoutMergingHistory(editor, () =>
      removeNodes(editor, {
        match: node => node.type === ELEMENT_MENTION_INPUT,
      }),
    );
    // @ts-ignore
    insertNodes<TMentionElement>(editor, value);

    // move the selection after the element
    moveSelection(editor, { unit: 'offset' });

    if (isBlockEnd() && insertSpaceAfterMention) {
      insertText(editor, ' ');
    }
  });

  return comboboxActions.reset();
};
