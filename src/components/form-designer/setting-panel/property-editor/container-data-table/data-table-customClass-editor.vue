<template>
  <a-form-item :label="i18nt('designer.setting.customClass')">
    <a-select
      v-model:value="optionModel.customClass"
      allowClear
      mode="tags"
      :options="cssClassList"
    />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import { deepClone, generateId, getDSByName } from '@/utils/util';

  export default {
    name: 'data-table-customClass-editor',
    componentName: 'PropertyEditor',
    mixins: [i18n],
    components: {},
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    data() {
      return {
        cssClassList: [],
        dataSetList: []
      };
    },
    computed: {
      dataSourceList() {
        if (!this.designer.formConfig || !this.designer.formConfig.dataSources) {
          return [];
        } else {
          return this.designer.formConfig.dataSources;
        }
      }
    },
    watch: {
      // selectedWidget: {
      //   handler(val, oldVal) {
      //     if (!val) {
      //       return;
      //     }
      //     this.loadDataSet(val.options.dsName);
      //   },
      //   immediate: true
      // }
    },
    created() {
      this.cssClassList = deepClone(this.designer.getCssClassList());
      //监听表单css代码改动事件并重新加载！
      this.designer.handleEvent('form-css-updated', cssClassList => {
        this.cssClassList = cssClassList;
      });
    },
    mounted() {
      // this.dragSort()
    },
    methods: {
      loadDataSet(dsName) {
        this.dataSetList.length = 0;
        if (!dsName) {
          return;
        }

        const dsModel = getDSByName(this.designer.formConfig, dsName);
        if (!!dsModel && !!dsModel.dataSets) {
          dsModel.dataSets.forEach(dSet => {
            this.dataSetList.push({
              name: dSet.name,
              remark: dSet.remark
            });
          });
        }
      }
    }
  };
</script>
