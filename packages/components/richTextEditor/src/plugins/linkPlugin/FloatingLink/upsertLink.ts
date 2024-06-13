import {
  CreateLinkNodeOptions,
  ELEMENT_IMAGE,
  ELEMENT_LINK,
  insertLink,
  LinkPlugin,
  TLinkElement,
  unwrapLink,
  upsertLinkText,
  wrapLink,
} from '@udecode/plate';
import {
  findNode,
  getAboveNode,
  getEditorString,
  getNodeLeaf,
  getNodeProps,
  getPluginOptions,
  getPluginType,
  insertNodes,
  InsertNodesOptions,
  isDefined,
  isExpanded,
  PlateEditor,
  removeNodes,
  setNodes,
  UnwrapNodesOptions,
  Value,
  WrapNodesOptions,
} from '@udecode/plate-core';
import { ELEMENT_IMAGE_LINK } from '../../imagePlugin/defaults';

export type UpsertLinkOptions<V extends Value = Value> = CreateLinkNodeOptions & {
  /**
   * If true, insert text when selection is in url.
   */
  insertTextInLink?: boolean;
  insertNodesOptions?: InsertNodesOptions<V>;
  unwrapNodesOptions?: UnwrapNodesOptions<V>;
  wrapNodesOptions?: WrapNodesOptions<V>;
  isUrl?: (url: string) => boolean;
};

/**
 * If selection in a link or is not url:
 * - insert text with url, exit
 * If selection is expanded or `update` in a link:
 * - remove link node, get link text
 * Then:
 * - insert link node
 */
export const upsertLink = <V extends Value>(
  editor: PlateEditor<V>,
  {
    url,
    text,
    target,
    insertTextInLink,
    insertNodesOptions,
    isUrl = getPluginOptions<LinkPlugin, V>(editor, ELEMENT_LINK).isUrl,
  }: UpsertLinkOptions<V>,
) => {
  const at = editor?.selection;

  if (!at) return;

  const linkAboveImage = getAboveNode<TLinkElement>(editor);

  // link above image -> change image by link
  if (linkAboveImage && linkAboveImage[0].type === ELEMENT_IMAGE) {
    if (url !== linkAboveImage[0]?.url || target !== linkAboveImage[0]?.target) {
      //removeNodes(editor, { at: editor.selection });
      removeNodes(editor, { at: editor?.selection });
      const text = { text: '' };
      insertNodes<TLinkElement>(editor, {
        type: getPluginType(editor, ELEMENT_IMAGE_LINK),
        href: url,
        url: linkAboveImage[0]?.url,
        children: [text],
      });
    }

    return true;
  }

  const linkAbove = getAboveNode<TLinkElement>(editor, {
    at,
    match: { type: getPluginType(editor, ELEMENT_LINK) },
  });

  // anchor and focus in link -> insert text
  if (insertTextInLink && linkAbove) {
    // we don't want to insert marks in links
    editor.insertText(url);
    return true;
  }

  if (!isUrl?.(url)) return;

  if (isDefined(text) && !text.length) {
    text = url;
  }

  // edit the link url and/or target
  if (linkAbove) {
    if (url !== linkAbove[0]?.url || target !== linkAbove[0]?.target) {
      setNodes<TLinkElement>(
        editor,
        { url, target },
        {
          at: linkAbove[1],
        },
      );
    }

    upsertLinkText(editor, { url, text, target });

    return true;
  }

  // selection contains at one edge edge or between the edges
  const linkEntry = findNode<TLinkElement>(editor, {
    at,
    match: { type: getPluginType(editor, ELEMENT_LINK) },
  });

  const [linkNode, linkPath] = linkEntry ?? [];

  let shouldReplaceText = false;

  if (linkPath && text?.length) {
    const linkText = getEditorString(editor, linkPath);

    if (text !== linkText) {
      shouldReplaceText = true;
    }
  }

  const linkEntryImg = findNode<TLinkElement>(editor, {
    at,
    match: { type: getPluginType(editor, ELEMENT_IMAGE) },
  });

  if (isExpanded(at) || linkEntryImg) {
    // anchor and focus in link
    if (linkAbove) {
      unwrapLink(editor, {
        at: linkAbove[1],
      });
    } else {
      unwrapLink(editor, {
        split: true,
      });
    }

    wrapLink(editor, {
      url,
      target,
    });

    upsertLinkText(editor, { url, target, text });

    return true;
  }

  if (shouldReplaceText) {
    removeNodes(editor, {
      at: linkPath,
    });
  }

  const props = getNodeProps(linkNode ?? ({} as any));

  const path = editor.selection?.focus.path;
  if (!path) return;

  // link text should have the focused leaf marks
  const leaf = getNodeLeaf(editor, path);

  // if text is empty, text is url
  if (!text?.length) {
    text = url;
  }

  insertLink(
    editor,
    {
      ...props,
      url,
      target,
      children: [
        {
          ...leaf,
          text,
        },
      ],
    },
    insertNodesOptions,
  );
  return true;
};
