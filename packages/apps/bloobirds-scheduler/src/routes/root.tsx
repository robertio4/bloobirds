import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router';

import { Icon, Spinner, Text } from '@bloobirds-it/flamingo-ui';

import logo from '../assets/logo.svg';
import ChangeLanguage from '../components/ChangeLanguage';
import ErrorPage from '../error-page';
import { useFetchData } from '../hooks/useFetchData';
import styles from './root.module.css';

interface RootProps {
  outlet?: any;
}

function Root({ outlet }: RootProps) {
  const { data, error, create } = useFetchData();

  const { t } = useTranslation('translation', { keyPrefix: 'scheduler' });

  let isLoading = !data;

  if (error) {
    outlet = <ErrorPage error={error} />;
    isLoading = false;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.changeLngBtn}>
          <ChangeLanguage />
        </div>
        {isLoading ? (
          <div className={styles.loader}>
            <img src={logo} alt="logo" className={styles.logo} />
            <div className={styles.spinner}>
              <Spinner name="loadingCircle" />
            </div>
          </div>
        ) : (
          outlet ?? <Outlet context={[data, create]} />
        )}
      </div>
      <div className={styles.footer}>
        <Icon name="bloobirds" />
        <Text size="m" color="peanut">
          {t('poweredByBloobirds')}
        </Text>
      </div>
    </>
  );
}

export default Root;
