<template>
  <a-form-item :label="'设置按钮形状'">
    <a-select v-model:value="optionModel.shape">
      <a-select-option value="default">default</a-select-option>
      <a-select-option value="circle">circle</a-select-option>
      <a-select-option value="round">round</a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';

  export default {
    name: 'shape-editor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style lang="scss" scoped></style>
