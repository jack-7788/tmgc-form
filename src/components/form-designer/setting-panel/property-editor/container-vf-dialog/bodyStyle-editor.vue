<template>
  <a-form-item label="窗体样式">
    <a-button @click="editFormCss">编写样式</a-button>
  </a-form-item>
  <a-modal
    :title="`编写style`"
    v-model:visible="showEditFormCssDialogFlag"
    :show-close="true"
    custom-class="drag-dialog small-padding-dialog"
    append-to-body
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :destroy-on-close="true"
  >
    <code-editor :mode="'json'" :readonly="false" v-model="formCssCode" />
    <template #footer>
      <div class="dialog-footer">
        <a-button @click="showEditFormCssDialogFlag = false">
          {{ i18nt('designer.hint.cancel') }}
        </a-button>
        <a-button type="primary" @click="saveFormCss">
          {{ i18nt('designer.hint.confirm') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';
  import CodeEditor from '@/components/code-editor/index';

  export default {
    name: 'bodyStyle-editor',
    mixins: [i18n, propertyMixin],
    components: { CodeEditor },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        showEditFormCssDialogFlag: false,
        formCssCode: ''
      };
    },
    methods: {
      editFormCss() {
        this.formCssCode = this.optionModel.bodyStyle;
        this.showEditFormCssDialogFlag = true;
      },
      saveFormCss() {
        this.optionModel.bodyStyle = this.formCssCode;
        this.showEditFormCssDialogFlag = false;
      }
    }
  };
</script>

<style scoped></style>
