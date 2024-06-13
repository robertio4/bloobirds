import { useCallback, useEffect, useState } from 'react';
import { useVisible } from '@bloobirds-it/flamingo-ui';

export const useContextMenu = () => {
  const [xPos, setXPos] = useState('0px');
  const [yPos, setYPos] = useState('0px');

  const { ref, visible, setVisible } = useVisible(false);

  const handleContextMenu = useCallback(
    (e, rectVirtualList) => {
      e.preventDefault();
      let x = e.pageX;
      let y = e.pageY;
      if (rectVirtualList) {
        x = e.pageX - rectVirtualList.left;
        y = 8;
      }
      setXPos(`${x}px`);
      setYPos(`${y}px`);
      setVisible(true);
    },
    [setXPos, setYPos],
  );

  const hideContextMenu = () => {
    setVisible(false);
  };

  return {
    ref,
    xPos,
    yPos,
    isContextMenuVisible: visible,
    handleContextMenu,
    hideContextMenu,
  };
};
