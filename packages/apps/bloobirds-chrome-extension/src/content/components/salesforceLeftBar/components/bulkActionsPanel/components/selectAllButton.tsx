import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Checkbox, Text } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';

import { useSubhomeContext } from '../../../../extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout';
import styles from '../bulkActionsPanel.module.css';

const SelectAllButton = ({ items, totalMatching }: { items: Bobject[]; totalMatching: number }) => {
  const {
    isSelectAllChecked,
    toggleSelectAll,
    selectedItems,
    setSelectedItems,
    setSelectAllChecked,
    setUseEveryBobject,
    useEveryBobject: { isActive },
  } = useSubhomeContext();
  const { t } = useTranslation();

  useEffect(() => {
    if (
      ((selectedItems.length === items.length || selectedItems.length === totalMatching) &&
        selectedItems.length > 0) ||
      isActive
    ) {
      setSelectAllChecked(true);
    } else {
      setSelectAllChecked(false);
    }
  }, [selectedItems, isActive]);

  const handleSelectAll = () => {
    if (isSelectAllChecked) {
      setSelectedItems([]);
      toggleSelectAll(!isSelectAllChecked);
    } else {
      setSelectedItems(items);
      toggleSelectAll(!isSelectAllChecked);
    }
    setUseEveryBobject({ isActive: false });
  };

  return (
    <div className={styles.selectAllWrapper}>
      <Checkbox size="small" onClick={handleSelectAll} checked={isSelectAllChecked}>
        <Text size="xs">{t('leftBar.bulk.selectAll.general')}</Text>
      </Checkbox>
    </div>
  );
};

export default SelectAllButton;
