import { ELEMENT_RAW_HTML_BLOCK } from './defaults';

export const createRawHTMLBlockPlugin = () => ({
  key: ELEMENT_RAW_HTML_BLOCK,
  isElement: true,
  isVoid: true,
  then: (editor, { type }) => ({
    deserializeHtml: {
      getNode: el => {
        return {
          type,
          html: el.getAttribute('html'),
        };
      },
      rules: [{ validNodeName: 'RAW-HTML-BLOCK' }],
    },
  }),
  serializeHtml: ({ element }) => {
    return <div style={{ padding: '16px 0' }} dangerouslySetInnerHTML={{ __html: element.html }} />;
  },
});
