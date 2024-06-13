import { useMemo } from 'react';
import { ELEMENT_TEMPLATE_VARIABLE, ELEMENT_MISSING_VARIABLE } from './defaults';
import withTemplateVariableOverrides from './withTemplateVariableOverrides';
import hash from 'object-hash';
import { createElementAs } from '@udecode/plate';
import { toTitleCase } from '@bloobirds-it/utils';
import { useBaseEmailVariableValue } from '@bloobirds-it/hooks';

export const useTemplateVariablesPlugin = ({ replace = false }) => {
  const emailVariablesValues = useBaseEmailVariableValue();

  return useMemo(() => {
    const values = Object.values(emailVariablesValues).flat();

    const options = {
      replace,
      values,
    };

    return {
      key: ELEMENT_TEMPLATE_VARIABLE,
      isElement: true,
      isVoid: true,
      isInline: true,
      options: options,
      withOverrides: withTemplateVariableOverrides,
      plugins: [
        {
          key: ELEMENT_MISSING_VARIABLE,
          isElement: true,
          isVoid: true,
          isInline: true,
        },
      ],
      then: (_, { type }) => {
        return {
          options: options,
          deserializeHtml: {
            type,
            getNode: el => ({
              type,
              group: el.getAttribute('group'),
              name: el.getAttribute('name'),
              id: el.getAttribute('type'),
            }),
            rules: [{ validNodeName: 'VARIABLE' }],
          },
          serializeHtml: ({ element }) => {
            //@ts-ignore
            const variable: any = values.find(v => v.id === element.id);
            if (variable) {
              return variable?.value;
            } else {
              const group = toTitleCase(element.group);
              const name = toTitleCase(element.name);

              return createElementAs('span', {
                ...element,
                as: 'missing-variable',
                style: {
                  color: 'var(--softTomato)',
                  backgroundColor: '#ffdbe2',
                  borderRadius: '4px',
                  padding: '2px 4px',
                  textTransform: 'capitalize',
                  whiteSpace: 'normal',
                },
                children: `${group}: ${name}`,
              });
            }
          },
        };
      },
    };
  }, [replace, hash(emailVariablesValues)]);
};
