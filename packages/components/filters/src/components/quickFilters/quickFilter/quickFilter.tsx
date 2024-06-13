import { Chip, ColorType, Icon, IconType } from '@bloobirds-it/flamingo-ui';
import { BobjectField, QuickFilter } from '@bloobirds-it/types';
import clsx from 'clsx';
import mixpanel from 'mixpanel-browser';

import styles from './quickFilter.module.css';

interface QuickFilterProps {
  quickFilter: QuickFilter;
  blackListedField?: BobjectField;
  isSelected: boolean;
  onApply: (quickFilter: QuickFilter, status: boolean) => void;
  onEditName?: (quickFilter: QuickFilter) => void;
  onDelete?: (quickFilter: QuickFilter) => void;
  onSetDefault?: (quickFilterId: string) => void;
}

const CustomQuickFilter = ({
  onApply,
  blackListedField,
  isSelected,
  quickFilter,
}: QuickFilterProps) => {
  const hasBlackListedField =
    blackListedField &&
    quickFilter?.filters?.some((filter: any) => filter?.bobjectFieldId === blackListedField?.id);

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.chip]: !isSelected,
        [styles.chipSelected]: isSelected,
      })}
    >
      <Chip
        size="small"
        selected={isSelected}
        disabled={!quickFilter?.defaultGroup && hasBlackListedField}
        onClick={status => {
          if (!hasBlackListedField) {
            mixpanel.track(`QUICKFILTER_CLICKED_${quickFilter?.id.toUpperCase()}`);
            onApply(quickFilter, status);
          }
        }}
      >
        {quickFilter?.iconName && (
          <Icon
            name={quickFilter?.iconName as IconType}
            color={isSelected ? 'white' : (quickFilter?.iconColor as ColorType)}
            size={16}
            className={styles.icon}
          />
        )}
        {quickFilter?.name}
      </Chip>
    </div>
  );
};

export default CustomQuickFilter;
