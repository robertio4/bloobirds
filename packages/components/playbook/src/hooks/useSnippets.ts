import { deserialize } from '@bloobirds-it/rich-text-editor';
import { api } from '@bloobirds-it/utils';
import useSWR from 'swr';

export const useSnippets = (bodyPlugins?: Array<any>) => {
  const { data: snippets, mutate } = useSWR(
    '/messaging/messagingTemplates/snippets',
    url => api.get(url).then(({ data }) => parseSnippets(data)),
    { revalidateOnFocus: true },
  );

  function parseSnippets(snippets: {
    [shortcut: string]: { id: string; format: 'AST'; content: string; shortcut: string };
  }) {
    if (!snippets) return [];
    return Object.entries(snippets).reduce((acc, [_, { id, content, shortcut, format }]) => {
      acc.push({
        key: id,
        text: shortcut,
        data: JSON.parse(
          JSON.stringify(
            deserialize(content, {
              format: format,
              plugins: bodyPlugins,
            }),
          ),
        ),
      });
      return acc;
    }, []);
  }

  return { snippets, mutate };
};
