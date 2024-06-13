import { useTranslation } from 'react-i18next';

import { Tag, Tooltip } from '@bloobirds-it/flamingo-ui';

import { isEmail } from '../utils/email';

interface EmailBadgeProps {
  email: string;
  deleteEmail: (email: string) => void;
}

function getTooltipText(isValidEmail) {
  const { t } = useTranslation('translation', { keyPrefix: 'scheduler.guests' });

  if (!isValidEmail) return t('invalidEmailTooltip');
}

export const EmailBadge = ({ email, deleteEmail }: EmailBadgeProps) => {
  const isValidEmail = isEmail(email);
  const tooltipText = getTooltipText(isValidEmail);
  const color = (() => {
    if (!isValidEmail) return 'verySoftTomato';
    return 'lightBloobirds';
  })();

  return (
    <Tooltip title={tooltipText} position="top">
      <Tag
        uppercase={false}
        color={color}
        iconRight="cross"
        onClickRight={e => {
          e.stopPropagation();
          deleteEmail(email);
        }}
      >
        {email}
      </Tag>
    </Tooltip>
  );
};
