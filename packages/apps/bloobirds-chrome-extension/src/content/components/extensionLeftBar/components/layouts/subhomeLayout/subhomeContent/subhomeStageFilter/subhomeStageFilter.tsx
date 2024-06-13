import { useTranslation } from 'react-i18next';

import { useFilters } from '@bloobirds-it/filters';
import { Item, Select } from '@bloobirds-it/flamingo-ui';

import { Stages } from '../../../../views/view.utils';
import { useSubhomeContext } from '../../subhomeLayout';

/**
 * This component is done as the Filter does not allow to filter by related bobjects.
 * Also this is done because teh stage filters is touching the query via SubhomeContext and not using the FiltersProvider.
 * @constructor
 */
export const SubhomeStageFilter = () => {
  const { stage, setStage } = useSubhomeContext();
  const { setHaveFiltersBeenChanged } = useFilters();
  const { t } = useTranslation();

  const updateStage = (stage: Stages) => {
    setHaveFiltersBeenChanged(true);
    setStage(stage);
  };

  return (
    <Select
      size="small"
      onChange={updateStage}
      value={stage}
      borderless={false}
      placeholder={t('leftBar.filters.stages')}
      variant="filters"
    >
      <Item value="ALL" key="home-left-stage-all">
        {t('common.all')}
      </Item>
      <Item value="PROSPECT" key="home-left-stage-prospecting">
        {t('common.prospecting')}
      </Item>
      <Item value="SALES" key="home-left-stage-sales">
        {t('common.sales')}
      </Item>
    </Select>
  );
};
