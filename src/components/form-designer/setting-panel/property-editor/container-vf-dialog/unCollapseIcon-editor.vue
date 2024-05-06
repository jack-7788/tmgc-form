<template>
  <a-form-item label="未折叠时icon">
    <a-input type="text" v-model:value="optionModel.unCollapseIcon" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';

  export default {
    name: 'unCollapseIcon-editor',
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>

<style scoped></style>
