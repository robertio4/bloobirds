import {
  createPluginFactory,
  ELEMENT_DEFAULT,
  getPluginType,
  mapInjectPropsToPlugin,
} from '@udecode/plate';

export const KEY_DIRECTION = 'direction';

/**
 * Creates a plugin that adds alignment functionality to the editor.
 */
export const createDirectionPlugin = createPluginFactory({
  key: KEY_DIRECTION,
  then: editor => ({
    inject: {
      props: {
        nodeKey: KEY_DIRECTION,
        defaultNodeValue: 'ltr',
        styleKey: 'direction',
        validNodeValues: ['rtl', 'ltr'],
        validTypes: [getPluginType(editor, ELEMENT_DEFAULT)],
      },
    },
    then: (_, plugin) =>
      mapInjectPropsToPlugin(editor, plugin, {
        deserializeHtml: {
          getNode: (el, node) => {
            if (el.dir === 'rtl' || el.style?.textAlign === 'right') {
              node[plugin.key] = 'rtl';
              node.rtl = true;
            }
          },
        },
      }),
  }),
});
