<template>
  <a-form-item :label="i18nt('designer.setting.displayType')">
    <a-select v-model:value="optionModel.type">
      <a-select-option label="primary" value="primary">primary</a-select-option>
      <a-select-option label="warning" value="ghost">ghost</a-select-option>
      <a-select-option label="success" value="dashed">dashed</a-select-option>
      <a-select-option label="danger" value="link">link</a-select-option>
      <a-select-option label="text" value="text">text</a-select-option>
      <a-select-option label="default" value="default">default </a-select-option>
    </a-select>
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';

  export default {
    name: 'button-type-editor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style lang="scss" scoped></style>
