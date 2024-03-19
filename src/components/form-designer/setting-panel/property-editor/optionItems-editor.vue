<template>
  <a-form-item label-width="0">
    <a-divider class="custom-divider-margin-top">
      {{ i18nt('designer.setting.optionsSetting') }}
    </a-divider>
  </a-form-item>
  <a-form-item :label="i18nt('designer.setting.labelKeyName')">
    <a-input size="small" v-model:value="optionModel.labelKey" allowClear />
  </a-form-item>
  <a-form-item :label="i18nt('designer.setting.valueKeyName')">
    <a-input size="small" v-model:value="optionModel.valueKey" allowClear />
  </a-form-item>
  <a-form-item v-if="hasConfig('childrenKey')" :label="i18nt('designer.setting.childrenKeyName')">
    <a-input size="small" v-model:value="optionModel.childrenKey" allowClear />
  </a-form-item>
  <a-form-item :label="i18nt('designer.setting.dsEnabled')">
    <a-switch v-model:checked="optionModel.dsEnabled" />
  </a-form-item>
  <HttpEditor
    v-if="!!optionModel.dsEnabled"
    :designer="designer"
    :selected-widget="selectedWidget"
    :optionModel="optionModel"
  />
  <a-form-item v-if="!optionModel.dsEnabled" label-width="0">
    <option-items-setting :designer="designer" :selected-widget="selectedWidget" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import OptionItemsSetting from '@/components/form-designer/setting-panel/option-items-setting';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';
  import { getDSByName } from '@/utils/util';
  import HttpEditor from '@/components/http-editor/index.vue';
  export default {
    name: 'optionItems-editor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    },
    components: {
      OptionItemsSetting,
      HttpEditor
    },
    data() {
      return {
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
      selectedWidget: {
        handler(val, oldVal) {
          if (!val) {
            return;
          }

          this.loadDataSet(val.options.dsName);
        },
        immediate: true
      }
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
      },

      getDataSetList() {
        this.optionModel.dataSetName = '';
        this.loadDataSet(this.optionModel.dsName);
      }
    }
  };
</script>

<style scoped></style>
