import { checkIfIsEmpty } from '../utils/emailModal.utils';

it('Empty is false only when there is a children nested', () => {
  const subject = [
    {
      type: 'p',
      children: [
        {
          type: 'p',
          children: [
            {
              type: 'p',
              children: [
                {
                  text: 'CoverManager | Gestión de Reservas Restaurantes líder | KYU México',
                },
              ],
            },
          ],
        },
      ],
    },
  ];
  const actualState = checkIfIsEmpty(subject);
  expect(actualState).toBeFalsy();
});

it('Empty is true only when there is no children nested', () => {
  const subject = [
    {
      type: 'p',
      children: [
        {
          text: 'KILLER MAIL ESPAÑA',
        },
      ],
    },
  ];
  const actualState = checkIfIsEmpty(subject);
  expect(actualState).toBeFalsy();
});
