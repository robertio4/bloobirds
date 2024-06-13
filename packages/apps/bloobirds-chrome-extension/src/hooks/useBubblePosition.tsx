import { useCallback, useEffect, useMemo, useState } from 'react';
import { useEvent } from 'react-use';

import clamp from 'lodash/clamp';
import debounce from 'lodash/debounce';

export interface Position {
  x: number;
  y: number;
  corrected?: boolean;
}

interface Bound {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface Size {
  width: number;
  height: number;
}

const defaultValue: Position = {
  x: document.documentElement.clientWidth - 96,
  y: window.innerHeight - 96,
  corrected: false,
};

const padding = 12;

export const OPEN_BUBBLE_SIZE: Size = {
  width: 319,
  height: 635,
};

const clampPosition = (position: Position): Position => {
  return {
    x: clamp(position.x, padding, document.documentElement.clientWidth - padding),
    y: clamp(position.y, padding, window.innerHeight - padding),
    corrected: true,
  };
};

const storeBubblePosition = debounce((position: Position) => {
  chrome.storage?.sync?.set({ bubblePosition: position });
}, 1000);

const getStoredBubblePosition = (): Promise<Position> => {
  return new Promise<Position>(resolve => {
    resolve(defaultValue);
  });
};

function useBubbleBounds(size: Size) {
  const [bounds, setBounds] = useState<Bound>({
    left: padding,
    right: document.documentElement.clientWidth - size.width - padding,
    top: padding,
    bottom: window.innerHeight - size.height - padding,
  });

  useEffect(() => {
    setBounds({
      left: padding,
      right: document.documentElement.clientWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding,
    });
  }, [size.width, size.height]);

  useEvent('resize', () => {
    setBounds({
      left: padding,
      right: document.documentElement.clientWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding,
    });
  });

  return bounds;
}

export function useBubblePosition() {
  const size = OPEN_BUBBLE_SIZE;
  const [position, setPosition] = useState(null);
  const [lastBubblePosition, setLastBubblePosition] = useState(null);
  const [storedPositionLoaded, setStoredPositionLoaded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const bounds = useBubbleBounds(size);

  const {
    right: overflowsRight,
    bottom: overflowsBottom,
    left: overflowsLeft,
    top: overflowsTop,
  } = useMemo(() => {
    return {
      right: position?.x + size.width + padding > document.documentElement.clientWidth,
      bottom: position?.y + size.height + padding > window.innerHeight,
      top: position?.y < padding,
      left: position?.x < padding,
    };
  }, [document.documentElement.clientWidth, window.innerHeight, position]);

  const getCorrectedPosition = () => {
    let { x, y } = position;

    if (overflowsRight) {
      x = document.documentElement.clientWidth - size.width - padding;
    }

    if (overflowsBottom) {
      const windowMenuHeightDiff = window.innerHeight - size.height - padding;
      y = windowMenuHeightDiff > 0 ? windowMenuHeightDiff : padding;
    }

    if (overflowsLeft) {
      x = padding;
    }

    if (overflowsTop) {
      y = padding;
    }

    return { x, y, corrected: true };
  };

  useEffect(() => {
    getStoredBubblePosition().then(storedPosition => {
      setPosition({ ...storedPosition, corrected: false });
      setStoredPositionLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (storedPositionLoaded) {
      setStoredPositionLoaded(false);
    }
  }, [storedPositionLoaded]);

  useEvent('resize', () => {
    const clampedPosition = clampPosition(position);
    setPosition({ ...clampedPosition, corrected: false });

    setWidth(window.innerWidth);
  });

  useEffect(() => {
    if (position) {
      let newPosition = position;
      if (!position.corrected) {
        const correctedPosition = getCorrectedPosition();
        setPosition(correctedPosition);
        newPosition = correctedPosition;
      }
      setLastBubblePosition(newPosition);
      storeBubblePosition(newPosition);
    }
  }, [position]);

  useEffect(() => {
    if (lastBubblePosition) {
      setPosition({ ...lastBubblePosition, corrected: false });
    }
  }, []);

  const updatePosition = useCallback(({ x, y }: { x: number; y: number }) => {
    const position = clampPosition({ x, y });
    setPosition(position);
  }, []);

  return {
    position,
    setPosition: updatePosition,
    bounds,
    width,
  };
}
