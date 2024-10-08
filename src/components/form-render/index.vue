<template>
  <a-config-provider :component-size="size" :input="{ autocomplete: 'off' }">
    <a-form
      :layout="labelPosition"
      :class="[customClass, readModeFlag ? 'readonly-mode-form' : '']"
      class="render-form tpf-form"
      :label-width="labelWidth"
      :validate-on-rule-change="false"
      :model="formDataModel"
      ref="renderForm"
      @submit.prevent
    >
      <template v-for="(widget, index) in widgetList">
        <template v-if="'container' === widget.category">
          <component
            :is="getContainerWidgetName(widget)"
            :widget="widget"
            :key="widget.id"
            :parent-list="widgetList"
            :index-of-parent-list="index"
            :parent-widget="null"
          >
            <!-- 递归传递插槽！！！ -->
            <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </component>
        </template>
        <template v-else>
          <component
            :is="getWidgetName(widget)"
            :field="widget"
            :form-model="formDataModel"
            :designer="null"
            :key="widget.id"
            :parent-list="widgetList"
            :index-of-parent-list="index"
            :parent-widget="null"
          >
            <!-- 递归传递插槽！！！ -->
            <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
              <slot :name="slot" v-bind="scope"></slot>
            </template>
          </component>
        </template>
      </template>
    </a-form>
  </a-config-provider>
</template>

<script>
  import { createVNode, render } from 'vue';
  import emitter from '@/utils/emitter';
  import './container-item/index';
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
  import {
    generateId,
    deepClone,
    insertCustomCssToHead,
    insertGlobalFunctionsToHtml,
    getAllContainerWidgets,
    getAllFieldWidgets,
    traverseFieldWidgets,
    buildDefaultFormJson,
    getDSByName,
    runDataSourceRequest,
    getFieldWidgetByName,
    overwriteObj,
    getContainerWidgetByName,
    traverseFieldWidgetsOfContainer,
    cloneFormConfigWithoutEventHandler,
    getDefaultFormConfig
  } from '@/utils/util';

  import i18n, { changeLocale } from '@/utils/i18n';
  import DynamicDialog from './dynamic-dialog';
  import DynamicDrawer from './dynamic-drawer';
  import { fmtHttpParams } from '@/utils/request/fmtHttpParams';

  export default {
    name: 'VFormRender',
    componentName: 'VFormRender',
    mixins: [emitter, i18n],
    components: {
      ...FieldComponents
    },
    props: {
      vfCtx: {
        type: Object,
        default: () => ({})
      },
      formJson: {
        //prop传入的表单JSON配置
        type: Object,
        default: () => buildDefaultFormJson()
      },
      formData: {
        //prop传入的表单数据
        type: Object,
        default: () => ({})
      },
      optionData: {
        //prop传入的选项数据
        type: Object,
        default: () => ({})
      },
      previewState: {
        //是否表单预览状态
        type: Boolean,
        default: false
      },
      disabledMode: {
        //表单禁止编辑模式
        type: Boolean,
        default: false
      },
      renderConfig: {
        //渲染配置对象
        type: Object,
        default: () => {
          return {
            languageName: 'zh-CN' //界面语言，默认显示中文
          };
        }
      },
      globalDsv: {
        // 全局数据源变量
        type: Object,
        default: () => ({})
      },
      parentForm: {
        type: Object,
        default: null
      },
      dynamicCreation: {
        //是否弹窗、抽屉动态创建的VFormRender
        type: Boolean,
        default: false
      }
    },
    provide() {
      return {
        refList: this.widgetRefList,
        sfRefList: this.subFormRefList, //收集SubForm引用
        getFormConfig: () =>
          this.formJsonObj.formConfig /* 解决provide传递formConfig属性的响应式更新问题！！ */,
        getGlobalDsv: () => this.globalDsv, // 全局数据源变量
        globalOptionData: this.optionData,
        getOptionData: () =>
          this.optionData /* 该方法用于在异步更新option-data之后重新获取到最新值 */,
        globalModel: {
          formModel: this.formDataModel
        },
        previewState: this.previewState,
        getReadMode: () => this.readModeFlag,
        getSubFormFieldFlag: () => false,
        getSubFormName: () => '',
        getDSResultCache: () => this.dsResultCache
      };
    },
    data() {
      return {
        formJsonObj: this.formJson,

        formDataModel: {
          //
        },

        widgetRefList: {},
        subFormRefList: {},
        formId: null, //表单唯一Id，用于区分页面上的多个v-form-render组件！！

        externalComponents: {}, //外部组件实例集合
        readModeFlag: false, //是否只读查看模式
        dialogOrDrawerRef: null, //保存子级VFormRender的包裹弹窗组件或抽屉组件的ref
        childFormRef: null, //保存子级VFormRender组件的ref

        dsResultCache: {} //数据源请求结果缓存
      };
    },
    computed: {
      formConfig() {
        return this.formJsonObj.formConfig;
      },

      widgetList() {
        return this.formJsonObj.widgetList;
      },

      labelPosition() {
        if (!!this.formConfig && !!this.formConfig.labelPosition) {
          return this.formConfig.labelPosition;
        }

        return 'horizontal';
      },

      labelWidth() {
        if (!!this.formConfig && !!this.formConfig.labelWidth) {
          return this.formConfig.labelWidth + 'px';
        }

        return '80px';
      },

      size() {
        if (!!this.formConfig && !!this.formConfig.size) {
          return this.formConfig.size;
        }

        return 'default';
      },

      customClass() {
        return !!this.formConfig && !!this.formConfig.customClass
          ? this.formConfig.customClass
          : '';
      }
    },
    watch: {
      //
    },
    created() {
      this.buildFormModel(!this.formJsonObj ? null : this.formJsonObj.widgetList);
      this.initFormObject();
    },
    mounted() {
      this.initLocale();
      this.initDataSetRequest();
      // this.handleOnMounted();
    },
    methods: {
      async onFormDetail() {
        const serveList = this.formConfig.serveList;
        if (serveList.vformDetail.http?.url) {
          const res = await fmtHttpParams.call(this, serveList.vformDetail, { vfCtx: this.vfCtx });
          console.log('res: ', res);
          return res;
        }
      },
      async onFormUpdate() {
        const modelForm = await this.getFormData();
        const serveList = this.formConfig.serveList;
        if (serveList.vformDetail.http?.url) {
          const res = await fmtHttpParams.call(this, serveList.vformUpdate, {
            data: modelForm,
            vfCtx: this.vfCtx
          });
          console.log('res: ', res);
          return res;
        }
      },

      initFormObject(insertHtmlCodeFlag = true) {
        this.formId = 'vfRender' + generateId();
        if (!!insertHtmlCodeFlag && !this.dynamicCreation) {
          // 弹窗、抽屉动态创建的VFormRender不重新插入全局CSS和全局函数节点！！
          this.insertCustomStyleAndScriptNode();
        }
        this.addFieldChangeEventHandler();
        this.addFieldValidateEventHandler();
        this.registerFormToRefList();
        this.handleOnCreated();

        if (!!this.disabledMode) {
          //禁止表单编辑
          this.$nextTick(() => {
            this.disableForm();
          });
        }
      },

      getContainerWidgetName(widget) {
        if (widget.type === 'grid') {
          //grid-item跟VueGridLayout全局注册组件重名，故特殊处理！！
          return 'vf-grid-item';
        }

        return widget.type + '-item';
      },

      getWidgetName(widget) {
        return widget.type + '-widget';
      },

      initLocale() {
        const curLocale = localStorage.getItem('v_form_locale') || 'zh-CN';
        this.changeLanguage(curLocale);
      },

      insertCustomStyleAndScriptNode() {
        if (!!this.formConfig && !!this.formConfig.cssCode) {
          insertCustomCssToHead(this.formConfig.cssCode, !!this.previewState ? '' : this.formId);
        }

        if (!!this.formConfig && !!this.formConfig.functions) {
          insertGlobalFunctionsToHtml(
            this.formConfig.functions,
            !!this.previewState ? '' : this.formId
          );
        }
      },

      buildFormModel(widgetList) {
        if (!!widgetList && widgetList.length > 0) {
          widgetList.forEach(wItem => {
            this.buildDataFromWidget(wItem);
          });
        }
      },

      buildDataFromWidget(wItem) {
        if (wItem.category === 'container') {
          if (wItem.type === 'vf-dialog' || wItem.type === 'vf-drawer') {
            // 什么也不做，不处理弹窗、抽屉内部组件！！
          } else if (wItem.type === 'grid') {
            if (!!wItem.cols && wItem.cols.length > 0) {
              wItem.cols.forEach(childItem => {
                this.buildDataFromWidget(childItem);
              });
            }
          } else if (wItem.type === 'table') {
            if (!!wItem.rows && wItem.rows.length > 0) {
              wItem.rows.forEach(rowItem => {
                if (!!rowItem.cols && rowItem.cols.length > 0) {
                  rowItem.cols.forEach(colItem => {
                    this.buildDataFromWidget(colItem);
                  });
                }
              });
            }
          } else if (wItem.type === 'tab') {
            if (!!wItem.tabs && wItem.tabs.length > 0) {
              wItem.tabs.forEach(tabItem => {
                if (!!tabItem.widgetList && tabItem.widgetList.length > 0) {
                  tabItem.widgetList.forEach(childItem => {
                    this.buildDataFromWidget(childItem);
                  });
                }
              });
            }
          } else if (wItem.type === 'sub-form') {
            const subFormName = wItem.options.name;
            if (!this.formData.hasOwnProperty(subFormName)) {
              const subFormDataRow = {};
              if (wItem.options.showBlankRow) {
                wItem.widgetList.forEach(subFormItem => {
                  if (!!subFormItem.formItemFlag) {
                    subFormDataRow[subFormItem.options.name] = subFormItem.options.defaultValue;
                  }
                });

                this.formDataModel[subFormName] = [subFormDataRow];
              } else {
                this.formDataModel[subFormName] = [];
              }
            } else {
              const initialValue = this.formData[subFormName];
              this.formDataModel[subFormName] = deepClone(initialValue);
            }
          } else if (wItem.type === 'grid-sub-form') {
            const gridSubFormName = wItem.options.name;
            if (!this.formData.hasOwnProperty(gridSubFormName)) {
              const gsfFWList = [];
              const fieldListFn = fw => {
                gsfFWList.push(fw);
              };
              traverseFieldWidgetsOfContainer(wItem, fieldListFn);

              const gridSubFormDataRow = {};
              if (wItem.options.showBlankRow) {
                gsfFWList.forEach(gridSubFormItem => {
                  gridSubFormDataRow[gridSubFormItem.options.name] =
                    gridSubFormItem.options.defaultValue;
                });
                this.formDataModel[gridSubFormName] = [gridSubFormDataRow];
              } else {
                this.formDataModel[gridSubFormName] = [];
              }
            } else {
              const initialValue = this.formData[gridSubFormName];
              this.formDataModel[gridSubFormName] = deepClone(initialValue);
            }
          } else if (wItem.type === 'grid-col' || wItem.type === 'table-cell') {
            if (!!wItem.widgetList && wItem.widgetList.length > 0) {
              wItem.widgetList.forEach(childItem => {
                this.buildDataFromWidget(childItem);
              });
            }
          } else {
            //自定义容器组件
            if (!!wItem.widgetList && wItem.widgetList.length > 0) {
              wItem.widgetList.forEach(childItem => {
                this.buildDataFromWidget(childItem);
              });
            }
          }
        } else if (!!wItem.formItemFlag) {
          if (!this.formData.hasOwnProperty(wItem.options.name)) {
            this.formDataModel[wItem.options.name] = wItem.options.defaultValue;
          } else {
            const initialValue = this.formData[wItem.options.name];
            this.formDataModel[wItem.options.name] = deepClone(initialValue);
          }
        }
      },

      addFieldChangeEventHandler() {
        this.off$('fieldChange'); //移除原有事件监听
        this.on$('fieldChange', (fieldName, newValue, oldValue, subFormName, subFormRowIndex) => {
          this.handleFieldDataChange(fieldName, newValue, oldValue, subFormName, subFormRowIndex);
          this.$emit(
            'formChange',
            fieldName,
            newValue,
            oldValue,
            this.formDataModel,
            subFormName,
            subFormRowIndex
          );
        });
      },

      addFieldValidateEventHandler() {
        this.off$('fieldValidation'); //移除原有事件监听
        this.on$('fieldValidation', fieldName => {
          if (!!this.$refs.renderForm) {
            this.$refs.renderForm.validateFields(fieldName);
          }
        });
      },

      registerFormToRefList() {
        this.widgetRefList['v_form_ref'] = this;
      },

      handleFieldDataChange(fieldName, newValue, oldValue, subFormName, subFormRowIndex) {
        if (!!this.formConfig && !!this.formConfig.onFormDataChange) {
          const customFunc = new Function(
            'fieldName',
            'newValue',
            'oldValue',
            'formModel',
            'subFormName',
            'subFormRowIndex',
            this.formConfig.onFormDataChange
          );
          customFunc.call(
            this,
            fieldName,
            newValue,
            oldValue,
            this.formDataModel,
            subFormName,
            subFormRowIndex
          );
        }
      },

      handleOnCreated() {
        if (!!this.formConfig && !!this.formConfig.onFormCreated) {
          const customFunc = new Function(this.formConfig.onFormCreated);
          customFunc.call(this);
        }
      },

      handleOnMounted() {
        if (!!this.formConfig && !!this.formConfig.onFormMounted) {
          const customFunc = new Function(this.formConfig.onFormMounted);
          customFunc.call(this);
        }
      },

      findWidgetAndSetDisabled(widgetName, disabledFlag) {
        const foundW = this.getWidgetRef(widgetName);
        if (!!foundW && !!foundW.setDisabled) {
          foundW.setDisabled(disabledFlag);
        } else {
          //没找到，可能是子表单中的组件
          this.findWidgetOfSubFormAndSetDisabled(widgetName, disabledFlag);
        }
      },

      findWidgetOfSubFormAndSetDisabled(widgetName, disabledFlag) {
        const widgetSchema = getFieldWidgetByName(this.formJsonObj.widgetList, widgetName, true);
        if (
          !!widgetSchema &&
          !!widgetSchema.options &&
          widgetSchema.options.hasOwnProperty('disabled')
        ) {
          widgetSchema.options.disabled = disabledFlag;
        }

        this.findWidgetNameInSubForm(widgetName).forEach(wn => {
          const sw = this.getWidgetRef(wn);
          if (!!sw && !!sw.setDisabled) {
            sw.setDisabled(disabledFlag);
          }
        });
      },

      findWidgetAndSetHidden(widgetName, hiddenFlag) {
        const foundW = this.getWidgetRef(widgetName);
        if (!!foundW && !!foundW.setDisabled) {
          foundW.setHidden(hiddenFlag);
        } else {
          //没找到，可能是子表单中的组件
          this.findWidgetOfSubFormAndSetHidden(widgetName, hiddenFlag);
        }
      },

      findWidgetOfSubFormAndSetHidden(widgetName, hiddenFlag) {
        const widgetSchema = getFieldWidgetByName(this.formJsonObj.widgetList, widgetName, true);
        if (
          !!widgetSchema &&
          !!widgetSchema.options &&
          widgetSchema.options.hasOwnProperty('hidden')
        ) {
          widgetSchema.options.hidden = hiddenFlag;
        }

        this.findWidgetNameInSubForm(widgetName).forEach(wn => {
          const sw = this.getWidgetRef(wn);
          if (!!sw && !!sw.setDisabled) {
            sw.setHidden(hiddenFlag);
          }
        });
      },

      findWidgetNameInSubForm(widgetName) {
        const result = [];
        let subFormName = null;
        const handlerFn = (field, parent) => {
          if (!!field.options && field.options.name === widgetName) {
            subFormName = parent.options.name;
          }
        };
        traverseFieldWidgets(this.widgetList, handlerFn);

        if (!!subFormName) {
          const subFormRef = this.getWidgetRef(subFormName);
          if (!!subFormRef) {
            const rowIds = subFormRef.getRowIdData();
            if (!!rowIds && rowIds.length > 0) {
              rowIds.forEach(rid => {
                result.push(widgetName + '@row' + rid);
              });
            }
          }
        }

        return result;
      },

      initDataSetRequest() {
        const dsNameSet = new Set();
        this.getFieldWidgets().forEach(fw => {
          if (
            !!fw.field.options.dsEnabled &&
            !!fw.field.options.dsName &&
            !!fw.field.options.dataSetName
          ) {
            dsNameSet.add(fw.field.options.dsName);
          }
        });

        if (dsNameSet.size > 0) {
          dsNameSet.forEach(async dsName => {
            const curDS = getDSByName(this.formConfig, dsName);
            if (!!curDS) {
              const localDsv = new Object({});
              overwriteObj(localDsv, this.globalDsv || {});
              let dsResult = null;
              try {
                dsResult = await runDataSourceRequest(curDS, localDsv, this, false, this.$message);
                this.dsResultCache[dsName] = dsResult;
                this.broadcast('FieldWidget', 'loadOptionItemsFromDataSet', dsName); //注意：跟Vue2不同，事件参数不需要包含在数组中传递！！
              } catch (err) {
                this.$message.error(err.message);
              }
            }
          });
        }
      },

      //--------------------- 以下为组件支持外部调用的API方法 begin ------------------//
      /* 提示：用户可自行扩充这些方法！！！ */

      changeLanguage(langName) {
        changeLocale(langName);
      },

      getLanguageName() {
        return localStorage.getItem('v_form_locale') || 'zh-CN';
      },

      getNativeForm() {
        //获取原生form引用
        return this.$refs['renderForm'];
      },

      getFormRef() {
        return this;
      },

      getWidgetRef(widgetName, showError = false) {
        const foundRef = this.widgetRefList[widgetName];
        if (!foundRef && !!showError) {
          this.$message.error(this.i18nt('render.hint.refNotFound') + widgetName);
        }
        return foundRef;
      },

      clearFormDataModel() {
        for (const pkey in this.formDataModel) {
          delete this.formDataModel[pkey];
        }
      },

      getFormJson() {
        return this.formJsonObj;
      },

      /**
       * 动态加载表单JSON
       * @param newFormJson
       */
      setFormJson(newFormJson) {
        if (!!newFormJson) {
          if (typeof newFormJson === 'string' || newFormJson.constructor === Object) {
            let newFormJsonObj = null;
            if (typeof newFormJson === 'string') {
              newFormJsonObj = JSON.parse(newFormJson);
            } else {
              newFormJsonObj = newFormJson;
            }

            if (!newFormJsonObj.formConfig || !newFormJsonObj.widgetList) {
              this.$message.error('Invalid format of form json.');
              return;
            }

            /* formDataModel必须在widgetList赋值完成初始化，因为widgetList赋值意味着子组件开始创建！！！ */
            //this.formDataModel = {}  //清空表单数据对象（有bug，会导致表单校验失败！！）
            this.clearFormDataModel(); //上行代码有问题，会导致表单校验失败，故保留原对象引用只清空对象属性！！
            this.buildFormModel(newFormJsonObj.widgetList);
            const defaultFormConfig = deepClone(getDefaultFormConfig());

            overwriteObj(defaultFormConfig, newFormJsonObj.formConfig); //

            this.formJsonObj['formConfig'] = defaultFormConfig; //newFormJsonObj.formConfig;
            this.formJsonObj['widgetList'] = newFormJsonObj.widgetList;

            this.insertCustomStyleAndScriptNode(); /* 必须先插入表单全局函数，否则VForm内部引用全局函数会报错！！！ */
            this.$nextTick(() => {
              this.initFormObject(false);
              this.initDataSetRequest();
              this.handleOnMounted();
            });
          } else {
            this.$message.error('Set form json failed.');
          }
        }
      },

      /**
       * 重新加载选项数据
       * @param widgetNames 指定重新加载的组件名称或组件名数组，不传则重新加载所有选项字段
       */
      reloadOptionData(widgetNames) {
        let eventParams = [];
        if (!!widgetNames && typeof widgetNames === 'string') {
          eventParams = [widgetNames];
        } else if (!!widgetNames && Array.isArray(widgetNames)) {
          eventParams = [...widgetNames];
        }
        this.broadcast('FieldWidget', 'reloadOptionItems', eventParams);
      },

      getFormData(needValidation = true) {
        if (!needValidation) {
          return this.formDataModel;
        }

        let callback = function nullFunc() {};
        const promise = new window.Promise(function (resolve, reject) {
          callback = function (formData, error) {
            !error ? resolve(formData) : reject(error);
          };
        });
        this.$refs['renderForm']
          .validate()
          .then(res => {
            callback(this.formDataModel);
          })
          .catch(() => {
            callback(this.formDataModel, this.i18nt('render.hint.validationFailed'));
          });
        return promise;
      },

      setFormData(formData) {
        console.log('setFormData: ', formData);
        //设置表单数据
        Object.keys(this.formDataModel).forEach(propName => {
          if (!!formData && formData.hasOwnProperty(propName)) {
            this.formDataModel[propName] = deepClone(formData[propName]);
          }
        });

        // 通知SubForm组件：表单数据更新事件！！
        this.broadcast('ContainerItem', 'setFormData', this.formDataModel);
        // 通知FieldWidget组件：表单数据更新事件！！
        this.broadcast('FieldWidget', 'setFormData', this.formDataModel);
      },

      getFieldValue(fieldName) {
        //单个字段获取值
        const fieldRef = this.getWidgetRef(fieldName);
        if (!!fieldRef && !!fieldRef.getValue) {
          return fieldRef.getValue();
        }

        if (!fieldRef) {
          //如果是子表单字段
          const result = [];
          this.findWidgetNameInSubForm(fieldName).forEach(wn => {
            const sw = this.getWidgetRef(wn);
            if (!!sw && !!sw.getValue) {
              result.push(sw.getValue());
            }
          });

          return result;
        }
      },

      setFieldValue(fieldName, fieldValue, disableChangeEvent = false) {
        //单个更新字段值
        const fieldRef = this.getWidgetRef(fieldName);
        if (!!fieldRef && !!fieldRef.setValue) {
          fieldRef.setValue(fieldValue, disableChangeEvent);
        }

        if (!fieldRef) {
          //如果是子表单字段
          this.findWidgetNameInSubForm(fieldName).forEach(wn => {
            const sw = this.getWidgetRef(wn);
            if (!!sw && !!sw.setValue) {
              sw.setValue(fieldValue, disableChangeEvent);
            }
          });
        }
      },

      getSubFormValues(subFormName, needValidation = true) {
        const foundSFRef = this.subFormRefList[subFormName];
        // if (!foundSFRef) {
        //   return this.formDataModel[subFormName]
        // }
        return foundSFRef.getSubFormValues(needValidation);
      },

      disableForm() {
        const wNameList = Object.keys(this.widgetRefList);
        wNameList.forEach(wName => {
          const foundW = this.getWidgetRef(wName);
          if (!!foundW) {
            if (!!foundW.widget && foundW.widget.type === 'sub-form') {
              foundW.disableSubForm();
            } else if (!!foundW.widget && foundW.widget.type === 'grid-sub-form') {
              foundW.disableGridSubForm();
            } else {
              !!foundW.setDisabled && foundW.setDisabled(true);
            }
          }
        });
      },

      enableForm() {
        const wNameList = Object.keys(this.widgetRefList);
        wNameList.forEach(wName => {
          const foundW = this.getWidgetRef(wName);
          if (!!foundW) {
            if (!!foundW.widget && foundW.widget.type === 'sub-form') {
              foundW.enableSubForm();
            } else if (!!foundW.widget && foundW.widget.type === 'grid-sub-form') {
              foundW.enableGridSubForm();
            } else {
              !!foundW.setDisabled && foundW.setDisabled(false);
            }
          }
        });
      },

      resetForm() {
        //重置表单
        const subFormNames = Object.keys(this.subFormRefList);
        subFormNames.forEach(sfName => {
          if (!!this.subFormRefList[sfName].resetSubForm) {
            this.subFormRefList[sfName].resetSubForm();
          }
        });

        const wNameList = Object.keys(this.widgetRefList);
        wNameList.forEach(wName => {
          const foundW = this.getWidgetRef(wName);
          if (!!foundW && !foundW.subFormItemFlag && !!foundW.resetField) {
            // 跳过子表单字段！！
            foundW.resetField();
          }
        });

        this.$nextTick(() => {
          this.clearValidate(); /* 清除resetField方法触发的校验错误提示 */
        });
      },

      clearValidate(props) {
        this.$refs.renderForm.clearValidate(props);
      },

      /**
       * 校验表单
       * @param callback 回调函数
       */
      validateForm(callback) {
        this.$refs['renderForm'].validate(valid => {
          callback(valid);
        });
      },

      validateFields() {
        //TODO
      },

      disableWidgets(widgetNames) {
        if (!!widgetNames) {
          if (typeof widgetNames === 'string') {
            this.findWidgetAndSetDisabled(widgetNames, true);
          } else if (Array.isArray(widgetNames)) {
            widgetNames.forEach(wn => {
              this.findWidgetAndSetDisabled(wn, true);
            });
          }
        }
      },

      enableWidgets(widgetNames) {
        if (!!widgetNames) {
          if (typeof widgetNames === 'string') {
            this.findWidgetAndSetDisabled(widgetNames, false);
          } else if (Array.isArray(widgetNames)) {
            widgetNames.forEach(wn => {
              this.findWidgetAndSetDisabled(wn, false);
            });
          }
        }
      },

      hideWidgets(widgetNames) {
        if (!!widgetNames) {
          if (typeof widgetNames === 'string') {
            this.findWidgetAndSetHidden(widgetNames, true);
          } else if (Array.isArray(widgetNames)) {
            widgetNames.forEach(wn => {
              this.findWidgetAndSetHidden(wn, true);
            });
          }
        }
      },

      showWidgets(widgetNames) {
        if (!!widgetNames) {
          if (typeof widgetNames === 'string') {
            this.findWidgetAndSetHidden(widgetNames, false);
          } else if (Array.isArray(widgetNames)) {
            widgetNames.forEach(wn => {
              this.findWidgetAndSetHidden(wn, false);
            });
          }
        }
      },

      /**
       * 获取所有字段组件
       * @param staticWidgetsIncluded 是否包含按钮等静态组件，默认不包含
       * @returns {*[]}
       */
      getFieldWidgets(staticWidgetsIncluded = false) {
        return getAllFieldWidgets(this.formJsonObj.widgetList, staticWidgetsIncluded);
      },

      /**
       * 获取所有容器组件
       * @returns {*[]}
       */
      getContainerWidgets() {
        return getAllContainerWidgets(this.formJsonObj.widgetList);
      },

      /**
       * 增加外部组件引用，可通过getEC()方法获取外部组件，以便在VForm内部调用外部组件方法
       * @param componentName 外部组件名称
       * @param externalComponent 外部组件实例
       */
      addEC(componentName, externalComponent) {
        this.externalComponents[componentName] = externalComponent;
      },

      /**
       * 判断外部组件是否可获取
       * @param componentName 外部组件名称
       * @returns {boolean}
       */
      hasEC(componentName) {
        return this.externalComponents.hasOwnProperty(componentName);
      },

      /**
       * 获取外部组件实例
       * @param componentName
       * @returns {*}
       */
      getEC(componentName) {
        return this.externalComponents[componentName];
      },

      /**
       * 设置或取消设置表单为只读查看模式
       * @param readonlyFlag
       */
      setReadMode(readonlyFlag = true) {
        this.readModeFlag = readonlyFlag;
      },

      /**
       * 获取表单当前是否只读查看模式
       * @returns {boolean}
       */
      getReadMode() {
        return this.readModeFlag;
      },

      /**
       * 获取globalDsv对象
       * @returns {*}
       */
      getGlobalDsv() {
        return this.globalDsv;
      },

      /**
       * 执行数据源请求
       * @param dsName
       * @param localDsv
       */
      async executeDataSource(dsName, localDsv) {
        const ds = getDSByName(this.formJsonObj.formConfig, dsName);
        const newDsv = new Object({});
        overwriteObj(newDsv, this.globalDsv);
        overwriteObj(newDsv, localDsv);
        return await runDataSourceRequest(ds, newDsv, this, false, this.$message);
      },

      /**
       * 获取父级VFormRender组件实例
       * @returns {object}
       */
      getParentFormRef() {
        return this.parentForm;
      },

      /**
       * 当显示多级嵌套弹窗或抽屉时，获取最顶层VFormRender组件实例
       * @returns {object}
       */
      getTopFormRef() {
        if (!this.parentForm) {
          return this;
        }

        let topFormRef = this.parentForm;
        while (topFormRef.parentForm) {
          topFormRef = topFormRef.parentForm;
        }

        return topFormRef;
      },

      setChildFormRef(childFormRef) {
        this.childFormRef = childFormRef;
      },

      getChildFormRef() {
        return this.childFormRef;
      },

      /**
       * 是否弹窗、抽屉组件动态创建的v-form-render
       * @returns {boolean}
       */
      isDynamicCreation() {
        return this.dynamicCreation;
      },

      setDialogOrDrawerRef(ddRef) {
        this.dialogOrDrawerRef = ddRef;
      },

      /**
       * 获取子级VFormRender的包裹弹窗组件或抽屉组件实例ref
       * @returns {object}
       */
      getDialogOrDrawerRef() {
        return this.dialogOrDrawerRef;
      },

      /**
       * 显示弹窗表单，动态创建v-form-render组件，option-data、global-dsv等属性继承父级表单
       * @param dialogName
       * @param formData
       * @param extraData
       */
      showDialog(dialogName, formData = {}, extraData = {}) {
        const topFormRef = this.getTopFormRef();
        const dialogCon = getContainerWidgetByName(topFormRef.widgetList, dialogName);
        if (!dialogName || dialogCon.type !== 'vf-dialog') {
          this.$message.error(this.i18nt('render.hint.refNotFound') + dialogName);
          return;
        }
        const dFormJson = {
          widgetList: deepClone(dialogCon.widgetList),
          formConfig: cloneFormConfigWithoutEventHandler(topFormRef.formConfig)
        };

        const wrapperDivId = generateId() + '';
        const dialogInstance = createVNode(DynamicDialog, {
          options: dialogCon.options,
          formJson: dFormJson,
          formData: { ...formData },
          optionData: topFormRef.optionData,
          globalDsv: topFormRef.globalDsv,
          parentFormRef: this,
          extraData: extraData,
          wrapperId: wrapperDivId,
          vfCtx: { ...formData }
        });
        dialogInstance.appContext = this.$root.$.appContext; //非常重要， 覆盖应用上下文！！

        const wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'vf-dynamic-dialog-wrapper' + wrapperDivId;
        document.body.appendChild(wrapperDiv);
        render(dialogInstance, wrapperDiv);
        document.body.appendChild(dialogInstance.el);
        dialogInstance.component.ctx.show();
      },

      showDrawer(drawerName, formData = {}, extraData = {}) {
        const topFormRef = this.getTopFormRef();
        const drawerCon = getContainerWidgetByName(topFormRef.widgetList, drawerName);
        if (!drawerCon || drawerCon.type !== 'vf-drawer') {
          this.$message.error(this.i18nt('render.hint.refNotFound') + drawerName);
          return;
        }
        const dFormJson = {
          widgetList: deepClone(drawerCon.widgetList),
          formConfig: cloneFormConfigWithoutEventHandler(topFormRef.formConfig)
        };

        const wrapperDivId = generateId() + '';
        const drawerInstance = createVNode(DynamicDrawer, {
          options: drawerCon.options,
          formJson: dFormJson,
          formData: formData || {},
          optionData: topFormRef.optionData,
          globalDsv: topFormRef.globalDsv,
          parentFormRef: this,
          extraData: extraData,
          wrapperId: wrapperDivId
        });
        drawerInstance.appContext = this.$root.$.appContext; //非常重要， 覆盖应用上下文！！

        const wrapperDiv = document.createElement('div');
        wrapperDiv.id = 'vf-dynamic-drawer-wrapper' + wrapperDivId;
        document.body.appendChild(wrapperDiv);
        render(drawerInstance, wrapperDiv);
        document.body.appendChild(drawerInstance.el);
        drawerInstance.component.ctx.show();
      },

      /**
       * 判断表单是否处于设计器预览状态
       * @return {boolean}
       */
      isPreviewState() {
        return this.previewState;
      }

      //--------------------- 以上为组件支持外部调用的API方法 end ------------------//
    }
  };
</script>

<style lang="scss" scoped>
  .ant-form {
    &.render-form {
      height: 100%;
      overflow: auto;
    }
  }
</style>
