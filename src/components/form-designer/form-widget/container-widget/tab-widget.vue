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
      class="tab-container"
      :class="{ selected: selected }"
      @click.stop="selectWidget(widget)"
    >
      <a-tabs
        :type="widget.options.type"
        :tabBarGutter="widget.options.tabBarGutter"
        :tabPosition="widget.options.tabPosition"
        v-model:activeKey="widget.options.activeTab"
        @tab-click="onTabClick"
      >
        <a-tab-pane
          v-for="tab in widget.tabs"
          :tab="tab.options.label"
          :key="tab.options.label"
          @click.stop="selectWidget(widget)"
        >
          <draggable
            :list="tab.widgetList"
            item-key="id"
            v-bind="{ group: 'dragGroup', ghostClass: 'ghost', animation: 200 }"
            handle=".drag-handler"
            tag="transition-group"
            :component-data="{ name: 'fade' }"
            @add="evt => onContainerDragAdd(evt, tab.widgetList)"
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
                    :parent-list="tab.widgetList"
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
                    :parent-list="tab.widgetList"
                    :index-of-parent-list="swIdx"
                    :parent-widget="widget"
                    :design-state="true"
                  />
                </template>
              </div>
            </template>
          </draggable>
        </a-tab-pane>
      </a-tabs>
    </div>
  </container-wrapper>
</template>

<script>
  import i18n from '@/utils/i18n';
  import containerMixin from '@/components/form-designer/form-widget/container-widget/containerMixin';
  import ContainerWrapper from '@/components/form-designer/form-widget/container-widget/container-wrapper';
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';
  import refMixinDesign from '@/components/form-designer/refMixinDesign';

  export default {
    name: 'tab-widget',
    componentName: 'ContainerWidget',
    mixins: [i18n, containerMixin, refMixinDesign],
    inject: ['refList'],
    components: {
      ContainerWrapper,
      ...FieldComponents
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object
    },
    data() {
      return {
        activeTab: 'tab1'
        //
      };
    },
    computed: {
      selected() {
        return this.widget.id === this.designer.selectedId;
      },

      customClass() {
        return this.widget.options.customClass || '';
      }
    },
    watch: {
      //
    },
    created() {
      this.initRefList();
      this.handleOnCreated();
    },
    mounted() {
      //
      this.handleOnMounted();
    },
    methods: {
      handleOnCreated() {
        if (!!this.widget.options.onCreated) {
          const customFunc = new Function(this.widget.options.onCreated);
          customFunc.call(this);
        }
      },
      handleOnMounted() {
        if (!!this.designState) {
          //设计状态不触发事件
          return;
        }
        if (!!this.widget.options.onMounted) {
          const mountFunc = new Function(this.widget.options.onMounted);
          mountFunc.call(this);
        }
      },
      changeCurrentTab(inx) {
        const str = this.widget.tabs[inx]?.options?.label || '';
        this.onTabClick(str);
        this.widget.options.activeTab = str;
      },
      onTabClick(evt) {
        const index = this.widget.tabs.findIndex(item => item.options.label === evt);
        const paneName = evt;
        this.widget.tabs.forEach(tp => {
          tp.options.active = tp.options.name === paneName;
        });
        if (!!this.designState) {
          //设计状态不触发事件
          return;
        }
        const onTabClick = this.widget.options.onTabClick;
        if (onTabClick) {
          const onTabClickFn = new Function('tab', 'index', onTabClick);
          onTabClickFn.call(this, paneName, index);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .tab-container {
    margin: 2px;

    .form-widget-list {
      min-height: 28px;
    }
    :deep(.ant-tabs) {
      &.ant-tabs-bottom .ant-tabs-nav-wrap,
      &.ant-tabs-top .ant-tabs-nav-wrap {
        padding-left: 46px;
      }
      .ant-tabs-content {
        min-height: 100px;
      }
    }
  }

  .tab-container.selected {
    outline: 2px solid $--color-primary !important;
  }
</style>
