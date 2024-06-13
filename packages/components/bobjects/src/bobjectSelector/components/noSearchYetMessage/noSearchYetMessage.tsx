import { useTranslation } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';

import styles from './noSearchYetMessage.module.css';
import {useIsB2CAccount} from "@bloobirds-it/hooks";

export const NoSearchYetMessage = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'bobjectSelector' });
  const isB2CAccount = useIsB2CAccount();

  return (
    <div className={styles.noResultFound}>
      <Text color="softPeanut" size="s">
        {!isB2CAccount ? t('noSearchYetMessage') : t('noSearchYetMessageB2CAccounts')}{' '}
      </Text>
    </div>
  );
};
