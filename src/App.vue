<template>
  <a-config-provider :locale="elLocale" :input="{ autocomplete: 'off' }">
    <div id="app">
      <VFormDesigner
        :fieldListApi="fieldListApi"
        :saveJsonApi="saveJsonApi"
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
  import http from '@/utils/http';
  import { basicFieldsEnums } from '@/components/form-designer/widget-panel/basicFieldsEnums';
  import { getLocat } from '@/utils/util';
  import { getUuidKey } from '@/utils/util';

  const { entityCode = '', terminalType = '', formCode = '', id = '' } = getLocat();

  dayjs.locale('zh-cn');

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
            labelWidth: 80,
            labelPosition: 'left',
            size: '',
            labelAlign: 'right',
            cssCode: '',
            customClass: [],
            functions: '',
            layoutType: 'PC',
            onFormCreated: '',
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
      async saveJsonApi(json) {
        const { id } = getLocat();
        const params = {
          formCode,
          terminalType,
          entityCode,
          frontendDefinition: JSON.stringify(json)
        };

        if (id) {
          params.formId = id || null;
        }
        await http.post(`/api/tmgc2-mgt/formDefinition/save`, params);
        this.$message.success('操作成功');
      },
      insertBtn(list = []) {
        const btnId = getUuidKey();
        const btnInfo = {
          label: '提交',
          name: btnId,
          onCreated: `
            const hidden = this.getFormRef().vfCtx?.type==='view';
            this.setHidden(hidden)
            `,
          onClick: `(async()=>{
                await this.getFormRef().onFormUpdate()
                this.$message.success('保存成功')
                })()`
        };

        list.push(basicFieldsEnums.button(btnInfo));
        return list;
      },
      getInitRenderJSON(list) {
        const res = list.reduce((t, v) => {
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
        return res.length ? this.insertBtn(res) : res;
      },
      async getComponentJson(list) {
        let json = { widgetList: [], formConfig: {} };
        if (formCode && id) {
          const res = await http({
            method: 'get',
            url: `/api/tmgc2-query/dataQuery/detail/FormDefinitionManagement`,
            params: { code: formCode }
          }).then(res => res.data.object);
          console.log('res: ', res);
          json = JSON.parse(res.frontendDefinition || '{}');
        } else {
          json.widgetList = this.getInitRenderJSON(list);
        }

        this.$refs.vfdRef.setFormJson(json);
      },
      async fieldListApi() {
        const { entityCode } = getLocat();
        if (!entityCode) {
          this.getComponentJson([]);

          return [];
        }
        const p = {
          pageCode: 'EntityPropertyFormItem',
          conditions: [{ fieldCode: 'entityCode', type: 'EQ', value: entityCode }],
          requiredFields: ['entityPropertyCode', 'entityPropertyName', 'valueType'],
          page: 1,
          pageSize: null,
          sorts: []
        };
        const list = await http({
          method: 'post',
          url: '/api/tmgc2-query/dataQuery/execute',
          data: p
        }).then(res => res.data.object.list || []);
        this.getComponentJson(list);
        return list.map(item => ({
          showName: item.entityPropertyName,
          fieldCode: item.entityPropertyCode
        }));
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
