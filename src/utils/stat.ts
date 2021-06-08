export const mean = (list: number[] | Uint8Array) => {
  let total = 0;
  list.forEach((a: number) => (total += a));
  total /= list.length;
  return total;
};

export const max = (list: number[] | Uint8Array) => {
  let highest: number | null = null;
  list.forEach((a: number) => {
    if (highest === null || a > highest) highest = a;
  });
  return highest;
};
