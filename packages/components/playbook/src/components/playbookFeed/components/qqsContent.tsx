import React from 'react';
import { useTranslation } from 'react-i18next';

import { NoResultsPage } from '@bloobirds-it/misc';
import { PlaybookTab } from '@bloobirds-it/types';

import { QQsCard } from '../../playbookCard/qqsCard';
import { usePlaybookFeed } from '../usePlaybookFeed';
import { noResultsContent } from './tabContent.utils';

export const QQsContent = () => {
  const {
    activeBobject,
    refreshActiveBobject,
    segmentationValues,
    actionsDisabled,
    qualifyingQuestions,
    isLoading,
    updateQualifyingQuestionsValue,
  } = usePlaybookFeed();

  const { t } = useTranslation();

  const noResults =
    qualifyingQuestions?.length === 0 && Object.keys(segmentationValues).length !== 0;
  const noQQs = qualifyingQuestions?.length === 0 && Object.keys(segmentationValues).length === 0;
  const { actionButton, description, title } = noResultsContent({
    tabSelected: PlaybookTab.QQS,
    t,
  });

  return (
    <>
      {qualifyingQuestions?.length > 0 &&
        qualifyingQuestions?.map(qq => (
          <QQsCard
            template={qq}
            key={qq?.id}
            QQValue={
              activeBobject?.rawBobject
                ? activeBobject?.rawBobject[qq?.id]
                : //@ts-ignore
                  activeBobject?.raw[qq?.id]
            }
            tabSelected={PlaybookTab.QQS}
            onUpdateQQ={value => updateQualifyingQuestionsValue(activeBobject, value)}
            refreshActiveBobject={refreshActiveBobject}
            actionsDisabled={actionsDisabled}
          />
        ))}

      {noResults && !isLoading && (
        <NoResultsPage
          title={t('playbook.tabContent.noResults')}
          description={t('playbook.tabContent.noResultsHint')}
          actionButton={actionButton}
        />
      )}

      {noQQs && !isLoading && (
        <NoResultsPage title={title} description={description} actionButton={actionButton} />
      )}
    </>
  );
};
