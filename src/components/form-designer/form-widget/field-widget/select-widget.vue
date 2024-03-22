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
  >
    <a-select
      ref="fieldEditor"
      v-model:value="fieldModel"
      v-show="!isReadMode"
      :size="size"
      class="full-width-input"
      :disabled="field.options.disabled"
      :allowClear="field.options.allowClear"
      :showArrow="true"
      :dropdownMatchSelectWidth="false"
      :mode="field.options.mode"
      :maxTagCount="field.options.maxTagCount"
      :placeholder="field.options.placeholder || i18nt('render.hint.selectPlaceholder')"
      :showSearch="field.options.showSearch"
      @search="remoteQuery"
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @change="handleChangeEvent"
      :options="field.options.optionItems"
      :fieldNames="{
        label: field.options.labelKey || 'label',
        value: field.options.valueKey || 'value',
        options: 'options'
      }"
    />
    <template v-if="isReadMode">
      <a-tooltip placement="topLeft" :title="optionLabel" :overlayStyle="{ zIndex: 1000 }">
        <span class="readonly-mode-field">{{ optionLabel }}</span>
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
    name: 'select-widget',
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
      allowDefaultFirstOption() {
        return !!this.field.options.filterable && !!this.field.options.allowCreate;
      }
    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList();
      this.initOptionItems();
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
      /**
       * 获取选中项label
       * @return {*}
       */
      getSelectedLabel() {
        return this.$refs.fieldEditor.selectedLabel;
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */

  .full-width-input {
    width: 100% !important;
  }
</style>
