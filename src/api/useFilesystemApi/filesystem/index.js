import { getHttp } from '@/utils/request/http';

import { saveAs } from 'file-saver';

export const useFilesystemApi = () => {
  const http = getHttp();

  const tmgc2Filesystem = '/api/tmgc2-filesystem/';

  /* 下载文件 */
  const downloadFileObjectApi = async params => {
    const response = await http.get(`${tmgc2Filesystem}/fileObject/downloadFileObject`, {
      params,
      responseType: 'blob'
    });

    const fileName = window.decodeURI(response.headers['filename']);
    saveAs(new Blob([response.data], { type: 'application/vnd.ms-excel;' }), fileName);
  };

  return {
    /**
     * 上传文件获取 fileCode
     */
    uploadFileObject: params => {
      return http.postForm(`${tmgc2Filesystem}/fileObject/uploadFileObject`, params, {
        timeout: 600000
      });
    },
    /**
     * 根据 fileCode下载文件
     */
    downloadFileObject: downloadFileObjectApi,

    /**
     * 下载模版
     */
    downloadTemplateObject: async params => {
      const response = await http.get(`${tmgc2Filesystem}/fileObject/downloadTemplateObject`, {
        params,
        responseType: 'blob'
      });

      const fileName = window.decodeURI(response.headers['filename']);
      saveAs(new Blob([response.data], { type: 'application/vnd.ms-excel;' }), fileName);
    },

    /**
     * 展示文件
     * @param params
     * @returns
     */
    getPreviewFileUrl: params => {
      return http.get(`${tmgc2Filesystem}/fileObject/getPreviewFileUrl`, {
        params
      });
    }
  };
};
