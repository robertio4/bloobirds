import { useCallback, useEffect, useState } from 'react';
import { useEvent } from 'react-use';

import { useActiveUserSettings } from '@bloobirds-it/hooks';
import { appHostnames } from '@bloobirds-it/utils';
import clamp from 'lodash/clamp';
import debounce from 'lodash/debounce';

export interface Position {
  x: number;
  y: number;
  corrected: boolean;
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
  x: 96,
  y: window.innerHeight - 96,
  corrected: false,
};

const initialValue: Position = {
  x: -100,
  y: -100,
  corrected: true,
};

const padding = 12;

const closedMenuSize: Size = {
  width: 60,
  height: 60,
};

const openMenuSize: Size = {
  width: 320,
  height: 640,
};

const astrolineSize: Size = {
  width: 320,
  height: 510,
};

const clampPosition = (position: Position): Position => {
  return {
    x: clamp(position.x, padding, window.innerWidth - padding),
    y: clamp(position.y, padding, window.innerHeight - padding),
    corrected: position.corrected,
  };
};

const storeBubblePosition = debounce((position: Position) => {
  if (
    appHostnames.includes(window.location.hostname) ||
    window.location.hostname.includes('bloobirds-platform-frontend.pages.dev')
  ) {
    return localStorage.setItem('dialerPosition', JSON.stringify(position));
  } else if (chrome) {
    chrome.storage?.sync?.set({ dialerPosition: position });
  }
}, 1000);

const getStoredBubblePosition = (): Promise<Position> => {
  if (
    appHostnames.includes(window.location.hostname) ||
    window.location.hostname.includes('bloobirds-platform-frontend.pages.dev')
  ) {
    const position = JSON.parse(localStorage.getItem('dialerPosition')) || defaultValue;
    return Promise.resolve(clampPosition(position));
  }
  if (!chrome.storage) {
    return new Promise<Position>(resolve => {
      resolve(defaultValue);
    });
  }
  return new Promise<Position>(resolve => {
    chrome.storage?.sync?.get('dialerPosition', ({ bubblePosition }) => {
      const position = bubblePosition || defaultValue;
      resolve(clampPosition(position));
    });
  });
};

function useBubbleBounds(size: Size) {
  const [bounds, setBounds] = useState<Bound>({
    left: padding,
    right: window.innerWidth - size.width - padding,
    top: padding,
    bottom: window.innerHeight - size.height - padding,
  });

  useEffect(() => {
    setBounds({
      left: padding,
      right: window.innerWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding,
    });
  }, [size.width, size.height]);

  useEvent('resize', () => {
    setBounds({
      left: padding,
      right: window.innerWidth - size.width - padding,
      top: padding,
      bottom: window.innerHeight - size.height - padding,
    });
  });

  return bounds;
}

export function useDialerPosition(open: boolean) {
  const { settings } = useActiveUserSettings();
  const {
    user: { dialerType },
  } = settings;
  const size = open
    ? dialerType === 'ASTROLINE_DIALER'
      ? astrolineSize
      : openMenuSize
    : closedMenuSize;
  const [position, setPosition] = useState(initialValue);
  const [lastBubblePosition, setLastBubblePosition] = useState(initialValue);
  const [storedPositionLoaded, setStoredPositionLoaded] = useState(false);
  const bounds = useBubbleBounds(size);

  useEffect(() => {
    getStoredBubblePosition().then(storedPosition => {
      setPosition(storedPosition);
      setLastBubblePosition(storedPosition);
      setStoredPositionLoaded(true);
    });
  }, []);

  useEvent('resize', () => {
    const clampedPosition = clampPosition(position);
    setLastBubblePosition(clampedPosition);
    setPosition(clampedPosition);
  });

  useEffect(() => {
    if (!storedPositionLoaded) {
      return;
    }

    if (open) {
      const overflowsRight = position.x + size.width > window.innerWidth + padding;
      const overflowsBottom = position.y + size.height > window.innerHeight + padding;
      const x = overflowsRight ? window.innerWidth - size.width - padding : position.x;
      const y = overflowsBottom ? window.innerHeight - size.height - padding : position.y;
      setPosition({ x, y, corrected: overflowsBottom || overflowsRight });
    } else {
      setPosition(lastBubblePosition);
    }
  }, [open, storedPositionLoaded]);

  useEffect(() => {
    if (open && !position.corrected) {
      setLastBubblePosition(position);
    }
  }, [open, position]);

  useEffect(() => {
    if (!storedPositionLoaded) {
      return;
    }

    if (!open) {
      setLastBubblePosition(position);
      storeBubblePosition(position);
    }
  }, [position, open, storedPositionLoaded]);

  const updatePosition = useCallback(({ x, y }: { x: number; y: number }) => {
    const position = clampPosition({ x, y, corrected: false });
    setPosition(position);
  }, []);

  return {
    position,
    setPosition: updatePosition,
    bounds,
  };
}
