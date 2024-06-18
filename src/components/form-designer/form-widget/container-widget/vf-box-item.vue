<template>
  <container-item-wrapper v-show="!widget.options.hidden" :widget="widget">
    <div class="box-container-item" :class="[customClass]" :key="widget.id">
      <VFormRender
        v-if="widget.options.formCode"
        ref="dFormRef"
        :parent-form="parentFormRef"
        :disabled-mode="widget.options.disabledMode"
        :dynamic-creation="true"
      />
      <template v-if="!!widget.widgetList && widget.widgetList.length > 0">
        <template v-for="(subWidget, swIdx) in widget.widgetList">
          <template v-if="'container' === subWidget.category">
            <component
              :is="getComponentByContainer(subWidget)"
              :widget="subWidget"
              :key="swIdx"
              :parent-list="widget.widgetList"
              :index-of-parent-list="swIdx"
              :parent-widget="widget"
              :sub-form-row-id="subFormRowId"
              :sub-form-row-index="subFormRowIndex"
              :sub-form-col-index="subFormColIndex"
            >
              <!-- 递归传递插槽！！！ -->
              <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"></slot>
              </template>
            </component>
          </template>
          <template v-else>
            <component
              :is="subWidget.type + '-widget'"
              :field="subWidget"
              :designer="null"
              :key="swIdx"
              :parent-list="widget.widgetList"
              :index-of-parent-list="swIdx"
              :parent-widget="widget"
            >
              <!-- 递归传递插槽！！！ -->
              <template v-for="slot in Object.keys($slots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"></slot>
              </template>
            </component>
          </template>
        </template>
      </template>
    </div>
  </container-item-wrapper>
</template>

<script>
  import ContainerItemWrapper from '@/components/form-render/container-item/container-item-wrapper.vue';
  import emitter from '@/utils/emitter';

  import i18n from '@/utils/i18n';

  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
  import refMixin from '@/components/form-render/refMixin';
  import containerItemMixin from '@/components/form-render/container-item/containerItemMixin';
  import SvgIcon from '@/components/svg-icon/index.vue';

  export default {
    name: 'VfBoxItem',
    componentName: 'boxItem', // 必须固定为ContainerItem，用于接收父级组件的broadcast事件
    mixins: [emitter, i18n, refMixin, containerItemMixin],
    components: {
      ContainerItemWrapper,
      SvgIcon,
      ...FieldComponents
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,

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
    inject: ['refList', 'sfRefList', 'globalModel', 'getFormConfig', 'getGlobalDsv'],
    data() {
      return {};
    },
    computed: {
      customClass() {
        return this.widget.options.customClass || '';
      },

      formConfig() {
        return this.getFormConfig();
      }
    },
    created() {
      this.initRefList();
      this.handleOnCreated();
    },
    mounted() {
      this.loadFormCode(this.widget.options.formCode);
      this.$nextTick(() => {
        this.handleOnMounted();
      });
    },
    beforeUnmount() {
      this.unregisterFromRefList();
    },
    methods: {
      async loadFormCode(formCode) {
        if (formCode) {
          const res = await this.$http
            .get(`/api/tmgc2-query/dataQuery/detail/FormDefinitionManagement`, {
              params: { code: formCode }
            })
            .then(res => res.data.object.frontendDefinition || '{}');
          this.$refs.dFormRef.setFormJson(JSON.parse(res));
        }
      },

      handleOnCreated() {
        if (!!this.widget.options.onCreated) {
          const customFunc = new Function(this.widget.options.onCreated);
          customFunc.call(this);
        }
      },

      handleOnMounted() {
        if (!!this.widget.options.onMounted) {
          const customFunc = new Function(this.widget.options.onMounted);
          customFunc.call(this);
        }
      },
      getFormRef() {
        return this.$refs.dFormRef;
      }
    }
  };
</script>

<style lang="less" scoped>
  .box-container-item {
    width: 100%;
    min-height: 120px;
    position: relative;
  }

  .box-container-item > div:first-child {
    min-height: 58px;
  }
</style>
