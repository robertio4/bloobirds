import { useSegmentationFilter } from '../useSegmentationFilter';
import clsx from 'clsx';
import styles from '../segmentationFilter.module.css';
import { Checkbox } from '@bloobirds-it/flamingo-ui';
import { useTranslation } from "react-i18next";

export const VisibilityFiltersGroup = () => {
  const {
    visibilityFilters,
    setVisibilityFilters,
    isSmartEmail,
    shouldShowBattlecards,
  } = useSegmentationFilter();
  const {t} = useTranslation();

  return (
    <div
      className={clsx(styles.filterGroup, {
        [styles.smartFilterGroup]: isSmartEmail,
      })}
    >
      <Checkbox
        size="small"
        color="purple"
        checked={visibilityFilters?.onlyMine}
        onClick={value =>
          setVisibilityFilters({
            ...visibilityFilters,
            onlyMine: value,
          })
        }
      >
        {t('playbook.segmentationFilter.onlyMine')}
      </Checkbox>
      <Checkbox
        size="small"
        color="purple"
        checked={visibilityFilters?.onlyPrivate}
        onClick={value =>
          setVisibilityFilters({
            ...visibilityFilters,
            onlyPrivate: value,
          })
        }
      >
        {t('playbook.segmentationFilter.onlyPrivate')}
      </Checkbox>
      <Checkbox
        size="small"
        color="purple"
        checked={visibilityFilters?.onlyOfficial}
        onClick={value =>
          setVisibilityFilters({
            ...visibilityFilters,
            onlyOfficial: value,
          })
        }
      >
        {t('playbook.segmentationFilter.onlyOfficial')}
      </Checkbox>
      {shouldShowBattlecards && (
        <Checkbox
          size="small"
          color="purple"
          checked={visibilityFilters?.onlyBattlecards}
          onClick={value =>
            setVisibilityFilters({
              ...visibilityFilters,
              onlyBattlecards: value,
            })
          }
        >
          {t('playbook.segmentationFilter.onlyBattlecards')}
        </Checkbox>
      )}
    </div>
  );
};
