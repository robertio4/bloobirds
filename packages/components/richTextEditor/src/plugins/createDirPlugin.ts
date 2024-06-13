import {
  createPluginFactory,
  ELEMENT_DEFAULT,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  getPluginType,
  PlateEditor,
} from '@udecode/plate';

export const KEY_DIR = 'dir';

export const withRTL = (editor: PlateEditor) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = ([node, path]) => {
    const rtl_rx = /[\u0591-\u07FF]/;
    if (
      // @ts-ignore
      node?.type?.includes(
        ELEMENT_DEFAULT,
        ELEMENT_H1,
        ELEMENT_H2,
        ELEMENT_H3,
        ELEMENT_H4,
        ELEMENT_H5,
        ELEMENT_H6,
        'span',
      ) &&
      rtl_rx.test(node.children?.[0]?.text)
    ) {
      node.direction = 'rtl';
      node.rtl = true;
    }

    return normalizeNode([node, path]);
  };

  return editor;
};

/**
 * Creates a plugin that adds alignment functionality to the editor.
 */
export const createDirPlugin = createPluginFactory({
  key: KEY_DIR,
  //@ts-ignore
  withOverrides: withRTL,
  then: editor => ({
    inject: {
      props: {
        nodeKey: KEY_DIR,
        defaultNodeValue: 'ltr',
        styleKey: 'direction',
        validNodeValues: ['rtl', 'ltr'],
        validTypes: [getPluginType(editor, ELEMENT_DEFAULT)],
      },
    },
    deserializeHtml: {
      isElement: true,
      rules: [
        {
          validNodeName: 'SPAN',
        },
      ],
      getNode: (el, node) => {
        const rtl_rx = /[\u0591-\u07FF]/;
        if (rtl_rx.test(el.textContent)) {
          return {
            ...node,
            direction: 'rtl',
            rtl: true,
            type: 'p',
            children: [{ text: el.textContent }],
          };
        } else {
          return node;
        }
      },
    },
  }),
});
