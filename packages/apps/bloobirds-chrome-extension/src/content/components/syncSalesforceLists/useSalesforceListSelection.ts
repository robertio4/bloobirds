import { useEffect, useState } from 'react';

import { useDebouncedCallback } from '@bloobirds-it/hooks';
import chillout from 'chillout';

export const useSalesforceListSelection = (): { selectedSalesforceIds: string[] } => {
  const [selectedSalesforceIds, setSelectedSalesforceIds] = useState<string[]>([]);
  const tableBody = document.querySelector('tbody');

  const deboundecSetSelectedSalesforceIds = useDebouncedCallback(
    mutationRecord => {
      chillout.forEach(mutationRecord, mutation => {
        // We need to get the record id from the row. It's inside a data-recordid attribute of the only th element inside the row
        const columns = Array.from(mutation.target.children) as Element[];
        const recordId = columns
          .find(row => row.nodeName === 'TH')
          ?.querySelector('a')
          ?.getAttribute('data-recordid');

        if (recordId && mutation.target instanceof Element) {
          const isSelected = mutation.target?.getAttribute('aria-selected') === 'true';
          const wasSelected = mutation.oldValue === 'true';

          if (isSelected && !wasSelected) {
            setSelectedSalesforceIds(prevState => [...prevState, recordId]);
          } else if (!isSelected && wasSelected) {
            setSelectedSalesforceIds(prevState => prevState.filter(id => id !== recordId));
          }
        }
      });
    },
    50,
    [],
  );

  const observer = new MutationObserver(deboundecSetSelectedSalesforceIds);

  useEffect(() => {
    if (tableBody) {
      observer.observe(tableBody, {
        attributes: true,
        attributeFilter: ['aria-selected'],
        attributeOldValue: true,
        characterData: true,
        childList: true,
        subtree: true,
      });
    }
    return () => observer.disconnect();
  }, [tableBody]);

  return {
    selectedSalesforceIds,
  };
};
