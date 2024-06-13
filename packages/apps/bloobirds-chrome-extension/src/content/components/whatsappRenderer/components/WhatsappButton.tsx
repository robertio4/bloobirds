import { MouseEvent } from 'react';

import { ColorType, Icon, Spinner, Tooltip, useHover } from '@bloobirds-it/flamingo-ui';
import classNames from 'classnames';
import { TFunction } from 'i18next';

import styles from '../whatsapp.module.css';

export interface ButtonProps {
  t: TFunction;
  status: 'success' | 'error' | 'enabled' | 'loading' | 'disabled';
  type: 'conversation' | 'message';
  leadName?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

const WhatsappButton = ({ status, type, t, leadName, onClick }: ButtonProps) => {
  const isConversation = type === 'conversation';

  const [hoverRef, isHover] = useHover();

  let color: ColorType;
  let text: string | JSX.Element;
  let tooltipTitle: string;
  switch (status) {
    case 'enabled':
      color = 'bloobirds';
      text = isConversation ? 'Sync Conversation' : 'Sync';
      tooltipTitle = isConversation
        ? t('whatsapp.conversation.syncWithBoobject', { name: leadName })
        : t('whatsapp.messages.syncWithBoobject', { name: leadName });
      break;
    case 'success':
      color = 'white';
      text = isConversation ? 'Conversation synced' : 'Synced';
      tooltipTitle = isConversation
        ? t('whatsapp.conversation.alreadySynced')
        : t('whatsapp.messages.alreadySynced');
      break;
    case 'error':
      color = 'tomato';
      text = isConversation ? 'Sync Failed!' : 'Failed!';
      tooltipTitle = isConversation
        ? t('whatsapp.conversation.errorSyncing')
        : t('whatsapp.messages.errorSyncing');
      break;
    case 'loading':
      color = 'bloobirds';
      text = <Spinner size={8} name="loadingCircle" />;
      tooltipTitle = isConversation
        ? t('whatsapp.conversation.syncing')
        : t('whatsapp.messages.syncing');
      break;
    case 'disabled':
      color = 'softPeanut';
      text = isConversation ? 'Sync Conversation' : 'Sync';
      tooltipTitle = isConversation
        ? t('whatsapp.conversation.noContactMatch')
        : t('whatsapp.messages.noContactMatch');
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
  };

  const classes = classNames(styles.button, styles[status], {
    [styles.conversation]: isConversation,
  });

  if (status === 'error' && !isConversation && hoverRef.current) {
    console.error('Error syncing whatsapp conversation');
    const btnsContainer = hoverRef.current?.closest('[data-bloobirds-button=true]')?.parentElement;
    const element = btnsContainer?.closest('[data-id]');
    if (btnsContainer && !isConversation) {
      btnsContainer.style.width = '120px';
      if (element && element.dataset.id.split('_')[0] === 'true') {
        btnsContainer.style.left = '-130px';
      } else {
        btnsContainer.style.right = '-130px';
      }
    }
  }

  return (
    <Tooltip title={tooltipTitle} position="top" expand>
      <button
        ref={hoverRef}
        className={classes}
        onClick={status !== 'loading' && status !== 'success' ? handleClick : undefined}
        type="button"
        data-test="Button-whatsapp"
        disabled={status === 'disabled'}
      >
        <Icon name={'bloobirds'} color={color} size={16} />
        {isConversation || status === 'loading' ? text : !isConversation && isHover ? text : null}
        {status === 'error' && <Icon name={'redoReload'} color={color} size={16} />}
      </button>
    </Tooltip>
  );
};

export default WhatsappButton;
