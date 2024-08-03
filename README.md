# Variant Form 3 For Vue 3.x

#### 一款高效的 Vue 3 低代码表单，可视化设计，一键生成源码，享受更多摸鱼时间。

![image](https://ks3-cn-beijing.ksyuncs.com/vform-static/img/vform_demo.gif)

<br/>

### 立即体验

[在线 Demo](https://variant-form-antd.vercel.app/)

### 安装依赖

```
npm install --registry=https://registry.npm.taobao.org
```

### 开发调试

```
npm run serve
```

### 生产打包

```
npm run build
```

### 表单设计器 + 表单渲染器打包

```
npm run lib
```

### 表单渲染器打包

```
npm run lib-render
```

### 浏览器兼容性

`Chrome（及同内核的浏览器如QQ浏览器、360浏览器等等），Firefox，Safari`

 <br/>

### 跟 Vue 3.x 项目集成

 <br/>

#### 1. 安装包

```bash
npm i tmgc-form
```

或

```bash
yarn add tmgc-form
```

 <br/>

#### 2. 引入并全局注册 tmgc-form 组件

```
import { createApp } from 'vue'
import App from './App.vue'

import Antd from 'ant-design-vue';

import tmgcForm from 'tmgc-form'; //引入VForm 3库
import 'tmgc-form/designer.style.css'; //引入tmgcForm样式

const app = createApp(App)
// 注册全局的请求工具
app.config.globalProperties.$http = http;
app.use(Antd)  //全局注册Antd
app.use(TmgcForm, http);//传入http工具
 //全局注册VForm 3(同时注册了v-form-designer和v-form-render组件)

app.mount('#app')
```

 <br/>

#### 3. 在 Vue 3.x 模板中使用表单设计器组件

```bash
<template>
  <v-form-designer ref="vfdRef"></v-form-designer>
</template>

<script setup>
  const vfdRef = ref(null)
</script>

<style lang="scss">
body {
  margin: 0;  /* 如果页面出现垂直滚动条，则加入此行CSS以消除之 */
}
</style>
```

 <br/>

#### 4. 在 Vue 3.x 模板中使用表单渲染器组件

```html
<template>
  <div>
    <v-form-render
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      ref="vFormRef"
    >
    </v-form-render>
    <a-button type="primary" @click="submitForm">Submit</a-button>
  </div>
</template>
<script setup>
  import { ref, reactive } from 'vue';

  const formJson = reactive({
    widgetList: [],
    formConfig: {
      modelName: 'formData',
      refName: 'vForm',
      rulesName: 'rules',
      labelWidth: 80,
      labelPosition: 'left',
      size: '',
      labelAlign: 'right',
      cssCode: '',
      customClass: [],
      functions: '',
      layoutType: 'PC',
      jsonVersion: 3,
      onFormCreated: '',
      onFormMounted: '',
      onFormDataChange: ''
    }
  });
  const formData = reactive({});
  const optionData = reactive({});
  const vFormRef = ref(null);

  const submitForm = () => {
    vFormRef.value
      .getFormData()
      .then(formData => {
        // Form Validation OK
        alert(JSON.stringify(formData));
      })
      .catch(error => {
        // Form Validation failed
      });
  };
</script>
```

 <br/>
