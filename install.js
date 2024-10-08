import VFormDesigner from '@/components/form-designer/index.vue';
import VFormRender from '@/components/form-render/index.vue';

import Draggable from '@/../lib/vuedraggable/dist/vuedraggable.umd.js';
import { registerIcon } from '@/utils/el-icons';
import 'virtual:svg-icons-register';
import '@/iconfont/iconfont.css';
// import '@/styles/_common.less';

import ContainerWidgets from '@/components/form-designer/form-widget/container-widget/index';
import ContainerItems from '@/components/form-render/container-item/index';

import { addDirective } from '@/utils/directive';
import { loadExtension } from '@/extension/extension-loader';

// sdk import begin
import {
  addContainerWidgetSchema,
  addBasicFieldSchema,
  addAdvancedFieldSchema,
  addCustomWidgetSchema
} from '@/components/form-designer/widget-panel/widgetsConfig';
import { basicFieldsEnums } from '@/components/form-designer/widget-panel/basicFieldsEnums';
import * as PERegister from '@/components/form-designer/setting-panel/propertyRegister';
import * as PEFactory from '@/components/form-designer/setting-panel/property-editor-factory.jsx';
import { registerCWGenerator, registerFWGenerator } from '@/utils/sfc-generator';

import i18n, { addENExtensionLang, addZHExtensionLang } from '@/utils/i18n';
import containerMixin from '@/components/form-designer/form-widget/container-widget/containerMixin';
import ContainerWrapper from '@/components/form-designer/form-widget/container-widget/container-wrapper';
import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
import refMixinDesign from '@/components/form-designer/refMixinDesign';

import refMixin from '@/components/form-render/refMixin';
import ContainerItemWrapper from '@/components/form-render/container-item/container-item-wrapper';
import containerItemMixin from '@/components/form-render/container-item/containerItemMixin';

import StaticContentWrapper from '@/components/form-designer/form-widget/field-widget/static-content-wrapper';
import FormItemWrapper from '@/components/form-designer/form-widget/field-widget/form-item-wrapper';
import emitter from '@/utils/emitter';
import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';
// sdk import end
const VFormRegisterHttp = h => {
  window.$vform = {
    ...(window.$vform || {}),
    $http: h
  };
};

VFormDesigner.install = function (app) {
  console.warn('VFormDesigner.install:成功');

  // addDirective(app);
  // loadExtension(app);

  app.use(ContainerWidgets);
  app.use(ContainerItems);

  registerIcon(app);
  app.component('draggable', Draggable);
  app.component(VFormDesigner.name, VFormDesigner);
};

VFormRender.install = function (app) {
  console.warn('VFormRender.install:成功');

  // loadExtension(app);

  app.use(ContainerItems);

  registerIcon(app);
  app.component(VFormRender.name, VFormRender);
};

const components = [VFormDesigner, VFormRender];

const install = (app, h) => {
  console.warn('install:成功');
  // addDirective(app);
  // loadExtension(app);

  app.config.globalProperties.$http = h;
  VFormRegisterHttp(h);

  app.use(ContainerWidgets);
  app.use(ContainerItems);

  registerIcon(app);
  app.component('draggable', Draggable);

  components.forEach(component => {
    app.component(component.name, component);
  });
};

/**
 * 导出二开组件所需的所有对象、工具方法及组件
 */
const VFormSDK = {
  basicFieldsEnums,
  addContainerWidgetSchema,
  addBasicFieldSchema,
  addAdvancedFieldSchema,
  addCustomWidgetSchema,
  PERegister,
  PEFactory,
  registerCWGenerator,
  registerFWGenerator,
  addZHExtensionLang,
  addENExtensionLang,

  i18n,
  containerMixin,
  Draggable,
  ContainerWrapper,
  FieldComponents,
  refMixinDesign,

  ContainerItemWrapper,
  containerItemMixin,
  refMixin,

  StaticContentWrapper,
  FormItemWrapper,
  emitter,
  fieldMixin
};

export default {
  install,
  VFormDesigner,
  VFormRender,
  VFormSDK,
  VFormRegisterHttp
};
