import React from 'react';

import { KEYS, PianoKey } from '../utils/keys';
import styles from './piano.module.css';

const COLORS = {
  EBONY: 'ebony',
  IVORY: 'ivory',
};
const SHIFTS = {
  LEFT: 'LEFT',
  MIDDLE: 'MIDDLE',
  RIGHT: 'RIGHT',
};

function getKeyDeets(keyPos: number) {
  const key = keyPos % 12;
  let shift;
  let color;

  if (key === 2 || key === 7) {
    shift = SHIFTS.RIGHT;
    color = COLORS.EBONY;
  } else if (key === 5 || key === 10) {
    shift = SHIFTS.LEFT;
    color = COLORS.EBONY;
  } else if (key === 0) {
    shift = SHIFTS.MIDDLE;
    color = COLORS.EBONY;
  } else {
    shift = null;
    color = COLORS.IVORY;
  }
  return { shift, color };
}

interface props {
  notes?: PianoKey[];
  onClick?: { (key: number): unknown };
  keyStyles?: { [key: number]: any };
}

export const Piano: React.FC<props> = props => {
  let left = 30;
  const whiteKeys: any[] = [];
  const blackKeys: any[] = [];
  const keyNumbers: any[] = [];

  const notes = props.notes || [];

  KEYS.forEach(key => {
    const keyDeets = getKeyDeets(key.pos);
    let x = left;
    let height = 125;
    let width = 22;

    if (keyDeets.color === COLORS.EBONY) {
      height -= 45;
      width = 11;

      if (keyDeets.shift === SHIFTS.LEFT) {
        x = left - 7;
      } else if (keyDeets.shift === SHIFTS.MIDDLE) {
        x = left - 5;
      } else if (keyDeets.shift === SHIFTS.RIGHT) {
        x = left - 3;
      } else {
        console.warn('SHIFT was not set');
      }
    } else {
      left += 22;
      keyNumbers.push(
        <text key={key.pos + 'number'} x={x + width / 2} y={10} textAnchor='middle'>
          {key.pos}
        </text>,
      );
      keyNumbers.push(
        <text style={{ pointerEvents: 'none' }} key={key.pos + 'key'} x={x + width / 2} y={120} textAnchor='middle'>
          {key.key}
        </text>,
      );
    }

    const isPressed = !!notes.find(n => n.pos === key.pos);

    const keyRect = (
      <rect
        key={key.pos}
        rx={2}
        x={x}
        y={14}
        width={width}
        height={height}
        onClick={() => props.onClick?.(key.pos - 1)}
        style={props.keyStyles?.[key.pos]}
        className={[
          styles.key,
          keyDeets.color === COLORS.EBONY ? styles.ebony : styles.ivory,
          isPressed ? styles.lit : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
    );

    if (keyDeets.color === COLORS.EBONY) {
      blackKeys.push(keyRect);
    } else {
      whiteKeys.push(keyRect);
    }
  });
  return (
    <svg data-ref='piano' width='1200' height='200'>
      {whiteKeys}
      {keyNumbers}
      {blackKeys}
    </svg>
  );
};
