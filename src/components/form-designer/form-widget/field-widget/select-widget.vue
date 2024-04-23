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
    <div class="design-select-box" v-show="!isReadMode">
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
        @popupScroll="onPopupScroll"
        :options="field.options.optionItems"
        :fieldNames="{
          label: field.options.labelKey || 'label',
          value: field.options.valueKey || 'value',
          options: 'options'
        }"
      />
      <div v-if="field.options.useModal" class="useModal-svg" @click="handleClickIcon">
        <svg-icon icon-class="sousuo" />
      </div>
    </div>
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
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin.js';
  import SvgIcon from '@/components/svg-icon';

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
    components: { SvgIcon, FormItemWrapper },
    data() {
      return {
        oldFieldValue: null, //field组件change之前的值
        fieldModel: null,
        rules: [],
        pager: {
          page: 1,
          pageSize: 20,
          totalPage: 0,
          total: 0
        }
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
    watch: {
      'field.options.dsEnabled': {
        deep: true,
        handler(val) {
          if (val) {
            this.initOptionItems();
          }
          //
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
      },
      onPopupScroll(e) {
        if (!this.field.options.loadingPage) return;
        const { target } = e;
        const { scrollTop, scrollHeight, clientHeight } = target;
        if (scrollHeight - (scrollTop + clientHeight) <= 30) {
          if (this.pager.totalPage > this.pager.page) {
            this.pager.page += 1;
            this.initOptionItems(true);
          }
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
  .design-select-box {
    display: flex;
    width: 100%;
    .ant-select {
      flex: 1 0 0;
      min-width: 0;
    }
    .useModal-svg {
      border: 1px solid #d9d9d9;
      // padding-left: 12px;
      cursor: pointer;
      width: 40px;
      background: #fafafa;
      line-height: 30px;
      border-left: 0;
      text-align: center;
    }
  }
</style>
