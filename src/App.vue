<template>
  <a-config-provider :locale="elLocale" :input="{ autocomplete: 'off' }">
    <div id="app">
      <VFormDesigner
        :fieldListApi="fieldListApi"
        :designer-config="designerConfig"
        :global-dsv="globalDsv"
      />
    </div>
  </a-config-provider>
</template>

<script>
  import VFormDesigner from './components/form-designer/index.vue';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import { getHttp } from '@/utils/request/http';
  dayjs.locale('zh-cn');
  import { getLocat } from '@/utils/util';
  export default {
    name: 'App',
    components: {
      VFormDesigner
    },
    data() {
      return {
        formJson: {
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
            onFormCreated: '',
            onFormMounted: '',
            onFormDataChange: '',
            onFormValidate: ''
          }
        },
        formData: {},
        optionData: {},

        designerConfig: {
          //logoHeader: false,
        },

        //全局数据源变量
        globalDsv: {
          testApiHost: 'http://www.test.com/api'
        },

        elLocaleMap: {
          'zh-CN': { ...zhCN },
          'en-US': {}
        }
      };
    },
    computed: {
      elLocale() {
        const curLocale = localStorage.getItem('v_form_locale') || 'zh-CN';
        return this.elLocaleMap[curLocale];
      }
    },
    methods: {
      async fieldListApi() {
        const { pageCode } = getLocat();
        return await getHttp()({
          methods: 'get',
          url: '/api/tmgc2-mgt/pageFieldConfig/queryPageFieldOptions',
          params: { pageCode }
        }).then(res => res.data.list || []);
      },
      submitForm() {
        this.$refs.vFormRef
          .getFormData()
          .then(formData => {
            // Form Validation OK
            alert(JSON.stringify(formData));
          })
          .catch(error => {
            // Form Validation failed
            this.$message.error(error);
          });
      }
    }
  };
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>

<style lang="less">
  @import url('ant-design-vue/dist/antd.variable.less');
</style>
