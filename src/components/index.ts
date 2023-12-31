import { useRef, useEffect } from 'react';

export { default as Button } from './button/Button';
export { default as Input } from './input/Input';

interface IUseInterval {
  (callback: () => void, interval: number): void;
}
export const useInterval: IUseInterval = (callback, interval) => {
  const savedCallback = useRef<(() => void) | null>(null);
  
  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
};