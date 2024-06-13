import React from 'react';

import { Button } from '@bloobirds-it/flamingo-ui';
import { PlaybookTab } from '@bloobirds-it/types';
import { TFunction } from 'i18next';

export const noResultsContent = ({
  tabSelected,
  callback,
  t,
}: {
  tabSelected: PlaybookTab;
  callback?: () => void;
  t: TFunction;
}) => {
  const content = {
    [PlaybookTab.SNIPPETS]: {
      title: t('playbook.tabContent.noTemplates', { type: 'snippet', icon: '💬' }),
      description: t('playbook.tabContent.noTemplatesMessage', { type: 'snippets' }),
      actionButton: (
        <Button size="small" onClick={callback} iconLeft="plus" color="lightPurple">
          {t('playbook.addNewTemplate')}
        </Button>
      ),
    },
    [PlaybookTab.PITCHES]: {
      title: t('playbook.tabContent.noTemplates', { type: 'pitch', icon: '💬' }),
      description: t('playbook.tabContent.noTemplatesMessage', { type: 'pitches' }),
      actionButton: (
        <Button size="small" onClick={callback} iconLeft="plus" color="lightPurple">
          {t('playbook.addNewTemplate')}
        </Button>
      ),
    },
    [PlaybookTab.EMAILS]: {
      title: t('playbook.tabContent.noTemplates', { type: 'email', icon: '✉️' }),
      description: t('playbook.tabContent.noTemplatesMessage', { type: 'templates' }),
      actionButton: (
        <Button size="small" onClick={callback} iconLeft="plus" color="lightPurple">
          {t('playbook.addNewTemplate')}
        </Button>
      ),
    },
    [PlaybookTab.LINKEDIN]: {
      title: t('playbook.tabContent.noTemplates', { type: 'LinkedIn', icon: '📄️' }),
      description: t('playbook.tabContent.noTemplatesMessage', { type: 'templates' }),
      actionButton: (
        <Button size="small" onClick={callback} iconLeft="plus" color="lightPurple">
          {t('playbook.addNewTemplate')}
        </Button>
      ),
    },
    [PlaybookTab.WHATSAPP]: {
      title: t('playbook.tabContent.noTemplates', { type: 'Whatsapp', icon: '📄️' }),
      description: t('playbook.tabContent.noTemplatesMessage', { type: 'templates' }),
      actionButton: (
        <Button size="small" onClick={callback} iconLeft="plus" color="lightPurple">
          {t('playbook.addNewTemplate')}
        </Button>
      ),
    },
    [PlaybookTab.QQS]: {
      title: t('playbook.tabContent.noQQs'),
      description: t('playbook.tabContent.noQQsMessage'),
      actionButton: (
        <Button
          size="small"
          onClick={() => window.open('https://app.bloobirds.com/app/playbook/messaging/qq')}
          iconLeft="plus"
          color="lightPurple"
        >
          {t('playbook.addNewQQ')}
        </Button>
      ),
    },
  };
  return content[tabSelected];
};
