import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import clsx from 'clsx';

import styles from './customChipGroup.module.css';

const Chip = ({ value, selected, onClick, children }) => {
  const classes = clsx(styles._chip, {
    [styles._selected]: selected,
  });

  const modifiedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && 'color' in child.props && selected) {
      return React.cloneElement(child, { color: 'white' });
    }
    return child;
  });

  return (
    <div className={classes} onClick={onClick}>
      {modifiedChildren}
    </div>
  );
};

const CustomChipGroup = ({ onChange, children, value, hiddenValues }) => {
  const [selectedChips, setSelectedChips] = useState(value);
  const { t } = useTranslation();
  const handleChipClick = value => {
    if (selectedChips.length === React.Children.count(children)) {
      setSelectedChips([value]);
    } else if (selectedChips.includes(value)) {
      const newClusters = selectedChips.filter(chip => chip !== value);
      if (newClusters.length === 0) {
        setSelectedChips(Array.isArray(value) ? value : [value]);
      } else {
        setSelectedChips(newClusters);
      }
    } else {
      setSelectedChips([...selectedChips, value]);
    }
  };

  const handleAllClick = () => {
    setSelectedChips(React.Children.map(children, child => child.props.value));
  };

  useEffect(() => {
    onChange(selectedChips);
  }, [selectedChips]);

  return (
    <div className={styles._chipGroup}>
      <Chip
        value="all"
        selected={selectedChips.length === React.Children.count(children)}
        onClick={handleAllClick}
      >
        {t('common.all')}
      </Chip>
      {React.Children.map(children, child => {
        if (!hiddenValues || !hiddenValues.includes(child.props.value)) {
          return React.cloneElement(child, {
            selected:
              selectedChips.includes(child.props.value) &&
              selectedChips.length !== React.Children.count(children),
            onClick: () => handleChipClick(child.props.value),
          });
        } else {
          return null;
        }
      })}
    </div>
  );
};

export { CustomChipGroup, Chip };
