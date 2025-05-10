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

export const validatePassword = (password: string) => {
  if (
    password.length < 8 ||
    !/[0-9]/.test(password) ||
    !/[^A-Za-z0-9]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password)
  ) {
    return false;
  }

  return true;
};

export const validateEmail = (email: string) => {
  if (!/^.+@.+\..+$/.test(email)) {
    return false;
  }

  return true;
};
