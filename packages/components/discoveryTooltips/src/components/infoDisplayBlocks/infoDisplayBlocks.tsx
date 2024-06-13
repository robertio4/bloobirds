import { Icon, IconType, Text } from '@bloobirds-it/flamingo-ui';
import mixpanel from 'mixpanel-browser';

import styles from './infoDisplayBlocks.module.css';

export const TooltipContentHTML = ({ str, onClick }: { str: string; onClick?: () => void }) => {
  return <div onClick={onClick ? onClick : undefined} dangerouslySetInnerHTML={{ __html: str }} />;
};

export const TooltipContentBlock = ({
  body,
  icon,
  mixpanelKey,
}: {
  body: string;
  icon: IconType;
  mixpanelKey: string;
}) => {
  const handleClick = () => {
    if (mixpanelKey) mixpanel.track(mixpanelKey);
  };

  return (
    <div className={styles.tooltipContentBlock}>
      <Icon size={24} name={icon} color="purple" />
      <Text size="xs">
        <TooltipContentHTML str={body} onClick={handleClick} />
      </Text>
    </div>
  );
};
