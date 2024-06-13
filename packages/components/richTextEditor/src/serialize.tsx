import { createPlateUIEditor, deserializeHtml, serializeHtml } from '@udecode/plate';

export const deserialize = (content, { format = 'AST', plugins = [] } = {}) => {
  if (!content) {
    return undefined;
  }

  if (format === 'HTML') {
    const editor = createPlateUIEditor({
      plugins,
    });

    return deserializeHtml(editor, {
      element: content,
    });
  } else {
    return JSON.parse(content);
  }
};

// This function is only meant for serializing context-free template like when they appear in the card list
export const serialize = (content, { format = 'AST', plugins = [] } = {}) => {
  const editor = createPlateUIEditor({
    plugins,
  });

  if (!content) {
    return '';
  }

  let nodes;
  // For backwards compatibility
  if (format === 'HTML') {
    nodes = deserialize(content, { format, plugins });
  } else {
    nodes = typeof content === 'string' ? JSON.parse(content) : content;
  }

  const html = serializeHtml(editor, { nodes, stripWhitespace: false });
  const raw = html
    .replaceAll(/<div(\s*)?>\s*<\/div>/g, '<br>')
    .replaceAll('&#x27;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&apos;', "'");

  return raw;
};
