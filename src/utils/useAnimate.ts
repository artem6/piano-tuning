import { useEffect } from 'react';

export const useAnimate = (fn: { (): unknown }) => {
  useEffect(() => {
    let breakLoop = false;
    const loop = () => {
      if (breakLoop) return;
      fn();
      requestAnimationFrame(loop);
    };
    loop();
    return () => {
      breakLoop = true;
    };
  }, [fn]);
  return;
};
