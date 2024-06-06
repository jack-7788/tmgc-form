<template>
  <a-config-provider :locale="elLocale" :input="{ autocomplete: 'off' }">
    <a-modal
      class="tpf-model design-model"
      :transitionName="!dialogVisible ? '' : 'zoom'"
      :maskTransitionName="!dialogVisible ? '' : 'fade'"
      :destroyOnClose="true"
      :title="options.title"
      :bodyStyle="{
        height: options.height,
        overflow: 'auto',
        ...JSON.parse(this.options.bodyStyle || '{}')
      }"
      :centered="true"
      v-model:visible="dialogVisible"
      :width="options.width"
      :mask="options.showModal"
      :maskClosable="options.closeOnClickModal"
      :keyboard="options.closeOnPressEscape"
      @cancel="handleCloseEvent"
      v-bind="otherAttrs"
    >
      <VFormRender
        ref="dFormRef"
        :form-json="formJson"
        :form-data="formData"
        :vfCtx="vfCtx"
        :option-data="optionData"
        :global-dsv="globalDsv"
        :parent-form="parentForm"
        :disabled-mode="options.disabledMode"
        :dynamic-creation="true"
      />
      <template #footer>
        <div class="footer-left"></div>
        <div class="footer-right">
          <a-button v-if="!options.cancelButtonHidden" @click="handleCancelClick">
            {{ cancelBtnLabel }}
          </a-button>
          <a-button v-if="!options.okButtonHidden" type="primary" @click="handleOkClick">
            {{ okBtnLabel }}
          </a-button>
        </div>
      </template>
    </a-modal>
  </a-config-provider>
</template>

<script>
  import i18n from '@/utils/i18n';
  import http from '@/utils/http';
  import zhCN from 'ant-design-vue/es/locale/zh_CN';

  export default {
    name: 'dynamic-dialog',
    mixins: [i18n],
    props: {
      options: {
        type: Object,
        default: () => ({})
      },
      formJson: {
        type: Object
      },
      formData: {
        type: Object,
        default: () => ({})
      },
      vfCtx: {
        type: Object,
        default: () => ({})
      },
      optionData: {
        //prop传入的选项数据
        type: Object,
        default: () => ({})
      },
      globalDsv: {
        // 全局数据源变量
        type: Object,
        default: () => ({})
      },
      parentFormRef: {
        type: Object,
        default: null
      },
      extraData: {
        type: Object,
        default: () => ({})
      },
      wrapperId: {
        type: String,
        default: null
      }
    },
    data() {
      return {
        dialogVisible: false,
        elLocaleMap: {
          'zh-CN': { ...zhCN },
          'en-US': {}
        }
      };
    },
    created() {},
    computed: {
      elLocale() {
        const curLocale = localStorage.getItem('v_form_locale') || 'zh-CN';
        return this.elLocaleMap[curLocale];
      },

      parentForm() {
        return { ...this.parentFormRef, parentDom: this, getParentFormRef: this.getParentFormRef };
      },
      otherAttrs() {
        if (this.options.cancelButtonHidden && this.options.okButtonHidden) {
          return { footer: null };
        }
        return {};
      },
      cancelBtnLabel() {
        return this.options.cancelButtonLabel || this.i18nt('designer.hint.cancel');
      },

      okBtnLabel() {
        return this.options.okButtonLabel || this.i18nt('designer.hint.confirm');
      }
    },
    mounted() {
      //
    },
    beforeUnmount() {
      this.parentFormRef.setChildFormRef(null);
    },
    methods: {
      async loadFormCode() {
        if (this.options.formCode) {
          const res = await http
            .get(`/api/tmgc2-query/dataQuery/detail/FormDefinitionManagement`, {
              params: { code: this.options.formCode }
            })
            .then(res => res.data.object.frontendDefinition || '{}');
          this.$refs.dFormRef.setFormJson(JSON.parse(res));
        }
      },
      setTitle(title) {
        this.options.title = title;
      },
      show() {
        this.dialogVisible = true;

        //设置readMode模式
        this.$nextTick(() => {
          if (!!this.options.readMode) {
            this.$refs['dFormRef'].setReadMode(true);
          }
          this.loadFormCode();
          this.$refs['dFormRef'].setDialogOrDrawerRef(this);
          this.parentFormRef.setChildFormRef(this.$refs['dFormRef']);
          this.handleOpenedEvent();
        });
      },

      close() {
        if (!!this.options.onDialogBeforeClose) {
          const customFn = new Function('done', this.options.onDialogBeforeClose);
          const closeResult = customFn.call(this);
          if (closeResult === false) {
            return;
          }
        }

        this.dialogVisible = false;
        setTimeout(this.deleteWrapperNode, 150);
      },

      deleteWrapperNode() {
        const wrapperNode = document.getElementById('vf-dynamic-dialog-wrapper' + this.wrapperId);
        if (!!wrapperNode) {
          document.body.removeChild(wrapperNode);
        }
      },

      handleBeforeClose() {
        if (!!this.options.onDialogBeforeClose) {
          const customFn = new Function(this.options.onDialogBeforeClose);
          return customFn.call(this);
        }

        return true;
      },

      handleCloseEvent() {
        if (!this.handleBeforeClose()) return;
        this.dialogVisible = false;
        setTimeout(this.deleteWrapperNode, 150);
      },

      handleOpenedEvent() {
        if (!!this.options.onDialogOpened) {
          const customFn = new Function(this.options.onDialogOpened);
          customFn.call(this);
        }
      },

      handleCancelClick() {
        if (!this.handleBeforeClose()) return;
        if (!!this.options.onCancelButtonClick) {
          const customFn = new Function(this.options.onCancelButtonClick);
          const clickResult = customFn.call(this);
          if (clickResult === false) {
            return;
          }
        }

        this.dialogVisible = false;
        setTimeout(this.deleteWrapperNode, 150);
      },

      async handleOkClick() {
        try {
          if (!!this.options.onOkButtonClick) {
            const customFn = new Function(this.options.onOkButtonClick);
            const clickResult = await customFn.call(this);
            if (clickResult === false) {
              return;
            }
          }
          this.dialogVisible = false;
          setTimeout(this.deleteWrapperNode, 150);
        } catch (error) {
          console.log('error: ', error);
        }
      },

      getParentFormRef() {
        return this.parentFormRef;
      },

      getFormRef() {
        return this.$refs['dFormRef'];
      },

      getWidgetRef(widgetName, showError = false) {
        return this.$refs['dFormRef'].getWidgetRef(widgetName, showError);
      },

      getExtraData() {
        return this.extraData;
      }
    }
  };
</script>

<style lang="less">
  .design-model {
    .ant-modal-close-x {
      padding: 0 20px !important;
    }
  }
</style>
