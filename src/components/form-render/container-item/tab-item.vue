<template>
  <container-item-wrapper :widget="widget">
    <div :key="widget.id" class="tab-container" v-show="!widget.options.hidden">
      <a-tabs
        ref="fieldEditor"
        v-model:activeKey="widget.options.activeTab"
        :type="widget.options.type"
        :tabBarGutter="widget.options.tabBarGutter"
        :tabPosition="widget.options.tabPosition"
        :class="[customClass]"
        @tab-click="onTabClick"
      >
        <a-tab-pane
          v-for="tab in visibleTabs"
          :tab="tab.options.label"
          :disabled="tab.options.disabled"
          :key="tab.options.label"
        >
          <template v-for="(subWidget, swIdx) in tab.widgetList">
            <template v-if="'container' === subWidget.category">
              <component
                :is="getComponentByContainer(subWidget)"
                :widget="subWidget"
                :key="swIdx"
                :parent-list="tab.widgetList"
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
                :key="swIdx"
                :parent-list="tab.widgetList"
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
          </template>
        </a-tab-pane>
      </a-tabs>
    </div>
  </container-item-wrapper>
</template>

<script>
  import emitter from '@/utils/emitter';
  import i18n from '@/utils/i18n';
  import refMixin from '@/components/form-render/refMixin';
  import ContainerItemWrapper from './container-item-wrapper';
  import containerItemMixin from './containerItemMixin';
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';

  export default {
    name: 'tab-item',
    componentName: 'ContainerItem',
    mixins: [emitter, i18n, refMixin, containerItemMixin],
    components: {
      ContainerItemWrapper,
      ...FieldComponents
    },
    props: {
      widget: Object,

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
    inject: ['refList', 'sfRefList', 'globalModel'],
    data() {
      return {
        activeTabName: ''
      };
    },
    computed: {
      visibleTabs() {
        return this.widget.tabs.filter(tp => {
          return !tp.options.hidden;
        });
      }
    },
    created() {
      this.initRefList();
      this.initActiveTab();
      this.handleOnCreated();
    },
    mounted() {
      this.handleOnMounted();
    },
    beforeUnmount() {
      this.unregisterFromRefList();
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
      initActiveTab() {
        if (this.widget.type === 'tab' && this.widget.tabs.length > 0) {
          const activePanes = this.widget.tabs.filter(tp => {
            return tp.options.active === true;
          });
          if (this.widget.options.activeTab) {
            this.activeTabName = this.widget.options.activeTab;
            return;
          }
          if (activePanes.length > 0) {
            this.activeTabName = activePanes[0].options.label;
          } else {
            this.activeTabName = this.widget.tabs[0].options.label;
          }
        }
      },

      onTabClick(tab) {
        const index = this.widget.tabs.findIndex(item => item.options.label === tab);

        if (!!this.widget.options.onTabClick) {
          const customFn = new Function('tab', 'index', this.widget.options.onTabClick);
          customFn.call(this, tab, index);
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  :deep(.ant-tabs) {
    &.ant-tabs-bottom .ant-tabs-nav-wrap,
    &.ant-tabs-top .ant-tabs-nav-wrap {
      padding-left: 46px;
    }
    .ant-tabs-content {
      min-height: 100px;
    }
  }
</style>
