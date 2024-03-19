import { message } from 'ant-design-vue';
import type { AxiosResponse } from 'axios';

export const handleErrorStatus = {
  401: (data: AxiosResponse) => {
    //无权限
    message.error(data.statusText);

    const returnUrl = window.location.href.toString();

    // window.location.href = `/login?returnUrl=${returnUrl}`;
  },
  403: (data: AxiosResponse) => {
    message.error(data.statusText);
  },
  404: (data: AxiosResponse) => {
    message.error(data.statusText);
  },
  418: (data: AxiosResponse) => {
    // 平台错误
    message.error(data.statusText);
  },
  429: (data: AxiosResponse) => {
    // 频率过快
    message.error(data.statusText);
  },
  500: (data: AxiosResponse) => {
    // 未定义错误
    message.error('网络繁忙');
  },
  510: (data: AxiosResponse) => {
    // 未定义错误
    message.error(data.data.errorMessage || data.statusText);
  },
  599: (data: AxiosResponse) => {
    // 未定义错误
    message.error(data.data.errorMessage);
  }
};
