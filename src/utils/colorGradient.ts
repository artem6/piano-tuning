type RGB = [number, number, number];

function hex(i: number) {
  var s = '0123456789abcdef';
  if (i === 0 || isNaN(i)) return '00';
  i = Math.round(Math.min(Math.max(0, i), 255));
  return s.charAt((i - (i % 16)) / 16) + s.charAt(i % 16);
}

function convertToHex(rgb: RGB) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

function trim(s: string) {
  return s.charAt(0) === '#' ? s.substring(1, 7) : s;
}

function convertToRGB(hex: string): RGB {
  const color: RGB = [
    parseInt(trim(hex).substring(0, 2), 16),
    parseInt(trim(hex).substring(2, 4), 16),
    parseInt(trim(hex).substring(4, 6), 16),
  ];
  return color;
}

export function generateGradient(colorStart: string, colorEnd: string, colorCount: number) {
  let end = convertToRGB(colorStart);
  let start = convertToRGB(colorEnd);
  let len = colorCount;
  let alpha = 0.0;
  let saida = [];

  for (let i = 0; i < len; i++) {
    const c: RGB = [0, 0, 0];
    alpha += 1.0 / len;

    c[0] = start[0] * alpha + (1 - alpha) * end[0];
    c[1] = start[1] * alpha + (1 - alpha) * end[1];
    c[2] = start[2] * alpha + (1 - alpha) * end[2];

    saida.push(convertToHex(c));
  }

  return saida;
}
