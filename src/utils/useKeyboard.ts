import { useEffect } from 'react';

type KeyboardCallback = { (evt: KeyboardEvent): unknown };
interface KeyOptions {
  pressType?: ('keyup' | 'keydown' | 'keypress')[];
}

let currentKeys = {
  metaKey: false,
  altKey: false,
  shiftKey: false,
  ctrlKey: false,
};

// register global listener
let callbacks: KeyboardCallback[] = [];
const onKey = (evt: KeyboardEvent) => {
  const target = evt && (evt.target as HTMLInputElement);
  const tagName = target.tagName.toLocaleLowerCase();
  if (['input', 'textfield', 'textarea'].indexOf(tagName) > -1) return;
  currentKeys = {
    metaKey: evt.metaKey,
    altKey: evt.altKey,
    shiftKey: evt.shiftKey,
    ctrlKey: evt.ctrlKey,
  };

  callbacks.forEach(cb => cb(evt));
};
document.addEventListener('keydown', onKey, false);
document.addEventListener('keyup', onKey, false);
document.addEventListener('keypress', onKey, false);

// filter the callback
const callbackWithFilters = (
  filters: string | string[],
  cb: KeyboardCallback,
  options: KeyOptions,
): KeyboardCallback => {
  if (!filters.length) return cb;

  const pressType = options.pressType || ['keydown'];

  const filterSet = new Set(
    (typeof filters === 'string' ? [filters] : filters).map(filter => {
      const splitFilter = filter
        .toLowerCase()
        .replace('++', '+plus')
        .replace('+ +', '+plus')
        .replace(/^\+/, 'plus')
        .split('+')
        .map(s => s.trim())
        .map(s => (s === 'plus' ? '+' : s === '' ? ' ' : s));

      let meta = false;
      let alt = false;
      let shift = false;
      let ctrl = false;
      let key = splitFilter[splitFilter.length - 1];
      splitFilter.forEach(k => {
        // meta not on windows
        if (k === 'meta' || k === 'command' || k === 'cmd') meta = true;
        else if (k === 'option' || k === 'alt') alt = true;
        else if (k === 'shift') shift = true;
        else if (k === 'control' || k === 'ctrl') ctrl = true;
        else key = k;
      });
      return `${meta}+${alt}+${shift}+${ctrl}+${key}`;
    }),
  );

  return evt => {
    const key = `${evt.metaKey}+${evt.altKey}+${evt.shiftKey}+${evt.ctrlKey}+${evt.key}`.toLowerCase();
    if (filters.length && !filterSet.has(key)) return;
    if (pressType.indexOf(evt.type as any) === -1) return;
    cb(evt);
  };
};

/*
useful key modifiers
  Alt (option on mac)
  Shift
  Control
  Meta (command on mac, not on windows)

useful keys
  ArrowUp
  ArrowDown
  ArrowLeft
  ArrowRight
  Tab
  Enter
  Backspace

notes
  watch out for keys that need "Shift" to be pressed

examples
  "Shift + +"
  "Shift + ^"
  "Alt + ArrowLeft"
  "ArrowUp"
*/
export const useKeyboard = (filters: string | string[], cb: KeyboardCallback, options?: KeyOptions) => {
  useEffect(() => {
    const filteredCb = callbackWithFilters(filters, cb, { pressType: options?.pressType });
    callbacks.push(filteredCb);
    return () => {
      callbacks = callbacks.filter(c => c !== filteredCb);
    };
  }, [filters, cb, options?.pressType]);
};

export const getCurrentKeysPressed = () => currentKeys;
