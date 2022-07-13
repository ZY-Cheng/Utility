type PickFnKeys<T> = {
  [K in keyof T]: T[K] extends () => void ? K : never;
}[keyof T];

type PickFn<T> = Pick<T, PickFnKeys<T>>;

type PickProp<T> = Omit<T, PickFnKeys<T>>;

type Generics<T> = Promise<T>;
type ExtractGenericsParameter<T> = {
  [K in keyof PickFn<T>]: T[K] extends (arg: Generics<infer P>) => Generics<infer U> ? (arg: P) => Generics<U> : never;
};

type Shift<T extends any[]> = T extends [infer First, ...infer Rest] ? Rest : [];

type IsUppercase<T extends string> = T extends '' ? false : Uppercase<T> extends T ? true : false;

type FirstChar<T extends string> = T extends `${infer First}${infer Rest}` ? First : never;

type LastChar<T extends string> = T extends `${infer First}${infer Rest}`
  ? Rest extends ''
    ? First
    : LastChar<Rest>
  : never;

type ToNumber<T extends string, U extends number[] = []> = `${U['length']}` extends T
  ? U['length']
  : ToNumber<T, [...U, 1]>;

type IsAny<T> = 0 extends 1 & T ? true : false;
