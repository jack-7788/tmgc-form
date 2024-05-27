import { isLocal } from './request/useGetUseInfo';

export const insertCssToHead = () => {
  const head = document.getElementsByTagName('head')[0];
  const oldStyle = document.getElementById('v-css');
  if (!!oldStyle) {
    head.removeChild(oldStyle); //先清除后插入！！
  }

  let url = 'https://dev-ime-tpf-vue.imefuture.com';
  if (!isLocal()) {
    url = window.location.origin;
  }

  const newLink = document.createElement('link');
  newLink.type = 'text/css';
  newLink.rel = 'stylesheet';
  newLink.id = 'v-css';
  newLink.href = url + '/vfdocs/css/index.css';

  head.appendChild(newLink);
};

export const insertJsToHead = () => {
  const bodyEle = document.getElementsByTagName('body')[0];
  const oldScriptEle = document.getElementById('v-js');
  !!oldScriptEle && bodyEle.removeChild(oldScriptEle); //先清除后插入！！

  let url = 'https://dev-ime-tpf-vue.imefuture.com';
  if (!isLocal()) {
    url = window.location.origin;
  }

  const newScriptEle = document.createElement('script');
  newScriptEle.type = 'text/javascript';
  newScriptEle.id = 'v-js';
  newScriptEle.src = url + '/vfdocs/js/index.js';
  bodyEle.appendChild(newScriptEle);
};

export const insertAssetsToBody = () => {
  insertCssToHead();
  insertJsToHead();
};
