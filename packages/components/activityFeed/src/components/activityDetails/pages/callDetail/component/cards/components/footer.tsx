import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardButton, IconType } from '@bloobirds-it/flamingo-ui';

interface PropType {
  label: string;
  icon: IconType;
  onClick: () => void;
}

export const Footer = ({
  main,
  secondary,
  discard,
  actionDone,
  actionDiscarded,
}: {
  main: PropType;
  secondary?: PropType;
  discard?: PropType;
  actionDone: boolean;
  actionDiscarded: boolean;
}) => {
  const { t } = useTranslation('translation', {
    keyPrefix: 'activityTimelineItem.activityFeed.footer',
  });
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <CardButton
        size="small"
        variant="clear"
        iconLeft="trashEmpty"
        color="extraMeeting"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
          discard.onClick();
        }}
        uppercase={false}
      >
        {actionDiscarded ? t('discard') : discard.label}
      </CardButton>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginLeft: 'auto', gap: 4 }}>
        <CardButton
          size="small"
          variant="primary"
          color={actionDone ? 'extraCall' : 'bloobirds'}
          iconLeft={actionDone ? 'check' : main.icon}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            main.onClick();
          }}
          uppercase={false}
        >
          {actionDone ? t('done') : main.label}
        </CardButton>
      </div>
    </div>
  );
};
