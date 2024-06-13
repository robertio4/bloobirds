import { ELEMENT_SLOTS_FORM } from './defaults';

export const createSlotsBlockPlugin = () => ({
  key: ELEMENT_SLOTS_FORM,
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
      rules: [{ validNodeName: 'SLOTS-FORM-BLOCK' }],
    },
  }),
  serializeHtml: ({ element }) => {
    return <div style={{ padding: '16px 0' }} dangerouslySetInnerHTML={{ __html: element.html }} />;
  },
});
