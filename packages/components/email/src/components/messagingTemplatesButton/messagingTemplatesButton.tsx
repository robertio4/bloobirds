import React from 'react';
import { useTranslation } from 'react-i18next';

import { Button, IconButton, Text } from '@bloobirds-it/flamingo-ui';
import { useMessagingTemplate } from '@bloobirds-it/hooks';

import styles from './messagingTemplatesButton.module.css';

interface MessagingTemplatesButtonProps {
  value?: string;
  onClick: () => void;
  user: any;
  isPlaybookTab?: boolean;
  autofilledTemplate?: string;
}

const MessagingTemplatesButton = ({
  value,
  onClick,
  isPlaybookTab,
  autofilledTemplate,
}: MessagingTemplatesButtonProps) => {
  const { messagingTemplate } = useMessagingTemplate(value);
  const { t } = useTranslation('translation', {
    keyPrefix: 'smartEmailModal.components.messagingTemplatesButton',
  });
  return (
    <div className={styles.container}>
      <div className={styles.select}>
        {autofilledTemplate && (
          <div className={styles.labelSuggestedTemplate}>Autofilled from {autofilledTemplate}</div>
        )}
        <div className={styles.label} onClick={onClick}>
          <Text size="xs" color="softPeanut">
            {value
              ? `${t('template')}:`
              : isPlaybookTab
              ? t('noTemplateSelected')
              : t('openTemplates')}
          </Text>
          <Text size="xs" color="peanut">
            {messagingTemplate?.name}
          </Text>
        </div>
        {!isPlaybookTab &&
          (value ? (
            <Button
              size="small"
              iconLeft="plus"
              className={styles.button}
              uppercase={false}
              onClick={onClick}
              color="purple"
            >
              {t('openTemplates')}
            </Button>
          ) : (
            <IconButton name="plus" size={20} onClick={onClick} color="purple" />
          ))}
      </div>
    </div>
  );
};

export default MessagingTemplatesButton;
