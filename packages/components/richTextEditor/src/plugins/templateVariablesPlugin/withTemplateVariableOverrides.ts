import { insertNodes, isElement, removeNodes } from '@udecode/plate';
import { ELEMENT_MISSING_VARIABLE, ELEMENT_TEMPLATE_VARIABLE } from './defaults';

const withTemplateVariableOverrides = (editor, { options: { replace, values } }) => {
  const { normalizeNode } = editor;

  editor.normalizeNode = entry => {
    const [node, path] = entry;
    if (replace && isElement(node) && node.type === ELEMENT_TEMPLATE_VARIABLE) {
      removeNodes(editor, { at: path });
      const variable = values.find(v => [v.logicRole, v.id].includes(node.id));
      if (variable?.value) {
        insertNodes(
          editor,
          {
            text: variable.value,
          },
          { at: path },
        );
      } else {
        insertNodes(editor, { ...node, type: ELEMENT_MISSING_VARIABLE }, { at: path });
      }
    } else {
      normalizeNode(entry);
    }
  };

  return editor;
};

export default withTemplateVariableOverrides;
