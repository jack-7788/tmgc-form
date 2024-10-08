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
    <div
      :class="[
        !!field.options.autoFullWidth ? 'auto-full-width' : '',
        isReadMode ? 'readonly-mode-time-range' : ''
      ]"
    >
      <a-time-range-picker
        ref="fieldEditor"
        :size="size"
        v-model:value="fieldModel"
        :class="[!!field.options.autoFullWidth ? 'full-width-input' : '']"
        :disabled="handleDisabled()"
        :readonly="field.options.readonly"
        :inputReadOnly="field.options.readonly"
        :allowClear="field.options.allowClear"
        :format="field.options.format"
        value-format="HH:mm:ss"
        :placeholder="[
          field.options.startPlaceholder || i18nt('render.hint.startTimePlaceholder'),
          field.options.endPlaceholder || i18nt('render.hint.endTimePlaceholder')
        ]"
        @focus="handleFocusCustomEvent"
        @blur="handleBlurCustomEvent"
        @change="handleChangeEvent"
      />
      <template v-if="isReadMode">
        <span class="readonly-mode-field">{{ contentForReadMode }}</span>
      </template>
    </div>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper';
  import emitter from '@/utils/emitter';
  import i18n, { translate } from '@/utils/i18n';
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';

  export default {
    name: 'time-range-widget',
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
      FormItemWrapper
    },
    data() {
      return {
        oldFieldValue: null, //field组件change之前的值
        fieldModel: null,
        rules: []
      };
    },
    computed: {
      size() {
        if (!!this.field.options && !!this.field.options.size) {
          return this.field.options.size;
        }
        if (!!this.designer) {
          return this.designer.formConfig.size || 'middle';
        } else {
          return this.formConfig.size || 'middle';
        }
      },
      contentForReadMode() {
        if (!this.fieldModel) {
          return '--';
        } else {
          return this.fieldModel[0] + ' - ' + this.fieldModel[1];
        }
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

    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */

  .auto-full-width {
    width: 100%;

    :deep(.ant-picker) {
      width: 100% !important;
    }
  }

  .readonly-mode-time-range {
    :deep(.ant-picker) {
      display: none;
    }
  }
</style>
