export function isInteger(x: number): boolean {
  return x % 1 === 0;
}

export function isEvenNum(x: number): boolean {
  return x % 2 === 0;
}

export function revert(x: number): number {
  let rev = 0;
  let temp = x;
  while (temp > 0) {
    rev = rev * 10 + (temp % 10);
    temp = Math.floor(temp / 10);
  }

  return rev;
}
