// random between 0 and max - 1
export const randomInt = (max: number) => Math.floor(Math.random() * max);

export const selectOneRandomly = <T>(list: T[]) => list[randomInt(list.length)];

export const randomizeList = <T>(list: T[]) => {
  list = [...list];
  for (let i = 0; i < list.length; i++) {
    const j = randomInt(list.length - i) + i;
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }
  return list;
};
