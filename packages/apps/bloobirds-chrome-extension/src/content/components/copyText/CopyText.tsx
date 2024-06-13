import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton, Tooltip } from '@bloobirds-it/flamingo-ui';
import clsx from 'clsx';

import styles from './copyText.module.css';

interface CopyTextInterface {
  children: React.ReactNode;
  isLinkTypeField: boolean;
  textToCopy: string;
  htmlFormat?: boolean;
  alwaysDisplay?: boolean;
}

export const CopyText = ({
  children,
  isLinkTypeField = false,
  htmlFormat = false,
  textToCopy,
  alwaysDisplay = false,
}: CopyTextInterface) => {
  if (!React.isValidElement(children))
    throw new Error('The copy component is not receiving the appropriate children.');
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'copyText' });

  const [tooltipText, setTooltipText] = useState(t('copyToClipboard'));

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => {
        setIsVisible(false);
        setTooltipText(t('copyToClipboard'));
      }}
      className={clsx(styles.copy_component, {
        [styles.link_copy_component]: isLinkTypeField,
      })}
    >
      {children}
      <Tooltip title={tooltipText} position="top">
        <IconButton
          size={16}
          name="copy"
          className={clsx(styles.copy_icon, { [styles.show_icon]: isVisible || alwaysDisplay })}
          onClick={() => {
            setTooltipText(t('copied'));
            const clipboardElement = htmlFormat
              ? new ClipboardItem({
                  // @ts-ignore
                  'text/html': new Blob([`${textToCopy}`], {
                    type: 'text/html',
                  }),
                })
              : new ClipboardItem({
                  // @ts-ignore
                  'text/plain': new Blob([`${textToCopy}`], {
                    type: 'text/plain',
                  }),
                });
            navigator.clipboard.write([clipboardElement]);
          }}
        />
      </Tooltip>
    </div>
  );
};
