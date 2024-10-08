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
        isReadMode ? 'readonly-mode-date-range' : ''
      ]"
    >
      <a-range-picker
        ref="fieldEditor"
        v-model:value="fieldModel"
        :class="[!!field.options.autoFullWidth ? 'auto-full-width' : '']"
        :disabled="handleDisabled()"
        :readonly="field.options.readonly"
        :allowClear="field.options.allowClear"
        :show-time="field.options.showTime"
        :format="field.options.format"
        :value-format="field.options.valueFormat"
        :start-placeholder="
          field.options.startPlaceholder || i18nt('render.hint.startDatePlaceholder')
        "
        :end-placeholder="field.options.endPlaceholder || i18nt('render.hint.endDatePlaceholder')"
        @focus="handleFocusCustomEvent"
        @blur="handleBlurCustomEvent"
        @change="handleChangeEvent"
      />
      <template v-if="isReadMode">
        <a-tooltip placement="topLeft" :title="fieldModel" :overlayStyle="{ zIndex: 1000 }">
          <span class="readonly-mode-field">{{ contentForReadMode }}</span>
        </a-tooltip>
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
    name: 'date-range-widget',
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

  .full-width-input {
    width: 100% !important;
  }

  .auto-full-width {
    width: 100%;

    :deep(.el-date-editor) {
      width: 100% !important;
      padding-left: 0;
      padding-right: 0;
    }

    :deep(.el-range__icon) {
      margin-left: 10px;
    }
  }

  .readonly-mode-date-range {
    :deep(.el-range-editor) {
      display: none;
    }
  }
</style>
