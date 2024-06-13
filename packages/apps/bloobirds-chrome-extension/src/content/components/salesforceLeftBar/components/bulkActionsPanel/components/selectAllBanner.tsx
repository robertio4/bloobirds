import { Trans } from 'react-i18next';

import { Text } from '@bloobirds-it/flamingo-ui';
import { Bobject } from '@bloobirds-it/types';
import { bobjectPlurals } from '@bloobirds-it/utils';

import { useSubhomeContext } from '../../../../extensionLeftBar/components/layouts/subhomeLayout/subhomeLayout';
import styles from '../bulkActionsPanel.module.css';

export const SelectAllBanner = ({
  items,
  totalMatching,
}: {
  items: Bobject[];
  totalMatching: number;
}) => {
  const {
    selectedItems,
    setSelectedItems,
    useEveryBobject: { isActive },
    setUseEveryBobject,
    isSelectAllChecked,
    query,
  } = useSubhomeContext();
  const bobjectType = items[0]?.id?.typeName;

  const handleSelectAllBobjects = () => {
    setUseEveryBobject({
      isActive: true,
      total: totalMatching,
      query: {
        query: query,
        sort: [],
        formFields: true,
        page: 0,
        pageSize: totalMatching,
        injectReferences: true,
      },
    });
    setSelectedItems(items);
  };

  return (
    <div className={styles.message}>
      <Text size="xs" inline>
        <Trans
          i18nKey={`leftBar.bulk.selectedAllText.${bobjectPlurals[bobjectType]?.toLowerCase()}`}
          values={{ totalMatching, selected: isActive ? totalMatching : selectedItems?.length }}
        />
      </Text>{' '}
      {selectedItems?.length < totalMatching && !isActive && isSelectAllChecked && (
        <span className={styles.link} onClick={handleSelectAllBobjects}>
          <Text size="xs" inline color="bloobirds" htmlTag="span">
            {totalMatching > 1000 ? (
              <Trans i18nKey="leftBar.bulk.continueWithMaximum" />
            ) : (
              <Trans
                i18nKey={`leftBar.bulk.selectAll.${bobjectPlurals[bobjectType]?.toLowerCase()}`}
                values={{ count: totalMatching }}
              />
            )}
          </Text>
        </span>
      )}
    </div>
  );
};
