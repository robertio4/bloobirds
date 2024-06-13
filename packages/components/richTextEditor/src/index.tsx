import RichTextEditor, { initialValue } from './richTextEditor';
import useRichTextEditorPlugins from './useRichTextEditorPlugins';

export * from './plugins';
export * from './serialize';
export * from './components';
export type { MyEditor } from './config/typescript';

export { RichTextEditor, initialValue, useRichTextEditorPlugins };
