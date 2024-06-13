import { useEffect, useState } from 'react';

export const useHasBeenVisible = (visible: boolean) => {
  const [hasBeenVisible, setHasBeenVisible] = useState<boolean>(false);
  useEffect(() => {
    if (!hasBeenVisible && visible) {
      setHasBeenVisible(true);
    }
  }, [visible, hasBeenVisible]);

  return hasBeenVisible;
};
