/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiResponse } from 'next';
import { isUndefined, noop } from 'lodash';
import type {
  ITokenData,
  ITokenDataType,
  IJwtValues,
  ILoginData,
  IPostTypes,
  ILoginAdminData,
} from './@types';
import {
  getCookie,
  removeCookie,
  setCookie,
  getLocalStorageItem,
} from './utils';
import { API_URL } from '@/constants';
const jwt = require('jsonwebtoken');

// TODO: fix any types everywhere in this file
const parseAtobNode = (data: string): any =>
  JSON.parse(Buffer.from(data, 'base64').toString('binary'));
export const parseAtob = (data: string): any => JSON.parse(atob(data));

const REFRESH_TOKEN_KEY: string = 'REFRESH_TOKEN_KEY';
const ACCESS_TOKEN_KEY: string = 'ACCESS_TOKEN_KEY';

function _debounce(func: any, wait: number): () => void {
  let timeout: any;
  return function innerDebounce(this: any, ...args: any[]) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// TODO rewrite this returned type data
async function post(url: string, data: IPostTypes): Promise<any> {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

const isBrowser = (): boolean => typeof window !== 'undefined';

interface DecodedJwt {
  header: any;
  payload: any;
  signature: string;
}

export function decodeJwt(jwtToken: string): DecodedJwt | null {
  const parts = jwtToken.split('.');
  if (parts.length !== 3) {
    console.error('Invalid JWT format');
    return null;
  }

  try {
    const decodedHeader = JSON.parse(atob(parts[0]));
    const decodedPayload = JSON.parse(atob(parts[1]));

    return {
      header: decodedHeader,
      payload: decodedPayload,
      signature: parts[2],
    };
  } catch (error) {
    console.error('Error decoding JWT:');
    return null;
  }
}

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AuthService {
  static USER_ROLE: string = 'user';

  static ADMIN_ROLE: string = 'admin';

  static REFRESH_TOKEN_KEY: string = REFRESH_TOKEN_KEY;

  static ACCESS_TOKEN_KEY: string = ACCESS_TOKEN_KEY;

  static AUTH_KEY_LIST: string[] = [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY];

  static isAdmin(): boolean {
    const { role } = this.getTokenData() as ITokenDataType;
    return role === this.ADMIN_ROLE;
  }

  static isUser(): boolean {
    const { role } = this.getTokenData() as ITokenDataType;
    return role === this.USER_ROLE;
  }

  static redirectToLogin(): void {
    this.redirect(process.env.LOGIN_URL);
  }

  static async login({
    isAdmin = true,
    firstName,
    lastName,
    middleName,
    phone,
    message,
    onSuccess = noop,
    onFailed = noop,
    userName,
    password,
  }: ILoginData): Promise<IJwtValues | undefined> {
    const reqUrl = `${API_URL}/auth/Account/${isAdmin ? 'signinadmin' : 'signinuser'}`;
    const response = await post(reqUrl, { userName, password });
    const data = await response.json();
    if (data.access) {
      this.setAuthData(data);
    }
    if (response.ok) {
      delete data.access;
      delete data.refresh;
      onSuccess(data);
      return data;
    }
    onFailed(data.detail);
    return data;
  }

  static async registerUser({
    firstName,
    lastName,
    middleName,
    phone,
    message,
    onSuccess = noop,
    onFailed = noop,
  }: ILoginData): Promise<IJwtValues | undefined> {
    const response = await post(`${process.env.API_URL}/User/registeruser`, {
      firstName,
      middleName,
      lastName,
      phone,
      message,
    });
    const data = await response.json();
    if (data.access) {
      this.setAuthData(data);
    }
    if (response.ok) {
      onSuccess(data);
      return data;
    }
    onFailed(data.detail);
    return data;
  }

  static async loginAdmin({
    email,
    password,
    onSuccess = noop,
    onFailed = noop,
  }: ILoginAdminData): Promise<IJwtValues | undefined> {
    if (isUndefined(email) || isUndefined(password)) return;
    const response = await post(`${process.env.NEXT_PUBLIC_API_URL}/admin/`, {
      email,
      password,
    });
    const data = await response.json();
    if (data.access) {
      this.setAuthData(data);
    }
    if (response.ok) {
      onSuccess(data);
      return data;
    }
    onFailed(data.detail);
    return data;
  }

  static logout(): void {
    this.resetAuthData();
    this.redirectToLogin();
  }

  static _parseTokenData(accessToken: string | undefined): any | null {
    let tokenData: any = {};
    if (!accessToken) return tokenData;
    try {
      const [, payload] = accessToken.split('.');
      tokenData = process.browser ? parseAtob(payload) : parseAtobNode(payload);
    } catch (error) {
      this.redirectToLogin();
    }
    return tokenData;
  }

  static getTokenData(): ITokenData {
    const availableToken: string =
      this.getAccessToken() || this.getRefreshToken();
    return this._parseTokenData(availableToken);
  }

  static async refreshTokens(): Promise<void> {
    try {
      const isRefreshTokenValid: boolean =
        !!this.getRefreshToken() && this.getRefreshToken() !== 'undefined';
      if (isRefreshTokenValid) {
        const response = await fetch(
          `${process.env.API_URL}/auth/Account/refresh`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: this.getRefreshToken(),
            },
          }
        );
        const data = await response.json();
        this.setAuthData(data);
      } else {
        throw new Error('Refresh token is not valid');
      }
    } catch (error) {
      console.log('refresh token error', error);
      this.resetAuthData();
    }
  }

  static hasRefreshToken(): boolean {
    return !!getCookie(REFRESH_TOKEN_KEY);
  }

  static hasAccessToken(): boolean {
    return !!getCookie(ACCESS_TOKEN_KEY);
  }

  static setRefreshToken(token: string, exp: string): void {
    setCookie(REFRESH_TOKEN_KEY, token, Number(exp));
  }

  static setAccessToken(token: string, exp: string): void {
    setCookie(ACCESS_TOKEN_KEY, token, Number(exp));
  }

  static removeRefreshToken(): void {
    removeCookie(REFRESH_TOKEN_KEY);
  }

  static removeAccessToken(): void {
    removeCookie(ACCESS_TOKEN_KEY);
  }

  static getRefreshToken(): string {
    let token: string = getCookie(REFRESH_TOKEN_KEY) ?? '';
    if (token === '') token = getLocalStorageItem('refresh') ?? '';
    return token;
  }

  static getAccessToken(): string {
    const token: string = getCookie(ACCESS_TOKEN_KEY) ?? '';
    return token;
  }

  static getAuthTokens(): Record<string, string> {
    return this.AUTH_KEY_LIST.reduce(
      (acc: Record<string, string>, field: string) => ({
        ...acc,
        [field]: getCookie(field) ?? '',
      }),
      {}
    );
  }

  static getSSOAuthToken = (): string =>
    window.btoa(
      JSON.stringify(
        AuthService.AUTH_KEY_LIST.reduce(
          (data, key) => ({ ...data, [key]: getCookie(key) }),
          {}
        )
      )
    );

  static getBearer(): string {
    return `Bearer ${this.getAccessToken()}`;
  }

  static resetAuthData(): void {
    this.setRefreshToken('', '');
    this.setAccessToken('', '');
  }

  static removeAuthTokens(): void {
    this.removeAccessToken();
    this.removeRefreshToken();
  }

  static setAuthData({
    access: accessToken = '',
    refresh: refreshToken = '',
  }: IJwtValues): void {
    const { exp } = this._parseTokenData(accessToken);
    const { exp: expRefresh } = this._parseTokenData(refreshToken);
    this.setRefreshToken(refreshToken, expRefresh);
    this.setAccessToken(accessToken, exp);
  }

  static redirect(url: string = '/', res: NextApiResponse | null = null): void {
    const resObj = res;
    if (resObj && !process.browser && resObj.writeHead) {
      resObj.writeHead(302, { Location: url });
      resObj.end();
    }
    if (isBrowser()) {
      window.location.replace(url);
    }
  }

  static debounceRefreshTokens(): void {
    _debounce(async () => {
      await this.refreshTokens();
    }, 1000);
  }
}

AuthService.debounceRefreshTokens();
