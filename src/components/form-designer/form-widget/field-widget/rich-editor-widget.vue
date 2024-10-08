<template>
  <form-item-wrapper
    :designer="designer"
    :field="field"
    :rules="rules"
    :design-state="designState"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
    :sub-form-row-index="subFormRowIndex"
    :sub-form-col-index="subFormColIndex"
    :sub-form-row-id="subFormRowId"
    v-if="!handleHidden()"
  >
    <div :class="{ 'readonly-mode-rich-editor': isReadMode }">
      <quill-editor
        ref="fieldEditor"
        v-model:value="fieldModel"
        :options="editorOption"
        :disabled="handleDisabled() || isReadMode"
        @blur="handleRichEditorBlurEvent"
        @focus="handleRichEditorFocusEvent"
        @change="handleRichEditorChangeEvent"
        :style="!!field.options.contentHeight ? `height: ${field.options.contentHeight};` : ''"
      />
    </div>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper';
  import emitter from '@/utils/emitter';
  import i18n, { translate } from '@/utils/i18n';
  import { deepClone } from '@/utils/util';
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';

  import { Quill, quillEditor } from 'vue3-quill';

  export default {
    name: 'rich-editor-widget',
    componentName: 'FieldWidget', //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: {
        /* 子表单组件行索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormColIndex: {
        /* 子表单组件列索引，从0开始计数 */ type: Number,
        default: -1
      },
      subFormRowId: {
        /* 子表单组件行Id，唯一id且不可变 */ type: String,
        default: ''
      }
    },
    components: {
      FormItemWrapper,
      quillEditor
    },
    data() {
      return {
        oldFieldValue: null, //field组件change之前的值
        fieldModel: null,
        rules: [],

        customToolbar: [], //富文本编辑器自定义工具栏
        valueChangedFlag: false //vue2-editor数据值是否改变标志
      };
    },
    computed: {
      editorOption() {
        return {
          placeholder: this.field.options.placeholder,
          modules: {
            //toolbar: this.customToolbar
          }
        };
      }
    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList();
      this.initFieldModel();
      this.initEventHandler();
      this.buildFieldRules();

      this.handleOnCreated();
    },

    mounted() {
      this.handleOnMounted();
    },

    beforeUnmount() {
      this.unregisterFromRefList();
    },

    methods: {
      handleRichEditorChangeEvent() {
        this.valueChangedFlag = true;
        this.syncUpdateFormModel(this.fieldModel);
      },

      handleRichEditorFocusEvent() {
        this.oldFieldValue = deepClone(this.fieldModel);
      },

      handleRichEditorBlurEvent() {
        if (this.valueChangedFlag) {
          this.emitFieldDataChange(this.fieldModel, this.oldFieldValue);
          this.valueChangedFlag = false;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */

  .full-width-input {
    width: 100% !important;
  }

  .readonly-mode-rich-editor {
    :deep(.ql-toolbar) {
      display: none;
    }

    :deep(.ql-container) {
      //border-top: 1px solid #cccccc !important;
      border: 0;
    }
  }
</style>
