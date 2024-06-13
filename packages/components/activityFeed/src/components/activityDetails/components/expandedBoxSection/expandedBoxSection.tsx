import React from 'react';

import styles from './expandedBoxSection.module.css';

export const ExpandedBoxSection = ({
  children,
  grid,
}: {
  children: React.ReactElement | React.ReactElement[];
  grid?: boolean;
}) => {
  const className = grid ? styles.multibox : styles.simple;
  return (
    <>
      <div className={styles.separator} />
      <div className={className}>
        {React.Children.map(children, child => {
          if (!child) return null;
          if (grid) {
            return { ...child, props: { ...child.props, isSmallBlock: true } };
          } else {
            return child;
          }
        })}
      </div>
    </>
  );
};
