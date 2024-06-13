import { useMemo } from 'react';

import {
  createBasicMarksPlugin,
  createParagraphPlugin,
  createSingleLinePlugin,
  createFontSizePlugin,
  createFontColorPlugin,
} from '@udecode/plate';

import { createSlotsBlockPlugin } from './plugins';
import createControlPlugins from './plugins/controlPlugins';
import { createCustomParagraphPlugin } from './plugins/createCustomParagraphPlugin';
import createElementsPlugins from './plugins/elementsPlugins';
import { createImagePlugin } from './plugins/imagePlugin/createImagePlugin';
import { useTemplateMeetingLinksPlugin } from './plugins/meetingLinkPlugin';
import { createRawHTMLBlockPlugin } from './plugins/rawHTMLBlockPlugin';
import createReplacePlugins from './plugins/replacePlugins';
import { createReplyHistoryPlugin } from './plugins/replyHistoryPlugin';
import { createSnippetPlugins } from './plugins/snippetPlugin';
import { useTemplateVariablesPlugin } from './plugins/templateVariablesPlugin';

const useRichTextEditorPlugins = ({
  templateVariables = true,
  replaceTemplateVariables = false,
  marks = true,
  elements = true,
  images = true,
  snippets = false,
  singleLine = false,
  autoReplace = true,
  rawHTMLBlock = false,
  replyHistory = false,
  replaceMeetingLinks = false,
  stopPropagationPlugin = true,
  replaceParagraphs = false,
  keepDivs = false,
} = {}) => {
  const createTemplateVariablesPlugin = useTemplateVariablesPlugin({
    replace: replaceTemplateVariables,
  });

  const createMeetingLinksPlugin = useTemplateMeetingLinksPlugin(replaceMeetingLinks);

  return useMemo(() => {
    let basePlugins = [];

    if (!keepDivs) {
      if (replaceParagraphs) {
        basePlugins = [...basePlugins, createCustomParagraphPlugin()];
      } else {
        basePlugins = [...basePlugins, createParagraphPlugin()];
      }
    }

    if (elements) {
      basePlugins = [...basePlugins, ...createElementsPlugins()];
    }

    if (elements || templateVariables) {
      basePlugins = [...basePlugins, ...createControlPlugins()];
    }

    if (autoReplace) {
      basePlugins = [...basePlugins, ...createReplacePlugins()];
    }

    if (marks) {
      basePlugins = [
        ...basePlugins,
        createBasicMarksPlugin(),
        createFontSizePlugin(),
        createFontColorPlugin(),
      ];
    }

    if (singleLine) {
      basePlugins = [...basePlugins, createSingleLinePlugin()];
    }

    if (images) {
      basePlugins = [...basePlugins, createImagePlugin()];
    }

    if (rawHTMLBlock) {
      basePlugins = [...basePlugins, createRawHTMLBlockPlugin()];
    }

    if (replyHistory) {
      basePlugins = [...basePlugins, createReplyHistoryPlugin()];
    }

    if (snippets) {
      basePlugins = [...basePlugins, ...createSnippetPlugins()];
    }

    if (templateVariables) {
      basePlugins = [...basePlugins, createTemplateVariablesPlugin];
    }

    basePlugins = [...basePlugins, createMeetingLinksPlugin];

    basePlugins = [...basePlugins, createSlotsBlockPlugin()];

    return basePlugins;
  }, [
    createTemplateVariablesPlugin,
    createMeetingLinksPlugin,
    templateVariables,
    replaceTemplateVariables,
    stopPropagationPlugin,
    marks,
    rawHTMLBlock,
    elements,
    images,
    singleLine,
    replyHistory,
    snippets,
  ]);
};

export default useRichTextEditorPlugins;
