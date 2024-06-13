import { ELEMENT_MISSING_VARIABLE } from '../defaults';
import { hasMissingVariables } from './hasMissingVariables';

test('returns true if the node array has missing variables', () => {
  const value = [
    {
      type: 'p',
      children: [
        {
          text: 'Hola ',
        },
        {
          type: ELEMENT_MISSING_VARIABLE,
          children: [
            {
              text: '',
            },
          ],
          id: 'HAe9aS2dpownhKA5',
          name: 'Name',
          group: 'lead',
        },
        {
          text: ' que tal?',
        },
      ],
    },
  ];
  expect(hasMissingVariables(value)).toBe(true);
});

test('returns false if the node array has not missing variables', () => {
  const value = [
    {
      type: 'p',
      children: [
        {
          text: 'Hola Eudald que tal?',
        },
      ],
    },
  ];
  expect(hasMissingVariables(value)).toBe(false);
});
