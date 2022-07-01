type PickFnKeys<T> = {
  [K in keyof T]: T[K] extends () => void ? K : never;
}[keyof T];

type PickFn<T> = Pick<T, PickFnKeys<T>>;

type PickProp<T> = Omit<T, PickFnKeys<T>>;

type Generics<T> = Promise<T>;
type ExtractGenericsParameter<T> = {
  [K in keyof PickFn<T>]: T[K] extends (arg: Generics<infer P>) => Generics<infer U> ? (arg: P) => Generics<U> : never;
};
