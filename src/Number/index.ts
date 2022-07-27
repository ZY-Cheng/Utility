export function isInteger(x: number): boolean {
  return x % 1 === 0;
}

export function isEvenNum(x: number): boolean {
  return x % 2 === 0;
}

export function revertInt(x: number): number {
  let rev = 0;
  let temp = x;
  while (x >= 0 ? temp > 0 : temp < 0) {
    rev = rev * 10 + (temp % 10);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    temp = Number.parseInt(temp / 10, 10);
  }

  return rev;
}
