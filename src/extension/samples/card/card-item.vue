<template>
  <container-item-wrapper :widget="widget">
    <a-card
      :key="widget.id"
      class="card-container"
      :class="[!!widget.options.folded ? 'folded' : '', customClass]"
      :shadow="widget.options.shadow"
      :style="{ width: widget.options.cardWidth + '!important' || '' }"
      :ref="widget.id"
      v-show="!widget.options.hidden"
    >
      <template #title>
        <span>{{ widget.options.label }}</span>
      </template>
      <template #extra>
        <i v-if="widget.options.showFold" @click="toggleCard">
          <template v-if="!widget.options.folded">ArrowDown </template>
          <template v-else> ArrowUp </template>
        </i>
      </template>
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
    </a-card>
  </container-item-wrapper>
</template>

<script>
  import emitter from '@/utils/emitter';
  import i18n from '@/utils/i18n';
  import refMixin from '@/components/form-render/refMixin';
  import ContainerItemWrapper from '@/components/form-render/container-item/container-item-wrapper';
  import containerItemMixin from '@/components/form-render/container-item/containerItemMixin';
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index';

  export default {
    name: 'card-item',
    componentName: 'ContainerItem',
    mixins: [emitter, i18n, refMixin, containerItemMixin],
    components: {
      ContainerItemWrapper,
      ...FieldComponents
      // ArrowDown,
      // ArrowUp
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
    computed: {
      customClass() {
        return this.widget.options.customClass || '';
      }
    },
    created() {
      this.initRefList();
    },
    beforeUnmount() {
      this.unregisterFromRefList();
    },
    methods: {
      toggleCard() {
        this.widget.options.folded = !this.widget.options.folded;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .folded :deep(.ant-card-body) {
    display: none;
  }
</style>
