import { useFloatingLinkSelectors } from '@udecode/plate';
import { useEditorRef, useHotkeys } from '@udecode/plate-core';

import { submitFloatingLink } from './submitFloatingLink';

export const useFloatingLinkEnter = () => {
  const editor = useEditorRef();

  const open = useFloatingLinkSelectors().isOpen(editor.id);

  useHotkeys(
    '*',
    e => {
      if (e.key !== 'Enter') return;

      if (submitFloatingLink(editor)) {
        e.preventDefault();
      }
    },
    {
      enabled: open,
      //@ts-ignore
      enableOnFormTags: ['INPUT'],
    },
    [],
  );
};
