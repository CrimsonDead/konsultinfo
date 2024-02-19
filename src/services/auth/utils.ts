/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function getCookie(name: string): string | undefined {
  if (!process.browser) return undefined;
  const matches = document.cookie.match(
    new RegExp(
      `(?:^|; )${name.replace(/([.$?*|{}()\[\]\\\/+^])/g, '\\$1')}=([^;]*)`
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getLocalStorageItem(name: string): string | undefined {
  if (!process.browser) return undefined;
  const data = localStorage.getItem(name) ?? undefined;
  return data;
}

export function setCookie(name: string, value: string, expires: number): void {
  let expiryValue = null;
  if (expires) {
    const offset = new Date().getTimezoneOffset();
    expiryValue = new Date((expires + offset * 60) * 1000);
  }
  if (typeof document !== 'undefined') {
    const isFirefox = navigator.userAgent.toLowerCase().includes('firefox');
    if (isFirefox && expires) expiryValue = new Date(expires * 1000);
    const domain = document.location.hostname;

    const options = {
      path: '/',
      domain: domain.includes(process.env.MAIN_DOMAIN as string)
        ? process.env.MAIN_DOMAIN
        : domain,
      expires: expiryValue,
    };

    let updatedCookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    // TODO: fix for loop to go over object values
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const optionKey in options) {
      updatedCookie += `; ${optionKey}`;
      const optionValue = options[optionKey as keyof typeof options];
      if (!optionValue) {
        updatedCookie += `=${optionValue}`;
      }
    }
    document.cookie = updatedCookie;
  }
}

export function removeCookie(name: string): void {
  const domain = document.location.hostname;
  const removedCookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${
    domain.includes(process.env.MAIN_DOMAIN as string)
      ? process.env.MAIN_DOMAIN
      : domain
  }`;
  document.cookie = removedCookie;
}

export const parseAtobs = (payload: string) => {
  const parseAtobNode = (data: string) =>
    JSON.parse(Buffer.from(data, 'base64').toString('binary'));
  const parseAtob = (data: string) => JSON.parse(atob(data));
  return process.browser ? parseAtob(payload) : parseAtobNode(payload);
};

// TODO: rewrite this any types to the real one
export const parseCookie = (str: any) =>
  str
    .split(';')
    .map((v: any) => v.split('='))
    .reduce((acc: any, v: any) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

export const switchDomain = (
  onSuccess: (value: string) => void,
  path: string,
  domain: string
) => {
  const isDev = process.env.IS_DEV;
  const url = new URL(window.location.href);
  url.pathname = path;
  if (isDev) {
    console.log({ url: url.href });
    onSuccess(url.href);
    return;
  }
  url.host = domain;
  url.pathname = path;
  url.protocol = 'https:';
  onSuccess(url.href);
};
