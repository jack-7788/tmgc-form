<template>
  <a-modal
    :title="options.title"
    :centered="true"
    v-model:visible="dialogVisible"
    destroy-on-close
    :width="options.width"
    :mask="options.showModal"
    :maskClosable="options.closeOnClickModal"
    :keyboard="options.closeOnPressEscape"
    @cancel="handleCloseEvent"
  >
    <VFormRender
      ref="dFormRef"
      :form-json="formJson"
      :form-data="formData"
      :option-data="optionData"
      :global-dsv="globalDsv"
      :parent-form="parentFormRef"
      :disabled-mode="options.disabledMode"
      :dynamic-creation="true"
    />
    <template #footer>
      <div>
        <a-button v-if="!options.cancelButtonHidden" @click="handleCancelClick">
          {{ cancelBtnLabel }}
        </a-button>
        <a-button v-if="!options.okButtonHidden" type="primary" @click="handleOkClick">
          {{ okBtnLabel }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
  import i18n from '@/utils/i18n';

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
        dialogVisible: false
      };
    },
    computed: {
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
      show() {
        this.dialogVisible = true;

        //设置readMode模式
        this.$nextTick(() => {
          if (!!this.options.readMode) {
            this.$refs['dFormRef'].setReadMode(true);
          }

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

      // handleBeforeClose(done) {
      //   if (!!this.options.onDialogBeforeClose) {
      //     const customFn = new Function('done', this.options.onDialogBeforeClose);
      //     const closeResult = customFn.call(this);
      //     return closeResult === false ? closeResult : done();
      //   }

      //   return done();
      // },

      handleCloseEvent() {
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

      handleOkClick() {
        if (!!this.options.onOkButtonClick) {
          const customFn = new Function(this.options.onOkButtonClick);
          const clickResult = customFn.call(this);
          if (clickResult === false) {
            return;
          }
        }

        this.dialogVisible = false;
        setTimeout(this.deleteWrapperNode, 150);
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
