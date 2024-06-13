import { useCallback } from 'react';

import {
  Button,
  AsProps,
  createComponentAs,
  createElementAs,
  focusEditor,
  HTMLPropsAs,
  useEditorRef,
  unwrapLink,
} from '@udecode/plate';

export const useUnlinkButton = (props: HTMLPropsAs<'button'>): HTMLPropsAs<'button'> => {
  const editor = useEditorRef();

  return {
    onClick: useCallback(
      e => {
        unwrapLink(editor);
        focusEditor(editor, editor.selection!);
        e.preventDefault();
      },
      [editor],
    ),
    ...props,
  };
};

export const UnlinkButton = createComponentAs<AsProps<'button'>>(props => {
  const htmlProps = useUnlinkButton(props);

  return createElementAs(Button, htmlProps);
});
