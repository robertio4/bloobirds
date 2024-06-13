import {
  deselect,
  getNodeEntry,
  getPluginType,
  insertNodes,
  insertText,
  moveSelection,
  PlateEditor,
} from '@udecode/plate';
import { focusEditor } from '@udecode/plate-core';
import { Editor } from 'slate';
import { MyEditor } from 'src/config/typescript';

import { ELEMENT_MEETING_LINK } from '../../meetingLinkPlugin';
import { ELEMENT_TEMPLATE_VARIABLE } from '../defaults';

const getNodeText = editor => {
  const isEditorFocused = !!editor?.selection;
  if (isEditorFocused) {
    const [node] = getNodeEntry(editor, editor?.selection);
    //@ts-ignore
    return node?.text || null;
  }
  return null;
};

export const insertTemplateVariable = (
  editor: MyEditor | PlateEditor,
  data: {
    id: string;
    name: string;
    group: string;
  },
  options?,
) => {
  const templateVariable = {
    type: getPluginType(editor as PlateEditor, ELEMENT_TEMPLATE_VARIABLE),
    children: [{ text: '' }],
    ...data,
  };

  const initialText = getNodeText(editor);
  insertNodes(
    editor,
    //@ts-ignore
    templateVariable,
    options,
  );
  const updatedText = getNodeText(editor);

  const hasBeenReplaced = !!updatedText;
  if (hasBeenReplaced) {
    if (initialText) {
      //@ts-ignore
      const variableLength = updatedText.length - initialText.length;
      moveSelection(editor, { unit: 'offset', distance: variableLength });
      // TODO: Improve template variables micro-interactions,
      //  by doing things like adding/removing spaces if they are already there
    }
  } else {
    moveSelection(editor);
    insertText(editor, ' ');
  }

  if (options) {
    deselect(editor);
  }

  setTimeout(() => {
    focusEditor(editor, editor.selection!);
  }, 0);
};

export const insertMeetingLink = (editor, data) => {
  const meetingLink = {
    type: getPluginType(editor, ELEMENT_MEETING_LINK),
    children: [{ text: '' }],
    ...data,
  };

  const initialText = getNodeText(editor);
  insertNodes(editor, meetingLink);
  const updatedText = getNodeText(editor);
  const hasBeenReplaced = !!updatedText;

  if (hasBeenReplaced) {
    if (initialText) {
      //@ts-ignore
      const variableLength = updatedText.length - initialText.length;
      moveSelection(editor, { unit: 'character', distance: variableLength });
      // TODO: Improve template variables micro-interactions,
      //  by doing things like adding/removing spaces if they are already there
    }
  } else {
    moveSelection(editor);
    insertText(editor, ' ');
  }

  setTimeout(() => {
    focusEditor(editor, editor.selection!);
  }, 0);
};
