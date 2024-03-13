<template>
  <a-form-item :label="i18nt('designer.setting.showSearch')">
    <a-switch v-model:checked="optionModel.showSearch" @change="onRemoteChange" />
  </a-form-item>
</template>

<script>
  import i18n from '@/utils/i18n';
  import propertyMixin from '@/components/form-designer/setting-panel/property-editor/propertyMixin';

  export default {
    name: 'showSearch-editor', //showSearch-editor.vue
    mixins: [i18n, propertyMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object
    }
  };
</script>
