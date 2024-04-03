import { getLocat, replaceVars } from '@/utils/util';
import { getHttp } from './http';

export const fmtHttpParams = async (req, data) => {
  const { http, dataHandlerCode } = req;

  const paramsMap = { ...getLocat(), ...data };

  const sendParams = JSON.stringify({
    ...http,
    params: http.method === 'get' ? { ...http.params, ...data } : { ...http.params },
    data: http.method === 'post' ? { ...http.data, ...data } : { ...http.data }
  });
  const res = replaceVars(sendParams, paramsMap);

  let dsResult = await getHttp()(JSON.parse(res));
  if (dataHandlerCode) {
    const dhFn = new Function('data', dataHandlerCode);
    dsResult = dhFn.call(this, dsResult);
  }
  return dsResult;
};
