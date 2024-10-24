import { createApp } from 'vue';
import App from './App.vue';
import Antd from 'ant-design-vue';
import 'animate.css';
import '@/styles/tmgc2.less';
import { getLocat } from '@/utils/util';
import { TpfConfirm } from '@/hooks/TpfConfirm';
import { insertAssetsToBody } from '@/utils/insertAssetsToBody';
import dayjs from 'dayjs';

import http from '@/utils/request/http';

import tmgcForm from '../install';

console.log(`======当前后端域名-vform：${import.meta.env.VITE_APP_API_ROOT} ===========`);
insertAssetsToBody();
const vfApp = createApp(App);
vfApp.config.globalProperties.$getLocat = getLocat;
vfApp.config.globalProperties.$dayjs = dayjs;
vfApp.config.globalProperties.$TpfDelConfirm = TpfConfirm;

vfApp.use(Antd);
vfApp.use(tmgcForm, http);

vfApp.mount('#app');
