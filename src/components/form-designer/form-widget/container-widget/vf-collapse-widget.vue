<template>
  <container-wrapper
    :designer="designer"
    :widget="widget"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
  >
    <div
      :key="widget.id"
      class="collapse-container data-table-container"
      :class="{ selected: selected }"
      @click.stop="selectWidget(widget)"
    >
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
            <draggable
              :list="widget.headerRightSlotList"
              item-key="id"
              v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }"
              handle=".drag-handler"
              tag="transition-group"
              :component-data="{ name: 'fade' }"
              @add="evt => onContainerDragAdd(evt, widget.headerRightSlotList)"
              @update="onContainerDragUpdate"
              :move="checkContainerMove"
            >
              <template #item="{ element: subWidget, index: swIdx }">
                <div class="form-widget-list">
                  <template v-if="'container' === subWidget.category">
                    <component
                      :is="subWidget.type + '-widget'"
                      :widget="subWidget"
                      :designer="designer"
                      :key="subWidget.id"
                      :parent-list="widget.headerRightSlotList"
                      :index-of-parent-list="swIdx"
                      :parent-widget="widget"
                    />
                  </template>
                  <template v-else>
                    <component
                      :is="subWidget.type + '-widget'"
                      :field="subWidget"
                      :designer="designer"
                      :key="subWidget.id"
                      :parent-list="widget.headerRightSlotList"
                      :index-of-parent-list="swIdx"
                      :parent-widget="widget"
                      :design-state="true"
                    />
                  </template>
                </div>
              </template>
            </draggable>
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
              v-if="widget.options.formCode"
              ref="dFormRef"
              :form-json="formJson"
              :form-data="formData"
              :global-dsv="globalDsv"
              :parent-form="parentFormRef"
              :disabled-mode="options.disabledMode"
              :dynamic-creation="true"
            />
            <draggable
              :list="widget.defaultSlotsList"
              item-key="id"
              v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }"
              handle=".drag-handler"
              tag="transition-group"
              :component-data="{ name: 'fade' }"
              @add="evt => onContainerDragAdd(evt, widget.defaultSlotsList)"
              @update="onContainerDragUpdate"
              :move="checkContainerMove"
            >
              <template #item="{ element: subWidget, index: swIdx }">
                <div class="form-widget-list">
                  <template v-if="'container' === subWidget.category">
                    <component
                      :is="subWidget.type + '-widget'"
                      :widget="subWidget"
                      :designer="designer"
                      :key="subWidget.id"
                      :parent-list="widget.defaultSlotsList"
                      :index-of-parent-list="swIdx"
                      :parent-widget="widget"
                    />
                  </template>
                  <template v-else>
                    <component
                      :is="subWidget.type + '-widget'"
                      :field="subWidget"
                      :designer="designer"
                      :key="subWidget.id"
                      :parent-list="widget.defaultSlotsList"
                      :index-of-parent-list="swIdx"
                      :parent-widget="widget"
                      :design-state="true"
                    />
                  </template>
                </div>
              </template>
            </draggable>
          </div>
        </Transition>
      </div>
    </div>
  </container-wrapper>
</template>

<script lang="jsx">
  import ContainerWrapper from '@/components/form-designer/form-widget/container-widget/container-wrapper';
  import emitter from '@/utils/emitter';
  import i18n from '@/utils/i18n';
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
  import containerMixin from '@/components/form-designer/form-widget/container-widget/containerMixin';
  import refMixinDesign from '@/components/form-designer/refMixinDesign';
  import TpfCollapseTitle from '@/components/TpfCollapse/TpfCollapseTitle.vue';
  import SvgIcon from '@/components/svg-icon/index.vue';
  import gridWidget from './grid-widget.vue';

  export default {
    name: 'VfCollapseWidget',
    mixins: [i18n, containerMixin, refMixinDesign, emitter],
    inject: ['refList'],
    components: {
      ContainerWrapper,
      TpfCollapseTitle,
      SvgIcon,
      gridWidget,
      ...FieldComponents
    },
    data() {
      return {};
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

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
      options: {
        type: Object,
        default: () => ({})
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
    created() {
      this.initRefList();
    },
    mounted() {
      //
      this.loadFormCode(this.widget.options.formCode);
    },
    beforeUnmount() {
      //
    },
    computed: {
      rightSlotCss() {
        return this.widget.options.rightSlotCss || '';
      },
      selected() {
        return this.widget.id === this.designer.selectedId;
      }
    },
    watch: {
      'widget.options.formCode'(val) {
        this.loadFormCode(val);
      }
    },
    methods: {
      selectWidget(widget) {
        this.designer.setSelected(widget);
      },
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
      getFormRef() {
        return this.$refs.dFormRef;
      }
    }
  };
</script>

<style lang="less" scoped>
  .collapse-container {
    display: flex;
    margin: 2px;
    height: 100%;
    width: 100%;
    flex: 1 0 0;

    .form-widget-list {
      min-height: 28px;
    }
  }

  .collapse-container.selected {
    outline: 2px solid var(--ant-primary-color) !important;
  }

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
        background-color: #fff;
        margin-right: 10px;
        min-height: 30px;
        min-width: 100px;
        width: fit-content;
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
