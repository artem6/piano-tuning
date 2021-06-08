import { useEffect, useState } from 'react';

export const useVisibility = () => {
  const [visible, setVisible] = useState(!document.hidden);

  useEffect(() => {
    const listener = () => {
      if (visible === document.hidden) setVisible(!document.hidden);
    };
    window.addEventListener('visibilitychange', listener);
    return () => window.removeEventListener('visibilitychange', listener);
  }, [visible]);

  return visible;
};
