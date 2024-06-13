import { createComboboxPlugin, createMentionPlugin } from '@udecode/plate';

import { ELEMENT_SNIPPET } from '../templateVariablesPlugin';

export const createSnippetPlugins = () => {
  return [
    createComboboxPlugin(),
    createMentionPlugin({
      key: ELEMENT_SNIPPET,
      options: {
        // @ts-ignore
        createMentionNode: mention => ({ value: mention.data }),
        trigger: '/',
        insertSpaceAfterMention: true,
      },
    }),
  ];
};
