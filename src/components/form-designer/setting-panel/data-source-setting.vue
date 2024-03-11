<template>
  <div class="ds-list">
    <template v-if="!!formConfig.dataSources && formConfig.dataSources.length > 0">
      <a-descriptions
        v-for="(ds, dsIdx) in formConfig.dataSources"
        :column="1"
        size="small"
        border
        :key="dsIdx"
      >
        <template #title>
          <span :title="ds.description">{{ ds.uniqueName }}</span>
        </template>
        <template #extra>
          <a-button
            type="primary"
            plain
            shape="circle"
            size="small"
            @click="editDataSource(dsIdx)"
          />
          <a-button
            type="danger"
            plian
            shape="circle"
            size="small"
            @click="deleteDataSource(dsIdx)"
          />
        </template>
        <a-descriptions-item>
          <template #label>
            <div :title="ds.requestURL"> 内容的描述 图标 </div>
          </template>
          {{ ds.requestURL }}</a-descriptions-item
        >
      </a-descriptions>
    </template>
    <template v-else>
      <a-empty :description="i18nt('designer.setting.noDataSource')" />
    </template>

    <div class="ds-button-wrapper">
      <a-button type="primary" plain @click="addDataSource">
        {{ i18nt('designer.setting.addDataSource') }}</a-button
      >
      <!-- <a-button   plain :title="i18nt('designer.setting.importDataSource')"
                   @click="importDataSource"></a-button>
        <a-button   plain :title="i18nt('designer.setting.exportDataSource')"
                   @click="exportDataSource"></a-button> -->
    </div>
  </div>

  <a-drawer
    :title="i18nt('designer.setting.dataSourceSetting')"
    v-model:visible="showDataSourceDialogFlag"
    :width="820"
    :destroy-on-close="true"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    custom-class="ds-setting-drawer header-small-mb"
  >
    <a-form
      :model="dsModel"
      :rules="formRules"
      ref="dsForm"
      label-width="160px"
      labelAlign="left"
      class="ds-form"
    >
      <a-form-item :label="i18nt('designer.setting.dsUniqueName')" name="uniqueName">
        <a-input v-model:value="dsModel.uniqueName" />
      </a-form-item>
      <a-row style="width: 100%">
        <a-col :span="20">
          <a-form-item :label="i18nt('designer.setting.dsRequestURL')" name="requestURL">
            <a-input v-model:value="dsModel.requestURL" />
          </a-form-item>
        </a-col>
        <a-col :span="4">
          <a-form-item :label-width="0" name="requestURLType" class="no-left-margin">
            <a-select
              v-model:value="dsModel.requestURLType"
              :placeholder="i18nt('designer.setting.dsRequestURLType')"
            >
              <a-select-option :label="i18nt('designer.setting.dsURLStringType')" value="String">
                {{ i18nt('designer.setting.dsURLStringType') }}
              </a-select-option>
              <a-select-option
                :label="i18nt('designer.setting.dsURLVariableType')"
                value="Variable"
                >{{ i18nt('designer.setting.dsURLVariableType') }}</a-select-option
              >
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-form-item :label="i18nt('designer.setting.dsDescription')" name="description">
        <a-textarea v-model:value="dsModel.description" :rows="2" />
      </a-form-item>
      <a-form-item :label="i18nt('designer.setting.dsRequestMethod')" name="requestMethod">
        <a-radio-group v-model:value="dsModel.requestMethod">
          <a-radio-button value="get">get</a-radio-button>
          <a-radio-button value="post">post</a-radio-button>
          <a-radio-button value="put">put</a-radio-button>
          <a-radio-button value="delete">delete</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="i18nt('designer.setting.dsRequestHeaders')">
        <a-row v-for="(rh, hIdx) in dsModel.headers" class="rh-row" :gutter="8" :key="hIdx">
          <a-col :span="8">
            <a-form-item :name="'headers.' + hIdx + '.name'" :rules="nameRules" :label-width="0">
              <a-input
                v-model:value="rh.name"
                :placeholder="i18nt('designer.setting.dsRequestNameInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item :name="'headers.' + hIdx + '.type'" :label-width="0">
              <a-select
                v-model:value="rh.type"
                :placeholder="i18nt('designer.setting.dsRequestTypeInputPlaceholder')"
              >
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueStringType')"
                  value="String"
                >
                  {{ i18nt('designer.setting.dsRequestValueStringType') }}
                </a-select-option>
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueNumberType')"
                  value="Number"
                >
                  {{ i18nt('designer.setting.dsRequestValueNumberType') }}
                </a-select-option>
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueBooleanType')"
                  value="Boolean"
                >
                  {{ i18nt('designer.setting.dsRequestValueBooleanType') }}
                </a-select-option>
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueVariableType')"
                  value="Variable"
                >
                  {{ i18nt('designer.setting.dsRequestValueVariableType') }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :name="'headers.' + hIdx + '.value'" :rules="valueRules" :label-width="0">
              <a-input
                v-model:value="rh.value"
                :placeholder="i18nt('designer.setting.dsRequestValueInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-button type="primary" plain shape="circle" @click="deleteRequestHeader(hIdx)"
              >--</a-button
            >
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-button type="primary" @click="addRequestHeader">
              ++ {{ i18nt('designer.setting.addRequestHeader') }}</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="i18nt('designer.setting.dsRequestParams')">
        <a-row v-for="(rp, pIdx) in dsModel.params" class="rd-row" :gutter="8" :key="pIdx">
          <a-col :span="8">
            <a-form-item :name="'params.' + pIdx + '.name'" :rules="nameRules" :label-width="0">
              <a-input
                v-model:value="rp.name"
                :placeholder="i18nt('designer.setting.dsRequestNameInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item :name="'params.' + pIdx + '.type'" :label-width="0">
              <a-select
                v-model:value="rp.type"
                :placeholder="i18nt('designer.setting.dsRequestTypeInputPlaceholder')"
              >
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueStringType')"
                  value="String"
                >
                  {{ i18nt('designer.setting.dsRequestValueStringType') }}
                </a-select-option>
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueNumberType')"
                  value="Number"
                >
                  {{ i18nt('designer.setting.dsRequestValueNumberType') }}
                </a-select-option>
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueBooleanType')"
                  value="Boolean"
                >
                  {{ i18nt('designer.setting.dsRequestValueBooleanType') }}
                </a-select-option>
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueVariableType')"
                  value="Variable"
                >
                  {{ i18nt('designer.setting.dsRequestValueVariableType') }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :name="'params.' + pIdx + '.value'" :rules="valueRules" :label-width="0">
              <a-input
                v-model:value="rp.value"
                :placeholder="i18nt('designer.setting.dsRequestValueInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-button type="primary" plain shape="circle" @click="deleteRequestParam(pIdx)"
              >--</a-button
            >
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-button type="primary" @click="addRequestParam">
              ++ {{ i18nt('designer.setting.addRequestParam') }}</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item :label="i18nt('designer.setting.dsRequestData')">
        <a-row v-for="(rd, dIdx) in dsModel.data" class="rd-row" :gutter="8" :key="dIdx">
          <a-col :span="8">
            <a-form-item :name="'data.' + dIdx + '.name'" :rules="nameRules" :label-width="0">
              <a-input
                v-model:value="rd.name"
                :placeholder="i18nt('designer.setting.dsRequestNameInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="5">
            <a-form-item :name="'data.' + dIdx + '.type'" :label-width="0">
              <a-select
                v-model:value="rd.type"
                :placeholder="i18nt('designer.setting.dsRequestTypeInputPlaceholder')"
              >
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueStringType')"
                  value="String"
                />
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueNumberType')"
                  value="Number"
                />
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueBooleanType')"
                  value="Boolean"
                />
                <a-select-option
                  :label="i18nt('designer.setting.dsRequestValueVariableType')"
                  value="Variable"
                />
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item :name="'data.' + dIdx + '.value'" :rules="valueRules" :label-width="0">
              <a-input
                v-model:value="rd.value"
                :placeholder="i18nt('designer.setting.dsRequestValueInputPlaceholder')"
              />
            </a-form-item>
          </a-col>
          <a-col :span="3">
            <a-button type="primary" plain shape="circle" @click="deleteRequestData(dIdx)">
              --
            </a-button>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="6">
            <a-button type="primary" @click="addRequestData">
              ++ {{ i18nt('designer.setting.addRequestData') }}</a-button
            >
          </a-col>
        </a-row>
      </a-form-item>

      <a-tabs v-model:activeKey="activeNames" type="border-card">
        <a-tab-pane key="1" :tab="i18nt('designer.setting.dsConfigHandlerTitle')">
          <a-alert type="info" :closable="false" message="(config, isSandbox, DSV, VFR) => {" />
          <code-editor
            :mode="'javascript'"
            :readonly="false"
            v-model="dsModel.configHandlerCode"
            ref="chEditor"
          />
          <a-alert type="info" :closable="false" message="}" />
        </a-tab-pane>

        <a-tab-pane key="2" :tab="i18nt('designer.setting.dsDataHandlerTitle')">
          <a-alert type="info" :closable="false" message="(result, isSandbox, DSV, VFR) => {" />
          <code-editor
            :mode="'javascript'"
            :readonly="false"
            v-model="dsModel.dataHandlerCode"
            ref="dhEditor"
          />
          <a-alert type="info" :closable="false" message="}" />
        </a-tab-pane>

        <a-tab-pane key="3" :tab="i18nt('designer.setting.dsErrorHandlerTitle')">
          <a-alert
            type="info"
            :closable="false"
            message="(error, isSandbox, DSV, $message, VFR) => {"
          />
          <code-editor
            :mode="'javascript'"
            :readonly="false"
            v-model="dsModel.errorHandlerCode"
            ref="ehEditor"
          />
          <a-alert type="info" :closable="false" message="}" />
        </a-tab-pane>

        <a-tab-pane key="4" :tab="i18nt('designer.setting.dataSetSettingTitle')">
          <a-form-item :label="i18nt('designer.setting.dataSetEnabled')">
            <a-switch v-model:checked="dsModel.dataSetEnabled" />
          </a-form-item>
          <a-form-item
            :label="i18nt('designer.setting.dataSetSetting')"
            v-if="dsModel.dataSetEnabled"
            class="display-block"
          >
            <a-row v-for="(dSet, dIdx) in dsModel.dataSets" class="rd-row" :gutter="8" :key="dIdx">
              <a-col :span="7">
                <a-form-item
                  :name="'dataSets.' + dIdx + '.name'"
                  :rules="nameRules"
                  label-width="0"
                >
                  <a-input
                    v-model:value="dSet.name"
                    :placeholder="i18nt('designer.setting.dsRequestNameInputPlaceholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item :name="'dataSets.' + dIdx + '.remark'" label-width="0">
                  <a-input
                    v-model:value="dSet.remark"
                    :placeholder="i18nt('designer.setting.dataSetRemarkInputPlaceholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="3">
                <a-button plain shape="circle" @click="deleteDataSet(dIdx)">--</a-button>
              </a-col>
            </a-row>
            <a-row class="rd-row" :gutter="8">
              <a-col :span="6">
                <a-button type="text" @click="addDataSet">
                  ++ {{ i18nt('designer.setting.addDataSet') }}</a-button
                >
              </a-col>
            </a-row>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>
    </a-form>
    <template #footer>
      <div class="dialog-footer">
        <a-button style="float: left" type="primary" plain @click="testDataSource">
          {{ i18nt('designer.setting.testDataSource') }}</a-button
        >
        <a-button @click="showDataSourceDialogFlag = false">
          {{ i18nt('designer.hint.cancel') }}</a-button
        >
        <a-button type="primary" @click="saveDataSource">
          {{ i18nt('designer.hint.confirm') }}</a-button
        >
      </div>
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
    :destroy-on-close="true"
  >
    <a-alert type="info" :closable="false" :message="i18nt('designer.setting.dsvTitle')" />
    <code-editor :mode="'json'" :readonly="false" v-model="dsvJson" class="dsv-json-editor" />
    <div class="footer-button">
      <a-button type="primary" @click="doDataSourceRequest">{{
        i18nt('designer.setting.executeDataSource')
      }}</a-button>
      <a-button type="primary" plain @click="clearRequestResult">{{
        i18nt('designer.setting.clearRequestResult')
      }}</a-button>
      <a-button @click="showTestDataSourceDialogFlag = false">
        {{ i18nt('designer.hint.closePreview') }}</a-button
      >
    </div>
    <a-alert type="info" :closable="false" :message="i18nt('designer.setting.dsRequestResult')" />
    <code-editor :mode="'json'" :readonly="true" v-model="dsResultJson" ref="dsResultEditor" />
  </a-modal>

  <a-modal
    :title="i18nt('designer.setting.importDataSource')"
    v-model:visible="showImportDSDialogFlag"
    :show-close="true"
    custom-class="drag-dialog small-padding-dialog"
    center
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <a-alert
      type="info"
      :message="i18nt('designer.hint.importDSHint')"
      show-icon
      class="alert-padding"
    />
    <code-editor :mode="'json'" :readonly="false" v-model="importDSTemplate" />
    <a-switch
      v-model:checked="clearOldDSFlag"
      style="margin-top: 10px"
      :active-text="i18nt('designer.setting.clearExistingDataSource')"
      :inactive-text="i18nt('designer.setting.remainExistingDataSource')"
    />
    <template v-slot:footer>
      <div class="dialog-footer-center">
        <a-button type="primary" @click="doImportDataSource">
          {{ i18nt('designer.hint.import') }}</a-button
        >
        <a-button @click="showImportDSDialogFlag = false">
          {{ i18nt('designer.hint.cancel') }}</a-button
        >
      </div>
    </template>
  </a-modal>

  <a-modal
    :title="i18nt('designer.setting.exportDataSource')"
    v-model:visible="showExportDSDialogFlag"
    :show-close="true"
    custom-class="drag-dialog small-padding-dialog"
    center
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <a-tabs
      type="border-card"
      class="no-box-shadow no-padding"
      v-model:activeKey="activeExportTab"
      @tab-click="handleExportTabClick"
    >
      <a-tab-pane :tab="i18nt('designer.setting.selectDataSourceForExport')" key="setting">
        <div v-if="exportDSArray && exportDSArray.length > 0" class="export-ds-list">
          <a-descriptions
            v-for="(ds, dsIdx) in exportDSArray"
            :key="dsIdx"
            :column="1"
            size="small"
            border
          >
            <template #title>
              <span :title="ds.description">{{ ds.uniqueName }}</span>
            </template>
            <template #extra>
              <a-checkbox v-model:checked="ds.checked" @change="handleExportDSChange">{{
                i18nt('designer.setting.dataSourceChecked')
              }}</a-checkbox>
            </template>
            <a-descriptions-item>
              <template #label>
                <div :title="ds.requestURL"> icon </div>
              </template>
              {{ ds.requestURL }}
            </a-descriptions-item>
          </a-descriptions>
        </div>
        <template v-else>
          <a-empty :description="i18nt('designer.setting.noDataSource')" />
        </template>
      </a-tab-pane>
      <a-tab-pane :tab="i18nt('designer.setting.previewDataSourceExportResult')" key="result">
        <code-editor
          :mode="'json'"
          :readonly="true"
          v-model="dsExportContent"
          ref="exportDSEditor"
        />
      </a-tab-pane>
    </a-tabs>
    <template #footer>
      <div class="dialog-footer-center">
        <a-button
          type="primary"
          class="copy-json-btn"
          :data-clipboard-text="dsRawExportContent"
          @click="copyDataSourceJson"
        >
          {{ i18nt('designer.hint.copyJson') }}</a-button
        >
        <a-button type="" @click="showExportDSDialogFlag = false">
          {{ i18nt('designer.hint.closePreview') }}</a-button
        >
      </div>
    </template>
  </a-modal>
</template>

<script>
  import i18n from '@/utils/i18n';
  import CodeEditor from '@/components/code-editor/index';
  import { copyToClipboard, deepClone, generateId, runDataSourceRequest } from '@/utils/util';
  // import { Platform } from '@element-plus/icons-vue';

  export default {
    name: 'data-source-setting',
    mixins: [i18n],
    inject: ['getGlobalDsv'],
    components: {
      CodeEditor
    },
    props: {
      designer: Object,
      formConfig: Object
    },
    data() {
      return {
        //activeNames: ['2'],
        activeNames: '2',

        dsModel: {
          dataSourceId: null,
          uniqueName: '',
          requestURL: '',
          requestURLType: 'String',
          description: '',
          headers: [],
          params: [],
          data: [],
          requestMethod: 'get',
          configHandlerCode: '  return config',
          dataHandlerCode: '  return result.data.data;',
          errorHandlerCode: '  $message.error(error.message);',
          dataSetEnabled: false, // 是否开启多数据集
          dataSets: []
        },
        curEditDSIdx: -1,

        formRules: {
          uniqueName: [
            {
              required: true,
              trigger: ['blur', 'change'],
              message: this.i18nt('designer.setting.fieldValueRequired')
            }
          ],
          requestURL: [
            {
              required: true,
              trigger: ['blur', 'change'],
              message: this.i18nt('designer.setting.fieldValueRequired')
            }
          ],
          requestMethod: [
            {
              required: true,
              trigger: ['blur', 'change'],
              message: this.i18nt('designer.setting.fieldValueRequired')
            }
          ]
        },
        nameRules: [
          {
            required: true,
            trigger: ['blur', 'change'],
            message: this.i18nt('designer.setting.fieldValueRequired')
          }
        ],
        valueRules: [
          {
            required: true,
            trigger: ['blur', 'change'],
            message: this.i18nt('designer.setting.fieldValueRequired')
          },
          { validator: this.validateValueInput, trigger: ['blur', 'change'] }
        ],

        showDataSourceDialogFlag: false,

        dsvJson: '{\n  \n}',
        dsResultJson: '',
        showTestDataSourceDialogFlag: false,

        showImportDSDialogFlag: false,
        importDSTemplate: '',
        clearOldDSFlag: false, //导入后是否清空原有数据源

        showExportDSDialogFlag: false,
        activeExportTab: 'setting',
        exportDSArray: [],
        dsExportContent: '',
        dsRawExportContent: ''
      };
    },
    methods: {
      validateValueInput(rule, value, callback) {
        const ruleField = rule.field;
        const fieldType = ruleField.substring(0, ruleField.indexOf('.'));
        const fieldIdx = Number(
          ruleField.substring(ruleField.indexOf('.') + 1, ruleField.lastIndexOf('.'))
        );
        const valueType = this.dsModel[fieldType][fieldIdx].type;
        if (valueType === 'Number') {
          if (isNaN(value)) {
            callback(new Error(this.i18nt('designer.setting.dsRequestNumberTypeError')));
          } else {
            callback();
          }
        } else if (valueType === 'Boolean') {
          if (
            value.toLowerCase() === 'true' ||
            value.toLowerCase() === 'false' ||
            value.toLowerCase() === 'null' ||
            value === '1' ||
            value === '0'
          ) {
            callback();
          } else {
            callback(new Error(this.i18nt('designer.setting.dsRequestBooleanTypeError')));
          }
        } else {
          callback();
        }
      },

      addDataSource() {
        this.curEditDSIdx = -1;
        this.dsModel = new Object({});
        this.dsModel.dataSourceId = null;
        this.dsModel.uniqueName = '';
        this.dsModel.requestURL = '';
        this.dsModel.requestURLType = 'String';
        this.dsModel.requestMethod = 'get';
        this.dsModel.description = '';
        this.dsModel.headers = [];
        this.dsModel.params = [];
        this.dsModel.data = [];
        this.dsModel.configHandlerCode = '  return config';
        this.dsModel.dataHandlerCode = '  return result.data.data;';
        this.dsModel.errorHandlerCode = '  $message.error(error.message);';
        this.dsModel.dataSetEnabled = false;
        this.dsModel.dataSets = [];

        this.showDataSourceDialogFlag = true;
      },

      editDataSource(dsIdx) {
        this.dsModel = deepClone(this.formConfig.dataSources[dsIdx]);
        if (!this.dsModel.hasOwnProperty('dataSets')) {
          //补齐dataSets属性
          this.dsModel.dataSets = [];
        }
        this.curEditDSIdx = dsIdx;
        this.showDataSourceDialogFlag = true;
      },

      saveDataSource() {
        this.$refs['dsForm'].validate((valid, fields) => {
          if (!valid) {
            this.$message.error(this.i18nt('designer.setting.dsValidationError'));
            return;
          }

          this.dsModel.dataSourceId = this.dsModel.dataSourceId || 'ds' + generateId();
          const curDSId = this.dsModel.dataSourceId;
          const curDSName = this.dsModel.uniqueName;
          let sameNameFlag = false;
          this.formConfig.dataSources.map(dsItem => {
            // 检查名称重复
            if (dsItem.uniqueName === curDSName && dsItem.dataSourceId !== curDSId) {
              sameNameFlag = true;
            }
          });
          if (sameNameFlag) {
            this.$message.error(this.i18nt('designer.setting.dsDuplicatedNameError'));
            return;
          }

          if (this.curEditDSIdx >= 0) {
            this.formConfig.dataSources.splice(this.curEditDSIdx, 1, this.dsModel);
            this.showDataSourceDialogFlag = false;
          } else {
            this.formConfig.dataSources.push(this.dsModel);
            this.showDataSourceDialogFlag = false;
          }

          //TODO: 触发表单历史变动
        });
      },

      deleteDataSource(dsIdx) {
        this.$confirm(
          this.i18nt('designer.setting.deleteDataSourceHint'),
          this.i18nt('render.hint.prompt'),
          {
            confirmButtonText: this.i18nt('render.hint.confirm'),
            cancelButtonText: this.i18nt('render.hint.cancel')
          }
        )
          .then(() => {
            this.formConfig.dataSources.splice(dsIdx, 1);
          })
          .catch(error => {
            //this.$message.error(error)
          });
      },

      addRequestHeader() {
        this.dsModel.headers.push({
          name: '',
          type: 'String',
          value: ''
        });
      },

      deleteRequestHeader(idx) {
        this.dsModel.headers.splice(idx, 1);
      },

      addRequestParam() {
        this.dsModel.params.push({
          name: '',
          type: 'String',
          value: ''
        });
      },

      deleteRequestParam(idx) {
        this.dsModel.params.splice(idx, 1);
      },

      addRequestData() {
        this.dsModel.data.push({
          name: '',
          type: 'String',
          value: ''
        });
      },

      deleteRequestData(idx) {
        this.dsModel.data.splice(idx, 1);
      },

      testDataSource() {
        const globalDsv = this.getGlobalDsv() || {};
        this.dsvJson = JSON.stringify(globalDsv, null, '  ');
        this.showTestDataSourceDialogFlag = true;
      },

      async doDataSourceRequest() {
        const dsvObj = JSON.parse(this.dsvJson);
        const dsResult = await runDataSourceRequest(
          this.dsModel,
          dsvObj,
          null,
          true,
          this.$message
        );
        this.$refs.dsResultEditor.setValue(JSON.stringify(dsResult, null, '  '));
      },

      clearRequestResult() {
        this.$refs.dsResultEditor.setValue('');
      },

      addDataSet() {
        this.dsModel.dataSets.push({
          name: '',
          remark: ''
        });
      },

      deleteDataSet(idx) {
        this.dsModel.dataSets.splice(idx, 1);
      },

      importDataSource() {
        this.importDSTemplate = '';
        this.showImportDSDialogFlag = true;
      },

      doImportDataSource() {
        try {
          const importDSArray = JSON.parse(this.importDSTemplate);
          if (!!this.clearOldDSFlag) {
            this.formConfig.dataSources.splice(0, this.formConfig.dataSources.length);
          }
          this.formConfig.dataSources = this.formConfig.dataSources.concat(importDSArray);
          this.$message.success(this.i18nt('designer.hint.importJsonSuccess'));
          this.designer.emitHistoryChange();
          this.showImportDSDialogFlag = false;
        } catch (ex) {
          this.$message.error(ex.message);
        }
      },

      exportDataSource() {
        this.dsExportContent = '';
        this.dsRawExportContent = '';
        this.exportDSArray.splice(0, this.exportDSArray.length);
        if (!!this.formConfig.dataSources && this.formConfig.dataSources.length > 0) {
          this.formConfig.dataSources.forEach(ds => {
            const newDS = deepClone(ds);
            newDS.checked = false;
            this.exportDSArray.push(newDS);
          });
        }

        this.showExportDSDialogFlag = true;
      },

      copyDataSourceJson(e) {
        copyToClipboard(
          this.dsRawExportContent,
          e,
          this.$message,
          this.i18nt('designer.hint.copyJsonSuccess'),
          this.i18nt('designer.hint.copyJsonFail')
        );
      },

      handleExportDSChange(val) {
        const selectedDSArray = [];
        this.exportDSArray.forEach(ds => {
          if (!!ds.checked) {
            const selectedDs = deepClone(ds);
            delete selectedDs['checked'];
            selectedDSArray.push(selectedDs);
          }
        });

        this.dsExportContent = JSON.stringify(selectedDSArray, null, '  ');
        this.dsRawExportContent = JSON.stringify(selectedDSArray);
      },

      handleExportTabClick() {
        this.$nextTick(() => {
          this.$refs.exportDSEditor.setValue(this.dsExportContent);
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  /*:deep(.ds-setting-drawer) { !* 必须加上:deep，否则不生效 *!*/
  /*  right: 320px !important;*/
  /*}*/

  .ds-list {
    :deep(.el-descriptions__content) {
      width: 284px;
      overflow-x: hidden;
      margin-bottom: 15px;
      padding: 8px;
      background: #f5f7fa;
    }

    :deep(.el-descriptions__title) {
      font-weight: normal;
    }

    :deep(.el-descriptions__label) {
      width: 36px;
    }
  }

  .ds-button-wrapper {
    text-align: center;
    margin-top: 12px;
  }

  .ds-form {
    :deep(.el-form-item.is-required > .el-form-item__label:before) {
      content: '' !important;
      margin-right: 0 !important;
    }

    :deep(.el-form-item.is-required > .el-form-item__label:after) {
      content: '*' !important;
      color: var(--el-color-danger);
      font-weight: bold;
    }
  }

  .no-left-margin :deep(.el-form-item__content) {
    margin-left: 0 !important;
  }

  .rh-row,
  .rd-row {
    :deep(.el-col) {
      margin: 5px 0;
    }
  }

  .ch-collapse :deep(.ace-editor) {
    border: 1px solid #e1e2e3;
    min-height: 120px;
  }

  .dh-collapse :deep(.ace-editor) {
    border: 1px solid #e1e2e3;
    min-height: 220px;
  }

  .eh-collapse :deep(.ace-editor) {
    border: 1px solid #e1e2e3;
    min-height: 120px;
  }

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

  .display-block :deep(.el-form-item__content) {
    display: block !important;
  }

  .dialog-footer {
    margin-top: 15px;
  }

  .dialog-footer-center {
    margin-top: 15px;
    text-align: center;
  }

  .export-ds-list {
    :deep(.el-descriptions__content) {
      overflow-x: hidden;
      margin-bottom: 15px;
      padding: 8px;
      background: #f5f7fa;
    }

    :deep(.el-descriptions__title) {
      font-weight: normal;
    }

    :deep(.el-descriptions__label) {
      width: 36px !important;
    }
  }
</style>
