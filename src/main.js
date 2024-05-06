import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'animate.css';
import '@/styles/tmgc2.less';

import http from '@/utils/request/http';

import tmgcForm from '../install';

console.log(`======当前后端域名-vform：${import.meta.env.VITE_APP_API_ROOT} ===========`);

const vfApp = createApp(App);
vfApp.use(Antd);
vfApp.use(tmgcForm, http);

vfApp.mount('#app');
