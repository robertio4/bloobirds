import { useEffect, useState } from 'react';

export const enum minSizes {
  DESKTOP_SMALL = 1024,
  DESKTOP_MEDIUM = 1280,
  DESKTOP_BIG = 1480,
  DESKTOP = 1440,
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useMediaQuery() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [isSmallDesktop, setIsSmallDesktop] = useState(
    getWindowDimensions().width < minSizes.DESKTOP_MEDIUM,
  );
  const [isMediumDesktop, setIsMediumDesktop] = useState(
    minSizes.DESKTOP_MEDIUM <= getWindowDimensions().width &&
      getWindowDimensions().width < minSizes.DESKTOP_BIG,
  );
  const [isBigDesktop, setIsBigDesktop] = useState(
    minSizes.DESKTOP_BIG <= getWindowDimensions().width &&
      getWindowDimensions().width < minSizes.DESKTOP,
  );
  const [isDesktop, setIsDesktop] = useState(getWindowDimensions().width >= minSizes.DESKTOP);

  useEffect(() => {
    function handleResize() {
      const winDim = getWindowDimensions();
      setWindowDimensions(winDim);
      setIsSmallDesktop(winDim.width < minSizes.DESKTOP_MEDIUM);
      setIsMediumDesktop(
        minSizes.DESKTOP_MEDIUM <= winDim.width && winDim.width < minSizes.DESKTOP_BIG,
      );
      setIsBigDesktop(minSizes.DESKTOP_BIG <= winDim.width && winDim.width < minSizes.DESKTOP);
      setIsDesktop(winDim.width >= minSizes.DESKTOP);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowDimensions, isSmallDesktop, isMediumDesktop, isBigDesktop, isDesktop };
}
