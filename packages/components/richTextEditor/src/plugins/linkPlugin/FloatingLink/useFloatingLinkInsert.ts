import { useEffect } from 'react';

import {
  ELEMENT_LINK,
  HTMLPropsAs,
  LinkPlugin,
  floatingLinkActions,
  floatingLinkSelectors,
  focusEditor,
  getPluginOptions,
  getSelectionBoundingClientRect,
  triggerFloatingLinkInsert,
  useComposedRef,
  useEditorRef,
  useFloatingLinkEscape,
  useFloatingLinkSelectors,
  useHotkeys,
  useOnClickOutside,
  useVirtualFloatingLink,
} from '@udecode/plate';
import { useFocused } from 'slate-react';

import { FloatingLinkProps } from './FloatingLink';
import { submitFloatingLink } from './submitFloatingLink';

export const useFloatingLinkInsert = ({
  floatingOptions,
  ...props
}: FloatingLinkProps): HTMLPropsAs<'div'> => {
  const editor = useEditorRef();
  const focused = useFocused();
  const mode = useFloatingLinkSelectors().mode();
  const open = useFloatingLinkSelectors().isOpen(editor.id);

  const { triggerFloatingLinkHotkeys } = getPluginOptions<LinkPlugin>(editor, ELEMENT_LINK);

  useHotkeys(
    triggerFloatingLinkHotkeys!,
    e => {
      if (triggerFloatingLinkInsert(editor, { focused })) {
        e.preventDefault();
      }
    },
    {
      enableOnContentEditable: true,
    },
    [focused],
  );

  const ref = useOnClickOutside(
    () => {
      if (floatingLinkSelectors.mode() === 'insert') {
        submitFloatingLink(editor);
      }
    },
    {
      disabled: !open,
    },
  );

  const { update, style, floating } = useVirtualFloatingLink({
    editorId: editor.id,
    open: open && mode === 'insert',
    getBoundingClientRect: getSelectionBoundingClientRect,
    whileElementsMounted: () => {},
    ...floatingOptions,
  });

  // wait for update before focusing input
  useEffect(() => {
    if (open) {
      update();
      floatingLinkActions.updated(true);
    } else {
      floatingLinkActions.updated(false);
    }
  }, [open, update]);

  useFloatingLinkEscape();

  return {
    style: {
      ...style,
      zIndex: 1,
    },
    ...props,
    ref: useComposedRef<HTMLElement | null>(props.ref, floating, ref),
  };
};
