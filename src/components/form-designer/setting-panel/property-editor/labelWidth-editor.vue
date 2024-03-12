<template>
  <a-form-item :label="i18nt('designer.setting.labelWidth')">
    <a-input-number
      v-model:value="optionModel.labelWidth"
      @input="inputNumberHandler"
      :min="0"
      class="hide-spin-button"
      style="width: 100%"
    />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';

  export default {
    name: 'labelWidth-editor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
