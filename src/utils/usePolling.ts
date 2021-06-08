import { useEffect } from 'react';
import { useVisibility } from './useVisibility';

export const usePolling = (cb: () => any, interval = 1000) => {
  const visible = useVisibility();
  useEffect(() => {
    if (!visible) return;
    let timeout: number = 0;
    let active = true;
    const polling = async () => {
      clearTimeout(timeout);
      if (!active) return;
      await cb();
      timeout = window.setTimeout(polling, interval);
    };
    timeout = window.setTimeout(polling, 0);
    return function cleanup() {
      active = false;
      clearTimeout(timeout);
    };
  }, [visible, cb, interval]);
};
