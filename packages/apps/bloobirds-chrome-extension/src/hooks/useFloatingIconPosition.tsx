import { useCallback, useEffect, useState } from 'react';
import { useEvent } from 'react-use';

import clamp from 'lodash/clamp';
import debounce from 'lodash/debounce';

import { useExtensionContext } from '../content/components/context';
import { getStyle } from '../content/components/extensionLeftBar/extensionLeftBar.utils';

interface Bound {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface Position {
  x: number;
  y: number;
  corrected?: boolean;
}

interface Size {
  width: number;
  height: number;
}

const BUBBLE_ICON_SIZE: Size = {
  width: 56,
  height: 40,
};

const LIMIT = 50;

const getBounds = (): Bound => ({
  left: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  right: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  top: 0,
  bottom: window.innerHeight - BUBBLE_ICON_SIZE.height,
});

const defaultValue: Position = {
  x: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  y: window.innerHeight / 2 - BUBBLE_ICON_SIZE.height / 2,
};

const clampPosition = (position: Position): Position => ({
  x: document.documentElement.clientWidth - BUBBLE_ICON_SIZE.width,
  y: clamp(position.y, LIMIT, window.innerHeight - BUBBLE_ICON_SIZE.height - LIMIT),
});

const storeBubblePosition = debounce((position: Position) => {
  return localStorage.setItem('bubbleIconPosition', JSON.stringify(position));
});

const getStoredBubblePosition = (): Position => {
  return clampPosition(JSON.parse(localStorage.getItem('bubbleIconPosition')) || defaultValue);
};

export const useFloatingIconPosition = () => {
  const { useGetCurrentPage } = useExtensionContext();
  const currentPage = useGetCurrentPage();

  const [position, setPosition] = useState(getStoredBubblePosition());
  const [dimensions, setDimensions] = useState(getStyle(currentPage));
  const [bounds, setBounds] = useState<Bound>(getBounds());

  const updatePosition = useCallback(({ x, y }: { x: number; y: number }) => {
    const position = clampPosition({ x, y });
    setPosition(position);
  }, []);

  useEvent('resize', () => {
    setBounds(getBounds());

    const clampedPosition = clampPosition(position);
    setPosition({ ...clampedPosition });
    storeBubblePosition({ ...clampedPosition });

    setDimensions(getStyle(currentPage));
  });

  useEffect(() => {
    setBounds(getBounds());

    const storedPosition = getStoredBubblePosition();
    updatePosition({ ...storedPosition });

    setTimeout(() => {
      const storedPosition = getStoredBubblePosition();
      updatePosition({ ...storedPosition });
    }, 1000);
  }, [currentPage]);

  useEffect(() => {
    if (position) {
      storeBubblePosition(position);
    }
  }, [position]);

  return {
    bounds,
    dimensions,
    position,
    setPosition: updatePosition,
  };
};
