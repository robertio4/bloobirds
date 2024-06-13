import { useCallback, useEffect, useState } from 'react';
import { useEvent } from 'react-use';

import clamp from 'lodash/clamp';

interface Position {
  x: number;
  y: number;
  corrected: boolean;
  initialPadding?: number;
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

const clampPosition = (position: Position): Position => {
  return {
    x: clamp(position.x, position.initialPadding, window.innerWidth - position.initialPadding),
    y: clamp(position.y, position.initialPadding, window.innerHeight - position.initialPadding),
    corrected: position.corrected,
  };
};

function useBubbleBounds(id: string, size: Size, initialPadding: number) {
  const [bounds, setBounds] = useState<Bound>({
    left: initialPadding,
    right: window.innerWidth - size.width - initialPadding,
    top: initialPadding,
    bottom: window.innerHeight - size.height - initialPadding,
  });

  useEffect(() => {
    setBounds({
      left: initialPadding,
      right: window.innerWidth - size.width - initialPadding,
      top: initialPadding,
      bottom: window.innerHeight - size.height - initialPadding,
    });
  }, [size.width, size.height]);

  useEvent('resize', () => {
    setBounds({
      left: initialPadding,
      right: window.innerWidth - size.width - initialPadding,
      top: initialPadding,
      bottom: window.innerHeight - size.height - initialPadding,
    });
  });

  return bounds;
}

/**
 * This hook is to manage a draggable based on an ID, this is not setting anything on local storage so is only for session modals
 * @param id
 * @param size
 * @param initialPadding
 * @param location
 * @param defaultPadding
 */
export function useDraggablePosition(
  id: string,
  size: Size,
  initialPadding: number,
  location: 'bubble' | 'leftBar',
  defaultPadding?: number,
) {
  const isBubble = location === 'bubble';
  const selector = isBubble ? '#floating-menu' : '#bb-left-bar';
  const rect = document.querySelector(selector)?.getBoundingClientRect();

  const locationBubblePosition = {
    x: rect?.left > 370 ? rect?.left - 319 - defaultPadding : rect?.right - 1 + defaultPadding,
    y: rect?.top,
    corrected: true,
  };

  const locationLeftBarPosition = {
    x: rect?.right,
    y: rect?.top,
    corrected: true,
  };

  const defaultPosition = location === 'bubble' ? locationBubblePosition : locationLeftBarPosition;

  const [position, setPosition] = useState(
    defaultPosition || {
      x: window.innerWidth - size.width - initialPadding,
      y: window.innerHeight - size.height - initialPadding,
      corrected: true,
    },
  );

  const bounds = useBubbleBounds(id, size, 12);

  useEvent('resize', () => {
    const clampedPosition = clampPosition(position);
    setPosition(clampedPosition);
  });

  useEffect(() => {
    const overflowsRight = position.x + size.width > window.innerWidth + initialPadding;
    const overflowsBottom = position.y + size.height > window.innerHeight + initialPadding;
    const x = overflowsRight ? window.innerWidth - size.width - initialPadding : position.x;
    const y = overflowsBottom ? window.innerHeight - size.height - initialPadding : position.y;
    setPosition({ x, y, corrected: overflowsBottom || overflowsRight });
  }, []);

  const updatePosition = useCallback(({ x, y }: { x: number; y: number }) => {
    const position = clampPosition({ x, y, corrected: false, initialPadding });
    setPosition(position);
  }, []);

  return {
    position,
    setPosition: updatePosition,
    bounds,
  };
}
