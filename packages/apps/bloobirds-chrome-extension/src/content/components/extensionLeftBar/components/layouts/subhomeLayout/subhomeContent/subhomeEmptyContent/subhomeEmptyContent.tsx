import { useTranslation } from 'react-i18next';

import { Button } from '@bloobirds-it/flamingo-ui';
import { useMinimizableModals } from '@bloobirds-it/hooks';
import { NoResultsPage } from '@bloobirds-it/misc';
import { t } from 'xstate';

import { useExtensionContext } from '../../../../../../context';

export const EmptyTaskList = () => {
  const { t } = useTranslation();

  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { openMinimizableModal } = useMinimizableModals();

  function openTaskModal() {
    openMinimizableModal({
      type: 'task',
      data: {
        location: 'bubble',
      },
    });
  }

  return (
    <NoResultsPage
      title={t('leftBar.noResultsPage.emptyTaskList.title')}
      description={t('leftBar.noResultsPage.emptyTaskList.description')}
      actionButton={
        <Button size="small" onClick={openTaskModal} iconLeft="plus">
          {t('leftBar.noResultsPage.createNewTask')}
        </Button>
      }
      sidePeekEnabled={sidePeekEnabled}
    />
  );
};

export const NoFilterSelected = () => {
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();

  return (
    <NoResultsPage
      title={t('leftBar.noResultsPage.noFilterSelected.title')}
      description={t('leftBar.noResultsPage.noFilterSelected.description')}
      sidePeekEnabled={sidePeekEnabled}
    />
  );
};
export const NoFilterResults = () => {
  const { useGetSidePeekEnabled } = useExtensionContext();
  const sidePeekEnabled = useGetSidePeekEnabled();
  const { t } = useTranslation();

  return (
    <NoResultsPage
      title={t('leftBar.noResultsPage.noFilterResults.title')}
      description={t('leftBar.noResultsPage.noFilterResults.description')}
      sidePeekEnabled={sidePeekEnabled}
    />
  );
};
