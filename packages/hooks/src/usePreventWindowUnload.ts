import { useEffect } from 'react';

export const usePreventWindowUnload = (preventUnload: boolean): void => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      return true;
    };

    if (preventUnload) {
      window.onbeforeunload = handleBeforeUnload;
    } else {
      window.onbeforeunload = null;
    }

    return () => {
      // Limpiar el event listener al desmontar el componente
      window.onbeforeunload = null;
    };
  }, [preventUnload]);
};
