import React, { Suspense } from 'react';
import { useParams } from 'react-router';

import { Skeleton, Spinner } from '@bloobirds-it/flamingo-ui';
import { CopilotActivityContextProvider, useAiAnalysisEnabled } from '@bloobirds-it/hooks';

import { LogoSvg } from '../../../assets/svg';
import { useUserSettings } from '../../components/userPermissions/hooks';
import { useDocumentTitle } from '../../hooks';
import NoPermissionsPage from '../noPermissionsPage';
import SomethingWentWrongPage from '../somethingWentWrongPage';
import AiAnalysisPage from './aiAnalysisPage';
import styles from './aiAnalysisPage.module.css';
import useActivityAnalysis from './useActivityAnalysis';

const AiAnalysis = () => {
  useDocumentTitle('My AI Analysis');
  const { id } = useParams<{ id: string }>();
  const settings = useUserSettings();
  const accountId = settings?.account?.id;
  const aiAnalysisEnabled = useAiAnalysisEnabled(accountId);

  const { activity, isLoading, source, sfdcRecord } = useActivityAnalysis(
    `${accountId}/Activity/${id}`,
  );

  if (!aiAnalysisEnabled) {
    return <NoPermissionsPage />;
  }

  if (!isLoading && !activity) {
    return <SomethingWentWrongPage />;
  }

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <LogoSvg fill="var(--bloobirds)" width={50} />
        <div className={styles.spinner}>
          <Spinner name="loadingCircle" />
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<Skeleton variant="rect" height={300} width="100%" />}>
      <CopilotActivityContextProvider activity={activity}>
        <AiAnalysisPage activity={activity} source={source} sfdcRecord={sfdcRecord} />
      </CopilotActivityContextProvider>
    </Suspense>
  );
};

export default AiAnalysis;
