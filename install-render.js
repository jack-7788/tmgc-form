import axios from 'axios';

import VFormRender from '@/components/form-render/index.vue';
import ContainerItems from '@/components/form-render/container-item/index';

import { registerIcon } from '@/utils/el-icons';
import 'virtual:svg-icons-register';
import '@/iconfont/iconfont.css';

import { loadExtension } from '@/extension/extension-loader';
import http from '@/utils/request/http';

const VFormRegisterHttp = h => {
  window.$vform = {
    ...(window.$vform || {}),
    $http: h || http
  };
};
VFormRender.install = function (app) {
  loadExtension(app);

  app.use(ContainerItems);
  registerIcon(app);
  app.component(VFormRender.name, VFormRender);
};

const components = [VFormRender];

const install = (app, h) => {
  loadExtension(app);
  app.config.globalProperties.$http = h || http;
  VFormRegisterHttp(h || http);

  app.use(ContainerItems);
  registerIcon(app);
  components.forEach(component => {
    app.component(component.name, component);
  });

  window.axios = axios;
};

if (typeof window !== 'undefined' && window.Vue) {
  /* script方式引入时赋值axios！！ */
  //window.axios = axios
}

export default {
  install,
  VFormRender
};
