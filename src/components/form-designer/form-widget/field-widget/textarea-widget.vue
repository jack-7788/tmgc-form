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
    <a-textarea
      type="textarea"
      ref="fieldEditor"
      v-model:value="fieldModel"
      v-show="!isReadMode"
      :size="size"
      :disabled="handleDisabled()"
      :allowClear="field.options.allowClear"
      :readonly="field.options.readonly"
      :placeholder="field.options.placeholder"
      :rows="field.options.rows"
      :minlength="field.options.minLength"
      :maxlength="field.options.maxLength"
      :showCount="field.options.showCount"
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @input="handleInputCustomEvent"
      @change="handleChangeEvent"
    />
    <template v-if="isReadMode">
      <a-tooltip placement="topLeft" :title="fieldModel" :overlayStyle="{ zIndex: 1000 }">
        <div v-html="fieldModel" class="readonly-mode-field"></div>
      </a-tooltip>
    </template>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper';
  import emitter from '@/utils/emitter';
  import i18n, { translate } from '@/utils/i18n';
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';

  export default {
    name: 'textarea-widget',
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

  .readonly-mode-field {
    display: inline-block;
    white-space: pre-wrap;
    line-height: 1.5;
  }
</style>
