import { useTranslation, Trans } from 'react-i18next';
import { useRouteError } from 'react-router-dom';

import { Text } from '@bloobirds-it/flamingo-ui';

interface ErrorType {
  statusText?: string;
  message?: string;
}

export default function ErrorPage({ error }: { error?: Error }) {
  const { t } = useTranslation('translation');

  const routeError: ErrorType | undefined = useRouteError();
  console.error(error ?? routeError);

  return (
    <div
      id="error-page"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        gap: '8px',
      }}
    >
      <Text size="xxl" align="center" weight="bold">
        🫣
      </Text>
      <Text size="xl" align="center" weight="bold">
        {t('scheduler.errorPageInfoTitle')}
      </Text>
      <div>
        <Text size="s" align="center" color="softPeanut">
          <Trans t={t} i18nKey="scheduler.errorPageInfo" />
        </Text>
      </div>
    </div>
  );
}
