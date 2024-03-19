import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';
import Antd from 'ant-design-vue';

import '@/styles/breakpoint.less';
import '@/styles/index.scss';
import '@/iconfont/iconfont.css';
import Draggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js';
//import Draggable from 'vuedraggable'
import { registerIcon } from '@/utils/el-icons';
import 'virtual:svg-icons-register';

import ContainerWidgets from '@/components/form-designer/form-widget/container-widget/index';
import ContainerItems from '@/components/form-render/container-item/index';
import VFormRender from '@/components/form-render/index';

import { addDirective } from '@/utils/directive';
import { loadExtension } from '@/extension/extension-loader';

if (typeof window !== 'undefined') {
  window.axios = axios;
}
console.log(`======当前后端域名-vform：${import.meta.env.VITE_APP_API_ROOT} ===========`);

const vfApp = createApp(App);
vfApp.use(Antd);
registerIcon(vfApp);
vfApp.component('draggable', Draggable);
addDirective(vfApp);

vfApp.use(ContainerWidgets);
vfApp.use(ContainerItems);
vfApp.component('VFormRender', VFormRender);
loadExtension(vfApp);

vfApp.mount('#app');
