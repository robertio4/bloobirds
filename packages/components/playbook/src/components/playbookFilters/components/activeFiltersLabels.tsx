import { useEffect, useState } from 'react';

import { IconButton, Label, Text } from '@bloobirds-it/flamingo-ui';

import styles from '../segmentationFilter.module.css';
import { useSegmentationFilter } from '../useSegmentationFilter';

const ActiveFilterLabel = ({ removeLabel, selectedValue: { id, name } }) => (
  <div className={styles.filterLabel}>
    <Label key={id} value={id} color="verySoftPurple" uppercase={false} size="small">
      <Text color="purple" size="xs" weight="medium" className={styles.filterLabelText}>
        {name}
      </Text>
      <IconButton color="peanut" name="cross" onClick={removeLabel} />
    </Label>
  </div>
);

export const ActiveFiltersLabelBlock = ({ segmentationField, sectionValues, selectedValues }) => {
  const [showMore, setShowMore] = useState(false);
  const [elementHeight, setElementHeight] = useState<number>();
  const { removeLabelValue } = useSegmentationFilter();
  const getElementHeight = () =>
    document.getElementById(`filterBlockWapper${segmentationField.id}`)?.offsetHeight;
  useEffect(() => {
    setElementHeight(getElementHeight());
  }, [selectedValues.length]);

  return (
    <>
      <div
        className={styles.activeFilterLabelWrapperMask}
        style={{ maxHeight: !showMore && '112px' }}
      >
        <div
          className={styles.activeFilterLabelWrapper}
          id={`filterBlockWapper${segmentationField.id}`}
        >
          {selectedValues?.map(selectedValue => {
            const { id, name } = sectionValues.find(value => value.id === selectedValue) || {};
            return (
              <ActiveFilterLabel
                key={id}
                selectedValue={{ id, name }}
                removeLabel={() => removeLabelValue(id, segmentationField)}
              />
            );
          })}
        </div>
      </div>
      {!showMore && elementHeight > 112 && (
        <IconButton
          name="more"
          color="purple"
          onClick={() => {
            setShowMore(!showMore);
          }}
        />
      )}
    </>
  );
};
