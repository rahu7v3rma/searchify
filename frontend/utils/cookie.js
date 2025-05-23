export function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}

export function getCookie(name) {
  return (
    document.cookie
      .split(";")
      .find((c) => c.trim().startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
}

export function removeCookie(name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
