import { ColorType, IconType } from '@bloobirds-it/flamingo-ui';
import {
  useActiveAccountId,
  useNewCadenceTableEnabled,
  useWhatsappEnabled,
} from '@bloobirds-it/hooks';

import {
  ContactViewAction,
  ContactViewActions,
} from '../../../contactView/components/contactViewActions/contactViewActions';

const actionsDictionary: (
  hasQuickLog: boolean,
  hasWhatsapp: boolean,
) => Array<{ color: ColorType; icon: IconType }> = (hasQuickLog, hasWhatsapp) => [
  {
    color: 'extraCall',
    icon: 'phone',
  },
  {
    color: 'tangerine',
    icon: 'mail',
  },
  {
    color: 'darkBloobirds',
    icon: 'linkedin',
  },
  ...[hasWhatsapp && { color: 'whatsapp' as ColorType, icon: 'whatsapp' as IconType }],
  {
    color: 'softBloobirds',
    icon: 'taskAction',
  },
  {
    color: 'banana',
    icon: 'noteAction',
  },
  {
    color: 'tomato',
    icon: 'calendar',
  },
  ...[hasQuickLog && { color: 'grape' as ColorType, icon: 'zap' as IconType }],
  {
    color: 'bloobirds',
    icon: 'agendaPerson',
  },
];

export const ActionsComponent = () => {
  const accountId = useActiveAccountId();
  const hasQuickLog = useNewCadenceTableEnabled(accountId);
  const hasWhatsApp = useWhatsappEnabled(accountId);
  const actions = actionsDictionary(hasQuickLog, hasWhatsApp).filter(Boolean);
  return (
    <ContactViewActions>
      {actions.map(action => (
        <ContactViewAction key={`${action.icon}_action_component`} {...action} />
      ))}
    </ContactViewActions>
  );
};
