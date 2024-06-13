import { useTranslation } from 'react-i18next';

import { useFilters } from '@bloobirds-it/filters';
import { Button } from '@bloobirds-it/flamingo-ui';
import { SalesforceTabs } from '@bloobirds-it/types';

import { useSubhomeContext } from '../../subhomeLayout';

export const SubhomeResetButton = () => {
  const { t } = useTranslation();

  const { resetFilters, haveFiltersBeenChanged } = useFilters();
  const { setStage, selectedTab } = useSubhomeContext();

  return (
    <>
      {haveFiltersBeenChanged && (
        <Button
          iconLeft="cross"
          color="bloobirds"
          variant="tertiary"
          size="small"
          onClick={() => {
            resetFilters();
            if (selectedTab === SalesforceTabs.TASKS || selectedTab === SalesforceTabs.NURTURING) {
              setStage('ALL');
            }
          }}
          uppercase={false}
        >
          {t('leftBar.filters.reset')}
        </Button>
      )}
    </>
  );
};
