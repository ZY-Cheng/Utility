type UnknownFn = (...args: unknown[]) => unknown;

type DebounceOption = {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
};
export function debounce<T extends UnknownFn>(fn: T, delay: number, options?: DebounceOption) {
  const leading = options?.leading ?? false;
  const trailing = options?.trailing ?? true;
  const maxWait = options?.maxWait;
  let timer: number | undefined;
  let result: ReturnType<T>;
  let preInvokeTimestamp: number;
  let ctx: any;

  function shouldInvoke(now: number) {
    if (maxWait) {
      return now - preInvokeTimestamp >= maxWait;
    }

    return false;
  }

  function invokeFn(now: number, ...args: Parameters<T>) {
    preInvokeTimestamp = now;
    result = fn.apply(ctx, args) as ReturnType<T>;
  }

  function leadInvoke(now: number, ...args: Parameters<T>) {
    if (!preInvokeTimestamp) {
      invokeFn(now, ...args);
    }
  }

  function trailInvoke(now: number, ...args: Parameters<T>) {
    if (now - preInvokeTimestamp >= delay) {
      invokeFn(now, ...args);
    }
  }

  function debounced(...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    ctx = this;
    const now = Date.now();
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }

    if (shouldInvoke(now)) {
      invokeFn(now, ...args);
    } else if (leading) leadInvoke(now, ...args);
    if (trailing) {
      const timerId = (setTimeout(() => {
        if (timerId !== timer) return;
        trailInvoke(Date.now(), ...args);
      }, delay) as unknown) as number;
      timer = timerId;
    }

    if (!leading && !preInvokeTimestamp) {
      // set fake timestamp for the second loop
      preInvokeTimestamp = now;
    }

    return result;
  }

  return debounced;
}

export function throttle<T extends UnknownFn>(fn: T, delay: number, options?: Omit<DebounceOption, 'maxWait'>) {
  return debounce(fn, delay, { ...options, maxWait: delay });
}

export function countDown(
  cb: (info: { rest: number; readonly isEnd: boolean }) => void,
  remaining: number,
  period = 300
) {
  let now = Date.now();
  let timer: number | undefined;
  const info = {
    rest: remaining,
    get isEnd() {
      return info.rest <= 0;
    },
  };

  cb(info);
  if (info.isEnd && timer) {
    clearTimeout(timer);
    return;
  }

  timer = (setTimeout(() => {
    const newNow = Date.now();
    const duration = newNow - now;
    now = newNow;
    info.rest -= duration;
    countDown(cb, info.rest, period);
  }, period) as unknown) as number;
}

export function curry(fn: UnknownFn) {
  return function curried(...args: unknown[]) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return function (...args1: unknown[]) {
      return curried(...[...args, ...args1]);
    };
  };
}
