import { Icon, IconButton, IconType, Text } from '@bloobirds-it/flamingo-ui';
import { TFunction } from 'i18next';

import BloobirdsLogo from '../../../bloobirds';
import styles from './tourStep.module.css';

interface TourStepProps {
  icon: IconType;
  titleKey: string;
  contentKey: string;
  handleClose: () => void;
  t: TFunction;
}
export const TourStep = ({ icon, titleKey, contentKey, handleClose, t }: TourStepProps) => (
  <div className={styles.tourStepWrapper}>
    <div className={styles.tourStepHeader}>
      <BloobirdsLogo width={16} height={16} fill="#1991ff" />
      <IconButton name="cross" onClick={handleClose} />
    </div>
    <div className={styles.tourStepContent}>
      {icon && <Icon name={icon} size={32} />}
      {titleKey && (
        <Text size="s" weight="bold">
          {t(titleKey)}
        </Text>
      )}
      {contentKey && <Text size="xxs">{t(contentKey)}</Text>}
    </div>
    <div className={styles.tourStepControls}></div>
  </div>
);
