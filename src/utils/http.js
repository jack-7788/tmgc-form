import http, { getHttp } from './request/http';

export default getHttp() || http;
