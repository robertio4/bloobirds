import { useCallback, useEffect } from 'react';

import {
  ELEMENT_LINK,
  floatingLinkActions,
  floatingLinkSelectors,
  LinkPlugin,
  triggerFloatingLinkEdit,
  useFloatingLinkEscape,
  useFloatingLinkSelectors,
  useVirtualFloatingLink,
} from '@udecode/plate';
import {
  getAboveNode,
  getEndPoint,
  getPluginOptions,
  getPluginType,
  getStartPoint,
  HTMLPropsAs,
  someNode,
  useComposedRef,
  useEditorRef,
  useHotkeys,
  usePlateSelectors,
} from '@udecode/plate-core';
import { getDefaultBoundingClientRect, getRangeBoundingClientRect } from '@udecode/plate-floating';

import { FloatingLinkProps } from './FloatingLink';
import { submitFloatingLink } from './submitFloatingLink';
import { useFloatingLinkEnter } from './useFloatingLinkEnter';

export const useFloatingLinkEdit = ({
  floatingOptions,
  ...props
}: FloatingLinkProps): HTMLPropsAs<'div'> => {
  const editor = useEditorRef();
  const keyEditor = usePlateSelectors().keyEditor();
  const mode = useFloatingLinkSelectors().mode();
  const open = useFloatingLinkSelectors().isOpen(editor.id);

  const { triggerFloatingLinkHotkeys } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);

  const getBoundingClientRect = useCallback(() => {
    const entry = getAboveNode(editor, {
      match: { type: getPluginType(editor, ELEMENT_LINK) },
    });

    if (entry) {
      const [, path] = entry;
      return getRangeBoundingClientRect(editor, {
        anchor: getStartPoint(editor, path),
        focus: getEndPoint(editor, path),
      });
    }

    return getDefaultBoundingClientRect();
  }, [editor]);

  const isOpen = open && mode === 'edit';

  const { update, style, floating } = useVirtualFloatingLink({
    editorId: editor.id,
    open: isOpen,
    getBoundingClientRect,
    ...floatingOptions,
  });

  useEffect(() => {
    if (
      editor?.selection &&
      someNode(editor, {
        match: { type: getPluginType(editor, ELEMENT_LINK) },
      })
    ) {
      floatingLinkActions.show('edit', editor.id);
      update();
      return;
    }

    if (floatingLinkSelectors.mode() === 'edit') {
      floatingLinkActions.hide();
    }
  }, [editor, keyEditor, update]);

  useHotkeys(
    triggerFloatingLinkHotkeys!,
    e => {
      if (floatingLinkSelectors.mode() === 'edit' && triggerFloatingLinkEdit(editor)) {
        e.preventDefault();
      }
    },
    {
      enableOnContentEditable: true,
    },
    [],
  );

  useFloatingLinkEnter();

  useFloatingLinkEscape();

  return {
    style: {
      ...style,
      zIndex: 1,
    },
    ...props,
    ref: useComposedRef<HTMLElement | null>(props.ref, floating),
  };
};
