import {
  createExitBreakPlugin,
  createSelectOnBackspacePlugin,
  ELEMENT_BLOCKQUOTE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  ExitBreakPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
  KEYS_HEADING,
  ResetNodePlugin,
  SelectOnBackspacePlugin,
} from '@udecode/plate';

import { createMyPlugins, MyPlatePlugin } from './../config/typescript';
import { createDirPlugin } from './createDirPlugin';
import { createDirectionPlugin } from './createDirectionPlugin';
import { ELEMENT_IMAGE_LINK } from './imagePlugin/defaults';
import { ELEMENT_RAW_HTML_BLOCK } from './rawHTMLBlockPlugin';
import { ELEMENT_SLOTS_FORM } from './slotsBlockPlugin';
import { ELEMENT_MISSING_VARIABLE, ELEMENT_TEMPLATE_VARIABLE } from './templateVariablesPlugin';

const resetBlockTypesCommonRule = {
  types: [ELEMENT_BLOCKQUOTE],
  defaultType: ELEMENT_PARAGRAPH,
};

export const resetBlockTypePlugin: Partial<MyPlatePlugin<ResetNodePlugin>> = {
  options: {
    rules: [
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Enter',
        predicate: isBlockAboveEmpty,
      },
      {
        ...resetBlockTypesCommonRule,
        hotkey: 'Backspace',
        predicate: isSelectionAtBlockStart,
      },
    ],
  },
};

export const exitBreakPlugin: Partial<MyPlatePlugin<ExitBreakPlugin>> = {
  options: {
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: KEYS_HEADING,
        },
        relative: true,
      },
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_IMAGE, ELEMENT_BLOCKQUOTE, ELEMENT_IMAGE_LINK],
        },
      },
      {
        hotkey: 'enter',
        before: true,
        query: {
          start: true,
          allow: [ELEMENT_PARAGRAPH],
        },
      },
    ],
  },
};

export const selectOnBackspacePlugin: Partial<MyPlatePlugin<SelectOnBackspacePlugin>> = {
  options: {
    query: {
      allow: [
        ELEMENT_IMAGE,
        ELEMENT_TEMPLATE_VARIABLE,
        ELEMENT_MISSING_VARIABLE,
        ELEMENT_RAW_HTML_BLOCK,
        ELEMENT_IMAGE_LINK,
        ELEMENT_SLOTS_FORM,
      ],
    },
  },
};

const createControlPlugins = () =>
  createMyPlugins([
    //createResetNodePlugin(resetBlockTypePlugin),
    createExitBreakPlugin(exitBreakPlugin),
    createSelectOnBackspacePlugin(selectOnBackspacePlugin),
    createDirectionPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_H4,
            ELEMENT_H5,
            ELEMENT_H6,
            'span',
          ],
        },
      },
    }),
    createDirPlugin({
      inject: {
        props: {
          validTypes: [
            ELEMENT_PARAGRAPH,
            ELEMENT_H1,
            ELEMENT_H2,
            ELEMENT_H3,
            ELEMENT_H4,
            ELEMENT_H5,
            ELEMENT_H6,
          ],
        },
      },
    }),
  ]);

export default createControlPlugins;
