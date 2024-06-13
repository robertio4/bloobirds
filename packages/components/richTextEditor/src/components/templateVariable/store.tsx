import { createAtomStore } from '@udecode/plate';

export const { templateVariableStore, useTemplateVariableStore } = createAtomStore(
  {
    valueVariable: '' as string,
  },
  { name: 'templateVariable' as const },
);
