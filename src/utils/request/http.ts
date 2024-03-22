import { getUserInfo } from './useGetUseInfo';
import axios from 'axios';
import { message } from 'ant-design-vue';
// import NProgress from 'nprogress';
import { handleErrorStatus } from './handleAxiosError';
import type { AxiosInstance, AxiosRequestHeaders } from 'axios';
// import { useStore } from '@/store/index';
// import { storeToRefs } from 'pinia';
// import { unref } from 'vue';
import JSONBig from 'json-bigint';

const http = axios.create({
  timeout: 600000,
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  withCredentials: true,
  transformResponse: [
    function (data) {
      try {
        return JSONBig.parse(data);
      } catch (error) {
        console.log(error);
        return data;
      }
    }
  ],
  validateStatus(status) {
    return status <= 600; // 状态码在大于或等于500时才会 reject
  }
});

http.interceptors.request.use(config => {
  // const { localeStore, cancelAxiosStore } = useStore();
  // const { locale } = storeToRefs(localeStore);
  // cancelAxiosStore.removePending(config);
  // cancelAxiosStore.addPending(config);

  // if (!config.url?.includes('diyprocess=1')) {
  //     NProgress.start();
  // }

  // const { loginInfo } = storeToRefs(userStore);

  const localUserInfo = getUserInfo(); //JSON.parse(sessionStorage.getItem(USER_INFO_KEY) || '{}');
  const tokenId = localUserInfo?.loginInfo?.userToken?.tokenId;
  const tenantId = localUserInfo?.loginInfo?.userToken?.tenantId;

  config.withCredentials = true;

  if (!config.headers) {
    config.headers = {} as AxiosRequestHeaders;
  }
  config.headers['mes-user'] = '{}';
  config.headers['imeclient-type'] = 'PC';
  config.headers['imeclient-source'] = 'tmgc2';
  config.headers['imeclient-version'] = '1.0';

  config.headers['accept-language'] = 'zh-CN'; //unref(locale);

  if (tokenId) {
    config.headers['Authorization'] = 'Bearer ' + tokenId; // unref(loginInfo).tokenId;
  }

  if (tenantId) {
    config.headers['imeclient-tenant-id'] = tenantId; //unref(loginInfo).tenantId;
  }

  const getTimestamp = new Date().getTime();
  if (config.url && config.url.indexOf('?') > -1) {
    config.url = config.url + '&t=' + getTimestamp;
  } else {
    config.url = config.url + '?t=' + getTimestamp;
  }
  return config;
});

http.interceptors.response.use(
  data => {
    // const { cancelAxiosStore } = useStore();
    // cancelAxiosStore.removePending(data.config);
    // NProgress.done();
    if ([200].includes(data.status)) {
      const resData = data.data;
      if (data.config.responseType === 'blob') {
        return data;
      }

      if (resData.success === true) {
        return resData;
      }
      message.error(resData.errorMessage || '接口报错');

      return Promise.reject(data);
    } else {
      if (handleErrorStatus[Number(data.status)]) {
        handleErrorStatus[Number(data.status)](data);
      } else {
        message.error(data.statusText);
      }

      return Promise.reject(data);
    }
  },
  error => {
    // NProgress.done();
    if (error.name === 'CanceledError') {
      // 取消请求的
      return Promise.reject(error);
    }

    if (!error.response) {
      // message.error('网络异常');
      return Promise.reject(error);
    }
    console.log(error);
    // message.error(error.response.statusText);

    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export const getHttp = (): AxiosInstance => {
  return window.$vform?.$http || http;
};

export default http;