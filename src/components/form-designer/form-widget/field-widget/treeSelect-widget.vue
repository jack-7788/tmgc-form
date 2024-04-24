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
    <div class="full-width-input" :class="{ 'readonly-mode-cascader': isReadMode }">
      <a-tree-select
        v-show="!isReadMode"
        :tree-default-expand-all="field.options.treeDefaultExpandAll"
        ref="fieldEditor"
        :size="size"
        :treeData="field.options.optionItems"
        v-model:value="fieldModel"
        :disabled="handleDisabled()"
        :allowClear="field.options.allowClear"
        :placeholder="field.options.placeholder || i18nt('render.hint.selectPlaceholder')"
        :fieldNames="{ value: valueKey, label: labelKey, children: childrenKey }"
        :multiple="field.options.multiple"
        @focus="handleFocusCustomEvent"
        @blur="handleBlurCustomEvent"
        @change="handleChangeEvent"
      />
      <template v-if="isReadMode">
        <a-tooltip placement="topLeft" :title="contentForReadMode" :overlayStyle="{ zIndex: 1000 }">
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
  import { formateTreeToName } from '@/utils/format';
  import { isArray } from 'lodash-es';

  export default {
    name: 'treeSelect-widget',
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
      labelKey() {
        return this.field.options.labelKey || 'label';
      },

      valueKey() {
        return this.field.options.valueKey || 'value';
      },

      childrenKey() {
        return this.field.options.childrenKey || 'children';
      },

      // showFullPath() {
      //   return this.field.options.showAllLevels === undefined || !!this.field.options.showAllLevels;
      // },

      contentForReadMode() {
        if (!this.fieldModel) return '';

        const val = isArray(this.fieldModel) ? this.fieldModel : [this.fieldModel];

        return formateTreeToName(val, this.field.options.optionItems, {
          label: this.labelKey,
          value: this.valueKey,
          children: this.childrenKey
        });
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
      /* 开启任意级节点可选后，点击radio隐藏下拉框 */
      hideDropDownOnClick() {
        // setTimeout(() => {
        //   document.querySelectorAll('.el-cascader-panel .el-radio').forEach(el => {
        //     el.onclick = () => {
        //       console.log('test====', 1111);
        //       this.$refs.fieldEditor.popperVisible = false; // 单选框部分点击隐藏下拉框
        //     };
        //   });
        // }, 100);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */

  .full-width-input {
    width: 100% !important;

    :deep(.el-cascader) {
      width: 100% !important;
    }
  }

  .readonly-mode-cascader :deep(.el-cascader) {
    display: none;
  }
</style>
