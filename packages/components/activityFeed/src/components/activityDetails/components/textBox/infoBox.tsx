import React from 'react';

import { Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import { isHtml } from '@bloobirds-it/utils';

import styles from './textBox.module.css';

const TextInfoDisplay = ({ info }) => {
  return isHtml(info) ? (
    <div className={styles.html_message} dangerouslySetInnerHTML={{ __html: info }} />
  ) : (
    <Text className={styles.infoSectionText} size="xs">
      {info ? info : 'None'}
    </Text>
  );
};

const InfoSection = ({
  icon,
  title,
  info,
}: {
  icon: IconType;
  title: string;
  info?: string | React.ReactElement;
}) => {
  return (
    <>
      <div className={styles.infoSectionHeader}>
        <Icon name={icon} color="bloobirds" />
        <Text size="xs" weight="heavy">
          {title}
        </Text>
      </div>
      {typeof info === 'string' || !info ? <TextInfoDisplay info={info} /> : info}
    </>
  );
};

const SmallInfoSection = ({
  icon,
  title,
  info,
}: {
  icon: IconType;
  title: string;
  info?: string | React.ReactElement;
}) => (
  <div className={styles.smallInfoSection}>
    <div className={styles.smallInfoSectionTitle}>
      <Icon name={icon} color="bloobirds" />
      <Text size="xs" weight="heavy">
        {title}
      </Text>
    </div>
    <Text size="xs">{info ? info : 'None'}</Text>
  </div>
);

interface TextBoxProps {
  isSmallBlock?: boolean;
  icon: IconType;
  title: string;
  info?: string | React.ReactElement;
}

export const InfoBox = ({ isSmallBlock = false, ...props }: TextBoxProps) => {
  switch (isSmallBlock) {
    case true:
      return <SmallInfoSection {...props} />;
    default:
      return <InfoSection {...props} />;
  }
};
