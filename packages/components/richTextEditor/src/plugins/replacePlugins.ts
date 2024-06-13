import {
  AutoformatBlockRule,
  AutoformatPlugin,
  createAutoformatPlugin,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
  getParentNode,
  isElement,
  isType,
  toggleList,
  unwrapList,
} from '@udecode/plate';
import { MyEditor, MyPlatePlugin, MyValue } from '../config/typescript';

export const preFormat: AutoformatBlockRule<MyValue, MyEditor>['preFormat'] = editor =>
  unwrapList(editor);

export const format = (editor: MyEditor, customFormatting: any) => {
  if (editor?.selection) {
    const parentEntry = getParentNode(editor, editor.selection);
    if (!parentEntry) return;
    const [node] = parentEntry;
    if (
      isElement(node) &&
      !isType(editor, node, ELEMENT_CODE_BLOCK) &&
      !isType(editor, node, ELEMENT_CODE_LINE)
    ) {
      customFormatting();
    }
  }
};

export const formatList = (editor: MyEditor, elementType: string) => {
  format(editor, () =>
    toggleList(editor, {
      type: elementType,
    }),
  );
};

const autoformatPlugin: Partial<MyPlatePlugin<AutoformatPlugin<MyValue, MyEditor>>> = {
  options: {
    rules: [
      {
        mode: 'block',
        type: ELEMENT_H1,
        match: '# ',
        preFormat,
      },
      {
        mode: 'block',
        type: ELEMENT_H2,
        match: '## ',
        preFormat,
      },
      {
        mode: 'block',
        type: ELEMENT_LI,
        match: ['* ', '- '],
        preFormat,
        format: editor => formatList(editor, ELEMENT_UL),
      },
      {
        mode: 'block',
        type: ELEMENT_LI,
        match: ['1. ', '1) '],
        preFormat,
        format: editor => formatList(editor, ELEMENT_OL),
      },
      {
        mode: 'block',
        type: ELEMENT_BLOCKQUOTE,
        match: '> ',
        preFormat,
      },
    ],
  },
};

const createReplacePlugins = () => [
  createAutoformatPlugin<AutoformatPlugin<MyValue, MyEditor>, MyValue>(autoformatPlugin),
];

export default createReplacePlugins;
