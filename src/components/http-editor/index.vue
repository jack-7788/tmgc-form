<template>
  <a-form-item :label="label" labelAlign="left" label-width="150px">
    <a-button type="info" shape="round" @click="addDataSource" :class="['button-text-highlight']">
      {{ buttonName || label }}
    </a-button>
  </a-form-item>
  <a-drawer
    :title="drawerTitle || i18nt('designer.setting.dataSourceSetting')"
    v-model:visible="showDataSourceDialogFlag"
    :width="520"
    :destroy-on-close="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="ds-setting-drawer header-small-mb"
  >
    <a-form
      :model="optionModel.http"
      :rules="formRules"
      ref="dsForm"
      label-width="160px"
      labelAlign="left"
      class="ds-form tpf-form"
    >
      <a-form-item :label="i18nt('designer.setting.dsRequestURL')" name="url">
        <a-input v-model:value="optionModel.http.url" />
      </a-form-item>

      <a-form-item :label="i18nt('designer.setting.dsRequestMethod')" name="method">
        <a-radio-group v-model:value="optionModel.http.method">
          <a-radio-button value="get">get</a-radio-button>
          <a-radio-button value="post">post</a-radio-button>
          <a-radio-button value="put">put</a-radio-button>
          <a-radio-button value="delete">delete</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="i18nt('designer.setting.dsRequestParams')">
        <a-row v-for="(rp, pIdx) in paramsList" class="rd-row" :gutter="8" :key="pIdx">
          <a-col :span="10">
            <a-form-item :name="'params.' + pIdx + '.name'" :label-width="0">
              <a-input
                v-model:value="rp.name"
                :placeholder="i18nt('designer.setting.dsRequestNameInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item :name="'params.' + pIdx + '.value'" :label-width="0">
              <a-input
                v-model:value="rp.value"
                :placeholder="i18nt('designer.setting.dsRequestValueInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3" :key="paramsList.length">
            <a-button type="primary" @click="deleteRequestParam(pIdx)"> 删除 </a-button>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-button type="primary" @click="addRequestParam">
              {{ i18nt('designer.setting.addRequestParam') }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="i18nt('designer.setting.dsRequestData')">
        <a-row v-for="(rd, dIdx) of dataList" class="rd-row" :gutter="8" :key="dIdx">
          <a-col :span="10">
            <a-form-item :name="'data.' + dIdx + '.name'" :label-width="0">
              <a-input
                v-model:value="rd.name"
                :placeholder="i18nt('designer.setting.dsRequestNameInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item :name="'data.' + dIdx + '.value'" :label-width="0">
              <a-input
                v-model:value="rd.value"
                :placeholder="i18nt('designer.setting.dsRequestValueInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3" :key="dataList.length">
            <a-button type="primary" @click="deleteRequestData(dIdx)"> 删除 </a-button>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-button type="primary" @click="addRequestData">
              {{ i18nt('designer.setting.addRequestData') }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="`请求前数据处理`">
        <a-button
          type="info"
          shape="round"
          @click="editReqDataHandlerCode"
          :class="[optionModel.dataReqHandlerCode ? 'button-text-highlight' : '']"
        >
          处理函数配置
        </a-button>
      </a-form-item>
      <a-form-item :label="`接口响应数据处理`">
        <a-button
          type="info"
          shape="round"
          @click="editDataHandlerCode"
          :class="[optionModel.dataHandlerCode ? 'button-text-highlight' : '']"
        >
          处理函数配置
        </a-button>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space class="dialog-footer">
        <a-button type="primary" @click="testDataSource">
          {{ i18nt('designer.setting.testDataSource') }}
        </a-button>
        <a-button @click="showDataSourceDialogFlag = false">
          {{ i18nt('designer.hint.cancel') }}
        </a-button>
        <a-button type="primary" @click="saveDataSource">
          {{ i18nt('designer.hint.confirm') }}
        </a-button>
      </a-space>
    </template>
  </a-drawer>
  <a-modal
    :title="i18nt('designer.setting.testDataSource')"
    v-model:visible="showTestDataSourceDialogFlag"
    :show-close="true"
    custom-class="drag-dialog small-padding-dialog"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="750px"
    :destroy-on-close="true"
  >
    <a-alert type="info" :closable="false" :message="'请求配置'" />
    <code-editor :mode="'json'" :readonly="false" v-model="dsvJson" class="dsv-json-editor" />
    <a-space class="footer-button">
      <a-button type="primary" @click="doDataSourceRequest">
        {{ i18nt('designer.setting.executeDataSource') }}
      </a-button>
      <a-button type="primary" plain @click="clearRequestResult">
        {{ i18nt('designer.setting.clearRequestResult') }}
      </a-button>
      <a-button @click="showTestDataSourceDialogFlag = false">
        {{ i18nt('designer.hint.closePreview') }}
      </a-button>
    </a-space>
    <a-alert type="info" :closable="false" :message="i18nt('designer.setting.dsRequestResult')" />
    <code-editor :mode="'json'" :readonly="true" v-model="dsResultJson" ref="dsResultEditor" />
  </a-modal>
  <CodeModalEditor
    v-model="optionModel.dataReqHandlerCode"
    ref="CodeReqModalEditorRef"
    :event-header="`function(data){`"
  />
  <CodeModalEditor
    v-model="optionModel.dataHandlerCode"
    ref="CodeModalEditorRef"
    :event-header="`function(data){`"
  />
</template>

<script lang="jsx">
  import i18n from '@/utils/i18n';
  import CodeEditor from '@/components/code-editor/index';
  import { isArray } from 'lodash-es';
  import { getHttp } from '@/utils/request/http';
  import CodeModalEditor from '@/components/code-editor/code-modal-editor.vue';
  import { replaceVars, getLocat } from '@/utils/util';

  export default {
    name: 'http-editor',
    inheritAttrs: false,
    mixins: [i18n],
    inject: ['getGlobalDsv'],
    components: {
      CodeEditor,
      CodeModalEditor
    },
    props: {
      optionModel: Object,
      drawerTitle: {
        type: String,
        default: ''
      },
      buttonName: {
        type: String,
        default: ''
      },
      label: {
        type: String,
        default: '编辑接口配置'
      }
    },
    data() {
      return {
        dataList: [],
        paramsList: [],
        formRules: {
          url: [
            {
              required: true,
              trigger: ['blur', 'change'],
              message: this.i18nt('designer.setting.fieldValueRequired')
            }
          ]
        },
        showDataSourceDialogFlag: false,
        dsvJson: '{\n  \n}',
        dsResultJson: '',
        showTestDataSourceDialogFlag: false
      };
    },
    methods: {
      editDataHandlerCode() {
        this.$refs.CodeModalEditorRef.open(this.optionModel.dataHandlerCode);
      },
      editReqDataHandlerCode() {
        this.$refs.CodeReqModalEditorRef.open(this.optionModel.dataReqHandlerCode);
      },
      addDataSource() {
        this.showDataSourceDialogFlag = true;
        this.dataList = Object.entries(this.optionModel.http.data).map(([name, value]) => ({
          name,
          value
        }));
        this.paramsList = Object.entries(this.optionModel.http.params).map(([name, value]) => ({
          name,
          value
        }));
      },

      saveHttpData() {
        let data = {};
        if (isArray(this.dataList) && this.dataList.length) {
          data = this.dataList.reduce((t, v) => {
            t[v.name] = v.value;
            return t;
          }, {});
        }
        this.optionModel.http.data = data;
      },
      saveHttpParams() {
        let params = {};
        if (isArray(this.paramsList) && this.paramsList.length) {
          params = this.paramsList.reduce((t, v) => {
            t[v.name] = v.value;
            return t;
          }, {});
        }
        this.optionModel.http.params = params;
      },

      saveDataSource() {
        this.saveHttpData();
        this.saveHttpParams();
        this.showDataSourceDialogFlag = false;
      },

      addRequestParam() {
        this.paramsList.push({ name: '', value: '' });
      },

      deleteRequestParam(idx) {
        this.paramsList.splice(idx, 1);
      },

      addRequestData() {
        this.dataList.push({ name: '', value: '' });
      },

      deleteRequestData(idx) {
        this.dataList.splice(idx, 1);
      },

      testDataSource() {
        this.saveHttpData();
        this.saveHttpParams();
        const sendParams = JSON.stringify(this.optionModel.http, null, '  ');
        const paramsMap = { fieldCode: this.optionModel.name, ...getLocat() };
        this.dsvJson = replaceVars(sendParams, paramsMap);
        this.dsResultJson = '';
        this.showTestDataSourceDialogFlag = true;
      },

      async doDataSourceRequest() {
        const { dataReqHandlerCode, dataHandlerCode } = this.optionModel;
        try {
          let p = JSON.parse(this.dsvJson);
          if (dataReqHandlerCode) {
            const dataReqHandlerCodeFn = new Function('data', dataReqHandlerCode);
            p = dataReqHandlerCodeFn.call(this, p);
          }
          if (!p) return;
          // console.log('请求参数 ', p);

          let dsResult = await getHttp()(p);

          if (dataHandlerCode) {
            const dhFn = new Function('data', dataHandlerCode);
            dsResult = dhFn.call(this, dsResult);
          }
          this.$refs.dsResultEditor.setValue(JSON.stringify(dsResult, null, '  '));
        } catch (error) {
          console.log('doDataSourceRequest: ', error);
          // this.$message.error(error);
        }
      },
      clearRequestResult() {
        this.$refs.dsResultEditor.setValue('');
      }
    }
  };
</script>

<style lang="scss" scoped>
  .dsv-json-editor {
    margin-bottom: 12px;
  }

  .dsv-json-editor :deep(.ace-editor) {
    border: 1px solid #e1e2e3;
    min-height: 120px;
  }

  :deep(.ace-editor) {
    border: 1px solid #e1e2e3;
  }

  .footer-button {
    float: right;
    margin-bottom: 12px;
  }

  .dialog-footer {
    margin-top: 15px;
    float: right;
  }
</style>
