import { deserialize } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-components-richTextEditor-dist-index.js.js";
import { api } from "/vendor/fs-Users-robertorf-Workspace-frontend-monorepo-packages-utils-dist-index.js.js";
import useSWR from "/vendor/.vite-deps-swr.js__v--ed0a962e.js";
export const useSnippets = (bodyPlugins) => {
  const { data: snippets, mutate } = useSWR(
    "/messaging/messagingTemplates/snippets",
    (url) => api.get(url).then(({ data }) => parseSnippets(data)),
    { revalidateOnFocus: true }
  );
  function parseSnippets(snippets2) {
    if (!snippets2)
      return [];
    return Object.entries(snippets2).reduce((acc, [_, { id, content, shortcut, format }]) => {
      acc.push({
        key: id,
        text: shortcut,
        data: JSON.parse(
          JSON.stringify(
            deserialize(content, {
              format,
              plugins: bodyPlugins
            })
          )
        )
      });
      return acc;
    }, []);
  }
  return { snippets, mutate };
};
