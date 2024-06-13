import { ColorType } from '@bloobirds-it/flamingo-ui';
import { useIsNoStatusPlanAccount } from '@bloobirds-it/hooks';

import styles from './stageDivider.module.css';

export const StageDivider = ({ color }: { color: ColorType }) => {
  const isNoStatusPlanAccount = useIsNoStatusPlanAccount();

  return isNoStatusPlanAccount ? (
    <></>
  ) : (
    <div className={styles.container} style={{ backgroundColor: `var(--${color})` }} />
  );
};
