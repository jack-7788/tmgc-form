<template>
  <a-config-provider :locale="elLocale" :input="{ autocomplete: 'off' }">
    <div id="app">
      <VFormDesigner
        :fieldListApi="fieldListApi"
        :designer-config="designerConfig"
        :global-dsv="globalDsv"
        ref="vfdRef"
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
  import { basicFieldsEnums } from '@/components/form-designer/widget-panel/basicFieldsEnums';
  dayjs.locale('zh-cn');
  import { getLocat } from '@/utils/util';
  const { entityCode = '', terminalType = '', formCode = '', id = '' } = getLocat();

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
            // modelName: 'formData',
            // refName: 'vForm',
            // rulesName: 'rules',
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
      getInitRenderJSON(list) {
        return list.reduce((t, v) => {
          const fn = basicFieldsEnums[v.componentType];
          if (fn) {
            const json = fn({
              name: v.entityPropertyCode,
              label: v.entityPropertyName,
              ...(v.options || {})
            });
            t = [...t, json];
          }
          return t;
        }, []);
      },
      async getComponentJson(list) {
        let json = { widgetList: {}, formConfig: {} };
        if (id && entityCode) {
          const res = await getHttp()({
            method: 'get',
            url: `/api/tmgc2-query/dataQuery/detail/${entityCode}`,
            params: { id }
          });
          json = JSON.parse(res.frontendDefinition || '{}');
        } else {
          json.widgetList = this.getInitRenderJSON(list);
        }

        this.$refs.vfdRef.setJsonImport(json);
      },
      async fieldListApi() {
        const { entityCode } = getLocat();
        if (!entityCode) return [];
        const p = {
          pageCode: 'EntityPropertyFormItem',
          conditions: [{ fieldCode: 'entityCode', type: 'EQ', value: entityCode }],
          requiredFields: [
            'entityPropertyCode',
            'entityPropertyName',
            'valueType',
            'valueTypeLength'
          ],
          page: 1,
          pageSize: null,
          sorts: []
        };
        const list = await getHttp()({
          method: 'post',
          url: '/api/tmgc2-query/dataQuery/execute',
          data: p
        }).then(res => res.data.object.list || []);
        return this.getComponentJson(list);
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
