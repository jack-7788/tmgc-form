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
    <a-radio-group
      ref="fieldEditor"
      v-model:value="fieldModel"
      :size="size"
      v-show="!isReadMode"
      :disabled="handleDisabled()"
      :style="{ display: field.options.displayStyle + ' !important' }"
      @change="handleChangeEvent"
    >
      <template v-if="!!field.options.buttonStyle">
        <a-radio-button
          v-for="(item, index) in field.options.optionItems"
          :key="index"
          :value="item[field.options.valueKey]"
          :disabled="item.disabled"
          :border="field.options.border"
          :style="{ display: field.options.displayStyle }"
        >
          {{ item[field.options.labelKey] }}
        </a-radio-button>
      </template>
      <template v-else>
        <a-radio
          v-for="(item, index) in field.options.optionItems"
          :key="index"
          :value="item[field.options.valueKey]"
          :disabled="item.disabled"
          :border="field.options.border"
          :style="{ display: field.options.displayStyle }"
        >
          {{ item[field.options.labelKey] }}
        </a-radio>
      </template>
    </a-radio-group>
    <template v-if="isReadMode">
      <span class="readonly-mode-field">{{ optionLabel }}</span>
    </template>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper';
  import emitter from '@/utils/emitter';
  import i18n, { translate } from '@/utils/i18n';
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';

  export default {
    name: 'radio-widget',
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
        let s = 'default';
        if (!!this.field.options && !!this.field.options.size) {
          s = this.field.options.size;
        } else if (!!this.designer) {
          s = this.designer.formConfig.size || 'default';
        } else {
          s = this.formConfig.size || 'default';
        }
        return s === 'middle' ? 'default' : s;
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

    methods: {}
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */
</style>
