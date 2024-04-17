import { getLocat, replaceVars } from '@/utils/util';
import { getHttp } from './http';

export const fmtHttpParams = async (req, params: any = {}) => {
  const request = getHttp();

  const { data, ctx } = params;
  console.log('req: ', req);
  const { http, dataHandlerCode } = req;

  const paramsMap = { ...getLocat(), ...data, ...ctx };

  const method = http.method || 'get';

  const sendParams = JSON.stringify({
    ...http,
    method,
    params: http.method === 'get' ? { ...http.params, ...data } : { ...http.params },
    data: http.method === 'post' ? { ...http.data, ...data } : { ...http.data }
  });
  const res = replaceVars(sendParams, paramsMap).replaceAll('null', null);
  console.log('res: ', res);

  let dsResult = await request(JSON.parse(res));
  if (dataHandlerCode) {
    const dhFn = new Function('data', dataHandlerCode);
    dsResult = dhFn.call(this, dsResult);
  }
  return dsResult;
};
