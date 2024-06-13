import {
  createHeadingPlugin,
  createBlockquotePlugin,
  createLinkPlugin,
  createListPlugin,
  LinkPlugin,
  RenderAfterEditable,
} from '@udecode/plate';

import { createMyPlugins, MyPlatePlugin, MyValue } from '../config/typescript';
import { PlateFloatingLink } from './linkPlugin/PlateFloatingLink';

export const linkPlugin: Partial<MyPlatePlugin<LinkPlugin>> = {
  renderAfterEditable: PlateFloatingLink as RenderAfterEditable<MyValue>,
  options: {
    forceSubmit: true,
  },
};

const createElementsPlugins = () =>
  createMyPlugins([
    createBlockquotePlugin(),
    createHeadingPlugin(),
    createLinkPlugin(linkPlugin),
    createListPlugin(),
  ]);


export default createElementsPlugins;
