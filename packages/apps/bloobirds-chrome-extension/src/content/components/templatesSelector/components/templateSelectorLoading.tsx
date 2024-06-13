import { Spinner } from '@bloobirds-it/flamingo-ui';

import BloobirdsLogo from '../../bloobirds';
import styles from '../templatesSelector.module.css';

export const TemplateSelectorLoading = () => {
  return (
    <div className={styles.templateSelectorDropdown}>
      <div className={styles.templateSelectorContainer}>
        <Spinner name="loadingCircle" color="softPeanut" size={12} />
        <BloobirdsLogo width={20} height={20} fill="#1991FF" />
      </div>
    </div>
  );
};
