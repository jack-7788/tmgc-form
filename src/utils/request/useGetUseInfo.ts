export const USER_INFO_KEY = 'USER__INFO__';

export const getUserInfo = () => {
  const userInfo = JSON.parse(localStorage.getItem(USER_INFO_KEY) || '{}');
  return userInfo;
};

/**
 * 判断是否为开发环境
 * @returns
 */
export const isDev = () => {
  if (!location.origin.includes('dev')) {
    return import.meta.env.VITE_NODE_ENV === 'development';
  }
  return true;
};

/**
 * 判断是否为生产环境
 * @returns
 */
export const isProd = () => {
  if (['beta', 'dev'].some(item => location.origin.includes(item))) {
    return false;
  }

  return !isLocal();
};
/**
 * 判断是否为Beta环境
 * @returns
 */
export const isBeta = () => {
  if (!location.origin.includes('beta')) {
    const VITE_APP_API_ROOT = (import.meta.env.VITE_APP_API_ROOT || '') as string;
    return VITE_APP_API_ROOT.includes('beta');
  }
  return true;
};

/**
 * 判断是否为本地环境
 * @returns
 */
export const isLocal = () => {
  return import.meta.env.VITE_NODE_ENV === 'development';
};
