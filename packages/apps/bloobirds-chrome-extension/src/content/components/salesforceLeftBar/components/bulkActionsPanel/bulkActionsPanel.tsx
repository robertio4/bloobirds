import { Bobject, SalesforceTabs } from '@bloobirds-it/types';

import { useSubhomeContext } from '../../../extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout';
import styles from './bulkActionsPanel.module.css';
import BulkActionButtons from './components/bulkActionButtons';
import { SelectAllBanner } from './components/selectAllBanner';
import SelectAllButton from './components/selectAllButton';
import TotalResultsBanner from './components/totalResultsBanner';
import { availableActionType } from './typings/bulkActionsPanel.typings';

type BulkActionsPanelProps = {
  tab: SalesforceTabs;
  items: Bobject[];
  totalMatching: number;
  availableActions: availableActionType[];
};

const BulkActionsPanel = ({
  tab,
  items,
  totalMatching,
  availableActions,
}: BulkActionsPanelProps) => {
  const { selectedItems } = useSubhomeContext();
  const hasItemsSelected = selectedItems?.length > 0;

  return (
    <div>
      <div className={styles.actionsRow}>
        <div className={styles.leftSide}>
          {totalMatching > 0 && <SelectAllButton items={items} totalMatching={totalMatching} />}
          {hasItemsSelected && <BulkActionButtons tab={tab} availableActions={availableActions} />}
        </div>
        <div className={styles.rightSide}>
          <TotalResultsBanner totalMatching={totalMatching} />
        </div>
      </div>
      {hasItemsSelected && <SelectAllBanner items={items} totalMatching={totalMatching} />}
    </div>
  );
};

export default BulkActionsPanel;
