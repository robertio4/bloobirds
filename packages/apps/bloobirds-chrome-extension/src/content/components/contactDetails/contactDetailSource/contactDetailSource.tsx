// @ts-ignore
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Dropdown,
  Icon,
  IconType,
  Item,
  Text,
  Tooltip,
  useVisible,
} from '@bloobirds-it/flamingo-ui';

import { useExtensionContext } from '../../context';
import styles from './contactDetailSource.module.css';

export enum Source {
  bloobirds = 'bloobirds',
  salesforce = 'salesforce',
}

interface ContactDetailsSourceProps {
  source: Source;
  setSource: (src: Source) => void;
  size?: 's' | 'm';
}

export const ContactDetailsSource = ({
  source,
  setSource,
  size = 's',
}: ContactDetailsSourceProps) => {
  const { visible, setVisible, ref } = useVisible();
  const { useGetSettings } = useExtensionContext();
  const { t } = useTranslation();
  const settings = useGetSettings();
  const salesforceInstance = settings?.account?.salesforceInstance;
  const sourceIcon: IconType = useMemo(() => {
    return source === Source.salesforce ? 'salesforceOutlined' : 'bloobirds';
  }, [source]);
  const sourceTitle: string = useMemo(() => {
    return source === Source.salesforce ? t('common.salesforce') : t('common.bloobirds');
  }, [source]);

  const iconSize = size === 's' ? 16 : 20;
  const textSize = size === 's' ? 'xs' : 's';

  const handleSourceChange = (src: Source) => {
    setSource(src);
    setVisible(false);
  };

  const Anchor = () => {
    return (
      <div
        className={styles.detail_header_row}
        onClick={() => {
          if (salesforceInstance) {
            setVisible(!visible);
          }
        }}
      >
        <div className={styles.detail_header_col}>
          <Icon name={sourceIcon} color="bloobirds" size={iconSize} />
        </div>
        <div className={styles.detail_header_col}>
          <Text color="bloobirds" size={textSize}>
            {sourceTitle}
          </Text>
        </div>
      </div>
    );
  };

  return !salesforceInstance ? (
    <Tooltip title={t('sidePeek.overview.tooltips.youCannotSelectOtherSource')} position="top">
      <Anchor />
    </Tooltip>
  ) : (
    <Dropdown anchor={Anchor()} visible={visible} ref={ref}>
      <Item
        className={styles.detail_dropdown_row}
        onClick={() => handleSourceChange(Source.salesforce)}
      >
        <Icon name="salesforceOutlined" color="bloobirds" size={20} />
        <Text size="s" color="peanut">
          {t('common.salesforce')}
        </Text>
      </Item>
      <Item
        className={styles.detail_dropdown_row}
        onClick={() => handleSourceChange(Source.bloobirds)}
      >
        <Icon name="bloobirds" color="bloobirds" size={20} />
        <Text size="s" color="peanut">
          {t('common.bloobirds')}
        </Text>
      </Item>
    </Dropdown>
  );
};
