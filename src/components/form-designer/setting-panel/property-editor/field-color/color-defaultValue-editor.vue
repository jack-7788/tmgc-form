<template>
  <a-form-item :label="i18nt('designer.setting.defaultValue')">
    <a-input
      style="padding: 0; width: 25px; height: 25px"
      v-model:value="optionModel.defaultValue"
      @change="emitDefaultValueChange"
      type="color"
    />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';

  export default {
    name: 'color-defaultValue-editor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
