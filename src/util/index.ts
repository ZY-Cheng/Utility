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

  function shouldInvoke(now: number) {
    if (maxWait) {
      return now - preInvokeTimestamp >= maxWait;
    }

    return false;
  }

  function invokeFn(now: number, ...args: Parameters<T>) {
    preInvokeTimestamp = now;
    result = fn.apply(this, args) as ReturnType<T>;
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
