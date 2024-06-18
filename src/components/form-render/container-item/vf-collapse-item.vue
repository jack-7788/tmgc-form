<template>
  <container-item-wrapper v-show="!widget.options.hidden" :widget="widget">
    <div class="tpf-collapse">
      <div class="tpf-collapse-header">
        <a-space :size="5">
          <TpfCollapseTitle :title="widget.options.title" />
          <SvgIcon
            :icon-class="
              widget.options.isCollapse
                ? widget.options.collapseIcon
                : widget.options.unCollapseIcon
            "
            size="24px"
            shadow
            cursor
            @click="toggleCollapse"
          />
        </a-space>
        <div :class="['header-right', rightSlotCss]" v-if="widget.options.isCollapse">
          <template v-if="!!widget.headerRightSlotList && widget.headerRightSlotList.length > 0">
            <template v-for="(subWidget, swIdx) in widget.headerRightSlotList">
              <template v-if="'container' === subWidget.category">
                <component
                  :is="getComponentByContainer(subWidget)"
                  :widget="subWidget"
                  :key="swIdx"
                  :parent-list="widget.headerRightSlotList"
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
                  :parent-list="widget.headerRightSlotList"
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
      </div>
      <Transition
        mode="out-in"
        appear
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <div
          :class="['tpf-collapse-content']"
          :style="{
            height: widget.options.height || 'unset',
            ...JSON.parse(widget.options.bodyStyle || '{}')
          }"
          v-show="widget.options.isCollapse"
        >
          <VFormRender
            ref="dFormRef"
            :form-json="formJson"
            :form-data="formData"
            :global-dsv="globalDsv"
            :parent-form="parentFormRef"
            :disabled-mode="widget.options.disabledMode"
            :dynamic-creation="true"
          />
          <template v-if="!!widget.defaultSlotsList && widget.defaultSlotsList.length > 0">
            <template v-for="(subWidget, swIdx) in widget.defaultSlotsList">
              <template v-if="'container' === subWidget.category">
                <component
                  :is="getComponentByContainer(subWidget)"
                  :widget="subWidget"
                  :key="swIdx"
                  :parent-list="widget.defaultSlotsList"
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
                  :parent-list="widget.defaultSlotsList"
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
      </Transition>
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
  import TpfCollapseTitle from '@/components/TpfCollapse/TpfCollapseTitle.vue';
  import SvgIcon from '@/components/svg-icon/index.vue';

  export default {
    name: 'VfCollapseItem',
    componentName: 'ContainerItem', // 必须固定为ContainerItem，用于接收父级组件的broadcast事件
    mixins: [emitter, i18n, refMixin, containerItemMixin],
    components: {
      ContainerItemWrapper,
      TpfCollapseTitle,
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
      rightSlotCss() {
        return this.widget.options.rightSlotCss || '';
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
      toggleCollapse() {
        this.widget.options.isCollapse = !this.widget.options.isCollapse;
      },
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

<style lang="scss" scoped>
  .collapse-container {
    margin: 2px;

    .form-widget-list {
      min-height: 28px;
    }
  }

  :deep(.el-collapsed__header) {
    padding: 10px 12px;
  }
</style>

<style scoped>
  :deep(.ant-table) .table-striped td {
    background-color: #fafafa;
  }
</style>

<style lang="less" scoped>
  .tpf-collapse {
    width: 100%;
    background-color: transparent;
    box-sizing: border-box;

    .tpf-collapse-header {
      padding: 10px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      background-color: #f7f8fa;
      .header-right {
        margin-right: 10px;
      }
    }

    .tpf-collapse-content {
      overflow: hidden;
      background-color: #fff;
      min-height: 200px;

      :deep(.ant-card-bordered) {
        border-color: transparent;
      }
    }
  }
</style>
