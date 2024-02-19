import { useEffect, RefObject } from 'react';

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler?: (event: Event) => void,
  isTrigger = false,
  ignoreEl?: RefObject<T>,
): void => {
  useEffect(() => {
    if (!isTrigger) return;
    const listener = (event: Event) => {
      const el = ref?.current;

      if (
        !el ||
        el.contains((event?.target as Node) || null) ||
        ignoreEl?.current?.contains(event?.target as Node)
      ) {
        return;
      }

      if (handler) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [isTrigger, ref, handler]);
};
