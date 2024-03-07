<template>
  <div>
    <a-form :model="formConfig" labelAlign="left" label-width="120px"
             class="setting-form" @submit.prevent>
      <a-collapse v-model:activeKey="formActiveCollapseNames" class="setting-collapse">
        <a-collapse-panel key="1" :header="i18nt('designer.setting.basicSetting')">
          <a-form-item :label="i18nt('designer.setting.formSize')">
            <a-select v-model:value="formConfig.size">
              <a-select-option v-for="item in formSizes" :key="item.value" :label="item.label"
                         :value="item.value"> {{ item.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item :label="i18nt('designer.setting.labelPosition')">
            <a-radio-group v-model:value="formConfig.labelPosition" class="radio-group-custom">
              <a-radio-button value="horizontal">水平</a-radio-button>
              <a-radio-button value="vertical">垂直</a-radio-button>
              <a-radio-button value="inline">行内</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="i18nt('designer.setting.labelAlign')">
            <a-radio-group v-model:value="formConfig.labelAlign" class="radio-group-custom">
              <a-radio-button value="label-left-align">{{i18nt('designer.setting.leftAlign')}}</a-radio-button>
              <a-radio-button value="label-center-align">{{i18nt('designer.setting.centerAlign')}}</a-radio-button>
              <a-radio-button value="label-right-align">{{i18nt('designer.setting.rightAlign')}}</a-radio-button>
            </a-radio-group>
          </a-form-item>
          <a-form-item :label="i18nt('designer.setting.labelWidth')">
            <a-input-number v-model:value="formConfig.labelWidth" :min="0" style="width: 100%"></a-input-number>
          </a-form-item>
          <a-form-item :label="i18nt('designer.setting.formCss')">
            <a-button type="info"   plain shape="round" @click="editFormCss">{{i18nt('designer.setting.addCss')}}</a-button>
          </a-form-item>
          <!-- -->
          <a-form-item :label="i18nt('designer.setting.customClass')">
            <a-select v-model:value="formConfig.customClass" multiple filterable allow-create
                       default-first-option>
              <a-select-option v-for="(item, idx) in cssClassList" :key="idx" :label="item" :value="item"> {{ item }} </a-select-option>
            </a-select>
          </a-form-item>
          <!-- -->
          <a-form-item :label="i18nt('designer.setting.globalFunctions')">
            <a-button type="info"   plain  shape="round"  @click="editGlobalFunctions">{{i18nt('designer.setting.addEventHandler')}}</a-button>
          </a-form-item>
          <a-form-item label-width="0">
            <a-divider class="custom-divider">{{i18nt('designer.setting.formSFCSetting')}}</a-divider>
          </a-form-item>
          <a-form-item :label="i18nt('designer.setting.formModelName')">
            <a-input type="text" v-model:value="formConfig.modelName"></a-input>
          </a-form-item>
          <a-form-item :label="i18nt('designer.setting.formRefName')">
            <a-input type="text" v-model:value="formConfig.refName"></a-input>
          </a-form-item>
          <a-form-item :label="i18nt('designer.setting.formRulesName')">
            <a-input type="text" v-model:value="formConfig.rulesName"></a-input>
          </a-form-item>
        </a-collapse-panel>

        <a-collapse-panel v-if="showEventCollapse()" key="2" :header="i18nt('designer.setting.eventSetting')">
          <a-form-item label="onFormCreated" label-width="150px">
            <a-button type="info"   plain  shape="round"
                       :class="[getFormEventHandled('onFormCreated') ? 'button-text-highlight' : '']"
                       @click="editFormEventHandler('onFormCreated')">
              {{i18nt('designer.setting.addEventHandler')}}</a-button>
          </a-form-item>
          <a-form-item label="onFormMounted" label-width="150px">
            <a-button type="info"  plain  shape="round"
                       :class="[getFormEventHandled('onFormMounted') ? 'button-text-highlight' : '']"
                       @click="editFormEventHandler('onFormMounted')">
              {{i18nt('designer.setting.addEventHandler')}}</a-button>
          </a-form-item>
          <!-- -->
          <a-form-item label="onFormDataChange" label-width="150px">
            <a-button type="info"   plain  shape="round"
                       :class="[getFormEventHandled('onFormDataChange') ? 'button-text-highlight' : '']"
                       @click="editFormEventHandler('onFormDataChange')">
              {{i18nt('designer.setting.addEventHandler')}}</a-button>
          </a-form-item>
          <!-- -->
          <!--
          <a-form-item label="onFormValidate">
            <a-button type="info" icon="el-icon-edit" plain round @click="editFormEventHandler('onFormValidate')">
              {{i18nt('designer.setting.addEventHandler')}}</a-button>
          </a-form-item>
          -->
        </a-collapse-panel>
      </a-collapse>
    </a-form>

    <div v-if="showFormEventDialogFlag" class=""  >
      <a-modal :title="i18nt('designer.setting.editFormEventHandler')" v-model:visible="showFormEventDialogFlag"
                 :show-close="true" custom-class="drag-dialog small-padding-dialog" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <a-alert type="info" :closable="false" :message="'form.' + eventParamsMap[curEventName]"></a-alert>
        <code-editor :mode="'javascript'" :readonly="false" v-model="formEventHandlerCode" ref="ecEditor"></code-editor>
        <a-alert type="info" :closable="false" message="}"></a-alert>
        <template #footer>
          <div class="dialog-footer">
            <a-button @click="showFormEventDialogFlag = false">
              {{i18nt('designer.hint.cancel')}}</a-button>
            <a-button type="primary" @click="saveFormEventHandler">
              {{i18nt('designer.hint.confirm')}}</a-button>
          </div>
        </template>
      </a-modal>
    </div>

    <div v-if="showEditFormCssDialogFlag" class=""  >
      <a-modal :title="i18nt('designer.setting.formCss')" v-model:visible="showEditFormCssDialogFlag"
                 :show-close="true" custom-class="drag-dialog small-padding-dialog" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <code-editor :mode="'css'" :readonly="false" v-model="formCssCode"></code-editor>
        <template #footer>
          <div class="dialog-footer">
            <a-button @click="showEditFormCssDialogFlag = false">
              {{i18nt('designer.hint.cancel')}}</a-button>
            <a-button type="primary" @click="saveFormCss">
              {{i18nt('designer.hint.confirm')}}</a-button>
          </div>
        </template>
      </a-modal>
    </div>

    <div v-if="showEditFunctionsDialogFlag" class=""  >
      <a-modal :title="i18nt('designer.setting.globalFunctions')" v-model:visible="showEditFunctionsDialogFlag"
                 :show-close="true" custom-class="drag-dialog small-padding-dialog" append-to-body
                 :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <code-editor :mode="'javascript'" :readonly="false" v-model="functionsCode" ref="gfEditor"></code-editor>
        <template #footer>
          <div class="dialog-footer">
            <a-button @click="showEditFunctionsDialogFlag = false">
              {{i18nt('designer.hint.cancel')}}</a-button>
            <a-button type="primary" @click="saveGlobalFunctions">
              {{i18nt('designer.hint.confirm')}}</a-button>
          </div>
        </template>
      </a-modal>
    </div>

  </div>
</template>

<script>
  import i18n from "@/utils/i18n"
  import CodeEditor from '@/components/code-editor/index'
  import {deepClone, insertCustomCssToHead, insertGlobalFunctionsToHtml} from "@/utils/util"

  export default {
    name: "form-setting",
    mixins: [i18n],
    components: {
      CodeEditor,
    },
    props: {
      designer: Object,
      formConfig: Object,
    },
    inject: ['getDesignerConfig'],
    data() {
      return {
        designerConfig: this.getDesignerConfig(),

        formActiveCollapseNames: ['1', '2'],

        formSizes: [
          {label: 'default', value: ''},
          {label: 'large', value: 'large'},
          //{label: 'medium', value: 'medium'},
          {label: 'small', value: 'small'},
          //{label: 'mini', value: 'mini'},
        ],

        showEditFormCssDialogFlag: false,
        formCssCode: '',
        cssClassList: [],

        showEditFunctionsDialogFlag: false,
        functionsCode: '',

        showFormEventDialogFlag: false,
        formEventHandlerCode: '',
        curEventName: '',

        eventParamsMap: {
          'onFormCreated':      'onFormCreated() {',
          'onFormMounted':      'onFormMounted() {',
          'onFormDataChange':   'onFormDataChange(fieldName, newValue, oldValue, formModel, subFormName, subFormRowIndex) {',
          //'onFormValidate':     'onFormValidate() {',
        },

      }
    },
    created() {
      //导入表单JSON后需要重新加载自定义CSS样式！！！
      this.designer.handleEvent('form-json-imported', () => {
        this.formCssCode = this.formConfig.cssCode
        insertCustomCssToHead(this.formCssCode)
        this.extractCssClass()
        this.designer.emitEvent('form-css-updated', deepClone(this.cssClassList))
      })
    },
    mounted() {
      /* SettingPanel和FormWidget为兄弟组件, 在FormWidget加载formConfig时，
         此处SettingPanel可能无法获取到formConfig.cssCode, 故加个延时函数！ */
      setTimeout(() => {
        this.formCssCode = this.formConfig.cssCode
        insertCustomCssToHead(this.formCssCode)
        this.extractCssClass()
        this.designer.emitEvent('form-css-updated', deepClone(this.cssClassList))
      }, 1200)
    },
    methods: {
      getFormEventHandled(eventName) {
        return !!this.formConfig[eventName] && (this.formConfig[eventName].length > 0)
      },

      showEventCollapse() {
        if (this.designerConfig['eventCollapse'] === undefined) {
          return true
        }

        return !!this.designerConfig['eventCollapse']
      },

      editFormCss() {
        this.formCssCode = this.designer.formConfig.cssCode
        this.showEditFormCssDialogFlag = true
      },

      extractCssClass() {
        let regExp = /\..*{/g
        let result = this.formCssCode.match(regExp)
        let cssNameArray = []

        if (!!result && result.length > 0) {
          result.forEach((rItem) => {
            let classArray = rItem.split(',')  //切分逗号分割的多个class
            if (classArray.length > 0) {
              classArray.forEach((cItem) => {
                let caItem = cItem.trim()
                if (caItem.indexOf('.', 1) !== -1) {  //查找第二个.位置
                  let newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf('.', 1))  //仅截取第一、二个.号之间的class
                  if (!!newClass) {
                    cssNameArray.push(newClass.trim())
                  }
                } else if (caItem.indexOf(' ') !== -1) {  //查找第一个空格位置
                  let newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf(' '))  //仅截取第一、二个.号之间的class
                  if (!!newClass) {
                    cssNameArray.push(newClass.trim())
                  }
                } else {
                  if (caItem.indexOf('{') !== -1) {  //查找第一个{位置
                    let newClass = caItem.substring(caItem.indexOf('.') + 1, caItem.indexOf('{'))
                    cssNameArray.push( newClass.trim() )
                  } else {
                    let newClass = caItem.substring(caItem.indexOf('.') + 1)
                    cssNameArray.push( newClass.trim() )
                  }
                }
              })
            }
          })
        }

        //this.cssClassList.length = 0
        this.cssClassList.splice(0, this.cssClassList.length)  //清除数组必须用splice，length=0不会响应式更新！！
        this.cssClassList = Array.from( new Set(cssNameArray) )  //数组去重
      },

      saveFormCss() {
        this.extractCssClass()
        this.designer.formConfig.cssCode = this.formCssCode
        insertCustomCssToHead(this.formCssCode)
        this.showEditFormCssDialogFlag = false

        this.designer.emitEvent('form-css-updated', deepClone(this.cssClassList))
      },

      editGlobalFunctions() {
        this.functionsCode = this.designer.formConfig.functions
        this.showEditFunctionsDialogFlag = true
      },

      saveGlobalFunctions() {
        const codeHints = this.$refs.gfEditor.getEditorAnnotations()
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            return
          }
        }

        this.designer.formConfig.functions = this.functionsCode
        insertGlobalFunctionsToHtml(this.functionsCode)
        this.showEditFunctionsDialogFlag = false
      },

      editFormEventHandler(eventName) {
        this.curEventName = eventName
        this.formEventHandlerCode = this.formConfig[eventName]
        this.showFormEventDialogFlag = true
      },

      saveFormEventHandler() {
        const codeHints = this.$refs.ecEditor.getEditorAnnotations()
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            return
          }
        }

        this.formConfig[this.curEventName] = this.formEventHandlerCode
        this.showFormEventDialogFlag = false
      },

    }
  }
</script>

<style lang="scss" scoped>
  .setting-form {
    // :deep(.el-form-item__label) {
    //   font-size: 13px;
    //   //text-overflow: ellipsis;
    //   overflow: hidden;
    //   white-space: nowrap;
    // }

    // :deep(.el-form-item--small.el-form-item) {
    //   margin-bottom: 10px;
    // }

    // .radio-group-custom {
    //   :deep(.el-radio-button__inner) {
    //     padding-left: 12px;
    //     padding-right: 12px;
    //   }
    // }

    // .custom-divider.el-divider--horizontal {
    //   margin: 10px 0;
    // }
  }

  // .setting-collapse {
  //   // :deep(.el-collapse-item__content) {
  //   //   padding-bottom: 6px;
  //   // }

  //   // :deep(.el-collapse-item__header) {
  //   //   font-style: italic;
  //   //   font-weight: bold;
  //   // }
  // }

  // .small-padding-dialog {
  //   :deep(.el-dialog__body) {
  //     padding: 6px 15px 12px 15px;
  //   }
  // }
  .button-text-highlight {
  &.ant-btn {
    font-weight: bold;
    color: #409eff;
  }
}
</style>