<template>
  <a-config-provider component-size="small" :input="{ autocomplete: 'off' }">
    <a-layout class="panel-container">
      <a-tabs v-model:activeKey="activeTab" style="height: 100%; width: 100%; overflow: hidden">
        <a-tab-pane :tab="i18nt('designer.hint.widgetSetting')" key="1">
          <div class="setting-scrollbar" :style="{ height: scrollerHeight }">
            <template v-if="!!designer.selectedWidget && !designer.selectedWidget.category">
              <a-form
                :model="optionModel"
                labelAlign="left"
                label-width="120px"
                class="setting-form tpf-form"
                @submit.prevent
              >
                <a-collapse v-model:activeKey="widgetActiveCollapseNames" class="setting-collapse">
                  <a-collapse-panel
                    key="1"
                    v-if="showCollapse(commonProps)"
                    :header="i18nt('designer.setting.commonSetting')"
                  >
                    <template v-for="(editorName, propName) in commonProps">
                      <component
                        v-if="hasPropEditor(propName, editorName)"
                        :key="propName"
                        :is="getPropEditor(propName, editorName)"
                        :designer="designer"
                        :selected-widget="selectedWidget"
                        :option-model="optionModel"
                      />
                    </template>
                  </a-collapse-panel>

                  <a-collapse-panel
                    key="2"
                    v-if="showCollapse(advProps)"
                    :header="i18nt('designer.setting.advancedSetting')"
                  >
                    <template v-for="(editorName, propName) in advProps">
                      <component
                        v-if="hasPropEditor(propName, editorName)"
                        :key="propName"
                        :is="getPropEditor(propName, editorName)"
                        :designer="designer"
                        :selected-widget="selectedWidget"
                        :option-model="optionModel"
                      />
                    </template>
                  </a-collapse-panel>

                  <a-collapse-panel
                    key="3"
                    v-if="showEventCollapse() && showCollapse(eventProps)"
                    :header="i18nt('designer.setting.eventSetting')"
                  >
                    <template v-for="(editorName, propName) in eventProps">
                      <component
                        v-if="hasPropEditor(propName, editorName)"
                        :key="propName"
                        :is="getPropEditor(propName, editorName)"
                        :designer="designer"
                        :selected-widget="selectedWidget"
                        :option-model="optionModel"
                        :event-handled="getEventHandled(propName)"
                      />
                    </template>
                  </a-collapse-panel>
                </a-collapse>
              </a-form>
            </template>

            <template v-if="!!designer.selectedWidget && !!designer.selectedWidget.category">
              <a-form
                :model="optionModel"
                labelAlign="left"
                label-width="120px"
                class="setting-form tpf-form"
                @submit.prevent
              >
                <a-collapse v-model:activeKey="widgetActiveCollapseNames" class="setting-collapse">
                  <a-collapse-panel
                    key="1"
                    v-if="showCollapse(commonProps)"
                    :header="i18nt('designer.setting.commonSetting')"
                  >
                    <template v-for="(editorName, propName) in commonProps">
                      <component
                        v-if="hasPropEditor(propName, editorName)"
                        :key="propName"
                        :is="getPropEditor(propName, editorName)"
                        :designer="designer"
                        :selected-widget="selectedWidget"
                        :option-model="optionModel"
                      />
                    </template>
                  </a-collapse-panel>

                  <a-collapse-panel
                    key="2"
                    v-if="showCollapse(advProps)"
                    :header="i18nt('designer.setting.advancedSetting')"
                  >
                    <template v-for="(editorName, propName) in advProps">
                      <component
                        v-if="hasPropEditor(propName, editorName)"
                        :key="propName"
                        :is="getPropEditor(propName, editorName)"
                        :designer="designer"
                        :selected-widget="selectedWidget"
                        :option-model="optionModel"
                      />
                    </template>
                  </a-collapse-panel>

                  <a-collapse-panel
                    key="3"
                    v-if="showEventCollapse() && showCollapse(eventProps)"
                    :header="i18nt('designer.setting.eventSetting')"
                  >
                    <template v-for="(editorName, propName) in eventProps">
                      <component
                        v-if="hasPropEditor(propName, editorName)"
                        :key="propName"
                        :is="getPropEditor(propName, editorName)"
                        :designer="designer"
                        :selected-widget="selectedWidget"
                        :option-model="optionModel"
                        :event-handled="getEventHandled(propName)"
                      />
                    </template>
                  </a-collapse-panel>
                </a-collapse>
              </a-form>
            </template>

            <template v-if="!designer.selectedWidget">
              <a-empty :description="i18nt('designer.hint.noSelectedWidgetHint')" />
            </template>
          </div>
        </a-tab-pane>

        <a-tab-pane v-if="!!designer" :tab="i18nt('designer.hint.formSetting')" key="2">
          <div class="setting-scrollbar" :style="{ height: scrollerHeight }">
            <form-setting :designer="designer" :form-config="formConfig" />
          </div>
        </a-tab-pane>

        <a-tab-pane :tab="'表单api配置'" key="3">
          <div class="ds-setting-scrollbar" :style="{ height: scrollerHeight }">
            <FormCrudSetting :designer="designer" :form-config="formConfig" />
          </div>
        </a-tab-pane>
      </a-tabs>

      <a-modal
        :title="i18nt('designer.setting.editWidgetEventHandler')"
        v-model:visible="showWidgetEventDialogFlag"
        :show-close="true"
        custom-class="drag-dialog small-padding-dialog"
        append-to-body
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <a-alert type="info" :closable="false" :message="eventHeader" />
        <code-editor
          :mode="'javascript'"
          :readonly="false"
          v-model="eventHandlerCode"
          ref="ecEditor"
        />
        <a-alert type="info" :closable="false" message="}" />
        <template #footer>
          <div class="dialog-footer">
            <a-button @click="showWidgetEventDialogFlag = false">
              {{ i18nt('designer.hint.cancel') }}</a-button
            >
            <a-button type="primary" @click="saveEventHandler">
              {{ i18nt('designer.hint.confirm') }}</a-button
            >
          </div>
        </template>
      </a-modal>
    </a-layout>
  </a-config-provider>
</template>

<script>
  import CodeEditor from '@/components/code-editor/index';
  import PropertyEditors from './property-editor/index';
  import FormSetting from './form-setting';
  import DataSourceSetting from './data-source-setting.vue';
  import FormCrudSetting from './form-crud-setting.vue';
  import WidgetProperties from './propertyRegister';
  import { addWindowResizeHandler } from '@/utils/util';
  import i18n from '@/utils/i18n';
  import emitter from '@/utils/emitter';
  import { propertyRegistered } from '@/components/form-designer/setting-panel/propertyRegister';

  const { COMMON_PROPERTIES, ADVANCED_PROPERTIES, EVENT_PROPERTIES } = WidgetProperties;

  export default {
    name: 'SettingPanel',
    componentName: 'SettingPanel',
    mixins: [i18n, emitter],
    components: {
      CodeEditor,
      FormSetting,
      DataSourceSetting,
      FormCrudSetting,
      ...PropertyEditors
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      formConfig: Object,
      globalDsv: {
        type: Object,
        default: () => ({})
      }
    },
    provide() {
      return {
        isSubFormChildWidget: () => this.subFormChildWidgetFlag,
        getGlobalDsv: () => this.globalDsv // 全局数据源变量
      };
    },
    inject: ['getDesignerConfig'],
    data() {
      return {
        designerConfig: this.getDesignerConfig(),

        scrollerHeight: 0,

        activeTab: '2',
        widgetActiveCollapseNames: ['1', '2', '3'],
        formActiveCollapseNames: ['1', '2'],

        commonProps: COMMON_PROPERTIES,
        advProps: ADVANCED_PROPERTIES,
        eventProps: EVENT_PROPERTIES,

        showWidgetEventDialogFlag: false,
        eventHandlerCode: '',
        curEventName: '',
        eventHeader: '',

        subFormChildWidgetFlag: false
      };
    },
    computed: {
      optionModel: {
        get() {
          return this.selectedWidget.options;
        },

        set(newValue) {
          this.selectedWidget.options = newValue;
        }
      }
    },
    watch: {
      'designer.selectedWidget': {
        handler(val) {
          if (!!val) {
            this.activeTab = '1';
          }
        }
      },

      'selectedWidget.options': {
        //组件属性变动后，立即保存表单JSON！！
        deep: true,
        handler() {
          this.designer.saveCurrentHistoryStep();
        }
      },

      formConfig: {
        deep: true,
        handler() {
          this.designer.saveCurrentHistoryStep();
        }
      }
    },
    created() {
      this.on$('editEventHandler', eventParams => {
        //debugger
        this.editEventHandler(eventParams[0], eventParams[1]);
      });

      this.designer.handleEvent('form-css-updated', cssClassList => {
        this.designer.setCssClassList(cssClassList);
      });

      //监听字段组件选中事件
      this.designer.handleEvent('field-selected', parentWidget => {
        this.subFormChildWidgetFlag = !!parentWidget && parentWidget.type === 'sub-form';
      });
    },
    mounted() {
      if (!this.designer.selectedWidget) {
        this.activeTab = '2';
      } else {
        this.activeTab = '1';
      }

      this.scrollerHeight = window.innerHeight - 56 - 48 + 'px';
      addWindowResizeHandler(() => {
        this.$nextTick(() => {
          this.scrollerHeight = window.innerHeight - 56 - 48 + 'px';
          //console.log(this.scrollerHeight)
        });
      });
    },
    methods: {
      getEventHandled(eventName) {
        return !!this.optionModel[eventName] && this.optionModel[eventName].length > 0;
      },

      showEventCollapse() {
        if (this.designerConfig['eventCollapse'] === undefined) {
          return true;
        }

        return !!this.designerConfig['eventCollapse'];
      },

      hasPropEditor(propName, editorName) {
        if (!editorName) {
          return false;
        }

        /* alert组件注册了两个type属性编辑器，跳过第一个type属性编辑器，只显示第二个alert-type属性编辑器！！ */
        if (propName.indexOf('-') <= -1) {
          const uniquePropName = this.selectedWidget.type + '-' + propName;
          if (propertyRegistered(uniquePropName)) {
            return false;
          }
        }

        const originalPropName = propName.replace(this.selectedWidget.type + '-', ''); //去掉组件名称前缀-，如果有的话！！
        const res = this.designer.hasConfig(this.selectedWidget, originalPropName);

        return res;
      },

      getPropEditor(propName, editorName) {
        const originalPropName = propName.replace(this.selectedWidget.type + '-', ''); //去掉组件名称前缀-，如果有的话！！
        const ownPropEditorName = `${this.selectedWidget.type}-${originalPropName}-editor`;
        //console.log(ownPropEditorName, this.$options.components[ownPropEditorName])
        if (!!this.$options.components[ownPropEditorName]) {
          //局部注册的属性编辑器组件
          return ownPropEditorName;
        }

        //return !!this.$root.$options.components[ownPropEditorName] ? ownPropEditorName : editorName  //Vue2全局注册的属性编辑器组件
        return !!this.$root.$.appContext.components[ownPropEditorName]
          ? ownPropEditorName
          : editorName; //Vue3全局注册的属性编辑器组件
      },

      showCollapse(propsObj) {
        let result = false;

        for (const propName in propsObj) {
          if (!propsObj.hasOwnProperty(propName)) {
            continue;
          }

          if (this.hasPropEditor(propName, propsObj[propName])) {
            result = true;
            break;
          }
        }

        return result;
      },

      editEventHandler(eventName, eventParams) {
        //debugger

        this.curEventName = eventName;
        this.eventHeader = `${this.optionModel.name}.${eventName}(${eventParams.join(', ')}) {`;
        this.eventHandlerCode = this.selectedWidget.options[eventName] || '';

        // 设置字段校验函数示例代码
        if (eventName === 'onValidate' && !this.optionModel['onValidate']) {
          this.eventHandlerCode =
            "  /* sample code */\n  /*\n  if ((value > 100) || (value < 0)) {\n    return Promise.reject('error message')  //fail\n  } else {\n    return Promise.resolve();  //pass\n  }\n  */";
        }

        this.showWidgetEventDialogFlag = true;
      },

      saveEventHandler() {
        const codeHints = this.$refs.ecEditor.getEditorAnnotations();
        let syntaxErrorFlag = false;
        if (!!codeHints && codeHints.length > 0) {
          codeHints.forEach(chItem => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true;
            }
          });

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'));
            return;
          }
        }

        if (this.curEventName.includes('.')) {
          const [a, b] = this.curEventName.split('.');
          this.selectedWidget.options[a][b] = this.eventHandlerCode;
        } else {
          this.selectedWidget.options[this.curEventName] = this.eventHandlerCode;
        }
        this.showWidgetEventDialogFlag = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .panel-container {
    background-color: #fff;
    :deep(.ant-tabs-nav) {
      padding-left: 10px;
    }
    :deep(.ant-tabs-content) {
      overflow: auto;
    }
    :deep(.ant-form-item) {
      margin-bottom: 5px;
    }
    :deep(.ant-collapse-content-box) {
      padding: 5px;
    }
  }

  /* 隐藏Chrome浏览器中el-input数字输入框右侧的上下调整小箭头 */
  :deep(.hide-spin-button) input::-webkit-outer-spin-button,
  :deep(.hide-spin-button) input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
  }

  /* 隐藏Firefox浏览器中el-input数字输入框右侧的上下调整小箭头 */
  // :deep(.hide-spin-button) input[type='number'] {
  //   -moz-appearance: textfield;
  // }
</style>

<style lang="scss">
  .ds-setting-drawer {
    right: 320px !important;
  }
</style>
