import React from 'react';

export const TourSteps = ({ children, position, setPosition }) => {
  return React.Children.map(children, (child, index) => {
    if (position === index) {
      return React.cloneElement(child, {
        position: index,
        isLast: index === length - 1,
        onClick: () => setPosition(index),
      });
    } else {
      return null;
    }
  });
};
