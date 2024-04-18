import { getLocat, replaceVars } from '@/utils/util';
import { getHttp } from './http';

export const fmtHttpParams = async (req, params: any = {}) => {
  const request = getHttp();

  const { data, vfCtx } = params;
  console.log('req: ', req);
  const { http, dataHandlerCode, dataReqHandlerCode } = req;

  const paramsMap = { ...getLocat(), ...data, ...vfCtx };

  const method = http.method || 'get';

  const sendParams = JSON.stringify({
    ...http,
    method,
    params: http.method === 'get' ? { ...http.params, ...data } : { ...http.params },
    data: http.method === 'post' ? { ...http.data, ...data } : { ...http.data }
  });
  let p = JSON.parse(replaceVars(sendParams, paramsMap));
  if (dataReqHandlerCode) {
    const dataReqHandlerCodeFn = new Function('data', dataReqHandlerCode);
    p = dataReqHandlerCodeFn.call(this, p);
  }
  if (!p) return;
  console.log('请求参数 ', p);
  let dsResult = await request(p);
  if (dataHandlerCode) {
    const dhFn = new Function('data', dataHandlerCode);
    dsResult = dhFn.call(this, dsResult);
  }
  return dsResult;
};
