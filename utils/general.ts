export const debounceAsync = <
  T extends (...args: Parameters<T>[]) => ReturnType<T>
>(
  fn: T,
  delay: number
): T => {
  let timeout: NodeJS.Timeout;

  const returnFunction = (...args: Parameters<T>) => {
    clearTimeout(timeout);
    return new Promise((resolve) => {
      timeout = setTimeout(() => {
        resolve(fn(...args));
      }, delay);
    }) as ReturnType<T>;
  };

  return returnFunction as T;
};
