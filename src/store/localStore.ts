import { message } from 'antd';
import { AppDefaults } from 'config/global-enums';

const REFRESH_TOKEN_KEY = 'refreshToken';
const ACCESS_TOKEN_KEY = 'accessToken';
const ACCESS_TOKEN_KEY_EXPIRATION = 'accessTokenExpiration';
const REFRESH_TOKEN_KEY_EXPIRATION = 'refreshTokenExpiration';

export const setLocalStorage = (name: string, value: any) => {
  try {
    localStorage.setItem(name, value);
  } catch (e: any) {
    message.error('Unable to set value in local storage: ', e);
  }
};

export const getLocalStorage = (name: string) => {
  try {
    return localStorage.getItem(name);
  } catch (e: any) {
    message.error('Unable to get value from local storage: ', e);
  }
};

export const removeLocalStorage = (name: string) => {
  try {
    localStorage.removeItem(name);
  } catch (e: any) {
    message.error('Unable to remove value from local storage: ', e);
  }
};

// Hard reset for newer versions
export const clearCacheAndHardReload = () => {
  const verVal = getLocalStorage('lastVersion');
  if (!verVal || verVal !== AppDefaults.APP_VERSION + AppDefaults.APP_BUILD) {
    setLocalStorage(
      'lastVersion',
      AppDefaults.APP_VERSION + AppDefaults.APP_BUILD,
    );
    if (caches) {
      caches.keys().then(names => names.forEach(name => caches.delete(name)));
    }
    window.location.reload();
  }
};

export const setAccessToken = (token: string) =>
  setLocalStorage(ACCESS_TOKEN_KEY, token);

export const getAccessToken = () => getLocalStorage(ACCESS_TOKEN_KEY);

export const setAccessTokenExpiration = (timestamp: string) =>
  setLocalStorage(ACCESS_TOKEN_KEY_EXPIRATION, timestamp);

export const getAccessTokenExpiration = () =>
  getLocalStorage(ACCESS_TOKEN_KEY_EXPIRATION);

export const setRefreshToken = (token: string) =>
  setLocalStorage(REFRESH_TOKEN_KEY, token);

export const getRefreshToken = () => getLocalStorage(REFRESH_TOKEN_KEY);

export const setRefreshTokenExpiration = (timestamp: string) =>
  setLocalStorage(REFRESH_TOKEN_KEY_EXPIRATION, timestamp);

export const getRefreshTokenExpiration = () =>
  getLocalStorage(REFRESH_TOKEN_KEY_EXPIRATION);

export const logoutClearLocal = () => {
  removeLocalStorage(REFRESH_TOKEN_KEY);
  removeLocalStorage(REFRESH_TOKEN_KEY_EXPIRATION);
  removeLocalStorage(ACCESS_TOKEN_KEY);
  removeLocalStorage(ACCESS_TOKEN_KEY_EXPIRATION);
};
