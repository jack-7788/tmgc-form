<template>
  <form-item-wrapper
    v-if="handleHidden()"
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
    <div ref="fieldEditor" class="t-w-full t-h-[30vh]"></div>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from './form-item-wrapper';
  import emitter from '@/utils/emitter';
  import i18n, { translate } from '@/utils/i18n';
  import fieldMixin from '@/components/form-designer/form-widget/field-widget/fieldMixin';
  import BpmnViewer from 'bpmn-js/lib/Viewer';

  export default {
    name: 'bpmn-editor-widget',
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
        rules: [],
        bpmnModeler: null
      };
    },
    computed: {},
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList();
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
    watch: {
      fieldModel(val) {
        if (val) {
          this.preview(val);
        } else {
          if (this.bpmnModeler && this.bpmnModeler.destroy) {
            this.bpmnModeler.destroy();
          }
        }
      }
    },

    methods: {
      preview(xml) {
        // 避免缓存，每次清一下
        if (this.bpmnModeler && this.bpmnModeler.destroy) {
          this.bpmnModeler.destroy();
        }
        this.bpmnModeler = new BpmnViewer({ container: this.$refs.fieldEditor });
        const viewer = this.bpmnModeler;
        this.bpmnModeler.importXML(xml, err => {
          if (err) {
            console.error(err);
          } else {
            // 只实现预览，核心代码以下两句足够
            const canvas = viewer.get('canvas');
            canvas.zoom('fit-viewport');
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../../../../styles/global.scss'; /* form-item-wrapper已引入，还需要重复引入吗？ */
  :deep(.bjs-powered-by) {
    display: none;
  }
  :deep(.bjs-breadcrumbs) {
    display: none;
  }
</style>
